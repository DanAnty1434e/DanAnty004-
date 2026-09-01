import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Flame,
  Zap,
  Award,
  Crown,
  Medal,
  Sparkles,
  TrendingUp,
  Shield,
  HelpCircle,
  CheckCircle2,
  Lock,
  ChevronRight,
  Calculator,
  FlaskConical,
  Code2,
  Globe2,
  BookOpen,
  Volume2,
  Atom,
  Terminal,
  Languages,
  Sliders,
} from 'lucide-react';
import { UserProgress, BadgeCategory, BadgeTier, LeagueTier, Badge } from '../types';
import { ALL_BADGES } from '../data/badges';
import { generateLiveLeaderboard } from '../data/leaderboard';
import { getLeagueForXp, getLevelProgress } from '../utils/storage';
import { playChimeSound } from '../utils/voiceAssistant';

interface GamificationLeaderboardProps {
  progress: UserProgress;
  onSelectLesson?: (lessonId: string) => void;
}

const BADGE_ICONS: Record<string, React.ElementType> = {
  Calculator,
  FlaskConical,
  Code2,
  Globe2,
  BookOpen,
  Sparkles,
  Award,
  Medal,
  Zap,
  Flame,
  Crown,
  Bot: Sparkles,
  Trophy,
  Atom,
  Terminal,
  Languages,
  Sliders,
  Brain: Sparkles,
};

const LEAGUE_INFO: Record<LeagueTier, { minXp: number; nextLeague: string; color: string; bg: string; badge: string }> = {
  Bronze: { minXp: 0, nextLeague: 'Silver (250 XP)', color: 'text-amber-700', bg: 'bg-amber-100', badge: '🥉 Bronze Division' },
  Silver: { minXp: 250, nextLeague: 'Gold (600 XP)', color: 'text-slate-700', bg: 'bg-slate-200', badge: '🥈 Silver Division' },
  Gold: { minXp: 600, nextLeague: 'Diamond (1200 XP)', color: 'text-amber-600', bg: 'bg-amber-100', badge: '🥇 Gold Elite' },
  Diamond: { minXp: 1200, nextLeague: 'Master (2000 XP)', color: 'text-cyan-700', bg: 'bg-cyan-100', badge: '💎 Diamond Premier' },
  Master: { minXp: 2000, nextLeague: 'Max League', color: 'text-purple-700', bg: 'bg-purple-100', badge: '👑 Master Champions League' },
};

