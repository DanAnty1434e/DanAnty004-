import { UserProgress, AIRecommendationResponse, RecommendationItem, SubjectId } from '../types';
import { CURRICULUM_DATA } from '../data/curriculum';

export async function fetchAIRecommendations(progress: UserProgress): Promise<AIRecommendationResponse> {
  try {
    const res = await fetch('/api/gemini/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completedLessons: progress.completedLessons,
        quizAttempts: progress.quizAttempts,
        interests: progress.interestsProfile?.selectedTags || [
          'Algorithms & Python',
          'Algebra & Calculus',
          'Space & Physics',
        ],
        learningGoal: progress.interestsProfile?.learningGoal || 'career-skills',
        level: progress.level,
        xp: progress.xp,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch recommendations: ${res.status}`);
    }

    const data: AIRecommendationResponse = await res.json();
    return data;
  } catch (error) {
    console.warn('Falling back to local heuristic recommendation generator:', error);
    return generateLocalRecommendations(progress);
  }
}

export function generateLocalRecommendations(progress: UserProgress): AIRecommendationResponse {
  const completed = new Set(progress.completedLessons);
  const quizScores = progress.quizAttempts;
  const interests = progress.interestsProfile?.selectedTags || [];

  // Find all uncompleted lessons
  const allLessons = CURRICULUM_DATA.flatMap((s) =>
    s.lessons.map((l) => ({ ...l, subjectColor: s.color, subjectTitle: s.title }))
  );

  const uncompleted = allLessons.filter((l) => !completed.has(l.id));

  // Check if there are weak quiz scores (<80%)
  const weakLessonId = Object.keys(quizScores).find((id) => (quizScores[id]?.score || 100) < 80);
  const weakLesson = weakLessonId ? allLessons.find((l) => l.id === weakLessonId) : null;

  // Find best uncompleted match
  const primaryLesson = uncompleted[0] || allLessons[0];

  const primaryRec: RecommendationItem = {
    id: 'primary-rec-local',
    type: 'next-best',
    lessonId: primaryLesson.id,
    subjectId: primaryLesson.subjectId,
    title: primaryLesson.title,
    reason: `Optimal next challenge aligned with your Level ${progress.level} progress and mastery milestones.`,
    confidenceScore: 94,
    matchTags: primaryLesson.tags,
    badgePotential: primaryLesson.subjectId === 'mathematics' ? 'Math Wizard' : primaryLesson.subjectId === 'computer-studies' ? 'Code Architect' : 'Quiz Ace',
    estimatedXp: primaryLesson.xpReward,
  };

  const recList: RecommendationItem[] = [
    primaryRec,
  ];

  if (weakLesson) {
    recList.push({
      id: 'rec-weak-remedy',
      type: 'weak-spot-remedy',
      lessonId: weakLesson.id,
      subjectId: weakLesson.subjectId,
      title: weakLesson.title,
      reason: `Review this module to turn a ${quizScores[weakLesson.id].score}% score into 100% mastery and unlock the Quiz Ace badge!`,
      confidenceScore: 92,
      matchTags: weakLesson.tags,
      badgePotential: 'Quiz Ace',
      estimatedXp: 50,
    });
  }

  // Interest match
  const interestMatch = uncompleted.find((l) =>
    l.tags.some((tag) => interests.some((int) => tag.toLowerCase().includes(int.toLowerCase()) || int.toLowerCase().includes(tag.toLowerCase())))
  ) || uncompleted[1] || allLessons[1];

  if (interestMatch && interestMatch.id !== primaryLesson.id) {
    recList.push({
      id: 'rec-interest-match',
      type: 'interest-match',
      lessonId: interestMatch.id,
      subjectId: interestMatch.subjectId,
      title: interestMatch.title,
      reason: `Directly caters to your stated interest in ${interestMatch.tags.slice(0, 2).join(' & ')}.`,
      confidenceScore: 89,
      matchTags: interestMatch.tags,
      badgePotential: 'Renaissance Scholar',
      estimatedXp: interestMatch.xpReward,
    });
  }

  // New Horizon (e.g. World Languages or Computer Studies if not taken)
  const newHorizon = uncompleted.find((l) => l.subjectId === 'world-languages' || l.subjectId === 'computer-studies') || uncompleted[2] || allLessons[2];
  if (newHorizon && !recList.some((r) => r.lessonId === newHorizon.id)) {
    recList.push({
      id: 'rec-new-horizon',
      type: 'new-horizon',
      lessonId: newHorizon.id,
      subjectId: newHorizon.subjectId,
      title: newHorizon.title,
      reason: `Expand your multi-disciplinary toolkit with foundational concepts in ${newHorizon.subjectId}.`,
      confidenceScore: 86,
      matchTags: newHorizon.tags,
      badgePotential: 'World Explorer',
      estimatedXp: newHorizon.xpReward,
    });
  }

  const focusSubject: SubjectId = primaryLesson.subjectId;

  return {
    primaryRecommendation: primaryRec,
    recommendations: recList.slice(0, 4),
    personalizedSummary: `You have completed ${completed.size} lesson${completed.size === 1 ? '' : 's'} across the curriculum. You are on track for steady progression with strong performance.`,
    focusSubject,
    motivationalTip: 'Every lesson completed strengthens neural connections. Take 10 minutes to learn something new today!',
    generatedBy: 'DanAnty Smart Curriculum Analyzer',
  };
}
