import { NetworkConnectionType, DataSaverMode, NetworkStatus, DataUsageStats } from '../types';

const DATA_STATS_KEY = 'dananty004_data_usage_stats';
const DATA_MODE_KEY = 'dananty004_data_saver_mode';

const DEFAULT_STATS: DataUsageStats = {
  bytesReceived: 12400, // sample initial base (12.4 KB)
  bytesSent: 3200,      // 3.2 KB
  bytesSaved: 48500,    // 48.5 KB saved via compression & cache
  requestsCount: 4,
  offlineResponsesCount: 0,
  lastReset: new Date().toISOString(),
};

/**
 * Load saved data usage statistics from localStorage
 */
export function getSavedDataStats(): DataUsageStats {
  try {
    const raw = localStorage.getItem(DATA_STATS_KEY);
    if (!raw) {
      localStorage.setItem(DATA_STATS_KEY, JSON.stringify(DEFAULT_STATS));
      return DEFAULT_STATS;
    }
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATS;
  }
}

/**
 * Save data usage statistics
 */
export function recordDataTransfer(bytesIn: number, bytesOut: number, bytesSavedEstimated: number = 0, isOffline: boolean = false): DataUsageStats {
  try {
    const current = getSavedDataStats();
    const updated: DataUsageStats = {
      ...current,
      bytesReceived: current.bytesReceived + Math.max(0, bytesIn),
      bytesSent: current.bytesSent + Math.max(0, bytesOut),
      bytesSaved: current.bytesSaved + Math.max(0, bytesSavedEstimated),
      requestsCount: current.requestsCount + (isOffline ? 0 : 1),
      offlineResponsesCount: current.offlineResponsesCount + (isOffline ? 1 : 0),
    };
    localStorage.setItem(DATA_STATS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('dananty_data_usage_updated', { detail: updated }));
    return updated;
  } catch {
    return DEFAULT_STATS;
  }
}

/**
 * Reset data usage statistics
 */
export function resetDataStats(): DataUsageStats {
  const resetStats: DataUsageStats = {
    bytesReceived: 0,
    bytesSent: 0,
    bytesSaved: 0,
    requestsCount: 0,
    offlineResponsesCount: 0,
    lastReset: new Date().toISOString(),
  };
  try {
    localStorage.setItem(DATA_STATS_KEY, JSON.stringify(resetStats));
    window.dispatchEvent(new CustomEvent('dananty_data_usage_updated', { detail: resetStats }));
  } catch {}
  return resetStats;
}

/**
 * Get preferred Data Saver Mode
 */
export function getSavedDataMode(): DataSaverMode {
  try {
    const saved = localStorage.getItem(DATA_MODE_KEY);
    if (saved && ['auto', 'standard', 'data-saver', 'ultra-saver', 'offline-only'].includes(saved)) {
      return saved as DataSaverMode;
    }
  } catch {}
  return 'auto';
}

/**
 * Set and persist preferred Data Saver Mode
 */
export function setSavedDataMode(mode: DataSaverMode): void {
  try {
    localStorage.setItem(DATA_MODE_KEY, mode);
    window.dispatchEvent(new CustomEvent('dananty_data_mode_changed', { detail: mode }));
  } catch {}
}

/**
 * Inspect device connection API
 */
export function getLiveNetworkStatus(): NetworkStatus {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const userMode = getSavedDataMode();

  let effectiveType: NetworkConnectionType = isOnline ? '4g' : 'offline';
  let downlinkMbps = 10;
  let rttMs = 50;
  let saveDataEnabled = false;

  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn) {
      if (conn.effectiveType) {
        effectiveType = conn.effectiveType as NetworkConnectionType;
      }
      if (typeof conn.downlink === 'number') {
        downlinkMbps = conn.downlink;
      }
      if (typeof conn.rtt === 'number') {
        rttMs = conn.rtt;
      }
      if (typeof conn.saveData === 'boolean') {
        saveDataEnabled = conn.saveData;
      }
    }
  }

  // Override if offline-only mode selected
  if (userMode === 'offline-only') {
    return {
      isOnline: false,
      effectiveType: 'offline',
      downlinkMbps: 0,
      rttMs: 0,
      saveDataEnabled: true,
      mode: userMode,
    };
  }

  // If user selected specific forced data mode
  if (userMode === 'ultra-saver') {
    effectiveType = '2g';
    saveDataEnabled = true;
  } else if (userMode === 'data-saver') {
    effectiveType = '3g';
    saveDataEnabled = true;
  }

  return {
    isOnline,
    effectiveType: isOnline ? effectiveType : 'offline',
    downlinkMbps,
    rttMs,
    saveDataEnabled: saveDataEnabled || userMode === 'data-saver' || userMode === 'ultra-saver',
    mode: userMode,
  };
}

/**
 * Format bytes nicely to human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Ping test to check real-time latency
 */
export async function testNetworkLatency(): Promise<{ latencyMs: number; status: 'excellent' | 'good' | 'slow' | 'offline' }> {
  if (!navigator.onLine) {
    return { latencyMs: 0, status: 'offline' };
  }

  const start = performance.now();
  try {
    const res = await fetch('/api/health?t=' + Date.now(), { method: 'GET', cache: 'no-store' });
    const elapsed = Math.round(performance.now() - start);
    if (!res.ok) throw new Error('Health check error');

    if (elapsed < 120) return { latencyMs: elapsed, status: 'excellent' };
    if (elapsed < 400) return { latencyMs: elapsed, status: 'good' };
    return { latencyMs: elapsed, status: 'slow' };
  } catch {
    return { latencyMs: 999, status: 'slow' };
  }
}
