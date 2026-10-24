import React, { useState } from 'react';
import {
  Smartphone,
  ShieldCheck,
  Download,
  Share2,
  PlusSquare,
  Sparkles,
  CheckCircle2,
  X,
  Bell,
  Sliders,
  ExternalLink,
  Phone,
  BookmarkPlus,
  Compass,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PhonePinBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhonePinBadgeModal({ isOpen, onClose }: PhonePinBadgeModalProps) {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isAndroid,
    installApp,
    badgeCount,
    updateBadge,
    clearBadge,
    badgingSupported,
  } = usePWAInstall();

  const [activeTab, setActiveTab] = useState<'preview' | 'instructions' | 'badging'>('preview');
  const [installSuccess, setInstallSuccess] = useState(false);
  const [testCount, setTestCount] = useState<number>(badgeCount || 1);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await installApp();
    if (success) {
      setInstallSuccess(true);
    }
  };

  const handleSetBadge = (num: number) => {
    setTestCount(num);
    updateBadge(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
        role="dialog"
        aria-labelledby="pin-modal-title"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/40 border border-amber-400/50 flex items-center justify-center shadow-inner overflow-hidden p-1">
              <img src="/icon.svg" alt="Dan anty004 Badge" className="w-full h-full object-contain drop-shadow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="pin-modal-title" className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Dan anty004
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 rounded-full shadow-sm">
                  Phone Badge
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                Pin & Upload to Phone Home Screen (Standalone App)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-emerald-900/40 hover:bg-emerald-900/80 text-emerald-100 hover:text-white transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 pt-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'preview'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Phone Home Screen
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'instructions'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Download className="w-4 h-4" />
            How to Pin & Upload
          </button>
          <button
            onClick={() => setActiveTab('badging')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'badging'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Bell className="w-4 h-4" />
            Live App Badge API
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Status Alert if already installed/pinned */}
          {isInstalled && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 rounded-xl flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="font-bold">Active in Mobile Standalone Mode!</span> Dan anty004 is pinned to your phone home screen with launcher badge and offline storage enabled.
              </div>
            </div>
          )}

          {/* TAB 1: PHONE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 dark:text-slate-300">
                When you pin Dan anty004 on your phone (not in a browser tab), it launches full-screen like a native Android/iOS application with its official icon badge and the exact title <strong className="text-emerald-700 dark:text-emerald-400">Dan anty004</strong>:
              </div>

              {/* Realistic Mobile Screen Mockup */}
              <div className="relative mx-auto max-w-xs bg-slate-950 rounded-3xl p-3 border-4 border-slate-700 shadow-2xl overflow-hidden">
                {/* Phone Speaker & Camera Notch */}
                <div className="flex justify-center mb-3">
                  <div className="w-24 h-4 bg-slate-800 rounded-full flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                    <div className="w-10 h-1 rounded-full bg-slate-700"></div>
                  </div>
                </div>

                {/* Wallpaper simulation */}
                <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 p-4 border border-slate-800 min-h-[260px] flex flex-col justify-between">
                  {/* Top phone clock & signals */}
                  <div className="flex justify-between items-center text-[11px] text-slate-300 font-medium px-1">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span>5G</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* App Icon Grid with Highlighted Dan anty004 */}
                  <div className="my-auto py-3">
                    <div className="grid grid-cols-3 gap-3 place-items-center">
                      {/* Neighbor icon 1 */}
                      <div className="flex flex-col items-center gap-1 opacity-40">
                        <div className="w-13 h-13 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow">
                          📚
                        </div>
                        <span className="text-[10px] text-slate-300">Books</span>
                      </div>

                      {/* CENTER HERO: Dan anty004 */}
                      <div className="flex flex-col items-center gap-1.5 transform hover:scale-105 transition cursor-pointer">
                        <div className="relative w-15 h-15 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 border-2 border-amber-400 shadow-xl shadow-emerald-950/60 flex items-center justify-center p-1 overflow-visible">
                          <img src="/icon.svg" alt="Dan anty004" className="w-full h-full object-contain" />
                          
                          {/* Live Dynamic Badge Counter */}
                          {testCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-red-600 border border-white text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg animate-pulse">
                              {testCount}
                            </span>
                          )}

                          {/* Gold Crest Verified Ribbon */}
                          <div className="absolute -bottom-1 inset-x-1 h-3 bg-amber-400 text-slate-950 text-[7px] font-black tracking-wider uppercase flex items-center justify-center rounded-sm shadow">
                            004
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-white tracking-tight drop-shadow">
                          Dan anty004
                        </span>
                      </div>

                      {/* Neighbor icon 2 */}
                      <div className="flex flex-col items-center gap-1 opacity-40">
                        <div className="w-13 h-13 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-xs font-bold shadow">
                          ⏰
                        </div>
                        <span className="text-[10px] text-slate-300">Alarms</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Dock */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex justify-around items-center">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600/60 flex items-center justify-center text-white text-xs">📞</div>
                    <div className="w-9 h-9 rounded-xl bg-slate-700/60 flex items-center justify-center text-white text-xs">💬</div>
                    <div className="w-9 h-9 rounded-xl bg-amber-600/60 flex items-center justify-center text-white text-xs">⚙️</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {isInstallable ? (
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition transform active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    Install & Pin to Phone Now
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('instructions')}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition transform active:scale-95"
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    View Phone Pin Steps
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('badging')}
                  className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Bell className="w-4 h-4 text-amber-500" />
                  Test Live App Badge ({testCount})
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INSTRUCTIONS */}
          {activeTab === 'instructions' && (
            <div className="space-y-4">
              {/* Android Instructions */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">
                    🤖
                  </div>
                  Android (Chrome / Samsung Internet / Edge)
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>
                    Tap the <strong>three dots (⋮)</strong> menu in the top right corner of Chrome.
                  </li>
                  <li>
                    Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                  </li>
                  <li>
                    Confirm the prompt. The app icon will be saved on your home screen with the name <strong className="text-emerald-600 dark:text-emerald-400">&quot;Dan anty004&quot;</strong> and its official badge.
                  </li>
                </ol>
                {isInstallable && (
                  <button
                    onClick={handleInstallClick}
                    className="mt-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Tap Here to Trigger Install Dialog
                  </button>
                )}
              </div>

              {/* iPhone / iOS Safari Instructions */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">
                    🍎
                  </div>
                  iPhone & iPad (Safari)
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>
                    In Safari, tap the <strong>Share</strong> button <Share2 className="inline w-3.5 h-3.5 text-blue-500" /> at the bottom toolbar.
                  </li>
                  <li>
                    Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong> <PlusSquare className="inline w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />.
                  </li>
                  <li>
                    The name will default to <strong className="text-emerald-600 dark:text-emerald-400">&quot;Dan anty004&quot;</strong>. Tap <strong>&quot;Add&quot;</strong> in the top right.
                  </li>
                </ol>
              </div>

              {/* Offline & Standalone benefits */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300/60 dark:border-amber-800/50 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Why Pin to Phone?
                </div>
                <p>
                  No URL address bar, 100% offline access to the Holy Quran and all 10 Qira&apos;at, personal audio voice recorder studio, instant study alarms, and faster loading speeds.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE BADGE API */}
          {activeTab === 'badging' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 dark:text-slate-300">
                When Dan anty004 is pinned to your phone, modern mobile operating systems support the <strong>Web App Badging API</strong>. This shows an unread notification count badge directly over the Dan anty004 icon on your launcher!
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Live Phone Icon Badge Count:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-xs">
                    {testCount > 0 ? testCount : 'Cleared (0)'}
                  </span>
                </div>

                {/* Preset Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[1, 3, 5, 7, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleSetBadge(num)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                        testCount === num
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Badge: {num}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      clearBadge();
                      setTestCount(0);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition"
                  >
                    Clear Badge
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {badgingSupported
                    ? '✓ Web App Badging API is supported on your current browser engine.'
                    : 'ℹ The Badging API is active and activates when the app runs in standalone phone launcher mode.'}
                </div>
              </div>

              {/* What the badge represents */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Dan anty004 Badge Automations:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                    <span className="font-semibold text-emerald-800 dark:text-emerald-300">📖 Daily Quran Goal:</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                      Counts remaining daily verses to recite or memorized riwayat.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                    <span className="font-semibold text-amber-800 dark:text-amber-300">⏰ Study Alarms:</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                      Notifies you of upcoming revision sessions or Fajr study routines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>App Name: <strong className="text-slate-800 dark:text-slate-200">Dan anty004</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
