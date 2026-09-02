import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Zap,
  ChevronDown,
  Minimize2,
  Maximize2,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
import { SubjectId } from '../types';
import { streamTutorResponse } from '../utils/aiTutorService';
import { speakText, stopSpeaking, isSpeechSynthesisSupported } from '../utils/voiceAssistant';

interface QuickAIAssistantProps {
  currentSubjectId?: SubjectId | null;
  currentLessonTitle?: string;
  onRecordQuestion?: () => void;
}

interface QuickChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export function QuickAIAssistant({
  currentSubjectId,
  currentLessonTitle,
  onRecordQuestion,
}: QuickAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>(currentSubjectId || 'all');
  const [tone, setTone] = useState<'kids' | 'standard' | 'advanced'>('standard');
  const [isStreaming, setIsStreaming] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<QuickChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "⚡ **Universal AI Polymath Active!**\nAsk any question across **all academic subjects** (Math, Science, Coding, History, Languages) or **real-world topics, career advice, and everyday logic**. I will answer immediately!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update subject focus when parent changes
  useEffect(() => {
    if (currentSubjectId) {
      setSelectedSubject(currentSubjectId);
    }
  }, [currentSubjectId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming, isOpen, isMinimized]);

  // Global hotkey Shift + A or Cmd/Ctrl + J to toggle instant tutor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.shiftKey && (e.key === 'A' || e.key === 'a') && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) ||
          ((e.metaKey || e.ctrlKey) && e.key === 'j')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setIsMinimized(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  const handleSend = async (questionText: string) => {
    const text = questionText.trim();
    if (!text || isStreaming) return;

    onRecordQuestion?.();

    const userMsgId = `user-${Date.now()}`;
    const userMsg: QuickChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const aiMsgId = `ai-${Date.now()}`;
    const aiPlaceholder: QuickChatMessage = {
      id: aiMsgId,
      sender: 'assistant',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg, aiPlaceholder]);
    setInput('');
    setIsStreaming(true);

    await streamTutorResponse({
      question: text,
      subject: selectedSubject !== 'all' ? selectedSubject : undefined,
      tone,
      context: currentLessonTitle,
      onChunk: (_chunk, accumulated) => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: accumulated } : msg))
        );
      },
      onComplete: (fullText) => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: fullText } : msg))
        );
        setIsStreaming(false);
      },
      onError: (errMsg) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId
              ? { ...msg, text: `⚠️ ${errMsg || 'Could not fetch explanation. Please try again.'}` }
              : msg
          )
        );
        setIsStreaming(false);
      },
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string) => {
    if (!isSpeechSynthesisSupported()) return;

    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }

    stopSpeaking();
    const cleanText = text.replace(/[*#`_]/g, '');
    speakText(cleanText, {
      onStart: () => setSpeakingId(id),
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null),
    });
  };

  // Instant contextual question chips
  const contextualPrompts = currentLessonTitle
    ? [
        `Explain "${currentLessonTitle}" in simple terms`,
        `Give me a real-world example of this concept`,
        `What are 2 common mistakes to avoid here?`,
      ]
    : [
        '📐 Solve 2x^2 + 5x - 3 = 0',
        '🔬 How does CRISPR gene editing work?',
        '💻 Python function to reverse a string',
        '🌍 What caused World War I?',
        '💡 How do planes fly?',
        '🧠 4 habits for high focus',
      ];

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 left-6 z-40"
        >
          <button
            id="quick-ai-floating-trigger"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="flex items-center space-x-2.5 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg border border-indigo-500/50 transition-all duration-200 group"
            title="Press Shift + A to toggle Instant AI Tutor"
          >
            <div className="p-1 rounded-lg bg-white/20 text-white animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <span>Instant AI Assistant</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-indigo-800 text-[10px] font-mono text-indigo-200">
              Shift+A
            </span>
          </button>
        </motion.div>
      )}

      {/* Floating Interactive AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '560px',
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[420px] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden font-sans ${
              isMinimized ? 'max-h-[70px]' : 'max-h-[85vh]'
            }`}
          >
            {/* Header */}
            <div className="p-4 bg-indigo-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-xl bg-white/20 text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-bold font-['Outfit',sans-serif]">Instant AI Tutor</span>
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold">
                      <Zap className="w-2.5 h-2.5 mr-0.5" /> 0-Wait
                    </span>
                  </div>
                  {currentLessonTitle ? (
                    <p className="text-[11px] text-indigo-200 truncate max-w-[200px]">
                      Context: {currentLessonTitle}
                    </p>
                  ) : (
                    <p className="text-[11px] text-indigo-200">
                      Active on {selectedSubject === 'all' ? 'All Subjects' : selectedSubject.replace('-', ' ')}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg text-indigo-100 hover:bg-white/10 transition"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-lg text-indigo-100 hover:bg-white/10 transition"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Assistant Body (Collapsible) */}
            {!isMinimized && (
              <>
                {/* Subject & Tone Filters */}
                <div className="p-2.5 px-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Tone:</span>
                    {(['kids', 'standard', 'advanced'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize transition ${
                          tone === t
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t === 'kids' ? 'Simple' : t === 'standard' ? 'Standard' : 'Deep'}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setMessages([
                        {
                          id: 'reset',
                          sender: 'assistant',
                          text: '⚡ Instant AI Tutor reset. What would you like to explore next?',
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        },
                      ]);
                    }}
                    className="flex items-center space-x-1 text-[11px] text-slate-500 hover:text-slate-900 transition font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>

                {/* Instant Prompt Starters */}
                <div className="p-2 px-3 bg-white border-b border-slate-100 flex items-center space-x-1.5 overflow-x-auto shrink-0 no-scrollbar">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500" />
                    Ask:
                  </span>
                  {contextualPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      disabled={isStreaming}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 text-slate-700 whitespace-nowrap transition shrink-0 font-medium disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm">
                  {messages.map((msg) => {
                    const isAi = msg.sender === 'assistant';

                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                      >
                        {isAi && (
                          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-2xl p-3 space-y-1.5 leading-relaxed ${
                            isAi
                              ? 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
                              : 'bg-indigo-600 text-white rounded-tr-none shadow-xs'
                          }`}
                        >
                          <div className="whitespace-pre-line font-normal text-xs sm:text-sm">
                            {msg.text || (
                              <span className="inline-flex items-center space-x-1 text-slate-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                                <span className="text-[11px] ml-1">Streaming answer...</span>
                              </span>
                            )}
                          </div>

                          {isAi && msg.text && (
                            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60 text-[10px] text-slate-400">
                              <span>{msg.timestamp}</span>

                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleSpeak(msg.text, msg.id)}
                                  className="hover:text-indigo-600 transition flex items-center gap-1 font-semibold"
                                  title="Read aloud"
                                >
                                  {speakingId === msg.id ? (
                                    <VolumeX className="w-3 h-3 text-rose-500" />
                                  ) : (
                                    <Volume2 className="w-3 h-3" />
                                  )}
                                  <span>{speakingId === msg.id ? 'Stop' : 'Listen'}</span>
                                </button>

                                <button
                                  onClick={() => handleCopy(msg.text, msg.id)}
                                  className="hover:text-indigo-600 transition flex items-center gap-1 font-semibold"
                                  title="Copy answer"
                                >
                                  {copiedId === msg.id ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                  <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="p-3 bg-white border-t border-slate-200 flex gap-2 shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask any question on any subject or real-world topic..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                  <button
                    type="submit"
                    disabled={isStreaming || !input.trim()}
                    className="flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow-xs shrink-0"
                  >
                    <span>Ask</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
