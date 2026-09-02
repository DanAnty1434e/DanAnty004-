import React, { useState, useEffect } from 'react';
import {
  AlarmClock,
  Plus,
  Trash2,
  Volume2,
  Play,
  RotateCcw,
  Check,
  X,
  Sparkles,
  Clock,
  Bell,
  Sliders,
  Smartphone,
  BookOpen,
  Edit2,
} from 'lucide-react';
import {
  StudyAlarm,
  AlarmSoundType,
  getSavedAlarms,
  saveAlarms,
  alarmAudio,
} from '../utils/studyAlarmService';
import { CURRICULUM_DATA } from '../data/curriculum';

interface StudyAlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerTestAlarm?: (alarm: StudyAlarm) => void;
}

const DAY_LABELS = [
  { day: 0, short: 'Sun', letter: 'S' },
  { day: 1, short: 'Mon', letter: 'M' },
  { day: 2, short: 'Tue', letter: 'T' },
  { day: 3, short: 'Wed', letter: 'W' },
  { day: 4, short: 'Thu', letter: 'T' },
  { day: 5, short: 'Fri', letter: 'F' },
  { day: 6, short: 'Sat', letter: 'S' },
];

const SOUND_OPTIONS: { id: AlarmSoundType; name: string; desc: string; icon: string }[] = [
  { id: 'energetic', name: 'Energetic Fanfare', desc: 'Upbeat brass triumph to wake you up', icon: '🎺' },
  { id: 'bell', name: 'School Bell Chime', desc: 'Classic 3-tone academy bell', icon: '🔔' },
  { id: 'marimba', name: 'Marimba Arpeggio', desc: 'Warm, pleasant wooden percussion', icon: '🎶' },
  { id: 'digital', name: 'Digital Watch Beep', desc: 'High-pitch repetitive beep', icon: '⏰' },
  { id: 'gentle', name: 'Gentle Harmonics', desc: 'Calm morning ambient chords', icon: '🌿' },
  { id: 'chime', name: 'Wind Chimes', desc: 'Relaxing crystalline chime sequence', icon: '✨' },
];

