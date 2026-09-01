import { UserProgress, QuizAttempt, LeagueTier, UserInterestsProfile } from '../types';
import { ALL_BADGES } from '../data/badges';

const STORAGE_KEY = 'dananty004_user_progress';

export const DEFAULT_INTERESTS: UserInterestsProfile = {
  selectedTags: ['Algorithms & Python', 'Algebra & Calculus', 'Space & Physics', 'Spanish Basics'],
  learningGoal: 'career-skills',
  favoriteSubjects: ['computer-studies', 'mathematics'],
};

const DEFAULT_PROGRESS: UserProgress = {
  xp: 280,
  level: 2,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['eng-101', 'math-101'],
  inProgressLessonId: 'cs-101',
  quizAttempts: {
    'eng-101': {
      lessonId: 'eng-101',
      subjectId: 'english',
      score: 100,
      correctCount: 3,
      totalQuestions: 3,
      completedAt: new Date(Date.now() - 86400000).toISOString(),
      answers: [],
      durationSeconds: 45,
    },
    'math-101': {
      lessonId: 'math-101',
      subjectId: 'mathematics',
      score: 100,
      correctCount: 3,
      totalQuestions: 3,
      completedAt: new Date().toISOString(),
      answers: [],
      durationSeconds: 52,
    },
  },
  badges: ['first-step', 'quiz-ace', 'streak-champion'],
  bookmarks: [],
  dailyGoalXp: 100,
  todayXp: 75,
  interestsProfile: DEFAULT_INTERESTS,
  aiQuestionsAsked: 1,
  widgetsInteracted: 2,
};

export function getLeagueForXp(xp: number): LeagueTier {
  if (xp >= 2000) return 'Master';
  if (xp >= 1200) return 'Diamond';
  if (xp >= 600) return 'Gold';
  if (xp >= 250) return 'Silver';
  return 'Bronze';
}

export function getLevelProgress(xp: number): { currentLevel: number; currentXp: number; nextLevelXp: number; progressPercent: number } {
  const currentLevel = Math.floor(xp / 150) + 1;
  const xpIntoCurrentLevel = xp % 150;
  const progressPercent = Math.min(100, Math.round((xpIntoCurrentLevel / 150) * 100));
  return {
    currentLevel,
    currentXp: xpIntoCurrentLevel,
    nextLevelXp: 150,
    progressPercent,
  };
}

export function getSavedProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserProgress(DEFAULT_PROGRESS);
      return DEFAULT_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    
    // Check streak
    const today = new Date().toISOString().split('T')[0];
    const lastActive = parsed.lastActiveDate || today;
    
    let streakDays = parsed.streakDays || 1;
    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastActive === yesterday) {
        streakDays += 1;
      } else {
        // missed more than 1 day
        streakDays = 1;
      }
    }

    const xp = parsed.xp || 0;
    const level = Math.floor(xp / 150) + 1;
    
    const loaded: UserProgress = {
      ...DEFAULT_PROGRESS,
      ...parsed,
      xp,
      level,
      streakDays,
      todayXp: lastActive === today ? (parsed.todayXp || 0) : 0,
      lastActiveDate: today,
      interestsProfile: parsed.interestsProfile || DEFAULT_INTERESTS,
    };
    return loaded;
  } catch (e) {
    console.error('Failed to load user progress:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress:', e);
  }
}

