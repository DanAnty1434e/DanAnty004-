import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Copy,
  Check,
  Search,
  Bookmark,
  Sparkles,
  Calculator,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Filter,
  Layers,
  Heart,
  ChevronDown,
  ChevronUp,
  Compass,
  FileText,
  Sliders,
  Award,
} from 'lucide-react';
import {
  ALL_SURAHS,
  SurahMeta,
  Ayah,
  SurahContent,
  fetchSurahData,
  getSurahAudioUrl,
  getAyahAudioUrl,
  SPECIAL_AYAHS,
} from '../data/quranData';
import {
  NAWAWI_HADITHS,
  SALAH_STEPS,
  DAILY_PRAYERS_TABLE,
  WUDU_STEPS,
  THE_25_PROPHETS,
  DAILY_DUAS,
  TAJWEED_MODULES,
  ISLAMIC_EXAM_QUESTIONS,
} from '../data/islamicStudiesData';

interface QuranReaderProps {
  onClose: () => void;
  onAskAITutor: (prompt: string, contextTitle: string) => void;
  onEarnXp?: (amount: number) => void;
}

type QuranTab = 'quran' | 'hadith' | 'salah-pillars' | 'seerah-faith' | 'tajweed' | 'duas' | 'zakat' | 'exam-prep';

