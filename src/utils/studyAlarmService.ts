export type AlarmSoundType = 'bell' | 'digital' | 'gentle' | 'energetic' | 'marimba' | 'chime';

export interface StudyAlarm {
  id: string;
  title: string;
  time: string; // "HH:MM" 24-hour format e.g. "08:30" or "16:45"
  days: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday (empty means once/today)
  sound: AlarmSoundType;
  volume: number; // 0.1 to 1.0
  vibrate: boolean;
  enabled: boolean;
  subjectTag?: string;
  notes?: string;
  snoozeMinutes: number; // default 5
  autoSnoozeCount?: number;
  lastTriggeredDate?: string; // YYYY-MM-DD
}

const STORAGE_KEY = 'dananty_study_alarms_v1';

// Default starter study alarms
export const DEFAULT_STUDY_ALARMS: StudyAlarm[] = [
  {
    id: 'alarm-morning-math',
    title: 'Morning Mathematics Mastery 📐',
    time: '08:00',
    days: [1, 2, 3, 4, 5], // Mon-Fri
    sound: 'energetic',
    volume: 0.9,
    vibrate: true,
    enabled: true,
    subjectTag: 'mathematics',
    notes: 'Solve 3 practice equations & review formulas.',
    snoozeMinutes: 5,
  },
  {
    id: 'alarm-evening-review',
    title: 'Evening Topic Reading & Quiz 📚',
    time: '18:30',
    days: [1, 2, 3, 4, 5, 6, 0], // Every day
    sound: 'marimba',
    volume: 0.8,
    vibrate: true,
    enabled: true,
    subjectTag: 'science',
    notes: 'Read a topic to earn +20 Coins and try a quiz!',
    snoozeMinutes: 5,
  },
];

export function getSavedAlarms(): StudyAlarm[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAlarms(DEFAULT_STUDY_ALARMS);
      return DEFAULT_STUDY_ALARMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_STUDY_ALARMS;
  } catch (e) {
    console.error('Failed to parse alarms:', e);
    return DEFAULT_STUDY_ALARMS;
  }
}

export function saveAlarms(alarms: StudyAlarm[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
    window.dispatchEvent(new CustomEvent('dananty_alarms_updated'));
  } catch (e) {
    console.error('Failed to save alarms:', e);
  }
}

// Synthesizer audio engine for playing customizable alarm ringtones reliably on Web Audio API
class AlarmAudioEngine {
  private ctx: AudioContext | null = null;
  private isRinging = false;
  private loopInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTonePattern(sound: AlarmSoundType, volume: number = 0.8) {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(Math.max(0.05, Math.min(volume, 1)), now);
    masterGain.connect(this.ctx.destination);

    switch (sound) {
      case 'bell': {
        // Multi-frequency school bell chime
        const freqs = [587.33, 880, 1174.66]; // D5, A5, D6
        freqs.forEach((f, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + idx * 0.15);

          gain.gain.setValueAtTime(0.5, now + idx * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 1.2);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + idx * 0.15);
          osc.stop(now + idx * 0.15 + 1.3);
        });
        break;
      }

      case 'digital': {
        // Fast triple beep beep beep
        for (let i = 0; i < 3; i++) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1046.5, now + i * 0.18); // C6

          gain.gain.setValueAtTime(0.3, now + i * 0.18);
          gain.gain.setValueAtTime(0.001, now + i * 0.18 + 0.1);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + i * 0.18);
          osc.stop(now + i * 0.18 + 0.12);
        }
        break;
      }

      case 'gentle': {
        // Soft soothing harmonic chord (Major triad)
        const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
        notes.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.35 / notes.length, now + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now);
          osc.stop(now + 2.1);
        });
        break;
      }

      case 'marimba': {
        // Fast upbeat marimba arpeggio
        const arpeggio = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        arpeggio.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.12);

          gain.gain.setValueAtTime(0.6, now + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + i * 0.12);
          osc.stop(now + i * 0.12 + 0.45);
        });
        break;
      }

      case 'chime': {
        // Windchime cascade
        const scale = [659.25, 783.99, 987.77, 1318.51, 1567.98];
        scale.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.1);

          gain.gain.setValueAtTime(0.4, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 1.5);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 1.6);
        });
        break;
      }

      case 'energetic':
      default: {
        // Uplifting alarm fanfare
        const fanfare = [
          { f: 523.25, d: 0.15, t: 0 },
          { f: 659.25, d: 0.15, t: 0.15 },
          { f: 783.99, d: 0.15, t: 0.3 },
          { f: 1046.5, d: 0.45, t: 0.45 },
        ];
        fanfare.forEach(({ f, d, t }) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + t);

          gain.gain.setValueAtTime(0.5, now + t);
          gain.gain.exponentialRampToValueAtTime(0.001, now + t + d + 0.3);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + t);
          osc.stop(now + t + d + 0.4);
        });
        break;
      }
    }
  }

  startAlarmRing(sound: AlarmSoundType, volume: number = 0.8, vibrate: boolean = true) {
    if (this.isRinging) return;
    this.isRinging = true;

    // Trigger phone vibration if supported
    if (vibrate && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([300, 200, 300, 200, 500]);
      } catch (e) {
        // Ignore
      }
    }

    // Play tone immediately
    this.playTonePattern(sound, volume);

    // Loop every 2.4 seconds
    this.loopInterval = window.setInterval(() => {
      if (!this.isRinging) return;
      this.playTonePattern(sound, volume);

      if (vibrate && typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate([300, 200, 300, 200, 500]);
        } catch {}
      }
    }, 2400);
  }

  stopAlarmRing() {
    this.isRinging = false;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(0);
      } catch {}
    }
  }

  previewSound(sound: AlarmSoundType, volume: number = 0.8) {
    this.playTonePattern(sound, volume);
  }
}

export const alarmAudio = new AlarmAudioEngine();
