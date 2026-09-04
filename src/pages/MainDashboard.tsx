/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/storeData';
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  Gift,
  HelpCircle,
  Truck,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Calendar,
  Sparkles,
  RefreshCw,
  Globe2,
  Lock,
  Trash2,
  Star
} from 'lucide-react';

export default function MainDashboard() {
  const { activeRoute } = useApp();

  // Route dispatcher
  if (activeRoute === 'dashboard') {
    return <CustomerDashboardView />;
  }
  if (activeRoute === 'about') {
    return <AboutBrandView />;
  }
  if (activeRoute === 'sustainability') {
    return <SustainabilityView />;
  }
  if (activeRoute === 'contact') {
    return <ContactFormView />;
  }
  if (activeRoute === 'faq') {
    return <FaqAccordionsView />;
  }
  if (activeRoute === 'privacy' || activeRoute === 'terms') {
    return <LegalDocumentsView />;
  }
  if (activeRoute === 'wishlist') {
    return <WishlistView />;
  }
  return null;
}

// ----------------------------------------------------
// 1. CUSTOMER ACCOUNT & ORDERS DASHBOARD VIEW
// ----------------------------------------------------
function CustomerDashboardView() {
  const { userProfile, orderHistory, setRoute } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'refills' | 'loyalty' | 'profile'>('orders');
  const [profileName, setProfileName] = useState(userProfile.name);
  const [profileEmail, setProfileEmail] = useState(userProfile.email);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-refill simulation states
  const [subscriptions, setSubscriptions] = useState([
    { id: 'sub-1', name: 'Luminosity C Glow Serum', nextDate: 'July 15, 2026', size: '30ml', interval: 'Every 30 Days', status: 'Active' }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopyReferral = () => {
    setCopiedReferral(true);
    showToast('Referral link copied to clipboard.');
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleSkipSubscription = (id: string) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, nextDate: 'August 15, 2026' } : s));
    showToast('Refill schedule successfully skipped by 30 days.');
  };

  const handleCancelSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
    showToast('Refill schedule successfully cancelled.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10 animate-fadeIn text-left">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-brand-green/95 dark:bg-stone-900/95 text-white dark:text-brand-gold border border-brand-gold/20 px-6 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md animate-slideDown flex items-center gap-3 text-xs font-sans font-semibold">
          <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile Overview Banner */}
      <div className="bg-brand-green text-white border border-black/5 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[50px] rounded-full" />
        
        <div className="flex items-center gap-4 flex-col md:flex-row text-center md:text-left">
          <div className="w-16 h-16 bg-white/10 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight">{profileName}</h1>
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold block mt-0.5">
              EMERALD VIP LEVEL • 450 DERMAL POINTS
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setRoute('quiz')}
            className="bg-brand-gold hover:bg-brand-gold/90 text-stone-950 font-sans text-[10px] tracking-widest font-bold px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-103 cursor-pointer"
          >
            NEW SKIN DIAGNOSTIC
          </button>
        </div>
      </div>

      {/* Main dashboard grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Sidebar tabs */}
        <aside className="lg:col-span-3 glass-card p-4 rounded-2xl border border-black/5 dark:border-white/5 space-y-2">
          {[
            { id: 'orders', label: 'Order History', icon: ShoppingBag },
            { id: 'refills', label: 'Auto-Refill schedules', icon: RefreshCw },
            { id: 'loyalty', label: 'VIP Loyalty Rewards', icon: Gift },
            { id: 'profile', label: 'Profile Coordinates', icon: Settings }
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer ${activeTab === tab.id ? 'bg-brand-green text-white dark:bg-brand-gold dark:text-stone-950' : 'text-stone-500 hover:bg-stone-100/50 dark:hover:bg-stone-900/40'}`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Side primary content block */}
        <main className="lg:col-span-9 glass-card border border-black/5 dark:border-white/5 p-6 md:p-8 rounded-2xl min-h-[400px]">
          
          {/* 1. ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide">Decreed Order Logs</h3>
              
              {orderHistory.length === 0 ? (
                <div className="py-12 text-center text-stone-400 font-sans text-xs font-light">No orders decreed. Place an order in the checkout to populate.</div>
              ) : (
                <div className="space-y-6">
                  {orderHistory.map(ord => (
                    <div key={ord.id} className="bg-stone-100/40 dark:bg-stone-900/40 p-5 rounded-2xl border border-black/5 dark:border-white/5 space-y-4 animate-fadeIn">
                      {/* Order info header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/5 dark:border-white/5 pb-3 gap-2">
                        <div>
                          <span className="font-mono text-xs font-bold text-stone-800 dark:text-stone-200 block uppercase">ORDER ID: {ord.id}</span>
                          <span className="text-[10px] text-stone-400 font-sans">Decreed date: {ord.date}</span>
                        </div>
                        <span className="text-[10px] font-mono tracking-widest bg-brand-green/10 text-brand-green dark:bg-brand-gold/10 dark:text-brand-gold px-3.5 py-1 rounded-full uppercase font-bold border border-black/5">
                          {ord.status}
                        </span>
                      </div>

                      {/* Purchased products lists */}
                      <div className="space-y-2">
                        {ord.items.map(it => (
                          <div key={it.id} className="flex justify-between items-center text-xs font-sans text-stone-600 dark:text-stone-300">
                            <span className="font-light">{it.quantity}x {it.product.name} ({it.size})</span>
                            <span className="font-mono font-bold">${it.product.price * it.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Progress track timeline */}
                      <div className="bg-white/45 dark:bg-[#151515]/45 p-4 rounded-xl border border-black/5 dark:border-white/5 space-y-3 font-sans text-xs">
                        <div className="flex items-center gap-2 font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                          <Truck className="w-4 h-4 text-brand-gold" />
                          <span>Carbon-Neutral delivery tracking</span>
                        </div>
                        <div className="grid grid-cols-3 text-center text-[10px] font-mono uppercase font-bold relative before:absolute before:top-1.5 before:left-[16%] before:right-[16%] before:h-0.5 before:bg-stone-200 dark:before:bg-stone-800">
                          <div className="space-y-1 text-brand-green dark:text-brand-gold relative z-10">
                            <span className="w-3.5 h-3.5 rounded-full bg-brand-green dark:bg-brand-gold border-2 border-white dark:border-stone-900 mx-auto block" />
                            <span>DECREED</span>
                          </div>
                          <div className="space-y-1 text-brand-green dark:text-brand-gold relative z-10">
                            <span className="w-3.5 h-3.5 rounded-full bg-brand-green dark:bg-brand-gold border-2 border-white dark:border-stone-900 mx-auto block" />
                            <span>SHIPPED</span>
                          </div>
                          <div className="space-y-1 text-stone-400 relative z-10">
                            <span className="w-3.5 h-3.5 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-stone-900 mx-auto block" />
                            <span>TRANSIT</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                          <span>Courier: FedEx Cargo Express</span>
                          <span>Tracking: {ord.trackingNumber}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. AUTO-REFILL SUBSCRIPTIONS SCHEDULES */}
          {activeTab === 'refills' && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide">Auto-Refill Ritual Schedules</h3>
              
              {subscriptions.length === 0 ? (
                <div className="py-12 text-center text-stone-400 font-sans text-xs font-light">No active auto-refill subscriptions. Subscribe to any formula in the detail page.</div>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map(sub => (
                    <div key={sub.id} className="bg-stone-100/40 dark:bg-stone-900/40 p-5 rounded-2xl border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left animate-fadeIn">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono tracking-widest text-brand-green dark:text-brand-gold font-bold uppercase">{sub.interval}</span>
                        <h4 className="font-serif text-base font-bold text-stone-950 dark:text-stone-100">{sub.name}</h4>
                        <p className="text-xs text-stone-400 font-sans font-light">Next shipping date: <b>{sub.nextDate}</b></p>
                      </div>

                      <div className="flex gap-2.5">
                        <button
                          onClick={() => handleSkipSubscription(sub.id)}
                          className="bg-brand-green hover:bg-brand-green-hover text-white font-sans text-[10px] tracking-widest font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
                        >
                          SKIP 30 DAYS
                        </button>
                        <button
                          onClick={() => handleCancelSubscription(sub.id)}
                          className="bg-transparent hover:bg-red-500/5 border border-black/10 dark:border-white/10 hover:border-red-500 hover:text-red-500 text-stone-400 font-sans text-[10px] tracking-widest font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
                        >
                          CANCEL RITUAL
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. VIP LOYALTY REWARDS */}
          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                <Gift className="w-5 h-5 text-brand-gold" />
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide">Emerald VIP Dermal Lounge</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Points Card */}
                <div className="bg-brand-green text-white border border-black/5 p-6 rounded-2xl relative overflow-hidden">
                  <span className="text-[9px] font-mono tracking-widest text-brand-gold font-bold uppercase block">ACTIVE BALANCE</span>
                  <div className="font-serif text-4xl font-bold tracking-tight mt-1.5">450 Dermal Points</div>
                  <span className="text-[10px] text-stone-300 font-sans mt-1 block font-light">Accumulate 1 point for every $1 decreed in cart.</span>
                </div>

                {/* Referrals Card */}
                <div className="bg-stone-100/40 dark:bg-stone-900/40 p-6 rounded-2xl border border-black/5 dark:border-white/5 space-y-4">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-brand-green dark:text-brand-gold font-bold uppercase block">REFERRAL CODES</span>
                    <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 mt-1">Acquire 50 Free Points</h4>
                    <p className="text-[10px] text-stone-400 font-sans leading-tight mt-1 font-light">Share LubbyCare with friends. They receive 15% discount on checkout; you gain 50 VIP points.</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      className="flex-1 bg-white/70 dark:bg-stone-800/75 border border-black/5 dark:border-white/5 outline-none font-mono text-xs p-2.5 rounded-lg text-stone-500"
                      value="https://lubbycare.com/refer/amara450"
                    />
                    <button
                      onClick={handleCopyReferral}
                      className="bg-brand-green hover:bg-brand-green-hover text-white text-[10px] tracking-widest font-bold font-sans px-4 rounded-lg cursor-pointer transition-all"
                    >
                      {copiedReferral ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <form onSubmit={e => { e.preventDefault(); showToast('Profile coordinates updated successfully.'); }} className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide">Profile Coordinates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                <div className="space-y-1.5 font-light">
                  <label className="font-bold text-stone-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-stone-100/50 dark:bg-stone-850/55 border border-black/5 dark:border-white/5 outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100 font-sans focus:border-brand-green/20"
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 font-light">
                  <label className="font-bold text-stone-500 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-stone-100/50 dark:bg-stone-850/55 border border-black/5 dark:border-white/5 outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100 font-sans focus:border-brand-green/20"
                    value={profileEmail}
                    onChange={e => setProfileEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 text-xs font-sans tracking-widest font-bold px-8 py-3 rounded-full cursor-pointer hover:scale-101 transition-transform"
              >
                SAVE COORDINATES
              </button>
            </form>
          )}

        </main>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. BRAND NARRATIVE STORY VIEW
// ----------------------------------------------------
function AboutBrandView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 animate-fadeIn text-left">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">OUR NARRATIVE STORY</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">The Story of LubbyCare</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed font-light">
          Pioneering clinical skincare solutions with botanical matrices. Designed for complete dermal confidence.
        </p>
      </div>

      <div className="aspect-video w-full rounded-2xl overflow-hidden glass-card border border-black/5 dark:border-white/5">
        <img src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200" alt="LubbyCare aesthetic" className="w-full h-full object-cover" />
      </div>

      <div className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-6">
        <h3 className="font-serif text-xl sm:text-2xl text-stone-900 dark:text-stone-100 font-bold">The Botanical Alchemy</h3>
        <p className="font-light">
          Founded in Seattle by dermatological chemists, LubbyCare arose from a critical mismatch: luxury skincare brands were overloaded with synthetic perfumes and silicones, while raw herbal brands lacked biological penetrability.
        </p>
        <p className="font-light">
          We set out to create a bridge: combining certified, organic plant-derived extracts with medical-grade synthetics to feed and restore the skin’s natural barrier.
        </p>

        <div className="border-t border-b border-black/5 dark:border-white/5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-serif">
          <div>
            <span className="text-3xl text-brand-green dark:text-brand-gold font-bold">12+</span>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono mt-1 font-bold">Clinical Formulas</p>
          </div>
          <div>
            <span className="text-3xl text-brand-green dark:text-brand-gold font-bold">100k+</span>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono mt-1 font-bold">Skin Transformations</p>
          </div>
          <div>
            <span className="text-3xl text-brand-green dark:text-brand-gold font-bold">0%</span>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono mt-1 font-bold">Artificial perfumes</p>
          </div>
          <div>
            <span className="text-3xl text-brand-green dark:text-brand-gold font-bold">100%</span>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono mt-1 font-bold">Verified organic</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. SUSTAINABILITY COMMITMENT VIEW
// ----------------------------------------------------
function SustainabilityView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 animate-fadeIn text-left">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">ECO-SYSTEM PROTECTION</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">Sustainability Matrix</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed font-light">
          Carbon-neutral delivery networks and FSC-certified recycled packaging structures.
        </p>
      </div>

      <div className="aspect-video w-full rounded-2xl overflow-hidden glass-card border border-black/5 dark:border-white/5">
        <img src="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=1200" alt="Botanical field" className="w-full h-full object-cover" />
      </div>

      <div className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-6">
        <h3 className="font-serif text-xl sm:text-2xl text-stone-900 dark:text-stone-100 font-bold">Carbon-Neutral Formula Craft</h3>
        <p className="font-light">
          Every LubbyCare glass vial is designed for recyclability. Our labels are crafted from 100% PCR hemp-derived paper printed with vegetable ink matrices, keeping landfill impacts at absolute zero.
        </p>
        <p className="font-light">
          We source all our active botanical assets from audited, fair-trade cooperative farms in Oregon and Provence, ensuring the entire growth pipeline remains sustainable.
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. CONCIERGE CONTACT FORM VIEW
// ----------------------------------------------------
function ContactFormView() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 animate-fadeIn text-left">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">CLIENT RELATIONSHIPS</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight animate-slideDown">Concierge Contact Desk</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed font-light">
          Connect with our Seattle laboratory representatives for formulation consultations and account coordinates.
        </p>
      </div>

      {submitted ? (
        <div className="bg-brand-green/5 border border-black/5 dark:border-white/5 p-10 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
          <CheckCircle className="w-12 h-12 text-brand-green dark:text-brand-gold mx-auto animate-pulse" />
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">Consultation Dispatched</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto font-light">A dermatologist representative will contact you via email within 24 hours.</p>
        </div>
      ) : (
        <form
          onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
          className="glass-card p-6 md:p-8 rounded-3xl border border-black/5 dark:border-white/5 space-y-5 max-w-xl mx-auto font-sans text-xs"
        >
          <div className="space-y-1.5 font-light">
            <label className="font-bold text-stone-500 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-stone-100/50 dark:bg-stone-850/50 border border-black/5 dark:border-white/5 outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100 font-sans focus:border-brand-green/20"
              placeholder="Amara Vance"
            />
          </div>
          <div className="space-y-1.5 font-light">
            <label className="font-bold text-stone-500 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-stone-100/50 dark:bg-stone-850/50 border border-black/5 dark:border-white/5 outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100 font-sans focus:border-brand-green/20"
              placeholder="amara@luxurybeauty.com"
            />
          </div>
          <div className="space-y-1.5 font-light">
            <label className="font-bold text-stone-500 uppercase tracking-wider">Dermal Inquiries</label>
            <textarea
              required
              rows={4}
              className="w-full bg-stone-100/50 dark:bg-stone-850/50 border border-black/5 dark:border-white/5 outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100 font-sans focus:border-brand-green/20"
              placeholder="Please detail your skin concern or product inquiry..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-4 rounded-full font-sans text-xs font-bold tracking-widest shadow-md uppercase cursor-pointer hover:scale-101 transition-all"
          >
            DISPATCH CONSULTATION
          </button>
        </form>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 5. HELPCENTER FAQ ACCORDIONS VIEW
// ----------------------------------------------------
function FaqAccordionsView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqsList = [
    { q: 'Are LubbyCare products suitable for sensitive skin?', a: 'Yes, 100% of our products are dermatologist-tested and formulated at optimized pH metrics of 3.2 - 5.5 to eliminate Kapilary reactions or epidermal flushes.' },
    { q: 'How does the auto-refill subscription work?', a: 'By subscribing, you unlock complimentary express shipping and a persistent 15% discount on all formulas. Bottles are dispatched automatically every 30 days.' },
    { q: 'Where are your formulations developed and certified?', a: 'All formulas are compiled within our certified carbon-neutral laboratories in Seattle, Washington.' },
    { q: 'Are your items certified vegan and cruelty-free?', a: 'LubbyCare is strictly vegan. We hold PETA and Leaping Bunny certifications ensuring 0% testing cycles on animals.' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-10 animate-fadeIn text-left">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">HELP DESK</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight text-center">Frequently Audited FAQs</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed text-center font-light">
          Find rapid explanations regarding shipment dispatches, clinical audits, and skin diagnostics.
        </p>
      </div>

      <div className="space-y-4">
        {faqsList.map((faq, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left font-serif text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between cursor-pointer hover:text-brand-green dark:hover:text-brand-gold transition-colors"
            >
              <span>{faq.q}</span>
              <span className="text-brand-green dark:text-brand-gold text-lg font-bold">
                {openIndex === idx ? '−' : '+'}
              </span>
            </button>
            
            {openIndex === idx && (
              <div className="p-5 pt-0 border-t border-black/5 dark:border-white/5 text-xs text-stone-500 dark:text-stone-400 font-sans leading-relaxed font-light">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. LEGAL PRIVACY & TERMS DOCUMENTS VIEW
// ----------------------------------------------------
function LegalDocumentsView() {
  const { activeRoute } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 animate-fadeIn text-left">
      <h1 className="font-serif text-2xl md:text-4xl text-stone-900 dark:text-stone-100 tracking-tight font-bold">
        {activeRoute === 'privacy' ? 'Privacy Policy & Conditions' : 'Terms of Service agreements'}
      </h1>
      <span className="text-[10px] font-mono uppercase text-stone-400 dark:text-brand-gold font-bold tracking-widest">LAST REVISED: JUNE 25, 2026</span>
      
      <div className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed space-y-4 border-t border-black/5 dark:border-white/5 pt-6 font-light">
        <p>
          We value absolute data coordinates transparency. In order to simulate advanced AI Skin Diagnostic reports, we scan facial melanin rates and hydration rates. All images are processed purely client-side; your image files are never hosted on external clouds or remote databases.
        </p>
        <p>
          Furthermore, credit card digits are compiled via secure SSL encryptor tunnels. We adhere strictly to HIPAA guidelines regarding health diagnostics and client records.
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 7. CLIENT SAVED FAVORITES (WISHLIST) VIEW
// ----------------------------------------------------
function WishlistView() {
  const { wishlist, toggleWishlist, addToCart, setRoute } = useApp();
  
  // Find full product details for items in the wishlist
  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10 animate-fadeIn text-left">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">CLIENT FAVORITES</span>
        <h1 className="font-serif text-3xl md:text-[54px] text-stone-900 dark:text-stone-100 tracking-tight text-center leading-tight">Your Saved Favorites</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed text-center font-light">
          A personalized matrix of your curated skincare formulations, ready to elevate your daily ritual.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="glass-card rounded-3xl border border-black/5 dark:border-white/5 p-12 text-center space-y-6 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center mx-auto text-stone-400 dark:text-brand-gold border border-black/5 dark:border-white/5">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">Your Favorites is Empty</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto font-sans leading-relaxed font-light">
            Explore our curated collections of botanical and active scientific compound rituals to start saving your favorites.
          </p>
          <button
            onClick={() => setRoute('shop')}
            className="bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold/95 text-white dark:text-stone-950 font-sans text-xs tracking-widest font-bold px-8 py-3 rounded-full cursor-pointer hover:scale-101 transition-transform uppercase"
          >
            EXPLORE COUTURE CATALOG
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => {
            return (
              <div
                key={product.id}
                className="glass-card rounded-2xl border border-black/5 dark:border-white/5 p-4 flex flex-col justify-between h-full group transition-all duration-300 relative"
              >
                <div className="space-y-4">
                  {/* Product Image Panel */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-black/5 dark:border-white/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Remove Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md rounded-full text-red-500 border border-black/5 dark:border-white/5 hover:scale-110 cursor-pointer transition-transform"
                      aria-label="Remove from Favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Metadata & Description */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-brand-green dark:text-brand-gold font-bold">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-brand-gold">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-mono text-stone-500 dark:text-stone-400">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Buy Action */}
                <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-sm font-mono font-bold text-stone-900 dark:text-stone-200">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product, product.variantSizes[0], false, 1)}
                    className="bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 text-[10px] font-sans tracking-widest font-bold px-4 py-2 rounded-full cursor-pointer hover:scale-101 transition-all"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
