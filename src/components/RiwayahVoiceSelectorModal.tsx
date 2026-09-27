import React, { useState } from 'react';
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
} from 'lucide-react';
import {
  ALL_RIWAYAT,
  ALL_RECITERS,
  RiwayahId,
  RiwayahMeta,
  ReciterVoiceMeta,
} from '../data/riwayahAndVoices';

interface RiwayahVoiceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRiwayahId: RiwayahId;
  activeReciterId: string;
  onSelectRiwayah: (id: RiwayahId) => void;
  onSelectReciter: (id: string) => void;
  applyToAllSubjects: boolean;
  onToggleApplyToAllSubjects: (enabled: boolean) => void;
}

export function RiwayahVoiceSelectorModal({
  isOpen,
  onClose,
  activeRiwayahId,
  activeReciterId,
  onSelectRiwayah,
  onSelectReciter,
  applyToAllSubjects,
  onToggleApplyToAllSubjects,
}: RiwayahVoiceSelectorModalProps) {
  const [selectedTab, setSelectedTab] = useState<'voices' | 'riwayat' | 'guide'>('voices');
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  const [playingReciterId, setPlayingReciterId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentRiwayah = ALL_RIWAYAT.find((r) => r.id === activeRiwayahId) || ALL_RIWAYAT[0];
  const currentReciter = ALL_RECITERS.find((r) => r.id === activeReciterId) || ALL_RECITERS[0];

  // Reciters matching current Riwayah or all reciters
  const riwayahReciters = ALL_RECITERS.filter((reciter) => reciter.riwayahId === activeRiwayahId);
  const otherReciters = ALL_RECITERS.filter((reciter) => reciter.riwayahId !== activeRiwayahId);

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

  const handleClose = () => {
    if (previewAudio) {
      previewAudio.pause();
    }
    setPlayingReciterId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-700/60 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-5 border-b border-emerald-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700/70 border border-emerald-400/40 flex items-center justify-center text-emerald-200 shadow-md">
              <Radio className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Riwayah & Quran Voice Selector
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Universal Audio
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-['Amiri',serif]">
                اختر روايتك وصوت القارئ المفضل وتطبيقه على كافة المواد الإسلامية
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Synchronization Banner */}
        <div className="bg-emerald-950/40 px-5 py-3 border-b border-emerald-800/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-bold text-emerald-300">Active Choice:</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-900/60 border border-emerald-600/40 text-emerald-200 font-medium">
              {currentRiwayah.nameArabic} ({currentRiwayah.nameEnglish})
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
              Apply voice & narration to all Hadiths & Islamic subjects
            </span>
          </label>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-5 text-xs font-bold gap-2 pt-2">
          <button
            onClick={() => setSelectedTab('voices')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
              selectedTab === 'voices'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Select Reciter Voice ({ALL_RECITERS.length})</span>
          </button>

          <button
            onClick={() => setSelectedTab('riwayat')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
              selectedTab === 'riwayat'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Change Riwayah Narration ({ALL_RIWAYAT.length})</span>
          </button>

          <button
            onClick={() => setSelectedTab('guide')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
              selectedTab === 'guide'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Riwayah Transmission Guide</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-emerald-700">
          {/* TAB 1: RECITERS VOICES */}
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
                    {riwayahReciters.length} verified reciter{riwayahReciters.length > 1 ? 's' : ''}
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
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-750'
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
                            onClick={() => {
                              onSelectReciter(reciter.id);
                            }}
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

              {/* Other Renowned Voices (Auto-switches Riwayah if picked) */}
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
                      const reciterRiwayah = ALL_RIWAYAT.find((r) => r.id === reciter.riwayahId);

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
                                  {reciter.nameArabic} • {reciterRiwayah?.nameArabic}
                                </div>
                              </div>

                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300">
                                {reciterRiwayah?.nameEnglish}
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
                              onClick={() => {
                                onSelectRiwayah(reciter.riwayahId);
                                onSelectReciter(reciter.id);
                              }}
                              className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 hover:bg-emerald-600/50 text-slate-200 border border-slate-700 transition"
                            >
                              Switch to this Voice & Riwayah
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

          {/* TAB 2: RIWAYAT NARRATIONS */}
          {selectedTab === 'riwayat' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-slate-300 leading-relaxed">
                <div className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-400" />
                  <span>About the Mutawatir Riwayat of the Holy Quran</span>
                </div>
                The Quran was revealed in seven authentic dialectical modes (Ahruf) and preserved through the Ten Mutawatir Qira'at. Each Qari has two primary transmitters (Rawis). Selecting a Riwayah adjusts both the recitation acoustics, phonetic rules, and reciters.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_RIWAYAT.map((riwayah) => {
                  const isSelected = activeRiwayahId === riwayah.id;

                  return (
                    <div
                      key={riwayah.id}
                      onClick={() => {
                        onSelectRiwayah(riwayah.id);
                        // Auto-select first reciter of that riwayah
                        const matching = ALL_RECITERS.find((r) => r.riwayahId === riwayah.id);
                        if (matching) onSelectReciter(matching.id);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-950/70 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                          : 'bg-slate-800/70 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="text-sm font-bold text-white">{riwayah.nameEnglish}</h4>
                            <div className="font-['Amiri',serif] text-base text-emerald-300 font-bold mt-0.5">
                              {riwayah.nameArabic}
                            </div>
                          </div>

                          {isSelected && (
                            <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                              <Check className="w-4 h-4" />
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-300 mb-3">
                          <div>
                            <strong className="text-slate-400">Origins:</strong> {riwayah.origins}
                          </div>
                          <div>
                            <strong className="text-slate-400">Primary Regions:</strong> {riwayah.primaryRegions}
                          </div>
                          <p className="text-[11px] text-slate-300 pt-1 leading-relaxed">
                            {riwayah.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-700/60">
                        <div className="text-[10px] font-bold text-amber-300 mb-1">Distinctive Phonetic Features:</div>
                        <ul className="space-y-1 text-[11px] text-slate-300">
                          {riwayah.keyPhoneticRules.slice(0, 2).map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span className="line-clamp-1">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: TRANSMISSION GUIDE & HISTORY */}
          {selectedTab === 'guide' && (
            <div className="space-y-6">
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span>The Ten Qaris and Their Twenty Transmitters (القراء العشرة ورواتهم)</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The science of Qira'at represents the miraculous preservation of the Prophet's ﷺ recitation through unbroken, mass-transmitted chains of custody (Tawatur). Every single reading traced back to the Companions (Sahabah) who learned directly from the Messenger of Allah ﷺ.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-300 text-sm">1. Imam Nafi' al-Madani (Madinah)</div>
                  <p className="text-slate-300">
                    Transmitters: <strong>Qalun</strong> and <strong>Warsh</strong>. Recited throughout North and West Africa (Morocco, Algeria, Nigeria, Mauritania, Libya).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-300 text-sm">2. Imam 'Asim al-Kufi (Kufa)</div>
                  <p className="text-slate-300">
                    Transmitters: <strong>Shu'bah</strong> and <strong>Hafs</strong>. Hafs 'an 'Asim is the most widely recited narration across the globe today.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-300 text-sm">3. Imam Abu 'Amr al-Basri (Basra)</div>
                  <p className="text-slate-300">
                    Transmitters: <strong>Ad-Duri</strong> and <strong>As-Sousi</strong>. Prevalent in Sudan, Somalia, and East Africa.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-300 text-sm">4. Imam Ibn Kathir al-Makki (Makkah)</div>
                  <p className="text-slate-300">
                    Transmitters: <strong>Al-Bazzi</strong> and <strong>Qunbul</strong>. The classical recitation of the Holy City of Makkah.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Selected: <strong className="text-emerald-400">{currentRiwayah.nameEnglish}</strong> • <strong className="text-amber-300">{currentReciter.nameEnglish}</strong>
          </div>

          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
          >
            Confirm & Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