function checkAllEligibleBadges(progress: UserProgress): { newBadges: string[]; totalBonusXp: number } {
  const unlocked = new Set(progress.badges);
  const newlyUnlocked: string[] = [];
  let totalBonusXp = 0;

  const completed = progress.completedLessons;
  const attempts = Object.values(progress.quizAttempts);
  const perfectQuizzes = attempts.filter(a => a.score === 100);

  // 1. First Step
  if (completed.length >= 1 && !unlocked.has('first-step')) {
    newlyUnlocked.push('first-step');
  }

  // 2. Quiz Ace
  if (perfectQuizzes.length >= 1 && !unlocked.has('quiz-ace')) {
    newlyUnlocked.push('quiz-ace');
  }

  // 3. Perfectionist (3 perfect quizzes)
  if (perfectQuizzes.length >= 3 && !unlocked.has('perfectionist')) {
    newlyUnlocked.push('perfectionist');
  }

  // 4. Math Wizard (2 math lessons)
  const mathCount = completed.filter(id => id.startsWith('math-')).length;
  if (mathCount >= 2 && !unlocked.has('math-wizard')) {
    newlyUnlocked.push('math-wizard');
  }

  // 5. Math Genius (100% on advanced math)
  if (attempts.some(a => a.lessonId === 'math-301' && a.score === 100) && !unlocked.has('math-genius')) {
    newlyUnlocked.push('math-genius');
  }

  // 6. Polyglot (2 language lessons)
  const langCount = completed.filter(id => id.startsWith('lang-')).length;
  if (langCount >= 2 && !unlocked.has('polyglot')) {
    newlyUnlocked.push('polyglot');
  }

  // 7. Global Polyglot (3 language lessons)
  if (langCount >= 3 && !unlocked.has('global-polyglot')) {
    newlyUnlocked.push('global-polyglot');
  }

  // 8. Code Architect (2 CS lessons)
  const csCount = completed.filter(id => id.startsWith('cs-')).length;
  if (csCount >= 2 && !unlocked.has('code-architect')) {
    newlyUnlocked.push('code-architect');
  }

  // 9. Algorithm Master (CS-301 completed)
  if (completed.includes('cs-301') && !unlocked.has('algorithm-master')) {
    newlyUnlocked.push('algorithm-master');
  }

  // 10. Science Pioneer (2 Science lessons)
  const sciCount = completed.filter(id => id.startsWith('sci-')).length;
  if (sciCount >= 2 && !unlocked.has('science-pioneer')) {
    newlyUnlocked.push('science-pioneer');
  }

  // 11. Quantum Mind (all science lessons)
  if (sciCount >= 3 && !unlocked.has('quantum-mind')) {
    newlyUnlocked.push('quantum-mind');
  }

  // 12. Grammar Laureate (2 English lessons)
  const engCount = completed.filter(id => id.startsWith('eng-')).length;
  if (engCount >= 2 && !unlocked.has('grammar-laureate')) {
    newlyUnlocked.push('grammar-laureate');
  }

  // 13. Streak Champion (3 days)
  if (progress.streakDays >= 3 && !unlocked.has('streak-champion')) {
    newlyUnlocked.push('streak-champion');
  }

  // 14. Streak Titan (7 days)
  if (progress.streakDays >= 7 && !unlocked.has('streak-titan')) {
    newlyUnlocked.push('streak-titan');
  }

  // 15. AI Scholar (3 questions)
  if ((progress.aiQuestionsAsked || 0) >= 3 && !unlocked.has('ai-scholar')) {
    newlyUnlocked.push('ai-scholar');
  }

  // 16. Renaissance Scholar (at least 1 in each of the 5 subjects)
  const hasEng = completed.some(id => id.startsWith('eng-'));
  const hasMath = completed.some(id => id.startsWith('math-'));
  const hasSci = completed.some(id => id.startsWith('sci-'));
  const hasCs = completed.some(id => id.startsWith('cs-'));
  const hasLang = completed.some(id => id.startsWith('lang-'));
  if (hasEng && hasMath && hasSci && hasCs && hasLang && !unlocked.has('curriculum-virtuoso')) {
    newlyUnlocked.push('curriculum-virtuoso');
  }

  // 17. Lab Scientist (3 widget interactions)
  if ((progress.widgetsInteracted || 0) >= 3 && !unlocked.has('lab-scientist')) {
    newlyUnlocked.push('lab-scientist');
  }

  // 18. Speed Scholar (any quiz completed in <= 60s with score >= 80)
  if (attempts.some(a => (a.durationSeconds || 0) > 0 && (a.durationSeconds || 0) <= 60 && a.score >= 80) && !unlocked.has('speed-scholar')) {
    newlyUnlocked.push('speed-scholar');
  }

  for (const badgeId of newlyUnlocked) {
    const badge = ALL_BADGES.find(b => b.id === badgeId);
    if (badge) {
      totalBonusXp += badge.xpBonus;
    }
  }

  return { newBadges: newlyUnlocked, totalBonusXp };
}

export function recordLessonCompletion(progress: UserProgress, lessonId: string, xpReward: number): { updated: UserProgress; newBadges: string[]; gainedXp: number } {
  const isAlreadyCompleted = progress.completedLessons.includes(lessonId);
  const baseReward = isAlreadyCompleted ? 15 : xpReward;
  
  // Streak multiplier (1.2x if streak >= 3)
  const multiplier = progress.streakDays >= 3 ? 1.2 : 1.0;
  const gainedXp = Math.round(baseReward * multiplier);

  const newCompleted = isAlreadyCompleted ? progress.completedLessons : [...progress.completedLessons, lessonId];
  let newXp = progress.xp + gainedXp;
  let newTodayXp = (progress.todayXp || 0) + gainedXp;

  const tempProgress: UserProgress = {
    ...progress,
    xp: newXp,
    completedLessons: newCompleted,
    todayXp: newTodayXp,
  };

  const { newBadges, totalBonusXp } = checkAllEligibleBadges(tempProgress);
  newXp += totalBonusXp;
  newTodayXp += totalBonusXp;
  const newLevel = Math.floor(newXp / 150) + 1;

  const updated: UserProgress = {
    ...tempProgress,
    xp: newXp,
    level: newLevel,
    todayXp: newTodayXp,
    badges: [...progress.badges, ...newBadges],
  };

  saveUserProgress(updated);
  return { updated, newBadges, gainedXp: gainedXp + totalBonusXp };
}

