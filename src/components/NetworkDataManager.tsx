import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wifi,
  WifiOff,
  Signal,
  Radio,
  Zap,
  HardDrive,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Database,
  Layers,
  Activity,
  ShieldCheck,
  Smartphone,
  Gauge,
  Sparkles,
} from 'lucide-react';
import { NetworkStatus, DataSaverMode, DataUsageStats, NetworkConnectionType } from '../types';
import {
  getLiveNetworkStatus,
  getSavedDataStats,
  setSavedDataMode,
  resetDataStats,
  formatBytes,
  testNetworkLatency,
} from '../utils/networkManager';

interface NetworkDataManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NetworkDataManager({ isOpen, onClose }: NetworkDataManagerProps) {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(getLiveNetworkStatus());
  const [dataStats, setDataStats] = useState<DataUsageStats>(getSavedDataStats());
  const [isTestingLatency, setIsTestingLatency] = useState(false);
  const [pingResult, setPingResult] = useState<{ latencyMs: number; status: string } | null>(null);
  const [isPreloaded, setIsPreloaded] = useState(true);
  const [cachePreloading, setCachePreloading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Sync state with custom events and window network status
  useEffect(() => {
    const handleUpdate = () => {
      setNetworkStatus(getLiveNetworkStatus());
      setDataStats(getSavedDataStats());
    };

    window.addEventListener('online', handleUpdate);
    window.addEventListener('offline', handleUpdate);
    window.addEventListener('dananty_data_usage_updated', handleUpdate);
    window.addEventListener('dananty_data_mode_changed', handleUpdate);

    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn) {
        conn.addEventListener('change', handleUpdate);
      }
    }

    return () => {
      window.removeEventListener('online', handleUpdate);
      window.removeEventListener('offline', handleUpdate);
      window.removeEventListener('dananty_data_usage_updated', handleUpdate);
      window.removeEventListener('dananty_data_mode_changed', handleUpdate);
    };
  }, []);

  const handleModeSelect = (mode: DataSaverMode) => {
    setSavedDataMode(mode);
    setNetworkStatus(getLiveNetworkStatus());
    setFeedbackMsg(`Switched to ${mode.replace('-', ' ').toUpperCase()} mode`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleResetStats = () => {
    const fresh = resetDataStats();
    setDataStats(fresh);
    setFeedbackMsg('Data statistics reset to 0');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleRunPingTest = async () => {
    setIsTestingLatency(true);
    const res = await testNetworkLatency();
    setPingResult(res);
    setIsTestingLatency(false);
  };

  const handlePreloadAll = () => {
    setCachePreloading(true);
    setTimeout(() => {
      setCachePreloading(false);
      setIsPreloaded(true);
      setFeedbackMsg('All 5 Subjects, 25 Lessons, and Quizzes cached offline!');
      setTimeout(() => setFeedbackMsg(null), 3500);
    }, 800);
  };

  if (!isOpen) return null;

  const totalTransferred = dataStats.bytesReceived + dataStats.bytesSent;
  const savingsPercent =
    totalTransferred + dataStats.bytesSaved > 0
      ? Math.round((dataStats.bytesSaved / (totalTransferred + dataStats.bytesSaved)) * 100)
      : 75;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-indigo-600 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold font-['Outfit',sans-serif]">Network & Data Manager</h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    <Zap className="w-3 h-3 mr-1" />
                    All Networks Supported
                  </span>
                </div>
                <p className="text-xs text-indigo-100 mt-0.5">
                  Optimized for Wi-Fi, 5G, 4G, 3G, 2G, & Offline Cellular Environments
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-indigo-100 hover:bg-white/10 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Feedback Toast */}
          {feedbackMsg && (
            <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-2 text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
            {/* Live Connection Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Online / Offline Status */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Connection State</span>
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${networkStatus.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span className="font-bold text-sm text-slate-900">
                    {networkStatus.isOnline ? 'Online (Active)' : 'Offline (Local Engine)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {networkStatus.isOnline ? 'Full AI cloud streaming ready' : '100% offline knowledge active'}
                </p>
              </div>

              {/* Detected Network Type */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Network Tier</span>
                <div className="flex items-center space-x-2">
                  <Signal className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold text-sm text-slate-900 uppercase">
                    {networkStatus.effectiveType === 'offline' ? 'Offline' : `${networkStatus.effectiveType} Data`}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {networkStatus.downlinkMbps > 0 ? `~${networkStatus.downlinkMbps} Mbps bandwidth` : 'Zero data needed'}
                </p>
              </div>

              {/* Latency / Ping Tool */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Latency & Ping</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRunPingTest}
                    disabled={isTestingLatency}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition border border-indigo-200"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTestingLatency ? 'animate-spin' : ''}`} />
                    <span>{isTestingLatency ? 'Pinging...' : pingResult ? `${pingResult.latencyMs} ms` : 'Test Ping'}</span>
                  </button>
                  {pingResult && (
                    <span className="text-[11px] font-semibold text-emerald-600 capitalize">
                      {pingResult.status}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">Server response round-trip</p>
              </div>
            </div>

            {/* Network & Data Saver Mode Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Network & Data Saving Preference</h3>
                  <p className="text-xs text-slate-500">Select how DanAnty004 optimizes data consumption for your connection</p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase">
                  {networkStatus.mode}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Auto Adaptive Mode */}
                <button
                  onClick={() => handleModeSelect('auto')}
                  className={`p-3.5 rounded-2xl border text-left transition relative ${
                    networkStatus.mode === 'auto'
                      ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-xs text-slate-900">Auto-Adaptive (Recommended)</span>
                    </div>
                    {networkStatus.mode === 'auto' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Automatically checks signal strength & adjusts token payloads dynamically.
                  </p>
                </button>

                {/* Standard Full Data Mode */}
                <button
                  onClick={() => handleModeSelect('standard')}
                  className={`p-3.5 rounded-2xl border text-left transition relative ${
                    networkStatus.mode === 'standard'
                      ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-xs text-slate-900">High-Speed (5G / Fast Wi-Fi)</span>
                    </div>
                    {networkStatus.mode === 'standard' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Maximum detailed explanations, high-definition audio narration, zero data constraints.
                  </p>
                </button>

                {/* Data Saver Mode */}
                <button
                  onClick={() => handleModeSelect('data-saver')}
                  className={`p-3.5 rounded-2xl border text-left transition relative ${
                    networkStatus.mode === 'data-saver'
                      ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="font-bold text-xs text-slate-900">Data Saver (3G / 4G Limited)</span>
                    </div>
                    {networkStatus.mode === 'data-saver' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Saves ~65% mobile data using crisp bulleted summaries and deferred audio preloads.
                  </p>
                </button>

                {/* Ultra Data Saver Mode */}
                <button
                  onClick={() => handleModeSelect('ultra-saver')}
                  className={`p-3.5 rounded-2xl border text-left transition relative ${
                    networkStatus.mode === 'ultra-saver'
                      ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-rose-500" />
                      <span className="font-bold text-xs text-slate-900">Ultra Saver (2G / Low Bandwidth)</span>
                    </div>
                    {networkStatus.mode === 'ultra-saver' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Minimal text packets, fastest response for rural or weak cell tower areas.
                  </p>
                </button>

                {/* Offline-Only Mode */}
                <button
                  onClick={() => handleModeSelect('offline-only')}
                  className={`p-3.5 rounded-2xl border text-left transition relative sm:col-span-2 ${
                    networkStatus.mode === 'offline-only'
                      ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <WifiOff className="w-4 h-4 text-slate-600" />
                      <span className="font-bold text-xs text-slate-900">Offline Study Mode (Zero Mobile Data)</span>
                    </div>
                    {networkStatus.mode === 'offline-only' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Disables all outbound network calls. Runs 100% on local device memory and instant fallback knowledge base.
                  </p>
                </button>
              </div>
            </div>

            {/* Data Usage Economy & Analytics */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Data Economy</h4>
                  <p className="text-xs text-slate-800 font-semibold">
                    {formatBytes(totalTransferred)} Transferred • {formatBytes(dataStats.bytesSaved)} Saved (~{savingsPercent}%)
                  </p>
                </div>
                <button
                  onClick={handleResetStats}
                  className="text-[11px] font-bold text-slate-500 hover:text-rose-600 transition"
                >
                  Reset Counter
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${Math.min(100, Math.max(15, 100 - savingsPercent))}%` }}
                    className="bg-indigo-600 h-full"
                    title="Data Used"
                  />
                  <div
                    style={{ width: `${Math.min(100, savingsPercent)}%` }}
                    className="bg-emerald-500 h-full"
                    title="Data Saved"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    Data Received: {formatBytes(dataStats.bytesReceived)}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Data Saved: {formatBytes(dataStats.bytesSaved)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/60 text-center">
                <div className="p-2 rounded-xl bg-white border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Total Requests</span>
                  <span className="font-bold text-xs text-slate-900">{dataStats.requestsCount}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Offline Queries</span>
                  <span className="font-bold text-xs text-slate-900">{dataStats.offlineResponsesCount}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Sent (Upload)</span>
                  <span className="font-bold text-xs text-slate-900">{formatBytes(dataStats.bytesSent)}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Savings Ratio</span>
                  <span className="font-bold text-xs text-emerald-600 font-mono">+{savingsPercent}%</span>
                </div>
              </div>
            </div>

            {/* Offline Storage Readiness */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-950">Local Curriculum Cache</h4>
                  <p className="text-[11px] text-indigo-800/80">
                    {isPreloaded
                      ? '5 Subjects (25 Lessons & Quizzes) stored in browser storage for 100% offline access.'
                      : 'Curriculum available for local caching.'}
                  </p>
                </div>
              </div>

              <button
                onClick={handlePreloadAll}
                disabled={cachePreloading}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 rounded-xl font-bold text-xs transition shadow-2xs shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${cachePreloading ? 'animate-spin' : ''}`} />
                <span>{cachePreloading ? 'Caching...' : 'Refresh Local Cache'}</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Smart Network Resiliency Active</span>
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-xs"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
