export interface UserRecordedRecitation {
  id: string;
  title: string;
  reciterName: string;
  qiraahId: string;
  riwayahId: string;
  surahNumber: number;
  ayahNumber?: number;
  style: 'Murattal' | 'Mujawwad' | 'Educational' | 'Personal';
  durationSeconds: number;
  audioDataUrl: string; // Base64 audio/webm or audio/ogg
  createdAt: string;
  notes?: string;
  isAppliedAsActive?: boolean;
}

const STORAGE_KEY = 'dananty_user_recorded_qiraat_v1';
const ACTIVE_RECORDING_VOICE_KEY = 'dananty_active_user_voice_id';

type Listener = (recordings: UserRecordedRecitation[]) => void;
const listeners: Set<Listener> = new Set();

export function subscribeUserRecordings(listener: Listener): () => void {
  listeners.add(listener);
  listener(getUserRecordings());
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  const current = getUserRecordings();
  listeners.forEach((l) => l(current));
}

export function getUserRecordings(): UserRecordedRecitation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to load user recordings from storage:', err);
    return [];
  }
}

export function saveUserRecording(recitation: UserRecordedRecitation): boolean {
  try {
    const current = getUserRecordings();
    // Prepend or update existing
    const existingIdx = current.findIndex((r) => r.id === recitation.id);
    let updated: UserRecordedRecitation[];
    if (existingIdx >= 0) {
      updated = [...current];
      updated[existingIdx] = recitation;
    } else {
      updated = [recitation, ...current];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyListeners();
    return true;
  } catch (err) {
    console.error('Failed to save user recording to localStorage:', err);
    return false;
  }
}

export function deleteUserRecording(id: string): void {
  try {
    const current = getUserRecordings();
    const updated = current.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const activeId = getActiveUserRecordingVoiceId();
    if (activeId === id) {
      setActiveUserRecordingVoiceId(null);
    }

    notifyListeners();
  } catch (err) {
    console.error('Failed to delete user recording:', err);
  }
}

export function getUserRecordingById(id: string): UserRecordedRecitation | null {
  const list = getUserRecordings();
  return list.find((r) => r.id === id) || null;
}

export function getActiveUserRecordingVoiceId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_RECORDING_VOICE_KEY) || null;
  } catch {
    return null;
  }
}

export function setActiveUserRecordingVoiceId(id: string | null): void {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_RECORDING_VOICE_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_RECORDING_VOICE_KEY);
    }
    notifyListeners();
  } catch {}
}

export function exportRecordingAudio(recording: UserRecordedRecitation): void {
  try {
    const link = document.createElement('a');
    link.href = recording.audioDataUrl;
    const safeTitle = (recording.title || 'qiraah_recording')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    link.download = `${safeTitle}_surah_${recording.surahNumber}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Failed to export recording audio:', err);
  }
}
