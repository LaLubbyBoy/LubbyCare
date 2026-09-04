/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INGREDIENTS, CONCERNS, BLOGS, REVIEWS, PRODUCTS } from '../data/storeData';
import {
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  User,
  Heart,
  ChevronRight,
  ArrowLeft,
  Star,
  Check,
  ShieldAlert,
  Search,
  Droplet
} from 'lucide-react';

export default function SkinEd() {
  const { activeRoute, activeBlogId, activeConcernId } = useApp();

  // Route dispatcher
  if (activeRoute === 'ingredients') {
    return <IngredientsLibrary />;
  }
  if (activeRoute === 'concerns') {
    return <ConcernsMatrix />;
  }
  if (activeRoute === 'routines') {
    return <RoutinesSequences />;
  }
  if (activeRoute === 'reviews') {
    return <ReviewsPage />;
  }
  if (activeRoute === 'journal') {
    return activeBlogId ? <BlogSinglePost /> : <JournalGrid />;
  }
  return null;
}

// ----------------------------------------------------
// 1. INGREDIENTS LIBRARY VIEW
// ----------------------------------------------------
function IngredientsLibrary() {
  const { setRoute, setActiveProductId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = INGREDIENTS.filter(ing =>
    ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ing.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12 animate-fadeIn">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">BIO-ACTIVE DICTIONARY</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">The Ingredients Library</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed font-light">
          Unlock absolute formulation transparency. Explore the source, chemical structure, and certified clinical safety ratings of our active compounds.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="SEARCH FOR AN ACTIVE COMPOUND..."
          className="w-full bg-stone-100 dark:bg-stone-850 border-none outline-none font-sans text-xs tracking-wider py-4 px-5 pr-12 rounded-full text-stone-800 dark:text-stone-200 uppercase font-semibold border border-stone-200/50"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Search className="absolute right-4 top-3.5 w-5 h-5 text-stone-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(ing => (
          <div
            key={ing.id}
            className="glass-card rounded-2xl border border-black/5 dark:border-white/5 p-6 space-y-5 text-left flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">{ing.name}</h3>
                <span className="text-[9px] font-mono tracking-widest bg-brand-green/10 text-brand-green dark:text-brand-gold dark:bg-brand-gold/10 px-3 py-1 rounded-full uppercase font-bold">
                  {ing.classification}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[9px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-widest block mb-0.5">Scientific Origin</span>
                  <p className="text-stone-800 dark:text-stone-200 font-medium font-sans">{ing.origin}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-widest block mb-0.5">Primary Cell Benefit</span>
                  <p className="text-stone-500 dark:text-stone-400 font-sans leading-relaxed font-light">{ing.description}</p>
                </div>
              </div>
            </div>

            {/* Click to filter products with this active */}
            <button
              onClick={() => {
                setRoute('shop');
              }}
              className="w-full bg-brand-sage/5 hover:bg-brand-sage/10 dark:bg-white/5 dark:hover:bg-white/10 text-stone-600 dark:text-stone-300 font-sans text-[10px] tracking-widest font-bold py-2.5 rounded-xl border border-black/5 dark:border-white/5 uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>EXPLORE FORMULATION CARDS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. SKIN CONCERNS SOLVER VIEW
// ----------------------------------------------------
function ConcernsMatrix() {
  const { activeConcernId, setActiveConcernId, setRoute } = useApp();

  const activeConcern = CONCERNS.find(c => c.id === (activeConcernId || 'acne')) || CONCERNS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12 animate-fadeIn">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">CLINICAL RESOLUTIONS</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight animate-slideDown">Skin Pathology Guide</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed font-light">
          Learn how specific blemishes, pigments, and wrinkles occur, and discover dermatologist-certified ingredients that resolve them.
        </p>
      </div>

      {/* Concerns horizontal tabs selector */}
      <div className="flex border-b border-black/5 dark:border-white/5 gap-6 font-sans text-xs pb-1 overflow-x-auto justify-start md:justify-center">
        {CONCERNS.map(con => (
          <button
            key={con.id}
            onClick={() => setActiveConcernId(con.id)}
            className={`pb-3 font-semibold tracking-wider uppercase border-b-2 cursor-pointer transition-colors whitespace-nowrap ${activeConcern.id === con.id ? 'border-brand-green text-brand-green dark:border-brand-gold dark:text-brand-gold' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            {con.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        
        {/* Left Side detail explanation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-brand-green dark:text-brand-gold font-bold uppercase">PATHOLOGY REVELATION</span>
            <h2 className="font-serif text-2xl md:text-3.5xl text-stone-900 dark:text-stone-100 tracking-tight font-bold">{activeConcern.name}</h2>
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400 font-sans leading-relaxed font-light">
            {activeConcern.description}
          </p>

          <div className="border-t border-black/5 dark:border-white/5 pt-6 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 font-bold">Recommended Actives</h4>
            <div className="flex flex-wrap gap-2">
              {activeConcern.recommendedIngredients.map(ing => (
                <span
                  key={ing}
                  className="bg-brand-green/10 text-brand-green dark:bg-brand-gold/10 dark:text-brand-gold text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl border border-black/5 dark:border-white/5"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setRoute('shop')}
            className="bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 text-xs font-sans tracking-widest font-bold px-8 py-3.5 rounded-full shadow-md cursor-pointer transition-all hover:scale-103"
          >
            DISCOVER TREATMENT FORMULAS
          </button>
        </div>

        {/* Right Side illustration cards */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-square w-full rounded-2xl overflow-hidden glass-card border border-black/5 dark:border-white/5 relative group">
            <img
              src={activeConcern.id === 'acne' ? 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800'}
              alt={activeConcern.name}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-[1.5s]"
            />
            <div className="absolute inset-0 bg-stone-950/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. ROUTINES SEQUENCING COMPONENT
// ----------------------------------------------------
function RoutinesSequences() {
  const { setRoute } = useApp();

  const routinesList = [
    {
      title: 'Advanced Luminosity Ritual',
      target: 'Dullness & Hyper-pigmentations',
      steps: [
        { label: 'Cleanse', formula: 'Gentle Purifying Cleanser', desc: 'Bypasses cellular stripping to extract oil residues.' },
        { label: 'Hydrate', formula: 'Mineral Barrier Calming Toner', desc: 'Restores baseline pH levels and preps absorption.' },
        { label: 'Exfoliate (Weekly)', formula: 'Hydro-Acid Peel Resurfacing Serum', desc: 'Unbinds dead skin cement to reveal deep layers.' },
        { label: 'Brighten', formula: 'Luminosity C Glow Serum', desc: 'Provides slow sustained release of clinical Vitamin C.' },
        { label: 'Protect', formula: 'Mineral Shield Sunscreen SPF 50', desc: 'Halts cellular oxidation caused by UV exposure.' }
      ]
    },
    {
      title: 'Epidermal Shield Reconstruction Ritual',
      target: 'Drying, Peeling & Redness sensitivity',
      steps: [
        { label: 'Cleanse', formula: 'Gentle Purifying Cleanser', desc: 'Removes impurities without washing away protective lipid oils.' },
        { label: 'Hydrate', formula: 'Mineral Barrier Calming Toner', desc: 'Floods layers with bio-active humectants.' },
        { label: 'Repair Actives', formula: 'Ceramide Restoring Barrier Cream', desc: 'Feeds stratum corneum with lipids.' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16 animate-fadeIn text-left">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">SYNCHRONIZED PATHWAYS</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">Structured Skincare Routines</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 font-sans leading-relaxed font-light">
          The sequence of ingredient application matters. Nourishing humectants should always precede protective occlusives to trap absolute hydration.
        </p>
      </div>

      <div className="space-y-16">
        {routinesList.map((rt, idx) => (
          <div key={idx} className="glass-card border border-black/5 dark:border-white/5 p-6 md:p-10 rounded-3xl space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-black/5 dark:border-white/5 pb-5 gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-brand-green dark:text-brand-gold font-bold uppercase">TARGET: {rt.target}</span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-100">{rt.title}</h3>
              </div>
              <button
                onClick={() => setRoute('shop')}
                className="bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 text-xs font-sans tracking-widest font-bold px-6 py-2.5 rounded-full cursor-pointer transition-all hover:scale-103"
              >
                ACQUIRE FULL SET
              </button>
            </div>

            {/* Vertical Timeline sequence */}
            <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-stone-100 dark:before:bg-stone-850">
              {rt.steps.map((st, i) => (
                <div key={i} className="flex gap-6 items-start relative z-10">
                  <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-850 border-2 border-brand-green/20 dark:border-brand-gold/20 flex items-center justify-center font-mono text-xs font-bold text-brand-green dark:text-brand-gold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="space-y-1.5 flex-1 pt-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                      <span className="text-[10px] font-mono tracking-widest bg-stone-100 dark:bg-stone-800/60 px-2.5 py-1 rounded-md uppercase font-bold text-stone-500">
                        {st.label}
                      </span>
                      <span className="text-sm font-serif font-bold text-stone-800 dark:text-stone-200">
                        {st.formula}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-sans max-w-2xl font-light">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. VERIFIED REVIEWS GRID VIEW
// ----------------------------------------------------
function ReviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12 animate-fadeIn">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">VERIFIED RATINGS</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">Verified Audits & Feedback</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed font-light">
          See verified transformation feedback from our private client portal. 100% authentic dermatological outcomes tracked over 6 months.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.map(rev => (
          <div
            key={rev.id}
            className="glass-card rounded-2xl border border-black/5 dark:border-white/5 p-6 space-y-4 text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 fill-brand-gold`} />
                ))}
              </div>
              <p className="text-xs italic text-stone-600 dark:text-stone-300 font-sans leading-relaxed font-light">&ldquo;{rev.comment}&rdquo;</p>
            </div>

            <div className="border-t border-black/5 dark:border-white/5 pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 block">{rev.user}</span>
                <span className="text-[9px] font-mono uppercase text-stone-400 dark:text-stone-500 tracking-wider">Formula: {rev.product}</span>
              </div>
              <span className="text-[10px] font-sans font-bold text-brand-green dark:text-brand-gold bg-brand-green/10 dark:bg-brand-gold/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                VERIFIED AUDIT
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. BLOG JOURNAL GRID VIEW
// ----------------------------------------------------
function JournalGrid() {
  const { setActiveBlogId } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12 animate-fadeIn">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-green dark:text-brand-gold font-bold">LUBBYCARE JOURNAL</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">The Science & Beauty Journal</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed font-light">
          Deep biological explanations, chemical insights, and professional lifestyle guides created by cosmetic chemists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOGS.map(post => (
          <div
            key={post.id}
            onClick={() => setActiveBlogId(post.id)}
            className="group glass-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="h-52 w-full overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-3 text-left">
                <div className="flex items-center gap-3 font-mono text-[9px] text-stone-400 uppercase tracking-widest">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-brand-green dark:group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-sans line-clamp-3 leading-relaxed font-light">{post.excerpt}</p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-bold text-brand-green dark:text-brand-gold">
              <span className="font-sans tracking-widest font-bold uppercase">READ FULL CHRONICLE</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. INDIVIDUAL BLOG POST READER VIEW
// ----------------------------------------------------
function BlogSinglePost() {
  const { activeBlogId, setActiveBlogId } = useApp();

  const post = BLOGS.find(b => b.id === activeBlogId);
  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-fadeIn text-left">
      <button
        onClick={() => setActiveBlogId(null)}
        className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO CHRONICLES</span>
      </button>

      <div className="space-y-4">
        <div className="flex items-center gap-3 font-mono text-[10px] text-stone-400 uppercase tracking-widest">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-stone-900 dark:text-stone-100 tracking-tight leading-[1.1] font-bold">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-3 text-xs text-stone-500 pt-1 border-b border-black/5 dark:border-white/5 pb-5">
          <div className="p-2 bg-brand-green/15 text-brand-green dark:text-brand-gold rounded-full">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-stone-800 dark:text-stone-200">Written by cosmetic chemist</span>
            <span className="block text-[10px] text-stone-400">LubbyCare Formulation Lab</span>
          </div>
        </div>
      </div>

      <div className="aspect-video w-full rounded-2xl overflow-hidden glass-card border border-black/5 dark:border-white/5">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Narrative blocks */}
      <div className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-6">
        <p className="font-serif text-base font-semibold italic text-brand-green dark:text-brand-gold border-l-4 border-brand-green dark:border-brand-gold pl-4 py-1">
          {post.excerpt}
        </p>

        <p className="font-light">
           skincarists often focus on visual anomalies, but molecular cosmetic chemists analyze biological skin barriers. The protective lipid barrier, or stratum corneum, blocks allergens and locks in critical cellular hydration.
        </p>

        <h3 className="font-serif text-lg sm:text-xl text-stone-900 dark:text-stone-100 font-bold pt-4">Cellular Renewal Cycles</h3>
        <p className="font-light">
          Normally, cell division occurs every 28 days. As environmental stressors, pollution, and UV particles collide with our faces, cellular fatigue sets in, extending the division cycle to 45+ days. This retention of dry, oxidized cells results in dullness and hyperpigmentation. By applying slow-release micro-encapsulated Retinoids or active Vitamin C formulas, we trigger quick cellular synthesis.
        </p>

        <div className="glass-card p-6 rounded-2xl border border-black/5 dark:border-white/5 space-y-3">
          <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-gold" /> CHEMIST&apos;S RITUAL ADVICE:
          </h4>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400 font-light">
            Never mix acidic exfoliators (like AHAs or BHAs) with pure Retinol in the same sequence. They fight for cellular receptor paths, causing severe pH mismatch and skin barrier disruption. Instead, use Vitamin C in the morning, exfoliants weekly on Tuesdays, and Retinol on night cycles.
          </p>
        </div>

        <p className="font-light">
          In conclusion, professional skincare relies on clinical synchronization rather than miracle products. Respect your pH, nourish with lipid matrix ratios, and shield with mineral sunscreen.
        </p>
      </div>
    </div>
  );
}
