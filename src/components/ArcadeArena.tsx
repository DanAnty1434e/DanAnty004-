import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Coins,
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  BookOpen,
  Atom,
  Binary,
  Globe2,
  Bug,
  Orbit,
  Triangle,
  Layers,
  Cpu,
  Scale,
  Award,
  Flag,
  Shield,
  HelpCircle,
  Flame,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { MiniGame, UserProgress, SubjectId } from '../types';
import { MINI_GAMES_LIST } from '../data/games';
import { spendCoinsForGame, recordGameResult } from '../utils/storage';

interface ArcadeArenaProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onNavigateToTopics: (subjectId?: SubjectId) => void;
  onShowXpToast: (xp: number) => void;
  onShowBadgeToast: (badgeName: string) => void;
}

export function ArcadeArena({
  progress,
  onUpdateProgress,
  onNavigateToTopics,
  onShowXpToast,
  onShowBadgeToast,
}: ArcadeArenaProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeGame, setActiveGame] = useState<MiniGame | null>(null);
  const [insufficientCoinsModal, setInsufficientCoinsModal] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<{
    score: number;
    maxScore: number;
    earnedCoins: number;
    earnedXp: number;
    won: boolean;
  } | null>(null);

  // Sound effects generator via Web Audio API (gracefully handles all devices)
  const playChime = (type: 'coin' | 'correct' | 'wrong' | 'win') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'coin') {
        osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
        osc.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.15); // E6
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'win') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(739.99, ctx.currentTime + 0.12); // F#5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.24); // A5
        osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.36); // D6
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.55);
        osc.start();
        osc.stop(ctx.currentTime + 0.55);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  // Launch Game Handler
  const handleStartGame = (game: MiniGame) => {
    if ((progress.coins || 0) < game.coinCost) {
      setInsufficientCoinsModal(true);
      return;
    }

    // Deduct 10 coins
    const { success, updated } = spendCoinsForGame(progress, game.coinCost);
    if (success) {
      playChime('coin');
      onUpdateProgress(updated);
      setActiveGame(game);
      setGameResult(null);
    } else {
      setInsufficientCoinsModal(true);
    }
  };

  // Finish Game Handler
  const handleFinishGame = (score: number, maxScore: number) => {
    if (!activeGame) return;
    const isWin = score >= Math.ceil(maxScore * 0.6);
    const bonusCoins = isWin ? activeGame.rewardCoins : Math.max(2, Math.round(activeGame.rewardCoins * 0.4));
    const bonusXp = isWin ? activeGame.rewardXp : Math.max(10, Math.round(activeGame.rewardXp * 0.5));

    if (isWin) {
      playChime('win');
    }

    const { updated, newBadges } = recordGameResult(progress, activeGame.id, bonusCoins, bonusXp);
    onUpdateProgress(updated);
    onShowXpToast(bonusXp);

    if (newBadges.length > 0) {
      onShowBadgeToast('Arcade Champion');
    }

    setGameResult({
      score,
      maxScore,
      earnedCoins: bonusCoins,
      earnedXp: bonusXp,
      won: isWin,
    });
  };

  const filteredGames =
    selectedCategory === 'all'
      ? MINI_GAMES_LIST
      : MINI_GAMES_LIST.filter((g) => g.category === selectedCategory);

  const getGameIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'Atom':
        return <Atom className="w-6 h-6" />;
      case 'Binary':
        return <Binary className="w-6 h-6" />;
      case 'Globe2':
        return <Globe2 className="w-6 h-6" />;
      case 'Bug':
        return <Bug className="w-6 h-6" />;
      case 'Orbit':
        return <Orbit className="w-6 h-6" />;
      case 'Triangle':
        return <Triangle className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Scale':
        return <Scale className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'Flag':
        return <Flag className="w-6 h-6" />;
      case 'Shield':
        return <Shield className="w-6 h-6" />;
      default:
        return <Gamepad2 className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Hero Banner */}
        <div className="relative rounded-3xl bg-slate-900 text-white p-6 sm:p-8 overflow-hidden border border-slate-800 shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>DanAnty004 Educational Arcade • 15 Mini-Games</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif]">
                Play, Learn & Challenge Yourself
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Spend <strong className="text-amber-400">10 coins</strong> to play any of the 15 interactive mini-games. Read & complete any subject topic to earn <strong className="text-amber-400">+20 coins</strong>!
              </p>
            </div>

            {/* Coin Balance & Quick Action */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-800/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 pr-4 border-r border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 border border-amber-400/30">
                  <Coins className="w-7 h-7 animate-bounce" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Your Coin Balance
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {progress.coins || 0}
                    </span>
                    <span className="text-xs text-amber-200 font-bold">Coins</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateToTopics()}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Earn +20 Coins (Read Topics)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All 15 Games', count: 15 },
            { id: 'math', label: 'Mathematics', count: 3 },
            { id: 'science', label: 'Sciences', count: 4 },
            { id: 'english', label: 'English & Language', count: 3 },
            { id: 'code', label: 'Computer Coding', count: 3 },
            { id: 'languages', label: 'World Languages', count: 2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 border ${
                selectedCategory === tab.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedCategory === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Games Grid (15 Interactive Mini-Games) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game, index) => {
            const hasEnoughCoins = (progress.coins || 0) >= game.coinCost;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Game Header Banner */}
                  <div className={`p-5 bg-gradient-to-r ${game.color} text-white relative overflow-hidden`}>
                    <div className="flex items-start justify-between relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
                        {getGameIcon(game.iconName)}
                      </div>
                      <div className="flex items-center space-x-1.5 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                        <Coins className="w-3.5 h-3.5 text-amber-300" />
                        <span>{game.coinCost} Coins</span>
                      </div>
                    </div>

                    <div className="mt-4 relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                        {game.subjectName}
                      </span>
                      <h3 className="text-lg font-bold font-['Outfit',sans-serif]">{game.title}</h3>
                    </div>
                  </div>

                  {/* Game Body */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                      {game.description}
                    </p>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
                      <strong className="text-slate-800 block">How to play:</strong>
                      <span>{game.howToPlay}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-1">
                      <span className="capitalize px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {game.difficulty}
                      </span>
                      <span className="flex items-center text-emerald-600 font-bold">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Win: +{game.rewardCoins} 🪙 & +{game.rewardXp} XP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Launch Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleStartGame(game)}
                    className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition shadow-xs ${
                      hasEnoughCoins
                        ? 'bg-slate-900 hover:bg-slate-800 text-white'
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {hasEnoughCoins ? (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        <span>Play Game (10 Coins)</span>
                      </>
                    ) : (
                      <>
                        <Coins className="w-4 h-4 text-amber-600" />
                        <span>Need 10 Coins (Read Topics to Earn)</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Insufficient Coins Modal */}
        <AnimatePresence>
          {insufficientCoinsModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center border-4 border-amber-50">
                  <Coins className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                    More Coins Needed!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    You need <strong className="text-slate-900">10 coins</strong> to play mini-games. You currently have <strong className="text-amber-600">{progress.coins || 0} coins</strong>.
                  </p>
                  <p className="text-xs text-indigo-600 font-bold bg-indigo-50 p-2.5 rounded-xl border border-indigo-100">
                    💡 Read and complete any topic across Mathematics, English, Science, Computer Studies, or World Languages to earn <strong className="text-indigo-900">+20 coins each!</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => {
                      setInsufficientCoinsModal(false);
                      onNavigateToTopics();
                    }}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs transition shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Topics (+20 Coins)</span>
                  </button>
                  <button
                    onClick={() => setInsufficientCoinsModal(false)}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Active Game Modal / Container */}
        <AnimatePresence>
          {activeGame && (
            <ActiveGameRunner
              game={activeGame}
              onClose={() => {
                setActiveGame(null);
                setGameResult(null);
              }}
              onFinish={handleFinishGame}
              playChime={playChime}
              gameResult={gameResult}
              onPlayAgain={() => handleStartGame(activeGame)}
              userCoins={progress.coins || 0}
              onNavigateToTopics={onNavigateToTopics}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Interactive Game Runner Engine (Runs the active game logic)
// -------------------------------------------------------------
interface ActiveGameRunnerProps {
  game: MiniGame;
  onClose: () => void;
  onFinish: (score: number, maxScore: number) => void;
  playChime: (type: 'coin' | 'correct' | 'wrong' | 'win') => void;
  gameResult: { score: number; maxScore: number; earnedCoins: number; earnedXp: number; won: boolean } | null;
  onPlayAgain: () => void;
  userCoins: number;
  onNavigateToTopics: () => void;
}

function ActiveGameRunner({
  game,
  onClose,
  onFinish,
  playChime,
  gameResult,
  onPlayAgain,
  userCoins,
  onNavigateToTopics,
}: ActiveGameRunnerProps) {
  // Game session states
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  // Dynamic game specific states
  const [binaryBits, setBinaryBits] = useState<number[]>([0, 0, 0, 0]); // 8, 4, 2, 1
  const [orbitAngle, setOrbitAngle] = useState(45);
  const [orbitVelocity, setOrbitVelocity] = useState(6.5);
  const [orbitSuccess, setOrbitSuccess] = useState<boolean | null>(null);
  const [roverQueue, setRoverQueue] = useState<string[]>([]);
  const [roverPos, setRoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Math Blitz Questions Generator
  const [mathQuestions] = useState(() => [
    { q: '14 × 7 = ?', opts: ['98', '94', '104', '88'], correct: '98' },
    { q: '144 ÷ 12 = ?', opts: ['11', '12', '14', '16'], correct: '12' },
    { q: '85 + 78 = ?', opts: ['153', '163', '173', '158'], correct: '163' },
    { q: '25% of 240 = ?', opts: ['50', '60', '75', '80'], correct: '60' },
    { q: '9² - 17 = ?', opts: ['64', '72', '81', '54'], correct: '64' },
  ]);

  // 2. Word Match Questions
  const [vocabQuestions] = useState(() => [
    { word: 'Ephemeral', def: 'Lasting for a very short time', opts: ['Lasting for a very short time', 'Extremely large', 'Very difficult', 'Ancient'] },
    { word: 'Pragmatic', def: 'Dealing with things sensibly and realistically', opts: ['Dealing with things sensibly and realistically', 'Full of emotion', 'Completely random', 'Poetic'] },
    { word: 'Ubiquitous', def: 'Present, appearing, or found everywhere', opts: ['Present, appearing, or found everywhere', 'Extremely rare', 'Dangerous', 'Invisible'] },
    { word: 'Eloquent', def: 'Fluent or persuasive in speaking or writing', opts: ['Fluent or persuasive in speaking or writing', 'Silent and shy', 'Aggressive', 'Confusing'] },
    { word: 'Resilient', def: 'Able to withstand or recover quickly from difficulties', opts: ['Able to withstand or recover quickly from difficulties', 'Fragile', 'Rigid', 'Hesitant'] },
  ]);

  // 3. Periodic Pop
  const [periodicQuestions] = useState(() => [
    { sym: 'Au', name: 'Gold', opts: ['Gold', 'Silver', 'Copper', 'Aluminum'] },
    { sym: 'Fe', name: 'Iron', opts: ['Iron', 'Fluorine', 'Lead', 'Zinc'] },
    { sym: 'Na', name: 'Sodium', opts: ['Sodium', 'Nitrogen', 'Neon', 'Nickel'] },
    { sym: 'K', name: 'Potassium', opts: ['Potassium', 'Krypton', 'Phosphorus', 'Calcium'] },
    { sym: 'Ag', name: 'Silver', opts: ['Silver', 'Gold', 'Argon', 'Arsenic'] },
  ]);

  // 4. Binary target numbers
  const [binaryTargets] = useState([11, 5, 14, 9, 7]);

  // 5. Spanish Flash Fiesta
  const [spanishQuestions] = useState(() => [
    { es: 'La biblioteca', en: 'The library', opts: ['The library', 'The kitchen', 'The bookstore', 'The school'] },
    { es: 'Buenos días', en: 'Good morning', opts: ['Good morning', 'Good night', 'Goodbye', 'See you later'] },
    { es: 'Aprender', en: 'To learn', opts: ['To learn', 'To speak', 'To write', 'To read'] },
    { es: 'Desayuno', en: 'Breakfast', opts: ['Breakfast', 'Dinner', 'Lunch', 'Snack'] },
    { es: 'Izquierda', en: 'Left', opts: ['Left', 'Right', 'Straight', 'Behind'] },
  ]);

  // 6. Syntax Hunter
  const [syntaxQuestions] = useState(() => [
    {
      code: 'def calculate_sum(a, b)\n  return a + b',
      bug: 'Missing colon (:) after function definition',
      opts: ['Missing colon (:) after function definition', 'return statement is invalid', 'b is not defined', 'No error'],
    },
    {
      code: 'const count = 10;\ncount = 20;',
      bug: 'Cannot reassign constant variable (const)',
      opts: ['Cannot reassign constant variable (const)', 'Semicolon missing', 'count must be string', 'No error'],
    },
    {
      code: '<img src="photo.jpg" alt=Ocean Sunset >',
      bug: 'Unquoted attribute value for alt="Ocean Sunset"',
      opts: ['Unquoted attribute value for alt="Ocean Sunset"', 'img tag cannot have src', 'photo.jpg is illegal', 'No error'],
    },
    {
      code: 'for i in range(5)\n  print(i)',
      bug: 'Missing colon (:) at end of for loop statement',
      opts: ['Missing colon (:) at end of for loop statement', 'range(5) is not valid', 'print must be uppercase', 'No error'],
    },
    {
      code: 'let user = { name: "Alex", age: 24\nconsole.log(user);',
      bug: 'Missing closing curly brace (}) on object literal',
      opts: ['Missing closing curly brace (}) on object literal', 'name must be single quoted', 'console.log error', 'No error'],
    },
  ]);

  // 8. Pythagorean Questions
  const [pythagoreanQuestions] = useState(() => [
    { a: 3, b: 4, c: 5, prompt: 'Leg a = 3m, Leg b = 4m. Missing Hypotenuse c = ?', opts: ['5m', '6m', '7m', '4.5m'] },
    { a: 6, b: 8, c: 10, prompt: 'Leg a = 6m, Leg b = 8m. Missing Hypotenuse c = ?', opts: ['10m', '12m', '14m', '9m'] },
    { a: 5, b: 12, c: 13, prompt: 'Leg a = 5m, Leg b = 12m. Missing Hypotenuse c = ?', opts: ['13m', '15m', '17m', '11m'] },
    { a: 9, b: 12, c: 15, prompt: 'Leg a = 9m, Leg b = 12m. Missing Hypotenuse c = ?', opts: ['15m', '18m', '21m', '14m'] },
    { a: 8, b: 15, c: 17, prompt: 'Leg a = 8m, Leg b = 15m. Missing Hypotenuse c = ?', opts: ['17m', '19m', '23m', '16m'] },
  ]);

  // 9. Speech Sorter Questions
  const [speechQuestions] = useState(() => [
    { word: 'Accelerate', cat: 'Verb', opts: ['Noun', 'Verb', 'Adjective', 'Adverb'] },
    { word: 'Spectacular', cat: 'Adjective', opts: ['Noun', 'Verb', 'Adjective', 'Adverb'] },
    { word: 'Cathedral', cat: 'Noun', opts: ['Noun', 'Verb', 'Adjective', 'Adverb'] },
    { word: 'Swiftly', cat: 'Adverb', opts: ['Noun', 'Verb', 'Adjective', 'Adverb'] },
    { word: 'Hypothesize', cat: 'Verb', opts: ['Noun', 'Verb', 'Adjective', 'Adverb'] },
  ]);

  // 10. Cell Explorer
  const [cellQuestions] = useState(() => [
    { clue: 'Produces ATP chemical energy via cellular respiration (The powerhouse)', ans: 'Mitochondria', opts: ['Mitochondria', 'Nucleus', 'Ribosome', 'Vacuole'] },
    { clue: 'Contains the genetic DNA instructions for the cell (The control center)', ans: 'Nucleus', opts: ['Nucleus', 'Mitochondria', 'Golgi Apparatus', 'Lysosome'] },
    { clue: 'Synthesizes proteins from amino acids using mRNA', ans: 'Ribosome', opts: ['Ribosome', 'Chloroplast', 'Cell Wall', 'Nucleolus'] },
    { clue: 'Carries out photosynthesis to produce glucose in plant cells', ans: 'Chloroplast', opts: ['Chloroplast', 'Ribosome', 'Centriole', 'Mitochondria'] },
    { clue: 'Stores water, nutrients, and waste products to maintain turgor pressure', ans: 'Vacuole', opts: ['Vacuole', 'Endoplasmic Reticulum', 'Nucleus', 'Ribosome'] },
  ]);

  // 12. Equation Balancer
  const [equationQuestions] = useState(() => [
    { eq: '2x + 6 = 18', ans: '6', opts: ['6', '4', '8', '12'] },
    { eq: '3x - 5 = 16', ans: '7', opts: ['7', '5', '8', '9'] },
    { eq: '5x + 10 = 35', ans: '5', opts: ['5', '7', '4', '6'] },
    { eq: '4x - 12 = 20', ans: '8', opts: ['8', '6', '10', '7'] },
    { eq: '6x + 8 = 50', ans: '7', opts: ['7', '8', '6', '9'] },
  ]);

  // 13. Spelling Bee
  const [spellingQuestions] = useState(() => [
    { meaning: 'To provide lodging or make adjustments for', correct: 'Accommodate', opts: ['Accommodate', 'Acommodate', 'Accomodate', 'Acomodate'] },
    { meaning: 'Essential; needed to be done', correct: 'Necessary', opts: ['Necessary', 'Neccessary', 'Necesary', 'Nessesary'] },
    { meaning: 'A patterned sequence of sounds or movements', correct: 'Rhythm', opts: ['Rhythm', 'Rythm', 'Rhythym', 'Rhithm'] },
    { meaning: 'To cause someone to feel self-conscious or awkward', correct: 'Embarrass', opts: ['Embarrass', 'Embaras', 'Embarass', 'Emberass'] },
    { meaning: 'Occurring or done at once', correct: 'Immediately', opts: ['Immediately', 'Imediately', 'Immediatly', 'Immedately'] },
  ]);

  // 14. World Capitals
  const [capitalQuestions] = useState(() => [
    { country: 'Japan', capital: 'Tokyo', opts: ['Tokyo', 'Kyoto', 'Osaka', 'Seoul'] },
    { country: 'Kenya', capital: 'Nairobi', opts: ['Nairobi', 'Mombasa', 'Cairo', 'Lagos'] },
    { country: 'France', capital: 'Paris', opts: ['Paris', 'Marseille', 'Lyon', 'Brussels'] },
    { country: 'Australia', capital: 'Canberra', opts: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'] },
    { country: 'Brazil', capital: 'Brasília', opts: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Buenos Aires'] },
  ]);

  // 15. Space Defender
  const [spaceQuestions] = useState(() => [
    { debris: 'Mass: 500kg, Velocity: 4 km/s. Required impulse deflection force:', correct: '2,000 kN', opts: ['2,000 kN', '1,200 kN', '500 kN', '4,500 kN'] },
    { debris: 'Mass: 800kg, Velocity: 5 km/s. Required impulse deflection force:', correct: '4,000 kN', opts: ['4,000 kN', '3,200 kN', '1,600 kN', '8,000 kN'] },
    { debris: 'Mass: 1,200kg, Velocity: 3 km/s. Required impulse deflection force:', correct: '3,600 kN', opts: ['3,600 kN', '2,400 kN', '4,800 kN', '1,200 kN'] },
    { debris: 'Mass: 600kg, Velocity: 6 km/s. Required impulse deflection force:', correct: '3,600 kN', opts: ['3,600 kN', '1,800 kN', '2,400 kN', '4,200 kN'] },
    { debris: 'Mass: 1,000kg, Velocity: 7 km/s. Required impulse deflection force:', correct: '7,000 kN', opts: ['7,000 kN', '5,000 kN', '3,500 kN', '10,000 kN'] },
  ]);

  // Universal countdown timer
  useEffect(() => {
    if (isGameOver || gameResult) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsGameOver(true);
          onFinish(score, 5);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver, gameResult, score]);

  // Handle standard option selection
  const handleAnswerChoice = (selected: string, correct: string) => {
    if (selected === correct) {
      playChime('correct');
      const newScore = score + 1;
      setScore(newScore);
      setStreak((s) => s + 1);

      if (currentRound + 1 >= 5) {
        setIsGameOver(true);
        onFinish(newScore, 5);
      } else {
        setCurrentRound((r) => r + 1);
      }
    } else {
      playChime('wrong');
      setStreak(0);
      if (currentRound + 1 >= 5) {
        setIsGameOver(true);
        onFinish(score, 5);
      } else {
        setCurrentRound((r) => r + 1);
      }
    }
  };

  // Binary Switch Toggle
  const handleToggleBinaryBit = (bitIndex: number) => {
    const next = [...binaryBits];
    next[bitIndex] = next[bitIndex] === 1 ? 0 : 1;
    setBinaryBits(next);

    const values = [8, 4, 2, 1];
    const currentSum = next.reduce((acc, bit, idx) => acc + bit * values[idx], 0);
    const target = binaryTargets[currentRound % binaryTargets.length];

    if (currentSum === target) {
      playChime('correct');
      const newScore = score + 1;
      setScore(newScore);
      setBinaryBits([0, 0, 0, 0]);

      if (currentRound + 1 >= 5) {
        setIsGameOver(true);
        onFinish(newScore, 5);
      } else {
        setCurrentRound((r) => r + 1);
      }
    }
  };

  // Gravity Orbit Slingshot Launch
  const handleTestOrbit = () => {
    // Ideal sweet spot: angle between 40-50, velocity between 6.0-7.5
    const isSuccess = orbitAngle >= 38 && orbitAngle <= 52 && orbitVelocity >= 5.8 && orbitVelocity <= 7.4;
    setOrbitSuccess(isSuccess);

    if (isSuccess) {
      playChime('correct');
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(() => {
        setOrbitSuccess(null);
        if (currentRound + 1 >= 5) {
          setIsGameOver(true);
          onFinish(newScore, 5);
        } else {
          setCurrentRound((r) => r + 1);
        }
      }, 1200);
    } else {
      playChime('wrong');
      setTimeout(() => {
        setOrbitSuccess(null);
      }, 1200);
    }
  };

  // Algorithm Maze Queue
  const handleAddRoverCmd = (cmd: string) => {
    if (roverQueue.length < 6) {
      setRoverQueue([...roverQueue, cmd]);
    }
  };

  const handleRunRover = () => {
    // Simple verification: Need at least 2 FORWARD and 1 RIGHT or valid path
    const valid = roverQueue.filter((c) => c === 'FORWARD').length >= 2;
    if (valid) {
      playChime('correct');
      const newScore = score + 1;
      setScore(newScore);
      setRoverQueue([]);
      if (currentRound + 1 >= 5) {
        setIsGameOver(true);
        onFinish(newScore, 5);
      } else {
        setCurrentRound((r) => r + 1);
      }
    } else {
      playChime('wrong');
      setRoverQueue([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Game Topbar */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${game.color} text-white flex items-center justify-between`}>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
              {game.subjectName} • Round {Math.min(currentRound + 1, 5)}/5
            </span>
            <h2 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif]">{game.title}</h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-xl text-xs font-mono font-bold">
              <span>⏱️ {timeLeft}s</span>
            </div>
            <div className="flex items-center space-x-1 bg-amber-400 text-slate-950 px-3 py-1 rounded-xl text-xs font-bold font-mono">
              <Trophy className="w-3.5 h-3.5" />
              <span>Score: {score}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Game Stage / Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-center">
          {gameResult ? (
            /* Results Screen */
            <div className="text-center space-y-6 py-4">
              <div
                className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center ${
                  gameResult.won ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {gameResult.won ? <Trophy className="w-10 h-10 animate-bounce" /> : <RotateCcw className="w-10 h-10" />}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black font-['Outfit',sans-serif] text-slate-900">
                  {gameResult.won ? '🎉 Magnificent Triumph!' : 'Good Effort! Try Again!'}
                </h3>
                <p className="text-sm text-slate-600">
                  You scored <strong className="text-slate-900 font-bold">{gameResult.score} / {gameResult.maxScore}</strong> on {game.title}.
                </p>
              </div>

              {/* Rewards Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 max-w-sm mx-auto flex items-center justify-around text-center">
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase block">Earned Coins</span>
                  <span className="text-xl font-black text-amber-600 font-mono">+{gameResult.earnedCoins} 🪙</span>
                </div>
                <div className="h-8 w-px bg-amber-200" />
                <div>
                  <span className="text-[10px] font-bold text-indigo-800 uppercase block">Earned XP</span>
                  <span className="text-xl font-black text-indigo-600 font-mono">+{gameResult.earnedXp} XP</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                {userCoins >= game.coinCost ? (
                  <button
                    onClick={onPlayAgain}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition shadow-sm flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again (10 Coins)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToTopics();
                    }}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs transition shadow-sm flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Topics to Earn 20 Coins</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
                >
                  Back to Arcade
                </button>
              </div>
            </div>
          ) : (
            /* Active Game Playboard */
            <div className="space-y-6">
              {/* 1. Math Blitz */}
              {game.id === 'math-blitz' && (
                <div className="space-y-6 text-center">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Solve Arithmetic</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                      {mathQuestions[currentRound]?.q}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {mathQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, mathQuestions[currentRound].correct)}
                        className="py-4 px-6 rounded-2xl bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-500 font-black text-lg text-slate-900 transition shadow-xs"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Word Match */}
              {game.id === 'word-match' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">Vocabulary Word</span>
                    <h3 className="text-2xl font-black text-emerald-950 font-serif">
                      "{vocabQuestions[currentRound]?.word}"
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {vocabQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, vocabQuestions[currentRound].def)}
                        className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-500 text-xs sm:text-sm font-semibold text-slate-800 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Periodic Pop */}
              {game.id === 'periodic-pop' && (
                <div className="space-y-5 text-center">
                  <div className="w-24 h-24 rounded-3xl bg-cyan-600 text-white mx-auto flex flex-col items-center justify-center shadow-lg border-2 border-cyan-400">
                    <span className="text-3xl font-black font-mono">{periodicQuestions[currentRound]?.sym}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider">Element</span>
                  </div>
                  <p className="text-xs text-slate-500">Tap the element that corresponds to symbol {periodicQuestions[currentRound]?.sym}:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {periodicQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, periodicQuestions[currentRound].name)}
                        className="py-3.5 px-4 rounded-2xl bg-white hover:bg-cyan-50 border border-slate-200 hover:border-cyan-500 font-bold text-sm text-slate-800 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Binary Code Breaker */}
              {game.id === 'binary-breaker' && (
                <div className="space-y-6 text-center">
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">Target Decimal Number</span>
                    <span className="text-4xl font-black text-purple-950 font-mono">
                      {binaryTargets[currentRound % binaryTargets.length]}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {[8, 4, 2, 1].map((weight, idx) => (
                      <button
                        key={weight}
                        onClick={() => handleToggleBinaryBit(idx)}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                          binaryBits[idx] === 1
                            ? 'bg-purple-600 border-purple-700 text-white shadow-md'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-purple-300'
                        }`}
                      >
                        <span className="text-xs font-bold opacity-75">Bit ({weight})</span>
                        <span className="text-3xl font-black font-mono mt-1">{binaryBits[idx]}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Current sum: <strong className="font-mono text-purple-700">{binaryBits.reduce((acc, b, i) => acc + b * [8, 4, 2, 1][i], 0)}</strong>. Flip bits until sum equals target!
                  </p>
                </div>
              )}

              {/* 5. Spanish Flash Fiesta */}
              {game.id === 'spanish-fiesta' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 text-center">
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-widest block mb-1">Español</span>
                    <h3 className="text-2xl font-black text-rose-950">
                      "{spanishQuestions[currentRound]?.es}"
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {spanishQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, spanishQuestions[currentRound].en)}
                        className="p-3.5 rounded-2xl bg-white hover:bg-rose-50/70 border border-slate-200 hover:border-rose-500 font-bold text-xs sm:text-sm text-slate-800 transition text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Syntax Hunter */}
              {game.id === 'syntax-hunter' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
                    <pre>{syntaxQuestions[currentRound]?.code}</pre>
                  </div>
                  <span className="text-xs font-bold text-slate-600 block">Identify the bug in this code:</span>
                  <div className="space-y-2">
                    {syntaxQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, syntaxQuestions[currentRound].bug)}
                        className="w-full text-left p-3 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-400 text-xs font-medium text-slate-800 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Gravity Satellite Slingshot */}
              {game.id === 'gravity-orbit' && (
                <div className="space-y-5">
                  <div className="h-32 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center text-white text-[10px] font-bold">
                      Earth
                    </div>
                    {/* Target Orbit Ring */}
                    <div className="absolute w-24 h-24 rounded-full border-2 border-dashed border-emerald-400 pointer-events-none animate-spin" />
                    {orbitSuccess !== null && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm">
                        {orbitSuccess ? '✅ Stable Orbit Locked!' : '❌ Trajectory Collided! Tune Angle & Speed.'}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Angle: {orbitAngle}°
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={orbitAngle}
                        onChange={(e) => setOrbitAngle(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Velocity: {orbitVelocity} km/s
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="10"
                        step="0.1"
                        value={orbitVelocity}
                        onChange={(e) => setOrbitVelocity(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleTestOrbit}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-xs transition shadow-sm"
                  >
                    🚀 Slingshot Satellite
                  </button>
                </div>
              )}

              {/* 8. Pythagorean Builder */}
              {game.id === 'pythagorean-builder' && (
                <div className="space-y-5 text-center">
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">Pythagorean Equation</span>
                    <h3 className="text-base sm:text-lg font-bold text-amber-950 font-mono">
                      {pythagoreanQuestions[currentRound]?.prompt}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {pythagoreanQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, `${pythagoreanQuestions[currentRound].c}m`)}
                        className="py-3.5 px-4 rounded-2xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-500 font-bold text-sm text-slate-800 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. Speech Sorter */}
              {game.id === 'speech-sorter' && (
                <div className="space-y-5 text-center">
                  <div className="p-5 rounded-3xl bg-teal-50 border border-teal-200">
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block mb-1">Classify Word</span>
                    <h3 className="text-3xl font-black text-teal-950 font-serif">
                      "{speechQuestions[currentRound]?.word}"
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {speechQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, speechQuestions[currentRound].cat)}
                        className="py-3.5 rounded-2xl bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-500 font-bold text-sm text-slate-800 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. Cell Explorer */}
              {game.id === 'cell-explorer' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Organelle Role</span>
                    <p className="text-sm font-semibold text-blue-950">
                      {cellQuestions[currentRound]?.clue}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {cellQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, cellQuestions[currentRound].ans)}
                        className="p-3.5 rounded-2xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-500 font-bold text-xs sm:text-sm text-slate-800 transition text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. Algorithm Maze */}
              {game.id === 'algo-maze' && (
                <div className="space-y-4 text-center">
                  <div className="p-3 bg-slate-900 rounded-2xl text-white font-mono text-xs flex justify-around">
                    <span>Rover: (0,0) 🤖</span>
                    <span>Crystal: (2,2) 💎</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => handleAddRoverCmd('FORWARD')}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold"
                    >
                      + FORWARD
                    </button>
                    <button
                      onClick={() => handleAddRoverCmd('TURN_RIGHT')}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold"
                    >
                      + TURN_RIGHT
                    </button>
                    <button
                      onClick={() => handleAddRoverCmd('TURN_LEFT')}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold"
                    >
                      + TURN_LEFT
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 border rounded-xl text-xs font-mono text-slate-600 min-h-[32px]">
                    Queue: {roverQueue.join(' ➔ ') || '(empty queue)'}
                  </div>
                  <button
                    onClick={handleRunRover}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs"
                  >
                    ▶ RUN PROGRAM
                  </button>
                </div>
              )}

              {/* 12. Equation Balancer */}
              {game.id === 'equation-balancer' && (
                <div className="space-y-5 text-center">
                  <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200">
                    <span className="text-xs font-bold text-orange-800 uppercase tracking-wider block mb-1">Find Value of x</span>
                    <h3 className="text-2xl font-black text-orange-950 font-mono">
                      {equationQuestions[currentRound]?.eq}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {equationQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, equationQuestions[currentRound].ans)}
                        className="py-3.5 px-4 rounded-2xl bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-500 font-bold text-sm text-slate-800 transition"
                      >
                        x = {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 13. Spelling Bee */}
              {game.id === 'spelling-bee' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Definition</span>
                    <p className="text-sm font-semibold text-emerald-950">
                      {spellingQuestions[currentRound]?.meaning}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {spellingQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, spellingQuestions[currentRound].correct)}
                        className="p-3.5 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 font-bold text-xs sm:text-sm text-slate-800 transition text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 14. World Capitals */}
              {game.id === 'world-capitals' && (
                <div className="space-y-5 text-center">
                  <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-1">Capital City of</span>
                    <h3 className="text-2xl font-black text-rose-950">
                      {capitalQuestions[currentRound]?.country}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {capitalQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, capitalQuestions[currentRound].capital)}
                        className="py-3.5 px-4 rounded-2xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-500 font-bold text-sm text-slate-800 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 15. Space Defender */}
              {game.id === 'space-defender' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-indigo-900 text-white border border-indigo-700">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-1">Inbound Debris Vector</span>
                    <p className="text-xs font-mono font-semibold">
                      {spaceQuestions[currentRound]?.debris}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {spaceQuestions[currentRound]?.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerChoice(opt, spaceQuestions[currentRound].correct)}
                        className="p-3.5 rounded-2xl bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-500 font-bold text-xs sm:text-sm text-slate-800 transition text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
