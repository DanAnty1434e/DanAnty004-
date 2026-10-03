import {
  RiwayahId,
  QiraahId,
  getRiwayahById,
  getReciterById,
  getQiraahById,
  getQiraahForRiwayah,
  QiraahMeta,
  RiwayahMeta,
  ReciterVoiceMeta,
} from '../data/riwayahAndVoices';

export interface AudioTrackInfo {
  id: string;
  type: 'quran' | 'hadith' | 'subject' | 'dua' | 'salah';
  title: string;
  subtitle: string;
  arabicText?: string;
  englishText?: string;
  riwayahId: RiwayahId;
  qiraahId?: QiraahId;
  reciterId: string;
  audioUrl?: string;
  surahNumber?: number;
  ayahNumber?: number;
}

export type PlaybackSpeed = 0.75 | 1.0 | 1.25 | 1.5;

class IslamicAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private currentTrack: AudioTrackInfo | null = null;
  private isPlaying: boolean = false;
  private playbackSpeed: PlaybackSpeed = 1.0;
  private speechUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeechActive: boolean = false;
  private listeners: Set<(state: AudioEngineState) => void> = new Set();
  private currentTime: number = 0;
  private duration: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.preload = 'metadata';

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        if (!this.isSpeechActive) {
          this.isPlaying = false;
          this.notify();
        }
      });

      this.audioElement.addEventListener('ended', () => {
        this.isPlaying = false;
        this.currentTime = 0;
        this.notify();
      });

      this.audioElement.addEventListener('timeupdate', () => {
        if (this.audioElement) {
          this.currentTime = this.audioElement.currentTime;
          this.duration = this.audioElement.duration || 0;
          this.notify();
        }
      });

      this.audioElement.addEventListener('error', (err) => {
        console.warn('Audio stream playback notice, falling back if needed:', err);
        this.isPlaying = false;
        this.notify();
      });
    }
  }

  public subscribe(listener: (state: AudioEngineState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  public getState(): AudioEngineState {
    const riwayah = this.currentTrack ? getRiwayahById(this.currentTrack.riwayahId) : null;
    const qiraah = this.currentTrack
      ? this.currentTrack.qiraahId
        ? getQiraahById(this.currentTrack.qiraahId)
        : getQiraahForRiwayah(this.currentTrack.riwayahId)
      : null;
    const reciter = this.currentTrack ? getReciterById(this.currentTrack.reciterId) : null;

    return {
      currentTrack: this.currentTrack,
      isPlaying: this.isPlaying,
      playbackSpeed: this.playbackSpeed,
      currentTime: this.currentTime,
      duration: this.duration,
      riwayah,
      qiraah,
      reciter,
    };
  }

  public setSpeed(speed: PlaybackSpeed) {
    this.playbackSpeed = speed;
    if (this.audioElement) {
      this.audioElement.playbackRate = speed;
    }
    if (this.speechUtterance) {
      this.speechUtterance.rate = speed;
    }
    this.notify();
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeechActive = false;
    this.isPlaying = false;
    this.currentTime = 0;
    this.notify();
  }

  public togglePlayPause() {
    if (this.isSpeechActive && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        this.isPlaying = true;
      } else if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        this.isPlaying = false;
      }
      this.notify();
      return;
    }

    if (this.audioElement && this.audioElement.src) {
      if (this.isPlaying) {
        this.audioElement.pause();
        this.isPlaying = false;
      } else {
        this.audioElement.play().catch(() => {
          this.isPlaying = false;
        });
        this.isPlaying = true;
      }
      this.notify();
    }
  }

  public seek(seconds: number) {
    if (this.audioElement && this.duration > 0) {
      this.audioElement.currentTime = Math.max(0, Math.min(seconds, this.duration));
      this.currentTime = this.audioElement.currentTime;
      this.notify();
    }
  }

  public skipSeconds(delta: number) {
    if (this.audioElement && this.duration > 0) {
      this.seek(this.audioElement.currentTime + delta);
    }
  }

  // Play a Quranic recitation (Surah or Ayah stream matching chosen Riwayah & Reciter)
  public playQuran(track: AudioTrackInfo) {
    this.stop();
    this.currentTrack = track;

    if (!track.audioUrl) {
      return;
    }

    if (this.audioElement) {
      this.audioElement.src = track.audioUrl;
      this.audioElement.playbackRate = this.playbackSpeed;
      this.isPlaying = true;
      this.notify();

      this.audioElement.play().catch((err) => {
        console.warn('Could not auto-play stream directly:', err);
        this.isPlaying = false;
        this.notify();
      });
    }
  }

  // Play Hadith or Islamic Subject recitation
  public playSpeechOrAudio(track: AudioTrackInfo, mode: 'arabic-then-english' | 'arabic-only' | 'english-only' = 'arabic-then-english') {
    this.stop();
    this.currentTrack = track;

    // If an audioUrl exists (e.g., recorded ayah or dua audio), prefer that first
    if (track.audioUrl) {
      this.playQuran(track);
      return;
    }

    // Otherwise use Web Speech Synthesis with Arabic voice support
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech audio playback is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const arabicText = track.arabicText || '';
    const englishText = track.englishText || '';

    let textQueue: { text: string; lang: string }[] = [];

    if (mode === 'arabic-only') {
      textQueue = [{ text: arabicText, lang: 'ar-SA' }];
    } else if (mode === 'english-only') {
      textQueue = [{ text: englishText, lang: 'en-US' }];
    } else {
      if (arabicText) textQueue.push({ text: arabicText, lang: 'ar-SA' });
      if (englishText) textQueue.push({ text: englishText, lang: 'en-US' });
    }

    if (textQueue.length === 0) return;

    this.isSpeechActive = true;
    this.isPlaying = true;
    this.notify();

    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= textQueue.length || !this.isSpeechActive) {
        this.isSpeechActive = false;
        this.isPlaying = false;
        this.notify();
        return;
      }

      const item = textQueue[currentIndex];
      const utter = new SpeechSynthesisUtterance(item.text);
      utter.lang = item.lang;
      utter.rate = item.lang.startsWith('ar') ? Math.min(1.0, this.playbackSpeed * 0.9) : this.playbackSpeed;
      utter.pitch = 1.0;

      // Try selecting an authentic voice for that language
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find((v) => v.lang.startsWith(item.lang.substring(0, 2)));
      if (matchingVoice) {
        utter.voice = matchingVoice;
      }

      utter.onend = () => {
        currentIndex++;
        setTimeout(playNext, 400);
      };

      utter.onerror = () => {
        currentIndex++;
        playNext();
      };

      this.speechUtterance = utter;
      window.speechSynthesis.speak(utter);
    };

    playNext();
  }
}

export interface AudioEngineState {
  currentTrack: AudioTrackInfo | null;
  isPlaying: boolean;
  playbackSpeed: PlaybackSpeed;
  currentTime: number;
  duration: number;
  riwayah: ReturnType<typeof getRiwayahById> | null;
  qiraah: ReturnType<typeof getQiraahById> | null;
  reciter: ReturnType<typeof getReciterById> | null;
}

export const islamicAudioService = new IslamicAudioEngine();
