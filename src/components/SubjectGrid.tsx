import React, { useState } from 'react';
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Code2,
  Languages,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  PlayCircle,
  Trophy,
  BrainCircuit,
  Bot,
  Gamepad2,
  Coins,
  Layers,
  Zap,
  Award,
  School,
  AlarmClock,
  GraduationCap,
  Atom,
  TestTube,
  Dna,
  Wheat,
  Landmark,
  Scale,
  HeartHandshake,
  Compass,
  Receipt,
  Briefcase,
  TrendingUp,
  Palette,
  Music,
  Smile,
  Sun,
  BookMarked,
  Users,
} from 'lucide-react';
import { Subject, SubjectId, UserProgress, CLASS_LEVELS } from '../types';
import { CURRICULUM_DATA } from '../data/curriculum';

interface SubjectGridProps {
  progress: UserProgress;
  onSelectSubject: (subjectId: SubjectId) => void;
  onSelectLesson: (lessonId: string) => void;
  onOpenAITutor: () => void;
  onOpenTopics?: () => void;
  onOpenArcade?: () => void;
  onOpenMathSolver?: () => void;
  onOpenClassSelector?: () => void;
  onOpenAboutModal?: () => void;
  onOpenAlarmModal?: () => void;
  onOpenExamPrep?: () => void;
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
  FlaskConical: <FlaskConical className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Languages: <Languages className="w-6 h-6" />,
  Atom: <Atom className="w-6 h-6" />,
  TestTube: <TestTube className="w-6 h-6" />,
  Dna: <Dna className="w-6 h-6" />,
  Wheat: <Wheat className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Receipt: <Receipt className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Landmark: <Landmark className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />,
  Smile: <Smile className="w-6 h-6" />,
  Sun: <Sun className="w-6 h-6" />,
  BookMarked: <BookMarked className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
};

