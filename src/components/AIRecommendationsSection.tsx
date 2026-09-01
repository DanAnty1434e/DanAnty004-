import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Compass,
  ArrowRight,
  TrendingUp,
  Brain,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  RefreshCw,
  CheckCircle2,
  Award,
  BookOpen,
  Target,
  Zap,
  Tag,
  GraduationCap,
} from 'lucide-react';
import {
  UserProgress,
  AIRecommendationResponse,
  RecommendationItem,
  SubjectId,
  UserInterestsProfile,
} from '../types';
import { fetchAIRecommendations, generateLocalRecommendations } from '../utils/recommendations';
import { updateUserInterests } from '../utils/storage';
import { speakText, stopSpeaking, isSpeechSynthesisSupported } from '../utils/voiceAssistant';

interface AIRecommendationsSectionProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onUpdateProgress: (updated: UserProgress) => void;
}

const AVAILABLE_INTEREST_TAGS = [
  'Algorithms & Python',
  'Algebra & Calculus',
  'Space & Physics',
  'Cell Biology & Genetics',
  'Chemical Reactions',
  'Spanish Basics',
  'French Grammar',
  'Grammar & Rhetoric',
  'Creative Writing',
  'Web Development & Code',
];

const LEARNING_GOALS: { id: UserInterestsProfile['learningGoal']; label: string; desc: string }[] = [
  { id: 'career-skills', label: 'Career & Tech Skills', desc: 'Focus on coding, data logic, and analytical problem solving.' },
  { id: 'exam-prep', label: 'Academic & Exam Prep', desc: 'Reinforce curriculum benchmarks, test accuracy, and formula mastery.' },
  { id: 'language-fluency', label: 'Language & Communication', desc: 'Build conversational vocabulary, grammar mechanics, and phonetics.' },
  { id: 'curiosity', label: 'Broad Curiosity', desc: 'Balanced multi-disciplinary exploration across all 5 subject fields.' },
];

export function AIRecommendationsSection({
  progress,
  onSelectLesson,
  onUpdateProgress,
}: AIRecommendationsSectionProps) {
  const [data, setData] = useState<AIRecommendationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  // Editable preferences draft state
  const [selectedTags, setSelectedTags] = useState<string[]>(
    progress.interestsProfile?.selectedTags || AVAILABLE_INTEREST_TAGS.slice(0, 4)
  );
  const [selectedGoal, setSelectedGoal] = useState<UserInterestsProfile['learningGoal']>(
    progress.interestsProfile?.learningGoal || 'career-skills'
  );

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const result = await fetchAIRecommendations(progress);
      setData(result);
    } catch (e) {
      setData(generateLocalRecommendations(progress));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [progress.completedLessons.length, Object.keys(progress.quizAttempts).length]);

  const handleSavePreferences = () => {
    const updatedProfile: UserInterestsProfile = {
      selectedTags,
      learningGoal: selectedGoal,
      favoriteSubjects: progress.interestsProfile?.favoriteSubjects || ['computer-studies', 'mathematics'],
    };
    const updated = updateUserInterests(progress, updatedProfile);
    onUpdateProgress(updated);
    setIsEditingPreferences(false);
    loadRecommendations();
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      if (selectedTags.length > 1) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      }
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleToggleVoiceNarration = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (data) {
      const speechScript = `DanAnty AI Learning Path update. ${data.personalizedSummary} Our top recommendation for you is ${data.primaryRecommendation.title}. ${data.primaryRecommendation.reason} Daily coaching tip: ${data.motivationalTip}`;
      speakText(speechScript, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  const primary = data?.primaryRecommendation;

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Learning Path & Recommendations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Personalized Next-Best Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Intelligently adapted to your quiz performance, level progression, and chosen academic goals.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {isSpeechSynthesisSupported() && (
            <button
              onClick={handleToggleVoiceNarration}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all ${
                isSpeaking
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title="Voice Assistant: Read recommendations aloud"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline">Pause Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Voice Briefing</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => setIsEditingPreferences(!isEditingPreferences)}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Custom Goals</span>
          </button>

          <button
            onClick={loadRecommendations}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition disabled:opacity-50"
            title="Refresh Recommendations"
          >
            <RefreshCw className={`w-4 h-4 text-slate-600 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Preferences Customizer Drawer */}
      <AnimatePresence>
        {isEditingPreferences && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                Customize Learning Focus & Interests
              </h3>
              <span className="text-[11px] text-slate-500">AI adjusts real-time curriculum suggestions</span>
            </div>

            {/* Goals */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Primary Learning Objective
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LEARNING_GOALS.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedGoal === goal.id
                        ? 'bg-white border-indigo-600 shadow-xs ring-1 ring-indigo-600'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{goal.label}</div>
                    <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{goal.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Favorite Topics & Subject Focus (Click to toggle)
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_INTEREST_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-bold shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200/80">
              <button
                onClick={() => setIsEditingPreferences(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs"
              >
                Apply & Update Recommendations
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Personalized Trajectory Summary Pill */}
      {data && (
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100/80 flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-xs font-bold text-indigo-900">
              AI Student Trajectory Analysis
            </div>
            <p className="text-xs text-indigo-950/80 leading-relaxed">
              {data.personalizedSummary}
            </p>
            <div className="text-[11px] font-medium text-indigo-700 italic pt-1">
              "{data.motivationalTip}"
            </div>
          </div>
        </div>
      )}

      {/* Primary Recommendation Showcase Card */}
      {primary && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-linear-to-br from-slate-900 to-indigo-950 text-white space-y-4 shadow-md relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-bold tracking-wide">
              <Compass className="w-3.5 h-3.5 text-indigo-300" />
              <span>#1 Recommended Next Lesson</span>
            </div>

            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <span className="flex items-center gap-1 font-mono font-bold text-amber-400">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                +{primary.estimatedXp} XP
              </span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full font-semibold">
                {primary.confidenceScore}% AI Confidence
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold font-['Outfit',sans-serif] text-white">
              {primary.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {primary.reason}
            </p>
          </div>

          {/* Tags & Badge potential */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-1.5">
              {primary.matchTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/10 text-white/90 text-[11px] font-medium"
                >
                  #{tag}
                </span>
              ))}
              {primary.badgePotential && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold">
                  <Award className="w-3 h-3" />
                  Unlocks: {primary.badgePotential}
                </span>
              )}
            </div>

            <button
              onClick={() => onSelectLesson(primary.lessonId)}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Recommended Lesson</span>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Secondary Recommendations (Weak-spot remedy, interest matches, new horizons) */}
      {data && data.recommendations.length > 1 && (
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider text-[10px]">
              Alternative Guided Pathways
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">Curated by AI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {data.recommendations
              .filter((r) => r.lessonId !== primary?.lessonId)
              .slice(0, 3)
              .map((rec) => {
                const isWeakSpot = rec.type === 'weak-spot-remedy';
                const isInterest = rec.type === 'interest-match';

                return (
                  <motion.div
                    key={rec.id}
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 flex flex-col justify-between space-y-3 transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isWeakSpot
                              ? 'bg-amber-100 text-amber-800'
                              : isInterest
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {isWeakSpot
                            ? 'Concept Reinforcement'
                            : isInterest
                            ? 'Interest Alignment'
                            : 'New Exploration'}
                        </span>
                        <span className="text-[11px] font-bold text-slate-600 font-mono">
                          +{rec.estimatedXp} XP
                        </span>
                      </div>

                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                        {rec.title}
                      </h5>

                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-3">
                        {rec.reason}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectLesson(rec.lessonId)}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-2xs"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
                    </button>
                  </motion.div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
