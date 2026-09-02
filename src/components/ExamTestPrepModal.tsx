import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  Sparkles,
  Zap,
  Flag,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Bot,
  Brain,
  Layers,
  HelpCircle,
  Check,
  X,
  ShieldAlert,
  Flame,
  Filter,
  Search,
  BookMarked,
  Cpu,
  Trophy,
} from 'lucide-react';
import {
  ExamPaper,
  ExamTarget,
  ClassLevel,
  SubjectId,
  UserProgress,
  ExamAttemptRecord,
  CLASS_LEVELS,
} from '../types';
import { AUTHENTIC_EXAM_PAPERS, EXAM_TARGETS_META } from '../data/examData';
import { CURRICULUM_DATA } from '../data/curriculum';

interface ExamTestPrepModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onCompleteExam: (record: ExamAttemptRecord, xpEarned: number, coinsEarned: number) => void;
  onAskAIQuestion: (question: string, subjectId?: SubjectId) => void;
  initialTargetExam?: ExamTarget;
  initialClass?: ClassLevel;
}

export function ExamTestPrepModal({
  isOpen,
  onClose,
  progress,
  onCompleteExam,
  onAskAIQuestion,
  initialTargetExam = 'waec',
  initialClass = progress.selectedClass || 'ss3',
}: ExamTestPrepModalProps) {
  const [selectedTarget, setSelectedTarget] = useState<ExamTarget | 'all'>(initialTargetExam);
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>(initialClass);
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active exam session state
  const [activePaper, setActivePaper] = useState<ExamPaper | null>(null);
  const [examMode, setExamMode] = useState<'timed' | 'practice'>('timed');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examStartTime, setExamStartTime] = useState<number>(0);

  // AI custom generator state
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);
  const [customSubject, setCustomSubject] = useState<SubjectId>('mathematics');
  const [customClass, setCustomClass] = useState<ClassLevel>(progress.selectedClass || 'ss3');
  const [customTopic, setCustomTopic] = useState('');
  const [customExamType, setCustomExamType] = useState<ExamTarget>('waec');
  const [customGenerationError, setCustomGenerationError] = useState<string | null>(null);

  // Dynamic custom papers list
  const [allPapers, setAllPapers] = useState<ExamPaper[]>(AUTHENTIC_EXAM_PAPERS);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activePaper && !isSubmitted && examMode === 'timed' && timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activePaper, isSubmitted, examMode, timeRemainingSeconds]);

  if (!isOpen) return null;

  // Filter papers
  const filteredPapers = allPapers.filter((paper) => {
    const matchTarget = selectedTarget === 'all' || paper.targetExam === selectedTarget;
    const matchClass =
      selectedClass === 'all' ||
      paper.targetClass === selectedClass ||
      (selectedClass === 'sss' && ['ss1', 'ss2', 'ss3'].includes(paper.targetClass)) ||
      (selectedClass === 'jss' && ['jss1', 'jss2', 'jss3'].includes(paper.targetClass)) ||
      (selectedClass === 'primary' && ['lower-primary', 'upper-primary'].includes(paper.targetClass));
    const matchSubject = selectedSubject === 'all' || paper.subjectId === selectedSubject;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      paper.title.toLowerCase().includes(q) ||
      paper.subtitle.toLowerCase().includes(q) ||
      paper.subjectName.toLowerCase().includes(q);

    return matchTarget && matchClass && matchSubject && matchQuery;
  });

  const handleStartPaper = (paper: ExamPaper, mode: 'timed' | 'practice') => {
    setActivePaper(paper);
    setExamMode(mode);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeRemainingSeconds(paper.durationMinutes * 60);
    setIsSubmitted(false);
    setExamStartTime(Date.now());
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted && examMode === 'timed') return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleToggleFlag = (index: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const calculateScore = () => {
    if (!activePaper) return { scorePct: 0, rawScore: 0, grade: 'F9', jambScore: 0 };
    let correct = 0;
    activePaper.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / activePaper.questions.length) * 100);
    const jambScore = Math.round((correct / activePaper.questions.length) * 400);

    let grade = 'F9 - Fail';
    if (scorePct >= 80) grade = 'A1 - Excellent Distinction';
    else if (scorePct >= 75) grade = 'B2 - Very Good';
    else if (scorePct >= 70) grade = 'B3 - Good';
    else if (scorePct >= 65) grade = 'C4 - Credit';
    else if (scorePct >= 60) grade = 'C5 - Credit';
    else if (scorePct >= 50) grade = 'C6 - Credit';
    else if (scorePct >= 45) grade = 'D7 - Pass';
    else if (scorePct >= 40) grade = 'E8 - Pass';

    return { scorePct, rawScore: correct, grade, jambScore };
  };

  const handleAutoSubmit = () => {
    if (!activePaper || isSubmitted) return;
    setIsSubmitted(true);
    const { scorePct, rawScore, grade, jambScore } = calculateScore();
    const timeSpent = Math.max(1, Math.round((Date.now() - examStartTime) / 1000));

    const formattedGrade = activePaper.gradingScale === 'jamb' ? `JAMB Score: ${jambScore} / 400 (${grade})` : `${grade} (${scorePct}%)`;

    const record: ExamAttemptRecord = {
      id: `exam-att-${Date.now()}`,
      paperId: activePaper.id,
      paperTitle: activePaper.title,
      subjectId: activePaper.subjectId,
      targetExam: activePaper.targetExam,
      targetClass: activePaper.targetClass,
      score: scorePct,
      rawScore,
      totalQuestions: activePaper.questions.length,
      gradeFormatted: formattedGrade,
      timeSpentSeconds: timeSpent,
      completedAt: new Date().toISOString(),
      userAnswers,
      aiEvaluationSummary: `Scored ${scorePct}% on ${activePaper.title}. Answered ${rawScore} of ${activePaper.questions.length} questions correctly under ${activePaper.targetExam.toUpperCase()} standards.`,
    };

    onCompleteExam(record, activePaper.xpReward, activePaper.coinReward);
  };

  // Generate Custom Exam Paper with AI
  const handleGenerateAIExam = async () => {
    setIsGeneratingCustom(true);
    setCustomGenerationError(null);

    const subjectObj = CURRICULUM_DATA.find((s) => s.id === customSubject);
    const subjectName = subjectObj ? subjectObj.title : customSubject;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate a realistic 5-question authentic practice exam paper for the subject "${subjectName}" targeting the examination "${customExamType.toUpperCase()}" for class level "${customClass}" on the specific topic: "${customTopic || 'Comprehensive Curriculum Topics'}".
Format your response as a strict JSON object with this exact structure:
{
  "title": "Official practice paper title",
  "subtitle": "Clear description with exam code",
  "questions": [
    {
      "id": "q1",
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Direct step-by-step proof and exact marking scheme",
      "hint": "Specific hint",
      "topicTag": "Subtopic name"
    }
  ]
}`,
          conversationHistory: [],
          level: 'intermediate',
          subjectId: customSubject,
          classLevel: customClass,
        }),
      });

      const data = await response.json();
      let rawText = data.text || '';

      // Extract JSON if wrapped in code blocks
      const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        rawText = jsonMatch[1];
      }

      const parsed = JSON.parse(rawText);

      if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
        const newPaper: ExamPaper = {
          id: `ai-paper-${Date.now()}`,
          title: parsed.title || `AI Custom ${customExamType.toUpperCase()} - ${subjectName}`,
          subtitle: parsed.subtitle || `Generated for ${customClass.toUpperCase()} • ${customTopic || 'Core Syllabus'}`,
          targetExam: customExamType,
          targetClass: customClass,
          subjectId: customSubject,
          subjectName,
          durationMinutes: 10,
          totalMarks: 30,
          gradingScale: customExamType === 'jamb' ? 'jamb' : 'waec',
          questions: parsed.questions,
          instructions: [
            'Generated exclusively by AI Polymath according to official exam standards.',
            'Read each question carefully and review detailed proofs upon completion.',
          ],
          xpReward: 140,
          coinReward: 45,
        };

        setAllPapers((prev) => [newPaper, ...prev]);
        handleStartPaper(newPaper, 'timed');
        setIsGeneratingCustom(false);
      } else {
        throw new Error('Could not parse questions array from AI response');
      }
    } catch (err: any) {
      console.error('Error generating custom AI exam paper:', err);
      setCustomGenerationError('Failed to generate AI exam. Please retry or pick an authentic paper from the catalog.');
      setIsGeneratingCustom(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-4 sm:p-6 relative border-b border-indigo-900/50 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 backdrop-blur-xs flex items-center justify-center text-indigo-400 border border-indigo-400/30 shadow-inner">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/30 text-indigo-300 text-[10px] font-extrabold uppercase tracking-wider border border-indigo-400/20">
                    Official Exam & Test Center
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Primary to SS3 & Global
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black font-['Outfit',sans-serif] tracking-tight mt-0.5 text-white">
                  Study for Exams & Standardized Tests
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                if (activePaper && !isSubmitted) {
                  if (window.confirm('Are you sure you want to exit this active exam session?')) {
                    setActivePaper(null);
                    onClose();
                  }
                } else {
                  setActivePaper(null);
                  onClose();
                }
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {!activePaper ? (
            /* Catalog & Exam Selector View */
            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Banner & AI Generator Prompt */}
              <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-teal-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Authentic Past Questions & Model CBT Simulations</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif]">
                      Prepare for WAEC, JAMB, NECO, BECE & Class Tests
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                      Practice real exam past questions with timed CBT computer testing, detailed marking schemes, grade predictors (A1 - F9, JAMB 0-400), or generate custom tests for any class and subject with AI!
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col gap-2 min-w-[240px]">
                    <span className="text-xs font-bold text-indigo-200">
                      Generate Custom Test on ANY Topic:
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Organic Chemistry, Logarithms..."
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={customSubject}
                        onChange={(e) => setCustomSubject(e.target.value as SubjectId)}
                        className="px-2 py-1.5 text-[11px] rounded-lg bg-slate-900/80 text-white border border-white/20"
                      >
                        {CURRICULUM_DATA.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                      <select
                        value={customExamType}
                        onChange={(e) => setCustomExamType(e.target.value as ExamTarget)}
                        className="px-2 py-1.5 text-[11px] rounded-lg bg-slate-900/80 text-white border border-white/20"
                      >
                        <option value="waec">WAEC/WASSCE</option>
                        <option value="jamb">JAMB CBT</option>
                        <option value="neco">NECO SSCE</option>
                        <option value="bece">BECE JSS3</option>
                        <option value="common-entrance">Common Entrance</option>
                        <option value="sat-gcse">SAT / GCSE</option>
                      </select>
                    </div>
                    <button
                      onClick={handleGenerateAIExam}
                      disabled={isGeneratingCustom}
                      className="mt-1 w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-transform active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                      {isGeneratingCustom ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Generating Paper with AI...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Generate Custom Test</span>
                        </>
                      )}
                    </button>
                    {customGenerationError && (
                      <p className="text-[10px] text-red-300 font-semibold mt-1">
                        {customGenerationError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                      Filter Examination Track:
                    </span>
                  </div>

                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search papers, subjects, exams..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500 bg-slate-50"
                    />
                  </div>
                </div>

                {/* Target Exam Pills */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTarget('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      selectedTarget === 'all'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Exams ({allPapers.length})
                  </button>
                  {Object.entries(EXAM_TARGETS_META).map(([key, meta]) => {
                    const isSelected = selectedTarget === key;
                    const count = allPapers.filter((p) => p.targetExam === key).length;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedTarget(key as ExamTarget)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span>{meta.icon}</span>
                        <span>{meta.title.split(' ')[0]}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/80 text-slate-700 font-extrabold">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Class Filter Pills */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400">Class Level:</span>
                  <button
                    onClick={() => setSelectedClass('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      selectedClass === 'all'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    All Grades
                  </button>
                  {CLASS_LEVELS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedClass(c.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 ${
                        selectedClass === c.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{c.icon}</span>
                      <span>{c.shortName.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Papers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPapers.map((paper) => {
                  const meta = EXAM_TARGETS_META[paper.targetExam] || EXAM_TARGETS_META.waec;
                  return (
                    <div
                      key={paper.id}
                      className="bg-white rounded-3xl p-5 border-2 border-slate-200/90 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl p-2 bg-slate-100 rounded-xl group-hover:scale-110 transition-transform">
                              {meta.icon}
                            </span>
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block">
                                {meta.badge} • {paper.subjectName}
                              </span>
                              <h4 className="text-base font-black text-slate-900 font-['Outfit',sans-serif] leading-tight">
                                {paper.title}
                              </h4>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {paper.subtitle}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-semibold pt-1">
                          <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5 rounded-md">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{paper.durationMinutes} mins</span>
                          </span>
                          <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5 rounded-md">
                            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>{paper.questions.length} Questions</span>
                          </span>
                          <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>+{paper.xpReward} XP / +{paper.coinReward} Coins</span>
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleStartPaper(paper, 'practice')}
                          className="py-2 px-3 rounded-xl border border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Practice Mode</span>
                        </button>
                        <button
                          onClick={() => handleStartPaper(paper, 'timed')}
                          className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-transform active:scale-95 shadow-xs flex items-center justify-center space-x-1.5"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Start CBT Exam &rarr;</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredPapers.length === 0 && (
                <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-slate-800">
                    No papers matching current filter
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Try clearing search query or use the AI Custom Generator above to generate an authentic paper for any subject and topic instantly!
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTarget('all');
                      setSelectedClass('all');
                      setSelectedSubject('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Active Exam Interface View */
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Exam Status Bar */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-extrabold uppercase">
                      {activePaper.targetExam.toUpperCase()} CBT
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {activePaper.subjectName}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
                    {activePaper.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3">
                  {examMode === 'timed' && !isSubmitted && (
                    <div
                      className={`px-4 py-2 rounded-2xl flex items-center space-x-2 font-mono font-bold text-sm ${
                        timeRemainingSeconds <= 120
                          ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(timeRemainingSeconds)}</span>
                    </div>
                  )}

                  {!isSubmitted ? (
                    <button
                      onClick={() => {
                        if (window.confirm('Submit this exam paper and view your official scorecard?')) {
                          handleAutoSubmit();
                        }
                      }}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Exam</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActivePaper(null)}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl"
                    >
                      Back to Exam Center
                    </button>
                  )}
                </div>
              </div>

              {/* Scorecard Modal Banner when submitted */}
              {isSubmitted && (
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-indigo-500/30">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        Official Exam Performance Scorecard
                      </span>
                      <h4 className="text-2xl font-black font-['Outfit',sans-serif]">
                        {calculateScore().grade}
                      </h4>
                      <p className="text-xs text-slate-300">
                        Answered {calculateScore().rawScore} of {activePaper.questions.length} questions correctly.
                        {activePaper.gradingScale === 'jamb' && (
                          <strong className="text-amber-400 ml-1">
                            JAMB Scaled Score: {calculateScore().jambScore} / 400
                          </strong>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-center p-3 rounded-2xl bg-white/10 border border-white/20 min-w-[90px]">
                        <span className="text-2xl font-black text-amber-400">
                          {calculateScore().scorePct}%
                        </span>
                        <span className="text-[10px] text-slate-300 block uppercase font-bold">
                          Percentage
                        </span>
                      </div>
                      <button
                        onClick={() => handleStartPaper(activePaper, examMode)}
                        className="py-3 px-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors flex items-center space-x-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retake</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Question Navigator Grid */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">
                    Question Navigator ({activePaper.questions.length} Questions)
                  </span>
                  <div className="flex items-center space-x-3 text-[10px] font-bold text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
                      Answered
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      Flagged
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block" />
                      Unanswered
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activePaper.questions.map((_, idx) => {
                    const isAnswered = userAnswers[idx] !== undefined;
                    const isFlagged = flaggedQuestions[idx];
                    const isCurrent = currentQuestionIndex === idx;

                    let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                    if (isSubmitted) {
                      const isCorrect = userAnswers[idx] === activePaper.questions[idx].correctIndex;
                      bgClass = isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white';
                    } else if (isFlagged) {
                      bgClass = 'bg-amber-500 text-white';
                    } else if (isAnswered) {
                      bgClass = 'bg-indigo-600 text-white';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-9 h-9 rounded-xl font-bold text-xs transition-all relative ${bgClass} ${
                          isCurrent ? 'ring-3 ring-indigo-400 ring-offset-2 scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Question Card */}
              {activePaper.questions[currentQuestionIndex] && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold">
                          Question {currentQuestionIndex + 1} of {activePaper.questions.length}
                        </span>
                        {activePaper.questions[currentQuestionIndex].topicTag && (
                          <span className="text-xs text-indigo-600 font-semibold">
                            Topic: {activePaper.questions[currentQuestionIndex].topicTag}
                          </span>
                        )}
                        {activePaper.questions[currentQuestionIndex].yearOrSession && (
                          <span className="text-[11px] text-slate-400 font-medium">
                            ({activePaper.questions[currentQuestionIndex].yearOrSession})
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-2 leading-relaxed">
                        {activePaper.questions[currentQuestionIndex].question}
                      </h3>
                    </div>

                    {!isSubmitted && (
                      <button
                        onClick={() => handleToggleFlag(currentQuestionIndex)}
                        className={`p-2.5 rounded-2xl border transition-colors ${
                          flaggedQuestions[currentQuestionIndex]
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500'
                        }`}
                        title="Flag for review"
                      >
                        <Flag className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {activePaper.questions[currentQuestionIndex].options.map((option, optIdx) => {
                      const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                      const isCorrect =
                        activePaper.questions[currentQuestionIndex].correctIndex === optIdx;

                      let optionStyle =
                        'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 text-slate-800';

                      if (isSubmitted || examMode === 'practice') {
                        if (isCorrect) {
                          optionStyle =
                            'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                        }
                      } else if (isSelected) {
                        optionStyle =
                          'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-bold shadow-xs';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 ${optionStyle}`}
                        >
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black uppercase shrink-0 ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-sm flex-1">{option}</span>
                          {(isSubmitted || examMode === 'practice') && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {(isSubmitted || examMode === 'practice') && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation & Hint in Practice Mode or after submission */}
                  {(isSubmitted || (examMode === 'practice' && userAnswers[currentQuestionIndex] !== undefined)) && (
                    <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>Step-by-Step Marking Proof & Official Explanation:</span>
                      </div>
                      <p className="text-xs text-indigo-950 leading-relaxed font-sans">
                        {activePaper.questions[currentQuestionIndex].explanation}
                      </p>
                      {activePaper.questions[currentQuestionIndex].hint && (
                        <p className="text-[11px] text-slate-500 pt-1 border-t border-indigo-100">
                          <strong>Key Hint:</strong> {activePaper.questions[currentQuestionIndex].hint}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Question Navigation Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 disabled:opacity-40 flex items-center space-x-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={() =>
                        onAskAIQuestion(
                          `Can you provide an in-depth breakdown and step-by-step solution for this exam question from ${activePaper.title}: "${activePaper.questions[currentQuestionIndex].question}"?`,
                          activePaper.subjectId
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 font-bold text-xs transition-colors flex items-center space-x-1"
                    >
                      <Bot className="w-3.5 h-3.5 text-amber-700" />
                      <span>Ask AI Tutor About This</span>
                    </button>

                    <button
                      onClick={() =>
                        setCurrentQuestionIndex((prev) =>
                          Math.min(activePaper.questions.length - 1, prev + 1)
                        )
                      }
                      disabled={currentQuestionIndex === activePaper.questions.length - 1}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs disabled:opacity-40 flex items-center space-x-1.5"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>
            Covers WAEC, JAMB CBT, NECO, BECE (JSS3), Primary National Common Entrance, and School Termly Tests.
          </span>
          <button
            onClick={() => {
              setActivePaper(null);
              onClose();
            }}
            className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800"
          >
            Close Center
          </button>
        </div>
      </div>
    </div>
  );
}
