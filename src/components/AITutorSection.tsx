import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Calculator,
  FlaskConical,
  Code2,
  Languages,
  User,
  Lightbulb,
  Zap,
  Signal,
  WifiOff,
} from 'lucide-react';
import { SubjectId, ChatMessage, NetworkStatus } from '../types';
import { streamTutorResponse } from '../utils/aiTutorService';
import { getLiveNetworkStatus } from '../utils/networkManager';

interface AITutorSectionProps {
  initialSubject?: SubjectId | null;
  initialQuestion?: string;
  contextLessonTitle?: string;
  onClearInitialContext?: () => void;
  onOpenMathSolver?: () => void;
}


const PRESET_PROMPTS = [
  { label: '📐 Solve Equation (Quadratic)', prompt: 'Solve 2x^2 + 7x + 3 = 0 showing the exact quadratic formula method, steps, and final roots.', subject: 'mathematics' as SubjectId },
  { label: '🔬 Science: Photosynthesis', prompt: 'Why do plant leaves look green, and what is the chemical formula for photosynthesis?', subject: 'science' as SubjectId },
  { label: '💻 Coding: Python Loop & List', prompt: 'Show me how to write a Python script that filters and sorts a list of student exam scores.', subject: 'computer-studies' as SubjectId },
  { label: '🌍 History: Industrial Revolution', prompt: 'What were the main causes and global impacts of the Industrial Revolution?', subject: 'all' as const },
  { label: '💡 Real-World: How Planes Fly', prompt: 'Explain the physics and aerodynamics of how airplanes stay in the air with lift and thrust.', subject: 'all' as const },
  { label: '🧠 Life & Study: Best Focus Habits', prompt: 'What are 4 science-backed study habits and focus techniques to retain complex information faster?', subject: 'all' as const },
  { label: '🗣️ Languages: Spanish Essentials', prompt: 'What are the 5 most important polite phrases in Spanish with phonetic pronunciation and examples?', subject: 'world-languages' as SubjectId },
  { label: '✍️ English: Active vs Passive Voice', prompt: 'Explain active vs passive voice with 3 clear transformation examples.', subject: 'english' as SubjectId },
];

