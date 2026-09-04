/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/storeData';
import {
  Sparkles,
  Bot,
  Camera,
  RotateCcw,
  Star,
  CheckCircle,
  TrendingUp,
  Droplet,
  ShieldCheck,
  Zap,
  Loader2,
  Lock
} from 'lucide-react';

export default function InteractiveAI() {
  const { activeRoute } = useApp();

  // Route dispatcher
  if (activeRoute === 'quiz') {
    return <SkinQuizView />;
  }
  if (activeRoute === 'analysis') {
    return <SkinAnalysisView />;
  }
  return null;
}

// ----------------------------------------------------
// 1. SKIN QUIZ VIEW
// ----------------------------------------------------
function SkinQuizView() {
  const { setRoute, setActiveProductId } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      title: 'What is your primary dermal concern?',
      desc: 'This allows us to select active cosmetic compounds.',
      options: [
        { label: 'Dullness & Dark Spots', value: 'brighten' },
        { label: 'Active breakouts & Acne', value: 'acne' },
        { label: 'Redness & Barrier sensitivity', value: 'redness' },
        { label: 'Fine lines & cellular elasticity', value: 'aging' }
      ]
    },
    {
      title: 'How does your skin feel by midday?',
      desc: 'Helps estimate sebum density and hydration rates.',
      options: [
        { label: 'Shiny or oily across the T-zone', value: 'oily' },
        { label: 'Tight, flaky, or dry', value: 'dry' },
        { label: 'Flushed, stinging, or red', value: 'sensitive' },
        { label: 'Hydrated, balanced, and normal', value: 'normal' }
      ]
    },
    {
      title: 'Choose your ideal formulation texture:',
      desc: 'Ensures we deliver high cosmetic elegance.',
      options: [
        { label: 'Fluid, fast absorbing gel-serums', value: 'fluid' },
        { label: 'Plump, medium velvet creams', value: 'cream' },
        { label: 'Immense, lipid nourishing facial oils', value: 'oil' }
      ]
    }
  ];

  const handleSelect = (val: string) => {
    const updated = [...answers, val];
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers([]);
    setCurrentStep(0);
    setShowResult(false);
  };

  // Recommendations compiler based on answers
  const primaryGoal = answers[0] || 'brighten';
  const matchingProducts = PRODUCTS.filter(p => {
    if (primaryGoal === 'brighten') return p.id === 'lum-c' || p.id === 'ni-ton';
    if (primaryGoal === 'acne') return p.id === 'sal-clean' || p.id === 'ni-ton';
    if (primaryGoal === 'redness') return p.id === 'cer-cream' || p.id === 'ni-ton';
    return p.id === 'ret-renew' || p.id === 'cer-cream';
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 animate-fadeIn text-left">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">DIAGNOSTIC MATRIX</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">AI Skin Diagnostics Quiz</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed font-light">
          Formulated to match you with exact cosmetic formulas based on your stratum barrier type, oil levels, and sensitivity profile.
        </p>
      </div>

      {!showResult ? (
        <div className="glass-card p-6 md:p-10 rounded-3xl border border-black/5 dark:border-white/5 space-y-8 max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[9px] text-stone-400 tracking-widest font-semibold">
              <span>PROGRESS MATRIX</span>
              <span>QUESTION {currentStep + 1} OF {questions.length}</span>
            </div>
            <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-green dark:bg-brand-gold transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <h2 className="font-serif text-lg md:text-2xl font-bold text-stone-900 dark:text-stone-100">{questions[currentStep].title}</h2>
              <p className="text-xs text-stone-400 font-sans font-light">{questions[currentStep].desc}</p>
            </div>

            <div className="flex flex-col gap-3">
              {questions[currentStep].options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="text-left p-4 rounded-2xl border border-stone-200/50 dark:border-stone-850 hover:border-brand-green dark:hover:border-brand-gold bg-brand-sage/5 dark:bg-white/5 text-stone-700 dark:text-stone-300 text-xs font-sans font-semibold tracking-wide transition-all hover:translate-x-1 cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Result diagnostic board */}
          <div className="glass-card border border-black/5 dark:border-white/5 p-8 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-3xl mx-auto">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-green dark:text-brand-gold" />
                <span className="text-[10px] font-mono tracking-widest text-brand-green dark:text-brand-gold font-bold uppercase">DIAGNOSTIC RESOLVED</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">Your Skin Profile: {primaryGoal === 'brighten' ? 'Oxidative Dullness' : primaryGoal === 'acne' ? 'Sebum Congested Barrier' : 'Lipid Depleted Barrier'}</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-sans leading-relaxed font-light">
                Your answers suggest your stratum protective barrier requires targeted {primaryGoal === 'brighten' ? 'Melanin defense and acidic peeling' : primaryGoal === 'acne' ? 'Salicylic cellular clearance' : 'lipid Ceramide repair cream'}.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 border border-stone-200 dark:border-stone-800 p-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-850 font-mono text-[10px] tracking-widest font-bold text-stone-500 uppercase cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RETAKE AUDIT</span>
              </button>
            </div>
          </div>

          {/* Recommendations block */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100">AI Tailored Formulations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {matchingProducts.map(prod => (
                <div
                  key={prod.id}
                  className="glass-card p-5 rounded-2xl border border-black/5 dark:border-white/5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center"
                >
                  <img src={prod.image} alt={prod.name} className="sm:col-span-4 aspect-square object-cover rounded-xl w-full" />
                  <div className="sm:col-span-8 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">{prod.category}</span>
                      <h4
                        onClick={() => {
                          setActiveProductId(prod.id);
                          setRoute('shop');
                        }}
                        className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 hover:text-brand-green dark:hover:text-brand-gold cursor-pointer transition-colors"
                      >
                        {prod.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2 leading-normal font-light">{prod.description}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono font-bold text-stone-950 dark:text-stone-200">${prod.price}</span>
                      <button
                        onClick={() => {
                          setActiveProductId(prod.id);
                          setRoute('shop');
                        }}
                        className="text-[10px] text-brand-green dark:text-brand-gold font-sans tracking-widest font-bold hover:underline uppercase transition-colors"
                      >
                        VIEW MATRIX
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 2. SKIN ANALYSIS SCANNER SIMULATION VIEW
// ----------------------------------------------------
function SkinAnalysisView() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanningMessage, setScanningMessage] = useState('Initiating spectrum camera...');

  const messages = [
    'Initializing laser spectrum matrices...',
    'Measuring dermal moisture capacity...',
    'Analyzing T-Zone sebum lipid density...',
    'Assessing cellular pigment & melanin levels...',
    'Calculating epidermal wrinkle score...'
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);

    // Dynamic steps loader
    let step = 0;
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setScanResult({
              hydration: 72,
              sebum: 38,
              melanin: 42,
              redness: 14,
              overall: 84
            });
          }, 400);
          return 100;
        }
        if (prev % 20 === 0 && step < messages.length - 1) {
          setScanningMessage(messages[step]);
          step += 1;
        }
        return prev + 5;
      });
    }, 180);
  };

  const recommendedMatches = PRODUCTS.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12 animate-fadeIn text-left">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">SPECTRUM ANALYSIS</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">AI Skin Analysis Clinic</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed font-light">
          Simulate a physical dermatological diagnostic check. Our smart analyzer matches lipid indices and melanin rates to craft a customized daily formula map.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Camera screen simulator */}
        <div className="lg:col-span-6 glass-card p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-900 flex items-center justify-center">
            
            {/* Ambient medical lines layout */}
            <div className="absolute inset-0 opacity-20 pointer-events-none border-2 border-dashed border-brand-green m-4 rounded-xl" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-green/30 animate-pulse pointer-events-none" />

            {isScanning ? (
              <div className="text-center text-[#eae2d3] space-y-4 relative z-10 px-6">
                <Loader2 className="w-10 h-10 animate-spin text-brand-gold mx-auto" />
                <div className="space-y-1">
                  <p className="font-serif text-sm tracking-wider font-semibold">{scanningMessage}</p>
                  <p className="text-[10px] font-mono text-stone-400">{scanProgress}% completed</p>
                </div>
                {/* Dynamic loader bar */}
                <div className="w-48 h-1 bg-stone-850 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-brand-gold transition-all duration-150" style={{ width: `${scanProgress}%` }} />
                </div>
              </div>
            ) : scanResult ? (
              <div className="text-center text-[#eae2d3] space-y-3 relative z-10">
                <CheckCircle className="w-12 h-12 text-brand-gold mx-auto" />
                <h3 className="font-serif text-lg tracking-wider font-semibold text-white">Spectrum Scan Completed</h3>
                <p className="text-xs text-stone-400 font-sans max-w-xs mx-auto">Clinical metrics successfully resolved and computed below.</p>
              </div>
            ) : (
              <div className="text-center text-[#eae2d3] space-y-6 relative z-10">
                <Camera className="w-12 h-12 text-stone-400 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold tracking-wider text-white">Dermal Camera Ready</h3>
                  <p className="text-[10px] font-mono text-stone-550">Requires a bright ambient room environment</p>
                </div>
                <button
                  onClick={handleStartScan}
                  className="bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 font-sans text-xs tracking-widest font-bold px-8 py-3.5 rounded-full shadow-lg cursor-pointer transition-all hover:scale-103"
                >
                  START AI SKINNING
                </button>
              </div>
            )}
          </div>
          <div className="text-[10px] text-stone-400 font-mono text-center uppercase tracking-widest">
            🛡️ 100% Client Image Privacy Deployed • Images never stored on remote servers
          </div>
        </div>

        {/* Right Side: Analysis report dashboards */}
        <div className="lg:col-span-6 space-y-6">
          {scanResult ? (
            <div className="glass-card p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
                <h3 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">Dermal report index</h3>
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-brand-green dark:text-brand-gold bg-brand-green/10 dark:bg-brand-gold/10 px-3 py-1 rounded-full">
                  <span>OVERALL SCORE: {scanResult.overall}/100</span>
                </div>
              </div>

              {/* D3 Style Custom SVG Grid Metrics */}
              <div className="space-y-4">
                {[
                  { label: 'Hydration index', value: scanResult.hydration, unit: '%', desc: 'Moisture volume levels within stratum layer' },
                  { label: 'Sebum Oil index', value: scanResult.sebum, unit: '%', desc: 'Active lipid sebum secretions at pores' },
                  { label: 'Melanin Pigment Density', value: scanResult.melanin, unit: '%', desc: 'Melanocyte cell density and dark pigments' },
                  { label: 'Redness irritation index', value: scanResult.redness, unit: '%', desc: 'Capillary dilation and epidermal sensitivity' }
                ].map(stat => (
                  <div key={stat.label} className="space-y-1 font-sans text-xs">
                    <div className="flex justify-between font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                      <span>{stat.label}</span>
                      <span className="font-mono">{stat.value}{stat.unit}</span>
                    </div>
                    {/* Diagnostic Progress line bar */}
                    <div className="w-full h-2 bg-stone-100 dark:bg-stone-850 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${stat.value < 20 ? 'bg-brand-gold' : 'bg-brand-green dark:bg-brand-gold'}`}
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-stone-400 font-sans block leading-tight font-light">{stat.desc}</span>
                  </div>
                ))}
              </div>

              <div className="bg-brand-sage/10 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5 text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-sans space-y-1.5">
                <p className="font-serif font-bold text-stone-800 dark:text-stone-200">Clinical Formulation Plan:</p>
                <p className="font-light">
                  Your hydration scores suggest standard protective humectants are working. However, sebum congestion remains active across the nasal paths. We recommend adding Salicylic cleansers combined with Ceramides to resolve breakouts without dry peeling.
                </p>
              </div>

              {/* Direct recommended product boxes */}
              <div className="space-y-3 pt-3 border-t border-black/5 dark:border-white/5">
                <h4 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold">Recommended Treatment Bottles</h4>
                <div className="grid grid-cols-2 gap-4">
                  {recommendedMatches.map(prod => (
                    <div key={prod.id} className="glass-card p-3 rounded-xl border border-black/5 dark:border-white/5 flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <h5 className="font-serif text-[11px] font-bold text-stone-900 dark:text-stone-100 truncate">{prod.name}</h5>
                        <span className="text-[9px] font-mono text-stone-400 block">${prod.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 rounded-3xl border border-black/5 dark:border-white/5 text-center space-y-4">
              <Bot className="w-12 h-12 text-stone-400 mx-auto animate-pulse" />
              <h3 className="font-serif text-lg text-stone-800 dark:text-stone-200 font-bold">Waiting for Scan...</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed font-light">
                Click the start button to run diagnostic spectrums. Our neural analyzer will measure lipid matrices and output full reports.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
