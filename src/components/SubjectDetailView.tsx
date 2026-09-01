import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Zap,
  Play,
  HelpCircle,
  Sparkles,
  Bot,
  Award,
  Layers
} from 'lucide-react';
import { Subject, LevelDifficulty, UserProgress } from '../types';

interface SubjectDetailViewProps {
  subject: Subject;
  progress: UserProgress;
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
  onStartQuiz: (lessonId: string) => void;
  onOpenAITutorWithContext: (subjectTitle: string) => void;
}

export function SubjectDetailView({
  subject,
  progress,
  onBack,
  onSelectLesson,
  onStartQuiz,
  onOpenAITutorWithContext,
}: SubjectDetailViewProps) {
  const [levelFilter, setLevelFilter] = useState<'all' | LevelDifficulty>('all');

  const filteredLessons = levelFilter === 'all'
    ? subject.lessons
    : subject.lessons.filter(l => l.level === levelFilter);

  const completedCount = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / subject.lessons.length) * 100);

  const getDifficultyBadge = (level: LevelDifficulty) => {
    switch (level) {
      case 'beginner':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">Beginner</span>;
      case 'intermediate':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-amber-100 text-amber-800">Intermediate</span>;
      case 'advanced':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-rose-100 text-rose-800">Advanced</span>;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Breadcrumb */}
      <div>
        <button
          id="back-to-subjects-btn"
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Subjects</span>
        </button>

        {/* Subject Header Banner */}
        <div className="rounded-3xl bg-indigo-600 text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-indigo-500 rounded-full opacity-50 pointer-events-none" />
          <div className="absolute bottom-[-40px] right-20 w-32 h-32 bg-indigo-400 rounded-full opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                Curriculum Track
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
                {subject.title}
              </h1>
              <p className="text-indigo-100 text-sm leading-relaxed">
                {subject.description}
              </p>
            </div>

            {/* Progress Pill & AI Tutor Quick Prompt */}
            <div className="flex flex-col sm:items-end gap-2">
              <div className="px-4 py-2.5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/20 text-xs space-y-1.5 min-w-[160px]">
                <div className="flex justify-between gap-3 text-white font-semibold text-[11px]">
                  <span>Track Mastery:</span>
                  <span className="font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-indigo-950/40 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <button
                id="ask-ai-subject-btn"
                onClick={() => onOpenAITutorWithContext(subject.title)}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI Tutor</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Level Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            id="filter-all-levels-btn"
            onClick={() => setLevelFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              levelFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Lessons ({subject.lessons.length})
          </button>
          <button
            id="filter-beginner-btn"
            onClick={() => setLevelFilter('beginner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              levelFilter === 'beginner' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Beginner
          </button>
          <button
            id="filter-intermediate-btn"
            onClick={() => setLevelFilter('intermediate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              levelFilter === 'intermediate' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Intermediate
          </button>
          <button
            id="filter-advanced-btn"
            onClick={() => setLevelFilter('advanced')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              levelFilter === 'advanced' ? 'bg-white text-rose-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Advanced
          </button>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {filteredLessons.length} lessons with interactive practice
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {filteredLessons.map((lesson, index) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const attempt = progress.quizAttempts[lesson.id];

          return (
            <div
              key={lesson.id}
              className={`rounded-3xl border bg-white p-6 transition-colors shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isCompleted ? 'border-emerald-200' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Left Lesson Info */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {getDifficultyBadge(lesson.level)}
                  <span className="flex items-center space-x-1 text-xs text-slate-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{lesson.durationMinutes} mins</span>
                  </span>
                  <span className="flex items-center space-x-1 text-xs text-amber-600 font-bold">
                    <Zap className="w-3 h-3 fill-amber-500" />
                    <span>+{lesson.xpReward} XP</span>
                  </span>
                  {isCompleted && (
                    <span className="flex items-center space-x-1 text-xs text-emerald-600 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                    {index + 1}. {lesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {lesson.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lesson.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                <button
                  id={`start-lesson-${lesson.id}-btn`}
                  onClick={() => onSelectLesson(lesson.id)}
                  className="flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                </button>

                <button
                  id={`start-quiz-${lesson.id}-btn`}
                  onClick={() => onStartQuiz(lesson.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 border text-xs font-bold rounded-xl transition-colors ${
                    attempt
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{attempt ? `Quiz: ${attempt.score}%` : 'Take Quiz'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