export function GamificationLeaderboard({ progress }: GamificationLeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'badges' | 'points-guide'>('leaderboard');
  const [badgeFilter, setBadgeFilter] = useState<BadgeCategory | 'all'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const currentLeague = getLeagueForXp(progress.xp);
  const leagueConfig = LEAGUE_INFO[currentLeague];
  const levelInfo = getLevelProgress(progress.xp);

  const { entries, currentUserRank, totalParticipants } = generateLiveLeaderboard(
    progress.xp,
    progress.streakDays,
    progress.level,
    progress.badges
  );

  const filteredBadges = ALL_BADGES.filter(
    (b) => badgeFilter === 'all' || b.category === badgeFilter
  );

  const unlockedCount = progress.badges.length;
  const totalBadgesCount = ALL_BADGES.length;

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    if (progress.badges.includes(badge.id)) {
      playChimeSound('badge');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Gamification Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Leaderboard & Leagues</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition ${
              activeTab === 'badges'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Badges & Honors ({unlockedCount}/{totalBadgesCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('points-guide')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition ${
              activeTab === 'points-guide'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>XP Points Rulebook</span>
          </button>
        </div>

        {/* Live League Status Chip */}
        <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center space-x-2 text-xs">
          <span className="font-bold text-slate-900">{leagueConfig.badge}</span>
          <span className="text-slate-400">|</span>
          <span className="font-mono text-indigo-600 font-bold">Rank #{currentUserRank} of {totalParticipants}</span>
        </div>
      </div>

      {/* TAB 1: LEADERBOARD & LEAGUES */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* League Promotion Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Weekly Academic Competition</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
                  DanAnty Scholars League
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Earn XP by completing interactive lessons and acing quizzes to climb divisions every week.
                </p>
              </div>

              {/* User Standing Summary */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 min-w-[220px]">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Your Current Rank</span>
                  <span className="font-mono font-bold text-amber-400">#{currentUserRank} Overall</span>
                </div>
                <div className="text-xl font-extrabold font-mono text-white">
                  {progress.xp} XP
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Level {levelInfo.currentLevel} Progress</span>
                    <span>{levelInfo.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${levelInfo.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {entries.slice(0, 3).map((entry, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              const isThird = idx === 2;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-3xl border text-center relative overflow-hidden transition-all ${
                    isFirst
                      ? 'bg-linear-to-b from-amber-500/10 to-white border-amber-300 shadow-sm'
                      : isSecond
                      ? 'bg-linear-to-b from-slate-500/10 to-white border-slate-300'
                      : 'bg-linear-to-b from-orange-500/10 to-white border-orange-200'
                  } ${entry.isCurrentUser ? 'ring-2 ring-indigo-600' : ''}`}
                >
                  {/* Top Rank Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-extrabold text-sm ${
                        isFirst
                          ? 'bg-amber-400 text-slate-900 shadow-xs'
                          : isSecond
                          ? 'bg-slate-300 text-slate-800'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className={`w-16 h-16 rounded-full object-cover border-2 shadow-xs ${
                          isFirst ? 'border-amber-400' : isSecond ? 'border-slate-300' : 'border-orange-400'
                        }`}
                      />
                      {isFirst && (
                        <Crown className="w-6 h-6 text-amber-500 fill-amber-400 absolute -top-3 -right-2 drop-shadow-xs" />
                      )}
                    </div>

                    <div>
                      <div className="font-extrabold text-sm text-slate-900 flex items-center justify-center gap-1">
                        <span>{entry.name}</span>
                        {entry.isCurrentUser && (
                          <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-bold">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">{entry.specialty}</div>
                    </div>

                    <div className="flex items-center justify-center space-x-3 text-xs pt-1">
                      <span className="font-extrabold text-indigo-600 font-mono text-sm">
                        {entry.xp} XP
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                        {entry.streakDays}d streak
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Full Leaderboard Table */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 font-['Outfit',sans-serif] uppercase tracking-wider">
                Full Rankings Standings
              </h3>
              <span className="text-xs text-slate-500">Live XP updates</span>
            </div>

            <div className="divide-y divide-slate-100">
              {entries.map((entry, index) => {
                const isUser = entry.isCurrentUser;

                return (
                  <div
                    key={entry.id}
                    className={`py-3.5 px-3 rounded-2xl flex items-center justify-between gap-3 transition-colors ${
                      isUser ? 'bg-indigo-50/80 border border-indigo-200/80' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                      <span
                        className={`w-6 text-center font-extrabold font-mono text-xs ${
                          index < 3 ? 'text-indigo-600' : 'text-slate-400'
                        }`}
                      >
                        #{index + 1}
                      </span>

                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                      />

                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 truncate flex items-center gap-1.5">
                          <span>{entry.name}</span>
                          {isUser && (
                            <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.2 rounded-full font-bold">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{entry.specialty}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0 text-xs">
                      <div className="hidden sm:flex items-center space-x-1 text-slate-600 font-medium">
                        <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                        <span>{entry.streakDays}d</span>
                      </div>

                      <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">
                        Lvl {entry.level}
                      </span>

                      <div className="font-extrabold font-mono text-indigo-700 text-xs sm:text-sm w-20 text-right">
                        {entry.xp} XP
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BADGES & ACHIEVEMENTS */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          {/* Badges Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Badges' },
                { id: 'subject-mastery', label: 'Subject Mastery' },
                { id: 'quiz-performance', label: 'Quiz Performance' },
                { id: 'streak-dedication', label: 'Streak Dedication' },
                { id: 'special-milestones', label: 'Milestones & AI' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setBadgeFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    badgeFilter === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Click any badge to inspect criteria & point values
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBadges.map((badge) => {
              const isUnlocked = progress.badges.includes(badge.id);
              const IconComp = BADGE_ICONS[badge.icon] || Award;

              const tierColors: Record<BadgeTier, { border: string; bg: string; text: string }> = {
                bronze: { border: 'border-amber-600/40', bg: 'bg-amber-50', text: 'text-amber-800' },
                silver: { border: 'border-slate-400', bg: 'bg-slate-100', text: 'text-slate-800' },
                gold: { border: 'border-amber-400', bg: 'bg-amber-100', text: 'text-amber-900' },
                diamond: { border: 'border-cyan-400', bg: 'bg-cyan-100', text: 'text-cyan-900' },
              };

              const tierStyle = tierColors[badge.tier || 'bronze'];

              return (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleBadgeClick(badge)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                    isUnlocked
                      ? 'bg-white border-slate-300 shadow-2xs hover:shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-3 rounded-2xl ${
                        isUnlocked
                          ? 'bg-indigo-50 text-indigo-600 shadow-xs'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${tierStyle.bg} ${tierStyle.text}`}
                      >
                        {badge.tier}
                      </span>
                      <span className="text-[10px] font-bold font-mono text-emerald-600">
                        +{badge.xpBonus} XP
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{badge.title}</h4>
                    <p className="text-xs text-slate-500 leading-snug line-clamp-2">
                      {badge.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium truncate max-w-[170px]">
                      {badge.requirement}
                    </span>
                    <span
                      className={`font-bold ${
                        isUnlocked ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    >
                      {isUnlocked ? 'Unlocked ✓' : 'Locked 🔒'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Badge Inspection Modal */}
          <AnimatePresence>
            {selectedBadge && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 text-center relative"
                >
                  <button
                    onClick={() => setSelectedBadge(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold p-1 text-sm"
                  >
                    ✕
                  </button>

                  <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                    {React.createElement(BADGE_ICONS[selectedBadge.icon] || Award, {
                      className: 'w-8 h-8',
                    })}
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                      <span>{selectedBadge.tier} Tier</span>
                      <span>•</span>
                      <span className="text-emerald-700">+{selectedBadge.xpBonus} XP Bonus</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                      {selectedBadge.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {selectedBadge.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Achievement Requirement
                    </div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      <span>{selectedBadge.requirement}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedBadge(null)}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow"
                  >
                    Got It!
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* TAB 3: XP POINTS RULEBOOK */}
      {activeTab === 'points-guide' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
              How to Earn Points & Level Up
            </h3>
            <p className="text-xs text-slate-500">
              The DanAnty004 point system rewards curiosity, consistency, accuracy, and active experimentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Rule 1: Lessons */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs">
                <BookOpen className="w-4 h-4" />
                <span>Lesson Completion</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 font-mono">
                +40 to +75 XP
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Earn base XP for reading interactive sections, plus repeat review bonus for mastering advanced modules.
              </p>
            </div>

            {/* Rule 2: Quizzes */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs">
                <Award className="w-4 h-4" />
                <span>Quiz Scores & Speed</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 font-mono">
                Up to +105 XP
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Earn proportional score XP + <strong>30 XP perfect bonus</strong> (100%) + <strong>15 XP rapid solver bonus</strong> (sub-60s).
              </p>
            </div>

            {/* Rule 3: Streak multiplier */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-orange-600 font-bold text-xs">
                <Flame className="w-4 h-4" />
                <span>Daily Streak Multiplier</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 font-mono">
                1.2x Boost
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Maintain a 3+ day consecutive learning habit to activate a 20% point boost on all completed activities!
              </p>
            </div>

            {/* Rule 4: Badges */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs">
                <Medal className="w-4 h-4" />
                <span>Achievement Badges</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 font-mono">
                +50 to +200 XP
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Tiered Bronze, Silver, Gold, and Diamond achievement badges award instant lump-sum XP bonuses.
              </p>
            </div>

            {/* Rule 5: Lab Widgets */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-600 font-bold text-xs">
                <Sliders className="w-4 h-4" />
                <span>Interactive Labs & Sims</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 font-mono">
                +15 XP
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Run live Python playgrounds, drag math function curves, and simulate chemistry bonds in the widgets.
              </p>
            </div>

            {/* Rule 6: AI Inquiries */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-purple-600 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>AI Tutor Consultations</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 font-mono">
                +10 XP
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Ask the DanAnty AI Assistant deep questions, request analogies, and explore pedagogical breakdowns.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
