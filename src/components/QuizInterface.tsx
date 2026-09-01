import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Trophy,
  ArrowRight,
  Bot,
  Zap,
  Lightbulb,
  Award,
  Volume2,
  VolumeX,
  Clock,
  Flame,
} from 'lucide-react';
import { Lesson, QuizAttempt, UserProgress } from '../types';
import { speakText, stopSpeaking, isSpeechSynthesisSupported, playChimeSound } from '../utils/voiceAssistant';

interface QuizInterfaceProps {
  lesson: Lesson;
  progress: UserProgress;
  onFinishQuiz: (attempt: QuizAttempt) => void;
  onBackToLesson: () => void;
  onOpenAITutorWithContext: (questionContext: string) => void;
}

export function QuizInterface({
  lesson,
  progress,
  onFinishQuiz,
  onBackToLesson,
  onOpenAITutorWithContext,
}: QuizInterfaceProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<Record<number, string>>({});
  const [loadingAiFeedback, setLoadingAiFeedback] = useState(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);

  // Timer tracking for speed scholar badge
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = lesson.quiz;
  const currentQuestion = questions[currentIdx];

  useEffect(() => {
    if (!isQuizCompleted) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, [isQuizCompleted]);

  const handleSelectOption = (optionIdx: number) => {
    if (hasAnsweredCurrent) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentIdx] = optionIdx;
    setSelectedAnswers(newAnswers);
    setHasAnsweredCurrent(true);

    const isCorrect = optionIdx === currentQuestion.correctIndex;
    if (isCorrect) {
      playChimeSound('correct');
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
      });
    }
  };

  const handleVoiceReadQuestion = () => {
    if (isSpeakingQuestion) {
      stopSpeaking();
      setIsSpeakingQuestion(false);
    } else {
      const optionsText = currentQuestion.options
        .map((opt, i) => `Option ${String.fromCharCode(65 + i)}: ${opt}`)
        .join('. ');
      const speech = `Question ${currentIdx + 1}: ${currentQuestion.question}. ${optionsText}`;

      speakText(speech, {
        onStart: () => setIsSpeakingQuestion(true),
        onEnd: () => setIsSpeakingQuestion(false),
        onError: () => setIsSpeakingQuestion(false),
      });
    }
  };

  const handleRequestAiExplanation = async () => {
    const selectedIdx = selectedAnswers[currentIdx];
    if (selectedIdx === undefined) return;

    setLoadingAiFeedback(true);
    try {
      const res = await fetch('/api/gemini/quiz-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.question,
          studentAnswer: currentQuestion.options[selectedIdx],
          correctAnswer: currentQuestion.options[currentQuestion.correctIndex],
          explanation: currentQuestion.explanation,
        }),
      });
      const data = await res.json();
      setAiExplanation({
        ...aiExplanation,
        [currentIdx]: data.customFeedback || currentQuestion.explanation,
      });
    } catch (e) {
      setAiExplanation({
        ...aiExplanation,
        [currentIdx]: currentQuestion.explanation,
      });
    } finally {
      setLoadingAiFeedback(false);
    }
  };

  const handleNextQuestion = () => {
    stopSpeaking();
    setIsSpeakingQuestion(false);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setHasAnsweredCurrent(selectedAnswers[currentIdx + 1] !== undefined);
      setShowHint(false);
    } else {
      // Complete quiz
      if (timerRef.current) clearInterval(timerRef.current);

      const correctCount = selectedAnswers.reduce((acc, ans, idx) => {
        return ans === questions[idx].correctIndex ? acc + 1 : acc;
      }, 0);

      const score = Math.round((correctCount / questions.length) * 100);

      const attempt: QuizAttempt = {
        lessonId: lesson.id,
        subjectId: lesson.subjectId,
        score,
        correctCount,
        totalQuestions: questions.length,
        completedAt: new Date().toISOString(),
        durationSeconds: secondsElapsed,
        answers: selectedAnswers.map((ans, idx) => ({
          questionId: questions[idx].id,
          selectedIndex: ans,
          isCorrect: ans === questions[idx].correctIndex,
        })),
      };

      setIsQuizCompleted(true);
      onFinishQuiz(attempt);

      if (score === 100) {
        playChimeSound('level-up');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } else if (score >= 70) {
        playChimeSound('complete');
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    stopSpeaking();
    setSelectedAnswers([]);
    setCurrentIdx(0);
    setHasAnsweredCurrent(false);
    setIsQuizCompleted(false);
    setShowHint(false);
    setAiExplanation({});
    setSecondsElapsed(0);
  };

  // Score summary calculation
  const correctCount = selectedAnswers.reduce((acc, ans, idx) => {
    return ans === questions[idx]?.correctIndex ? acc + 1 : acc;
  }, 0);
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  if (isQuizCompleted) {
    const isSpeedy = secondsElapsed <= 60 && scorePercent >= 80;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto space-y-6 pb-12 font-sans"
      >
        <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center shadow-lg space-y-5">
          <div className="inline-flex p-4 rounded-3xl bg-amber-100 text-amber-600 shadow-inner">
            <Trophy className="w-12 h-12" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {scorePercent >= 80 ? 'Outstanding Mastery!' : scorePercent >= 60 ? 'Well Done!' : 'Good Effort! Keep Practicing'}
            </h2>
            <p className="text-sm text-slate-500">
              Quiz for: <span className="font-semibold text-slate-800">{lesson.title}</span>
            </p>
          </div>

          {/* Score Circle Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center space-y-2">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-['Outfit',sans-serif]">
              {scorePercent}%
            </div>
            <div className="text-xs font-semibold text-slate-600">
              {correctCount} of {questions.length} questions answered correctly in {secondsElapsed}s
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                <Zap className="w-3.5 h-3.5 fill-emerald-600" />
                <span>+{Math.round((scorePercent / 100) * 60) + (scorePercent === 100 ? 30 : 10)} XP Earned</span>
              </span>

              {isSpeedy && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>⚡ Rapid Solver Bonus (+15 XP)</span>
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="retake-quiz-btn"
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            <button
              id="return-to-lesson-btn"
              onClick={onBackToLesson}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow"
            >
              <span>Back to Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Question-by-Question Review
          </h3>
          {questions.map((q, idx) => {
            const studentAns = selectedAnswers[idx];
            const isCorrect = studentAns === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border bg-white space-y-3 ${
                  isCorrect ? 'border-emerald-200' : 'border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-slate-500">Question {idx + 1}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isCorrect ? 'Correct' : 'Needs Review'}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  {q.question}
                </p>

                <div className="text-xs space-y-1">
                  <div className="text-slate-600">
                    Your Answer:{' '}
                    <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {studentAns !== undefined ? q.options[studentAns] : 'Not answered'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="text-slate-600">
                      Correct Answer:{' '}
                      <span className="font-semibold text-emerald-700">
                        {q.options[q.correctIndex]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed border border-slate-100">
                  💡 <span className="font-medium text-slate-800">Explanation:</span> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Active Question View
  const selectedForCurrent = selectedAnswers[currentIdx];
  const isCorrectChoice = selectedForCurrent === currentQuestion.correctIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6 pb-16 font-sans"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          id="exit-quiz-btn"
          onClick={() => {
            stopSpeaking();
            onBackToLesson();
          }}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Quiz</span>
        </button>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1 text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{secondsElapsed}s</span>
          </div>

          <span className="text-xs font-mono text-slate-500 font-semibold">
            Question {currentIdx + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              Assess Your Knowledge
            </span>

            <div className="flex items-center space-x-2">
              {isSpeechSynthesisSupported() && (
                <button
                  onClick={handleVoiceReadQuestion}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                    isSpeakingQuestion
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                  title="Voice Assistant: Read question"
                >
                  {isSpeakingQuestion ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">{isSpeakingQuestion ? 'Stop' : 'Read'}</span>
                </button>
              )}

              {currentQuestion.hint && (
                <button
                  id="toggle-hint-btn"
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center space-x-1 text-xs text-amber-700 hover:text-amber-900 font-semibold"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>
              )}
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-['Outfit',sans-serif]">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Hint Box */}
        {showHint && currentQuestion.hint && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Helpful Hint:</span> {currentQuestion.hint}
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedForCurrent === idx;
            const isCorrectAnswer = idx === currentQuestion.correctIndex;

            let optionStyle = 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 text-slate-800';

            if (hasAnsweredCurrent) {
              if (isCorrectAnswer) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold shadow-xs';
              } else if (isSelected && !isCorrectChoice) {
                optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
              } else {
                optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                id={`quiz-option-${idx}`}
                onClick={() => handleSelectOption(idx)}
                disabled={hasAnsweredCurrent}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-150 flex items-center justify-between gap-3 ${optionStyle}`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border ${
                    isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>

                {hasAnsweredCurrent && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {hasAnsweredCurrent && isSelected && !isCorrectChoice && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Feedback Explanation Box */}
        {hasAnsweredCurrent && (
          <div className={`p-5 rounded-2xl border space-y-3 ${
            isCorrectChoice ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
          }`}>
            <div className="flex items-center space-x-2">
              {isCorrectChoice ? (
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct! Spot on analysis.</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-800">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Incorrect. Let&apos;s understand why:</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {aiExplanation[currentIdx] || currentQuestion.explanation}
            </p>

            {/* AI Deep Dive Feedback Button */}
            {!aiExplanation[currentIdx] && (
              <button
                id="ask-ai-quiz-explainer-btn"
                onClick={handleRequestAiExplanation}
                disabled={loadingAiFeedback}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                <span>{loadingAiFeedback ? 'Generating AI explanation...' : 'Ask AI Tutor for deeper explanation'}</span>
              </button>
            )}
          </div>
        )}

        {/* Next Question / Finish Button */}
        {hasAnsweredCurrent && (
          <div className="flex justify-end pt-2">
            <button
              id="next-quiz-question-btn"
              onClick={handleNextQuestion}
              className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs"
            >
              <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'Complete Quiz & View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