export function AITutorSection({
  initialSubject,
  initialQuestion,
  contextLessonTitle,
  onClearInitialContext,
  onOpenMathSolver,
}: AITutorSectionProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject || 'all');
  const [tone, setTone] = useState<'kids' | 'standard' | 'advanced'>('standard');
  const [input, setInput] = useState(initialQuestion || '');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: "👋 **Hello! I am DanAnty AI — your Universal AI Learning Assistant & Polymath.**\n\nI am equipped to answer **any question on any subject** as well as **real-world inquiries and everyday curiosity**:\n\n• **All Academic Subjects:** Math, Physics, Chemistry, Biology, History, Geography, Economics, Law, Literature, Computer Science & Coding.\n• **Languages:** English, Hausa, French, Spanish, Arabic, German, and more.\n• **Non-Academic & Real-World:** How things work, career advice, productivity tips, technology trends, writing help, and logic puzzles.\n\nType any question below or tap a suggested inquiry!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuestion) {
      handleSendPrompt(initialQuestion);
      if (onClearInitialContext) onClearInitialContext();
    }
  }, [initialQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      subject: selectedSubject !== 'all' ? selectedSubject : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const aiMsgId = `ai-${Date.now()}`;
    const initialAiMessage: ChatMessage = {
      id: aiMsgId,
      sender: 'assistant',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage, initialAiMessage]);
    setInput('');
    setLoading(true);

    try {
      await streamTutorResponse({
        question: textToSend,
        subject: selectedSubject !== 'all' ? selectedSubject : undefined,
        tone,
        context: contextLessonTitle,
        onChunk: (_chunk, accumulated) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: accumulated } : msg))
          );
        },
        onComplete: (fullText) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: fullText } : msg))
          );
          setLoading(false);
        },
        onError: (errMsg) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMsgId
                ? { ...msg, text: `⚠️ ${errMsg || 'An error occurred while contacting the AI tutor. Please try again.'}` }
                : msg
            )
          );
          setLoading(false);
        },
      });
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsgId
            ? { ...msg, text: '⚠️ An error occurred while contacting the AI tutor. Please check your network and try again.' }
            : msg
        )
      );
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown stars before reading
    const cleanText = text.replace(/[*#`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearChat = () => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: 'welcome-msg-reset',
        sender: 'assistant',
        text: "👋 Chat reset! What would you like to learn next?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-indigo-600 text-white shadow-sm relative overflow-hidden space-y-4">
        {/* Subtle geometric circles */}
        <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-indigo-500 rounded-full opacity-40 pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DanAnty AI Learning Tutor</span>
              </div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[11px] font-bold">
                <Signal className="w-3 h-3" />
                <span>Active On All Networks & Offline</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
              Universal AI Polymath & Tutor
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
              Ask anything across all academic subjects (Math, Science, Coding, History, Languages) or non-relative real-world questions, career advice, and everyday logic!
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenMathSolver && (
              <button
                id="tutor-open-math-solver-btn"
                onClick={onOpenMathSolver}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-colors shadow-sm"
              >
                <Calculator className="w-3.5 h-3.5 text-slate-950" />
                <span>Fast Math Solver</span>
              </button>
            )}

            <button
              id="clear-ai-chat-btn"
              onClick={handleClearChat}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 text-xs font-bold transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Chat</span>
            </button>
          </div>
        </div>

        {/* Filter Controls: Subject & Tone Selection */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Subject Filter */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-indigo-200 font-bold">Topic / Domain</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: '🌟 All & Real World' },
                { id: 'mathematics', label: '📐 Math' },
                { id: 'science', label: '🔬 Science' },
                { id: 'computer-studies', label: '💻 Coding' },
                { id: 'history', label: '🌍 History/Social' },
                { id: 'english', label: '✍️ English' },
                { id: 'world-languages', label: '🗣️ Languages' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubject(s.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    selectedSubject === s.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'bg-indigo-700/60 hover:bg-indigo-700 text-indigo-100 border border-indigo-500/50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selector */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-indigo-200 font-bold">Explanation Level</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setTone('kids')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  tone === 'kids' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-indigo-700/60 hover:bg-indigo-700 text-indigo-100 border border-indigo-500/50'
                }`}
              >
                Simple (Age 6-12)
              </button>
              <button
                onClick={() => setTone('standard')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  tone === 'standard' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-indigo-700/60 hover:bg-indigo-700 text-indigo-100 border border-indigo-500/50'
                }`}
              >
                Standard Student
              </button>
              <button
                onClick={() => setTone('advanced')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  tone === 'advanced' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-indigo-700/60 hover:bg-indigo-700 text-indigo-100 border border-indigo-500/50'
                }`}
              >
                Deep Dive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Starters */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          Suggested Learning Inquiries
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedSubject(item.subject);
                handleSendPrompt(item.prompt);
              }}
              className="text-xs px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium transition-colors shadow-xs text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm min-h-[380px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isAi = msg.sender === 'assistant';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm leading-relaxed ${
                isAi
                  ? 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none'
                  : 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
              }`}>
                <div className="whitespace-pre-line font-normal">
                  {msg.text || (
                    <span className="inline-flex items-center space-x-1 text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-xs ml-1.5 font-medium text-indigo-600">Generating instant response...</span>
                    </span>
                  )}
                </div>

                <div className={`flex items-center justify-between gap-2 pt-1 border-t text-[10px] ${
                  isAi ? 'border-slate-200/60 text-slate-400' : 'border-indigo-500/50 text-indigo-200'
                }`}>
                  <span>{msg.timestamp}</span>

                  {isAi && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSpeak(msg.text, msg.id)}
                        className="hover:text-indigo-600 transition flex items-center gap-1 font-semibold"
                        title="Read aloud"
                      >
                        {speakingId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                        <span>{speakingId === msg.id ? 'Stop' : 'Listen'}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="hover:text-indigo-600 transition flex items-center gap-1 font-semibold"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center space-x-3 text-slate-500 text-xs py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
            </div>
            <span>Formulating step-by-step guidance...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(input);
        }}
        className="flex gap-2"
      >
        <input
          id="ai-tutor-main-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask any question about ${selectedSubject === 'all' ? 'any subject' : selectedSubject.replace('-', ' ')}...`}
          className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-xs"
        />
        <button
          id="send-ai-message-btn"
          type="submit"
          disabled={loading || !input.trim()}
          className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-2xl transition-colors shadow-xs shrink-0"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
