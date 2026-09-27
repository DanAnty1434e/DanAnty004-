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
  Globe,
  Radio,
  Share2,
  Headphones,
  BookCheck,
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
  SALAH_STEPS,
  DAILY_PRAYERS_TABLE,
  WUDU_STEPS,
  THE_25_PROPHETS,
  DAILY_DUAS,
  TAJWEED_MODULES,
  ISLAMIC_EXAM_QUESTIONS,
} from '../data/islamicStudiesData';
import {
  ALL_RIWAYAT,
  ALL_RECITERS,
  RiwayahId,
  RiwayahMeta,
  ReciterVoiceMeta,
  getRiwayahById,
  getReciterById,
} from '../data/riwayahAndVoices';
import {
  ALL_HADITHS,
  HADITH_COLLECTIONS,
  HadithItem,
} from '../data/hadithCatalog';
import {
  ISLAMIC_CURRICULUM_SUBJECTS,
  IslamicSubjectModule,
} from '../data/islamicCurriculumSubjects';
import {
  islamicAudioService,
  AudioEngineState,
  AudioTrackInfo,
} from '../utils/islamicAudioService';
import { RiwayahVoiceSelectorModal } from './RiwayahVoiceSelectorModal';
import { IslamicGlobalAudioPlayer } from './IslamicGlobalAudioPlayer';

interface QuranReaderProps {
  onClose: () => void;
  onAskAITutor: (prompt: string, contextTitle: string) => void;
  onEarnXp?: (amount: number) => void;
}

type QuranTab =
  | 'quran'
  | 'hadith'
  | 'subjects'
  | 'salah-pillars'
  | 'tajweed-riwayat'
  | 'duas'
  | 'zakat'
  | 'exam-prep';

