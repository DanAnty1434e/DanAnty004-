import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, ArrowRight, Zap, Clock } from 'lucide-react';
import { CURRICULUM_DATA } from '../data/curriculum';
import { SubjectId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
  onSelectSubject: (subjectId: SubjectId) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectLesson,
  onSelectSubject,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allLessons = CURRICULUM_DATA.flatMap((s) =>
    s.lessons.map((l) => ({ ...l, subjectTitle: s.title, subjectGradient: s.gradient }))
  );

  const filteredLessons = query.trim()
    ? allLessons.filter(
        (l) =>
          l.title.toLowerCase().includes(query.toLowerCase()) ||
          l.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          l.subjectTitle.toLowerCase().includes(query.toLowerCase()) ||
          l.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : allLessons.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs font-sans animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            id="global-search-modal-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, formulas, grammar, python, spanish phrases..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {query ? `Search Results (${filteredLessons.length})` : 'Popular Curriculum Lessons'}
          </div>

          {filteredLessons.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching lessons found for &quot;{query}&quot;. Try searching for &quot;Grammar&quot;, &quot;Slope&quot;, &quot;Binary&quot;, or &quot;Spanish&quot;.
            </div>
          ) : (
            filteredLessons.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  onSelectLesson(l.id);
                  onClose();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-50 text-left transition flex items-center justify-between group gap-3 border border-transparent hover:border-slate-100"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {l.subjectTitle.split(' ')[0]} • {l.level}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {l.durationMinutes}m
                    </span>
                    <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-amber-500" /> +{l.xpReward} XP
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {l.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {l.subtitle}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
          <span>Tip: Use subjects dropdown or Cmd+K to jump anytime</span>
          <span className="font-mono text-[10px]">ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
