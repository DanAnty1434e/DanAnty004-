import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Bot,
  Zap,
  Clock,
  ArrowRight,
  Send,
  Volume2,
  VolumeX,
  Share2,
  Play,
  Pause,
  RotateCcw,
  Coins,
} from 'lucide-react';
import { Lesson, Subject, UserProgress } from '../types';
import { CodePlayground } from './InteractiveWidgets/CodePlayground';
import { MathGrapher } from './InteractiveWidgets/MathGrapher';
import { LanguageAudioCard } from './InteractiveWidgets/LanguageAudioCard';
import { GrammarBuilderWidget } from './InteractiveWidgets/GrammarBuilderWidget';
import { speakText, stopSpeaking, isSpeechSynthesisSupported } from '../utils/voiceAssistant';
import { streamTutorResponse } from '../utils/aiTutorService';
import { Copy, Check } from 'lucide-react';

interface LessonViewerProps {
  lesson: Lesson;
  subject: Subject;
  progress: UserProgress;
  onBack: () => void;
  onCompleteAndTakeQuiz: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
  onAskAI: (initialQuestion: string, contextTitle: string) => void;
  onInteractWidget?: () => void;
}

export function LessonViewer({
  lesson,
  subject,
  progress,
  onBack,
  onCompleteAndTakeQuiz,
  onToggleBookmark,
  onAskAI,
  onInteractWidget,
}: LessonViewerProps) {
  const [quickQuestion, setQuickQuestion] = useState('');
  const [isNarrating, setIsNarrating] = useState(false);
  const [activeNarratingSection, setActiveNarratingSection] = useState<number | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  // In-Lesson Instant AI Q&A Streaming State
  const [inLessonAnswer, setInLessonAnswer] = useState<string | null>(null);
  const [inLessonStreaming, setInLessonStreaming] = useState(false);
  const [inLessonPrompt, setInLessonPrompt] = useState<string | null>(null);
  const [isSpeakingInLessonAi, setIsSpeakingInLessonAi] = useState(false);
  const [hasCopiedInLessonAi, setHasCopiedInLessonAi] = useState(false);

  const isBookmarked = progress.bookmarks.includes(lesson.id);
  const isCompleted = progress.completedLessons.includes(lesson.id);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [lesson.id]);

  const handleAskQuickAI = async (questionText: string) => {
    const text = questionText.trim();
    if (!text || inLessonStreaming) return;

    setInLessonPrompt(text);
    setInLessonAnswer('');
    setInLessonStreaming(true);
    setQuickQuestion('');

    await streamTutorResponse({
      question: text,
      subject: subject.id,
      level: lesson.level,
      context: `${subject.title} - ${lesson.title}`,
      onChunk: (_chunk, accumulated) => {
        setInLessonAnswer(accumulated);
      },
      onComplete: (fullText) => {
        setInLessonAnswer(fullText);
        setInLessonStreaming(false);
      },
      onError: (errMsg) => {
        setInLessonAnswer(`⚠️ ${errMsg || 'Could not fetch explanation. Please try again.'}`);
        setInLessonStreaming(false);
      },
    });
  };

  const handleToggleFullLessonVoice = () => {
    if (isNarrating) {
      stopSpeaking();
      setIsNarrating(false);
      setActiveNarratingSection(null);
    } else {
      const fullLessonText = `${lesson.title}. ${lesson.subtitle}. ${lesson.sections
        .map((s) => `${s.title}. ${s.content}. ${s.keyTakeaway ? `Key takeaway: ${s.keyTakeaway}` : ''}`)
        .join(' ')}`;

      speakText(fullLessonText, {
        rate: speechRate,
        onStart: () => setIsNarrating(true),
        onEnd: () => {
          setIsNarrating(false);
          setActiveNarratingSection(null);
        },
        onError: () => {
          setIsNarrating(false);
          setActiveNarratingSection(null);
        },
      });
    }
  };

  const handleReadSection = (index: number) => {
    if (activeNarratingSection === index && isNarrating) {
      stopSpeaking();
      setIsNarrating(false);
      setActiveNarratingSection(null);
    } else {
      const sec = lesson.sections[index];
      const textToRead = `${sec.title}. ${sec.content}. ${sec.keyTakeaway ? `Key takeaway: ${sec.keyTakeaway}` : ''}`;
      speakText(textToRead, {
        rate: speechRate,
        onStart: () => {
          setIsNarrating(true);
          setActiveNarratingSection(index);
        },
        onEnd: () => {
          setIsNarrating(false);
          setActiveNarratingSection(null);
        },
        onError: () => {
          setIsNarrating(false);
          setActiveNarratingSection(null);
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="max-w-4xl mx-auto space-y-8 pb-16 font-sans"
    >
      {/* Top Breadcrumb & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          id="lesson-back-btn"
          onClick={() => {
            stopSpeaking();
            onBack();
          }}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {subject.title}</span>
        </button>

        <div className="flex items-center space-x-2">
          {/* Voice Assistant Read Aloud Button */}
          {isSpeechSynthesisSupported() && (
            <button
              onClick={handleToggleFullLessonVoice}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                isNarrating && activeNarratingSection === null
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Voice Assistant: Listen to entire lesson"
            >
              {isNarrating && activeNarratingSection === null ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                  <span>Stop Voice Narration</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Listen to Lesson</span>
                </>
              )}
            </button>
          )}

          <button
            id="bookmark-lesson-btn"
            onClick={() => onToggleBookmark(lesson.id)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isBookmarked
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Bookmark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Voice Assistant Animated Floating Status Bar if active */}
      <AnimatePresence>
        {isNarrating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between gap-3 text-xs text-indigo-900 shadow-2xs"
          >
            <div className="flex items-center space-x-2">
              <div className="flex space-x-0.5 items-end h-4">
                <span className="w-1 bg-indigo-600 rounded-full h-3 animate-bounce" />
                <span className="w-1 bg-indigo-600 rounded-full h-4 animate-bounce [animation-delay:0.15s]" />
                <span className="w-1 bg-indigo-600 rounded-full h-2 animate-bounce [animation-delay:0.3s]" />
              </div>
              <span className="font-bold">
                Voice Assistant Active:{' '}
                <span className="font-normal text-indigo-800">
                  {activeNarratingSection !== null
                    ? `Reading Section ${activeNarratingSection + 1}`
                    : 'Reading Full Interactive Lesson'}
                </span>
              </span>
            </div>

            <button
              onClick={() => {
                stopSpeaking();
                setIsNarrating(false);
                setActiveNarratingSection(null);
              }}
              className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg font-bold text-[11px] hover:bg-indigo-700 transition"
            >
              Stop Audio
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lesson Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
            {lesson.level} level
          </span>
          <span className="flex items-center space-x-1 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.durationMinutes} min read & practice</span>
          </span>
          <span className="flex items-center space-x-1 text-xs text-amber-600 font-bold">
            <Zap className="w-3.5 h-3.5 fill-amber-500" />
            <span>+{lesson.xpReward} XP</span>
          </span>
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100/80 text-amber-800 border border-amber-300">
            <Coins className="w-3 h-3 text-amber-600" />
            <span>+20 Coins on Read/Completion</span>
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" /> Completed
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
          {lesson.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {lesson.subtitle}
        </p>
      </div>

      {/* Lesson Sections */}
      <div className="space-y-8">
        {lesson.sections.map((section, idx) => {
          const isSectionPlaying = activeNarratingSection === idx && isNarrating;

          return (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-3xl bg-white border p-6 sm:p-8 shadow-xs space-y-5 transition-all ${
                isSectionPlaying ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {section.title}
                </h2>

                {isSpeechSynthesisSupported() && (
                  <button
                    onClick={() => handleReadSection(idx)}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                      isSectionPlaying
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                    }`}
                    title="Voice Assistant: Read this section"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline text-[11px]">
                      {isSectionPlaying ? 'Speaking' : 'Read Section'}
                    </span>
                  </button>
                )}
              </div>

              <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 whitespace-pre-line font-normal">
                {section.content}
              </div>

              {/* Interactive Widget Rendering */}
              {section.interactiveWidget && (
                <div
                  className="pt-2"
                  onClick={() => onInteractWidget?.()}
                >
                  {section.interactiveWidget.type === 'code-playground' && (
                    <CodePlayground
                      initialCode={section.interactiveWidget.data.initialCode}
                      title={section.interactiveWidget.title}
                      description={section.interactiveWidget.description}
                    />
                  )}

                  {section.interactiveWidget.type === 'math-grapher' && (
                    <MathGrapher
                      initialSlope={section.interactiveWidget.data.initialSlope}
                      initialIntercept={section.interactiveWidget.data.initialIntercept}
                      title={section.interactiveWidget.title}
                      description={section.interactiveWidget.description}
                    />
                  )}

                  {section.interactiveWidget.type === 'language-audio' && (
                    <LanguageAudioCard
                      cards={section.interactiveWidget.data.cards}
                      title={section.interactiveWidget.title}
                      description={section.interactiveWidget.description}
                    />
                  )}

                  {section.interactiveWidget.type === 'grammar-builder' && (
                    <GrammarBuilderWidget
                      data={section.interactiveWidget.data}
                      title={section.interactiveWidget.title}
                      description={section.interactiveWidget.description}
                    />
                  )}
                </div>
              )}

              {/* Key Takeaway Callout */}
              {section.keyTakeaway && (
                <div className="p-4 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Key Takeaway</span>
                    <p className="text-xs sm:text-sm text-emerald-800 font-medium leading-normal">
                      {section.keyTakeaway}
                    </p>
                  </div>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>

      {/* In-Lesson Quick AI Q&A Bar */}
      <div className="rounded-3xl bg-indigo-600 text-white p-6 sm:p-8 shadow-sm space-y-4 relative overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-indigo-500 rounded-full opacity-40 pointer-events-none" />

        <div className="relative z-10 flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-white/20 text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
              Have a question about this lesson?
            </h3>
            <p className="text-xs text-indigo-100">
              Ask DanAnty AI for a step-by-step explanation or extra interactive example (+10 XP).
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskQuickAI(quickQuestion);
          }}
          className="relative z-10 flex gap-2"
        >
          <input
            id="quick-ai-question-input"
            type="text"
            value={quickQuestion}
            onChange={(e) => setQuickQuestion(e.target.value)}
            placeholder={`Ask any doubt about ${lesson.title}...`}
            className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-indigo-200 text-xs sm:text-sm focus:outline-none focus:bg-white/20 transition-colors"
          />
          <button
            id="submit-quick-ai-btn"
            type="submit"
            disabled={inLessonStreaming || !quickQuestion.trim()}
            className="flex items-center space-x-1.5 px-5 py-3 bg-white text-indigo-600 hover:bg-indigo-50 font-bold text-xs sm:text-sm rounded-2xl transition-colors shadow-sm shrink-0 disabled:opacity-50"
          >
            <span>{inLessonStreaming ? 'Thinking...' : 'Ask Instant'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="relative z-10 flex flex-wrap gap-2 text-[11px] text-indigo-100 items-center">
          <span className="font-semibold text-white">Suggested:</span>
          <button
            type="button"
            onClick={() => handleAskQuickAI(`Explain ${lesson.title} in simple terms with a real-world story`)}
            className="hover:underline text-indigo-100 bg-white/10 px-2 py-0.5 rounded-lg"
          >
            &quot;Explain in simple terms&quot;
          </button>
          <button
            type="button"
            onClick={() => handleAskQuickAI(`Give me 2 practical test examples for ${lesson.title}`)}
            className="hover:underline text-indigo-100 bg-white/10 px-2 py-0.5 rounded-lg"
          >
            &quot;Give me 2 practical examples&quot;
          </button>
        </div>

        {/* In-Lesson AI Response Box */}
        {(inLessonAnswer !== null || inLessonStreaming) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 p-5 rounded-2xl bg-white text-slate-900 shadow-lg space-y-3 mt-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600">
                <Bot className="w-4 h-4" />
                <span>Instant AI Explanation for: &ldquo;{inLessonPrompt}&rdquo;</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                ⚡ 0-Wait Response
              </span>
            </div>

            <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-800 font-normal">
              {inLessonAnswer || (
                <span className="inline-flex items-center space-x-1 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs ml-1.5 font-medium text-indigo-600">Streaming answer immediately...</span>
                </span>
              )}
            </div>

            {inLessonAnswer && (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      if (!isSpeechSynthesisSupported()) return;
                      if (isSpeakingInLessonAi) {
                        stopSpeaking();
                        setIsSpeakingInLessonAi(false);
                      } else {
                        stopSpeaking();
                        const clean = inLessonAnswer.replace(/[*#`_]/g, '');
                        speakText(clean, {
                          onStart: () => setIsSpeakingInLessonAi(true),
                          onEnd: () => setIsSpeakingInLessonAi(false),
                          onError: () => setIsSpeakingInLessonAi(false),
                        });
                      }
                    }}
                    className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 font-semibold"
                  >
                    {isSpeakingInLessonAi ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeakingInLessonAi ? 'Stop Audio' : 'Listen'}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(inLessonAnswer);
                      setHasCopiedInLessonAi(true);
                      setTimeout(() => setHasCopiedInLessonAi(false), 2000);
                    }}
                    className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 font-semibold"
                  >
                    {hasCopiedInLessonAi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{hasCopiedInLessonAi ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <button
                  onClick={() => onAskAI(inLessonPrompt || '', `${subject.title} - ${lesson.title}`)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                >
                  Continue in Full AI Tutor →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Lesson Footer & Take Quiz CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Ready to test your knowledge?</span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 font-mono">
              <Coins className="w-3 h-3" />
              <span>+20 Coins</span>
            </span>
          </div>
          <h4 className="text-lg font-bold text-white font-['Outfit',sans-serif]">Lesson Assessment & Interactive Quiz</h4>
        </div>

        <button
          id="take-lesson-quiz-btn"
          onClick={() => {
            stopSpeaking();
            onCompleteAndTakeQuiz(lesson.id);
          }}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
        >
          <span>Complete & Take Quiz (+20 🪙)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

