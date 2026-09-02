export type SubjectId = 'english' | 'mathematics' | 'science' | 'computer-studies' | 'world-languages';

export type LevelDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ClassLevel = 'primary' | 'jss' | 'sss' | 'undergrad' | 'general';

export interface ClassDefinition {
  id: ClassLevel;
  name: string;
  shortName: string;
  gradeRange: string;
  description: string;
  icon: string;
  recommendedLevels: LevelDifficulty[];
}

export const CLASS_LEVELS: ClassDefinition[] = [
  {
    id: 'primary',
    name: 'Primary / Elementary School',
    shortName: 'Primary (Grades 1-6)',
    gradeRange: 'Grades 1 - 6 / Basic 1 - 6',
    description: 'Foundational arithmetic, fundamental grammar, introductory nature science, and beginning phonics.',
    icon: '🎒',
    recommendedLevels: ['beginner'],
  },
  {
    id: 'jss',
    name: 'Junior Secondary School',
    shortName: 'JSS (Grades 7-9)',
    gradeRange: 'JSS 1 - 3 / Grades 7 - 9 / Middle School',
    description: 'Pre-algebra, linear equations, introductory biology and chemistry, basic coding logic, and structured essays.',
    icon: '📘',
    recommendedLevels: ['beginner', 'intermediate'],
  },
  {
    id: 'sss',
    name: 'Senior Secondary / High School',
    shortName: 'SSS (Grades 10-12 / WAEC)',
    gradeRange: 'SSS 1 - 3 / Grades 10 - 12 / WAEC / GCSE / SAT',
    description: 'Quadratic functions, trigonometry, organic chemistry, physics kinematics, Python programming, and advanced rhetoric.',
    icon: '🎓',
    recommendedLevels: ['intermediate', 'advanced'],
  },
  {
    id: 'undergrad',
    name: 'College & Undergraduate',
    shortName: 'College / University',
    gradeRange: 'Higher Education / Tertiary',
    description: 'Differential calculus, quantum physics, thermodynamics, data structures & algorithms, and comparative linguistics.',
    icon: '🏛️',
    recommendedLevels: ['advanced'],
  },
  {
    id: 'general',
    name: 'Lifelong & Independent Learner',
    shortName: 'All Levels',
    gradeRange: 'Self-Paced / All Ages',
    description: 'Comprehensive access to all curricula across mathematics, science, language arts, and computer science.',
    icon: '🌍',
    recommendedLevels: ['beginner', 'intermediate', 'advanced'],
  },
];

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
  coins: number; // Token balance (earn 20 per topic read, spend 10 to play games)
  streakDays: number;
  lastActiveDate: string;
  completedLessons: string[]; // lesson ids
  inProgressLessonId: string | null;
  quizAttempts: Record<string, QuizAttempt>; // lessonId -> latest attempt
  badges: string[]; // badge ids
  bookmarks: string[]; // lesson ids
  dailyGoalXp: number;
  todayXp: number;
  selectedClass?: ClassLevel;
  interestsProfile?: UserInterestsProfile;
  aiQuestionsAsked?: number;
  widgetsInteracted?: number;
  gamesPlayed?: number;
}

export interface MathStep {
  stepNumber: number;
  title: string;
  expression?: string;
  explanation: string;
}

export interface MathEquationSolution {
  equation: string;
  equationType: string;
  methodName: string;
  formulaUsed?: string;
  steps: MathStep[];
  finalAnswer: string;
  verification?: string;
  tips?: string;
}

export type MiniGameCategory = 'math' | 'science' | 'english' | 'code' | 'languages' | 'logic';

export type AppView = 'home' | 'topics' | 'arcade' | 'subject' | 'lesson' | 'quiz' | 'ai-tutor' | 'dashboard' | 'leaderboard';

export interface MiniGame {
  id: string;
  title: string;
  subjectId: SubjectId;
  subjectName: string;
  description: string;
  iconName: string;
  category: MiniGameCategory;
  difficulty: LevelDifficulty;
  coinCost: number; // 10 coins
  rewardCoins: number; // e.g. 5-15 bonus coins on win
  rewardXp: number; // e.g. 30 XP
  color: string;
  howToPlay: string;
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
  dataBytes?: number;
}

export type NetworkConnectionType = '5g' | '4g' | '3g' | '2g' | 'slow-2g' | 'wifi' | 'offline';
export type DataSaverMode = 'auto' | 'standard' | 'data-saver' | 'ultra-saver' | 'offline-only';

export interface NetworkStatus {
  isOnline: boolean;
  effectiveType: NetworkConnectionType;
  downlinkMbps: number;
  rttMs: number;
  saveDataEnabled: boolean;
  mode: DataSaverMode;
}

export interface DataUsageStats {
  bytesReceived: number;
  bytesSent: number;
  bytesSaved: number;
  requestsCount: number;
  offlineResponsesCount: number;
  lastReset: string;
}

