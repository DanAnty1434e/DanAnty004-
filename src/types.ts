export type SubjectCategory =
  | 'all'
  | 'sciences'
  | 'science'
  | 'arts'
  | 'art'
  | 'commercial'
  | 'languages'
  | 'primary'
  | 'global';

export type SubjectId =
  // Pure & Applied Sciences, Tech & Math
  | 'mathematics'
  | 'science'
  | 'further-math'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'agricultural-science'
  | 'computer-studies'
  | 'basic-technology'
  | 'health-science'
  // Arts, Humanities, Social & Religion
  | 'english'
  | 'literature'
  | 'history'
  | 'government-civics'
  | 'islamic-studies'
  | 'christian-studies'
  | 'creative-arts'
  | 'music'
  | 'geography'
  // Commercial & Business
  | 'economics'
  | 'accounting'
  | 'commerce'
  // Languages
  | 'world-languages'
  // Primary Foundations
  | 'primary-math'
  | 'primary-science'
  | 'primary-english'
  | 'social-studies';

export type LevelDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ClassLevel =
  | 'lower-primary'
  | 'upper-primary'
  | 'jss1'
  | 'jss2'
  | 'jss3'
  | 'ss1'
  | 'ss2'
  | 'ss3'
  | 'primary' // legacy alias for all primary
  | 'jss' // legacy alias for all jss
  | 'sss' // legacy alias for all sss
  | 'undergrad'
  | 'general';

export interface ClassDefinition {
  id: ClassLevel;
  name: string;
  shortName: string;
  gradeRange: string;
  category: 'primary' | 'jss' | 'sss' | 'higher';
  description: string;
  icon: string;
  recommendedLevels: LevelDifficulty[];
}

