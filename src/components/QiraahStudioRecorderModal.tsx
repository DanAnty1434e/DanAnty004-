import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Square,
  Play,
  Pause,
  RotateCcw,
  Save,
  Download,
  Trash2,
  Check,
  Radio,
  Sliders,
  Sparkles,
  Info,
  Clock,
  X,
  Volume2,
  BookmarkCheck,
  Disc,
} from 'lucide-react';
import {
  ALL_QIRAAT,
  ALL_RIWAYAT,
  QiraahId,
  RiwayahId,
  getQiraahById,
  getRiwayahById,
  getRiwayatForQiraah,
} from '../data/riwayahAndVoices';
import { ALL_SURAHS } from '../data/quranData';
import {
  UserRecordedRecitation,
  getUserRecordings,
  saveUserRecording,
  deleteUserRecording,
  exportRecordingAudio,
  getActiveUserRecordingVoiceId,
  setActiveUserRecordingVoiceId,
  subscribeUserRecordings,
} from '../utils/userVoiceRecordingService';

interface QiraahStudioRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeQiraahId?: QiraahId;
  activeRiwayahId?: RiwayahId;
  onApplyUserVoice?: (reciterId: string, riwayahId: RiwayahId, qiraahId: QiraahId) => void;
  initialSurahNumber?: number;
  initialAyahNumber?: number;
}

