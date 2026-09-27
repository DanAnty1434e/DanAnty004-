import React, { useState, useEffect, useRef } from 'react';
import {
  FlaskConical,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  BookOpen,
  Info,
  Maximize2,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Award,
  Layers,
  Search,
  ExternalLink,
} from 'lucide-react';
import { PRACTICAL_EXPERIMENTS, PracticalExperiment } from '../data/practicalsData';

interface VirtualPracticalLabProps {
  initialPracticalId?: string;
  onClose?: () => void;
  onAskAITutor?: (prompt: string, contextTitle: string) => void;
  onEarnXp?: (xp: number) => void;
}

export function VirtualPracticalLab({
  initialPracticalId,
  onClose,
  onAskAITutor,
  onEarnXp,
}: VirtualPracticalLabProps) {
  const [selectedId, setSelectedId] = useState<string>(initialPracticalId || PRACTICAL_EXPERIMENTS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'chemistry' | 'physics' | 'biology'>('all');
  const [isDiagramExpanded, setIsDiagramExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'simulator' | 'diagram' | 'procedure' | 'precautions' | 'viva'>('simulator');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Find active experiment
  const currentExperiment =
    PRACTICAL_EXPERIMENTS.find((p) => p.id === selectedId) || PRACTICAL_EXPERIMENTS[0];

  // Update selected if initialPracticalId changes
  useEffect(() => {
    if (initialPracticalId) {
      setSelectedId(initialPracticalId);
    }
  }, [initialPracticalId]);

  // Filtered experiments
  const filteredExperiments = PRACTICAL_EXPERIMENTS.filter((exp) => {
    const matchesSubject = subjectFilter === 'all' || exp.subject === subjectFilter;
    const matchesSearch =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // ================= SIMULATION STATES =================

  // 1. Titration State
  const [titrationVolume, setTitrationVolume] = useState<number>(0); // in mL
  const [titrationSwirled, setTitrationSwirled] = useState<boolean>(false);
  const [titrationReadings, setTitrationReadings] = useState<
    { trial: string; initial: number; final: number; titre: number }[]
  >([]);

  // 2. Pendulum State
  const [pendulumLength, setPendulumLength] = useState<number>(80); // cm
  const [isPendulumSwinging, setIsPendulumSwinging] = useState(false);
  const [pendulumTimer, setPendulumTimer] = useState(0); // seconds
  const [pendulumReadings, setPendulumReadings] = useState<
    { length: number; time20: number; period: number; periodSquared: number; gValue: number }[]
  >([]);
  const pendulumAnimRef = useRef<number | null>(null);

  // 3. Leaf Starch State
  const [leafStep, setLeafStep] = useState<number>(0); // 0 = untreated, 1 = boiled, 2 = ethanol decolourised, 3 = softened, 4 = iodine stained
  const [isDestarchedLeaf, setIsDestarchedLeaf] = useState<boolean>(false);

  // 4. Ohm's Law State
  const [circuitClosed, setCircuitClosed] = useState<boolean>(true);
  const [rheostatVal, setRheostatVal] = useState<number>(3); // 1 to 5 steps
  const [ohmsReadings, setOhmsReadings] = useState<
    { voltage: number; current: number; resistance: number }[]
  >([]);

  // 5. Glass Prism State
  const [incidentAngle, setIncidentAngle] = useState<number>(45); // degrees
  const [prismReadings, setPrismReadings] = useState<
    { angleI: number; angleD: number; refIndex: number }[]
  >([]);

  // Reset simulation state when experiment changes
  useEffect(() => {
    setTitrationVolume(0);
    setTitrationSwirled(false);
    setTitrationReadings([]);
    setIsPendulumSwinging(false);
    setPendulumTimer(0);
    setPendulumReadings([]);
    setLeafStep(0);
    setCircuitClosed(true);
    setRheostatVal(3);
    setOhmsReadings([]);
    setIncidentAngle(45);
    setPrismReadings([]);
    setCompletedSteps([]);
    setActiveTab('simulator');
  }, [selectedId]);

  // Pendulum timer effect
  useEffect(() => {
    let interval: any;
    if (isPendulumSwinging) {
      interval = setInterval(() => {
        setPendulumTimer((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPendulumSwinging]);

  // Auto calculate titration endpoint at ~22.4 mL
  const isTitrationEndpoint = titrationVolume >= 22.4;
  const isTitrationOvershot = titrationVolume > 23.5;

  // Handlers for Titration
  const handleAddTitrant = (amount: number) => {
    setTitrationVolume((prev) => {
      const next = +(prev + amount).toFixed(2);
      return next > 50 ? 50 : next;
    });
  };

  const handleRecordTitration = () => {
    if (titrationVolume === 0) return;
    const newTitre = {
      trial: `Titration ${titrationReadings.length + 1}`,
      initial: 0.0,
      final: titrationVolume,
      titre: titrationVolume,
    };
    setTitrationReadings([...titrationReadings, newTitre]);
    onEarnXp?.(15);
  };

  // Handlers for Pendulum
  const theoreticalPeriod = +(2 * Math.PI * Math.sqrt((pendulumLength / 100) / 9.8)).toFixed(3);
  const theoreticalTime20 = +(theoreticalPeriod * 20).toFixed(2);

  const handleTogglePendulum = () => {
    if (isPendulumSwinging) {
      setIsPendulumSwinging(false);
    } else {
      setPendulumTimer(0);
      setIsPendulumSwinging(true);
    }
  };

  const handleRecordPendulum = () => {
    const period = +(theoreticalTime20 / 20).toFixed(3);
    const periodSquared = +(period * period).toFixed(3);
    const calculatedG = +((4 * Math.PI * Math.PI * (pendulumLength / 100)) / periodSquared).toFixed(2);
    setPendulumReadings([
      ...pendulumReadings,
      {
        length: pendulumLength,
        time20: theoreticalTime20,
        period,
        periodSquared,
        gValue: calculatedG,
      },
    ]);
    onEarnXp?.(15);
  };

  // Handlers for Ohm's Law
  const testResistance = 4.0; // Ohms
  const currentVoltage = circuitClosed ? +(0.8 * rheostatVal).toFixed(2) : 0;
  const currentAmps = circuitClosed ? +(currentVoltage / testResistance).toFixed(2) : 0;

  const handleRecordOhms = () => {
    if (!circuitClosed || currentVoltage === 0) return;
    setOhmsReadings([
      ...ohmsReadings,
      {
        voltage: currentVoltage,
        current: currentAmps,
        resistance: +(currentVoltage / currentAmps).toFixed(2),
      },
    ]);
    onEarnXp?.(15);
  };

  // Handlers for Glass Prism
  // Deviation D formula approximate for equilateral prism A = 60°, n = 1.51
  const calcPrismDeviation = (i: number) => {
    // Standard empirical curve for crown glass prism A=60°
    const A = 60;
    const n = 1.51;
    const iRad = (i * Math.PI) / 180;
    const r1 = Math.asin(Math.sin(iRad) / n);
    const r2 = (A * Math.PI) / 180 - r1;
    if (Math.sin(r2) * n > 1) return 55; // total internal reflection if out of range
    const e = Math.asin(Math.sin(r2) * n);
    const D = iRad + e - (A * Math.PI) / 180;
    return +((D * 180) / Math.PI).toFixed(1);
  };

  const currentDeviation = calcPrismDeviation(incidentAngle);

  const handleRecordPrism = () => {
    const A = 60;
    const sinNumerator = Math.sin((((A + currentDeviation) / 2) * Math.PI) / 180);
    const sinDenominator = Math.sin(((A / 2) * Math.PI) / 180);
    const calculatedN = +(sinNumerator / sinDenominator).toFixed(3);
    setPrismReadings([
      ...prismReadings,
      {
        angleI: incidentAngle,
        angleD: currentDeviation,
        refIndex: calculatedN,
      },
    ]);
    onEarnXp?.(15);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-7 shadow-xl border border-indigo-900/50 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              <FlaskConical className="w-3.5 h-3.5 text-indigo-400" />
              <span>Virtual Science & STEM Practical Lab</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
              Interactive Laboratory Practicals with Illustrated Diagrams
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Conduct official WAEC, NECO & IGCSE practical experiments with authentic laboratory apparatus diagrams, real-time interactive simulations, observation tables, and step-by-step methodologies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                onAskAITutor?.(
                  `Can you explain the detailed practical theory, calculations, and common exam precautions for ${currentExperiment.title}?`,
                  currentExperiment.title
                );
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-950 text-xs sm:text-sm font-bold shadow-md hover:bg-indigo-50 transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Ask AI Tutor About Lab</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Close Lab
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Practical Selector Bar & Filter */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: '🌟 All Practicals' },
              { id: 'chemistry', label: '🧪 Chemistry' },
              { id: 'physics', label: '⚡ Physics' },
              { id: 'biology', label: '🌿 Biology' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSubjectFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  subjectFilter === f.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search practicals & apparatus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Experiment Cards Horizontal Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
          {filteredExperiments.map((exp) => {
            const isSelected = exp.id === selectedId;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedId(exp.id)}
                className={`p-3 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        exp.subject === 'chemistry'
                          ? 'bg-amber-100 text-amber-800'
                          : exp.subject === 'physics'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {exp.subjectName}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-2">
                    {exp.shortTitle}
                  </h3>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Diagram + Sim</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Experiment Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image Diagram Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Header */}
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Apparatus Diagram
                </span>
              </div>
              <button
                onClick={() => setIsDiagramExpanded(true)}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-200 flex items-center space-x-1 transition-colors"
                title="View High-Resolution Expanded Diagram"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Enlarge</span>
              </button>
            </div>

            {/* Illustrated Diagram Image */}
            <div className="relative group bg-slate-50 flex items-center justify-center p-2 border-b border-slate-200">
              <img
                src={currentExperiment.imageDiagramUrl}
                alt={currentExperiment.diagramCaption}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[360px] object-contain rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-1 rounded-md opacity-90">
                🔍 Click to zoom
              </div>
            </div>

            {/* Caption & Key Apparatus Pointers */}
            <div className="p-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {currentExperiment.diagramCaption}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {currentExperiment.examRelevance}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Key Diagram Labels & Scientific Pointers
                </span>
                <ul className="space-y-1">
                  {currentExperiment.diagramKeyPoints.map((point, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Apparatus & Reagents Inventory */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Required Laboratory Apparatus</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentExperiment.apparatus.map((app, i) => (
                <div
                  key={i}
                  className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-2 text-xs"
                >
                  <span className="text-base">{app.icon}</span>
                  <div>
                    <span className="font-semibold text-slate-900 block">{app.name}</span>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      {app.purpose}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {currentExperiment.reagents && (
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Chemical Reagents & Solutions
                </span>
                <div className="space-y-1">
                  {currentExperiment.reagents.map((reagent, i) => (
                    <div
                      key={i}
                      className="text-xs p-1.5 rounded-lg bg-amber-50/50 border border-amber-200/60 flex items-center justify-between"
                    >
                      <span className="font-bold text-amber-950">{reagent.name}</span>
                      <span className="font-mono text-[11px] text-amber-800 font-semibold">
                        {reagent.formula}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Simulator Workbench & Lab Tabs (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Experiment Title & Aim Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                {currentExperiment.category}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {currentExperiment.examRelevance}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentExperiment.title}
            </h2>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                🎯 Experimental Aim
              </span>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                {currentExperiment.aim}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 border-b border-slate-200 pt-1">
              {[
                { id: 'simulator', label: '🧪 Interactive Simulator' },
                { id: 'procedure', label: '📋 Step-by-Step Method' },
                { id: 'precautions', label: '⚠️ Precautions & Safety' },
                { id: 'viva', label: '❓ Viva Voce Exam Q&A' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-3 py-2 text-xs font-bold border-b-2 transition-all ${
                    activeTab === t.id
                      ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40 rounded-t-lg'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: Interactive Practical Simulator */}
          {activeTab === 'simulator' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-5">
              {/* 1. TITRATION SIMULATOR */}
              {currentExperiment.simulationType === 'titration' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">
                        Acid-Base Volumetric Titration Bench
                      </h3>
                      <p className="text-xs text-slate-500">
                        Dispense 0.05 M HCl from burette into 25.0 mL Na₂CO₃ solution with methyl orange indicator.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setTitrationVolume(0);
                        setTitrationSwirled(false);
                      }}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Refill Burette</span>
                    </button>
                  </div>

                  {/* Visual Bench Graphic */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 items-center">
                    {/* Burette Display */}
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Burette Level</span>
                      <div className="w-10 h-44 bg-white border-2 border-slate-300 rounded-full relative overflow-hidden flex flex-col justify-end p-0.5 shadow-inner">
                        <div
                          className="w-full bg-indigo-500/30 transition-all duration-300 rounded-b-full"
                          style={{ height: `${Math.max(5, 100 - (titrationVolume / 50) * 100)}%` }}
                        />
                        {/* Meniscus Line */}
                        <div
                          className="absolute w-full border-t-2 border-indigo-600 transition-all duration-300"
                          style={{ bottom: `${Math.max(5, 100 - (titrationVolume / 50) * 100)}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-indigo-700">
                        {titrationVolume.toFixed(2)} cm³
                      </span>
                    </div>

                    {/* Conical Flask Reaction Vessel */}
                    <div className="flex flex-col items-center space-y-1 sm:col-span-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Conical Flask on White Tile
                      </span>
                      <div
                        className={`w-36 h-36 rounded-b-3xl border-4 transition-all duration-500 flex flex-col items-center justify-end p-3 relative shadow-md ${
                          isTitrationOvershot
                            ? 'border-rose-400 bg-rose-200/90 ring-4 ring-rose-300/50'
                            : isTitrationEndpoint
                            ? 'border-amber-500 bg-gradient-to-t from-orange-200 to-rose-200 ring-4 ring-emerald-400/50'
                            : 'border-slate-300 bg-yellow-100/90'
                        } ${titrationSwirled ? 'animate-wiggle' : ''}`}
                      >
                        <div className="text-center z-10">
                          <span className="text-xs font-extrabold text-slate-800 block">
                            {isTitrationOvershot
                              ? '🔴 Over-Titrated (Deep Pink)'
                              : isTitrationEndpoint
                              ? '🎯 Exact Endpoint (Faint Orange-Pink)'
                              : '🟡 Alkaline (Straw Yellow)'}
                          </span>
                          <span className="text-[10px] text-slate-600 block mt-0.5">
                            {isTitrationEndpoint
                              ? 'Concordant stoichiometric point reached!'
                              : 'Swirl while adding titrant'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => {
                            setTitrationSwirled(true);
                            setTimeout(() => setTitrationSwirled(false), 500);
                          }}
                          className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold"
                        >
                          🔄 Swirl Flask
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dispensing Controls */}
                  <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAddTitrant(0.1)}
                        disabled={titrationVolume >= 50}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs disabled:opacity-50"
                      >
                        💧 Add 1 Drop (0.10 cm³)
                      </button>
                      <button
                        onClick={() => handleAddTitrant(1.0)}
                        disabled={titrationVolume >= 50}
                        className="px-3 py-1.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-bold text-xs disabled:opacity-50"
                      >
                        ⚡ Add 1.00 cm³ Fast
                      </button>
                    </div>

                    <button
                      onClick={handleRecordTitration}
                      disabled={titrationVolume === 0}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs disabled:opacity-50 flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Record to Titre Table (+15 XP)</span>
                    </button>
                  </div>

                  {/* Titre Table */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Official Titre Readings Table
                      </span>
                      {titrationReadings.length >= 2 && (
                        <span className="text-[11px] font-bold text-emerald-600">
                          Concordant Difference: ≤ 0.10 cm³ ✓
                        </span>
                      )}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                        <thead className="bg-slate-100 text-slate-700 font-bold">
                          <tr>
                            <th className="p-2 border-b">Titration Trial</th>
                            <th className="p-2 border-b">Initial Burette (cm³)</th>
                            <th className="p-2 border-b">Final Burette (cm³)</th>
                            <th className="p-2 border-b">Titre Volume V_A (cm³)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {titrationReadings.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="p-3 text-center text-slate-400 italic">
                                Dispense titrant and click &quot;Record to Titre Table&quot; to log readings.
                              </td>
                            </tr>
                          ) : (
                            titrationReadings.map((r, i) => (
                              <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                                <td className="p-2 font-semibold text-slate-900">{r.trial}</td>
                                <td className="p-2 font-mono">{r.initial.toFixed(2)}</td>
                                <td className="p-2 font-mono">{r.final.toFixed(2)}</td>
                                <td className="p-2 font-mono font-bold text-indigo-700">
                                  {r.titre.toFixed(2)}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {titrationReadings.length > 0 && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                        <span className="font-bold text-emerald-900 block">
                          📊 Volumetric Concentration Calculation:
                        </span>
                        <p className="text-emerald-800">
                          Average Titre V_A = {(titrationReadings.reduce((acc, c) => acc + c.titre, 0) / titrationReadings.length).toFixed(2)} cm³
                        </p>
                        <p className="text-emerald-800 font-mono text-[11px]">
                          C_A = (n_A × C_B × V_B) / (n_B × V_A) = (2 × 0.050 × 25.0) / (1 × 22.40) ≈ <strong>0.112 mol/dm³</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. PENDULUM SIMULATOR */}
              {currentExperiment.simulationType === 'pendulum' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">
                        Simple Pendulum Oscillations Rig
                      </h3>
                      <p className="text-xs text-slate-500">
                        Adjust length L, start oscillation, time 20 full cycles, and calculate acceleration due to gravity g.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Workbench */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 items-center">
                    {/* SVG Graphic */}
                    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 h-56 relative overflow-hidden">
                      <svg width="220" height="200" viewBox="0 0 220 200" className="overflow-visible">
                        {/* Clamp / Retort Stand Top */}
                        <rect x="20" y="10" width="180" height="8" rx="2" fill="#334155" />
                        <circle cx="110" cy="14" r="5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
                        {/* Vertical Axis Reference */}
                        <line x1="110" y1="14" x2="110" y2="180" stroke="#cbd5e1" strokeDasharray="3,3" />

                        {/* Pendulum Thread */}
                        <line
                          x1="110"
                          y1="14"
                          x2={isPendulumSwinging ? 110 + Math.sin(pendulumTimer * 4) * 40 : 110}
                          y2={isPendulumSwinging ? 14 + (pendulumLength * 1.5) * Math.cos(pendulumTimer * 4 * 0.1) : 14 + pendulumLength * 1.5}
                          stroke="#475569"
                          strokeWidth="2"
                        />

                        {/* Heavy Bob */}
                        <circle
                          cx={isPendulumSwinging ? 110 + Math.sin(pendulumTimer * 4) * 40 : 110}
                          y2={isPendulumSwinging ? 14 + (pendulumLength * 1.5) * Math.cos(pendulumTimer * 4 * 0.1) : 14 + pendulumLength * 1.5}
                          cy={14 + pendulumLength * 1.5}
                          r="12"
                          fill="#f59e0b"
                          stroke="#b45309"
                          strokeWidth="2"
                          className="shadow-md"
                        />
                      </svg>
                      <span className="text-[10px] text-slate-400 mt-1">
                        Length L = {pendulumLength} cm | θ &lt; 10°
                      </span>
                    </div>

                    {/* Controls & Stopwatch */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Pendulum Length (L):</span>
                          <span className="text-indigo-600 font-mono">{pendulumLength} cm</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="100"
                          step="10"
                          value={pendulumLength}
                          onChange={(e) => setPendulumLength(Number(e.target.value))}
                          disabled={isPendulumSwinging}
                          className="w-full accent-indigo-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>30 cm</span>
                          <span>60 cm</span>
                          <span>100 cm</span>
                        </div>
                      </div>

                      {/* Stopwatch Readout */}
                      <div className="p-3 bg-slate-900 text-white rounded-xl text-center space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                          Digital Stopwatch (20 Oscillations)
                        </span>
                        <div className="font-mono text-2xl font-black text-emerald-400">
                          {isPendulumSwinging ? pendulumTimer.toFixed(1) : theoreticalTime20.toFixed(2)} s
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          Theoretical Period T = {theoreticalPeriod} s
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleTogglePendulum}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                            isPendulumSwinging
                              ? 'bg-rose-600 text-white hover:bg-rose-700'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{isPendulumSwinging ? 'Stop Timer' : 'Release Bob & Start'}</span>
                        </button>
                        <button
                          onClick={handleRecordPendulum}
                          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Record</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Observation Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                      <thead className="bg-slate-100 text-slate-700 font-bold">
                        <tr>
                          <th className="p-2 border-b">Length L (cm)</th>
                          <th className="p-2 border-b">Time for 20 Swings t (s)</th>
                          <th className="p-2 border-b">Period T = t/20 (s)</th>
                          <th className="p-2 border-b">T² (s²)</th>
                          <th className="p-2 border-b">Calculated g (m/s²)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendulumReadings.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-3 text-center text-slate-400 italic">
                              Select lengths, time 20 oscillations, and click Record to tabulate data.
                            </td>
                          </tr>
                        ) : (
                          pendulumReadings.map((r, i) => (
                            <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                              <td className="p-2 font-semibold text-slate-900">{r.length}</td>
                              <td className="p-2 font-mono">{r.time20}</td>
                              <td className="p-2 font-mono">{r.period}</td>
                              <td className="p-2 font-mono font-bold text-indigo-700">{r.periodSquared}</td>
                              <td className="p-2 font-mono font-bold text-emerald-700">{r.gValue}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 3. LEAF STARCH PRACTICAL SIMULATOR */}
              {currentExperiment.simulationType === 'leaf-starch' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">
                        Photosynthesis Starch Staining Simulator
                      </h3>
                      <p className="text-xs text-slate-500">
                        Follow the 4-step laboratory protocol to extract chlorophyll and test for starch grains.
                      </p>
                    </div>
                    <button
                      onClick={() => setLeafStep(0)}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restart Test</span>
                    </button>
                  </div>

                  {/* Leaf State Visualizer */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center space-y-3">
                    <div
                      className={`w-40 h-40 rounded-3xl border-4 transition-all duration-700 flex items-center justify-center p-4 shadow-md ${
                        leafStep === 0
                          ? 'bg-emerald-600 border-emerald-700 text-white'
                          : leafStep === 1
                          ? 'bg-emerald-800 border-emerald-900 text-emerald-100'
                          : leafStep === 2
                          ? 'bg-stone-100 border-stone-300 text-stone-600'
                          : leafStep === 3
                          ? 'bg-stone-200 border-stone-300 text-stone-700'
                          : isDestarchedLeaf
                          ? 'bg-amber-100 border-amber-300 text-amber-900'
                          : 'bg-indigo-950 border-slate-900 text-indigo-100 ring-4 ring-indigo-500/40'
                      }`}
                    >
                      <div className="text-center space-y-1">
                        <span className="text-4xl block">
                          {leafStep === 4 ? (isDestarchedLeaf ? '🍂' : '🫐') : '🍃'}
                        </span>
                        <span className="text-xs font-extrabold uppercase tracking-wide block">
                          {leafStep === 0 && 'Fresh Green Leaf'}
                          {leafStep === 1 && 'Boiled (Cell Walls Ruptured)'}
                          {leafStep === 2 && 'Ethanol Extracted (Pale White)'}
                          {leafStep === 3 && 'Softened in Warm Water'}
                          {leafStep === 4 &&
                            (isDestarchedLeaf
                              ? 'Yellow-Brown (Negative Starch)'
                              : 'Dark Blue-Black (Starch Confirmed! 🌟)')}
                        </span>
                      </div>
                    </div>

                    {/* Step Tracker */}
                    <div className="grid grid-cols-4 gap-2 w-full max-w-lg">
                      {[
                        { num: 1, label: '1. Boil in Water' },
                        { num: 2, label: '2. Ethanol Bath' },
                        { num: 3, label: '3. Warm Rinse' },
                        { num: 4, label: '4. Iodine Stain' },
                      ].map((s) => (
                        <button
                          key={s.num}
                          onClick={() => {
                            setLeafStep(s.num);
                            onEarnXp?.(10);
                          }}
                          className={`p-2 rounded-xl text-[11px] font-bold text-center border transition-all ${
                            leafStep >= s.num
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isDestarchedLeaf}
                          onChange={(e) => setIsDestarchedLeaf(e.target.checked)}
                          className="rounded accent-indigo-600"
                        />
                        <span>Simulate Destarched / Dark Plant (Control Specimen)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. OHM'S LAW SIMULATOR */}
              {currentExperiment.simulationType === 'ohms-law' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">
                        Ohm&apos;s Law Verification Circuit Workbench
                      </h3>
                      <p className="text-xs text-slate-500">
                        Adjust the rheostat slider, measure current (I) and voltage (V), and plot the linear V-I line to calculate R.
                      </p>
                    </div>
                    <button
                      onClick={() => setCircuitClosed(!circuitClosed)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        circuitClosed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {circuitClosed ? '⚡ Key Inserted (Closed)' : '⭕ Key Removed (Open)'}
                    </button>
                  </div>

                  {/* Dual Meters Graphic */}
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900 text-white items-center">
                    {/* Voltmeter Gauge */}
                    <div className="text-center p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Voltmeter (Parallel)
                      </span>
                      <div className="font-mono text-3xl font-black text-amber-400">
                        {currentVoltage.toFixed(2)} V
                      </div>
                      <span className="text-[10px] text-slate-400">Scale: 0 - 5.0 V</span>
                    </div>

                    {/* Ammeter Gauge */}
                    <div className="text-center p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Ammeter (Series)
                      </span>
                      <div className="font-mono text-3xl font-black text-cyan-400">
                        {currentAmps.toFixed(2)} A
                      </div>
                      <span className="text-[10px] text-slate-400">Scale: 0 - 2.0 A</span>
                    </div>
                  </div>

                  {/* Rheostat Slider */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Rheostat Setting:</span>
                      <span className="font-mono text-indigo-600">Step {rheostatVal} of 5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={rheostatVal}
                      onChange={(e) => setRheostatVal(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Min Current</span>
                      <span>Max Current</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleRecordOhms}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Log Data Point (V, I)</span>
                    </button>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                      <thead className="bg-slate-100 text-slate-700 font-bold">
                        <tr>
                          <th className="p-2 border-b">Trial #</th>
                          <th className="p-2 border-b">Voltage V (Volts)</th>
                          <th className="p-2 border-b">Current I (Amperes)</th>
                          <th className="p-2 border-b">Calculated R = V/I (Ω)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ohmsReadings.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="p-3 text-center text-slate-400 italic">
                              Slide rheostat and click Log Data Point to verify linear relationship.
                            </td>
                          </tr>
                        ) : (
                          ohmsReadings.map((r, i) => (
                            <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                              <td className="p-2 font-semibold text-slate-900">{i + 1}</td>
                              <td className="p-2 font-mono font-bold text-amber-700">{r.voltage} V</td>
                              <td className="p-2 font-mono font-bold text-cyan-700">{r.current} A</td>
                              <td className="p-2 font-mono font-bold text-emerald-700">{r.resistance} Ω</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 5. GLASS PRISM OPTICS SIMULATOR */}
              {currentExperiment.simulationType === 'glass-prism' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">
                        Equilateral Glass Prism Ray Tracing Simulator
                      </h3>
                      <p className="text-xs text-slate-500">
                        Vary angle of incidence i, observe deviation angle D, and locate minimum deviation Dm.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Angle of Incidence (i):</span>
                      <span className="font-mono text-indigo-600 text-sm">{incidentAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="65"
                      step="5"
                      value={incidentAngle}
                      onChange={(e) => setIncidentAngle(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />

                    {/* Output readouts */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-indigo-900 text-white rounded-xl text-center">
                      <div>
                        <span className="text-[10px] text-indigo-300 uppercase font-bold block">
                          Angle of Deviation (D)
                        </span>
                        <span className="font-mono text-xl font-bold text-amber-400">
                          {currentDeviation}°
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-indigo-300 uppercase font-bold block">
                          Minimum Deviation (Dm)
                        </span>
                        <span className="font-mono text-xl font-bold text-emerald-400">
                          ~38.0° (at i = 48°)
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleRecordPrism}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center space-x-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Record Angle Reading</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Step-by-Step Practical Methodology */}
          {activeTab === 'procedure' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">
                  Standard Laboratory Execution Protocol
                </h3>
                <p className="text-xs text-slate-500">
                  Follow each step sequentially. Tick each step as you complete it during laboratory practice.
                </p>
              </div>

              <div className="space-y-3">
                {currentExperiment.steps.map((step) => {
                  const isChecked = completedSteps.includes(step.stepNumber);
                  return (
                    <div
                      key={step.stepNumber}
                      onClick={() => {
                        if (isChecked) {
                          setCompletedSteps(completedSteps.filter((s) => s !== step.stepNumber));
                        } else {
                          setCompletedSteps([...completedSteps, step.stepNumber]);
                          onEarnXp?.(5);
                        }
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-200 text-slate-900'
                          : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold mt-0.5 shrink-0 ${
                          isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {isChecked ? '✓' : step.stepNumber}
                      </div>

                      <div className="space-y-1 flex-1">
                        <h4 className="font-bold text-xs text-slate-900">{step.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{step.instruction}</p>
                        <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px] text-indigo-900 font-medium">
                          👁️ <strong>Expected Observation:</strong> {step.keyObservation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Precautions & Safety */}
          {activeTab === 'precautions' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4">
              <div className="flex items-center space-x-2 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-slate-900">
                  Critical Precautions & Sources of Experimental Error
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Examiners award up to 4 marks in WAEC/NECO Paper 3 specifically for stating 2 valid precautions taken to ensure accurate results.
              </p>

              <div className="space-y-2">
                {currentExperiment.safetyPrecautions.map((prec, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start space-x-2.5 text-xs text-amber-950"
                  >
                    <span className="font-bold text-amber-700 mt-0.5">⚠️</span>
                    <span className="leading-relaxed font-medium">{prec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Viva Voce Exam Q&A */}
          {activeTab === 'viva' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4">
              <div className="flex items-center space-x-2 text-indigo-700">
                <HelpCircle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-slate-900">
                  Practical Exam Viva Voce (Oral Theory Questions)
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Standard questions asked by laboratory examiners during practical assessments.
              </p>

              <div className="space-y-3">
                {currentExperiment.vivaQuestions.map((viva, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                  >
                    <span className="font-bold text-slate-900 block">
                      Q{i + 1}: {viva.question}
                    </span>
                    <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100 leading-relaxed font-normal">
                      💡 <strong>Model Answer:</strong> {viva.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* High-Resolution Diagram Modal Popup */}
      {isDiagramExpanded && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-5 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {currentExperiment.diagramCaption}
                </h3>
                <p className="text-xs text-slate-500">{currentExperiment.title}</p>
              </div>
              <button
                onClick={() => setIsDiagramExpanded(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="bg-slate-50 p-2 rounded-2xl flex items-center justify-center">
              <img
                src={currentExperiment.imageDiagramUrl}
                alt={currentExperiment.diagramCaption}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[550px] object-contain rounded-xl"
              />
            </div>

            <div className="space-y-2 p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 block">
                Educational Diagram Guide:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {currentExperiment.diagramKeyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