export function StudyAlarmModal({
  isOpen,
  onClose,
  onTriggerTestAlarm,
}: StudyAlarmModalProps) {
  const [alarms, setAlarms] = useState<StudyAlarm[]>(getSavedAlarms());
  const [isEditing, setIsEditing] = useState(false);
  const [editingAlarmId, setEditingAlarmId] = useState<string | null>(null);

  // Form states for creating / editing
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('08:00');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [sound, setSound] = useState<AlarmSoundType>('energetic');
  const [volume, setVolume] = useState<number>(0.8);
  const [vibrate, setVibrate] = useState(true);
  const [subjectTag, setSubjectTag] = useState<string>('mathematics');
  const [notes, setNotes] = useState('');
  const [snoozeMinutes, setSnoozeMinutes] = useState(5);
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAlarms(getSavedAlarms());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleAlarm = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = alarms.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a));
    setAlarms(updated);
    saveAlarms(updated);
  };

  const handleDeleteAlarm = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = alarms.filter((a) => a.id !== id);
    setAlarms(updated);
    saveAlarms(updated);
  };

  const handleOpenCreate = () => {
    setIsEditing(true);
    setEditingAlarmId(null);
    setTitle('Focused Study Session 🎯');
    setTime('09:00');
    setSelectedDays([1, 2, 3, 4, 5]);
    setSound('energetic');
    setVolume(0.8);
    setVibrate(true);
    setSubjectTag('mathematics');
    setNotes('Complete 1 lesson topic and solve practice problems.');
    setSnoozeMinutes(5);
  };

  const handleOpenEdit = (alarm: StudyAlarm) => {
    setIsEditing(true);
    setEditingAlarmId(alarm.id);
    setTitle(alarm.title);
    setTime(alarm.time);
    setSelectedDays(alarm.days || []);
    setSound(alarm.sound);
    setVolume(alarm.volume ?? 0.8);
    setVibrate(alarm.vibrate ?? true);
    setSubjectTag(alarm.subjectTag || 'all');
    setNotes(alarm.notes || '');
    setSnoozeMinutes(alarm.snoozeMinutes || 5);
  };

  const handleToggleDay = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day].sort());
    }
  };

  const handlePreviewSound = (snd: AlarmSoundType) => {
    setPlayingPreview(snd);
    alarmAudio.previewSound(snd, volume);
    setTimeout(() => {
      setPlayingPreview(null);
    }, 1500);
  };

  const handleSaveAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingAlarmId) {
      // Update existing
      const updated = alarms.map((a) => {
        if (a.id === editingAlarmId) {
          return {
            ...a,
            title: title.trim(),
            time,
            days: selectedDays,
            sound,
            volume,
            vibrate,
            subjectTag,
            notes: notes.trim(),
            snoozeMinutes,
            enabled: true,
          };
        }
        return a;
      });
      setAlarms(updated);
      saveAlarms(updated);
    } else {
      // Create new
      const newAlarm: StudyAlarm = {
        id: `alarm-${Date.now()}`,
        title: title.trim(),
        time,
        days: selectedDays,
        sound,
        volume,
        vibrate,
        enabled: true,
        subjectTag,
        notes: notes.trim(),
        snoozeMinutes,
      };
      const updated = [...alarms, newAlarm];
      setAlarms(updated);
      saveAlarms(updated);
    }

    setIsEditing(false);
    setEditingAlarmId(null);
  };

  // Helper to format days string
  const formatDays = (days: number[]) => {
    if (!days || days.length === 0) return 'Ring Once';
    if (days.length === 7) return 'Every day';
    if (days.length === 5 && !days.includes(0) && !days.includes(6)) return 'Weekdays (Mon-Fri)';
    if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Weekends';
    return days.map((d) => DAY_LABELS.find((l) => l.day === d)?.short).join(', ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-xs">
              <AlarmClock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200">
                DanAnty Study Schedule
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif]">
                Study Alarms & Reminders
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {!isEditing ? (
            /* Alarm List View */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Your Scheduled Alarms</h3>
                  <p className="text-xs text-slate-500">
                    Alarms will sound and ring with your customized tone when study time arrives.
                  </p>
                </div>

                <button
                  onClick={handleOpenCreate}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Alarm</span>
                </button>
              </div>

              {alarms.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">No study alarms set yet</p>
                  <p className="text-xs text-slate-400 mt-1 mb-4">
                    Create a personalized study alarm to stay on track with your curriculum.
                  </p>
                  <button
                    onClick={handleOpenCreate}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    Set Your First Alarm
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {alarms.map((alarm) => (
                    <div
                      key={alarm.id}
                      onClick={() => handleOpenEdit(alarm)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        alarm.enabled
                          ? 'bg-white border-slate-200 hover:border-amber-400 shadow-2xs'
                          : 'bg-slate-50/70 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start sm:items-center space-x-4">
                        {/* Time display */}
                        <div className="flex flex-col">
                          <span className="font-mono text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            {alarm.time}
                          </span>
                          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                            {formatDays(alarm.days)}
                          </span>
                        </div>

                        {/* Divider */}
                        <div className="h-10 w-px bg-slate-200 hidden sm:block" />

                        {/* Title & metadata */}
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {alarm.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                            <span className="capitalize px-2 py-0.5 bg-slate-100 rounded-md font-medium text-slate-600 flex items-center gap-1">
                              <Volume2 className="w-3 h-3 text-slate-400" />
                              {alarm.sound}
                            </span>
                            {alarm.subjectTag && alarm.subjectTag !== 'all' && (
                              <span className="capitalize px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md font-bold">
                                {alarm.subjectTag.replace('-', ' ')}
                              </span>
                            )}
                            {alarm.notes && (
                              <span className="max-w-[200px] truncate text-slate-400">
                                • {alarm.notes}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right controls: Test, Switch, Delete */}
                      <div className="flex items-center space-x-2 self-end sm:self-center">
                        {/* Test Ring Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onTriggerTestAlarm) {
                              onTriggerTestAlarm(alarm);
                            } else {
                              handlePreviewSound(alarm.sound);
                            }
                          }}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                          title="Test Alarm Ringtone"
                        >
                          <Play className="w-3.5 h-3.5 fill-slate-700" />
                        </button>

                        {/* Toggle On/Off Switch */}
                        <button
                          onClick={(e) => handleToggleAlarm(alarm.id, e)}
                          className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                            alarm.enabled ? 'bg-amber-500' : 'bg-slate-300'
                          }`}
                          title={alarm.enabled ? 'Disable alarm' : 'Enable alarm'}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                              alarm.enabled ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={(e) => handleDeleteAlarm(alarm.id, e)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete Alarm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Create / Edit Form */
            <form onSubmit={handleSaveAlarm} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                  {editingAlarmId ? 'Edit Study Alarm' : 'Set New Study Alarm'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  Cancel
                </button>
              </div>

              {/* Time Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Alarm Ring Time</span>
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-3xl font-mono font-bold px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 focus:outline-hidden focus:border-indigo-600 text-slate-900 shadow-2xs"
                />
              </div>

              {/* Title & Subject Focus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Alarm Name / Label</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Mathematics Practice, Science Lab Review"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Curriculum Subject Link</label>
                  <select
                    value={subjectTag}
                    onChange={(e) => setSubjectTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-indigo-600 capitalize"
                  >
                    <option value="all">🌟 All Subjects / General Study</option>
                    {CURRICULUM_DATA.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Repeat Days Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Repeat Days</span>
                  <span className="text-[11px] text-indigo-600 font-semibold">
                    {formatDays(selectedDays)}
                  </span>
                </label>
                <div className="flex gap-1.5 sm:gap-2">
                  {DAY_LABELS.map(({ day, short, letter }) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleToggleDay(day)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 shadow-xs'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        <span className="hidden sm:inline">{short}</span>
                        <span className="sm:hidden">{letter}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sound Ringtone Selector with Audio Preview */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Choose Alarm Ringtone</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SOUND_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSound(opt.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        sound === opt.id
                          ? 'bg-indigo-50/80 border-indigo-600 shadow-2xs'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-lg">{opt.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{opt.name}</div>
                          <div className="text-[10px] text-slate-500">{opt.desc}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSound(opt.id);
                          handlePreviewSound(opt.id);
                        }}
                        className={`p-1.5 rounded-lg text-xs font-bold transition ${
                          playingPreview === opt.id
                            ? 'bg-amber-400 text-slate-950 animate-pulse'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                        title="Listen to preview"
                      >
                        <Play className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume & Vibration Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Alarm Volume</span>
                    <span className="font-mono">{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                      <span>Device Vibration</span>
                    </div>
                    <div className="text-[10px] text-slate-500">Vibrate when alarm triggers</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={vibrate}
                    onChange={(e) => setVibrate(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Study Notes & Snooze */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Study Goal / Focus Note (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Master Pythagorean theorem & read biology topic"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-indigo-600"
                />
              </div>

              {/* Save / Cancel buttons */}
              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingAlarmId ? 'Save Changes' : 'Create Alarm'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          💡 <strong>Tip:</strong> Keep this tab open or pinned in your browser so DanAnty004 can ring your alarms on exact schedule!
        </div>
      </div>
    </div>
  );
}
