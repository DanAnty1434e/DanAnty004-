import { LeaderboardEntry, LeagueTier } from '../types';

export const PEER_LEARNERS: Omit<LeaderboardEntry, 'rankChange'>[] = [
  {
    id: 'peer-1',
    name: 'Amina Bello',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    xp: 2340,
    level: 16,
    streakDays: 14,
    league: 'Master',
    topBadges: ['math-genius', 'streak-titan', 'curriculum-virtuoso'],
    specialty: 'Mathematics & Quantum Physics',
  },
  {
    id: 'peer-2',
    name: 'Liam Chen',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    xp: 1850,
    level: 13,
    streakDays: 9,
    league: 'Diamond',
    topBadges: ['algorithm-master', 'code-architect', 'quiz-ace'],
    specialty: 'Computer Studies & Algorithms',
  },
  {
    id: 'peer-3',
    name: 'Sofia Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    xp: 1420,
    level: 10,
    streakDays: 11,
    league: 'Diamond',
    topBadges: ['global-polyglot', 'polyglot', 'perfectionist'],
    specialty: 'World Languages & Pronunciation',
  },
  {
    id: 'peer-4',
    name: 'Marcus Sterling',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    xp: 890,
    level: 6,
    streakDays: 5,
    league: 'Gold',
    topBadges: ['science-pioneer', 'lab-scientist', 'speed-scholar'],
    specialty: 'Applied Chemistry & Biology',
  },
  {
    id: 'peer-5',
    name: 'Zara Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    xp: 640,
    level: 5,
    streakDays: 4,
    league: 'Gold',
    topBadges: ['grammar-laureate', 'quiz-ace', 'ai-scholar'],
    specialty: 'English Literature & Rhetoric',
  },
  {
    id: 'peer-6',
    name: 'Tariq Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    xp: 380,
    level: 3,
    streakDays: 2,
    league: 'Silver',
    topBadges: ['math-wizard', 'first-step'],
    specialty: 'Algebra Foundations',
  },
  {
    id: 'peer-7',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    xp: 220,
    level: 2,
    streakDays: 2,
    league: 'Bronze',
    topBadges: ['first-step', 'polyglot'],
    specialty: 'Spanish & French Basics',
  },
  {
    id: 'peer-8',
    name: 'David Okafor',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    xp: 150,
    level: 1,
    streakDays: 1,
    league: 'Bronze',
    topBadges: ['first-step'],
    specialty: 'Python Syntax & Logic',
  },
];

export function generateLiveLeaderboard(currentUserXp: number, currentStreak: number, currentLevel: number, userBadges: string[]): { entries: LeaderboardEntry[]; currentUserRank: number; totalParticipants: number } {
  // Determine current user's league
  let league: LeagueTier = 'Bronze';
  if (currentUserXp >= 2000) league = 'Master';
  else if (currentUserXp >= 1200) league = 'Diamond';
  else if (currentUserXp >= 600) league = 'Gold';
  else if (currentUserXp >= 250) league = 'Silver';

  const currentUserEntry: LeaderboardEntry = {
    id: 'current-user',
    name: 'You (DanAnty Scholar)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    xp: currentUserXp,
    level: currentLevel,
    streakDays: currentStreak,
    league,
    topBadges: userBadges.slice(0, 3),
    isCurrentUser: true,
    rankChange: +2,
    specialty: 'Multi-Disciplinary Track',
  };

  const allEntries: LeaderboardEntry[] = [
    ...PEER_LEARNERS.map((p, idx) => ({
      ...p,
      rankChange: idx % 3 === 0 ? 1 : idx % 2 === 0 ? -1 : 0,
    })),
    currentUserEntry,
  ];

  // Sort descending by XP
  allEntries.sort((a, b) => b.xp - a.xp);

  const currentUserRank = allEntries.findIndex((e) => e.id === 'current-user') + 1;

  return {
    entries: allEntries,
    currentUserRank,
    totalParticipants: allEntries.length,
  };
}
