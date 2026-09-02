import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Zap,
  Coins,
  ArrowRight,
  Sparkles,
  Bot,
  HelpCircle,
  Award,
  Layers,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { Subject, Lesson, SubjectId, UserProgress } from '../types';
import { CURRICULUM_DATA } from '../data/curriculum';

interface SubjectTopicExplorerProps {
  progress: UserProgress;
  selectedSubjectId?: SubjectId | 'all';
  onSelectTopic: (subject: Subject, lesson: Lesson) => void;
  onTakeQuiz: (subject: Subject, lesson: Lesson) => void;
  onAskAIAboutTopic: (subject: Subject, lesson: Lesson) => void;
  onNavigateToArcade: () => void;
}

export function SubjectTopicExplorer({
  progress,
  selectedSubjectId = 'all',
  onSelectTopic,
  onTakeQuiz,
  onAskAIAboutTopic,
  onNavigateToArcade,
}: SubjectTopicExplorerProps) {
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<SubjectId | 'all'>(selectedSubjectId);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  // Gather all lessons with their parent subject
  const allTopicsWithSubject = CURRICULUM_DATA.flatMap((subject) =>
    subject.lessons.map((lesson) => ({
      subject,
      lesson,
    }))
  );

  const filteredTopics = allTopicsWithSubject.filter(({ subject, lesson }) => {
    const matchesSubject = activeSubjectFilter === 'all' || subject.id === activeSubjectFilter;
    const matchesLevel = levelFilter === 'all' || lesson.level === levelFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      lesson.title.toLowerCase().includes(query) ||
      lesson.subtitle.toLowerCase().includes(query) ||
      subject.title.toLowerCase().includes(query) ||
      lesson.tags?.some((t) => t.toLowerCase().includes(query));

    return matchesSubject && matchesLevel && matchesQuery;
  });

  const totalLessons = allTopicsWithSubject.length;
  const completedCount = progress.completedLessons.length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Coin Banner */}
        <div className="relative rounded-3xl bg-slate-900 text-white p-6 sm:p-8 overflow-hidden border border-slate-800 shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-400/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Subject & Topic Directory • Earn Coins by Learning</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif]">
                Select Any Subject & Explore Its Topics
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Choose any curriculum subject below to explore lessons, test interactive labs, and earn <strong className="text-amber-400">+20 coins</strong> on every topic read to unlock games in the Arcade!
              </p>
            </div>

            {/* Quick Balance / Arcade Link */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-800/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 pr-4 border-r border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 border border-amber-400/30">
                  <Coins className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Your Coins
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {progress.coins || 0}
                    </span>
                    <span className="text-xs text-amber-200 font-bold">Coins</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onNavigateToArcade}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md"
              >
                <span>Play Mini-Games (10 🪙)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subject Selection Pills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Select Subject
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredTopics.length} Topics
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={() => setActiveSubjectFilter('all')}
              className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                activeSubjectFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span className="text-xs font-bold">All Subjects</span>
              <span className={`text-[11px] font-medium mt-2 ${activeSubjectFilter === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
                {totalLessons} Topics total
              </span>
            </button>

            {CURRICULUM_DATA.map((sub) => {
              const isSelected = activeSubjectFilter === sub.id;
              const completedInSub = sub.lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;

              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubjectFilter(sub.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-600/10'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block truncate">{sub.title}</span>
                    <span className={`text-[10px] font-semibold block ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {sub.lessons.length} Topics
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10">
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-indigo-100' : 'text-emerald-600'}`}>
                      {completedInSub}/{sub.lessons.length} done
                    </span>
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-amber-300' : 'text-amber-600'}`}>
                      +20 🪙
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Level Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topic name, keyword (e.g., Grammar, Quadratic, DNA, Algorithm, Spanish)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto">
            <span className="text-xs font-bold text-slate-400 pl-2">Level:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'beginner', label: 'Beginner' },
              { id: 'intermediate', label: 'Intermediate' },
              { id: 'advanced', label: 'Advanced' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setLevelFilter(lvl.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  levelFilter === lvl.id
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Topics List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map(({ subject, lesson }, index) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isQuizPassed = progress.quizAttempts[lesson.id]?.score >= 70;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md ${
                  isCompleted
                    ? 'bg-white border-emerald-200 hover:border-emerald-300'
                    : 'bg-white border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="p-6 space-y-4">
                  {/* Topic Metadata & Rewards */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {subject.title}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        <Coins className="w-3 h-3 text-amber-600" />
                        <span>+20 Coins</span>
                      </span>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif] leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {lesson.subtitle}
                    </p>
                  </div>

                  {/* Level & Duration */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 pt-1 border-t border-slate-100">
                    <span className="capitalize px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                      {lesson.level}
                    </span>
                    <span className="flex items-center space-x-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lesson.durationMinutes} min read</span>
                    </span>
                    <span className="flex items-center space-x-1 text-amber-600 font-bold">
                      <Zap className="w-3.5 h-3.5 fill-amber-500" />
                      <span>+{lesson.xpReward} XP</span>
                    </span>
                  </div>

                  {/* Tags */}
                  {lesson.tags && lesson.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {lesson.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-medium text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectTopic(subject, lesson)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isCompleted ? 'Review Topic (+20 🪙)' : 'Read Topic (+20 Coins)'}</span>
                  </button>

                  <button
                    onClick={() => onAskAIAboutTopic(subject, lesson)}
                    className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-600 border border-slate-200 text-xs font-bold transition"
                    title="Ask AI Tutor about this topic"
                  >
                    <Bot className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredTopics.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No matching topics found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or selecting "All Subjects" from the subject selector above.
            </p>
            <button
              onClick={() => {
                setActiveSubjectFilter('all');
                setSearchQuery('');
                setLevelFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