export function recordQuizAttempt(progress: UserProgress, attempt: QuizAttempt): { updated: UserProgress; earnedXp: number; newBadges: string[] } {
  const isPerfect = attempt.score === 100;
  const baseScoreXp = Math.round((attempt.score / 100) * 60);
  const perfectBonus = isPerfect ? 30 : 0;
  const speedBonus = (attempt.durationSeconds && attempt.durationSeconds <= 60 && attempt.score >= 80) ? 15 : 0;

  // Streak multiplier
  const multiplier = progress.streakDays >= 3 ? 1.2 : 1.0;
  const earnedXp = Math.round((baseScoreXp + perfectBonus + speedBonus) * multiplier);

  let newXp = progress.xp + earnedXp;
  let newTodayXp = (progress.todayXp || 0) + earnedXp;

  const newAttempts = {
    ...progress.quizAttempts,
    [attempt.lessonId]: attempt,
  };

  const tempProgress: UserProgress = {
    ...progress,
    xp: newXp,
    todayXp: newTodayXp,
    quizAttempts: newAttempts,
  };

  const { newBadges, totalBonusXp } = checkAllEligibleBadges(tempProgress);
  newXp += totalBonusXp;
  newTodayXp += totalBonusXp;
  const newLevel = Math.floor(newXp / 150) + 1;

  const updated: UserProgress = {
    ...tempProgress,
    xp: newXp,
    level: newLevel,
    todayXp: newTodayXp,
    badges: [...progress.badges, ...newBadges],
  };

  saveUserProgress(updated);
  return { updated, earnedXp: earnedXp + totalBonusXp, newBadges };
}

export function recordAiQuestion(progress: UserProgress): { updated: UserProgress; newBadges: string[]; earnedXp: number } {
  const currentCount = (progress.aiQuestionsAsked || 0) + 1;
  const earnedXp = 10; // +10 XP for active curiosity
  let newXp = progress.xp + earnedXp;
  let newTodayXp = (progress.todayXp || 0) + earnedXp;

  const tempProgress: UserProgress = {
    ...progress,
    xp: newXp,
    todayXp: newTodayXp,
    aiQuestionsAsked: currentCount,
  };

  const { newBadges, totalBonusXp } = checkAllEligibleBadges(tempProgress);
  newXp += totalBonusXp;
  newTodayXp += totalBonusXp;
  const newLevel = Math.floor(newXp / 150) + 1;

  const updated: UserProgress = {
    ...tempProgress,
    xp: newXp,
    level: newLevel,
    todayXp: newTodayXp,
    badges: [...progress.badges, ...newBadges],
  };

  saveUserProgress(updated);
  return { updated, newBadges, earnedXp: earnedXp + totalBonusXp };
}

export function recordWidgetInteraction(progress: UserProgress): { updated: UserProgress; newBadges: string[]; earnedXp: number } {
  const currentCount = (progress.widgetsInteracted || 0) + 1;
  const earnedXp = 15; // +15 XP for interactive lab usage
  let newXp = progress.xp + earnedXp;
  let newTodayXp = (progress.todayXp || 0) + earnedXp;

  const tempProgress: UserProgress = {
    ...progress,
    xp: newXp,
    todayXp: newTodayXp,
    widgetsInteracted: currentCount,
  };

  const { newBadges, totalBonusXp } = checkAllEligibleBadges(tempProgress);
  newXp += totalBonusXp;
  newTodayXp += totalBonusXp;
  const newLevel = Math.floor(newXp / 150) + 1;

  const updated: UserProgress = {
    ...tempProgress,
    xp: newXp,
    level: newLevel,
    todayXp: newTodayXp,
    badges: [...progress.badges, ...newBadges],
  };

  saveUserProgress(updated);
  return { updated, newBadges, earnedXp: earnedXp + totalBonusXp };
}

export function updateUserInterests(progress: UserProgress, interests: UserInterestsProfile): UserProgress {
  const updated: UserProgress = {
    ...progress,
    interestsProfile: interests,
  };
  saveUserProgress(updated);
  return updated;
}

export function toggleBookmark(progress: UserProgress, lessonId: string): UserProgress {
  const bookmarks = progress.bookmarks.includes(lessonId)
    ? progress.bookmarks.filter(id => id !== lessonId)
    : [...progress.bookmarks, lessonId];
  
  const updated = { ...progress, bookmarks };
  saveUserProgress(updated);
  return updated;
}

