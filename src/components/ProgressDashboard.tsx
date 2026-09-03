import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Flame,
  Zap,
  Award,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Clock,
  Sparkles,
  UserCheck,
  Printer,
  ChevronRight,
  ShieldCheck,
  Compass,
  Crown,
} from 'lucide-react';
import { UserProgress, SubjectId, UserInterestsProfile } from '../types';
import { CURRICULUM_DATA } from '../data/curriculum';
import { ALL_BADGES } from '../data/badges';
import { AIRecommendationsSection } from './AIRecommendationsSection';
import { GamificationLeaderboard } from './GamificationLeaderboard';
import { WeeklyXpChart } from './WeeklyXpChart';

interface ProgressDashboardProps {
  progress: UserProgress;
  isEducatorMode: boolean;
  onSelectLesson: (lessonId: string) => void;
  onSelectSubject: (subjectId: SubjectId) => void;
  onUpdateInterests?: (profile: UserInterestsProfile) => void;
  onOpenExamPrep?: () => void;
}

export function ProgressDashboard({
  progress,
  isEducatorMode,
  onSelectLesson,
  onSelectSubject,
  onUpdateInterests,
  onOpenExamPrep,
}: ProgressDashboardProps) {
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'recommendations' | 'leaderboard'>('overview');

  const allLessons = CURRICULUM_DATA.flatMap((s) => s.lessons);
  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = progress.completedLessons.length;
  const overallProgressPercent = Math.round((completedLessonsCount / totalLessonsCount) * 100);

  // Calculate average quiz score
  const quizAttemptValues = Object.values(progress.quizAttempts);
  const averageScore = quizAttemptValues.length > 0
    ? Math.round(quizAttemptValues.reduce((acc, a) => acc + a.score, 0) / quizAttemptValues.length)
    : 0;

  // Estimated study time (15 mins per completed lesson + 5 mins per quiz)
  const totalMinutesSpent = (completedLessonsCount * 15) + (quizAttemptValues.length * 5);
  const hoursSpent = (totalMinutesSpent / 60).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isEducatorMode ? 'Parent & Educator Progress Analytics' : 'Student Learning Hub'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {isEducatorMode ? 'Comprehensive Student Mastery Report' : 'Your Learning Journey & Milestones'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Personalized AI paths, multi-disciplinary competency, and competitive league rankings.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {isEducatorMode && (
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print Report</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Dashboard Tab Bar */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3 pt-1">
          <button
            onClick={() => setDashboardTab('overview')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              dashboardTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Mastery Overview</span>
          </button>

          <button
            onClick={() => setDashboardTab('recommendations')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              dashboardTab === 'recommendations'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Recommendations</span>
            <span className="px-1.5 py-0.2 rounded-md bg-indigo-500/30 text-[10px] uppercase font-mono">Gemini</span>
          </button>

          <button
            onClick={() => setDashboardTab('leaderboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              dashboardTab === 'leaderboard'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Leaderboard & League</span>
          </button>
        </div>

        {/* 4 Quick Stat Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Level / XP */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <span>Overall Level</span>
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Lvl {progress.level}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {progress.xp} Total XP earned
            </div>
          </div>

          {/* Active Streak */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <span>Daily Streak</span>
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {progress.streakDays} Days
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {progress.streakDays >= 3 ? '1.2x XP Boost Active 🔥' : 'Maintain daily habit'}
            </div>
          </div>

          {/* Average Quiz Accuracy */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <span>Avg. Quiz Score</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {averageScore > 0 ? `${averageScore}%` : 'N/A'}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {quizAttemptValues.length} Quizzes completed
            </div>
          </div>

          {/* Estimated Study Hours */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <span>Engaged Time</span>
              <Clock className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {hoursSpent} hrs
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {completedLessonsCount} of {totalLessonsCount} lessons finished
            </div>
          </div>
        </div>
      </div>

      {/* Tab 1: Mastery Overview */}
      {dashboardTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Quick AI Suggestion Preview Strip */}
          <div className="p-5 rounded-3xl bg-linear-to-r from-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  AI Recommended Next Step
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Discover customized learning suggestions tailored to your quiz results
                </h3>
              </div>
            </div>

            <button
              onClick={() => setDashboardTab('recommendations')}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold rounded-xl transition shadow-sm whitespace-nowrap"
            >
              Explore AI Recommendations
            </button>
          </div>

          {/* Weekly XP Gain & Exam Output Line Chart */}
          <WeeklyXpChart progress={progress} onOpenExamPrep={onOpenExamPrep} />

          {/* Subject Mastery Progress Bars */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Subject Progression & Competency
                </h2>
                <p className="text-xs text-slate-500">
                  Breakdown of beginner, intermediate, and advanced curriculum completion.
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                {overallProgressPercent}% Total Mastery
              </span>
            </div>

            <div className="space-y-4">
              {CURRICULUM_DATA.map((subject) => {
                const total = subject.lessons.length;
                const completed = subject.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
                const pct = Math.round((completed / total) * 100);

                return (
                  <div key={subject.id} className="space-y-2 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
                    <div className="flex justify-between items-center text-xs">
                      <button
                        onClick={() => onSelectSubject(subject.id)}
                        className="font-bold text-slate-900 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                      >
                        <span>{subject.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                      <span className="font-semibold text-slate-600 font-mono">
                        {completed}/{total} Lessons ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges & Achievements Showcase */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Earned Badges & Academic Honors
                </h2>
                <p className="text-xs text-slate-500">
                  {progress.badges.length} of {ALL_BADGES.length} Badges Acquired
                </p>
              </div>
              <button
                onClick={() => setDashboardTab('leaderboard')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View Full Showcase & Rankings &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ALL_BADGES.slice(0, 8).map((badge) => {
                const isUnlocked = progress.badges.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition-colors flex flex-col justify-between space-y-3 ${
                      isUnlocked
                        ? 'bg-white border-slate-300 shadow-xs'
                        : 'bg-slate-50/50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2.5 rounded-xl ${
                        isUnlocked ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-400'
                      }`}>
                        <Trophy className="w-5 h-5" />
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                        isUnlocked ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isUnlocked ? 'Unlocked' : 'Locked'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {badge.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {badge.description}
                      </p>
                    </div>

                    <div className="text-[10px] font-medium text-slate-400 pt-1 border-t border-slate-100">
                      {badge.requirement}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Quiz Logs & Assessment History */}
          {quizAttemptValues.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                Recent Quiz Assessment History
              </h2>

              <div className="divide-y divide-slate-100">
                {quizAttemptValues.map((attempt, i) => {
                  const matchedLesson = allLessons.find((l) => l.id === attempt.lessonId);

                  return (
                    <div key={i} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900">
                          {matchedLesson ? matchedLesson.title : attempt.lessonId}
                        </span>
                        <div className="text-slate-400 text-[11px]">
                          {new Date(attempt.completedAt).toLocaleDateString()} at {new Date(attempt.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {attempt.durationSeconds && ` • ${attempt.durationSeconds}s duration`}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className={`px-2.5 py-1 rounded-full font-bold font-mono ${
                          attempt.score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {attempt.score}% ({attempt.correctCount}/{attempt.totalQuestions})
                        </span>

                        {matchedLesson && (
                          <button
                            onClick={() => onSelectLesson(matchedLesson.id)}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold"
                          >
                            Review
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Tab 2: AI Recommendations */}
      {dashboardTab === 'recommendations' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AIRecommendationsSection
            progress={progress}
            onSelectLesson={onSelectLesson}
            onUpdateProgress={(updated) => {
              if (onUpdateInterests && updated.interestsProfile) {
                onUpdateInterests(updated.interestsProfile);
              }
            }}
          />
        </motion.div>
      )}

      {/* Tab 3: Gamification & Leaderboard */}
      {dashboardTab === 'leaderboard' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GamificationLeaderboard
            progress={progress}
            onSelectLesson={onSelectLesson}
          />
        </motion.div>
      )}
    </div>
  );
}

