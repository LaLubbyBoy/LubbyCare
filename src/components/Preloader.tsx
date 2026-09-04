/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Preloader() {
  const { isPreloaderActive, setIsPreloaderActive } = useApp();
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isPreloaderActive) {
      setProgress(100);
      const t = setTimeout(() => setShouldRender(false), 800);
      return () => clearTimeout(t);
    }

    // Reset progress and make sure it renders when transition is triggered
    setProgress(0);
    setShouldRender(true);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const t = setTimeout(() => {
            setIsPreloaderActive(false);
            const t2 = setTimeout(() => setShouldRender(false), 800);
            return () => clearTimeout(t2);
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPreloaderActive, setIsPreloaderActive]);

  if (!shouldRender) return null;

  return (
    <div
      id="lubbycare-preloader"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50 dark:bg-[#121212] transition-all duration-700 ease-out ${
        progress === 100 ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6">
        {/* Brand Logo Animation */}
        <div className="relative mb-8 text-center">
          <span className="font-serif text-4xl md:text-5xl tracking-[0.25em] text-emerald-950 dark:text-stone-100 animate-pulse">
            LUBBYCARE
          </span>
          <div className="mt-2 text-xs md:text-sm font-sans tracking-[0.4em] text-amber-600 dark:text-amber-500 uppercase">
            PREMIUM SKINCARE
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full h-[2px] bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-900 dark:bg-amber-500 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between w-full font-mono text-[10px] text-stone-400 dark:text-stone-500 tracking-wider">
          <span>RITUAL INITIALIZATION</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>

      {/* Aesthetic ambient lighting circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/10 dark:bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
}
