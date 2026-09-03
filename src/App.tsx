import React, { useState, useEffect } from 'react';
import {
  SubjectId,
  UserProgress,
  QuizAttempt,
  UserInterestsProfile,
  AppView,
} from './types';
import { CURRICULUM_DATA } from './data/curriculum';
import { ALL_BADGES } from './data/badges';
import {
  getSavedProgress,
  saveUserProgress,
  appendDailyHistory,
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
import { SubjectTopicExplorer } from './components/SubjectTopicExplorer';
import { ArcadeArena } from './components/ArcadeArena';
import { SearchModal } from './components/SearchModal';
import { QuickAIAssistant } from './components/QuickAIAssistant';
import { NetworkDataManager } from './components/NetworkDataManager';
import { MathSolverModal } from './components/MathSolverModal';
import { ClassSelectorModal } from './components/ClassSelectorModal';
import { WelcomeAboutModal } from './components/WelcomeAboutModal';
import { StudyAlarmModal } from './components/StudyAlarmModal';
import { ActiveAlarmModal } from './components/ActiveAlarmModal';
import { ExamTestPrepModal } from './components/ExamTestPrepModal';
import {
  StudyAlarm,
  getSavedAlarms,
  saveAlarms,
  alarmAudio,
} from './utils/studyAlarmService';
import { Sparkles, Trophy, X, Zap, WifiOff, Coins } from 'lucide-react';
import { getLiveNetworkStatus } from './utils/networkManager';
import { ExamAttemptRecord } from './types';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getSavedProgress);
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNetworkManagerOpen, setIsNetworkManagerOpen] = useState(false);
  const [isMathSolverOpen, setIsMathSolverOpen] = useState(false);
  const [isClassSelectorOpen, setIsClassSelectorOpen] = useState(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [activeRingingAlarm, setActiveRingingAlarm] = useState<StudyAlarm | null>(null);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(() => {
    try {
      const seen = localStorage.getItem('dananty_has_seen_welcome_v1');
      return !seen;
    } catch {
      return true;
    }
  });
  const [isEducatorMode, setIsEducatorMode] = useState(false);
  const [aiContext, setAiContext] = useState<{ question?: string; contextTitle?: string }>({});
  const [toastBadge, setToastBadge] = useState<string | null>(null);
  const [toastXp, setToastXp] = useState<number | null>(null);
  const [toastCoins, setToastCoins] = useState<number | null>(null);
  const [isOfflineNotice, setIsOfflineNotice] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOfflineNotice(false);
    const handleOffline = () => setIsOfflineNotice(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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

  // Request browser notification permission for study alarms if supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      try {
        Notification.requestPermission();
      } catch {}
    }
  }, []);

  // Background Alarm Schedule Checker (Runs every second)
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const todayDateStr = now.toISOString().split('T')[0];

      // If an alarm is already ringing, don't trigger another one simultaneously
      if (activeRingingAlarm) return;

      const alarms = getSavedAlarms();
      for (const alarm of alarms) {
        if (!alarm.enabled) continue;

        // Check time match
        if (alarm.time === currentTimeStr) {
          // Check day match (if days array is empty, trigger once)
          const daysMatch = !alarm.days || alarm.days.length === 0 || alarm.days.includes(currentDay);

          // Ensure it doesn't ring multiple times in the same minute of the day
          if (daysMatch && alarm.lastTriggeredDate !== `${todayDateStr}-${currentTimeStr}`) {
            // Update last triggered
            const updated = alarms.map((a) =>
              a.id === alarm.id
                ? { ...a, lastTriggeredDate: `${todayDateStr}-${currentTimeStr}` }
                : a
            );
            saveAlarms(updated);

            // Trigger alarm modal & audio
            setActiveRingingAlarm(alarm);

            // Send system notification if granted
            if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
              try {
                new Notification(`⏰ DanAnty004: ${alarm.title}`, {
                  body: alarm.notes || 'Time for your scheduled study session!',
                  icon: '/icon.png',
                });
              } catch {}
            }
            break;
          }
        }
      }
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [activeRingingAlarm]);

  // Snooze handler
  const handleSnoozeAlarm = (minutes: number) => {
    if (!activeRingingAlarm) return;
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    const snoozeHours = String(now.getHours()).padStart(2, '0');
    const snoozeMinutes = String(now.getMinutes()).padStart(2, '0');
    const snoozeTimeStr = `${snoozeHours}:${snoozeMinutes}`;

    const alarms = getSavedAlarms();
    const snoozedAlarm: StudyAlarm = {
      ...activeRingingAlarm,
      id: `alarm-snooze-${Date.now()}`,
      title: `[Snoozed] ${activeRingingAlarm.title}`,
      time: snoozeTimeStr,
      days: [], // Trigger once
      enabled: true,
      notes: activeRingingAlarm.notes,
    };
    saveAlarms([...alarms, snoozedAlarm]);
    setActiveRingingAlarm(null);
  };

  const showXpToast = (amount: number) => {
    setToastXp(amount);
    setTimeout(() => setToastXp(null), 3000);
  };

  const showCoinsToast = (amount: number) => {
    setToastCoins(amount);
    setTimeout(() => setToastCoins(null), 3000);
  };

  const showBadgeToast = (badgeTitle: string) => {
    setToastBadge(badgeTitle);
    setTimeout(() => setToastBadge(null), 4000);
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

    const { updated, newBadges, gainedXp, gainedCoins } = recordLessonCompletion(progress, lessonId, xpReward);
    setProgress(updated);
    showXpToast(gainedXp);
    showCoinsToast(gainedCoins);

    if (newBadges.length > 0) {
      const badgeObj = ALL_BADGES.find((b) => b.id === newBadges[0]);
      if (badgeObj) {
        showBadgeToast(badgeObj.title);
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

  // Handler for updating selected academic class level
  const handleSelectClass = (classId: string) => {
    const updated: UserProgress = {
      ...progress,
      selectedClass: classId as any,
    };
    setProgress(updated);
    try {
      localStorage.setItem('dananty_user_progress_v1', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Handler for finishing an exam paper in the CBT Simulator
  const handleCompleteExam = (
    record: ExamAttemptRecord,
    xpEarned?: number,
    coinsEarned?: number
  ) => {
    // Reward XP & Coins for completing an exam
    const earnedXp =
      xpEarned ??
      Math.round((record.score / Math.max(record.totalQuestions, 1)) * 100) + 50;
    const earnedCoins = coinsEarned ?? 30; // High bonus coins for completing full mock/exam

    const recordWithXp: ExamAttemptRecord = {
      ...record,
      xpEarned: earnedXp,
    };

    const updated: UserProgress = {
      ...progress,
      xp: progress.xp + earnedXp,
      todayXp: progress.todayXp + earnedXp,
      coins: (progress.coins || 0) + earnedCoins,
      examAttempts: [...(progress.examAttempts || []), recordWithXp],
      dailyCompletionHistory: appendDailyHistory(
        progress.dailyCompletionHistory,
        earnedXp,
        'exam'
      ),
    };
    setProgress(updated);
    saveUserProgress(updated);
    showXpToast(earnedXp);
    showCoinsToast(earnedCoins);
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
        onOpenNetworkManager={() => setIsNetworkManagerOpen(true)}
        onOpenClassSelector={() => setIsClassSelectorOpen(true)}
        onOpenMathSolver={() => setIsMathSolverOpen(true)}
        onOpenAboutModal={() => setIsWelcomeOpen(true)}
        onOpenAlarmModal={() => setIsAlarmModalOpen(true)}
        onOpenExamPrep={() => setIsExamModalOpen(true)}
        isEducatorMode={isEducatorMode}
        onToggleEducatorMode={() => setIsEducatorMode(!isEducatorMode)}
      />

      {/* Offline / Data Notice Banner */}
      {isOfflineNotice && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-4 h-4" />
              <span>Offline Mode Active — All 5 subjects, 25 lessons & instant AI engine are cached locally and 100% accessible!</span>
            </div>
            <button
              onClick={() => setIsNetworkManagerOpen(true)}
              className="px-2.5 py-0.5 rounded-lg bg-slate-950 text-white text-[11px] font-bold hover:bg-slate-800 transition"
            >
              Network Options
            </button>
          </div>
        </div>
      )}

      {/* Badge, XP & Coin Unlock Notification Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none">
        {toastCoins !== null && (
          <div className="p-3.5 px-4 rounded-2xl bg-amber-400 text-slate-950 shadow-xl border border-amber-300 font-black text-xs flex items-center space-x-2 animate-in slide-in-from-bottom-3 duration-300 pointer-events-auto">
            <Coins className="w-4 h-4 text-slate-950" />
            <span>+{toastCoins} Coins Earned for Studying! 🪙</span>
          </div>
        )}

        {toastXp !== null && (
          <div className="p-3.5 px-4 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800 font-bold text-xs flex items-center space-x-2 animate-in slide-in-from-bottom-3 duration-300 pointer-events-auto">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
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
            onOpenTopics={() => setActiveView('topics')}
            onOpenArcade={() => setActiveView('arcade')}
            onOpenMathSolver={() => setIsMathSolverOpen(true)}
            onOpenClassSelector={() => setIsClassSelectorOpen(true)}
            onOpenAboutModal={() => setIsWelcomeOpen(true)}
            onOpenAlarmModal={() => setIsAlarmModalOpen(true)}
            onOpenExamPrep={() => setIsExamModalOpen(true)}
          />
        )}

        {/* VIEW 2: Subject & Topic Explorer */}
        {activeView === 'topics' && (
          <SubjectTopicExplorer
            progress={progress}
            selectedSubjectId={selectedSubjectId || 'all'}
            onSelectTopic={(subject, lesson) => {
              setSelectedSubjectId(subject.id);
              setSelectedLessonId(lesson.id);
              setActiveView('lesson');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTakeQuiz={(subject, lesson) => {
              setSelectedSubjectId(subject.id);
              setSelectedLessonId(lesson.id);
              setActiveView('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAskAIAboutTopic={(subject, lesson) => {
              handleAskAIWithContext(`Can you explain ${lesson.title} in ${subject.title}?`, `${subject.title} - ${lesson.title}`);
            }}
            onNavigateToArcade={() => {
              setActiveView('arcade');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenExamPrep={() => setIsExamModalOpen(true)}
          />
        )}

        {/* VIEW 3: Arcade 15 Mini-Games Arena */}
        {activeView === 'arcade' && (
          <ArcadeArena
            progress={progress}
            onUpdateProgress={(updated) => setProgress(updated)}
            onNavigateToTopics={(subjId) => {
              if (subjId) setSelectedSubjectId(subjId);
              setActiveView('topics');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowXpToast={showXpToast}
            onShowBadgeToast={showBadgeToast}
          />
        )}

        {/* VIEW 4: Subject Detail View */}
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

        {/* VIEW 5: Interactive Lesson Viewer */}
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

        {/* VIEW 6: Quiz Assessment Interface */}
        {activeView === 'quiz' && activeLesson && (
          <QuizInterface
            lesson={activeLesson}
            progress={progress}
            onFinishQuiz={handleFinishQuiz}
            onBackToLesson={() => setActiveView('lesson')}
            onOpenAITutorWithContext={(context) => handleAskAIWithContext(context, activeLesson.title)}
          />
        )}

        {/* VIEW 7: Dedicated AI Q&A Tutor */}
        {activeView === 'ai-tutor' && (
          <AITutorSection
            initialSubject={selectedSubjectId}
            initialQuestion={aiContext.question}
            contextLessonTitle={aiContext.contextTitle}
            onClearInitialContext={() => setAiContext({})}
            onOpenMathSolver={() => setIsMathSolverOpen(true)}
            onRecordQuestion={() => {
              const { updated, newBadges } = recordAiQuestion(progress);
              setProgress(updated);
              if (newBadges.length > 0) {
                const badgeObj = ALL_BADGES.find((b) => b.id === newBadges[0]);
                if (badgeObj) {
                  setToastBadge(badgeObj.title);
                  setTimeout(() => setToastBadge(null), 4000);
                }
              }
            }}
          />
        )}

        {/* VIEW 8: Progress & Educator Analytics Dashboard */}
        {activeView === 'dashboard' && (
          <ProgressDashboard
            progress={progress}
            isEducatorMode={isEducatorMode}
            onSelectLesson={handleSelectLesson}
            onSelectSubject={handleSelectSubject}
            onUpdateInterests={handleUpdateInterests}
            onOpenExamPrep={() => setIsExamModalOpen(true)}
          />
        )}

        {/* VIEW 9: Gamification Leaderboard & Badges Showcase */}
        {activeView === 'leaderboard' && (
          <div className="max-w-5xl mx-auto space-y-6 pb-12">
            <GamificationLeaderboard
              progress={progress}
              onSelectLesson={handleSelectLesson}
            />
          </div>
        )}
      </main>

      {/* Ultra-Fast Mathematics Equation Solver Modal */}
      <MathSolverModal
        isOpen={isMathSolverOpen}
        onClose={() => setIsMathSolverOpen(false)}
        onEarnXp={(amount) => showXpToast(amount)}
      />

      {/* Academic Class & Level Selector Modal */}
      <ClassSelectorModal
        isOpen={isClassSelectorOpen}
        onClose={() => setIsClassSelectorOpen(false)}
        currentClass={progress.selectedClass || 'sss'}
        onSelectClass={handleSelectClass}
      />

      {/* Onboarding & Creator Attribution Welcome Modal (Auto-pops up for first-time visitors) */}
      <WelcomeAboutModal
        isOpen={isWelcomeOpen}
        onClose={() => {
          setIsWelcomeOpen(false);
          try {
            localStorage.setItem('dananty_has_seen_welcome_v1', 'true');
          } catch {}
        }}
        currentClass={progress.selectedClass || 'sss'}
        onSelectClass={handleSelectClass}
        onOpenMathSolver={() => {
          setIsWelcomeOpen(false);
          try {
            localStorage.setItem('dananty_has_seen_welcome_v1', 'true');
          } catch {}
          setIsMathSolverOpen(true);
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
        onSelectSubject={handleSelectSubject}
      />

      {/* Global Network & Data Manager Modal */}
      <NetworkDataManager
        isOpen={isNetworkManagerOpen}
        onClose={() => setIsNetworkManagerOpen(false)}
      />

      {/* Customizable Study Alarms & Reminders Manager Modal */}
      <StudyAlarmModal
        isOpen={isAlarmModalOpen}
        onClose={() => setIsAlarmModalOpen(false)}
        onTriggerTestAlarm={(alarm) => setActiveRingingAlarm(alarm)}
      />

      {/* Official Exam & Test Prep CBT Simulation Modal */}
      <ExamTestPrepModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        progress={progress}
        onCompleteExam={handleCompleteExam}
        onAskAIQuestion={(q, sId) => handleAskAIWithContext(q, sId || 'Exam Prep')}
      />

      {/* Active Ringing Alarm Screen Modal with Web Audio Synth */}
      {activeRingingAlarm && (
        <ActiveAlarmModal
          alarm={activeRingingAlarm}
          onDismiss={() => setActiveRingingAlarm(null)}
          onSnooze={handleSnoozeAlarm}
          onStartStudy={(subjectTag) => {
            setActiveRingingAlarm(null);
            if (subjectTag && subjectTag !== 'all') {
              const matched = CURRICULUM_DATA.find((s) => s.id === subjectTag);
              if (matched) {
                setSelectedSubjectId(matched.id);
                setActiveView('subject');
                return;
              }
            }
            setActiveView('topics');
          }}
        />
      )}

      {/* Global Instant AI Floating Assistant (Available Across All Views, Shift+A) */}
      <QuickAIAssistant
        currentSubjectId={selectedSubjectId}
        currentLessonTitle={
          selectedLessonId
            ? CURRICULUM_DATA.flatMap((s) => s.lessons).find((l) => l.id === selectedLessonId)?.title
            : undefined
        }
        onRecordQuestion={() => {
          const { updated, newBadges } = recordAiQuestion(progress);
          setProgress(updated);
          if (newBadges.length > 0) {
            const badgeObj = ALL_BADGES.find((b) => b.id === newBadges[0]);
            if (badgeObj) {
              setToastBadge(badgeObj.title);
              setTimeout(() => setToastBadge(null), 4000);
            }
          }
        }}
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
            <button onClick={() => setActiveView('topics')} className="hover:text-slate-900 transition">Topics (+20 🪙)</button>
            <button onClick={() => setActiveView('arcade')} className="hover:text-slate-900 transition">Arcade (15 Games)</button>
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

