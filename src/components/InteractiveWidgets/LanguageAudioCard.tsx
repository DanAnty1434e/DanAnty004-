import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Check, Globe } from 'lucide-react';

interface LanguageCardData {
  phrase: string;
  lang: string;
  translation: string;
  phonetic: string;
}

interface LanguageAudioCardProps {
  cards?: LanguageCardData[];
  title?: string;
  description?: string;
}

export function LanguageAudioCard({
  cards = [
    { phrase: '¡Hola! ¿Cómo estás?', lang: 'es-ES', translation: 'Hello! How are you?', phonetic: 'OH-lah KOH-moh ehs-TAHS' },
    { phrase: 'Bonjour, enchanté!', lang: 'fr-FR', translation: 'Hello, delighted to meet you!', phonetic: 'bohn-ZHOOR, ahn-shahn-TAY' },
    { phrase: 'Guten Tag, wie geht es Ihnen?', lang: 'de-DE', translation: 'Good day, how are you? (formal)', phonetic: 'GOO-ten tahk, vee gayt es EE-nen' },
    { phrase: 'Konnichiwa, hajimemashite', lang: 'ja-JP', translation: 'Hello, nice to meet you', phonetic: 'kohn-NEE-chee-wah, hah-jee-meh-MAH-shee-teh' }
  ],
  title = 'Interactive Pronunciation Flashcards',
  description = 'Listen to native pronunciations, observe phonetic breakdowns, and practice repeating aloud.'
}: LanguageAudioCardProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [slowRate, setSlowRate] = useState(false);
  const [practiced, setPracticed] = useState<number[]>([]);

  const current = cards[activeIdx] || cards[0];

  const speakPhrase = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = slowRate ? 0.7 : 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (!practiced.includes(activeIdx)) {
        setPracticed([...practiced, activeIdx]);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="my-6 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-violet-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-violet-100 text-violet-700 rounded-lg">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="toggle-slow-audio-btn"
            onClick={() => setSlowRate(!slowRate)}
            className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
              slowRate ? 'bg-violet-600 text-white border-violet-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🐢 Slow Audio: {slowRate ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {cards.map((card, idx) => (
          <button
            key={idx}
            id={`lang-tab-btn-${idx}`}
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeIdx === idx
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{card.phrase.split(' ')[0]}</span>
            {practiced.includes(idx) && <Check className="w-3 h-3 text-emerald-400" />}
          </button>
        ))}
      </div>

      {/* Active Card Main Showcase */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-500/10 border border-violet-200 text-center relative overflow-hidden">
        <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 bg-violet-100/80 px-2.5 py-0.5 rounded-full inline-block mb-3">
          {current.lang} • Global Dialect
        </span>

        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          {current.phrase}
        </h3>

        <div className="text-xs font-mono text-violet-700 bg-violet-100/50 inline-block px-3 py-1 rounded-lg mb-3">
          Phonetic: <span className="font-semibold">{current.phonetic}</span>
        </div>

        <p className="text-sm text-slate-600 italic mb-5">
          &ldquo;{current.translation}&rdquo;
        </p>

        <div className="flex justify-center items-center gap-3">
          <button
            id="speak-phrase-btn"
            onClick={() => speakPhrase(current.phrase, current.lang)}
            disabled={isSpeaking}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition shadow-md ${
              isSpeaking
                ? 'bg-violet-400 cursor-wait animate-pulse'
                : 'bg-violet-600 hover:bg-violet-700 active:scale-95'
            }`}
          >
            {isSpeaking ? <Volume2 className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Speaking...' : 'Listen to Native Audio'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
