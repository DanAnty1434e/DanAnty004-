import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  Calculator,
  Coins,
  Bot,
  User,
  Check,
  ArrowRight,
  Zap,
  Award,
  ShieldCheck,
  School,
  X,
  Heart,
  Globe,
} from 'lucide-react';
import { ClassLevel, CLASS_LEVELS } from '../types';

interface WelcomeAboutModalProps {
  isOpen: boolean;
  currentClass?: ClassLevel;
  onSelectClass: (classId: ClassLevel) => void;
  onClose: () => void;
  onOpenMathSolver?: () => void;
  onOpenArcade?: () => void;
}

export function WelcomeAboutModal({
  isOpen,
  currentClass = 'sss',
  onSelectClass,
  onClose,
  onOpenMathSolver,
  onOpenArcade,
}: WelcomeAboutModalProps) {
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(currentClass);
  const [activeTab, setActiveTab] = useState<'about' | 'creator' | 'class'>('about');

  if (!isOpen) return null;

  const handleSaveAndContinue = () => {
    onSelectClass(selectedClass);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-blue-600 text-white p-6 sm:p-7 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-xs text-white text-[11px] font-black uppercase tracking-wider rounded-full border border-white/20">
                  Welcome to DanAnty004 Academy
                </span>
                <span className="px-3 py-1 bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider rounded-full flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3 fill-slate-950" />
                  Official Platform
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif] tracking-tight">
                All-in-One Learning, Math Solver & Arcade
              </h1>

              <div className="flex items-center gap-2 pt-1 text-xs text-indigo-200 font-medium">
                <span className="bg-indigo-800/80 px-2.5 py-1 rounded-lg border border-indigo-500/50 text-white font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  Invented by Aliyu Kamal Hamid
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 transition-colors shrink-0"
              title="Close intro"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs inside Modal */}
          <div className="flex gap-2 mt-5 pt-3 border-t border-white/20">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'about'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              📖 What This Web Is About
            </button>
            <button
              onClick={() => setActiveTab('creator')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'creator'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              👑 Inventor: Aliyu Kamal Hamid
            </button>
            <button
              onClick={() => setActiveTab('class')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'class'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🎒 Choose Your Class
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: WHAT THE WEB IS ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 font-['Outfit',sans-serif]">
                  What is DanAnty004 Academy?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  DanAnty004 Academy is a next-generation interactive educational platform engineered to make mastering academics exciting, fast, and rewarding for students of all class levels.
                </p>
              </div>

              {/* 4 Pillars of the Web */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1.5">
                  <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs">
                    <Coins className="w-4 h-4 text-amber-500" />
                    <span>Study & Earn 20 Coins</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Read and complete any subject topic to earn <strong>+20 Coins</strong> and +35 XP directly into your student balance.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1.5">
                  <div className="flex items-center space-x-2 text-purple-700 font-bold text-xs">
                    <Gamepad2 className="w-4 h-4 text-purple-600" />
                    <span>15 Mini-Games Arcade</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Use your earned coins (10 coins/play) to compete in 15 speed & logic mini-games across math, science, and coding.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs">
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    <span>Ultra-Fast Math Solver</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Input any mathematical equation to receive instant answers with the exact <strong>Method Used</strong> and step-by-step proofs.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs">
                    <Bot className="w-4 h-4 text-amber-600" />
                    <span>Real-Time AI Tutor</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ask instant homework doubts in any subject with low-latency streaming and data-saver network compression.
                  </p>
                </div>
              </div>

              {/* Creator Card Preview */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-md">
                    AK
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                      Platform Creator & Inventor
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      Aliyu Kamal Hamid
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('creator')}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  View Profile &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CREATOR & INVENTOR SPOTLIGHT */}
          {activeTab === 'creator' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-gradient-to-br from-indigo-50 via-white to-amber-50/40 p-5 rounded-3xl border border-indigo-100 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-lg border-2 border-amber-400">
                    AK
                  </div>

                  <div>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider rounded-md">
                      Inventor & Lead Architect
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif] mt-0.5">
                      Aliyu Kamal Hamid
                    </h3>
                    <p className="text-xs text-slate-500">
                      Creator & Founder of DanAnty004 Academy
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-indigo-100 pt-3">
                  <p>
                    <strong>Aliyu Kamal Hamid</strong> is the inventor and developer of this web learning platform. He created DanAnty004 Academy with the mission of democratizing high-quality, modern education across science, mathematics, coding, and languages.
                  </p>
                  <p>
                    Aliyu engineered the platform to combine <strong>gamified rewards (Coins & Arcade)</strong>, <strong>instant symbolic mathematical solvers with verified method breakdowns</strong>, and <strong>low-data AI tutoring</strong> so every student can excel regardless of device or network speed.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="text-xs font-extrabold text-indigo-600">5 Tracks</div>
                    <div className="text-[10px] text-slate-500">Curricula</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="text-xs font-extrabold text-amber-600">15 Games</div>
                    <div className="text-[10px] text-slate-500">Arcade Arena</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="text-xs font-extrabold text-emerald-600">Instant</div>
                    <div className="text-[10px] text-slate-500">Math Solver</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHOOSE YOUR CLASS */}
          {activeTab === 'class' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Select Your School / Academic Class
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose your grade level to personalize recommended topics and mathematical difficulty:
                </p>
              </div>

              <div className="space-y-2">
                {CLASS_LEVELS.map((c) => {
                  const isSelected = selectedClass === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedClass(c.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl p-1 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                        {c.icon}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-900'}`}>
                            {c.name}
                          </h4>
                          {isSelected && (
                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-extrabold rounded-md flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-semibold text-indigo-600">
                          {c.gradeRange}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Class Confirmation & Action Button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <span>Selected Class:</span>
            <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              {CLASS_LEVELS.find((c) => c.id === selectedClass)?.shortName || 'SSS (Grades 10-12)'}
            </span>
          </div>

          <div className="flex gap-2">
            {activeTab !== 'class' && (
              <button
                onClick={() => setActiveTab('class')}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
              >
                Change Class
              </button>
            )}

            <button
              id="welcome-get-started-btn"
              onClick={handleSaveAndContinue}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-md group"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
