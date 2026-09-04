/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, BLOGS } from '../data/storeData';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Droplet,
  ArrowRight,
  Star,
  Check,
  Award,
  Globe2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';

export default function Home() {
  const { setRoute, addToCart, toggleWishlist, wishlist, setActiveProductId, setActiveBlogId, setActiveConcernId } = useApp();

  // Before & After comparison slider state (percentage split)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeRoutineIndex, setActiveRoutineIndex] = useState(0);

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);

  const categories = [
    { name: 'Cleansers', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=300' },
    { name: 'Toners', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=300' },
    { name: 'Serums', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300' },
    { name: 'Moisturizers', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=300' },
    { name: 'Sunscreens', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=300' }
  ];

  const concerns = [
    { id: 'acne', name: 'Acne & Congestion', desc: 'Soothe breakouts and refine texture', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300' },
    { id: 'hyperpigmentation', name: 'Dark Spots', desc: 'Fade pigmentations and boost glow', image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=300' },
    { id: 'redness', name: 'Redness & Sensitivity', desc: 'Restore skin barriers and repair redness', image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&q=80&w=300' }
  ];

  const routines = [
    {
      title: 'The Luminosity Routine',
      time: 'Morning (10 mins)',
      steps: ['Purifying Cleanser', 'Calming Toner', 'Luminosity C Glow Serum', 'Mineral Shield SPF 50'],
      desc: 'Formulated to defense cellular aging and unlock a radiant, translucent morning look.'
    },
    {
      title: 'The Barrier Restoration Routine',
      time: 'Night (15 mins)',
      steps: ['Gentle Double Cleanse', 'Calming Toner', 'Retinol Youth renewal', 'Ceramide Restoring Cream'],
      desc: 'Formulated to seal lipid barriers, speed up cellular turnover, and heal overnight.'
    }
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, offset)));
  };

  return (
    <div id="lubbycare-homepage" className="space-y-24 pb-12 animate-fadeIn">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] py-12 flex items-center bg-[#F9F8F6] dark:bg-[#0c130f] border-b border-black/5 overflow-hidden">
        {/* Dynamic ambient botanical background */}
        <div className="absolute inset-0 opacity-10 dark:opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=1920"
            alt="Botanical background"
            className="w-full h-full object-cover scale-105 filter blur-[3px]"
          />
        </div>
        
        {/* Ambient sage and gold blurred circles for glassmorphism background */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-brand-sage/20 dark:bg-[#86A69D]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Hero text */}
          <div className="space-y-8 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-green/10 dark:bg-brand-green/40 border border-brand-green/10 text-brand-green dark:text-brand-gold text-[10px] tracking-[0.25em] font-sans font-bold uppercase animate-pulse">
              <Sparkles className="w-3 h-3" /> CLINICAL BEAUTY REDEFINED
            </span>
            <div className="space-y-4">
              <span className="text-brand-gold font-serif italic text-lg mb-2 block">Healthy Skin. Beautiful Confidence.</span>
              <h1 className="font-serif text-4xl sm:text-[64px] text-brand-green dark:text-stone-100 tracking-tight leading-[1.05]">
                Healthy Skin <br />
                <span className="text-brand-gold italic font-normal">Starts Here</span>
              </h1>
              <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-lg leading-relaxed mx-auto lg:mx-0 font-light">
                Science-backed, dermatologist-tested premium skincare formulas combining pure active botanical elements with clean medical-grade synthetics designed to revive your skin’s natural matrix.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setRoute('shop')}
                className="w-full sm:w-auto bg-brand-green hover:bg-brand-green-hover text-white px-10 py-4.5 rounded-full text-xs font-sans tracking-[0.2em] font-bold shadow-xl shadow-brand-green/20 hover:scale-[1.01] transition-all cursor-pointer"
              >
                SHOP COUTURE PRODUCTS
              </button>
              <button
                onClick={() => setRoute('analysis')}
                className="w-full sm:w-auto border border-brand-green/20 backdrop-blur-md bg-white/20 dark:bg-white/5 text-brand-green dark:text-brand-gold px-10 py-4.5 rounded-full text-xs font-sans tracking-[0.2em] font-bold hover:bg-white/40 dark:hover:bg-white/10 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>TAKE AI SKIN SCAN</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </button>
            </div>
          </div>

          {/* Hero product photography */}
          <div className="hidden lg:flex justify-end relative">
            <div className="relative w-[380px] h-[480px] rounded-2xl overflow-hidden border border-stone-200/10 shadow-2xl scale-95 group hover:scale-98 transition-all duration-700">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"
                alt="LubbyCare bottle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/75 dark:bg-stone-950/75 backdrop-blur-md rounded-xl border border-black/5 dark:border-white/5 flex justify-between items-center text-stone-900 dark:text-white text-left">
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-brand-green dark:text-brand-gold font-bold">PREMIUM FORMULA</span>
                  <h4 className="font-serif text-sm font-bold tracking-wider">Luminosity C Glow Serum</h4>
                </div>
                <button
                  onClick={() => {
                    setActiveProductId('lum-c');
                    setRoute('shop');
                  }}
                  className="p-2.5 bg-brand-green text-white dark:bg-brand-gold dark:text-stone-950 rounded-full hover:scale-105 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Decorative circular badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#0c130f] text-brand-gold border border-white/5 p-5 rounded-full shadow-2xl flex flex-col items-center justify-center text-center w-28 h-28 animate-spin-slow">
              <Star className="w-4 h-4 fill-brand-gold mb-1" />
              <span className="font-serif text-sm tracking-wider font-bold">100%</span>
              <span className="text-[8px] tracking-widest font-mono uppercase text-stone-300">CLINICAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BRAND PILLARS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 border-y border-black/5 dark:border-white/5 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
          {[
            { label: 'Dermatologist Tested', desc: '100% skin safe clinical tests' },
            { label: 'Cruelty Free Approved', desc: 'Certified PETA & Leaping Bunny' },
            { label: '100% Vegan Certified', desc: 'Entirely plant-based formula' },
            { label: 'Carbon-Neutral Active', desc: 'FSC-recycled sustainable packaging' },
            { label: 'Clinically Proven', desc: 'Visible cell renewal results' }
          ].map((pillar, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-1.5 group max-w-[160px]">
              <div className="w-8 h-8 rounded-full bg-brand-green/5 dark:bg-brand-gold/5 border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:bg-brand-green dark:group-hover:bg-brand-gold transition-all duration-500">
                <Check className="w-4 h-4 text-brand-green dark:text-brand-gold group-hover:text-white dark:group-hover:text-stone-900" />
              </div>
              <span className="font-serif text-[11px] md:text-xs font-bold text-stone-900 dark:text-stone-100 tracking-wide">{pillar.label}</span>
              <span className="text-[9px] font-mono text-stone-400 dark:text-stone-500 leading-tight uppercase tracking-wider">{pillar.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS RITUALS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">CURATED ICONIC HEROES</span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">Our Best Sellers</h2>
          </div>
          <button
            onClick={() => setRoute('shop')}
            className="text-xs font-sans tracking-[0.18em] uppercase font-bold text-brand-green dark:text-brand-gold hover:underline flex items-center gap-1.5 group cursor-pointer"
          >
            <span>VIEW ALL FORMULATIONS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map(product => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="glass-card rounded-2xl border p-4 space-y-4 group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Image and Badges Container */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900/50">
                  
                  {/* Hover Image effect */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <img
                    src={product.hoverImage}
                    alt={`${product.name} lifestyle`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 scale-103 group-hover:scale-100"
                  />

                  {/* Best seller & discount badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="bg-brand-green text-white text-[8px] font-sans tracking-widest font-bold px-3 py-1 rounded-full uppercase">
                      BEST SELLER
                    </span>
                    {product.originalPrice && (
                      <span className="bg-brand-gold text-stone-950 text-[8px] font-sans tracking-widest font-bold px-3 py-1 rounded-full uppercase">
                        SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs rounded-full border border-stone-200/30 text-stone-600 dark:text-stone-300 hover:text-red-500 hover:scale-110 transition-all shadow-md cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Rating and Title Details */}
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-1.5 text-brand-gold">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-brand-gold' : ''}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-stone-500 dark:text-stone-400">{product.rating} ({product.reviewsCount} verified reviews)</span>
                  </div>

                  <h3
                    onClick={() => {
                      setActiveProductId(product.id);
                      setRoute('shop');
                    }}
                    className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 hover:text-brand-green dark:hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-400 dark:text-stone-500 line-clamp-2 leading-relaxed">{product.description}</p>
                </div>

                {/* Pricing and Action */}
                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-mono font-bold text-stone-950 dark:text-stone-200">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs font-mono text-stone-400 dark:text-stone-600 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => addToCart(product, product.variantSizes[0], false, 1)}
                    className="bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 text-[10px] font-sans tracking-widest font-bold px-4 py-2.5 rounded-full shadow-sm hover:scale-102 transition-all cursor-pointer"
                  >
                    QUICK ADD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SHOP BY CATEGORY */}
      <section className="bg-brand-sage/10 dark:bg-stone-950/20 py-20 border-y border-black/5 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">FORMULATED ARCHITECTURES</span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">Shop By Category</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map(cat => (
              <div
                key={cat.name}
                onClick={() => setRoute('shop')}
                className="group cursor-pointer flex flex-col items-center space-y-4"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden glass-card border p-1 relative">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#07120c]/10 group-hover:bg-transparent transition-all" />
                </div>
                <h4 className="font-serif text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-brand-green dark:group-hover:text-brand-gold uppercase tracking-wider transition-colors">
                  {cat.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHOP BY SKIN CONCERN */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">SOLVING SPECIFIC PATHOLOGIES</span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">Shop By Skin Concern</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {concerns.map(con => (
            <div
              key={con.id}
              onClick={() => {
                setActiveConcernId(con.id);
                setRoute('concerns');
              }}
              className="group cursor-pointer glass-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 hover:shadow-lg transition-all"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={con.image}
                  alt={con.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="font-serif text-base text-[#eae2d3] font-bold tracking-wide">{con.name}</h4>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-sans">{con.desc}</span>
                <ChevronRight className="w-4 h-4 text-brand-green dark:text-brand-gold group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BEFORE & AFTER RESULTS COMPILER */}
      <section className="bg-brand-green dark:bg-[#0c130f] text-[#eae2d3] py-20 relative overflow-hidden border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-center lg:text-left">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-gold font-bold">CLINICAL TRANSFORMATION</span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-white">Beautifully Evident Results</h2>
            <p className="text-xs text-stone-200 leading-relaxed max-w-md mx-auto lg:mx-0 font-light">
              Behold the clinical structural transformation after 28 days of our daily Luminosity C Glow ritual. No retouching, no fillers—pure active biological change.
            </p>

            <div className="border-t border-white/10 pt-6 space-y-4 text-left">
              {[
                { title: 'Melanin Pigment Density Reduction', val: '-89%' },
                { title: 'Transepidermal Cellular Hydration Increase', val: '+97%' },
                { title: 'Fine-Line Volume Diminishing', val: '-64%' }
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-xs text-stone-300 font-sans">{stat.title}</span>
                  <span className="font-mono text-sm font-bold text-brand-gold">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Draggable Slider Frame */}
          <div className="flex justify-center">
            <div
              className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden border border-white/10 select-none cursor-ew-resize shadow-2xl"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* After Image (Background) */}
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
                alt="After 28 Days Glowing Skin"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-4 right-4 bg-brand-green/80 px-3 py-1 rounded-full text-[10px] font-sans uppercase font-bold tracking-widest text-brand-gold border border-white/10 z-10">
                AFTER 28 DAYS
              </div>

              {/* Before Image (Clip layer) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
                  alt="Before Dull Skin"
                  className="absolute inset-y-0 left-0 w-[420px] max-w-none h-full object-cover pointer-events-none filter saturate-50 contrast-90 brightness-90"
                />
                <div className="absolute bottom-4 left-4 bg-stone-900/80 px-3 py-1 rounded-full text-[10px] font-sans uppercase font-bold tracking-widest text-stone-400 border border-white/5 z-10">
                  BEFORE
                </div>
              </div>

              {/* Central Divider Handle */}
              <div
                className="absolute inset-y-0 w-1 bg-brand-gold flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-brand-gold border-2 border-brand-green flex items-center justify-center shadow-lg text-stone-950 font-bold text-xs">
                  ↔
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVOLUTIONARY SCIENCE SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">BIOLOGICAL ARCHITECTURE</span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">The Science of Cell Renewal</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Lipid Repair Complex',
              subtitle: 'Cellular lipid matrices',
              desc: 'By feeding the skin an optimized 3:1:1 structural lipid ratio of Ceramides, Cholesterol, and Fatty Acids, we lock moisture and halt environmental toxins.',
              icon: Droplet
            },
            {
              title: 'Micro-Encapsulation',
              subtitle: 'Slow sustained delivery',
              desc: 'Wrapping pure Retinol inside lipid liposomes bypasses epidermal peeling, penetrating deep into collagen matrices to speed up cell division.',
              icon: ShieldCheck
            },
            {
              title: 'Acid Mantle Optimization',
              subtitle: 'Precision acid balance',
              desc: 'Clinical formulations balanced at pH of 3.2 - 5.5 preserve the skin’s native anti-pathogen layer, keeping irritation at zero.',
              icon: Award
            }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-8 rounded-2xl border space-y-5"
              >
                <div className="p-4 bg-brand-green/5 dark:bg-brand-gold/5 border border-black/5 dark:border-white/5 rounded-2xl w-fit text-brand-green dark:text-brand-gold">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">{item.title}</h4>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-green dark:text-brand-gold font-bold">{item.subtitle}</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-sans font-light">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. FEATURED ROUTINES SEQUENCING */}
      <section className="bg-brand-sage/10 dark:bg-[#1a1a1a]/30 py-20 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">SYNCHRONIZED RITUALS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 tracking-tight leading-tight">Featured Routines</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-sans font-light">
              Designed by aesthetic chemists to function synergistically. Applying active ingredients in sequence multiplies the cellular performance of each.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setActiveRoutineIndex(0)}
                className={`px-4 py-2.5 rounded-full text-xs font-sans font-bold tracking-wider cursor-pointer transition-all ${
                  activeRoutineIndex === 0 ? 'bg-brand-green text-white dark:bg-brand-gold dark:text-stone-950 shadow-md shadow-brand-green/20' : 'bg-white/50 dark:bg-stone-800/50 text-stone-500 border border-black/5 dark:border-white/5'
                }`}
              >
                MORNING GLOW
              </button>
              <button
                onClick={() => setActiveRoutineIndex(1)}
                className={`px-4 py-2.5 rounded-full text-xs font-sans font-bold tracking-wider cursor-pointer transition-all ${
                  activeRoutineIndex === 1 ? 'bg-brand-green text-white dark:bg-brand-gold dark:text-stone-950 shadow-md shadow-brand-green/20' : 'bg-white/50 dark:bg-stone-800/50 text-stone-500 border border-black/5 dark:border-white/5'
                }`}
              >
                NIGHT BARRIER
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 glass-card border rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">{routines[activeRoutineIndex].title}</h3>
              <span className="text-[10px] font-mono tracking-widest font-bold bg-brand-green/10 dark:bg-brand-gold/10 text-brand-green dark:text-brand-gold px-3 py-1 rounded-full uppercase">
                {routines[activeRoutineIndex].time}
              </span>
            </div>
            
            <p className="text-xs text-stone-500 dark:text-stone-400 font-sans leading-relaxed font-light">{routines[activeRoutineIndex].desc}</p>
            
            <div className="space-y-4">
              {routines[activeRoutineIndex].steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 py-2 border-b border-black/5 dark:border-white/5 last:border-none">
                  <span className="font-mono text-xs font-bold text-brand-green dark:text-brand-gold">STEP 0{idx + 1}</span>
                  <div className="flex-1">
                    <span className="text-xs font-sans font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">{step}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setRoute('routines')}
              className="w-full bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold text-white dark:text-stone-950 py-3 rounded-full text-xs font-sans font-bold tracking-widest transition-all cursor-pointer shadow-lg shadow-brand-green/10 dark:shadow-brand-gold/10"
            >
              EXPLORE STRUCTURAL ROUTINES
            </button>
          </div>
        </div>
      </section>

      {/* 9. JOURNAL MAGAZINE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">LUBBYCARE CHRONICLES</span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">The Skincare Journal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS.map(post => (
            <div
              key={post.id}
              onClick={() => {
                setActiveBlogId(post.id);
                setRoute('journal');
              }}
              className="group cursor-pointer glass-card rounded-2xl overflow-hidden border shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="h-48 w-full overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-[#07120c]/10" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-brand-green dark:group-hover:text-brand-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed font-sans font-light">{post.excerpt}</p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-bold text-brand-green dark:text-brand-gold">
                <span className="font-sans tracking-widest font-bold uppercase">READ CHRONICLE</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. NEWSLETTER & 10% PROMO INCENTIVE POPUP */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-brand-green border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden text-center text-[#eae2d3] space-y-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[50px] rounded-full" />
          
          <div className="max-w-lg mx-auto space-y-4">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-gold font-bold block">CONCIERGE OFFERS</span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-white">Initiate Your Skin Health Today</h2>
            <p className="text-xs text-stone-200 leading-relaxed font-sans font-light">
              Enjoy <b>10% OFF</b> your inaugural order. Sign up to receive custom dermatology-certified formulations and private sales releases.
            </p>
          </div>

          <button
            onClick={() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
            className="bg-brand-gold hover:bg-brand-gold/90 text-stone-950 font-sans font-bold text-xs tracking-widest px-8 py-3.5 rounded-full shadow-lg hover:scale-103 transition-transform cursor-pointer"
          >
            CLAIM MY SAVINGS MATRIX
          </button>
        </div>
      </section>

    </div>
  );
}