export const CLASS_LEVELS: ClassDefinition[] = [
  {
    id: 'lower-primary',
    name: 'Lower Primary (Basic 1 - 3)',
    shortName: 'Lower Primary (Grades 1-3)',
    gradeRange: 'Basic 1 - 3 / Grades 1 - 3 (Ages 5-8)',
    category: 'primary',
    description: 'Foundational numeracy, phonics, simple reading, nature exploration, and introductory creative arts.',
    icon: '🖍️',
    recommendedLevels: ['beginner'],
  },
  {
    id: 'upper-primary',
    name: 'Upper Primary (Basic 4 - 6)',
    shortName: 'Upper Primary (Grades 4-6)',
    gradeRange: 'Basic 4 - 6 / Primary Leaving / Common Entrance',
    category: 'primary',
    description: 'Quantitative & verbal reasoning, basic science & technology, fractions, grammar, and social studies.',
    icon: '🎒',
    recommendedLevels: ['beginner', 'intermediate'],
  },
  {
    id: 'jss1',
    name: 'JSS 1 (Junior Secondary 1)',
    shortName: 'JSS 1 (Grade 7 / Basic 7)',
    gradeRange: 'Grade 7 / Basic 7 / Junior Secondary Year 1',
    category: 'jss',
    description: 'Algebraic terms, basic science principles, introduction to computer hardware & software, business studies.',
    icon: '📘',
    recommendedLevels: ['beginner', 'intermediate'],
  },
  {
    id: 'jss2',
    name: 'JSS 2 (Junior Secondary 2)',
    shortName: 'JSS 2 (Grade 8 / Basic 8)',
    gradeRange: 'Grade 8 / Basic 8 / Junior Secondary Year 2',
    category: 'jss',
    description: 'Linear equations, living organisms & ecosystems, basic technology mechanisms, civic rights and duties.',
    icon: '📗',
    recommendedLevels: ['intermediate'],
  },
  {
    id: 'jss3',
    name: 'JSS 3 (Junior Secondary 3 / BECE)',
    shortName: 'JSS 3 (Grade 9 / BECE Prep)',
    gradeRange: 'Grade 9 / Basic 9 / BECE & Junior WAEC Exam Track',
    category: 'jss',
    description: 'Simultaneous equations, energy transformations, logic gates, literature analysis, and national values.',
    icon: '📙',
    recommendedLevels: ['intermediate', 'advanced'],
  },
  {
    id: 'ss1',
    name: 'SS 1 (Senior Secondary 1)',
    shortName: 'SS 1 (Grade 10 / High School 1)',
    gradeRange: 'Grade 10 / Senior Secondary Year 1 (Science / Arts / Commercial)',
    category: 'sss',
    description: 'Quadratic equations, chemical bonding, mechanics in physics, cell biology, macroeconomics, and prose fiction.',
    icon: '📐',
    recommendedLevels: ['intermediate', 'advanced'],
  },
  {
    id: 'ss2',
    name: 'SS 2 (Senior Secondary 2)',
    shortName: 'SS 2 (Grade 11 / High School 2)',
    gradeRange: 'Grade 11 / Senior Secondary Year 2',
    category: 'sss',
    description: 'Trigonometry & circle theorems, organic chemistry, electric fields, genetics, government systems, and accounting.',
    icon: '🔬',
    recommendedLevels: ['intermediate', 'advanced'],
  },
  {
    id: 'ss3',
    name: 'SS 3 (Senior Secondary 3 / WAEC / JAMB / SAT)',
    shortName: 'SS 3 (Grade 12 / WAEC & JAMB)',
    gradeRange: 'Grade 12 / WASSCE, NECO, UTME/JAMB, GCSE, SAT Track',
    category: 'sss',
    description: 'Calculus, atomic physics, reaction kinetics, past questions drills, essay rhetoric, and comprehensive exam revision.',
    icon: '🎓',
    recommendedLevels: ['advanced'],
  },
  {
    id: 'undergrad',
    name: 'College & Undergraduate',
    shortName: 'College / University',
    gradeRange: 'Higher Education / Tertiary & Degree Studies',
    category: 'higher',
    description: 'Advanced calculus, quantum mechanics, organic synthesis, data structures & algorithms, and comparative economics.',
    icon: '🏛️',
    recommendedLevels: ['advanced'],
  },
  {
    id: 'general',
    name: 'Lifelong World Learner',
    shortName: 'All Classes & Subjects',
    gradeRange: 'Universal Global Knowledge / Self-Paced',
    category: 'higher',
    description: 'Full unrestricted access to every subject in Science, Arts, Commercial, Languages, and Tech across all grades.',
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
  category?: SubjectCategory;
  applicableClasses?: ClassLevel[];
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

export interface DailyCompletionRecord {
  date: string; // 'YYYY-MM-DD'
  dayLabel?: string;
  lessonXp: number;
  examXp: number;
  totalXp: number;
  lessonsCompleted?: number;
  quizzesCompleted?: number;
  examsCompleted?: number;
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
  examAttempts?: ExamAttemptRecord[];
  dailyCompletionHistory?: DailyCompletionRecord[];
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

export type AppView = 'home' | 'topics' | 'arcade' | 'subject' | 'lesson' | 'quiz' | 'ai-tutor' | 'dashboard' | 'leaderboard' | 'exam-prep';

export type ExamTarget = 'waec' | 'jamb' | 'neco' | 'bece' | 'common-entrance' | 'sat-gcse' | 'class-termly' | 'universal';

export interface ExamQuestion extends QuizQuestion {
  yearOrSession?: string;
  topicTag?: string;
}

export interface ExamPaper {
  id: string;
  title: string;
  subtitle: string;
  targetExam: ExamTarget;
  targetClass: ClassLevel;
  subjectId: SubjectId;
  subjectName: string;
  yearSession?: string;
  durationMinutes: number;
  totalMarks: number;
  gradingScale: 'waec' | 'jamb' | 'percentage' | 'bece';
  questions: ExamQuestion[];
  instructions: string[];
  badgeRewardId?: string;
  xpReward: number;
  coinReward: number;
}

export interface ExamAttemptRecord {
  id: string;
  paperId: string;
  paperTitle: string;
  subjectId: SubjectId;
  targetExam: ExamTarget;
  targetClass: ClassLevel;
  score: number; // percentage e.g. 85
  rawScore: number;
  totalQuestions: number;
  gradeFormatted: string; // e.g. "A1 (Distinction)" or "JAMB: 340/400"
  timeSpentSeconds: number;
  completedAt: string;
  userAnswers: Record<number, number>; // question index -> chosen option index
  aiEvaluationSummary?: string;
  xpEarned?: number;
}

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

