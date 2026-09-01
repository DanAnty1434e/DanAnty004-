import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, Sparkles, Terminal } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode?: string;
  title?: string;
  description?: string;
}

export function CodePlayground({ initialCode = '', title, description }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Capture console output safely
    const logs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '));
      },
      warn: (...args: any[]) => {
        logs.push(`⚠️ ${args.join(' ')}`);
      },
      error: (...args: any[]) => {
        logs.push(`❌ ${args.join(' ')}`);
      }
    };

    try {
      // Execute in sandbox with custom console
      const runFn = new Function('console', code);
      runFn(customConsole);
      
      if (logs.length === 0) {
        logs.push('✨ Code executed successfully with no console logs.');
      }
      setOutput(logs);
      setHasRun(true);
    } catch (err: any) {
      setOutput([`Syntax / Runtime Error: ${err.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setHasRun(false);
  };

  return (
    <div className="my-6 rounded-2xl border border-amber-200 bg-slate-900 text-slate-100 shadow-lg overflow-hidden font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-semibold text-slate-300 ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            {title || 'Interactive Code Sandbox'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="reset-code-btn"
            onClick={resetCode}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
            title="Reset code"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <button
            id="run-code-btn"
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg transition shadow"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Code</span>
          </button>
        </div>
      </div>

      {description && (
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 text-xs text-slate-400">
          💡 {description}
        </div>
      )}

      {/* Editor & Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Code Input */}
        <div className="lg:col-span-7 p-3 bg-slate-900">
          <label htmlFor="code-editor-input" className="sr-only">Code Editor</label>
          <textarea
            id="code-editor-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="w-full bg-transparent font-['Fira_Code',monospace] text-xs leading-relaxed text-amber-100 focus:outline-none resize-none selection:bg-amber-500/30"
            placeholder="Write JavaScript / Python algorithmic code here..."
            spellCheck={false}
          />
        </div>

        {/* Live Output */}
        <div className="lg:col-span-5 p-3 bg-slate-950/80 flex flex-col min-h-[140px]">
          <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider flex items-center justify-between">
            <span>Terminal Output</span>
            {hasRun && (
              <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="w-3 h-3" /> Live
              </span>
            )}
          </div>
          <div className="flex-1 font-['Fira_Code',monospace] text-xs text-slate-300 space-y-1 overflow-y-auto max-h-48">
            {output.length > 0 ? (
              output.map((line, idx) => (
                <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                  <span className="text-amber-500 mr-1">&gt;</span> {line}
                </div>
              ))
            ) : (
              <div className="text-slate-500 italic text-xs py-4 text-center">
                Click &quot;Run Code&quot; to compile and see output here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
