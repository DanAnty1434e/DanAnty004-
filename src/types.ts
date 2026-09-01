export type SubjectId = 'english' | 'mathematics' | 'science' | 'computer-studies' | 'world-languages';

export type LevelDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type BadgeCategory = 'subject-mastery' | 'streak-dedication' | 'quiz-performance' | 'special-milestones';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond';
export type LeagueTier = 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Master';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface InteractiveWidgetConfig {
  type: 'code-playground' | 'math-grapher' | 'language-audio' | 'science-sim' | 'grammar-builder';
  title: string;
  description: string;
  data: Record<string, any>;
}

export interface LessonSection {
  title: string;
  content: string; // Markdown or structured text
  keyTakeaway?: string;
  interactiveWidget?: InteractiveWidgetConfig;
}

export interface Lesson {
  id: string;
  subjectId: SubjectId;
  level: LevelDifficulty;
  title: string;
  subtitle: string;
  durationMinutes: number;
  xpReward: number;
  iconName: string;
  sections: LessonSection[];
  quiz: QuizQuestion[];
  tags: string[];
}

export interface Subject {
  id: SubjectId;
  title: string;
  tagline: string;
  description: string;
  color: string;
  lightColor: string;
  borderColor: string;
  gradient: string;
  iconName: string;
  lessons: Lesson[];
  featuredTopics: string[];
}

export interface QuizAttempt {
  lessonId: string;
  subjectId: SubjectId;
  score: number; // percentage e.g. 100
  correctCount: number;
  totalQuestions: number;
  completedAt: string;
  answers: {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  }[];
  durationSeconds?: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  tier: BadgeTier;
  requirement: string;
  xpBonus: number;
  unlockedAt?: string;
}

export interface UserInterestsProfile {
  selectedTags: string[];
  learningGoal: 'exam-prep' | 'career-skills' | 'curiosity' | 'language-fluency' | 'academic-excellence';
  favoriteSubjects: SubjectId[];
}

export interface UserProgress {
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessons: string[]; // lesson ids
  inProgressLessonId: string | null;
  quizAttempts: Record<string, QuizAttempt>; // lessonId -> latest attempt
  badges: string[]; // badge ids
  bookmarks: string[]; // lesson ids
  dailyGoalXp: number;
  todayXp: number;
  interestsProfile?: UserInterestsProfile;
  aiQuestionsAsked?: number;
  widgetsInteracted?: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streakDays: number;
  league: LeagueTier;
  topBadges: string[];
  isCurrentUser?: boolean;
  rankChange: number; // e.g. +2, 0, -1
  specialty: string;
}

export interface RecommendationItem {
  id: string;
  type: 'next-best' | 'weak-spot-remedy' | 'interest-match' | 'new-horizon';
  lessonId: string;
  subjectId: SubjectId;
  title: string;
  reason: string;
  confidenceScore: number; // 0-100
  matchTags: string[];
  badgePotential?: string;
  estimatedXp: number;
}

export interface AIRecommendationResponse {
  primaryRecommendation: RecommendationItem;
  recommendations: RecommendationItem[];
  personalizedSummary: string;
  focusSubject: SubjectId;
  motivationalTip: string;
  generatedBy: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  subject?: SubjectId;
  timestamp: string;
  isAudioPlaying?: boolean;
}

