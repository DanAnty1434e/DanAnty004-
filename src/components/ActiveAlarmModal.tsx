import React, { useState, useEffect } from 'react';
import {
  AlarmClock,
  Bell,
  Volume2,
  VolumeX,
  Play,
  Square,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  X,
  GraduationCap,
} from 'lucide-react';
import { StudyAlarm, alarmAudio } from '../utils/studyAlarmService';

interface ActiveAlarmModalProps {
  alarm: StudyAlarm;
  onDismiss: () => void;
  onSnooze: (minutes: number) => void;
  onStartStudy?: (subjectTag?: string) => void;
}

export function ActiveAlarmModal({
  alarm,
  onDismiss,
  onSnooze,
  onStartStudy,
}: ActiveAlarmModalProps) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  useEffect(() => {
    // Start ringing sound loop
    alarmAudio.startAlarmRing(alarm.sound, alarm.volume, alarm.vibrate);

    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }, 1000);

    return () => {
      clearInterval(timer);
      alarmAudio.stopAlarmRing();
    };
  }, [alarm]);

  const handleDismiss = () => {
    alarmAudio.stopAlarmRing();
    onDismiss();
  };

  const handleSnooze = () => {
    alarmAudio.stopAlarmRing();
    onSnooze(alarm.snoozeMinutes || 5);
  };

  const handleStartStudy = () => {
    alarmAudio.stopAlarmRing();
    onDismiss();
    onStartStudy?.(alarm.subjectTag);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-400 relative overflow-hidden animate-bounce-subtle">
        
        {/* Glow ambient background ring */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-200 rounded-full blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-200 rounded-full blur-2xl opacity-60 pointer-events-none" />

        {/* Ringing Alarm Icon with animation */}
        <div className="relative z-10 mx-auto w-20 h-20 rounded-3xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg mb-4 animate-pulse">
          <AlarmClock className="w-10 h-10 animate-spin-slow" />
        </div>

        {/* Current Time Clock display */}
        <div className="font-mono text-3xl sm:text-4xl font-black text-slate-900 tracking-wider mb-1">
          {currentTime}
        </div>

        <div className="inline-block px-3 py-1 bg-amber-100 text-amber-950 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
          ⏰ Study Time Is Here!
        </div>

        {/* Alarm Title & Subject */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mb-2">
          {alarm.title}
        </h2>

        {alarm.notes && (
          <p className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-4 text-left leading-relaxed">
            <span className="font-bold text-slate-800 block text-xs uppercase tracking-wide mb-0.5">
              Target Note:
            </span>
            {alarm.notes}
          </p>
        )}

        {/* Primary Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* Start Studying Now Button */}
          <button
            onClick={handleStartStudy}
            className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm sm:text-base shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2 group"
          >
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Start Study Session Now</span>
            <span className="px-2 py-0.5 bg-indigo-800 text-indigo-200 text-xs rounded-full">
              +20 🪙
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Snooze 5 Minutes */}
            <button
              onClick={handleSnooze}
              className="py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-1.5"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Snooze ({alarm.snoozeMinutes || 5}m)</span>
            </button>

            {/* Turn Off / Dismiss */}
            <button
              onClick={handleDismiss}
              className="py-3 px-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm transition flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Turn Off Alarm</span>
            </button>
          </div>
        </div>

        {/* Sound & Ringtone indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2 text-[11px] text-slate-400">
          <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Playing Ringtone: <strong className="text-slate-600 capitalize">{alarm.sound}</strong></span>
        </div>
      </div>
    </div>
  );
}