export function QiraahStudioRecorderModal({
  isOpen,
  onClose,
  activeQiraahId = 'asim',
  activeRiwayahId = 'hafs',
  onApplyUserVoice,
  initialSurahNumber = 1,
  initialAyahNumber,
}: QiraahStudioRecorderModalProps) {
  // Tabs: 'record' | 'library'
  const [activeTab, setActiveTab] = useState<'record' | 'library'>('record');

  // Form State
  const [reciterName, setReciterName] = useState<string>(() => {
    try {
      return localStorage.getItem('dananty_user_reciter_name') || 'My Voice (صوتي)';
    } catch {
      return 'My Voice (صوتي)';
    }
  });
  const [selectedSurah, setSelectedSurah] = useState<number>(initialSurahNumber);
  const [selectedAyah, setSelectedAyah] = useState<string>(
    initialAyahNumber ? initialAyahNumber.toString() : ''
  );
  const [selectedQiraah, setSelectedQiraah] = useState<QiraahId>(activeQiraahId);
  const [selectedRiwayah, setSelectedRiwayah] = useState<RiwayahId>(activeRiwayahId);
  const [recitationStyle, setRecitationStyle] = useState<'Murattal' | 'Mujawwad' | 'Educational' | 'Personal'>('Murattal');
  const [notes, setNotes] = useState<string>('');

  // Recorder State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [micPermission, setMicPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Completed Recording State
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [previewCurrentTime, setPreviewCurrentTime] = useState<number>(0);
  const [previewDuration, setPreviewDuration] = useState<number>(0);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Library State
  const [recordingsList, setRecordingsList] = useState<UserRecordedRecitation[]>([]);
  const [playingLibraryId, setPlayingLibraryId] = useState<string | null>(null);
  const [activeVoiceId, setActiveVoiceId] = useState<string | null>(getActiveUserRecordingVoiceId());

  // Refs for audio handling
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const libraryAudioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Subscribe to user recordings updates
  useEffect(() => {
    const unsub = subscribeUserRecordings((list) => {
      setRecordingsList(list);
      setActiveVoiceId(getActiveUserRecordingVoiceId());
    });
    return () => unsub();
  }, []);

  // Sync Riwayah when Qiraah changes
  useEffect(() => {
    const qiraah = getQiraahById(selectedQiraah);
    if (!qiraah.riwayatIds.includes(selectedRiwayah)) {
      setSelectedRiwayah(qiraah.riwayatIds[0]);
    }
  }, [selectedQiraah]);

  // Clean up media on unmount
  useEffect(() => {
    return () => {
      stopTracks();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (previewAudioRef.current) previewAudioRef.current.pause();
      if (libraryAudioRef.current) libraryAudioRef.current.pause();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const stopTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Start visualizer
  const setupVisualizer = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 64;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasCtx = canvas.getContext('2d');
      if (!canvasCtx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        animationFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = '#0f172a'; // slate-900
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2;
        let barHeight: number;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * canvas.height * 0.9;

          // Gradient color from emerald to amber
          const r = Math.min(255, 16 + (dataArray[i] * 0.8));
          const g = Math.min(255, 185 + (dataArray[i] * 0.3));
          const b = Math.min(255, 129 + (dataArray[i] * 0.1));
          canvasCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;

          canvasCtx.beginPath();
          canvasCtx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 4);
          canvasCtx.fill();

          x += barWidth + 1;
        }
      };

      draw();
    } catch (e) {
      console.warn('Audio visualization not supported on this platform:', e);
    }
  };

  // Start recording
  const handleStartRecording = async () => {
    setErrorMessage(null);
    setRecordedAudioUrl(null);
    setRecordedBlob(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMessage('Microphone access is not supported on this browser.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      setMicPermission('granted');
      setupVisualizer(stream);

      // Setup MediaRecorder
      const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
      const supportedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || '';

      const recorder = new MediaRecorder(stream, supportedMime ? { mimeType: supportedMime } : undefined);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: supportedMime || 'audio/webm',
        });
        setRecordedBlob(audioBlob);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Url = reader.result as string;
          setRecordedAudioUrl(base64Url);
        };
        reader.readAsDataURL(audioBlob);

        stopTracks();
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };

      recorder.start(250); // Collect in chunks
      setIsRecording(true);
      setIsPaused(false);
      setRecordDuration(0);

      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Error starting audio recording:', err);
      setMicPermission('denied');
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Microphone permission was denied. Please allow microphone access in your browser settings to record your Qira\'ah.'
          : 'Unable to start recording. Please check your microphone connection.'
      );
    }
  };

  // Pause / Resume recording
  const handleTogglePause = () => {
    if (!mediaRecorderRef.current) return;
    if (mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    } else if (mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerIntervalRef.current = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    }
  };

  // Stop recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsPaused(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  // Discard & Re-record
  const handleResetRecording = () => {
    handleStopRecording();
    stopTracks();
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }
    setRecordedAudioUrl(null);
    setRecordedBlob(null);
    setIsPlayingPreview(false);
    setRecordDuration(0);
    setSaveSuccessNotice(null);
  };

  // Preview playback
  const handleTogglePreviewPlay = () => {
    if (!recordedAudioUrl) return;

    if (!previewAudioRef.current) {
      const audio = new Audio(recordedAudioUrl);
      previewAudioRef.current = audio;

      audio.onloadedmetadata = () => {
        setPreviewDuration(audio.duration || recordDuration);
      };
      audio.ontimeupdate = () => {
        setPreviewCurrentTime(audio.currentTime);
      };
      audio.onended = () => {
        setIsPlayingPreview(false);
        setPreviewCurrentTime(0);
      };
    }

    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.play().catch(() => setIsPlayingPreview(false));
      setIsPlayingPreview(true);
    }
  };

  // Save Recording and optionally apply immediately
  const handleSaveAndApply = (applyImmediately: boolean = true) => {
    if (!recordedAudioUrl) return;

    const surahMeta = ALL_SURAHS.find((s) => s.number === selectedSurah);
    const surahName = surahMeta?.transliteration || `Surah ${selectedSurah}`;
    const verseText = selectedAyah ? `:${selectedAyah}` : '';
    const qiraahMeta = getQiraahById(selectedQiraah);
    const riwayahMeta = getRiwayahById(selectedRiwayah);

    const recordingTitle = `${surahName}${verseText} (${riwayahMeta.nameEnglish})`;
    const recId = `user_${Date.now()}`;

    const newRecord: UserRecordedRecitation = {
      id: recId,
      title: recordingTitle,
      reciterName: reciterName.trim() || 'My Voice',
      qiraahId: selectedQiraah,
      riwayahId: selectedRiwayah,
      surahNumber: selectedSurah,
      ayahNumber: selectedAyah ? parseInt(selectedAyah, 10) : undefined,
      style: recitationStyle,
      durationSeconds: recordDuration,
      audioDataUrl: recordedAudioUrl,
      createdAt: new Date().toISOString(),
      notes: notes.trim() || undefined,
      isAppliedAsActive: applyImmediately,
    };

    const saved = saveUserRecording(newRecord);
    if (saved) {
      // Save reciter name preference
      try {
        localStorage.setItem('dananty_user_reciter_name', reciterName.trim());
      } catch {}

      if (applyImmediately) {
        setActiveUserRecordingVoiceId(recId);
        setActiveVoiceId(recId);
        if (onApplyUserVoice) {
          onApplyUserVoice(`user_rec_${recId}`, selectedRiwayah, selectedQiraah);
        }
      }

      setSaveSuccessNotice(
        applyImmediately
          ? `Saved and applied "${recordingTitle}" as your active Qira'ah voice!`
          : `Saved "${recordingTitle}" to your Qira'ah library!`
      );

      setTimeout(() => {
        setSaveSuccessNotice(null);
        setActiveTab('library');
      }, 1500);
    } else {
      setErrorMessage('Could not save recording. Your browser storage might be full.');
    }
  };

  // Apply a recording from the library
  const handleApplyFromLibrary = (rec: UserRecordedRecitation) => {
    setActiveUserRecordingVoiceId(rec.id);
    setActiveVoiceId(rec.id);
    if (onApplyUserVoice) {
      onApplyUserVoice(
        `user_rec_${rec.id}`,
        rec.riwayahId as RiwayahId,
        rec.qiraahId as QiraahId
      );
    }
    setSaveSuccessNotice(`Applied "${rec.title}" in ${rec.riwayahId} as your active recitation voice!`);
    setTimeout(() => setSaveSuccessNotice(null), 2500);
  };

  // Play preview in library
  const handleToggleLibraryPlayback = (rec: UserRecordedRecitation) => {
    if (playingLibraryId === rec.id && libraryAudioRef.current) {
      libraryAudioRef.current.pause();
      setPlayingLibraryId(null);
      return;
    }

    if (libraryAudioRef.current) {
      libraryAudioRef.current.pause();
    }

    const audio = new Audio(rec.audioDataUrl);
    libraryAudioRef.current = audio;
    setPlayingLibraryId(rec.id);

    audio.play().catch(() => setPlayingLibraryId(null));
    audio.onended = () => setPlayingLibraryId(null);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const currentQiraahMeta = getQiraahById(selectedQiraah);
  const currentRiwayahMeta = getRiwayahById(selectedRiwayah);
  const availableRiwayat = getRiwayatForQiraah(selectedQiraah);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-700/60 rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 p-5 border-b border-emerald-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-600/80 border border-rose-400/40 flex items-center justify-center text-white shadow-lg animate-pulse">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Qira'ah Audio Recording Studio & Voice Engine
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  Record & Apply
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-['Amiri',serif]">
                سَجِّلْ قِرَاءَتَكَ بِصَوْتِكَ وطَبِّقْهَا عَلَى المُصْحَفِ الشَّرِيفِ وَكَافَّةِ الدُّرُوس
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              handleResetRecording();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-5 text-xs font-bold gap-3 pt-2">
          <button
            onClick={() => setActiveTab('record')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
              activeTab === 'record'
                ? 'border-rose-500 text-rose-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Disc className="w-4 h-4" />
            <span>Record New Qira'ah</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
              activeTab === 'library'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>My Recorded Qira'at Library ({recordingsList.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-emerald-700">
          {/* TAB 1: RECORD STUDIO */}
          {activeTab === 'record' && (
            <div className="space-y-6">
              {/* Instructions banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300">How to Apply Your Own Qira'ah:</strong> Select the
                  Surah and the specific Qira'ah (e.g. Nafi', 'Asim, Hamzah, Abu 'Amr) and Riwayah (e.g. Warsh,
                  Hafs, Qalun, Ad-Duri). Speak or recite clearly into your microphone. Once recorded, click{' '}
                  <span className="text-emerald-300 font-bold">"Apply My Qira'ah Voice"</span> to hear your own
                  recitation in the Quran reader and lessons!
                </div>
              </div>

              {/* Success / Error Messages */}
              {saveSuccessNotice && (
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-500 text-xs text-emerald-200 font-bold flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{saveSuccessNotice}</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-600 text-xs text-rose-200 font-semibold flex items-center gap-2">
                  <MicOff className="w-4 h-4 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Recording Metadata Configuration Form */}
              <div className="bg-slate-850 p-4 rounded-2xl border border-slate-700/80 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1. Qira'ah & Recitation Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  {/* Reciter Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Your Reciter Name:
                    </label>
                    <input
                      type="text"
                      value={reciterName}
                      onChange={(e) => setReciterName(e.target.value)}
                      placeholder="e.g. Aliyu Kamal (Warsh)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 font-semibold text-xs"
                    />
                  </div>

                  {/* Surah Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Surah Being Recited:
                    </label>
                    <select
                      value={selectedSurah}
                      onChange={(e) => setSelectedSurah(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    >
                      {ALL_SURAHS.map((s) => (
                        <option key={s.number} value={s.number}>
                          {s.number}. {s.transliteration} ({s.name})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ayah Number (optional) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Ayah Number (Optional):
                    </label>
                    <input
                      type="text"
                      value={selectedAyah}
                      onChange={(e) => setSelectedAyah(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="e.g. 1, 255, or leave blank for Surah"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    />
                  </div>

                  {/* Choose Canonical Qira'ah (10 Qira'at) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Choose Qira'ah (القراءة):
                    </label>
                    <select
                      value={selectedQiraah}
                      onChange={(e) => setSelectedQiraah(e.target.value as QiraahId)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-600/50 text-emerald-200 font-semibold focus:outline-none focus:border-emerald-400 text-xs"
                    >
                      {ALL_QIRAAT.map((q) => (
                        <option key={q.id} value={q.id}>
                          {q.canonicalOrder}. {q.nameEnglish} ({q.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Choose Canonical Riwayah (2 per Qira'ah) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Choose Riwayah (الرواية):
                    </label>
                    <select
                      value={selectedRiwayah}
                      onChange={(e) => setSelectedRiwayah(e.target.value as RiwayahId)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-600/50 text-emerald-200 font-semibold focus:outline-none focus:border-emerald-400 text-xs"
                    >
                      {availableRiwayat.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.nameEnglish} ({r.nameArabic})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Recitation Style */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Recitation Style:
                    </label>
                    <select
                      value={recitationStyle}
                      onChange={(e) =>
                        setRecitationStyle(e.target.value as 'Murattal' | 'Mujawwad' | 'Educational' | 'Personal')
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    >
                      <option value="Murattal">Murattal (Smooth & Fluent)</option>
                      <option value="Mujawwad">Mujawwad (Melodic Khushu)</option>
                      <option value="Educational">Educational (Slow Tajweed)</option>
                      <option value="Personal">Personal Practice</option>
                    </select>
                  </div>
                </div>

                {/* Riwayah Phonetic Cue Tag */}
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-300">Selected Narration: </span>
                    <span>{currentRiwayahMeta.nameEnglish} • {currentRiwayahMeta.nameArabic}</span>
                  </div>
                  <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/40">
                    {currentQiraahMeta.city}
                  </span>
                </div>
              </div>

              {/* Interactive Audio Visualizer & Recording Controls */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-inner flex flex-col items-center justify-center space-y-5">
                {/* Live Real-Time Waveform Visualizer */}
                <div className="w-full h-24 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={96}
                    className="w-full h-full block"
                  />
                  {!isRecording && !recordedAudioUrl && (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 pointer-events-none">
                      Microphone audio waveform will appear here when you record
                    </div>
                  )}
                </div>

                {/* Timer & Status */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3.5 h-3.5 rounded-full ${
                      isRecording
                        ? isPaused
                          ? 'bg-amber-400'
                          : 'bg-rose-500 animate-ping'
                        : recordedAudioUrl
                        ? 'bg-emerald-500'
                        : 'bg-slate-600'
                    }`}
                  />
                  <span className="font-mono text-2xl font-black text-white tracking-widest">
                    {formatTime(recordDuration)}
                  </span>
                  {isRecording && (
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      {isPaused ? 'Paused' : 'Recording Live...'}
                    </span>
                  )}
                  {recordedAudioUrl && !isRecording && (
                    <span className="text-xs font-bold text-emerald-400">
                      Ready to Preview & Apply
                    </span>
                  )}
                </div>

                {/* Recording Controls */}
                <div className="flex items-center gap-3 flex-wrap justify-center">
                  {!isRecording && !recordedAudioUrl && (
                    <button
                      type="button"
                      onClick={handleStartRecording}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-rose-900/40 transition active:scale-95"
                    >
                      <Mic className="w-5 h-5" />
                      <span>Start Recording</span>
                    </button>
                  )}

                  {isRecording && (
                    <>
                      <button
                        type="button"
                        onClick={handleTogglePause}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 transition"
                      >
                        {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
                        <span>{isPaused ? 'Resume' : 'Pause'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleStopRecording}
                        className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition active:scale-95"
                      >
                        <Square className="w-4 h-4 fill-white" />
                        <span>Finish Recording</span>
                      </button>
                    </>
                  )}

                  {recordedAudioUrl && !isRecording && (
                    <>
                      <button
                        type="button"
                        onClick={handleTogglePreviewPlay}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                      >
                        {isPlayingPreview ? (
                          <>
                            <Pause className="w-4 h-4" />
                            <span>Pause Preview</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-white" />
                            <span>Listen to My Recording</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleResetRecording}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-Record</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Final Actions: Apply to Quran & Download */}
                {recordedAudioUrl && !isRecording && (
                  <div className="w-full pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => handleSaveAndApply(true)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black flex items-center gap-2 shadow-md transition"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Save & Apply as Active Qira'ah Voice</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveAndApply(false)}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 font-bold transition flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save to Library Only</span>
                      </button>

                      {recordedBlob && (
                        <button
                          type="button"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = recordedAudioUrl;
                            link.download = `my_qiraah_surah_${selectedSurah}_${selectedRiwayah}.webm`;
                            link.click();
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 font-bold transition flex items-center gap-1.5"
                          title="Download Audio File (.webm)"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export .webm</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LIBRARY OF SAVED USER RECORDINGS */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    <span>My Recorded Recitations Catalog</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    All your saved recitations across any Surah and Qira'ah. Click "Apply This Voice" to set it active.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('record')}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white flex items-center gap-1.5 transition"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Record Another</span>
                </button>
              </div>

              {saveSuccessNotice && (
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-500 text-xs text-emerald-200 font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{saveSuccessNotice}</span>
                </div>
              )}

              {recordingsList.length === 0 ? (
                <div className="p-8 text-center bg-slate-850 rounded-2xl border border-slate-800 space-y-3">
                  <Mic className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-300">No Custom Recordings Yet</p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    You haven't recorded your own Qira'ah yet. Click "Record New Qira'ah" above to record any Surah in your favorite narration and apply it!
                  </p>
                  <button
                    onClick={() => setActiveTab('record')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs inline-flex items-center gap-1.5 transition"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Start Your First Recording</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {recordingsList.map((rec) => {
                    const isPlaying = playingLibraryId === rec.id;
                    const isActiveVoice = activeVoiceId === rec.id;
                    const riwayahMeta = getRiwayahById(rec.riwayahId);
                    const qiraahMeta = getQiraahById(rec.qiraahId);

                    return (
                      <div
                        key={rec.id}
                        className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                          isActiveVoice
                            ? 'bg-emerald-950/70 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                            : 'bg-slate-800/70 border-slate-700/80 hover:border-slate-600'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base">🎙️</span>
                                <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                              </div>
                              <div className="text-[11px] text-emerald-300 font-semibold mt-0.5">
                                Reciter: {rec.reciterName} • {riwayahMeta.nameArabic}
                              </div>
                            </div>

                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300">
                              {rec.style}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400 space-y-0.5 mb-3">
                            <div>
                              <strong>Qira'ah:</strong> {qiraahMeta.nameEnglish} ({qiraahMeta.city})
                            </div>
                            <div>
                              <strong>Duration:</strong> {formatTime(rec.durationSeconds)} •{' '}
                              {new Date(rec.createdAt).toLocaleDateString()}
                            </div>
                            {rec.notes && <div className="text-slate-300 italic">{rec.notes}</div>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                          {/* Play Preview */}
                          <button
                            type="button"
                            onClick={() => handleToggleLibraryPlayback(rec)}
                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition ${
                              isPlaying
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                            }`}
                          >
                            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-emerald-400" />}
                            <span>{isPlaying ? 'Pause' : 'Listen'}</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            {/* Export */}
                            <button
                              type="button"
                              onClick={() => exportRecordingAudio(rec)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-700 transition"
                              title="Download Audio File"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete recording "${rec.title}"?`)) {
                                  deleteUserRecording(rec.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 transition"
                              title="Delete Recording"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Apply Button */}
                            <button
                              type="button"
                              onClick={() => handleApplyFromLibrary(rec)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                                isActiveVoice
                                  ? 'bg-emerald-500 text-slate-950 font-black'
                                  : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40'
                              }`}
                            >
                              {isActiveVoice ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Active Voice</span>
                                </>
                              ) : (
                                <span>Apply This Voice</span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
