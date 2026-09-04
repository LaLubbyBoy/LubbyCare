/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Instagram,
  Facebook,
  Youtube,
  Send,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function Footer() {
  const { setRoute, applyPromoCode } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Apply standard WELCOME10 coupon immediately as active
    applyPromoCode('WELCOME10');
    setSubscribed(true);
    setEmail('');
  };

  const columns = {
    Shop: [
      { label: 'All Products', route: 'shop' as const },
      { label: 'Best Sellers', route: 'shop' as const },
      { label: 'Serums & Actives', route: 'shop' as const },
      { label: 'Moisturizers', route: 'shop' as const },
      { label: 'Cleansers & Toners', route: 'shop' as const }
    ],
    Learn: [
      { label: 'Ingredients Library', route: 'ingredients' as const },
      { label: 'Skin Concerns', route: 'concerns' as const },
      { label: 'Routine Planners', route: 'routines' as const },
      { label: 'Skincare Journal', route: 'journal' as const },
      { label: 'AI Diagnostic', route: 'analysis' as const }
    ],
    Company: [
      { label: 'About Our Story', route: 'about' as const },
      { label: 'Sustainability Commitment', route: 'sustainability' as const },
      { label: 'Careers', route: 'dashboard' as const }, // points to dashboard sections
      { label: 'Wholesale & B2B', route: 'dashboard' as const },
      { label: 'Press Room', route: 'dashboard' as const }
    ],
    Support: [
      { label: 'Contact Concierge', route: 'contact' as const },
      { label: 'FAQs & Help Center', route: 'faq' as const },
      { label: 'Shipping & Delivery', route: 'faq' as const },
      { label: 'Returns & Exchanges', route: 'faq' as const },
      { label: 'Order Tracking', route: 'dashboard' as const }
    ]
  };

  return (
    <footer id="lubbycare-footer" className="bg-[#0c130f] text-[#eae2d3] border-t border-black/5 relative z-20">
      
      {/* High-Value Brand Pillars Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-b border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex items-start gap-4 flex-col md:flex-row text-center md:text-left items-center md:items-start">
          <div className="p-3 bg-brand-green/30 rounded-full border border-white/10 text-brand-gold">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-widest font-semibold text-stone-100 uppercase">COMPLIMENTARY DELIVERY</h4>
            <p className="text-[11px] text-stone-400 mt-1 font-sans">Receive complimentary express shipping on all domestic orders over $100.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 flex-col md:flex-row text-center md:text-left items-center md:items-start">
          <div className="p-3 bg-brand-green/30 rounded-full border border-white/10 text-brand-gold">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-widest font-semibold text-stone-100 uppercase">RETURNS POLICY</h4>
            <p className="text-[11px] text-stone-400 mt-1 font-sans">Indulge in confidence with our complimentary 30-day structural satisfaction guarantee.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 flex-col md:flex-row text-center md:text-left items-center md:items-start">
          <div className="p-3 bg-brand-green/30 rounded-full border border-white/10 text-brand-gold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-widest font-semibold text-stone-100 uppercase">CLINICAL AUDITING</h4>
            <p className="text-[11px] text-stone-400 mt-1 font-sans">Every batch is independently certified by leading dermatological laboratories.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap and Newsletter Column */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Brand Narrative Section */}
        <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
          <span className="font-serif text-3xl tracking-[0.25em] text-stone-100 block">LUBBYCARE</span>
          <p className="text-xs text-stone-400 font-sans leading-relaxed">
            Science-backed, dermatologist-tested clinical formulas designed to deliver beautiful confidence and glowing skin health. We combine bio-active botanical minerals with clean, medical-grade synthetics to nurture your protective stratum barrier.
          </p>
          
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-brand-green/20 hover:bg-brand-green text-stone-300 hover:text-brand-gold rounded-full transition-all border border-white/10" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-brand-green/20 hover:bg-brand-green text-stone-300 hover:text-brand-gold rounded-full transition-all border border-white/10" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-brand-green/20 hover:bg-brand-green text-stone-300 hover:text-brand-gold rounded-full transition-all border border-white/10" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Sitemap Link Columns */}
        <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(columns).map(([title, links]) => (
            <div key={title} className="space-y-4 text-center md:text-left">
              <h5 className="font-serif text-xs uppercase tracking-[0.2em] text-stone-200 font-semibold">{title}</h5>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => setRoute(link.route)}
                      className="text-[11px] text-stone-400 hover:text-brand-gold transition-colors font-sans uppercase tracking-widest text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Premium Newsletter Sign-up */}
        <div className="lg:col-span-3 space-y-4 text-center lg:text-left">
          <h5 className="font-serif text-xs uppercase tracking-[0.2em] text-stone-200 font-semibold">THE CONCIERGE BULLETIN</h5>
          <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
            Subscribe to receive priority access to private formulation archives, clinical trial reports, and a <b>10% OFF</b> voucher for your inaugural ritual.
          </p>

          {subscribed ? (
            <div className="p-4 bg-brand-green/20 border border-brand-green/30 rounded-xl space-y-1">
              <span className="text-xs text-brand-gold font-serif font-bold flex items-center gap-1.5 justify-center lg:justify-start">
                <Sparkles className="w-3.5 h-3.5 animate-bounce" /> SUBSCRIPTION GRANTED
              </span>
              <p className="text-[10px] text-stone-400 font-sans">Your 10% voucher code <b>WELCOME10</b> has been activated for checkout.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full bg-brand-green/20 border border-white/10 text-xs font-sans px-4 py-3 pr-10 rounded-lg text-stone-100 placeholder-stone-500 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 text-stone-400 hover:text-brand-gold transition-colors cursor-pointer"
                  aria-label="Submit"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-[10px] text-stone-500 font-sans">
                By subscribing, you agree to our privacy conditions.
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Sub-Footer Copyright and Legal Quick Links */}
      <div className="bg-[#080d0a] border-t border-white/5 py-8 text-stone-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-[10px] font-sans tracking-widest font-medium uppercase">
            © 2026 LUBBYCARE INC. ALL RIGHTS RESERVED. ALL FORMULATIONS CLINICALLY VALIDATED.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-sans tracking-widest">
            <button onClick={() => setRoute('privacy')} className="hover:text-stone-300 uppercase">Privacy Policy</button>
            <button onClick={() => setRoute('terms')} className="hover:text-stone-300 uppercase">Terms of Service</button>
            <button onClick={() => setRoute('privacy')} className="hover:text-stone-300 uppercase">Cookie Policy</button>
            <button onClick={() => setRoute('privacy')} className="hover:text-stone-300 uppercase">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
