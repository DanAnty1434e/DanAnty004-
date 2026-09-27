import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  X,
  Volume2,
  Sliders,
  Globe,
  Radio,
} from 'lucide-react';
import {
  islamicAudioService,
  AudioEngineState,
  PlaybackSpeed,
} from '../utils/islamicAudioService';

interface IslamicGlobalAudioPlayerProps {
  onOpenVoiceModal: () => void;
}

export function IslamicGlobalAudioPlayer({ onOpenVoiceModal }: IslamicGlobalAudioPlayerProps) {
  const [audioState, setAudioState] = useState<AudioEngineState>(() =>
    islamicAudioService.getState()
  );

  useEffect(() => {
    const unsubscribe = islamicAudioService.subscribe((state) => {
      setAudioState({ ...state });
    });
    return () => unsubscribe();
  }, []);

  if (!audioState.currentTrack) return null;

  const track = audioState.currentTrack;
  const isPlaying = audioState.isPlaying;
  const currentSec = audioState.currentTime;
  const totalSec = audioState.duration;
  const progressPercent = totalSec > 0 ? (currentSec / totalSec) * 100 : 0;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSpeedCycle = () => {
    const speeds: PlaybackSpeed[] = [0.75, 1.0, 1.25, 1.5];
    const currentIndex = speeds.indexOf(audioState.playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    islamicAudioService.setSpeed(speeds[nextIndex]);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 border-t border-emerald-700/60 backdrop-blur-xl text-slate-100 shadow-2xl transition-all duration-300">
      {/* Progress Bar (interactive) */}
      <div
        className="w-full h-1.5 bg-slate-800 hover:h-2.5 transition-all cursor-pointer relative group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          if (totalSec > 0) {
            islamicAudioService.seek(ratio * totalSec);
          }
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 relative"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md scale-0 group-hover:scale-100 transition" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Track Details & Riwayah Badge */}
        <div className="flex items-center gap-3 min-w-0 max-w-sm sm:max-w-md">
          <div className="w-10 h-10 rounded-2xl bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-inner">
            {track.type === 'quran' ? (
              <Radio className="w-5 h-5 text-emerald-300 animate-pulse" />
            ) : (
              <Volume2 className="w-5 h-5 text-emerald-300" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-white truncate">
                {track.title}
              </span>
              {audioState.riwayah && (
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-700 text-emerald-300 shrink-0">
                  {audioState.riwayah.nameArabic}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-300 truncate">
              <span className="truncate">{track.subtitle}</span>
              {audioState.reciter && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="text-amber-300 font-medium truncate">
                    {audioState.reciter.nameEnglish} {audioState.reciter.countryFlag}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-2 sm:gap-3 mx-auto sm:mx-0">
          {/* Skip Back 5s */}
          <button
            onClick={() => islamicAudioService.skipSeconds(-5)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Rewind 5 seconds"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Main Play / Pause */}
          <button
            onClick={() => islamicAudioService.togglePlayPause()}
            className="w-10 h-10 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black flex items-center justify-center shadow-lg transition transform active:scale-95"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-slate-950" />
            ) : (
              <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
            )}
          </button>

          {/* Skip Forward 5s */}
          <button
            onClick={() => islamicAudioService.skipSeconds(5)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Forward 5 seconds"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Time Display */}
          {totalSec > 0 && (
            <div className="text-[11px] text-slate-400 font-mono hidden md:inline-block ml-1">
              {formatTime(currentSec)} / {formatTime(totalSec)}
            </div>
          )}
        </div>

        {/* Right Actions: Speed, Voice Switcher, Close */}
        <div className="flex items-center gap-2">
          {/* Speed Toggle */}
          <button
            onClick={handleSpeedCycle}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition"
            title="Adjust playback speed"
          >
            {audioState.playbackSpeed}x
          </button>

          {/* Change Voice & Riwayah Shortcut */}
          <button
            onClick={onOpenVoiceModal}
            className="px-2.5 py-1 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-xs font-bold text-emerald-300 flex items-center gap-1.5 transition"
            title="Change Riwayah or Voice"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Voice & Riwayah</span>
          </button>

          {/* Close / Stop */}
          <button
            onClick={() => islamicAudioService.stop()}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Stop and close audio player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
