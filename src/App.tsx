import React, { useState, useEffect } from 'react';
import {
  SubjectId,
  UserProgress,
  QuizAttempt,
  UserInterestsProfile,
} from './types';
import { CURRICULUM_DATA } from './data/curriculum';
import { ALL_BADGES } from './data/badges';
import {
  getSavedProgress,
  recordLessonCompletion,
  recordQuizAttempt,
  recordAiQuestion,
  recordWidgetInteraction,
  updateUserInterests,
  toggleBookmark,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { SubjectGrid } from './components/SubjectGrid';
import { SubjectDetailView } from './components/SubjectDetailView';
import { LessonViewer } from './components/LessonViewer';
import { QuizInterface } from './components/QuizInterface';
import { AITutorSection } from './components/AITutorSection';
import { ProgressDashboard } from './components/ProgressDashboard';
import { GamificationLeaderboard } from './components/GamificationLeaderboard';
import { SearchModal } from './components/SearchModal';
import { Sparkles, Trophy, X, Zap } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getSavedProgress);
  const [activeView, setActiveView] = useState<'home' | 'subject' | 'lesson' | 'quiz' | 'ai-tutor' | 'dashboard' | 'leaderboard'>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEducatorMode, setIsEducatorMode] = useState(false);
  const [aiContext, setAiContext] = useState<{ question?: string; contextTitle?: string }>({});
  const [toastBadge, setToastBadge] = useState<string | null>(null);
  const [toastXp, setToastXp] = useState<number | null>(null);

  // Global shortcut for Cmd/Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showXpToast = (amount: number) => {
    setToastXp(amount);
    setTimeout(() => setToastXp(null), 3000);
  };

  // Handlers for subject navigation
  const handleSelectSubject = (subjectId: SubjectId) => {
    setSelectedSubjectId(subjectId);
    setActiveView('subject');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for lesson navigation
  const handleSelectLesson = (lessonId: string) => {
    const matchedSubject = CURRICULUM_DATA.find((s) =>
      s.lessons.some((l) => l.id === lessonId)
    );
    if (matchedSubject) {
      setSelectedSubjectId(matchedSubject.id);
    }
    setSelectedLessonId(lessonId);
    setActiveView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for quiz start
  const handleStartQuiz = (lessonId: string) => {
    const matchedSubject = CURRICULUM_DATA.find((s) =>
      s.lessons.some((l) => l.id === lessonId)
    );
    if (matchedSubject) {
      setSelectedSubjectId(matchedSubject.id);
    }
    setSelectedLessonId(lessonId);
    setActiveView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for lesson complete -> go to quiz
  const handleCompleteAndTakeQuiz = (lessonId: string) => {
    const allLessons = CURRICULUM_DATA.flatMap((s) => s.lessons);
    const targetLesson = allLessons.find((l) => l.id === lessonId);
    const xpReward = targetLesson ? targetLesson.xpReward : 50;

    const { updated, newBadges, gainedXp } = recordLessonCompletion(progress, lessonId, xpReward);
    setProgress(updated);
    showXpToast(gainedXp);

    if (newBadges.length > 0) {
      const badgeObj = ALL_BADGES.find((b) => b.id === newBadges[0]);
      if (badgeObj) {
        setToastBadge(badgeObj.title);
        setTimeout(() => setToastBadge(null), 4000);
      }
    }

    handleStartQuiz(lessonId);
  };

  // Handler for finishing a quiz
  const handleFinishQuiz = (attempt: QuizAttempt) => {
    const { updated, newBadges, earnedXp } = recordQuizAttempt(progress, attempt);
    setProgress(updated);
    showXpToast(earnedXp);

    if (newBadges.length > 0) {
      const badgeObj = ALL_BADGES.find((b) => b.id === newBadges[0]);
      if (badgeObj) {
        setToastBadge(badgeObj.title);
        setTimeout(() => setToastBadge(null), 4000);
      }
    }
  };

  // Handler for bookmark toggle
  const handleToggleBookmark = (lessonId: string) => {
    const updated = toggleBookmark(progress, lessonId);
    setProgress(updated);
  };

  // Ask AI from inside a lesson or subject
  const handleAskAIWithContext = (question: string, contextTitle: string) => {
    const { updated, newBadges } = recordAiQuestion(progress);
    setProgress(updated);

    if (newBadges.length > 0) {
      const badgeObj = ALL_BADGES.find((b) => b.id === newBadges[0]);
      if (badgeObj) {
        setToastBadge(badgeObj.title);
        setTimeout(() => setToastBadge(null), 4000);
      }
    }

    setAiContext({ question, contextTitle });
    setActiveView('ai-tutor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for updating user interests
  const handleUpdateInterests = (profile: UserInterestsProfile) => {
    const updated = updateUserInterests(progress, profile);
    setProgress(updated);
  };

  // Find active subject and active lesson objects
  const activeSubject = selectedSubjectId
    ? CURRICULUM_DATA.find((s) => s.id === selectedSubjectId) || CURRICULUM_DATA[0]
    : null;

  const allLessons = CURRICULUM_DATA.flatMap((s) => s.lessons);
  const activeLesson = selectedLessonId
    ? allLessons.find((l) => l.id === selectedLessonId) || allLessons[0]
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        progress={progress}
        activeView={activeView}
        selectedSubjectId={selectedSubjectId}
        onNavigate={(view, subjectId) => {
          if (subjectId) setSelectedSubjectId(subjectId);
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        isEducatorMode={isEducatorMode}
        onToggleEducatorMode={() => setIsEducatorMode(!isEducatorMode)}
      />

      {/* Badge & XP Unlock Notification Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none">
        {toastXp !== null && (
          <div className="p-3.5 px-4 rounded-2xl bg-amber-500 text-slate-950 shadow-xl border border-amber-400 font-bold text-xs flex items-center space-x-2 animate-in slide-in-from-bottom-3 duration-300 pointer-events-auto">
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>+{toastXp} XP Earned!</span>
          </div>
        )}

        {toastBadge && (
          <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-amber-400/50 flex items-center space-x-3 animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Badge Unlocked!</div>
              <div className="text-sm font-bold">{toastBadge}</div>
            </div>
            <button
              onClick={() => setToastBadge(null)}
              className="p-1 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Body Content Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* VIEW 1: Home Subject Grid */}
        {activeView === 'home' && (
          <SubjectGrid
            progress={progress}
            onSelectSubject={handleSelectSubject}
            onSelectLesson={handleSelectLesson}
            onOpenAITutor={() => setActiveView('ai-tutor')}
          />
        )}

        {/* VIEW 2: Subject Detail View */}
        {activeView === 'subject' && activeSubject && (
          <SubjectDetailView
            subject={activeSubject}
            progress={progress}
            onBack={() => setActiveView('home')}
            onSelectLesson={handleSelectLesson}
            onStartQuiz={handleStartQuiz}
            onOpenAITutorWithContext={(subjectTitle) =>
              handleAskAIWithContext(`Can you introduce me to the core concepts of ${subjectTitle}?`, subjectTitle)
            }
          />
        )}

        {/* VIEW 3: Interactive Lesson Viewer */}
        {activeView === 'lesson' && activeLesson && activeSubject && (
          <LessonViewer
            lesson={activeLesson}
            subject={activeSubject}
            progress={progress}
            onBack={() => {
              if (selectedSubjectId) {
                setActiveView('subject');
              } else {
                setActiveView('home');
              }
            }}
            onCompleteAndTakeQuiz={handleCompleteAndTakeQuiz}
            onToggleBookmark={handleToggleBookmark}
            onAskAI={handleAskAIWithContext}
          />
        )}

        {/* VIEW 4: Quiz Assessment Interface */}
        {activeView === 'quiz' && activeLesson && (
          <QuizInterface
            lesson={activeLesson}
            progress={progress}
            onFinishQuiz={handleFinishQuiz}
            onBackToLesson={() => setActiveView('lesson')}
            onOpenAITutorWithContext={(context) => handleAskAIWithContext(context, activeLesson.title)}
          />
        )}

        {/* VIEW 5: Dedicated AI Q&A Tutor */}
        {activeView === 'ai-tutor' && (
          <AITutorSection
            initialSubject={selectedSubjectId}
            initialQuestion={aiContext.question}
            contextLessonTitle={aiContext.contextTitle}
            onClearInitialContext={() => setAiContext({})}
          />
        )}

        {/* VIEW 6: Progress & Educator Analytics Dashboard */}
        {activeView === 'dashboard' && (
          <ProgressDashboard
            progress={progress}
            isEducatorMode={isEducatorMode}
            onSelectLesson={handleSelectLesson}
            onSelectSubject={handleSelectSubject}
            onUpdateInterests={handleUpdateInterests}
          />
        )}

        {/* VIEW 7: Gamification Leaderboard & Badges Showcase */}
        {activeView === 'leaderboard' && (
          <div className="max-w-5xl mx-auto space-y-6 pb-12">
            <GamificationLeaderboard
              progress={progress}
              onSelectLesson={handleSelectLesson}
            />
          </div>
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
        onSelectSubject={handleSelectSubject}
      />

      {/* Clean Modern Footer */}
      <footer className="w-full bg-white border-t border-slate-200 mt-auto py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-sm text-slate-900 font-['Outfit',sans-serif]">
              DanAnty<span className="text-indigo-600">004</span>
            </span>
            <span>• Clean Minimal Learning Platform for Students, Parents & Educators</span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveView('home')} className="hover:text-slate-900 transition">Subjects</button>
            <button onClick={() => setActiveView('ai-tutor')} className="hover:text-slate-900 transition">AI Tutor</button>
            <button onClick={() => setActiveView('leaderboard')} className="hover:text-slate-900 transition">Leaderboard</button>
            <button onClick={() => setActiveView('dashboard')} className="hover:text-slate-900 transition">Dashboard</button>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400">Continuous Mastery</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

