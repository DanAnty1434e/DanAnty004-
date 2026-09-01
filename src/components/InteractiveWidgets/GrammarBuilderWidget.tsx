import React, { useState } from 'react';
import { PenTool, CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';

interface GrammarBuilderProps {
  data?: any;
  title?: string;
  description?: string;
}

export function GrammarBuilderWidget({
  data = {
    targetSentence: 'The curious scientist carefully observed the glowing specimen.',
    tokens: ['The curious', 'scientist', 'carefully', 'observed', 'the glowing', 'specimen'],
    roles: ['Adjective Phrase', 'Subject Noun', 'Adverb', 'Action Verb', 'Modifier', 'Object Noun']
  },
  title = 'Interactive Sentence Architect',
  description = 'Tap the syntactic tokens in correct grammatical sequence to assemble the target sentence.'
}: GrammarBuilderProps) {
  // Start with shuffled tokens
  const [available, setAvailable] = useState<string[]>(() => [...data.tokens].sort(() => 0.5 - Math.random()));
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (word: string) => {
    setSelected([...selected, word]);
    setAvailable(available.filter((w, i) => i !== available.indexOf(word)));
    setIsSubmitted(false);
  };

  const handleDeselect = (word: string) => {
    setAvailable([...available, word]);
    setSelected(selected.filter((w, i) => i !== selected.indexOf(word)));
    setIsSubmitted(false);
  };

  const handleReset = () => {
    setAvailable([...data.tokens].sort(() => 0.5 - Math.random()));
    setSelected([]);
    setIsSubmitted(false);
  };

  const constructed = selected.join(' ');
  const isCorrect = constructed.trim() === data.targetSentence.replace('.', '').trim();

  return (
    <div className="my-6 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-emerald-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>

        <button
          id="reset-grammar-btn"
          onClick={handleReset}
          className="flex items-center space-x-1 px-2.5 py-1 text-xs text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Assembly Area */}
      <div className="p-4 bg-emerald-50/50 rounded-xl border-2 border-dashed border-emerald-200 min-h-[70px] flex flex-wrap items-center gap-2 mb-4">
        {selected.length === 0 ? (
          <span className="text-xs text-emerald-600/70 italic select-none">
            Tap words below to organize the sentence structure...
          </span>
        ) : (
          selected.map((token, i) => (
            <button
              key={i}
              id={`selected-token-${i}`}
              onClick={() => handleDeselect(token)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition active:scale-95 flex items-center gap-1"
            >
              <span>{token}</span>
              <span className="text-[10px] text-emerald-200">×</span>
            </button>
          ))
        )}
      </div>

      {/* Word Pool */}
      <div className="space-y-2 mb-4">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Available Word Components</span>
        <div className="flex flex-wrap gap-2">
          {available.map((token, i) => (
            <button
              key={i}
              id={`available-token-${i}`}
              onClick={() => handleSelect(token)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 text-xs font-medium rounded-lg border border-slate-200 transition active:scale-95"
            >
              {token}
            </button>
          ))}
        </div>
      </div>

      {/* Check Answer */}
      {selected.length === data.tokens.length && (
        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isCorrect ? (
              <div className="flex items-center text-xs font-bold text-emerald-700 space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Excellent! Grammatically sound syntax!</span>
              </div>
            ) : (
              <div className="text-xs font-medium text-amber-700">
                Almost there! Check the order of Subject, Verb, and Modifiers.
              </div>
            )}
          </div>
          <button
            id="grammar-hint-btn"
            onClick={() => alert(`Target Sentence: "${data.targetSentence}"`)}
            className="text-xs text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Show Solution</span>
          </button>
        </div>
      )}
    </div>
  );
}
