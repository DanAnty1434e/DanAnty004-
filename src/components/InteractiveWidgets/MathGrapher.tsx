import React, { useState } from 'react';
import { Sliders, RotateCcw, Info } from 'lucide-react';

interface MathGrapherProps {
  initialSlope?: number;
  initialIntercept?: number;
  title?: string;
  description?: string;
}

export function MathGrapher({
  initialSlope = 2,
  initialIntercept = 1,
  title = 'Interactive Linear Graph Explorer',
  description = 'Adjust the slope (m) and y-intercept (b) to observe real-time transformations on the coordinate grid.'
}: MathGrapherProps) {
  const [slope, setSlope] = useState<number>(initialSlope);
  const [intercept, setIntercept] = useState<number>(initialIntercept);

  // SVG coordinate transformation
  // Coordinate range: x in [-5, 5], y in [-5, 5]
  // SVG box: 280x280, center at (140, 140), scale = 24px per unit
  const width = 280;
  const height = 280;
  const cx = width / 2;
  const cy = height / 2;
  const scale = 24;

  const toSvgX = (x: number) => cx + x * scale;
  const toSvgY = (y: number) => cy - y * scale;

  // Calculate endpoints for line: y = m*x + b
  const x1 = -5;
  const y1 = slope * x1 + intercept;
  const x2 = 5;
  const y2 = slope * x2 + intercept;

  const resetValues = () => {
    setSlope(initialSlope);
    setIntercept(initialIntercept);
  };

  return (
    <div className="my-6 rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-indigo-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>

        <button
          id="reset-grapher-btn"
          onClick={resetValues}
          className="flex items-center space-x-1 px-2.5 py-1 text-xs text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Canvas */}
        <div className="md:col-span-6 flex flex-col items-center justify-center bg-slate-950 rounded-xl p-3 border border-slate-800 shadow-inner">
          <svg width={width} height={height} className="overflow-visible select-none">
            {/* Grid lines */}
            {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((u) => (
              <g key={`grid-${u}`} opacity="0.15">
                <line x1={toSvgX(u)} y1={0} x2={toSvgX(u)} y2={height} stroke="#cbd5e1" strokeWidth="1" />
                <line x1={0} y1={toSvgY(u)} x2={width} y2={toSvgY(u)} stroke="#cbd5e1" strokeWidth="1" />
              </g>
            ))}

            {/* Axes */}
            <line x1={0} y1={cy} x2={width} y2={cy} stroke="#94a3b8" strokeWidth="2" />
            <line x1={cx} y1={0} x2={cx} y2={height} stroke="#94a3b8" strokeWidth="2" />

            {/* Axis labels */}
            <text x={width - 12} y={cy - 6} fill="#94a3b8" fontSize="10" fontWeight="bold">X</text>
            <text x={cx + 6} y={14} fill="#94a3b8" fontSize="10" fontWeight="bold">Y</text>

            {/* Plotted Line */}
            <line
              x1={toSvgX(x1)}
              y1={toSvgY(y1)}
              x2={toSvgX(x2)}
              y2={toSvgY(y2)}
              stroke="#6366f1"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Y-intercept dot */}
            <circle cx={toSvgX(0)} cy={toSvgY(intercept)} r="5" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
          </svg>
          <div className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500"></span> Y-intercept Point (0, {intercept})
          </div>
        </div>

        {/* Sliders & Formula Display */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-3 bg-indigo-50/80 rounded-xl border border-indigo-100 text-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600 block mb-0.5">Current Equation</span>
            <div className="font-mono text-xl font-extrabold text-indigo-950">
              y = <span className="text-indigo-600">{slope}</span>x {intercept >= 0 ? `+ ${intercept}` : `- ${Math.abs(intercept)}`}
            </div>
          </div>

          {/* Slope Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
              <span>Slope (m = Rise / Run):</span>
              <span className="font-mono px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold">{slope}</span>
            </div>
            <input
              id="slope-slider-input"
              type="range"
              min="-4"
              max="4"
              step="0.5"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>-4 (Falling)</span>
              <span>0 (Flat)</span>
              <span>+4 (Steep)</span>
            </div>
          </div>

          {/* Intercept Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
              <span>Y-Intercept (b = Starting Point):</span>
              <span className="font-mono px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold">{intercept}</span>
            </div>
            <input
              id="intercept-slider-input"
              type="range"
              min="-4"
              max="4"
              step="1"
              value={intercept}
              onChange={(e) => setIntercept(parseInt(e.target.value, 10))}
              className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>-4</span>
              <span>0</span>
              <span>+4</span>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-start gap-2 border border-slate-100">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              {slope > 0 && "Positive slope: as x increases, y rises proportionally."}
              {slope === 0 && "Zero slope: a perfectly horizontal line where y is constant."}
              {slope < 0 && "Negative slope: as x increases, y decreases downward."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
