import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Flame,
  Zap,
  Sparkles,
  Search,
  BookOpen,
  Bot,
  UserCheck,
  Bookmark,
  Award,
  BarChart3,
  Crown,
  Wifi,
  WifiOff,
  Signal,
  Radio,
  Gamepad2,
  Coins,
  Layers,
  Calculator,
  School,
  Info,
  AlarmClock,
} from 'lucide-react';
import { UserProgress, SubjectId, NetworkStatus, AppView, CLASS_LEVELS } from '../types';
import { CURRICULUM_DATA } from '../data/curriculum';
import { getLiveNetworkStatus, formatBytes, getSavedDataStats } from '../utils/networkManager';

interface NavbarProps {
  progress: UserProgress;
  activeView: AppView;
  selectedSubjectId: SubjectId | null;
  onNavigate: (view: AppView, subjectId?: SubjectId) => void;
  onOpenSearch: () => void;
  onOpenNetworkManager: () => void;
  onOpenClassSelector: () => void;
  onOpenMathSolver: () => void;
  onOpenAboutModal: () => void;
  onOpenAlarmModal: () => void;
  onOpenExamPrep?: () => void;
  isEducatorMode: boolean;
  onToggleEducatorMode: () => void;
}

export function Navbar({
  progress,
  activeView,
  selectedSubjectId,
  onNavigate,
  onOpenSearch,
  onOpenNetworkManager,
  onOpenClassSelector,
  onOpenMathSolver,
  onOpenAboutModal,
  onOpenAlarmModal,
  onOpenExamPrep,
  isEducatorMode,
  onToggleEducatorMode,
}: NavbarProps) {
  const [netStatus, setNetStatus] = useState<NetworkStatus>(getLiveNetworkStatus());
  const [dataStats, setDataStats] = useState(getSavedDataStats());

  const currentClassDef = CLASS_LEVELS.find((c) => c.id === (progress.selectedClass || 'sss')) || CLASS_LEVELS[2];

  useEffect(() => {
    const handleUpdate = () => {
      setNetStatus(getLiveNetworkStatus());
      setDataStats(getSavedDataStats());
    };
    window.addEventListener('online', handleUpdate);
    window.addEventListener('offline', handleUpdate);
    window.addEventListener('dananty_data_usage_updated', handleUpdate);
    window.addEventListener('dananty_data_mode_changed', handleUpdate);
    return () => {
      window.removeEventListener('online', handleUpdate);
      window.removeEventListener('offline', handleUpdate);
      window.removeEventListener('dananty_data_usage_updated', handleUpdate);
      window.removeEventListener('dananty_data_mode_changed', handleUpdate);
    };
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-5">
            <button
              id="brand-logo-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2.5 sm:space-x-3 group text-left focus:outline-hidden"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                  DanAnty<span className="text-indigo-600">004</span>
                </span>
                <span className="text-[9px] sm:text-[10px] block text-slate-400 font-semibold leading-none mt-0.5">
                  By Aliyu Kamal Hamid
                </span>
              </div>
            </button>

            {/* Choose Class Pill in Header */}
            <button
              id="nav-choose-class-btn"
              onClick={onOpenClassSelector}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-all"
              title="Click to choose your school class / grade level"
            >
              <span>{currentClassDef.icon}</span>
              <span className="max-w-[110px] truncate">{currentClassDef.shortName.split('(')[0]}</span>
              <span className="text-[10px] text-indigo-600 bg-white px-1.5 py-0.2 rounded font-mono font-extrabold border border-indigo-200">
                Class
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                id="nav-home-btn"
                onClick={() => onNavigate('home')}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeView === 'home' || activeView === 'subject'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Subjects
              </button>

              <button
                id="nav-topics-btn"
                onClick={() => onNavigate('topics')}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeView === 'topics'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Topics</span>
                <span className="px-1.5 py-0.2 rounded-md text-[9px] bg-amber-100 text-amber-900 font-bold border border-amber-300">
                  +20 🪙
                </span>
              </button>

              <button
                id="nav-arcade-btn"
                onClick={() => onNavigate('arcade')}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeView === 'arcade'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-slate-700 hover:text-amber-900 hover:bg-amber-50/70'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Arcade (15 Games)</span>
              </button>

              {/* Exam Prep Button */}
              {onOpenExamPrep && (
                <button
                  id="nav-exam-prep-btn"
                  onClick={onOpenExamPrep}
                  className="px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50 transition-colors border border-indigo-200/80 bg-indigo-50/40"
                  title="Prepare for WAEC, JAMB CBT, NECO, BECE & School Tests"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Exam Prep</span>
                  <span className="px-1 py-0.2 text-[8px] font-black bg-indigo-600 text-white rounded">
                    CBT
                  </span>
                </button>
              )}

              {/* Instant Math Solver Quick Button */}
              <button
                id="nav-math-solver-btn"
                onClick={onOpenMathSolver}
                className="px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 transition-colors border border-emerald-200/80 bg-emerald-50/40"
                title="Ultra-Fast Math Equation Solver (Step-by-step methods)"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span>Math Solver</span>
                <span className="px-1 py-0.2 text-[8px] font-black bg-emerald-600 text-white rounded">
                  Instant
                </span>
              </button>

              {/* Study Alarms Button */}
              <button
                id="nav-alarms-btn"
                onClick={onOpenAlarmModal}
                className="px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 text-amber-900 hover:text-amber-950 hover:bg-amber-100/60 transition-colors border border-amber-300/80 bg-amber-50/60"
                title="Custom Study Alarms & Reminders"
              >
                <AlarmClock className="w-3.5 h-3.5 text-amber-600" />
                <span>Alarms</span>
              </button>

              <button
                id="nav-ai-tutor-btn"
                onClick={() => onNavigate('ai-tutor')}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeView === 'ai-tutor'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Tutor</span>
              </button>

              <button
                id="nav-leaderboard-btn"
                onClick={() => onNavigate('leaderboard')}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeView === 'leaderboard'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>Ranks</span>
              </button>
            </nav>
          </div>

          {/* Right Controls: Math Solver, Alarm, Coin Counter, Network / Data, Search, Creator Info */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Mobile/Tablet Alarm Button */}
            <button
              id="nav-alarm-mobile-btn"
              onClick={onOpenAlarmModal}
              className="lg:hidden flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition shadow-2xs"
              title="Study Alarms & Reminders"
            >
              <AlarmClock className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[11px] hidden xs:inline">Alarm</span>
            </button>

            {/* Mobile/Tablet Math Solver Button */}
            <button
              id="nav-math-solver-mobile-btn"
              onClick={onOpenMathSolver}
              className="lg:hidden flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold transition shadow-2xs"
              title="Fast Math Equation Solver"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] hidden xs:inline">Math</span>
            </button>

            {/* Real-Time Coin Balance Pill */}
            <button
              id="nav-coins-btn"
              onClick={() => onNavigate('arcade')}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold transition shadow-2xs group"
              title="Your Coins: Earn 20 on reading topics, spend 10 to play arcade"
            >
              <Coins className="w-4 h-4 text-amber-600 group-hover:rotate-12 transition-transform" />
              <span className="font-mono text-amber-900 font-black">{progress.coins || 0}</span>
              <span className="text-[10px] text-amber-700 hidden md:inline font-semibold">Coins</span>
            </button>

            {/* Network & Data Indicator Button */}
            <button
              id="open-network-manager-btn"
              onClick={onOpenNetworkManager}
              className={`flex items-center space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                !netStatus.isOnline
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : netStatus.saveDataEnabled || netStatus.mode === 'data-saver' || netStatus.mode === 'ultra-saver'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
              title="Network & Mobile Data Manager"
            >
              {!netStatus.isOnline ? (
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              )}
              <span className="hidden sm:inline uppercase text-[10px]">
                {!netStatus.isOnline ? 'Offline' : netStatus.effectiveType}
              </span>
            </button>

            {/* Quick Search Button */}
            <button
              id="open-search-btn"
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-xs font-medium transition-colors"
              title="Search curriculum (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline text-xs">Search</span>
            </button>

            {/* About & Creator Button (Aliyu Kamal Hamid) */}
            <button
              id="open-about-creator-btn"
              onClick={onOpenAboutModal}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-amber-50 hover:from-indigo-100 hover:to-amber-100 border border-indigo-200 text-indigo-950 rounded-xl text-xs font-bold transition shadow-2xs"
              title="About this platform & Creator: Aliyu Kamal Hamid"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">About</span>
              <span className="text-[10px] hidden xl:inline text-indigo-700 font-normal">
                (Aliyu Kamal Hamid)
              </span>
            </button>

            {/* User Profile / Level Pill */}
            <button
              id="view-xp-dashboard-btn"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-1.5 pl-2 pr-1.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition text-left"
              title="View your Level & XP Breakdown"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                L{progress.level}
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}