export function QuranReader({ onClose, onAskAITutor, onEarnXp }: QuranReaderProps) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<QuranTab>('quran');

  // Riwayah & Voice Preferences (persisted in localStorage)
  const [activeRiwayahId, setActiveRiwayahId] = useState<RiwayahId>(() => {
    try {
      const saved = localStorage.getItem('dananty_active_riwayah');
      return (saved as RiwayahId) || 'hafs';
    } catch {
      return 'hafs';
    }
  });

  const [activeReciterId, setActiveReciterId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('dananty_active_reciter');
      return saved || 'alafasy';
    } catch {
      return 'alafasy';
    }
  });

  const [applyToAllSubjects, setApplyToAllSubjects] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('dananty_apply_audio_all_subjects');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  // Quran Reader State
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [surahContent, setSurahContent] = useState<SurahContent | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);
  const [surahSearch, setSurahSearch] = useState<string>('');
  const [surahFilter, setSurahFilter] = useState<'all' | 'Meccan' | 'Medinan' | 'juz30'>('all');

  // Reader Display Preferences
  const [arabicFontSize, setArabicFontSize] = useState<number>(28);
  const [showArabic, setShowArabic] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);

  // Audio Engine State Hook
  const [audioState, setAudioState] = useState<AudioEngineState>(() =>
    islamicAudioService.getState()
  );

  useEffect(() => {
    const unsub = islamicAudioService.subscribe((state) => {
      setAudioState({ ...state });
    });
    return () => unsub();
  }, []);

  // Save preferences
  const handleSelectRiwayah = (id: RiwayahId) => {
    setActiveRiwayahId(id);
    try {
      localStorage.setItem('dananty_active_riwayah', id);
    } catch {}
  };

  const handleSelectReciter = (id: string) => {
    setActiveReciterId(id);
    try {
      localStorage.setItem('dananty_active_reciter', id);
    } catch {}
  };

  const handleToggleApplyAll = (enabled: boolean) => {
    setApplyToAllSubjects(enabled);
    try {
      localStorage.setItem('dananty_apply_audio_all_subjects', JSON.stringify(enabled));
    } catch {}
  };

  // Hadith Filter & Search State
  const [hadithSearch, setHadithSearch] = useState<string>('');
  const [selectedHadithCollection, setSelectedHadithCollection] = useState<string>('all');
  const [selectedHadithCategory, setSelectedHadithCategory] = useState<string>('all');

  // Subjects Filter State
  const [subjectCategoryFilter, setSubjectCategoryFilter] = useState<string>('all');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

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
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(85000);
  const [cashBalance, setCashBalance] = useState<number>(0);
  const [businessAssets, setBusinessAssets] = useState<number>(0);
  const [debtsDue, setDebtsDue] = useState<number>(0);
  const [currencySymbol, setCurrencySymbol] = useState<string>('₦');

  // Islamic Studies Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  // Active Riwayah and Reciter Metadata
  const currentRiwayah = getRiwayahById(activeRiwayahId);
  const currentReciter = getReciterById(activeReciterId);

  // Load active surah data
  useEffect(() => {
    let isMounted = true;
    setIsLoadingSurah(true);

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

  // Bookmarks handler
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
  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Audio Playback Helpers
  const playSurahAudio = (surahNum: number) => {
    const isThisPlaying =
      audioState.isPlaying &&
      audioState.currentTrack?.type === 'quran' &&
      audioState.currentTrack?.surahNumber === surahNum &&
      !audioState.currentTrack?.ayahNumber;

    if (isThisPlaying) {
      islamicAudioService.togglePlayPause();
      return;
    }

    const surah = ALL_SURAHS.find((s) => s.number === surahNum);
    const audioUrl = getSurahAudioUrl(surahNum, activeReciterId);

    const track: AudioTrackInfo = {
      id: `surah-${surahNum}`,
      type: 'quran',
      title: `Surah ${surah?.transliteration || surahNum} (${surah?.name})`,
      subtitle: `${currentRiwayah.nameArabic} • ${currentReciter.nameEnglish}`,
      riwayahId: activeRiwayahId,
      reciterId: activeReciterId,
      audioUrl,
      surahNumber: surahNum,
    };

    islamicAudioService.playQuran(track);
    if (onEarnXp) onEarnXp(15);
  };

  const playAyahAudio = (surahNum: number, ayahNum: number) => {
    const isThisPlaying =
      audioState.isPlaying &&
      audioState.currentTrack?.type === 'quran' &&
      audioState.currentTrack?.surahNumber === surahNum &&
      audioState.currentTrack?.ayahNumber === ayahNum;

    if (isThisPlaying) {
      islamicAudioService.togglePlayPause();
      return;
    }

    const surah = ALL_SURAHS.find((s) => s.number === surahNum);
    const audioUrl = getAyahAudioUrl(surahNum, ayahNum, activeReciterId);

    const track: AudioTrackInfo = {
      id: `ayah-${surahNum}-${ayahNum}`,
      type: 'quran',
      title: `${surah?.transliteration || 'Surah'} ${surahNum}:${ayahNum}`,
      subtitle: `${currentRiwayah.nameEnglish} • ${currentReciter.nameEnglish}`,
      riwayahId: activeRiwayahId,
      reciterId: activeReciterId,
      audioUrl,
      surahNumber: surahNum,
      ayahNumber: ayahNum,
    };

    islamicAudioService.playQuran(track);
  };

  const playHadithAudio = (hadith: HadithItem) => {
    const isThisPlaying =
      audioState.isPlaying &&
      audioState.currentTrack?.id === `hadith-${hadith.id}`;

    if (isThisPlaying) {
      islamicAudioService.togglePlayPause();
      return;
    }

    const track: AudioTrackInfo = {
      id: `hadith-${hadith.id}`,
      type: 'hadith',
      title: hadith.title,
      subtitle: `${hadith.collectionTitle} • ${currentRiwayah.nameArabic} Pronunciation`,
      arabicText: hadith.arabic,
      englishText: `Translation: ${hadith.english}. Narrated by ${hadith.narrator}. Lessons: ${hadith.keyLessons.join('. ')}`,
      riwayahId: activeRiwayahId,
      reciterId: activeReciterId,
    };

    islamicAudioService.playSpeechOrAudio(track, 'arabic-then-english');
    if (onEarnXp) onEarnXp(15);
  };

  const playSubjectLessonAudio = (subject: IslamicSubjectModule) => {
    const isThisPlaying =
      audioState.isPlaying &&
      audioState.currentTrack?.id === `subject-${subject.id}`;

    if (isThisPlaying) {
      islamicAudioService.togglePlayPause();
      return;
    }

    // If an embedded Quranic verse is present, play it with the chosen Reciter and Riwayah
    let audioUrl: string | undefined = undefined;
    if (subject.audioVerseRef) {
      audioUrl = getAyahAudioUrl(subject.audioVerseRef.surah, subject.audioVerseRef.ayah, activeReciterId);
    }

    const track: AudioTrackInfo = {
      id: `subject-${subject.id}`,
      type: 'subject',
      title: subject.title,
      subtitle: `${subject.category} • Voice: ${currentReciter.nameEnglish} (${currentRiwayah.nameArabic})`,
      arabicText: subject.arabicKeyText || subject.arabicTitle,
      englishText: `${subject.title}. ${subject.englishExplanation}. Key Principles: ${subject.corePrinciples.map((p) => `${p.heading}: ${p.details}`).join('. ')}`,
      audioUrl: audioUrl,
      riwayahId: activeRiwayahId,
      reciterId: activeReciterId,
    };

    if (audioUrl) {
      islamicAudioService.playQuran(track);
    } else {
      islamicAudioService.playSpeechOrAudio(track, 'arabic-then-english');
    }
    if (onEarnXp) onEarnXp(20);
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

  // Filtered Hadiths
  const filteredHadiths = ALL_HADITHS.filter((h) => {
    const query = hadithSearch.toLowerCase().trim();
    const matchesQuery =
      query === '' ||
      h.title.toLowerCase().includes(query) ||
      h.english.toLowerCase().includes(query) ||
      h.narrator.toLowerCase().includes(query) ||
      h.arabic.includes(query);

    if (!matchesQuery) return false;
    if (selectedHadithCollection !== 'all' && h.collection !== selectedHadithCollection) return false;
    if (selectedHadithCategory !== 'all' && h.category !== selectedHadithCategory) return false;
    return true;
  });

  // Filtered Subjects
  const filteredSubjects = ISLAMIC_CURRICULUM_SUBJECTS.filter((s) => {
    if (subjectCategoryFilter === 'all') return true;
    return s.category === subjectCategoryFilter;
  });

  // Calculate Zakat
  const goldValue = goldGrams * goldPricePerGram;
  const totalWealth = cashBalance + goldValue + businessAssets - debtsDue;
  const nisabThreshold = 85 * goldPricePerGram;
  const isZakatEligible = totalWealth >= nisabThreshold;
  const zakatDue = isZakatEligible ? totalWealth * 0.025 : 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] pb-28">
      {/* Ornate Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 border-b border-emerald-800/60 sticky top-0 z-30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700/80 border border-emerald-400/40 flex items-center justify-center text-emerald-200 shadow-md">
              <BookOpen className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Al-Qur'an al-Kareem & Islamic Studies Hub
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Universal Deen
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-['Amiri',serif] tracking-wider text-right sm:text-left">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • المصحف الشريف والحديث والعلوم الشرعية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Riwayah & Voice Button */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-700/50 hover:bg-emerald-600/70 text-emerald-100 border border-emerald-500/50 flex items-center gap-1.5 transition shadow-sm"
              title="Change Riwayah and Reciter Voice"
            >
              <Radio className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline font-['Amiri',serif] text-sm">
                {currentRiwayah.nameArabic}
              </span>
              <span className="hidden md:inline text-slate-300 text-[10px]">
                ({currentReciter.nameEnglish})
              </span>
              <span className="sm:hidden">Riwayah & Voice</span>
            </button>

            <button
              onClick={() =>
                onAskAITutor(
                  'Please explain the core teachings of Islam, the Holy Quran, and the authentic Sunnah in detail.',
                  'Islamic Studies Overview'
                )
              }
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Ask Islamic AI Tutor</span>
              <span className="sm:hidden">AI Tutor</span>
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
            <span>Hadith Library (كتب الحديث)</span>
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'subjects'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookCheck className="w-3.5 h-3.5" />
            <span>All Islamic Subjects (العلوم الشرعية)</span>
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
            <span>Salah & Wudu (الصلاة والوضوء)</span>
          </button>

          <button
            onClick={() => setActiveTab('tajweed-riwayat')}
            className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'tajweed-riwayat'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tajweed & 10 Qira'at (التجويد والقراءات)</span>
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
            <span>Islamic CBT Exam</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
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
                      surahFilter === 'all'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    All (114)
                  </button>
                  <button
                    onClick={() => setSurahFilter('juz30')}
                    className={`px-2 py-1 rounded-lg font-medium transition ${
                      surahFilter === 'juz30'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Juz 'Amma (78-114)
                  </button>
                  <button
                    onClick={() => setSurahFilter('Meccan')}
                    className={`px-2 py-1 rounded-lg font-medium transition ${
                      surahFilter === 'Meccan'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Meccan (Makki)
                  </button>
                  <button
                    onClick={() => setSurahFilter('Medinan')}
                    className={`px-2 py-1 rounded-lg font-medium transition ${
                      surahFilter === 'Medinan'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
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
              {surahContent && (
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-sm">
                  {/* Surah Header & Control Bar */}
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
                    {/* Audio Recitation Player with Chosen Reciter */}
                    <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
                      <button
                        onClick={() => playSurahAudio(surahContent.meta.number)}
                        className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-emerald-200"
                      >
                        {audioState.isPlaying &&
                        audioState.currentTrack?.type === 'quran' &&
                        audioState.currentTrack?.surahNumber === surahContent.meta.number &&
                        !audioState.currentTrack?.ayahNumber ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-emerald-400" />
                            <span>Pause Recitation</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-emerald-400" />
                            <span>Play Full Surah</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setIsVoiceModalOpen(true)}
                        className="text-[10px] text-amber-300 hover:text-amber-200 border-l border-slate-700 pl-2 font-medium flex items-center gap-1"
                        title="Change voice or narration"
                      >
                        <span>{currentReciter.nameEnglish}</span>
                        <span className="text-slate-400">({currentRiwayah.nameArabic})</span>
                      </button>
                    </div>

                    {/* Font Size & Display Toggles */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-slate-900/80 rounded-xl border border-slate-700 p-0.5">
                        <button
                          onClick={() => setArabicFontSize((prev) => Math.max(20, prev - 2))}
                          className="px-2 py-1 text-slate-300 hover:text-white font-bold"
                          title="Decrease Arabic text size"
                        >
                          A-
                        </button>
                        <span className="px-1 text-[11px] text-slate-400">{arabicFontSize}px</span>
                        <button
                          onClick={() => setArabicFontSize((prev) => Math.min(42, prev + 2))}
                          className="px-2 py-1 text-slate-300 hover:text-white font-bold"
                          title="Increase Arabic text size"
                        >
                          A+
                        </button>
                      </div>

                      <button
                        onClick={() => setShowTranslation((prev) => !prev)}
                        className={`px-2.5 py-1.5 rounded-xl border font-bold text-[11px] transition ${
                          showTranslation
                            ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500/40'
                            : 'bg-slate-900 text-slate-400 border-slate-700'
                        }`}
                      >
                        Translation
                      </button>

                      <button
                        onClick={() => setShowTransliteration((prev) => !prev)}
                        className={`px-2.5 py-1.5 rounded-xl border font-bold text-[11px] transition ${
                          showTransliteration
                            ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500/40'
                            : 'bg-slate-900 text-slate-400 border-slate-700'
                        }`}
                      >
                        Translit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bismillah Banner */}
              {surahContent?.bismillahPre && (
                <div className="text-center py-6 px-4 bg-slate-800/50 border border-slate-700/60 rounded-2xl shadow-sm">
                  <div className="font-['Amiri',serif] text-2xl sm:text-3xl text-emerald-300 tracking-wider">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                  <div className="text-xs text-slate-400 mt-1 italic">
                    In the name of Allah, the Entirely Merciful, the Especially Merciful
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isLoadingSurah && (
                <div className="p-12 text-center text-slate-400 text-xs">
                  <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  Loading Surah text and authentic narrations...
                </div>
              )}

              {/* Verses List */}
              {surahContent && !isLoadingSurah && (
                <div className="space-y-3">
                  {surahContent.verses.map((ayah) => {
                    const ayahKey = `${surahContent.meta.number}:${ayah.numberInSurah}`;
                    const isBookmarked = bookmarkedVerses.includes(ayahKey);
                    const isAyahPlaying =
                      audioState.isPlaying &&
                      audioState.currentTrack?.type === 'quran' &&
                      audioState.currentTrack?.surahNumber === surahContent.meta.number &&
                      audioState.currentTrack?.ayahNumber === ayah.numberInSurah;

                    return (
                      <div
                        key={ayah.numberInSurah}
                        id={`ayah-${ayah.numberInSurah}`}
                        className={`p-4 sm:p-5 rounded-2xl border transition ${
                          isAyahPlaying
                            ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md'
                            : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-650'
                        }`}
                      >
                        {/* Ayah Action Header */}
                        <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5 mb-3">
                          <span className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300 font-bold text-xs flex items-center justify-center">
                            {ayah.numberInSurah}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {/* Play Verse Recitation in Active Riwayah Voice */}
                            <button
                              onClick={() => playAyahAudio(surahContent.meta.number, ayah.numberInSurah)}
                              className={`p-1.5 rounded-lg border transition ${
                                isAyahPlaying
                                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                                  : 'bg-slate-900 border-slate-700 text-emerald-400 hover:text-emerald-300'
                              }`}
                              title={`Listen to verse in ${currentRiwayah.nameEnglish} by ${currentReciter.nameEnglish}`}
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
                                handleCopyText(
                                  `${ayah.arabic}\n\n${ayah.translation}\n(${surahContent.meta.transliteration} ${surahContent.meta.number}:${ayah.numberInSurah})`,
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
                              <span className="hidden sm:inline">Tafsir</span>
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
        {/* TAB 2: HADITH LIBRARY & VOICE LISTENING              */}
        {/* ==================================================== */}
        {activeTab === 'hadith' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    كُتُب الحَدِيثِ النَّبَوِيِّ الشَّرِيفِ
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Voice & Audio Enabled
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Hadith Reader & Audio Hub
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Explore canonical traditions from <strong>The 40 Hadith of An-Nawawi</strong>, <strong>Sahih al-Bukhari</strong>, <strong>Sahih Muslim</strong>, and <strong>Riyad as-Salihin</strong>. Listen to any Hadith in your selected Arabic narration and English translation.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-emerald-800/60 hover:bg-emerald-700/60 border border-emerald-500/40 text-xs font-bold text-emerald-200 flex items-center gap-2 transition"
                >
                  <Headphones className="w-4 h-4 text-emerald-300" />
                  <span>Voice Settings</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={hadithSearch}
                  onChange={(e) => setHadithSearch(e.target.value)}
                  placeholder="Search Hadith by title, narrator, text, or lesson..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Collection Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedHadithCollection}
                  onChange={(e) => setSelectedHadithCollection(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="all">All Hadith Collections ({ALL_HADITHS.length})</option>
                  <option value="nawawi40">40 Hadith An-Nawawi</option>
                  <option value="bukhari">Sahih al-Bukhari</option>
                  <option value="muslim">Sahih Muslim</option>
                  <option value="riyad">Riyad as-Salihin</option>
                </select>

                <select
                  value={selectedHadithCategory}
                  onChange={(e) => setSelectedHadithCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="all">All Topics</option>
                  <option value="Faith & Tawhid">Faith & Tawhid</option>
                  <option value="Manners & Character">Manners & Character</option>
                  <option value="Salah & Purification">Salah & Purification</option>
                  <option value="Knowledge & Wisdom">Knowledge & Wisdom</option>
                  <option value="Sincerity & Intentions">Sincerity & Intentions</option>
                  <option value="Charity & Social Justice">Charity & Social Justice</option>
                  <option value="Dhikr & Dua">Dhikr & Dua</option>
                </select>
              </div>
            </div>

            {/* Hadiths Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredHadiths.map((hadith) => {
                const isPlaying =
                  audioState.isPlaying &&
                  audioState.currentTrack?.id === `hadith-${hadith.id}`;

                return (
                  <div
                    key={hadith.id}
                    className={`bg-slate-800/80 border rounded-2xl p-5 shadow-sm space-y-4 transition ${
                      isPlaying
                        ? 'border-emerald-500 ring-1 ring-emerald-500/50 bg-emerald-950/40'
                        : 'border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-700/70 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                          {hadith.collectionTitle}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          #{hadith.numberInCollection}
                        </span>
                      </div>

                      <span className="text-[11px] text-amber-300 font-semibold">
                        {hadith.grade}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">{hadith.title}</h3>
                      <div className="text-xs text-slate-400">
                        Narrated by <strong>{hadith.narrator}</strong> • {hadith.chapter}
                      </div>
                    </div>

                    {/* Arabic Text with Tashkeel */}
                    <div
                      dir="rtl"
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-['Amiri',serif] text-base text-right text-emerald-100 leading-relaxed"
                    >
                      {hadith.arabic}
                    </div>

                    {/* English Translation */}
                    <div className="text-xs text-slate-200 leading-relaxed">
                      <strong className="text-emerald-300 block mb-1">Translation:</strong>
                      "{hadith.english}"
                    </div>

                    {/* Key Lessons */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                      <div className="font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Key Lessons & Prophetic Guidance:</span>
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

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                      {/* Audio Play Button */}
                      <button
                        onClick={() => playHadithAudio(hadith)}
                        className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-xs transition ${
                          isPlaying
                            ? 'bg-emerald-500 text-slate-950 font-black'
                            : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40'
                        }`}
                        title="Listen to this Hadith in selected voice and translation"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-slate-950" />
                            <span>Pause Audio</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-emerald-400" />
                            <span>Listen to Hadith</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleCopyText(
                              `${hadith.title}\n\nArabic:\n${hadith.arabic}\n\nEnglish:\n"${hadith.english}"\n\nReference: ${hadith.reference}`,
                              hadith.id
                            )
                          }
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition"
                          title="Copy Hadith"
                        >
                          {copiedKey === hadith.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            onAskAITutor(
                              `Please explain this Hadith in depth: "${hadith.title}" (${hadith.reference}). Explain the Arabic keywords, theological and jurisprudential lessons, and how to practice it daily.`,
                              hadith.title
                            )
                          }
                          className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] font-bold text-emerald-300 hover:bg-slate-800 transition flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>Sharh / AI Tafsir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: ALL ISLAMIC CURRICULUM SUBJECTS               */}
        {/* ==================================================== */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border border-emerald-800/60 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-3xl">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  المَنْهَجُ الشَّامِلُ لِلعُلُومِ الإِسْلَامِيَّةِ
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  All Islamic Studies Curriculum Hub
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Comprehensive academic subjects spanning <strong>Fiqh</strong>, <strong>Aqeedah & Tawhid</strong>, <strong>Ulum al-Qur'an</strong>, <strong>Mustalah al-Hadith</strong>, <strong>Seerah & History</strong>, and <strong>Akhlaq</strong>. Complete with vocal audio narrations matching your selected voice.
                </p>
              </div>

              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-800/70 hover:bg-emerald-700 border border-emerald-500/40 text-xs font-bold text-emerald-100 flex items-center gap-2 transition"
              >
                <Radio className="w-4 h-4 text-amber-300" />
                <span>Voice: {currentReciter.nameEnglish}</span>
              </button>
            </div>

            {/* Subject Categories Bar */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'all', label: 'All Subjects (All)' },
                { id: 'Fiqh', label: 'Fiqh (Jurisprudence)' },
                { id: 'Aqeedah', label: 'Aqeedah & Tawhid (Theology)' },
                { id: 'Ulum-al-Quran', label: 'Ulum al-Qur\'an (Quranic Sciences)' },
                { id: 'Hadith-Sciences', label: 'Mustalah al-Hadith (Hadith Sciences)' },
                { id: 'Seerah-History', label: 'Seerah & Caliphs (History)' },
                { id: 'Akhlaq-Adab', label: 'Akhlaq & Adab (Character)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSubjectCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition ${
                    subjectCategoryFilter === cat.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Subjects Modules List */}
            <div className="space-y-6">
              {filteredSubjects.map((subject) => {
                const isPlaying =
                  audioState.isPlaying &&
                  audioState.currentTrack?.id === `subject-${subject.id}`;

                return (
                  <div
                    key={subject.id}
                    className={`bg-slate-800/80 border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 transition ${
                      isPlaying
                        ? 'border-emerald-500 ring-1 ring-emerald-500/40 bg-emerald-950/30'
                        : 'border-slate-700/80'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/70 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900 text-emerald-400 border border-slate-700">
                            {subject.code}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {subject.badge}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-white mt-1">
                          {subject.title}
                        </h3>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="font-['Amiri',serif] text-xl font-bold text-emerald-300">
                          {subject.arabicTitle}
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {subject.summary}
                    </p>

                    {/* Scriptural Evidence Key Text (with Riwayah recitation audio) */}
                    {subject.arabicKeyText && (
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-900/60 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[11px] font-bold text-amber-300">
                            {subject.audioVerseRef ? subject.audioVerseRef.label : 'Foundational Scriptural Evidence'}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-['Amiri',serif]">
                            {currentRiwayah.nameArabic}
                          </span>
                        </div>

                        <div
                          dir="rtl"
                          className="font-['Amiri',serif] text-lg text-right text-emerald-100 leading-relaxed py-1"
                        >
                          {subject.arabicKeyText}
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    <div className="text-xs text-slate-200 leading-relaxed">
                      {subject.englishExplanation}
                    </div>

                    {/* Core Principles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {subject.corePrinciples.map((principle, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-emerald-300">
                              {principle.heading}
                            </h4>
                            {principle.arabicTerm && (
                              <span className="font-['Amiri',serif] text-xs text-amber-200">
                                {principle.arabicTerm}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {principle.details}
                          </p>
                          {principle.evidence && (
                            <div className="text-[10px] text-emerald-400/90 italic pt-1 border-t border-slate-800">
                              Evidence: {principle.evidence}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Practical Application */}
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-slate-200 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300">Practical Daily Application:</strong>{' '}
                        <span>{subject.practicalApplication}</span>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-700/60 text-xs">
                      {/* Listen to lesson in chosen voice */}
                      <button
                        onClick={() => playSubjectLessonAudio(subject)}
                        className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                          isPlaying
                            ? 'bg-emerald-500 text-slate-950 font-black'
                            : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40'
                        }`}
                        title="Listen to this lesson and Quranic evidence in your selected voice"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-slate-950" />
                            <span>Pause Lesson Audio</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-emerald-400" />
                            <span>Listen to Lesson ({currentReciter.nameEnglish})</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onAskAITutor(
                              `Please provide an in-depth lesson on ${subject.title} (${subject.arabicTitle}). Cover the jurisprudential details, scholarly differences among the 4 Madhabs, and common contemporary questions.`,
                              subject.title
                            )
                          }
                          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300 font-bold hover:bg-slate-800 transition flex items-center gap-1.5"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                          <span>Ask Islamic AI Tutor</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: SALAH & WUDU GUIDE                            */}
        {/* ==================================================== */}
        {activeTab === 'salah-pillars' && (
          <div className="space-y-6">
            {/* Daily Prayers Table */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>The Five Obligatory Daily Prayers (الصلوات الخمس)</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 mb-4">
                Salah is the second pillar of Islam and the primary link between a servant and Allah.
              </p>

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
                        <td className="py-2.5 px-3 text-slate-300">
                          {item.sunnahBefore > 0 ? `${item.sunnahBefore} Rak'ahs` : '—'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300">
                          {item.sunnahAfter > 0 ? `${item.sunnahAfter} Rak'ahs` : '—'}
                        </td>
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

            {/* Wudu Protocol */}
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
        {/* TAB 5: TAJWEED & RIWAYAT GUIDE                       */}
        {/* ==================================================== */}
        {activeTab === 'tajweed-riwayat' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-white">
                    Tajweed Rules & The 10 Mutawatir Qira'at (أحكام التجويد والقراءات)
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Tajweed ensures every letter is articulated with precision from its correct point of articulation (Makhraj) and intrinsic quality (Sifah).
                  </p>
                </div>

                <button
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-700/50 hover:bg-emerald-600 text-xs font-bold text-white border border-emerald-500/40 flex items-center gap-1.5 transition shrink-0"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Switch Riwayah Mode</span>
                </button>
              </div>
            </div>

            {/* Riwayat Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_RIWAYAT.map((riwayah) => (
                <div
                  key={riwayah.id}
                  className={`p-4 rounded-2xl border transition ${
                    activeRiwayahId === riwayah.id
                      ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500/50'
                      : 'bg-slate-800/80 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{riwayah.nameEnglish}</span>
                    <span className="font-['Amiri',serif] text-base text-emerald-300 font-bold">
                      {riwayah.nameArabic}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1 mb-2">
                    <div><strong>Qari & Rawi:</strong> {riwayah.readerEnglish} / {riwayah.rawiEnglish}</div>
                    <div><strong>Regions:</strong> {riwayah.primaryRegions}</div>
                  </div>

                  <div className="text-[11px] text-amber-300 font-bold mb-1">Key Phonetic Nuances:</div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {riwayah.keyPhoneticRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tajweed Modules */}
            <div className="space-y-6 pt-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Fundamental Tajweed Rules</span>
              </h3>

              {TAJWEED_MODULES.map((module, idx) => (
                <div key={idx} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <h4 className="text-base font-bold text-white">{module.title}</h4>
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCopyText(`${dua.title}\n${dua.arabic}\n${dua.translation}`, dua.id)
                        }
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
                      >
                        {copiedKey === dua.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
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

      {/* Riwayah and Reciter Voice Selection Modal */}
      <RiwayahVoiceSelectorModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        activeRiwayahId={activeRiwayahId}
        activeReciterId={activeReciterId}
        onSelectRiwayah={handleSelectRiwayah}
        onSelectReciter={handleSelectReciter}
        applyToAllSubjects={applyToAllSubjects}
        onToggleApplyToAllSubjects={handleToggleApplyAll}
      />

      {/* Persistent Global Audio Player Bar */}
      <IslamicGlobalAudioPlayer onOpenVoiceModal={() => setIsVoiceModalOpen(true)} />
    </div>
  );
}