export function QuranReader({ onClose, onAskAITutor, onEarnXp }: QuranReaderProps) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<QuranTab>('quran');

  // Quran Reader State
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [surahContent, setSurahContent] = useState<SurahContent | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);
  const [surahSearch, setSurahSearch] = useState<string>('');
  const [surahFilter, setSurahFilter] = useState<'all' | 'Meccan' | 'Medinan' | 'juz30'>('all');

  // Reader Preferences
  const [arabicFontSize, setArabicFontSize] = useState<number>(28);
  const [showArabic, setShowArabic] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);

  // Audio Playback
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Bookmarks & Copy
  const [bookmarkedVerses, setBookmarkedVerses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dananty_quran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Zakat Calculator State
  const [goldGrams, setGoldGrams] = useState<number>(0);
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(85000); // e.g. approx NGN per gram
  const [cashBalance, setCashBalance] = useState<number>(0);
  const [businessAssets, setBusinessAssets] = useState<number>(0);
  const [debtsDue, setDebtsDue] = useState<number>(0);
  const [currencySymbol, setCurrencySymbol] = useState<string>('₦');

  // Islamic Studies Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  // Load active surah data
  useEffect(() => {
    let isMounted = true;
    setIsLoadingSurah(true);
    // Stop any ongoing audio when changing surah
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
      setPlayingAyahNumber(null);
    }

    fetchSurahData(selectedSurahNumber).then((content) => {
      if (isMounted) {
        setSurahContent(content);
        setIsLoadingSurah(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedSurahNumber]);

  // Handle Bookmarks
  const toggleBookmark = (surahNum: number, ayahNum: number) => {
    const key = `${surahNum}:${ayahNum}`;
    let updated: string[];
    if (bookmarkedVerses.includes(key)) {
      updated = bookmarkedVerses.filter((k) => k !== key);
    } else {
      updated = [...bookmarkedVerses, key];
      if (onEarnXp) onEarnXp(10);
    }
    setBookmarkedVerses(updated);
    try {
      localStorage.setItem('dananty_quran_bookmarks', JSON.stringify(updated));
    } catch {}
  };

  // Copy helper
  const handleCopyAyah = (arabic: string, trans: string, ref: string, key: string) => {
    const text = `${arabic}\n\n${trans}\n(${ref}) - Read via DanAnty004 Universal Academy`;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Audio helper
  const playAyahAudio = (surahNum: number, ayahNum: number) => {
    if (playingAyahNumber === ayahNum && isPlayingAudio) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlayingAudio(false);
      return;
    }

    const url = getAyahAudioUrl(surahNum, ayahNum);
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    } else {
      audioRef.current.src = url;
    }

    setPlayingAyahNumber(ayahNum);
    setIsPlayingAudio(true);
    audioRef.current.play().catch(() => {
      setIsPlayingAudio(false);
      setPlayingAyahNumber(null);
    });

    audioRef.current.onended = () => {
      setIsPlayingAudio(false);
      setPlayingAyahNumber(null);
      // Auto-advance to next ayah if available
      if (surahContent && ayahNum < surahContent.verses.length) {
        playAyahAudio(surahNum, ayahNum + 1);
      }
    };
  };

  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlayingAudio(false);
    setPlayingAyahNumber(null);
  };

  // Filtered Surahs
  const filteredSurahs = ALL_SURAHS.filter((surah) => {
    const query = surahSearch.toLowerCase().trim();
    const matchesQuery =
      query === '' ||
      surah.transliteration.toLowerCase().includes(query) ||
      surah.translation.toLowerCase().includes(query) ||
      surah.name.includes(query) ||
      surah.number.toString() === query;

    if (!matchesQuery) return false;

    if (surahFilter === 'Meccan') return surah.revelationType === 'Meccan';
    if (surahFilter === 'Medinan') return surah.revelationType === 'Medinan';
    if (surahFilter === 'juz30') return surah.number >= 78;
    return true;
  });

  // Calculate Zakat
  const goldValue = goldGrams * goldPricePerGram;
  const totalWealth = cashBalance + goldValue + businessAssets - debtsDue;
  const nisabThreshold = 85 * goldPricePerGram;
  const isZakatEligible = totalWealth >= nisabThreshold;
  const zakatDue = isZakatEligible ? totalWealth * 0.025 : 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] pb-16">
      {/* Ornate Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 border-b border-emerald-800/60 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700/80 border border-emerald-400/40 flex items-center justify-center text-emerald-200 shadow-md">
              <BookOpen className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Al-Qur'an al-Kareem & Islamic Studies
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Universal Deen Hub
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-['Amiri',serif] tracking-wider text-right sm:text-left">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • المصحف الشريف والعلوم الإسلامية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAskAITutor('Please explain the core teachings of Islam, the Quran, and Hadith in detail.', 'Islamic Studies Overview')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ask Islamic AI Tutor</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-700 gap-1 sm:gap-2 pb-2 pt-1 border-t border-emerald-800/40 text-xs">
          <button
            onClick={() => setActiveTab('quran')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'quran'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Holy Qur'an Reader (المصحف)</span>
          </button>

          <button
            onClick={() => setActiveTab('hadith')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'hadith'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>40 Hadith of An-Nawawi (الحديث)</span>
          </button>

          <button
            onClick={() => setActiveTab('salah-pillars')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'salah-pillars'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Salah & Pillars of Islam (الصلاة)</span>
          </button>

          <button
            onClick={() => setActiveTab('seerah-faith')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'seerah-faith'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Seerah & 25 Prophets (الأنبياء)</span>
          </button>

          <button
            onClick={() => setActiveTab('tajweed')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'tajweed'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tajweed Rules (التجويد)</span>
          </button>

          <button
            onClick={() => setActiveTab('duas')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'duas'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Daily Duas & Adhkar (الأذكار)</span>
          </button>

          <button
            onClick={() => setActiveTab('zakat')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'zakat'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Zakat Calculator (الزكاة)</span>
          </button>

          <button
            onClick={() => setActiveTab('exam-prep')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'exam-prep'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Islamic Exam CBT Quiz</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* ==================================================== */}
        {/* TAB 1: HOLY QURAN READER                             */}
        {/* ==================================================== */}
        {activeTab === 'quran' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar: Surah Selector & Browser */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Select Surah (114)</span>
                  </h2>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/50">
                    Juz 1 - 30
                  </span>
                </div>

                {/* Search Input */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={surahSearch}
                    onChange={(e) => setSurahSearch(e.target.value)}
                    placeholder="Search Surah name or number..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                  <button
                    onClick={() => setSurahFilter('all')}
                    className={`px-2 py-1 rounded-lg font-medium transition ${
                      surahFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    All (114)
                  </button>
                  <button
                    onClick={() => setSurahFilter('juz30')}
                    className={`px-2 py-1 rounded-lg font-medium transition ${
                      surahFilter === 'juz30' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Juz 'Amma (78-114)
                  </button>
                  <button
                    onClick={() => setSurahFilter('Meccan')}
                    className={`px-2 py-1 rounded-lg font-medium transition ${
                      surahFilter === 'Meccan' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Meccan (Makki)
                  </button>
                  <button
                    onClick={() => setSurahFilter('Medinan')}
                    className={`px-2 py-1 rounded-lg font-medium transition ${
                      surahFilter === 'Medinan' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Medinan (Madani)
                  </button>
                </div>

                {/* Surah List Scrollable */}
                <div className="max-h-[500px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                  {filteredSurahs.map((surah) => {
                    const isSelected = selectedSurahNumber === surah.number;
                    return (
                      <button
                        key={surah.number}
                        onClick={() => setSelectedSurahNumber(surah.number)}
                        className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-900/60 border-emerald-500/80 text-white shadow-sm'
                            : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-700/60 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isSelected ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {surah.number}
                          </div>
                          <div>
                            <div className="text-xs font-bold">{surah.transliteration}</div>
                            <div className="text-[10px] text-slate-400">{surah.translation}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-bold font-['Amiri',serif] text-emerald-300">{surah.name}</div>
                          <div className="text-[10px] text-slate-400">{surah.versesCount} Ayahs</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Celebrated Ayahs Showcase */}
              <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Celebrated Verses</span>
                </div>
                <div className="space-y-2 text-xs">
                  {SPECIAL_AYAHS.map((sp, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-amber-500/20">
                      <div className="font-bold text-amber-200 text-xs mb-1">{sp.title}</div>
                      <div className="text-[11px] text-slate-400 mb-2">{sp.surahName}</div>
                      <p className="font-['Amiri',serif] text-sm text-right text-amber-100 leading-relaxed line-clamp-2">
                        {sp.arabic}
                      </p>
                      <button
                        onClick={() =>
                          onAskAITutor(
                            `Please explain ${sp.title} (${sp.surahName}) in depth, covering its Arabic meaning, historical context, and spiritual virtues.`,
                            sp.title
                          )
                        }
                        className="mt-2 text-[10px] text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Explain Meaning & Virtues</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Main Column: Surah Content Viewer */}
            <div className="lg:col-span-8 space-y-4">
              {/* Surah Header & Control Bar */}
              {surahContent && (
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-700 pb-4 mb-4">
                    <div className="text-center sm:text-left">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                          Surah {surahContent.meta.transliteration}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {surahContent.meta.revelationType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {surahContent.meta.translation} • {surahContent.meta.versesCount} Verses • Juz {surahContent.meta.juz}
                      </p>
                    </div>

                    <div className="text-center sm:text-right">
                      <div className="text-2xl sm:text-3xl font-bold font-['Amiri',serif] text-emerald-300">
                        {surahContent.meta.name}
                      </div>
                    </div>
                  </div>

                  {/* Reading Preferences & Audio Controls Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    {/* Audio Recitation Player */}
                    <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
                      <button
                        onClick={() => {
                          if (isPlayingAudio) {
                            stopAllAudio();
                          } else {
                            playAyahAudio(surahContent.meta.number, 1);
                          }
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-emerald-200"
                      >
                        {isPlayingAudio ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-emerald-400" />
                            <span>Pause Recitation</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-emerald-400" />
                            <span>Play Surah Recitation</span>
                          </>
                        )}
                      </button>
                      <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">
                        Sheikh Mishary Alafasy
                      </span>
                    </div>

                    {/* Font Size & Display Toggles */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-slate-900/80 rounded-xl border border-slate-700 p-0.5">
                        <button
                          onClick={() => setArabicFontSize((prev) => Math.max(20, prev - 2))}
                          className="px-2 py-1 text-slate-300 hover:text-white font-bold"
                          title="Decrease Arabic font size"
                        >
                          A-
                        </button>
                        <span className="px-1 text-[10px] text-slate-400">{arabicFontSize}px</span>
                        <button
                          onClick={() => setArabicFontSize((prev) => Math.min(42, prev + 2))}
                          className="px-2 py-1 text-slate-300 hover:text-white font-bold"
                          title="Increase Arabic font size"
                        >
                          A+
                        </button>
                      </div>

                      <button
                        onClick={() => setShowTransliteration(!showTransliteration)}
                        className={`px-2.5 py-1.5 rounded-xl border font-semibold transition ${
                          showTransliteration
                            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                        title="Toggle Roman transliteration"
                      >
                        Translit
                      </button>

                      <button
                        onClick={() => setShowTranslation(!showTranslation)}
                        className={`px-2.5 py-1.5 rounded-xl border font-semibold transition ${
                          showTranslation
                            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                        title="Toggle English translation"
                      >
                        English
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bismillah Card (Precedes all Surahs except At-Tawbah 9 and Al-Fatiha 1) */}
              {surahContent && surahContent.bismillahPre && (
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 text-center shadow-xs">
                  <div className="font-['Amiri',serif] text-2xl sm:text-3xl text-emerald-300 leading-relaxed">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    In the name of Allah, the Entirely Merciful, the Especially Merciful.
                  </p>
                </div>
              )}

              {/* Loading State */}
              {isLoadingSurah && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-12 text-center">
                  <div className="inline-block animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-3" />
                  <p className="text-sm font-semibold text-slate-300">Loading Holy Qur'an verses...</p>
                </div>
              )}

              {/* Verses List */}
              {surahContent && !isLoadingSurah && (
                <div className="space-y-4">
                  {surahContent.verses.map((ayah) => {
                    const isBookmarked = bookmarkedVerses.includes(`${surahContent.meta.number}:${ayah.numberInSurah}`);
                    const isAyahPlaying = isPlayingAudio && playingAyahNumber === ayah.numberInSurah;
                    const ayahKey = `${surahContent.meta.number}-${ayah.numberInSurah}`;

                    return (
                      <div
                        key={ayah.numberInSurah}
                        id={`ayah-${ayah.numberInSurah}`}
                        className={`p-4 sm:p-5 rounded-2xl border transition ${
                          isAyahPlaying
                            ? 'bg-emerald-950/70 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                            : 'bg-slate-800/70 border-slate-700/70 hover:border-slate-600'
                        }`}
                      >
                        {/* Ayah Meta & Action Bar */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-3 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center justify-center font-bold text-xs">
                              {ayah.numberInSurah}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {surahContent.meta.transliteration} : {ayah.numberInSurah}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => playAyahAudio(surahContent.meta.number, ayah.numberInSurah)}
                              className={`p-1.5 rounded-lg border transition ${
                                isAyahPlaying
                                  ? 'bg-emerald-600 text-white border-emerald-500'
                                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                              }`}
                              title="Listen to this verse"
                            >
                              {isAyahPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            </button>

                            <button
                              onClick={() => toggleBookmark(surahContent.meta.number, ayah.numberInSurah)}
                              className={`p-1.5 rounded-lg border transition ${
                                isBookmarked
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                              }`}
                              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this verse'}
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                            </button>

                            <button
                              onClick={() =>
                                handleCopyAyah(
                                  ayah.arabic,
                                  ayah.translation,
                                  `${surahContent.meta.transliteration} ${surahContent.meta.number}:${ayah.numberInSurah}`,
                                  ayahKey
                                )
                              }
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 transition"
                              title="Copy verse text"
                            >
                              {copiedKey === ayahKey ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              onClick={() =>
                                onAskAITutor(
                                  `Please explain Ayah ${ayah.numberInSurah} of Surah ${surahContent.meta.transliteration} (${ayah.arabic}). What is its Tafsir, context of revelation, and moral lesson for our daily lives?`,
                                  `Tafsir of ${surahContent.meta.transliteration}:${ayah.numberInSurah}`
                                )
                              }
                              className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[10px] font-bold text-emerald-300 hover:bg-slate-800 transition flex items-center gap-1"
                              title="Ask AI Tutor for Tafsir"
                            >
                              <Sparkles className="w-3 h-3 text-amber-300" />
                              <span className="hidden sm:inline">Tafsir / Explanation</span>
                            </button>
                          </div>
                        </div>

                        {/* Arabic Text with Tashkeel */}
                        {showArabic && (
                          <div
                            dir="rtl"
                            style={{ fontSize: `${arabicFontSize}px` }}
                            className="font-['Amiri',serif] text-slate-100 text-right leading-loose py-2 tracking-wide select-text"
                          >
                            {ayah.arabic}
                            <span className="inline-block mx-2 text-emerald-400 font-normal font-sans text-base">
                              ۝{ayah.numberInSurah}
                            </span>
                          </div>
                        )}

                        {/* Transliteration */}
                        {showTransliteration && ayah.transliteration && (
                          <div className="text-xs text-emerald-300/80 font-medium italic mt-2">
                            {ayah.transliteration}
                          </div>
                        )}

                        {/* English Translation */}
                        {showTranslation && ayah.translation && (
                          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-1.5">
                            {ayah.translation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: 40 HADITH OF AN-NAWAWI                        */}
        {/* ==================================================== */}
        {activeTab === 'hadith' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl p-6 shadow-sm">
              <div className="max-w-3xl">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  الأربعون النووية • Al-Arba'een An-Nawawiyyah
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  The 40 Hadiths of Imam An-Nawawi
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Compiled by Imam Yahya ibn Sharaf an-Nawawi (d. 676 AH), these foundational traditions encapsulate the core principles of Islamic jurisprudence, spiritual sincerity, and ethical manners.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {NAWAWI_HADITHS.map((hadith) => (
                <div
                  key={hadith.id}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4 hover:border-emerald-500/60 transition"
                >
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                      Hadith #{hadith.id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Narrated by {hadith.narrator}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{hadith.title}</h3>

                  <div
                    dir="rtl"
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 font-['Amiri',serif] text-base text-right text-emerald-100 leading-relaxed"
                  >
                    {hadith.arabic}
                  </div>

                  <div className="text-xs text-slate-200 leading-relaxed">
                    <strong className="text-emerald-300 block mb-1">Translation:</strong>
                    "{hadith.english}"
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <div className="font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Key Lessons & Reflections:</span>
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {hadith.keyLessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                    <button
                      onClick={() => {
                        const copyText = `${hadith.title}\n\nArabic:\n${hadith.arabic}\n\nEnglish:\n"${hadith.english}"\n\n(Narrated by ${hadith.narrator})`;
                        navigator.clipboard.writeText(copyText);
                        setCopiedKey(`hadith-${hadith.id}`);
                        setTimeout(() => setCopiedKey(null), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedKey === `hadith-${hadith.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Hadith</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        onAskAITutor(
                          `Please explain Hadith ${hadith.id} of Imam An-Nawawi ("${hadith.title}") in depth. Include the context, narrator biography, and real-life application today.`,
                          hadith.title
                        )
                      }
                      className="text-emerald-400 hover:text-emerald-300 font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>Ask AI Tutor</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: SALAH & PILLARS OF ISLAM                      */}
        {/* ==================================================== */}
        {activeTab === 'salah-pillars' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>The Five Obligatory Daily Prayers (الصلوات الخمس)</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 mb-4">
                Salah is the second pillar of Islam and the primary link between a servant and Allah.
              </p>

              {/* Prayers Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900/80 text-emerald-300 border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-3">Prayer Name</th>
                      <th className="py-2.5 px-3">Fard (Obligatory)</th>
                      <th className="py-2.5 px-3">Sunnah Before</th>
                      <th className="py-2.5 px-3">Sunnah After</th>
                      <th className="py-2.5 px-3">Prescribed Time Window</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {DAILY_PRAYERS_TABLE.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-750">
                        <td className="py-2.5 px-3 font-bold text-white">{item.prayer}</td>
                        <td className="py-2.5 px-3 font-black text-emerald-400">{item.fard} Rak'ahs</td>
                        <td className="py-2.5 px-3 text-slate-300">{item.sunnahBefore > 0 ? `${item.sunnahBefore} Rak'ahs` : '—'}</td>
                        <td className="py-2.5 px-3 text-slate-300">{item.sunnahAfter > 0 ? `${item.sunnahAfter} Rak'ahs` : '—'}</td>
                        <td className="py-2.5 px-3 text-slate-400">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step-by-Step Salah Guide */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Step-by-Step Prayer Method (صفة الصلاة)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SALAH_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                        {step.step}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                        {step.posture}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{step.title}</h4>

                    <div
                      dir="rtl"
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 font-['Amiri',serif] text-base text-right text-emerald-200"
                    >
                      {step.arabic}
                    </div>

                    <div className="text-xs text-emerald-400/90 font-medium italic">
                      {step.transliteration}
                    </div>

                    <div className="text-xs text-slate-200">
                      <strong>Meaning:</strong> "{step.translation}"
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Wudu (Ablution) Protocol */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>How to Perform Wudu (Ablution - صفة الوضوء)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {WUDU_STEPS.map((w) => (
                  <div key={w.step} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-[10px]">
                        {w.step}
                      </span>
                      <span>{w.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: SEERAH & 25 PROPHETS                          */}
        {/* ==================================================== */}
        {activeTab === 'seerah-faith' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl p-6">
              <h2 className="text-xl font-black text-white">
                The 25 Prophets Mentioned in the Holy Qur'an (الأنبياء والرسل)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Belief in all Prophets and Messengers is an indispensable article of faith (Arkan al-Iman).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {THE_25_PROPHETS.map((prophet, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 transition space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{idx + 1}. {prophet.name}</span>
                    <span className="font-['Amiri',serif] text-base font-bold text-emerald-300">
                      {prophet.arabic}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-amber-300">{prophet.title}</div>
                  <div className="text-[10px] text-slate-400">{prophet.period}</div>
                  <button
                    onClick={() =>
                      onAskAITutor(
                        `Tell me the complete story of Prophet ${prophet.name} (${prophet.arabic}) as mentioned in the Holy Quran, their people, trials, and lessons.`,
                        `Story of Prophet ${prophet.name}`
                      )
                    }
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 pt-1"
                  >
                    <span>Read Quranic Story</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: TAJWEED RULES                                 */}
        {/* ==================================================== */}
        {activeTab === 'tajweed' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-black text-white">
                Tajweed Rules for Accurate Qur'anic Recitation (أحكام التجويد)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Tajweed means to recite every letter from its correct point of articulation (Makhraj) with its intrinsic characteristics (Sifat).
              </p>
            </div>

            <div className="space-y-6">
              {TAJWEED_MODULES.map((module, idx) => (
                <div key={idx} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <h3 className="text-base font-bold text-white">{module.title}</h3>
                    <span className="font-['Amiri',serif] text-lg text-emerald-300">{module.arabic}</span>
                  </div>

                  <p className="text-xs text-slate-300">{module.desc}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {module.rules.map((rule, rIdx) => (
                      <div key={rIdx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                        <div className="text-xs font-bold text-emerald-300">{rule.name}</div>
                        {rule.letters && (
                          <div className="text-[11px] text-amber-300">
                            <strong>Letters:</strong> {rule.letters}
                          </div>
                        )}
                        <p className="text-[11px] text-slate-300">{rule.meaning}</p>
                        <div className="p-2 rounded-lg bg-slate-950 font-['Amiri',serif] text-sm text-right text-emerald-200">
                          <strong>مثال:</strong> {rule.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: DAILY DUAS & ADHKAR                           */}
        {/* ==================================================== */}
        {activeTab === 'duas' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-black text-white">
                Daily Supplications & Adhkar from Hisnul Muslim (حصن المسلم)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Authentic prayers taught by the Prophet ﷺ for safety, guidance, peace, and spiritual protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAILY_DUAS.map((dua) => (
                <div key={dua.id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-xs font-bold text-white">{dua.title}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                      {dua.occasion}
                    </span>
                  </div>

                  <div
                    dir="rtl"
                    className="p-3 rounded-xl bg-slate-950 font-['Amiri',serif] text-base text-right text-emerald-100 leading-relaxed"
                  >
                    {dua.arabic}
                  </div>

                  <div className="text-xs text-emerald-300/90 italic">{dua.transliteration}</div>

                  <p className="text-xs text-slate-200">"{dua.translation}"</p>

                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-700/50">
                    <span>Reference: {dua.reference}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${dua.title}\n${dua.arabic}\n${dua.translation}`);
                        setCopiedKey(dua.id);
                        setTimeout(() => setCopiedKey(null), 2000);
                      }}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
                    >
                      {copiedKey === dua.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 7: ZAKAT CALCULATOR                              */}
        {/* ==================================================== */}
        {activeTab === 'zakat' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <span>Instant Zakat Calculator (حاسبة الزكاة الشرعية)</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Zakat is 2.5% on qualifying surplus wealth held for one full lunar year above the Nisab threshold (equivalent to 85 grams of pure gold).
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Cash in Hand & Bank Accounts
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400">{currencySymbol}</span>
                    <input
                      type="number"
                      value={cashBalance || ''}
                      onChange={(e) => setCashBalance(Number(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Gold Possession (in Grams)
                  </label>
                  <input
                    type="number"
                    value={goldGrams || ''}
                    onChange={(e) => setGoldGrams(Number(e.target.value) || 0)}
                    placeholder="e.g. 100"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Gold price: {currencySymbol}{goldPricePerGram.toLocaleString()}/g • Value: {currencySymbol}{goldValue.toLocaleString()}
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Business Merchandise & Shares
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400">{currencySymbol}</span>
                    <input
                      type="number"
                      value={businessAssets || ''}
                      onChange={(e) => setBusinessAssets(Number(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Deduct Immediate Debts & Bills Due
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400">{currencySymbol}</span>
                    <input
                      type="number"
                      value={debtsDue || ''}
                      onChange={(e) => setDebtsDue(Number(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Results Summary Box */}
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-700/60 mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Total Zakatable Net Wealth:</span>
                  <span className="font-bold text-white">{currencySymbol}{totalWealth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Current Nisab Threshold (85g Gold):</span>
                  <span className="font-bold text-amber-300">{currencySymbol}{nisabThreshold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-slate-800 pt-2">
                  <span className="text-slate-400">Nisab Status:</span>
                  <span className={`font-bold ${isZakatEligible ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {isZakatEligible ? 'Eligible for Zakat (Wealth ≥ Nisab)' : 'Below Nisab (No Zakat Due)'}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black border-t border-slate-800 pt-2 text-emerald-300">
                  <span>Zakat Due to the Poor (2.5%):</span>
                  <span>{currencySymbol}{zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 8: ISLAMIC CBT EXAM PREP                         */}
        {/* ==================================================== */}
        {activeTab === 'exam-prep' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-700">
                  WAEC / NECO / Universal Islamic Studies CBT
                </span>
                <span className="text-xs font-bold text-amber-300">
                  Question {quizIndex + 1} of {ISLAMIC_EXAM_QUESTIONS.length}
                </span>
              </div>
              <h2 className="text-lg font-black text-white">
                {ISLAMIC_EXAM_QUESTIONS[quizIndex].question}
              </h2>
            </div>

            <div className="space-y-2.5">
              {ISLAMIC_EXAM_QUESTIONS[quizIndex].options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === oIdx;
                const isCorrect = oIdx === ISLAMIC_EXAM_QUESTIONS[quizIndex].correctIndex;

                let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';
                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950 border-rose-500 text-rose-200 font-bold';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={selectedAnswer !== null}
                    onClick={() => {
                      setSelectedAnswer(oIdx);
                      if (oIdx === ISLAMIC_EXAM_QUESTIONS[quizIndex].correctIndex) {
                        setQuizScore((prev) => prev + 1);
                        if (onEarnXp) onEarnXp(25);
                      }
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between transition ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after answering */}
            {selectedAnswer !== null && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs space-y-2">
                <div className="font-bold text-emerald-300">Explanation:</div>
                <p className="text-slate-300 leading-relaxed">
                  {ISLAMIC_EXAM_QUESTIONS[quizIndex].explanation}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-slate-400">
                    Category: {ISLAMIC_EXAM_QUESTIONS[quizIndex].category}
                  </span>
                  <button
                    onClick={() => {
                      if (quizIndex + 1 < ISLAMIC_EXAM_QUESTIONS.length) {
                        setQuizIndex((prev) => prev + 1);
                        setSelectedAnswer(null);
                      } else {
                        setShowQuizResult(true);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                  >
                    {quizIndex + 1 < ISLAMIC_EXAM_QUESTIONS.length ? 'Next Question' : 'Complete Quiz'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
