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
  GraduationCap,
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
  onOpenExamPrep?: () => void;
}

export function SubjectTopicExplorer({
  progress,
  selectedSubjectId = 'all',
  onSelectTopic,
  onTakeQuiz,
  onAskAIAboutTopic,
  onNavigateToArcade,
  onOpenExamPrep,
}: SubjectTopicExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'science' | 'art' | 'commercial' | 'primary' | 'languages'>('all');
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<SubjectId | 'all'>(selectedSubjectId);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  // Filter subjects by category
  const filteredSubjectsByCategory = CURRICULUM_DATA.filter((subject) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'science') return subject.category === 'science';
    if (activeCategory === 'art') return subject.category === 'art';
    if (activeCategory === 'commercial') return subject.category === 'commercial';
    if (activeCategory === 'primary') return subject.category === 'primary';
    if (activeCategory === 'languages') return subject.category === 'languages' || subject.id === 'world-languages';
    return true;
  });

  // Gather all lessons with their parent subject
  const allTopicsWithSubject = CURRICULUM_DATA.flatMap((subject) =>
    subject.lessons.map((lesson) => ({
      subject,
      lesson,
    }))
  );

  const filteredTopics = allTopicsWithSubject.filter(({ subject, lesson }) => {
    const matchesCategory =
      activeCategory === 'all' ||
      subject.category === activeCategory ||
      (activeCategory === 'languages' && (subject.category === 'languages' || subject.id === 'world-languages'));

    const matchesSubject = activeSubjectFilter === 'all' || subject.id === activeSubjectFilter;
    const matchesLevel = levelFilter === 'all' || lesson.level === levelFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      lesson.title.toLowerCase().includes(query) ||
      lesson.subtitle.toLowerCase().includes(query) ||
      subject.title.toLowerCase().includes(query) ||
      lesson.tags?.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSubject && matchesLevel && matchesQuery;
  });

  const totalLessons = allTopicsWithSubject.length;

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
                <span>All Subjects Around The World • Arts, Sciences, Commercial & Primary</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif]">
                Select Any Subject & Explore Topics
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Comprehensive curriculum from Lower & Upper Primary, JSS1-3, SS1-3 to Undergrad. Earn <strong className="text-amber-400">+20 coins</strong> on every topic read and practice for exams!
              </p>
            </div>

            {/* Quick Actions / Exam & Arcade Links */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-800/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-700">
              {onOpenExamPrep && (
                <button
                  onClick={onOpenExamPrep}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-200" />
                  <span>Exam Prep (WAEC/JAMB)</span>
                </button>
              )}

              <div className="flex items-center space-x-3 px-3 py-1 bg-slate-900/60 rounded-xl border border-slate-700">
                <Coins className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Coins</span>
                  <span className="text-sm font-black text-amber-400 font-mono">
                    {progress.coins || 0} 🪙
                  </span>
                </div>
              </div>

              <button
                onClick={onNavigateToArcade}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md"
              >
                <span>Play Games (10 🪙)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="bg-white p-2 sm:p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All Subjects', count: CURRICULUM_DATA.length },
            { id: 'science', label: '🔬 Sciences & STEM', count: CURRICULUM_DATA.filter((s) => s.category === 'science').length },
            { id: 'art', label: '🎨 Arts & Humanities', count: CURRICULUM_DATA.filter((s) => s.category === 'art').length },
            { id: 'commercial', label: '📈 Commercial & Business', count: CURRICULUM_DATA.filter((s) => s.category === 'commercial').length },
            { id: 'primary', label: '🌱 Primary Foundation (Basic 1-6)', count: CURRICULUM_DATA.filter((s) => s.category === 'primary').length },
            { id: 'languages', label: '🌍 World Languages', count: CURRICULUM_DATA.filter((s) => s.category === 'languages' || s.id === 'world-languages').length },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                setActiveSubjectFilter('all');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Subject Selection Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Select Specific Subject ({filteredSubjectsByCategory.length} Available)
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredTopics.length} Topics
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <button
              onClick={() => setActiveSubjectFilter('all')}
              className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                activeSubjectFilter === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-600/10'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span className="text-xs font-bold">All Subjects</span>
              <span className={`text-[10px] font-medium mt-2 ${activeSubjectFilter === 'all' ? 'text-indigo-200' : 'text-slate-500'}`}>
                {filteredTopics.length} Topics
              </span>
            </button>

            {filteredSubjectsByCategory.map((sub) => {
              const isSelected = activeSubjectFilter === sub.id;
              const completedInSub = sub.lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;

              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubjectFilter(sub.id)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-600/10'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block truncate">{sub.title}</span>
                    <span className={`text-[10px] font-semibold block capitalize ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {sub.category || 'Core'} • {sub.lessons.length} Topics
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
              placeholder="Search topic name, keyword (e.g., Photosynthesis, Accounting, Government, Times Tables, Physics)..."
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

                  {/* Tags */}
                  {lesson.tags && lesson.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {lesson.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Level & XP details */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lesson.durationMinutes} mins</span>
                    </span>
                    <span className="flex items-center space-x-1 text-indigo-600 font-semibold">
                      <Zap className="w-3.5 h-3.5" />
                      <span>+{lesson.xpReward} XP</span>
                    </span>
                    <span className="capitalize px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {lesson.level}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAskAIAboutTopic(subject, lesson)}
                    className="py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white text-slate-700 hover:text-indigo-600 text-xs font-bold transition flex items-center justify-center space-x-1"
                  >
                    <Bot className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Ask AI</span>
                  </button>

                  <button
                    onClick={() => onSelectTopic(subject, lesson)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    <span>{isCompleted ? 'Review (+20🪙)' : 'Study (+20🪙)'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No topics found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
