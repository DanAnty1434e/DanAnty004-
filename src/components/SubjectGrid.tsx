import React from 'react';
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
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
  FlaskConical: <FlaskConical className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Languages: <Languages className="w-6 h-6" />,
};

const SUBJECT_THEMES: Record<SubjectId, { bgLight: string; text: string; buttonBg: string; buttonHover: string }> = {
  'mathematics': { bgLight: 'bg-blue-50', text: 'text-blue-600', buttonBg: 'bg-blue-600', buttonHover: 'hover:bg-blue-700' },
  'science': { bgLight: 'bg-emerald-50', text: 'text-emerald-600', buttonBg: 'bg-emerald-600', buttonHover: 'hover:bg-emerald-700' },
  'english': { bgLight: 'bg-orange-50', text: 'text-orange-600', buttonBg: 'bg-orange-600', buttonHover: 'hover:bg-orange-700' },
  'computer-studies': { bgLight: 'bg-purple-50', text: 'text-purple-600', buttonBg: 'bg-purple-600', buttonHover: 'hover:bg-purple-700' },
  'world-languages': { bgLight: 'bg-rose-50', text: 'text-rose-600', buttonBg: 'bg-rose-600', buttonHover: 'hover:bg-rose-700' },
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
}: SubjectGridProps) {
  // Find last or in-progress lesson
  const inProgressLesson = CURRICULUM_DATA.flatMap(s => s.lessons).find(l => l.id === progress.inProgressLessonId)
    || CURRICULUM_DATA[0].lessons[0];

  const currentClassDef = CLASS_LEVELS.find((c) => c.id === (progress.selectedClass || 'sss')) || CLASS_LEVELS[2];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome & Quick Resume Card */}
      <div className="bg-indigo-600 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-sm shrink-0">
        {/* Clean geometric circles */}
        <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-indigo-500 rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-[-40px] right-20 w-32 h-32 bg-indigo-400 rounded-full opacity-30 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs text-white text-xs font-bold rounded-full uppercase tracking-wider">
                DanAnty004 Academy
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full shadow-xs">
                <Coins className="w-3.5 h-3.5" />
                <span>{progress.coins || 0} Coins</span>
              </span>
              {/* Creator Pill */}
              <button
                onClick={onOpenAboutModal}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-950/60 hover:bg-indigo-950 text-indigo-100 text-xs font-bold rounded-full border border-indigo-400/40 transition-colors"
                title="Invented by Aliyu Kamal Hamid"
              >
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Invented by Aliyu Kamal Hamid</span>
              </button>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif] leading-tight">
              Read Topics, Earn Coins & Solve Math Instantly
            </h1>

            <p className="text-indigo-100 text-xs sm:text-base leading-relaxed max-w-2xl">
              Earn <strong className="text-amber-300">+20 Coins</strong> for every topic you read, test your skills in <strong className="text-amber-300">15 Arcade Games</strong> (10 🪙), and solve any mathematical equation with step-by-step methods!
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {onOpenMathSolver && (
                <button
                  id="hero-solve-math-btn"
                  onClick={onOpenMathSolver}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 group"
                >
                  <Calculator className="w-4 h-4 text-slate-950" />
                  <span>Ultra-Fast Math Solver</span>
                  <span className="px-1.5 py-0.5 bg-slate-950 text-emerald-300 text-[10px] font-mono rounded">
                    0ms
                  </span>
                </button>
              )}

              {onOpenArcade && (
                <button
                  id="hero-play-arcade-btn"
                  onClick={onOpenArcade}
                  className="bg-amber-400 text-slate-950 hover:bg-amber-300 px-5 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 group"
                >
                  <Gamepad2 className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
                  <span>Arcade Arena (15 Games)</span>
                </button>
              )}

              {onOpenTopics && (
                <button
                  id="hero-explore-topics-btn"
                  onClick={onOpenTopics}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-colors flex items-center space-x-1.5"
                >
                  <Layers className="w-4 h-4" />
                  <span>Browse Topics (+20 🪙)</span>
                </button>
              )}

              <button
                id="resume-learning-btn"
                onClick={() => onSelectLesson(inProgressLesson.id)}
                className="bg-white text-indigo-600 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:bg-indigo-50 transition-colors flex items-center space-x-1.5"
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
              className="cursor-pointer bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-2xl p-4 border border-white/25 transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl p-1 bg-white/20 rounded-xl">{currentClassDef.icon}</span>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-200">
                    Your Selected Class
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
                Change &rarr;
              </span>
            </div>

            {/* Daily XP Target Progress Meter */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 space-y-3">
              <div className="flex items-center justify-between text-xs text-white">
                <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Trophy className="w-4 h-4 text-amber-300" />
                  Daily Target
                </span>
                <span className="font-mono font-bold text-white text-sm">{progress.todayXp} / {progress.dailyGoalXp} XP</span>
              </div>

              <div className="w-full h-2 bg-indigo-950/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((progress.todayXp / progress.dailyGoalXp) * 100))}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs text-indigo-100 font-medium">
                <span>{progress.completedLessons.length} topics read</span>
                <span className="font-bold text-amber-300">{progress.streakDays} day streak 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Quick Action Banners: Math Solver, Topic Explorer (+20🪙), Arcade Games */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Math Solver Banner */}
        <div
          onClick={onOpenMathSolver}
          className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-2xs hover:shadow-xs transition flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Fast Math Solver</span>
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-900 rounded-md text-[10px] font-black">
                  Shows Method
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">Solve Any Equation</h4>
              <p className="text-xs text-slate-500">Quadratic, linear, calculus & geometry.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Topic Directory Banner */}
        <div
          onClick={onOpenTopics}
          className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-2xs hover:shadow-xs transition flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Earn 20 Coins</span>
                <span className="px-1.5 py-0.2 bg-amber-100 rounded-md text-[10px]">Per Topic</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">Subject Topics Directory</h4>
              <p className="text-xs text-slate-500">Read topics & stack coins in your balance.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Arcade Games Banner */}
        <div
          onClick={onOpenArcade}
          className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-400 shadow-2xs hover:shadow-xs transition flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>15 Mini-Games</span>
                <span className="px-1.5 py-0.2 bg-purple-100 rounded-md text-[10px]">10 Coins / Play</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">Arcade Gaming Arena</h4>
              <p className="text-xs text-slate-500">Math, coding, speed and trivia challenges.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
            Academic Subject Tracks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select a curriculum track below to explore structured lessons, earn 20 coins, and take mastery quizzes.
          </p>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURRICULUM_DATA.map((subject) => {
          const totalLessons = subject.lessons.length;
          const completedInSubject = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          const progressPercent = Math.round((completedInSubject / totalLessons) * 100);
          const theme = SUBJECT_THEMES[subject.id] || { bgLight: 'bg-indigo-50', text: 'text-indigo-600', buttonBg: 'bg-indigo-600', buttonHover: 'hover:bg-indigo-700' };

          return (
            <div
              key={subject.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              {/* Card Top Banner */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl ${theme.bgLight} ${theme.text}`}>
                    {ICONS_MAP[subject.iconName] || <BookOpen className="w-6 h-6" />}
                  </div>

                  <span className={`text-xs font-bold ${theme.text} ${theme.bgLight} px-2.5 py-1 rounded-lg`}>
                    {progressPercent}% Complete
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
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
                    <span>{completedInSubject}/{totalLessons} Lessons</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${theme.buttonBg} rounded-full transition-all duration-500`}
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
                      // Start first lesson or in progress
                      const firstLesson = subject.lessons[0];
                      if (firstLesson) {
                        onSelectLesson(firstLesson.id);
                      } else {
                        onSelectSubject(subject.id);
                      }
                    }}
                    className={`flex-1 py-2.5 ${theme.buttonBg} ${theme.buttonHover} rounded-xl text-xs font-bold text-white transition-colors text-center shadow-xs flex items-center justify-center space-x-1`}
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

