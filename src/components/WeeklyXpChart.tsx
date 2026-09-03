import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  GraduationCap,
  Sparkles,
  Calendar,
  Flame,
  Award,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { UserProgress } from '../types';
import { calculateWeeklyXpData, WeeklyXpDataPoint } from '../utils/weeklyXpCalculator';

interface WeeklyXpChartProps {
  progress: UserProgress;
  onOpenExamPrep?: () => void;
}

type ChartViewMode = 'all' | 'breakdown' | 'exams';

export function WeeklyXpChart({ progress, onOpenExamPrep }: WeeklyXpChartProps) {
  const [viewMode, setViewMode] = useState<ChartViewMode>('breakdown');

  // Calculate data derived from progress.examAttempts and daily completion history
  const summary = useMemo(() => calculateWeeklyXpData(progress), [progress]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Top Header & Chart Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>Weekly Growth Trajectory</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Weekly XP Gain & Exam Output
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time daily XP from CBT exam drills, subject lessons, and quiz completions.
          </p>
        </div>

        {/* View Mode Segmented Control */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto border border-slate-200/80">
          <button
            type="button"
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              viewMode === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Total XP
          </button>
          <button
            type="button"
            onClick={() => setViewMode('breakdown')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              viewMode === 'breakdown'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Breakdown
          </button>
          <button
            type="button"
            onClick={() => setViewMode('exams')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
              viewMode === 'exams'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3 h-3 text-amber-600" />
            <span>Exams Only</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Metric Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            <span>7-Day Total</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            +{summary.totalWeeklyXp} XP
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Earned this week</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            <span>Daily Average</span>
            <Calendar className="w-3.5 h-3.5 text-slate-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            {summary.averageDailyXp} XP/d
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Consistent pacing</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            <span>Peak Day</span>
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            {summary.bestDay.dayLabel}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            +{summary.bestDay.xp} XP ({summary.bestDay.dateLabel})
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-1">
          <div className="flex items-center justify-between text-amber-800 text-[11px] font-bold uppercase tracking-wider">
            <span>Exam Prep Share</span>
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-950 font-['Outfit',sans-serif]">
            {summary.totalExamXp} XP
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            {summary.examSharePercent}% of weekly total ({summary.totalExamsTaken} tests)
          </div>
        </div>
      </div>

      {/* Main Recharts Line Chart Container */}
      <div className="w-full h-72 sm:h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={summary.data}
            margin={{ top: 12, right: 16, left: -16, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="dayLabel"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              dy={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              domain={[0, 'auto']}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 16, fontSize: 12, fontWeight: 600 }}
            />

            {/* Total XP Line */}
            {(viewMode === 'all' || viewMode === 'breakdown') && (
              <Line
                name="Total XP Gain"
                type="monotone"
                dataKey="totalXp"
                stroke="#4338ca"
                strokeWidth={3}
                dot={{ r: 4, fill: '#4338ca', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 6, fill: '#4338ca', stroke: '#ffffff', strokeWidth: 2 }}
              />
            )}

            {/* Exam Prep XP Line (pulling from progress.examAttempts) */}
            {(viewMode === 'breakdown' || viewMode === 'exams') && (
              <Line
                name="Exam Prep XP"
                type="monotone"
                dataKey="examXp"
                stroke="#d97706"
                strokeWidth={viewMode === 'exams' ? 3 : 2}
                strokeDasharray={viewMode === 'breakdown' ? '5 5' : undefined}
                dot={{ r: 4, fill: '#d97706', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 6, fill: '#d97706', stroke: '#ffffff', strokeWidth: 2 }}
              />
            )}

            {/* Curriculum & Lesson XP Line */}
            {viewMode === 'breakdown' && (
              <Line
                name="Lesson & Quiz XP"
                type="monotone"
                dataKey="lessonXp"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 3, fill: '#059669', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 5, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Banner & Exam Prep Callout */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Data synchronized from <strong>{summary.totalExamsTaken} exam attempts</strong> and daily curriculum history.
          </span>
        </div>

        {onOpenExamPrep && (
          <button
            type="button"
            onClick={onOpenExamPrep}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-1.5 rounded-xl transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Practice WAEC/JAMB CBT Exam</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// Custom Tooltip Component for Recharts
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  const dataPoint: WeeklyXpDataPoint = payload[0]?.payload;
  if (!dataPoint) return null;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-200 text-xs space-y-2 min-w-[200px] z-50">
      <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
        <span className="font-bold text-slate-900">
          {dataPoint.dayLabel}, {dataPoint.dateLabel}
        </span>
        {dataPoint.isToday && (
          <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-md uppercase">
            Today
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-slate-700 font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span>Total XP Gain:</span>
          </span>
          <span className="font-mono font-black text-indigo-900">
            +{dataPoint.totalXp} XP
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Exam Prep XP:</span>
          </span>
          <span className="font-mono font-bold text-amber-700">
            +{dataPoint.examXp} XP
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Lessons & Quizzes:</span>
          </span>
          <span className="font-mono font-bold text-emerald-700">
            +{dataPoint.lessonXp} XP
          </span>
        </div>
      </div>

      {dataPoint.examsCount > 0 && (
        <div className="pt-2 border-t border-slate-100 space-y-1">
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-amber-600" />
            <span>{dataPoint.examsCount} Exam Mock{dataPoint.examsCount > 1 ? 's' : ''} Taken</span>
          </div>
          {dataPoint.examTitles.slice(0, 2).map((title, i) => (
            <div key={i} className="text-[10px] text-slate-500 truncate max-w-[200px]">
              • {title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
