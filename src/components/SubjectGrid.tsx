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
  Bot
} from 'lucide-react';
import { Subject, SubjectId, UserProgress } from '../types';
import { CURRICULUM_DATA } from '../data/curriculum';

interface SubjectGridProps {
  progress: UserProgress;
  onSelectSubject: (subjectId: SubjectId) => void;
  onSelectLesson: (lessonId: string) => void;
  onOpenAITutor: () => void;
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
}: SubjectGridProps) {
  // Find last or in-progress lesson
  const inProgressLesson = CURRICULUM_DATA.flatMap(s => s.lessons).find(l => l.id === progress.inProgressLessonId)
    || CURRICULUM_DATA[0].lessons[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome & Quick Resume Card */}
      <div className="bg-indigo-600 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-sm shrink-0">
        {/* Clean geometric circles */}
        <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-indigo-500 rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-[-40px] right-20 w-32 h-32 bg-indigo-400 rounded-full opacity-30 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs text-white text-xs font-bold rounded-full uppercase tracking-wider">
              DanAnty004 Academy
            </span>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif] leading-tight">
              Interactive Learning Platform for Curious Minds
            </h1>

            <p className="text-indigo-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              Explore beginner to advanced tracks across Mathematics, Science, English, Computer Studies, and World Languages. Learn at your own pace with interactive tools and instant AI tutoring.
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="resume-learning-btn"
                onClick={() => onSelectLesson(inProgressLesson.id)}
                className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:bg-indigo-50 transition-colors flex items-center space-x-2"
              >
                <PlayCircle className="w-4 h-4 fill-indigo-600 text-white" />
                <span>Resume: {inProgressLesson.title.split('&')[0].trim()}</span>
              </button>

              <button
                id="hero-ai-tutor-btn"
                onClick={onOpenAITutor}
                className="px-5 py-3 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white border border-indigo-500 font-bold text-xs sm:text-sm transition-colors flex items-center space-x-2"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Tutor</span>
              </button>
            </div>
          </div>

          {/* Daily XP Target Progress Meter */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 space-y-4">
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
              <span>{progress.completedLessons.length} lessons completed</span>
              <span className="font-bold text-amber-300">{progress.streakDays} day streak 🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
            Academic Subject Tracks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select a curriculum track below to explore structured lessons and interactive exercises.
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