export function SubjectGrid({
  progress,
  onSelectSubject,
  onSelectLesson,
  onOpenAITutor,
  onOpenTopics,
  onOpenArcade,
  onOpenMathSolver,
  onOpenClassSelector,
  onOpenAboutModal,
  onOpenAlarmModal,
  onOpenExamPrep,
}: SubjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'science' | 'art' | 'commercial' | 'primary' | 'languages'>('all');

  // Find last or in-progress lesson
  const inProgressLesson =
    CURRICULUM_DATA.flatMap((s) => s.lessons).find((l) => l.id === progress.inProgressLessonId) ||
    CURRICULUM_DATA[0].lessons[0];

  const currentClassDef =
    CLASS_LEVELS.find((c) => c.id === (progress.selectedClass || 'ss3')) || CLASS_LEVELS[5];

  const filteredSubjects = CURRICULUM_DATA.filter((subject) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'science') return subject.category === 'science';
    if (selectedCategory === 'art') return subject.category === 'art';
    if (selectedCategory === 'commercial') return subject.category === 'commercial';
    if (selectedCategory === 'primary') return subject.category === 'primary';
    if (selectedCategory === 'languages') return subject.category === 'languages' || subject.id === 'world-languages';
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome & Quick Resume Card */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl shrink-0 border border-indigo-800/40">
        <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40px] right-20 w-32 h-32 bg-amber-400 rounded-full opacity-10 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-xs text-indigo-300 border border-indigo-400/30 text-xs font-bold rounded-full uppercase tracking-wider">
                DanAnty004 Universal Academy
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full shadow-xs">
                <Coins className="w-3.5 h-3.5" />
                <span>{progress.coins || 0} Coins</span>
              </span>
              {/* Creator Pill */}
              <button
                onClick={onOpenAboutModal}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-full border border-white/20 transition-colors"
                title="Invented by Aliyu Kamal Hamid"
              >
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>By Aliyu Kamal Hamid</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif] leading-tight">
              All Subjects Round The World & Exam Prep
            </h1>

            <p className="text-indigo-100 text-xs sm:text-base leading-relaxed max-w-2xl">
              Master Sciences, Arts, Commercial, and Primary foundations. Practice for <strong className="text-amber-300">WAEC, JAMB CBT, NECO, BECE</strong>, set study alarms, and get exact step-by-step AI answers!
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {onOpenExamPrep && (
                <button
                  id="hero-exam-prep-btn"
                  onClick={onOpenExamPrep}
                  className="bg-amber-400 text-slate-950 hover:bg-amber-300 px-5 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 group"
                >
                  <GraduationCap className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
                  <span>Study for Exams (WAEC / JAMB)</span>
                  <span className="px-1.5 py-0.5 bg-slate-950 text-amber-300 text-[10px] font-mono rounded">
                    CBT
                  </span>
                </button>
              )}

              {onOpenAlarmModal && (
                <button
                  id="hero-study-alarm-btn"
                  onClick={onOpenAlarmModal}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-xs transition-colors flex items-center space-x-2 group"
                >
                  <AlarmClock className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span>Set Study Alarm</span>
                </button>
              )}

              {onOpenMathSolver && (
                <button
                  id="hero-solve-math-btn"
                  onClick={onOpenMathSolver}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 group"
                >
                  <Calculator className="w-4 h-4 text-emerald-200" />
                  <span>Math Solver</span>
                </button>
              )}

              {onOpenTopics && (
                <button
                  id="hero-explore-topics-btn"
                  onClick={onOpenTopics}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-xs transition-colors flex items-center space-x-1.5"
                >
                  <Layers className="w-4 h-4 text-indigo-300" />
                  <span>Topics (+20 🪙)</span>
                </button>
              )}

              <button
                id="resume-learning-btn"
                onClick={() => onSelectLesson(inProgressLesson.id)}
                className="bg-white text-indigo-950 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:bg-indigo-50 transition-colors flex items-center space-x-1.5"
              >
                <PlayCircle className="w-4 h-4 fill-indigo-600 text-white" />
                <span>Resume Lesson</span>
              </button>
            </div>
          </div>

          {/* Class Level Selector & Daily XP Target Card */}
          <div className="lg:col-span-4 space-y-3">
            {/* Class Pill Box */}
            <div
              onClick={onOpenClassSelector}
              className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl p-1 bg-white/15 rounded-xl">{currentClassDef.icon}</span>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-200">
                    Selected Class Level
                  </div>
                  <div className="text-sm font-bold text-white font-['Outfit',sans-serif]">
                    {currentClassDef.name}
                  </div>
                  <div className="text-[11px] text-amber-300 font-medium">
                    {currentClassDef.gradeRange}
                  </div>
                </div>
              </div>

              <span className="text-xs text-indigo-200 group-hover:text-white group-hover:translate-x-1 transition-all">
                Switch &rarr;
              </span>
            </div>

            {/* Daily XP Target Progress Meter */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 space-y-3">
              <div className="flex items-center justify-between text-xs text-white">
                <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Trophy className="w-4 h-4 text-amber-300" />
                  Daily XP Target
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  {progress.todayXp} / {progress.dailyGoalXp} XP
                </span>
              </div>

              <div className="w-full h-2 bg-indigo-950/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round((progress.todayXp / progress.dailyGoalXp) * 100))}%`,
                  }}
                />
              </div>

              <div className="flex justify-between items-center text-xs text-indigo-100 font-medium">
                <span>{progress.completedLessons.length} topics mastered</span>
                <span className="font-bold text-amber-300">{progress.streakDays} day streak 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Exam Prep Banner */}
        <div
          onClick={onOpenExamPrep}
          className="cursor-pointer bg-white p-5 rounded-3xl border-2 border-indigo-100 hover:border-indigo-500 shadow-2xs hover:shadow-md transition flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Exam Prep</span>
                <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-900 rounded-md text-[10px] font-black">
                  WAEC/JAMB
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">Study for Exams</h4>
              <p className="text-xs text-slate-500">CBT simulation & test grading.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Study Alarms Banner */}
        <div
          onClick={onOpenAlarmModal}
          className="cursor-pointer bg-white p-5 rounded-3xl border-2 border-amber-100 hover:border-amber-400 shadow-2xs hover:shadow-md transition flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <AlarmClock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Study Alarms</span>
                <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded-md text-[10px] font-black">
                  Custom
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">Set Study Alarm</h4>
              <p className="text-xs text-slate-500">Custom ringtones & notes.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Math Solver Banner */}
        <div
          onClick={onOpenMathSolver}
          className="cursor-pointer bg-white p-5 rounded-3xl border-2 border-emerald-100 hover:border-emerald-400 shadow-2xs hover:shadow-md transition flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Math Solver</span>
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-900 rounded-md text-[10px] font-black">
                  Step-by-step
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">Solve Any Equation</h4>
              <p className="text-xs text-slate-500">Fast solutions with proof.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Arcade Games Banner */}
        <div
          onClick={onOpenArcade}
          className="cursor-pointer bg-white p-5 rounded-3xl border-2 border-purple-100 hover:border-purple-400 shadow-2xs hover:shadow-md transition flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>15 Mini-Games</span>
                <span className="px-1.5 py-0.2 bg-purple-100 text-purple-900 rounded-md text-[10px] font-black">
                  10 🪙 / Play
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">Arcade Arena</h4>
              <p className="text-xs text-slate-500">Play & test agility.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Section Header & Category Filter Tabs */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              All Academic Subjects & Classes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select a category to explore curricula across Art, Science, Commercial, and Primary levels.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Subjects', count: CURRICULUM_DATA.length },
            { id: 'science', label: '🔬 Sciences & STEM', count: CURRICULUM_DATA.filter((s) => s.category === 'science').length },
            { id: 'art', label: '🎨 Arts & Humanities', count: CURRICULUM_DATA.filter((s) => s.category === 'art').length },
            { id: 'commercial', label: '📈 Commercial & Business', count: CURRICULUM_DATA.filter((s) => s.category === 'commercial').length },
            { id: 'primary', label: '🌱 Primary (Basic 1-6)', count: CURRICULUM_DATA.filter((s) => s.category === 'primary').length },
            { id: 'languages', label: '🌍 World Languages', count: CURRICULUM_DATA.filter((s) => s.category === 'languages' || s.id === 'world-languages').length },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => {
          const totalLessons = subject.lessons.length;
          const completedInSubject = subject.lessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;
          const progressPercent = Math.round((completedInSubject / totalLessons) * 100);

          return (
            <div
              key={subject.id}
              className="bg-white p-6 rounded-3xl border-2 border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-indigo-400 hover:shadow-md transition-all group"
            >
              {/* Card Top Banner */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-indigo-600 group-hover:scale-110 transition-transform">
                    {ICONS_MAP[subject.iconName] || <BookOpen className="w-6 h-6" />}
                  </div>

                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {subject.category?.toUpperCase() || 'CORE'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
                    {subject.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {subject.tagline}
                  </p>
                </div>

                {/* Featured Topic Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {subject.featuredTopics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress & Bottom Actions */}
              <div className="pt-6 mt-4 border-t border-slate-100 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                    <span>Mastery Progress</span>
                    <span>
                      {completedInSubject}/{totalLessons} Lessons
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    id={`view-curriculum-${subject.id}-btn`}
                    onClick={() => onSelectSubject(subject.id)}
                    className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 transition-colors text-center"
                  >
                    View Track
                  </button>

                  <button
                    id={`explore-subject-${subject.id}-btn`}
                    onClick={() => {
                      const firstLesson = subject.lessons[0];
                      if (firstLesson) {
                        onSelectLesson(firstLesson.id);
                      } else {
                        onSelectSubject(subject.id);
                      }
                    }}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold text-white transition-colors text-center shadow-xs flex items-center justify-center space-x-1"
                  >
                    <span>Start Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
