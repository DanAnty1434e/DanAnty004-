import React, { useState } from 'react';
import {
  Calculator,
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  HelpCircle,
  Divide,
  Equal,
  Plus,
  Minus,
  RefreshCw,
} from 'lucide-react';
import { MathEquationSolution } from '../types';
import { solveMathEquationLocally, solveMathEquationAI } from '../utils/mathSolver';

interface MathSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAITutorWithQuestion?: (question: string) => void;
  onEarnXp?: (amount: number) => void;
}

const SAMPLE_EQUATIONS = [
  { label: 'Quadratic (Real Roots)', eq: 'x^2 - 5x + 6 = 0', type: 'Quadratic' },
  { label: 'Quadratic (Coeff > 1)', eq: '2x^2 + 7x + 3 = 0', type: 'Quadratic' },
  { label: 'Linear Equation', eq: '3x + 12 = 30', type: 'Linear' },
  { label: 'Both Sides Linear', eq: '5x - 7 = 2x + 8', type: 'Linear' },
  { label: 'Pythagorean Theorem', eq: 'a = 6, b = 8', type: 'Geometry' },
  { label: 'Polynomial Derivative', eq: 'd/dx (4x^3 - 5x^2 + 7x - 9)', type: 'Calculus' },
  { label: 'Quadratic (x^2 - 16 = 0)', eq: 'x^2 + 0x - 16 = 0', type: 'Quadratic' },
];

export function MathSolverModal({
  isOpen,
  onClose,
  onOpenAITutorWithQuestion,
  onEarnXp,
}: MathSolverModalProps) {
  const [equationInput, setEquationInput] = useState('x^2 - 5x + 6 = 0');
  const [solution, setSolution] = useState<MathEquationSolution | null>(() =>
    solveMathEquationLocally('x^2 - 5x + 6 = 0')
  );
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [solveSpeedMs, setSolveSpeedMs] = useState<number | null>(0);

  if (!isOpen) return null;

  const handleSolve = async (eqToSolve: string = equationInput) => {
    if (!eqToSolve.trim() || loading) return;
    setLoading(true);
    const startTime = performance.now();

    // 1. Try local instant solver first (0ms latency)
    const local = solveMathEquationLocally(eqToSolve);
    if (local) {
      setSolution(local);
      setSolveSpeedMs(Math.round(performance.now() - startTime));
      setLoading(false);
      onEarnXp?.(10);
      return;
    }

    // 2. Fall back to high-speed AI solver
    try {
      const aiSol = await solveMathEquationAI(eqToSolve);
      setSolution(aiSol);
      setSolveSpeedMs(Math.round(performance.now() - startTime));
      onEarnXp?.(10);
    } catch {
      // Handled in utility
    } finally {
      setLoading(false);
    }
  };

  const handleCopySteps = () => {
    if (!solution) return;
    const text = `Equation: ${solution.equation}\nMethod Used: ${solution.methodName}\nFormula: ${solution.formulaUsed || 'N/A'}\n\nSteps:\n` +
      solution.steps.map((s) => `${s.stepNumber}. ${s.title}: ${s.expression ? s.expression + ' - ' : ''}${s.explanation}`).join('\n') +
      `\n\nFinal Answer: ${solution.finalAnswer}\nVerification: ${solution.verification || 'N/A'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertSymbol = (sym: string) => {
    setEquationInput((prev) => prev + sym);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold font-['Outfit',sans-serif]">
                    Ultra-Fast Math Equation Solver
                  </h2>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-slate-950" />
                    Instant
                  </span>
                </div>
                <p className="text-xs text-indigo-100 mt-0.5">
                  Solves any mathematical equation with exact step-by-step methods and verified proofs
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

        {/* Solver Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Input Bar & Controls */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Enter Mathematical Equation</span>
              {solveSpeedMs !== null && (
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                  Solved in {solveSpeedMs}ms
                </span>
              )}
            </label>

            <div className="flex gap-2">
              <input
                id="math-equation-input"
                type="text"
                value={equationInput}
                onChange={(e) => setEquationInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
                placeholder="e.g. 2x^2 + 7x + 3 = 0 or 5x - 7 = 2x + 8 or a=3, b=4"
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 font-mono text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />

              <button
                id="solve-equation-submit-btn"
                onClick={() => handleSolve()}
                disabled={loading || !equationInput.trim()}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-2xl text-sm transition-all flex items-center space-x-1.5 shadow-md shrink-0"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Solve</span>
                  </>
                )}
              </button>
            </div>

            {/* Math Keypad Helpers */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-medium text-slate-600">Quick Symbols:</span>
              {[
                { label: 'x²', val: 'x^2' },
                { label: '+', val: ' + ' },
                { label: '−', val: ' - ' },
                { label: '=', val: ' = ' },
                { label: '√', val: 'sqrt(' },
                { label: 'd/dx', val: 'd/dx (' },
                { label: '(', val: '(' },
                { label: ')', val: ')' },
              ].map((sym, idx) => (
                <button
                  key={idx}
                  onClick={() => insertSymbol(sym.val)}
                  className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-200/80"
                >
                  {sym.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Examples */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Example Equations:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_EQUATIONS.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setEquationInput(sample.eq);
                    handleSolve(sample.eq);
                  }}
                  className="text-xs px-2.5 py-1.5 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/70 rounded-xl font-mono transition-colors text-left"
                >
                  {sample.eq}
                </button>
              ))}
            </div>
          </div>

          {/* Solution Display */}
          {solution && (
            <div className="space-y-4 pt-3 border-t border-slate-100">
              {/* Method Card */}
              <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-2xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">
                      Method Used
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {solution.methodName}
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                    {solution.equationType}
                  </span>
                </div>

                {solution.formulaUsed && (
                  <div className="mt-3 pt-2.5 border-t border-indigo-100 flex items-center gap-2 font-mono text-xs sm:text-sm text-indigo-900 bg-white/80 px-3 py-2 rounded-xl">
                    <span className="font-bold text-indigo-600">Formula:</span>
                    <code>{solution.formulaUsed}</code>
                  </div>
                )}
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Step-by-Step Mathematical Method
                  </h4>
                  <button
                    onClick={handleCopySteps}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Steps</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {solution.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                          {step.title}
                        </h5>
                      </div>

                      {step.expression && (
                        <div className="ml-7 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs sm:text-sm text-slate-800">
                          {step.expression}
                        </div>
                      )}

                      <p className="ml-7 text-xs text-slate-600 leading-relaxed">
                        {step.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Answer Box */}
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    🎯 Verified Final Answer
                  </span>
                </div>

                <div className="font-mono text-base sm:text-xl font-black text-slate-950 bg-white px-4 py-2.5 rounded-xl border border-emerald-200 shadow-2xs">
                  {solution.finalAnswer}
                </div>

                {solution.verification && (
                  <p className="text-[11px] text-emerald-800 font-medium pt-1">
                    <strong>Proof / Verification:</strong> {solution.verification}
                  </p>
                )}
              </div>

              {/* Tips / Advice */}
              {solution.tips && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start space-x-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Pro Tip: </strong>
                    <span>{solution.tips}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Powered by DanAnty Fast Symbolic Engine & Gemini
          </div>

          <div className="flex gap-2">
            {onOpenAITutorWithQuestion && solution && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAITutorWithQuestion(`Can you explain why the method "${solution.methodName}" was used to solve "${solution.equation}"?`);
                }}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold rounded-xl text-xs transition-colors flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Tutor More</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
