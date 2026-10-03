import React, { useState, useMemo } from 'react';
import {
  X,
  Volume2,
  Check,
  Globe,
  Award,
  Sparkles,
  BookOpen,
  Info,
  Radio,
  Play,
  Pause,
  Search,
  Mic,
  Sliders,
  Compass,
} from 'lucide-react';
import {
  ALL_QIRAAT,
  ALL_RIWAYAT,
  ALL_RECITERS,
  QiraahId,
  RiwayahId,
  QiraahMeta,
  RiwayahMeta,
  ReciterVoiceMeta,
  getQiraahById,
  getRiwayahById,
  getQiraahForRiwayah,
  getAllRecitersIncludingUserVoices,
  searchQiraatAndRiwayat,
} from '../data/riwayahAndVoices';

interface RiwayahVoiceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRiwayahId: RiwayahId;
  activeQiraahId?: QiraahId;
  activeReciterId: string;
  onSelectRiwayah: (id: RiwayahId) => void;
  onSelectQiraah?: (id: QiraahId) => void;
  onSelectReciter: (id: string) => void;
  applyToAllSubjects: boolean;
  onToggleApplyToAllSubjects: (enabled: boolean) => void;
  onOpenRecordStudio?: () => void;
}

export function RiwayahVoiceSelectorModal({
  isOpen,
  onClose,
  activeRiwayahId,
  activeQiraahId,
  activeReciterId,
  onSelectRiwayah,
  onSelectQiraah,
  onSelectReciter,
  applyToAllSubjects,
  onToggleApplyToAllSubjects,
  onOpenRecordStudio,
}: RiwayahVoiceSelectorModalProps) {
  const [selectedTab, setSelectedTab] = useState<'qiraat' | 'riwayat' | 'voices' | 'guide'>('qiraat');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [qiraahCategoryFilter, setQiraahCategoryFilter] = useState<'all' | 'shatibiyyah' | 'durrah'>('all');
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  const [playingReciterId, setPlayingReciterId] = useState<string | null>(null);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentRiwayah = getRiwayahById(activeRiwayahId);
  const currentQiraah = activeQiraahId ? getQiraahById(activeQiraahId) : getQiraahForRiwayah(activeRiwayahId);
  const allReciters = getAllRecitersIncludingUserVoices();
  const currentReciter = allReciters.find((r) => r.id === activeReciterId) || allReciters[0];

  // Perform multi-dimensional search
  const searchResults = useMemo(() => {
    return searchQiraatAndRiwayat(searchQuery);
  }, [searchQuery]);

  // Filter Qira'at by category
  const displayedQiraat = useMemo(() => {
    return searchResults.matchingQiraat.filter((q) => {
      if (qiraahCategoryFilter === 'shatibiyyah') return q.category.includes('Seven');
      if (qiraahCategoryFilter === 'durrah') return q.category.includes('Three');
      return true;
    });
  }, [searchResults.matchingQiraat, qiraahCategoryFilter]);

  // Reciters matching current Riwayah or all reciters
  const riwayahReciters = searchResults.matchingReciters.filter(
    (reciter) => reciter.riwayahId === activeRiwayahId
  );
  const otherReciters = searchResults.matchingReciters.filter(
    (reciter) => reciter.riwayahId !== activeRiwayahId
  );

  const handleTestReciterAudio = (reciter: ReciterVoiceMeta) => {
    if (playingReciterId === reciter.id && previewAudio) {
      previewAudio.pause();
      setPlayingReciterId(null);
      return;
    }

    if (previewAudio) {
      previewAudio.pause();
    }

    // Play Surah Al-Fatihah (Surah 1) sample from this reciter
    const sampleUrl = reciter.audioServerSurah(1);
    const audio = new Audio(sampleUrl);
    setPreviewAudio(audio);
    setPlayingReciterId(reciter.id);

    audio.play().catch(() => {
      setPlayingReciterId(null);
    });

    audio.onended = () => {
      setPlayingReciterId(null);
    };
  };

  const handleApplyQiraah = (qiraah: QiraahMeta) => {
    if (onSelectQiraah) onSelectQiraah(qiraah.id);
    const primaryRiwayahId = qiraah.riwayatIds[0];
    onSelectRiwayah(primaryRiwayahId);

    // Auto-select first matching reciter for that riwayah
    const matchingReciter = allReciters.find((r) => r.riwayahId === primaryRiwayahId) || allReciters[0];
    if (matchingReciter) onSelectReciter(matchingReciter.id);

    const riwayahMeta = getRiwayahById(primaryRiwayahId);
    showNotice(`Applied: ${qiraah.nameEnglish} (${riwayahMeta.nameEnglish})`);
  };

  const handleApplyRiwayah = (riwayah: RiwayahMeta) => {
    onSelectRiwayah(riwayah.id);
    if (onSelectQiraah) onSelectQiraah(riwayah.qiraahId);

    const matchingReciter = allReciters.find((r) => r.riwayahId === riwayah.id) || allReciters[0];
    if (matchingReciter) onSelectReciter(matchingReciter.id);

    showNotice(`Applied Riwayah: ${riwayah.nameEnglish} (${riwayah.nameArabic})`);
  };

  const handleApplyReciter = (reciter: ReciterVoiceMeta) => {
    onSelectReciter(reciter.id);
    onSelectRiwayah(reciter.riwayahId);
    if (onSelectQiraah) onSelectQiraah(reciter.qiraahId);

    showNotice(`Applied Voice: ${reciter.nameEnglish}`);
  };

  const showNotice = (msg: string) => {
    setAppliedNotification(msg);
    setTimeout(() => {
      setAppliedNotification(null);
    }, 2800);
  };

  const handleClose = () => {
    if (previewAudio) {
      previewAudio.pause();
    }
    setPlayingReciterId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-700/60 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 p-5 border-b border-emerald-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700/70 border border-emerald-400/40 flex items-center justify-center text-emerald-200 shadow-md">
              <Radio className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  The 10 Mutawatir Qira'at & 20 Riwayat Engine
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Universal Readings
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-['Amiri',serif]">
                اخْتَرْ قِرَاءَتَكَ وَرِوَايَتَكَ وَصَوْتَ القَارِئِ وَطَبِّقْهَا عَلَى كَافَّةِ المَوَادّ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenRecordStudio && (
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onOpenRecordStudio();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/40 font-bold text-xs transition"
              >
                <Mic className="w-3.5 h-3.5 text-rose-300" />
                <span>Record Studio</span>
              </button>
            )}

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Active Selection Bar & Sync */}
        <div className="bg-emerald-950/40 px-5 py-2.5 border-b border-emerald-800/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap text-slate-300">
            <span className="font-bold text-emerald-300">Active Reading:</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-900/60 border border-emerald-600/40 text-emerald-200 font-bold">
              {currentQiraah.nameEnglish} ({currentQiraah.city})
            </span>
            <span className="text-slate-400">•</span>
            <span className="px-2 py-0.5 rounded-md bg-teal-900/60 border border-teal-600/40 text-teal-200 font-medium">
              {currentRiwayah.nameArabic}
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-amber-200 font-medium">
              {currentReciter.nameEnglish} {currentReciter.countryFlag}
            </span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={applyToAllSubjects}
              onChange={(e) => onToggleApplyToAllSubjects(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-800 border-slate-700"
            />
            <span className="text-[11px] font-semibold text-emerald-300">
              Apply to Hadiths & Islamic subjects
            </span>
          </label>
        </div>

        {/* Search Bar Across All Qira'at, Riwayat & Reciters */}
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 px-5">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any Qira'ah, Riwayah, Imam, Rawi, Region (e.g. Nafi', Warsh, Hamzah, Sudan, Imalah, Idgham)..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Applied Notification Banner */}
        {appliedNotification && (
          <div className="bg-emerald-600 text-slate-950 font-black px-5 py-2 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{appliedNotification}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold bg-slate-950 text-emerald-300 px-2 py-0.5 rounded">
              Synced Across App
            </span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-5 text-xs font-bold gap-2 pt-2 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => setSelectedTab('qiraat')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              selectedTab === 'qiraat'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>The 10 Mutawatir Qira'at ({displayedQiraat.length})</span>
          </button>

          <button
            onClick={() => setSelectedTab('riwayat')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              selectedTab === 'riwayat'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>All 20 Riwayat Narrations ({searchResults.matchingRiwayat.length})</span>
          </button>

          <button
            onClick={() => setSelectedTab('voices')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              selectedTab === 'voices'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Reciter Voices & Audio ({searchResults.matchingReciters.length})</span>
          </button>

          <button
            onClick={() => setSelectedTab('guide')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              selectedTab === 'guide'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Qira'at Scholarly Guide</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-emerald-700">
          {/* TAB 1: ALL 10 MUTAWATIR QIRA'AT */}
          {selectedTab === 'qiraat' && (
            <div className="space-y-4">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="text-slate-400 font-bold text-[11px]">Filter Qira'at:</span>
                <button
                  type="button"
                  onClick={() => setQiraahCategoryFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    qiraahCategoryFilter === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  All 10 Qira'at ({ALL_QIRAAT.length})
                </button>
                <button
                  type="button"
                  onClick={() => setQiraahCategoryFilter('shatibiyyah')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    qiraahCategoryFilter === 'shatibiyyah'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  7 Shatibiyyah (The Primary Seven)
                </button>
                <button
                  type="button"
                  onClick={() => setQiraahCategoryFilter('durrah')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    qiraahCategoryFilter === 'durrah'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  3 Durrah (The Three Complementary)
                </button>
              </div>

              {/* Qira'at Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedQiraat.map((qiraah) => {
                  const isSelected = (activeQiraahId || currentQiraah.id) === qiraah.id;
                  const riwayat = ALL_RIWAYAT.filter((r) => qiraah.riwayatIds.includes(r.id));

                  return (
                    <div
                      key={qiraah.id}
                      className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-950/70 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                          : 'bg-slate-800/70 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black flex items-center justify-center">
                                {qiraah.canonicalOrder}
                              </span>
                              <h3 className="text-sm font-bold text-white">{qiraah.nameEnglish}</h3>
                            </div>
                            <div className="font-['Amiri',serif] text-sm text-emerald-300 font-bold mt-0.5">
                              {qiraah.nameArabic}
                            </div>
                          </div>

                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300 shrink-0">
                            {qiraah.city}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-300 space-y-1 mb-3">
                          <div>
                            <strong>Imam:</strong> {qiraah.imamEnglish} (d. {qiraah.deathYearAH} AH)
                          </div>
                          <div>
                            <strong>Sanad:</strong> {qiraah.historicalSanad}
                          </div>
                        </div>

                        {/* Two Canonical Riwayat */}
                        <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 mb-3">
                          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                            The 2 Canonical Riwayat (Transmitters):
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {riwayat.map((r) => (
                              <button
                                key={r.id}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplyRiwayah(r);
                                }}
                                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border transition ${
                                  activeRiwayahId === r.id
                                    ? 'bg-emerald-600 text-white border-emerald-400'
                                    : 'bg-slate-800 text-emerald-300 border-slate-700 hover:border-emerald-600'
                                }`}
                              >
                                {r.nameEnglish} ({r.rawiEnglish.split(',')[0].replace('Imam ', '')})
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400">
                          {qiraah.category}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleApplyQiraah(qiraah)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 font-black'
                              : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Active Qira'ah</span>
                            </>
                          ) : (
                            <span>Apply This Qira'ah</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ALL 20 RIWAYAT */}
          {selectedTab === 'riwayat' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-slate-300 leading-relaxed">
                <div className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-400" />
                  <span>The 20 Mutawatir Canonical Riwayat of the Holy Quran</span>
                </div>
                Every one of the 10 Imams has two primary certified transmitters (Rawis). Each Riwayah is authentic, continuous (Mutawatir), and preserved word-for-word. Clicking "Apply This Riwayah" updates the recitation audio, phonetic rules, and tajweed guidance across the entire platform.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.matchingRiwayat.map((riwayah) => {
                  const isSelected = activeRiwayahId === riwayah.id;
                  const parentQiraah = getQiraahById(riwayah.qiraahId);

                  return (
                    <div
                      key={riwayah.id}
                      className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-950/70 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                          : 'bg-slate-800/70 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-sm font-bold text-white">{riwayah.nameEnglish}</h3>
                            <div className="font-['Amiri',serif] text-sm text-emerald-300 font-bold mt-0.5">
                              {riwayah.nameArabic}
                            </div>
                          </div>

                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-teal-300 shrink-0">
                            {parentQiraah.nameEnglish}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-300 space-y-1 mb-2">
                          <div>
                            <strong>Transmitter (Rawi):</strong> {riwayah.rawiEnglish} (d. {riwayah.rawiDeathYearAH} AH)
                          </div>
                          <div>
                            <strong>Primary Regions:</strong> {riwayah.primaryRegions}
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3">
                          {riwayah.description}
                        </p>

                        <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider mb-1">
                          Key Phonetic Principles (الأصول):
                        </div>
                        <ul className="space-y-1 text-[11px] text-slate-300 mb-3">
                          {riwayah.keyPhoneticRules.slice(0, 3).map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span className="line-clamp-2">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400">{riwayah.origins}</span>

                        <button
                          type="button"
                          onClick={() => handleApplyRiwayah(riwayah)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 font-black'
                              : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Active Riwayah</span>
                            </>
                          ) : (
                            <span>Apply This Riwayah</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: RECITERS VOICES */}
          {selectedTab === 'voices' && (
            <div className="space-y-6">
              {/* Reciters in Current Riwayah */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Reciters for {currentRiwayah.nameEnglish} ({currentRiwayah.nameArabic})</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {riwayahReciters.length} verified voice{riwayahReciters.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {riwayahReciters.map((reciter) => {
                    const isSelected = activeReciterId === reciter.id;
                    const isTesting = playingReciterId === reciter.id;

                    return (
                      <div
                        key={reciter.id}
                        className={`p-4 rounded-2xl border transition relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-950/70 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                            : 'bg-slate-800/70 border-slate-700/80 hover:border-slate-600'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base">{reciter.countryFlag}</span>
                                <h4 className="text-sm font-bold text-white">{reciter.nameEnglish}</h4>
                              </div>
                              <div className="font-['Amiri',serif] text-xs text-emerald-300 mt-0.5">
                                {reciter.nameArabic}
                              </div>
                            </div>

                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                              {reciter.style}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3">
                            {reciter.bio}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                          {/* Sample Voice Test Button */}
                          <button
                            type="button"
                            onClick={() => handleTestReciterAudio(reciter)}
                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition ${
                              isTesting
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                            }`}
                          >
                            {isTesting ? (
                              <>
                                <Pause className="w-3 h-3 fill-amber-400" />
                                <span>Playing Sample...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 fill-emerald-400" />
                                <span>Preview Voice</span>
                              </>
                            )}
                          </button>

                          {/* Select Button */}
                          <button
                            type="button"
                            onClick={() => handleApplyReciter(reciter)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                              isSelected
                                ? 'bg-emerald-500 text-slate-950 font-black'
                                : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Active Voice</span>
                              </>
                            ) : (
                              <span>Choose This Voice</span>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Other Master Reciters across other Riwayat */}
              {otherReciters.length > 0 && (
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Other World Master Reciters (Across other Riwayat)</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {otherReciters.map((reciter) => {
                      const isSelected = activeReciterId === reciter.id;
                      const isTesting = playingReciterId === reciter.id;
                      const reciterRiwayah = getRiwayahById(reciter.riwayahId);

                      return (
                        <div
                          key={reciter.id}
                          className="p-4 rounded-2xl border bg-slate-850/60 border-slate-700/60 hover:border-slate-600 transition flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-base">{reciter.countryFlag}</span>
                                  <h4 className="text-sm font-bold text-white">{reciter.nameEnglish}</h4>
                                </div>
                                <div className="text-[11px] text-emerald-400 font-['Amiri',serif]">
                                  {reciter.nameArabic} • {reciterRiwayah.nameArabic}
                                </div>
                              </div>

                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300">
                                {reciterRiwayah.nameEnglish}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                              {reciter.bio}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                            <button
                              type="button"
                              onClick={() => handleTestReciterAudio(reciter)}
                              className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition ${
                                isTesting
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                              }`}
                            >
                              {isTesting ? <Pause className="w-3 h-3 fill-amber-400" /> : <Play className="w-3 h-3 fill-emerald-400" />}
                              <span>{isTesting ? 'Playing...' : 'Preview Voice'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleApplyReciter(reciter)}
                              className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 hover:bg-emerald-600/50 text-slate-200 border border-slate-700 transition"
                            >
                              Switch to Voice & Riwayah
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SCHOLARLY GUIDE */}
          {selectedTab === 'guide' && (
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/80 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>The Relationship Between Ahruf, Qira'at, and Riwayat</span>
                </h4>
                <p>
                  The Holy Quran was revealed by Allah ﷻ through the Angel Jibreel to the Prophet Muhammad ﷺ in seven authentic dialectical modes (الأحرف السبعة). These Ahruf accommodated the varied Arabic tribes and dialects while preserving one divine message.
                </p>
                <p>
                  During the Caliphate of Uthman ibn Affan (RA), the Quran was transcribed into standardized Master Copies (المصاحف العثمانية). The Ten Canonical Qira'at (القراءات العشر المتواترة) represent the mutawatir oral traditions that match the Uthmanic orthography, unbroken in chain back to the Prophet ﷺ.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-300">1. Qira'ah (القراءة):</div>
                  <p className="text-[11px] text-slate-400">
                    The total methodology and pronunciation rules of one of the 10 Master Readers (e.g. Qira'at Nafi', Qira'at Asim, Qira'at Abu 'Amr).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-300">2. Riwayah (الرواية):</div>
                  <p className="text-[11px] text-slate-400">
                    The specific transmission attributed to one of the two certified direct students (Rawis) of the Imam (e.g. Warsh from Nafi', Hafs from Asim).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
