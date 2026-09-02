import React from 'react';
import {
  GraduationCap,
  X,
  Check,
  Sparkles,
  BookOpen,
  ArrowRight,
  School,
} from 'lucide-react';
import { ClassLevel, CLASS_LEVELS } from '../types';

interface ClassSelectorModalProps {
  isOpen: boolean;
  currentClass?: ClassLevel;
  onSelectClass: (classId: ClassLevel) => void;
  onClose: () => void;
}

export function ClassSelectorModal({
  isOpen,
  currentClass = 'sss',
  onSelectClass,
  onClose,
}: ClassSelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-teal-600 text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold font-['Outfit',sans-serif]">
                  Choose Your Academic Class
                </h2>
                <p className="text-xs text-indigo-100 mt-0.5">
                  Tailors topics, difficulty, and study recommendations to your educational level
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Classes List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Select your grade / learning track:
          </p>

          <div className="space-y-2.5">
            {CLASS_LEVELS.map((c) => {
              const isSelected = currentClass === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectClass(c.id);
                    onClose();
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3.5 group ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl shrink-0 p-1 bg-white rounded-xl border border-slate-200/80 shadow-2xs group-hover:scale-110 transition-transform">
                    {c.icon}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-sm sm:text-base font-bold font-['Outfit',sans-serif] ${isSelected ? 'text-indigo-950' : 'text-slate-900'}`}>
                        {c.name}
                      </h3>
                      {isSelected ? (
                        <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-extrabold rounded-md flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Selected
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 group-hover:text-indigo-600 transition-colors">
                          Select &rarr;
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-indigo-600 mt-0.5">
                      {c.gradeRange}
                    </div>

                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            You can switch your class anytime from the top bar.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
