/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useApp } from './context/AppContext';
import Preloader from './components/Preloader';
import HeaderNavbar from './components/HeaderNavbar';
import Footer from './components/Footer';
import AIChatAssistant from './components/AIChatAssistant';

// Modular Page Views
import Home from './pages/Home';
import CoreShopping from './pages/CoreShopping';
import SkinEd from './pages/SkinEd';
import InteractiveAI from './pages/InteractiveAI';
import MainDashboard from './pages/MainDashboard';

export default function App() {
  const { theme, activeRoute } = useApp();

  // Scroll to top on route change
  const handleRouteChange = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {/* Absolute Outer Wrapper to lock theme colors and font style */}
      <div className="bg-brand-bg dark:bg-[#121412] text-stone-800 dark:text-stone-100 min-h-screen font-sans flex flex-col justify-between selection:bg-brand-green selection:text-white dark:selection:bg-brand-gold dark:selection:text-stone-900 transition-colors duration-300">
        
        {/* Animated Custom Preloader */}
        <Preloader />

        {/* Global sticky luxurious navbar */}
        <HeaderNavbar />

        {/* Dynamic Route Content Shell */}
        <main className="flex-grow pt-4">
          
          {/* Homepage */}
          {activeRoute === 'home' && <Home />}

          {/* Shop Views: catalog, details, cart, checkout */}
          {(activeRoute === 'shop' || activeRoute === 'cart' || activeRoute === 'checkout') && <CoreShopping />}

          {/* Educational Content: ingredients, concerns, routines, blog chronicles */}
          {(activeRoute === 'ingredients' || activeRoute === 'concerns' || activeRoute === 'routines' || activeRoute === 'reviews' || activeRoute === 'journal') && <SkinEd />}

          {/* Smart Interactive Tools: step quiz, spectrum scanner */}
          {(activeRoute === 'quiz' || activeRoute === 'analysis') && <InteractiveAI />}

          {/* Account and Static layouts */}
          {(activeRoute === 'dashboard' || activeRoute === 'about' || activeRoute === 'sustainability' || activeRoute === 'contact' || activeRoute === 'faq' || activeRoute === 'privacy' || activeRoute === 'terms' || activeRoute === 'wishlist') && <MainDashboard />}

        </main>

        {/* Multi-column structured branding footer */}
        <Footer />

        {/* Skincare AI Concierge Assistant bubble */}
        <AIChatAssistant />

      </div>
    </div>
  );
}
