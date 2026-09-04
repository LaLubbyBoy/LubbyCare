/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/storeData';
import { Product } from '../types';
import {
  Star,
  Heart,
  Grid,
  List,
  SlidersHorizontal,
  ChevronRight,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Trash2,
  Lock,
  ArrowLeft,
  Truck,
  CreditCard,
  Gift,
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function CoreShopping() {
  const {
    activeRoute,
    setRoute,
    activeProductId,
    setActiveProductId,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    wishlist,
    toggleWishlist,
    promoDiscount,
    applyPromoCode,
    promoCodeApplied,
    placeOrder,
    addToRecentlyViewed,
    recentlyViewed
  } = useApp();

  // ----------------------------------------------------
  // SUB-ROUTE DISPATCHER
  // ----------------------------------------------------
  if (activeRoute === 'shop') {
    return activeProductId ? <ProductDetails /> : <ShopCatalog />;
  }
  if (activeRoute === 'cart') {
    return <CartView />;
  }
  if (activeRoute === 'checkout') {
    return <CheckoutView />;
  }
  return null;
}

// ----------------------------------------------------
// 1. SHOP CATALOG VIEW
// ----------------------------------------------------
function ShopCatalog() {
  const { setActiveProductId, setRoute, toggleWishlist, wishlist, addToCart } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedConcern, setSelectedConcern] = useState<string>('All');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [selectedIngredient, setSelectedIngredient] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(110);
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Toners', 'Sunscreens', 'Face Oils'];
  const concerns = ['All', 'Acne', 'Hyperpigmentation', 'Redness', 'Aging', 'Dehydration', 'Sensitivity'];
  const skinTypes = ['All', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'];
  const ingredients = ['All', 'Vitamin C', 'Retinol', 'Niacinamide', 'Hyaluronic Acid', 'Ceramides', 'Squalane'];

  // Filter logic
  const filteredProducts = PRODUCTS.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const concernMatch = selectedConcern === 'All' || product.concern === selectedConcern || product.concernsSolved.includes(selectedConcern);
    const skinTypeMatch = selectedSkinType === 'All' || product.skinTypes.includes(selectedSkinType);
    const ingredientMatch = selectedIngredient === 'All' || product.ingredients.includes(selectedIngredient);
    const priceMatch = product.price <= priceRange;
    return categoryMatch && concernMatch && skinTypeMatch && ingredientMatch && priceMatch;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default Featured
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10 animate-fadeIn">
      {/* Editorial Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-700 dark:text-amber-500 font-semibold">FORMULATION VAULT</span>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">The Skincare Dispensary</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-sans leading-relaxed">
          Clinically balanced formulations combining certified plant-derived extracts with medical-grade synthetics to nurture epidermal resilience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="space-y-6 lg:border-r lg:border-black/5 lg:dark:border-white/5 lg:pr-8">
          <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-brand-green dark:text-brand-gold" />
            <h3 className="font-serif text-sm tracking-widest font-bold text-stone-900 dark:text-stone-100 uppercase">Filters Matrix</h3>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 font-bold">Category</h4>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] uppercase font-sans tracking-widest px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-brand-green border-brand-green text-white dark:bg-brand-gold dark:border-brand-gold dark:text-stone-950'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Concern Filter */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 font-bold">Skin Concern</h4>
            <div className="flex flex-wrap gap-1.5">
              {concerns.map(con => (
                <button
                  key={con}
                  onClick={() => setSelectedConcern(con)}
                  className={`text-[10px] uppercase font-sans tracking-widest px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedConcern === con
                      ? 'bg-brand-green border-brand-green text-white dark:bg-brand-gold dark:border-brand-gold dark:text-stone-950'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                  }`}
                >
                  {con}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Type Filter */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 font-bold">Skin Type</h4>
            <div className="flex flex-wrap gap-1.5">
              {skinTypes.map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedSkinType(st)}
                  className={`text-[10px] uppercase font-sans tracking-widest px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedSkinType === st
                      ? 'bg-brand-green border-brand-green text-white dark:bg-brand-gold dark:border-brand-gold dark:text-stone-950'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredient Filter */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 font-bold">Actives Matrix</h4>
            <div className="flex flex-wrap gap-1.5">
              {ingredients.map(ing => (
                <button
                  key={ing}
                  onClick={() => setSelectedIngredient(ing)}
                  className={`text-[10px] uppercase font-sans tracking-widest px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedIngredient === ing
                      ? 'bg-brand-green border-brand-green text-white dark:bg-brand-gold dark:border-brand-gold dark:text-stone-950'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                  }`}
                >
                  {ing}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 font-bold">Max Price</h4>
              <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">${priceRange}</span>
            </div>
            <input
              type="range"
              min="40"
              max="110"
              step="5"
              className="w-full accent-brand-green dark:accent-brand-gold bg-stone-200 dark:bg-stone-800 rounded-full h-1"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
            />
          </div>
        </aside>

        {/* Catalog Main Frame */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Top toolbar Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200/50 dark:border-stone-800/40 pb-4">
            <span className="text-xs text-stone-400 font-sans tracking-wider font-semibold uppercase">
              Showing {sortedProducts.length} formulas
            </span>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent border border-stone-200 dark:border-stone-800 rounded-lg text-xs font-sans p-2 outline-none text-stone-700 dark:text-stone-300 font-bold"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* View toggle Grid/List */}
              <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'grid' ? 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100' : 'text-stone-400'}`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'list' ? 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100' : 'text-stone-400'}`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards Render */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-24 bg-stone-100/30 dark:bg-[#1a1a1a] rounded-3xl border border-stone-200/40 dark:border-stone-800/40">
              <span className="text-sm font-sans text-stone-400 block mb-4">No formulations match your selection matrix.</span>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedConcern('All');
                  setSelectedSkinType('All');
                  setSelectedIngredient('All');
                  setPriceRange(110);
                }}
                className="bg-stone-900 text-stone-100 text-xs font-sans tracking-widest font-semibold px-6 py-2.5 rounded-full cursor-pointer hover:bg-stone-800"
              >
                Reset Selection
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(prod => {
                const isWishlisted = wishlist.includes(prod.id);
                return (
                  <div
                    key={prod.id}
                    className="glass-card rounded-2xl border border-black/5 dark:border-white/5 p-4 space-y-3 group relative flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900/50">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                      />
                      <img
                        src={prod.hoverImage}
                        alt={`${prod.name} lifestyle`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 scale-102 group-hover:scale-100"
                      />
                      {prod.isBestSeller && (
                        <span className="absolute top-3 left-3 bg-brand-green text-white text-[8px] font-sans tracking-widest px-2.5 py-1 rounded-full uppercase font-bold">
                          BEST SELLER
                        </span>
                      )}
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="absolute top-3 right-3 p-1.5 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xs rounded-full border border-stone-200/30 text-stone-500 hover:text-red-500 cursor-pointer"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-brand-gold">
                        <Star className="w-3 h-3 fill-brand-gold" />
                        <span className="text-[9px] font-mono font-bold text-stone-500 dark:text-stone-400">{prod.rating}</span>
                      </div>
                      <h3
                        onClick={() => setActiveProductId(prod.id)}
                        className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 hover:text-brand-green dark:hover:text-brand-gold cursor-pointer truncate transition-colors"
                      >
                        {prod.name}
                      </h3>
                      <p className="text-[11px] text-stone-400 dark:text-stone-500 line-clamp-2 leading-relaxed font-light">{prod.description}</p>
                    </div>

                    <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-200">${prod.price}</span>
                      <button
                        onClick={() => addToCart(prod, prod.variantSizes[0], false, 1)}
                        className="bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 text-[9px] font-sans tracking-widest font-bold px-3 py-2 rounded-full hover:scale-103 transition-transform cursor-pointer"
                      >
                        QUICK ADD
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map(prod => {
                const isWishlisted = wishlist.includes(prod.id);
                return (
                  <div
                    key={prod.id}
                    className="glass-card rounded-2xl border border-black/5 dark:border-white/5 p-4 flex flex-col sm:flex-row gap-5 items-center group relative hover:shadow-sm transition-shadow"
                  >
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900/50 flex-shrink-0">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="absolute top-2 right-2 p-1 bg-white/95 dark:bg-stone-900/95 rounded-full border border-stone-200/30 text-stone-500 hover:text-red-500 cursor-pointer"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-brand-gold">
                        <Star className="w-3 h-3 fill-brand-gold" />
                        <span className="text-[9px] font-mono font-bold text-stone-500 dark:text-stone-400">{prod.rating}</span>
                        <span className="text-[10px] text-stone-400 font-sans font-semibold ml-1">• {prod.category}</span>
                      </div>
                      <h3
                        onClick={() => setActiveProductId(prod.id)}
                        className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 hover:text-brand-green dark:hover:text-brand-gold cursor-pointer transition-colors"
                      >
                        {prod.name}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-xl font-light">{prod.description}</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <span className="text-base font-mono font-bold text-stone-900 dark:text-stone-200">${prod.price}</span>
                      <button
                        onClick={() => addToCart(prod, prod.variantSizes[0], false, 1)}
                        className="bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 text-[10px] font-sans tracking-widest font-bold px-5 py-2.5 rounded-full hover:scale-103 transition-transform cursor-pointer"
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. PRODUCT DETAILS VIEW
// ----------------------------------------------------
function ProductDetails() {
  const { activeProductId, setActiveProductId, addToCart, toggleWishlist, wishlist, addToRecentlyViewed } = useApp();

  const product = PRODUCTS.find(p => p.id === activeProductId);
  if (!product) return null;

  useEffect(() => {
    addToRecentlyViewed(product.id);
  }, [product.id]);

  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage' | 'clinical'>('benefits');
  const [selectedSize, setSelectedSize] = useState<string>(product.variantSizes[0]);
  const [isSubscription, setIsSubscription] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>(product.image);

  // Gallery slider zoom trigger
  const [isZoomed, setIsZoomed] = useState(false);

  // Derived pricing based on auto-refill model
  const displayedPrice = isSubscription
    ? (product.refillPrice || product.price * 0.85)
    : product.price;

  // Multi product combo bundle trigger
  const comboProduct = PRODUCTS.find(p => p.id !== product.id && p.category === 'Cleansers') || PRODUCTS[1];
  const comboPrice = Math.round((product.price + comboProduct.price) * 0.85);

  const isWishlisted = wishlist.includes(product.id);

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16 animate-fadeIn">
      {/* Breadcrumb row */}
      <div className="flex items-center gap-2 text-[10px] font-sans tracking-wider text-stone-400 dark:text-stone-500 uppercase">
        <button onClick={() => setActiveProductId(null)} className="hover:text-stone-600">Dispensary</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-stone-500">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-stone-700 dark:text-stone-300 font-bold">{product.name}</span>
      </div>

      {/* Main product card details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900/50 border border-stone-200/50 dark:border-stone-800/40 cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={mainImage}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
            />
            
            {/* Best seller badge */}
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-emerald-950 text-[#eae2d3] text-[9px] font-sans tracking-widest px-3 py-1.5 rounded-full uppercase font-bold">
                CLINICALLY POPULAR
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 rounded-xl overflow-hidden border transition-all cursor-pointer ${mainImage === img ? 'border-amber-600 ring-2 ring-amber-500/20' : 'border-stone-200 dark:border-stone-800'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details Column */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-amber-700 dark:text-amber-500 uppercase font-semibold">
              {product.category} • SOLVES {product.concern}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
              {product.name}
            </h1>
            
            {/* Reviews overview */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 fill-amber-500`} />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviewsCount} verified audits)</span>
            </div>
          </div>

          {/* Pricing tier block */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-mono font-bold text-stone-950 dark:text-stone-100">${displayedPrice}</span>
            {isSubscription && (
              <span className="text-xs text-emerald-700 dark:text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full animate-pulse">
                Auto-Refill Saved 15%
              </span>
            )}
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400 font-sans leading-relaxed">
            {product.longDescription}
          </p>

          {/* Size Variant selections */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 font-bold">Select Volume</h4>
            <div className="flex gap-2.5">
              {product.variantSizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${selectedSize === sz ? 'bg-emerald-950 border-emerald-950 text-[#eae2d3] dark:bg-amber-600 dark:border-amber-600 dark:text-stone-950' : 'border-stone-200 dark:border-stone-800 text-stone-600 hover:border-stone-400'}`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Subscription toggle models */}
          <div className="space-y-3 bg-[#faf8f5] dark:bg-[#1a1a1a] p-4 rounded-2xl border border-stone-200/50 dark:border-stone-800/40">
            <label className="flex items-start gap-3.5 cursor-pointer">
              <input
                type="radio"
                name="purchase-type"
                className="mt-1 accent-emerald-950 dark:accent-amber-500 cursor-pointer"
                checked={!isSubscription}
                onChange={() => setIsSubscription(false)}
              />
              <div>
                <span className="text-xs font-sans font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">ONE-TIME DISBURSEMENT</span>
                <span className="text-[11px] text-stone-400 font-sans">Full catalog retail value without binding.</span>
              </div>
            </label>
            <div className="border-t border-stone-200/40 dark:border-stone-800/20 pt-3" />
            <label className="flex items-start gap-3.5 cursor-pointer">
              <input
                type="radio"
                name="purchase-type"
                className="mt-1 accent-emerald-950 dark:accent-amber-500 cursor-pointer"
                checked={isSubscription}
                onChange={() => setIsSubscription(true)}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">AUTO-REFILL RITUAL</span>
                  <span className="text-[10px] font-mono text-emerald-800 dark:text-amber-500 font-bold">SAVE 15% • ${product.refillPrice || product.price * 0.85}</span>
                </div>
                <span className="text-[11px] text-stone-400 font-sans">Delivered automatically every 30 days. Cancel or shift schedules anytime inside dashboard.</span>
              </div>
            </label>
          </div>

          {/* Action Row Qty & Buy */}
          <div className="flex items-center gap-4">
            
            {/* Quantity controls */}
            <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded-full bg-stone-100/30 dark:bg-stone-900/40 px-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-mono text-sm cursor-pointer"
              >
                -
              </button>
              <span className="px-1.5 font-mono text-xs font-bold text-stone-800 dark:text-stone-200">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-mono text-sm cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => {
                addToCart(product, selectedSize, isSubscription, quantity);
                setQuantity(1);
              }}
              className="flex-1 bg-emerald-950 hover:bg-emerald-900 dark:bg-amber-600 dark:hover:bg-amber-500 text-[#eae2d3] dark:text-stone-950 py-4 rounded-full text-xs font-sans font-bold tracking-widest shadow-md hover:scale-101 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>DISBURSE TO SHOPPING BAG</span>
            </button>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3.5 border rounded-full transition-all cursor-pointer ${isWishlisted ? 'border-red-200 bg-red-500/10 text-red-500' : 'border-stone-200 dark:border-stone-800 text-stone-400 hover:text-red-500'}`}
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Accordion Tabs Info (Usage, Clinical trials, ingredients) */}
          <div className="border-t border-stone-200/60 dark:border-stone-800/40 pt-6 space-y-4">
            <div className="flex border-b border-stone-100 dark:border-stone-800 gap-6 font-sans text-xs pb-1">
              {[
                { id: 'benefits', label: 'Key Benefits' },
                { id: 'ingredients', label: 'Formulation matrix' },
                { id: 'usage', label: 'Ritual application' },
                { id: 'clinical', label: 'Clinical audits' }
              ].map(tb => (
                <button
                  key={tb.id}
                  onClick={() => setActiveTab(tb.id as any)}
                  className={`pb-3 font-semibold tracking-wider uppercase border-b-2 cursor-pointer transition-colors ${activeTab === tb.id ? 'border-emerald-900 text-emerald-950 dark:border-amber-500 dark:text-amber-500' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
                >
                  {tb.label}
                </button>
              ))}
            </div>

            <div className="text-xs font-sans text-stone-500 dark:text-stone-400 leading-relaxed min-h-[80px]">
              {activeTab === 'benefits' && (
                <ul className="space-y-1.5 list-disc pl-4 text-left">
                  {product.benefits.map((bn, i) => <li key={i}>{bn}</li>)}
                </ul>
              )}
              {activeTab === 'ingredients' && (
                <div className="space-y-3 text-left">
                  <p className="font-semibold text-stone-700 dark:text-stone-300">Active Compounds Matrix:</p>
                  <p>{product.ingredients.join(', ')}</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">Formulated without synthetic fragrance, essential oils, silicones, and parabens.</p>
                </div>
              )}
              {activeTab === 'usage' && (
                <ol className="space-y-1.5 list-decimal pl-4 text-left">
                  {product.usage.map((us, i) => <li key={i}>{us}</li>)}
                </ol>
              )}
              {activeTab === 'clinical' && (
                <ul className="space-y-1.5 text-left">
                  {product.clinicalResults.map((cl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">✓</span>
                      <span>{cl}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently bought together bundle */}
      <div className="bg-emerald-950/5 dark:bg-amber-500/5 border border-emerald-900/10 dark:border-stone-800 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="p-2.5 bg-emerald-950/20 text-emerald-950 dark:text-amber-500 rounded-2xl flex items-center justify-center">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold tracking-wide text-stone-900 dark:text-stone-100">FREQUENTLY BOUGHT TOGETHER</h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans mt-0.5">Initialize a complete daily defense structure with <b>15% bundle savings</b>.</p>
            <div className="flex gap-2 text-[10px] font-sans text-stone-400 mt-1 uppercase">
              <span>{product.name}</span>
              <span>+</span>
              <span>{comboProduct.name}</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col sm:flex-row items-center gap-4 justify-end">
          <div className="text-center sm:text-right font-mono flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-900 dark:text-stone-200">${comboPrice}</span>
            <span className="text-xs text-stone-400 line-through">${product.price + comboProduct.price}</span>
          </div>
          <button
            onClick={() => {
              addToCart(product, selectedSize, isSubscription, 1);
              addToCart(comboProduct, comboProduct.variantSizes[0], false, 1);
            }}
            className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 text-[#eae2d3] text-[10px] font-sans tracking-widest font-bold px-6 py-3 rounded-full cursor-pointer transition-colors"
          >
            BUY BUNDLE SAVINGS
          </button>
        </div>
      </div>

      {/* Related Products Grid */}
      <div className="space-y-6 pt-6">
        <h3 className="font-serif text-xl tracking-tight text-stone-900 dark:text-stone-100 text-left font-bold">Related Formulations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map(prod => (
            <div
              key={prod.id}
              onClick={() => {
                setActiveProductId(prod.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white dark:bg-[#1a1a1a] p-4 border border-stone-200/40 dark:border-stone-800 rounded-2xl cursor-pointer text-left group hover:shadow-sm"
            >
              <img src={prod.image} alt={prod.name} className="w-full aspect-square object-cover rounded-xl mb-3" />
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">{prod.category}</span>
                <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-950 dark:group-hover:text-amber-500 truncate">{prod.name}</h4>
                <div className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">${prod.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. CART DETAILED FULL VIEW PAGE
// ----------------------------------------------------
function CartView() {
  const { cart, updateCartQuantity, removeFromCart, promoDiscount, applyPromoCode, promoCodeApplied, setRoute } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [msg, setMsg] = useState({ text: '', err: false });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountVal = (subtotal * promoDiscount) / 100;
  const delivery = subtotal >= 100 ? 0 : 15;
  const total = subtotal - discountVal + delivery;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyPromoCode(couponInput);
    setMsg({ text: res.message, err: !res.success });
    if (res.success) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-200">Your Bag is Empty</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
          Unlock beautifully evident changes with our highly active plant-based clinical formulations. Choose a skin concern to begin.
        </p>
        <button
          onClick={() => setRoute('shop')}
          className="bg-emerald-950 dark:bg-amber-600 text-[#eae2d3] dark:text-stone-950 text-xs font-sans tracking-widest font-bold px-8 py-3.5 rounded-full cursor-pointer hover:scale-103 transition-transform"
        >
          EXPLORE THE DISPENSARY
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10 animate-fadeIn">
      <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 text-left font-bold tracking-tight">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left column list */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-stone-200/55 dark:border-stone-800/40 p-5 flex flex-col sm:flex-row gap-5 items-center relative"
            >
              <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
              
              <div className="flex-1 space-y-1 text-center sm:text-left min-w-0">
                <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 truncate pr-4">{item.product.name}</h3>
                <span className="text-[10px] font-mono tracking-wider text-stone-400 dark:text-stone-500 uppercase block">
                  {item.size} {item.isSubscription && <span className="text-emerald-700 dark:text-amber-500 font-bold">• AUTO-REFILL EVERY 30 DAYS</span>}
                </span>
              </div>

              {/* Quantity selectors */}
              <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded-full bg-stone-50 dark:bg-stone-900/40 px-1">
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1.5 text-stone-500 font-mono text-xs cursor-pointer"
                >
                  -
                </button>
                <span className="px-1 font-mono text-xs font-bold text-stone-800 dark:text-stone-200">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1.5 text-stone-500 font-mono text-xs cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Pricing metrics */}
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">${item.product.price * item.quantity}</span>
              </div>

              {/* Delete button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="absolute top-3 right-3 text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Right column summary card */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1a1a1a] border border-stone-200/55 dark:border-stone-800/40 p-6 rounded-2xl space-y-6">
          <h3 className="font-serif text-lg tracking-wider text-stone-900 dark:text-stone-100 font-bold border-b border-stone-100 dark:border-stone-800 pb-3 uppercase">Order Summary</h3>
          
          <div className="space-y-3.5 text-xs text-stone-500 dark:text-stone-400 font-sans border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex justify-between">
              <span>BAG SUBTOTAL</span>
              <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">${subtotal}</span>
            </div>
            {discountVal > 0 && (
              <div className="flex justify-between text-emerald-700 dark:text-emerald-500 font-bold">
                <span>PROMO DISCOUNT</span>
                <span className="font-mono">-${discountVal}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>EXPRESS DELIVERY</span>
              <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">{delivery === 0 ? 'FREE' : `$${delivery}`}</span>
            </div>
          </div>

          <div className="flex justify-between font-serif text-lg text-stone-900 dark:text-stone-100 font-bold py-1">
            <span>ESTIMATED TOTAL</span>
            <span className="font-mono">${total}</span>
          </div>

          {/* Promo code box */}
          <form onSubmit={handleApply} className="flex gap-2">
            <input
              type="text"
              placeholder="COUPON CODE"
              className="flex-1 bg-stone-100 dark:bg-stone-800 border-none outline-none text-xs font-sans tracking-widest px-4 py-2.5 rounded-full uppercase text-stone-800 dark:text-stone-200"
              value={couponInput}
              onChange={e => setCouponInput(e.target.value)}
            />
            <button type="submit" className="bg-stone-900 dark:bg-stone-700 text-[#eae2d3] text-xs font-sans tracking-widest font-bold px-4 rounded-full hover:bg-stone-800 cursor-pointer transition-colors">
              APPLY
            </button>
          </form>

          {msg.text && (
            <p className={`text-[10px] font-sans font-semibold ${msg.err ? 'text-red-500' : 'text-emerald-700 dark:text-emerald-500'}`}>
              {msg.text}
            </p>
          )}

          <button
            onClick={() => setRoute('checkout')}
            className="w-full bg-emerald-950 dark:bg-amber-600 hover:bg-emerald-900 dark:hover:bg-amber-500 text-[#eae2d3] dark:text-stone-950 py-4 rounded-full text-xs font-sans tracking-widest font-bold shadow-md hover:scale-102 transition-all cursor-pointer uppercase"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. CHECKOUT SECURE VIEW PAGE
// ----------------------------------------------------
function CheckoutView() {
  const { cart, promoDiscount, placeOrder, setRoute } = useApp();

  const [fullName, setFullName] = useState('Amara Vance');
  const [email, setEmail] = useState('amara.vance@luxurybeauty.com');
  const [address, setAddress] = useState('1428 Emerald Blvd, Suite 400');
  const [city, setCity] = useState('Seattle');
  const [postcode, setPostcode] = useState('98101');
  const [paymentSystem, setPaymentSystem] = useState<'card' | 'paypal' | 'pay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedReceipt, setPlacedReceipt] = useState<any>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountVal = (subtotal * promoDiscount) / 100;
  const delivery = subtotal >= 100 ? 0 : 15;
  const total = subtotal - discountVal + delivery;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate luxury encryptions delay
    setTimeout(() => {
      const order = placeOrder({ fullName, email, address, city, postcode }, paymentSystem);
      setPlacedReceipt(order);
      setIsProcessing(false);
    }, 2500);
  };

  // Receipt confirmation box
  if (placedReceipt) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-700 dark:text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-emerald-700 dark:text-emerald-500 font-bold uppercase">ORDER DECREED SUCCESSFULLY</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100">Ritual Order Initialized</h2>
          <p className="text-xs text-stone-400 font-sans max-w-sm mx-auto">
            Your clinical skincare matrix is being packed by our luxury laboratory. A notification invoice has been sent to <b>{placedReceipt.items[0]?.isSubscription ? 'subscriptions' : email}</b>.
          </p>
        </div>

        <div className="bg-stone-50 dark:bg-[#1a1a1a] p-6 rounded-2xl border border-stone-200/50 dark:border-stone-800/40 text-left space-y-4 font-sans text-xs">
          <div className="flex justify-between text-stone-400">
            <span>ORDER NUMBER</span>
            <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{placedReceipt.id}</span>
          </div>
          <div className="flex justify-between text-stone-400">
            <span>TRACKING DIGITS</span>
            <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{placedReceipt.trackingNumber}</span>
          </div>
          <div className="flex justify-between text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-3">
            <span>ESTIMATED PASSAGE</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">{placedReceipt.dateEst}</span>
          </div>
          <div className="flex justify-between font-serif text-sm text-stone-900 dark:text-stone-100 font-bold pt-1">
            <span>RITUAL DECREE TOTAL</span>
            <span className="font-mono">${placedReceipt.total}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setRoute('dashboard')}
            className="flex-1 bg-emerald-950 dark:bg-amber-600 text-[#eae2d3] dark:text-stone-950 text-xs font-sans tracking-widest font-bold py-3.5 rounded-full cursor-pointer hover:scale-101 transition-transform"
          >
            VIEW DASHBOARD TIMELINE
          </button>
          <button
            onClick={() => setRoute('shop')}
            className="flex-1 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-sans tracking-widest font-bold py-3.5 rounded-full cursor-pointer hover:scale-101 transition-transform"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10 relative animate-fadeIn">
      
      {/* Encryption Spinning Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-md flex flex-col items-center justify-center text-[#eae2d3] space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="font-serif text-lg tracking-wider font-semibold">Encrypting Secure Connection...</p>
          <p className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">256-Bit SSL Encryptor active</p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button onClick={() => setRoute('cart')} className="p-2 border border-stone-200 dark:border-stone-800 rounded-full hover:bg-stone-100 cursor-pointer">
          <ArrowLeft className="w-4 h-4 text-stone-600 dark:text-stone-300" />
        </button>
        <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 font-bold tracking-tight">Checkout</h1>
      </div>

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
        
        {/* Left column shipping details form */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1a1a1a] p-6 md:p-8 rounded-2xl border border-stone-200/55 dark:border-stone-800/40 space-y-8">
          
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wider text-stone-900 dark:text-stone-100 font-semibold border-b border-stone-100 dark:border-stone-800 pb-2 uppercase">1. Shipping coordinates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-stone-500 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-stone-100 dark:bg-stone-800 border-none outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-stone-500 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-stone-100 dark:bg-stone-800 border-none outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="font-bold text-stone-500 uppercase tracking-wider">Delivery Address</label>
                <input
                  type="text"
                  required
                  className="w-full bg-stone-100 dark:bg-stone-800 border-none outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-stone-500 uppercase tracking-wider">City</label>
                <input
                  type="text"
                  required
                  className="w-full bg-stone-100 dark:bg-stone-800 border-none outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-stone-500 uppercase tracking-wider">Postcode</label>
                <input
                  type="text"
                  required
                  className="w-full bg-stone-100 dark:bg-stone-800 border-none outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100"
                  value={postcode}
                  onChange={e => setPostcode(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wider text-stone-900 dark:text-stone-100 font-semibold border-b border-stone-100 dark:border-stone-800 pb-2 uppercase">2. Secured payment methods</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'paypal', label: 'PayPal', icon: HelpCircle },
                { id: 'pay', label: 'Apple / Google Pay', icon: Lock }
              ].map(pm => {
                const IconComp = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentSystem(pm.id as any)}
                    className={`p-4 rounded-xl border font-sans text-xs font-bold tracking-wider uppercase flex flex-col items-center gap-2.5 transition-all cursor-pointer ${paymentSystem === pm.id ? 'border-amber-600 bg-amber-500/5 text-amber-700 dark:text-amber-500' : 'border-stone-200 dark:border-stone-800 text-stone-400 hover:border-stone-400'}`}
                  >
                    <IconComp className="w-5 h-5" />
                    <span>{pm.label}</span>
                  </button>
                );
              })}
            </div>

            {paymentSystem === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs pt-4">
                <div className="md:col-span-3 space-y-1.5">
                  <label className="font-bold text-stone-500 uppercase tracking-wider">Card Digits</label>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    className="w-full bg-stone-100 dark:bg-stone-800 border-none outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100 font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-stone-500 uppercase tracking-wider">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    className="w-full bg-stone-100 dark:bg-stone-800 border-none outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100 font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-stone-500 uppercase tracking-wider">CVC Secure Digits</label>
                  <input
                    type="password"
                    required
                    maxLength={3}
                    placeholder="***"
                    className="w-full bg-stone-100 dark:bg-stone-800 border-none outline-none p-3.5 rounded-xl text-stone-800 dark:text-stone-100 font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column Summary checkout block */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1a1a1a] border border-stone-200/55 dark:border-stone-800/40 p-6 rounded-2xl space-y-6">
          <h3 className="font-serif text-lg tracking-wider text-stone-900 dark:text-stone-100 font-bold border-b border-stone-100 dark:border-stone-800 pb-3 uppercase">Order summary</h3>
          
          <div className="space-y-3 pb-4 border-b border-stone-100 dark:border-stone-800/80">
            {cart.map(it => (
              <div key={it.id} className="flex justify-between text-xs font-sans">
                <div className="text-stone-400 truncate max-w-[70%]">
                  {it.quantity}x {it.product.name} ({it.size})
                </div>
                <span className="font-mono text-stone-600 dark:text-stone-300">${it.product.price * it.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-xs text-stone-500 dark:text-stone-400 font-sans border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex justify-between">
              <span>BAG SUBTOTAL</span>
              <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">${subtotal}</span>
            </div>
            {discountVal > 0 && (
              <div className="flex justify-between text-emerald-700 dark:text-emerald-500 font-bold">
                <span>PROMO DISCOUNT</span>
                <span className="font-mono">-${discountVal}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>EXPRESS COURIER</span>
              <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">{delivery === 0 ? 'FREE' : `$${delivery}`}</span>
            </div>
          </div>

          <div className="flex justify-between font-serif text-lg text-stone-900 dark:text-stone-100 font-bold py-1">
            <span>DECREE TOTAL</span>
            <span className="font-mono">${total}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-950 dark:bg-amber-600 text-[#eae2d3] dark:text-stone-950 py-4 rounded-full text-xs font-sans tracking-widest font-bold shadow-md hover:scale-102 transition-all cursor-pointer uppercase flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>AUTHORIZE RITUAL PAYMENT</span>
          </button>
          
          <div className="text-center text-[10px] text-stone-400 dark:text-stone-500 font-sans space-y-1">
            <p>🛡️ 256-BIT ENCRYPTED SSL CONNECTION DEPLOYED</p>
            <p>COMPLIMENTARY CARBON-NEUTRAL DELIVERY SECURED</p>
          </div>
        </div>

      </form>
    </div>
  );
}
