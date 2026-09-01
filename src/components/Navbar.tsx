import React from 'react';
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
} from 'lucide-react';
import { UserProgress, SubjectId } from '../types';
import { CURRICULUM_DATA } from '../data/curriculum';

interface NavbarProps {
  progress: UserProgress;
  activeView: 'home' | 'subject' | 'lesson' | 'quiz' | 'ai-tutor' | 'dashboard' | 'leaderboard';
  selectedSubjectId: SubjectId | null;
  onNavigate: (view: 'home' | 'subject' | 'lesson' | 'quiz' | 'ai-tutor' | 'dashboard' | 'leaderboard', subjectId?: SubjectId) => void;
  onOpenSearch: () => void;
  isEducatorMode: boolean;
  onToggleEducatorMode: () => void;
}

export function Navbar({
  progress,
  activeView,
  selectedSubjectId,
  onNavigate,
  onOpenSearch,
  isEducatorMode,
  onToggleEducatorMode,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            <button
              id="brand-logo-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                  DanAnty<span className="text-indigo-600">004</span>
                </span>
                <span className="text-[10px] block text-slate-400 font-medium leading-none mt-0.5">
                  Clean Minimal Academy
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1.5">
              <button
                id="nav-home-btn"
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeView === 'home'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Subjects
              </button>

              <button
                id="nav-ai-tutor-btn"
                onClick={() => onNavigate('ai-tutor')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeView === 'ai-tutor'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Tutor</span>
                <span className="px-1.5 py-0.5 rounded-md text-[9px] bg-indigo-600 text-white font-bold">24/7</span>
              </button>

              <button
                id="nav-leaderboard-btn"
                onClick={() => onNavigate('leaderboard')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeView === 'leaderboard'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>Leaderboard</span>
              </button>

              <button
                id="nav-progress-btn"
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeView === 'dashboard'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            </nav>
          </div>

          {/* Right Controls: Search, Streak, Level/XP, Educator Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Search Button */}
            <button
              id="open-search-btn"
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-xs font-medium transition-colors"
              title="Search curriculum (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* Streak Counter */}
            <div
              className="flex items-center space-x-1.5 px-3 py-2 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs font-bold"
              title={`${progress.streakDays} Day Learning Streak`}
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{progress.streakDays}d</span>
            </div>

            {/* User Profile / Level Pill */}
            <button
              id="view-xp-dashboard-btn"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-2.5 pl-3 pr-2 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition text-left"
              title="View your Level & XP Breakdown"
            >
              <div className="flex flex-col text-right leading-none hidden sm:flex">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Level {progress.level}</span>
                <span className="text-xs font-bold text-slate-800">{progress.xp} XP</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white ring-2 ring-indigo-500/20 text-indigo-600 font-bold text-xs">
                L{progress.level}
              </div>
            </button>

            {/* Parent / Educator Mode Toggle */}
            <button
              id="toggle-educator-mode-btn"
              onClick={onToggleEducatorMode}
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                isEducatorMode
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Educator / Parent Analytics View"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isEducatorMode ? 'Educator View' : 'Student View'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

