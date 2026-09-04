/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/storeData';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Trash2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Percent
} from 'lucide-react';

export default function HeaderNavbar() {
  const {
    theme,
    toggleTheme,
    activeRoute,
    setRoute,
    cart,
    wishlist,
    updateCartQuantity,
    removeFromCart,
    promoDiscount,
    promoCodeApplied,
    applyPromoCode,
    setActiveProductId
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState({ text: '', error: false });

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Derived calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (cartSubtotal * promoDiscount) / 100;
  const cartTotal = cartSubtotal - discountAmount;

  // Search filter results
  const searchResults = searchVal.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.category.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.ingredients.some(i => i.toLowerCase().includes(searchVal.toLowerCase()))
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setIsSearchOpen(false);
      setRoute('shop');
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput) return;
    const res = applyPromoCode(promoCodeInput);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) setPromoCodeInput('');
  };

  const navLinks = [
    { label: 'Home', route: 'home' as const },
    { label: 'Shop', route: 'shop' as const },
    { label: 'Ingredients', route: 'ingredients' as const },
    { label: 'Concerns', route: 'concerns' as const },
    { label: 'Routines', route: 'routines' as const },
    { label: 'Journal', route: 'journal' as const },
    { label: 'Sustainability', route: 'sustainability' as const },
    { label: 'Reviews', route: 'reviews' as const },
    { label: 'About', route: 'about' as const },
    { label: 'Contact', route: 'contact' as const },
    { label: 'Account', route: 'dashboard' as const }
  ];

  return (
    <>
      {/* Upper Announcement Bar */}
      <div className="bg-brand-green text-[#eae2d3] text-left sm:text-center text-[10px] sm:text-[11px] py-2.5 px-4 tracking-[0.1em] sm:tracking-[0.2em] font-sans border-b border-black/5 transition-all relative z-40">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center sm:justify-center gap-2 leading-relaxed sm:leading-normal">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse flex-shrink-0 mt-0.5 sm:mt-0" />
          <span>
            COMPLIMENTARY SHIPPING ON ORDERS OVER $100 • 10% OFF YOUR FIRST ORDER WITH CODE: <b className="whitespace-nowrap font-bold text-brand-gold">WELCOME10</b>
          </span>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header
        id="lubbycare-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-xl border-b border-black/5 dark:border-white/5 ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#121412]/80 shadow-sm py-3'
            : 'bg-white/70 dark:bg-[#121412]/70 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button
            onClick={() => setRoute('home')}
            className="flex flex-col text-left group outline-none max-w-[65%] sm:max-w-none"
          >
            <span className="font-serif text-lg sm:text-2xl md:text-3xl tracking-[0.15em] sm:tracking-[0.25em] font-bold text-brand-green dark:text-stone-100 group-hover:text-brand-green-hover dark:group-hover:text-brand-gold transition-colors uppercase truncate">
              LUBBYCARE
            </span>
            <span className="text-[7px] sm:text-[9px] font-sans tracking-[0.12em] sm:tracking-[0.3em] text-brand-gold dark:text-brand-gold uppercase font-semibold mt-0.5 truncate">
              Healthy Skin. Beautiful Confidence.
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden 2xl:flex items-center gap-5">
            {navLinks.map(link => (
              <button
                key={link.route}
                onClick={() => setRoute(link.route)}
                className={`text-[10px] uppercase font-sans tracking-[0.16em] font-semibold transition-colors cursor-pointer relative py-1 ${
                  activeRoute === link.route
                    ? 'text-brand-green dark:text-brand-gold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-brand-green dark:hover:text-brand-gold'
                }`}
              >
                {link.label}
                {activeRoute === link.route && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-green dark:bg-brand-gold" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-brand-green dark:hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark/Light Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden lg:block p-2 text-stone-600 dark:text-stone-300 hover:text-brand-green dark:hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setRoute('wishlist')}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-brand-green dark:hover:text-brand-gold transition-colors cursor-pointer relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-gold rounded-full" />
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-brand-green dark:hover:text-brand-gold transition-colors cursor-pointer relative flex items-center gap-1.5"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[9px] font-mono font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="2xl:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-emerald-950 dark:hover:text-stone-100 transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="2xl:hidden absolute top-full left-0 right-0 bg-stone-50/98 dark:bg-[#121212]/98 border-b border-stone-200 dark:border-stone-800 shadow-md py-6 px-4 animate-fadeIn transition-all">
            <div className="flex flex-col gap-4">
              {navLinks.filter(link => link.label !== 'Account').map(link => (
                <button
                  key={link.route}
                  onClick={() => {
                    setRoute(link.route);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm uppercase font-sans tracking-widest font-semibold py-2.5 px-4 border-l-2 transition-all ${
                    activeRoute === link.route
                      ? 'border-emerald-900 text-emerald-900 dark:border-amber-500 dark:text-amber-500 bg-emerald-500/5 dark:bg-amber-500/5'
                      : 'border-transparent text-stone-600 dark:text-stone-300 hover:border-stone-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Predictive Instant Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex justify-center pt-20 px-4 animate-fadeIn">
          <div className="bg-stone-50 dark:bg-[#181818] w-full max-w-2xl rounded-2xl h-fit max-h-[80vh] shadow-2xl border border-stone-200/60 dark:border-stone-800 overflow-hidden flex flex-col">
            
            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 p-4 border-b border-stone-200 dark:border-stone-800">
              <Search className="w-5 h-5 text-stone-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products, ingredients, skin concerns..."
                className="flex-1 bg-transparent border-none outline-none text-stone-800 dark:text-stone-100 placeholder-stone-400 text-sm font-sans"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchVal('');
                }}
                className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Results Grid */}
            <div className="flex-1 overflow-y-auto p-5">
              {searchVal.trim() === '' ? (
                <div>
                  <h4 className="text-[10px] uppercase font-sans tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3 font-semibold">
                    SUGGESTED SEARCHES
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Vitamin C', 'Ceramide Repair', 'Breakouts', 'Anti-Aging', 'Moisturizer', 'Sunscreen'].map(keyword => (
                      <button
                        key={keyword}
                        onClick={() => setSearchVal(keyword)}
                        className="text-xs font-sans text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/80 px-3 py-1.5 rounded-full hover:bg-emerald-800 hover:text-[#eae2d3] dark:hover:bg-amber-600 dark:hover:text-[#eae2d3] transition-colors cursor-pointer"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>

                  <h4 className="text-[10px] uppercase font-sans tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3 font-semibold">
                    POPULAR RITUALS
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setRoute('routines');
                      }}
                      className="text-left text-xs font-sans text-stone-600 dark:text-stone-300 hover:text-emerald-900 dark:hover:text-amber-500 flex items-center justify-between group py-1"
                    >
                      <span>Beginner Skincare Essentials Routine</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setRoute('quiz');
                      }}
                      className="text-left text-xs font-sans text-stone-600 dark:text-stone-300 hover:text-emerald-900 dark:hover:text-amber-500 flex items-center justify-between group py-1"
                    >
                      <span>Interactive AI Skin Diagnostics Quiz</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <h4 className="text-[10px] uppercase font-sans tracking-[0.2em] text-stone-400 dark:text-stone-500 font-semibold">
                    PRODUCTS FOUND ({searchResults.length})
                  </h4>
                  {searchResults.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setActiveProductId(prod.id);
                        setRoute('shop');
                        setIsSearchOpen(false);
                        setSearchVal('');
                      }}
                      className="flex items-center gap-4 p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
                    >
                      <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="text-xs font-serif font-semibold text-stone-900 dark:text-stone-100">{prod.name}</div>
                        <div className="text-[10px] text-stone-400 dark:text-stone-500 font-mono mt-0.5">{prod.category} • {prod.concern}</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-stone-900 dark:text-stone-200">${prod.price}</div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setRoute('shop');
                      setIsSearchOpen(false);
                    }}
                    className="mt-2 text-center text-xs font-sans font-semibold text-emerald-800 dark:text-amber-500 flex items-center justify-center gap-1.5 hover:underline py-2 cursor-pointer"
                  >
                    <span>View All Catalog Results</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <span className="text-sm font-sans text-stone-400">No products found matching &quot;{searchVal}&quot;.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-md flex justify-end animate-fadeIn">
          {/* Backdrop exit */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsCartOpen(false)} />
          
          <div className="bg-white/80 dark:bg-[#141414]/80 backdrop-blur-xl w-full max-w-md h-full shadow-2xl flex flex-col animate-slideLeft border-l border-black/5 dark:border-white/5">
            {/* Drawer Header */}
            <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-green dark:text-brand-gold" />
                <span className="font-serif text-lg tracking-wider text-stone-900 dark:text-stone-100 font-bold uppercase">SHOPPING BAG ({cartItemCount})</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 py-16">
                  <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4 text-stone-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-base text-stone-800 dark:text-stone-200 font-semibold mb-2">Your Bag is Empty</h3>
                  <p className="text-xs text-stone-400 max-w-xs mb-6">Explore our curated collections of clinical organic formulas to initiate your journey.</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setRoute('shop');
                    }}
                    className="w-full bg-brand-green text-white py-3 rounded-full text-xs font-sans tracking-widest font-bold hover:bg-brand-green-hover transition-colors cursor-pointer"
                  >
                    DISCOVER CATALOG
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="glass-card rounded-xl border p-3 flex gap-4 relative">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 truncate pr-4">{item.product.name}</div>
                      <div className="text-[10px] font-mono text-stone-400 dark:text-stone-500 mt-0.5 uppercase tracking-wider">
                        {item.size} {item.isSubscription && <span className="text-brand-green dark:text-brand-gold font-bold">• AUTO-REFILL</span>}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-full bg-stone-50 dark:bg-stone-800/50 px-1">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-0.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-mono text-xs cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-1 text-xs font-mono font-bold text-stone-800 dark:text-stone-200">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-0.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-mono text-xs cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        {/* Price display */}
                        <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-200">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Delete Item button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer and Checkout Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-black/5 dark:border-white/5 bg-white/60 dark:bg-[#181818]/60 backdrop-blur-lg space-y-4">
                
                {/* Promo Code Fields */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="ENTER PROMO CODE"
                      className="w-full bg-stone-100 dark:bg-stone-800 border-none outline-none text-xs font-sans tracking-wider py-2.5 px-4 pr-10 rounded-full text-stone-800 dark:text-stone-200 uppercase font-semibold"
                      value={promoCodeInput}
                      onChange={e => setPromoCodeInput(e.target.value)}
                    />
                    <Percent className="absolute right-3.5 top-2.5 w-4.5 h-4.5 text-stone-400" />
                  </div>
                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-brand-green-hover text-[#eae2d3] text-xs font-sans tracking-widest font-semibold px-5 rounded-full cursor-pointer transition-colors"
                  >
                    APPLY
                  </button>
                </form>

                {promoMessage.text && (
                  <p className={`text-[10px] font-sans tracking-wide font-medium ${promoMessage.error ? 'text-red-500' : 'text-brand-green dark:text-brand-gold'}`}>
                    {promoMessage.text}
                  </p>
                )}

                {promoCodeApplied && (
                  <div className="bg-brand-green/10 dark:bg-brand-gold/10 px-4 py-2 rounded-xl flex items-center justify-between text-xs text-brand-green dark:text-brand-gold">
                    <span className="font-semibold tracking-wider font-sans uppercase">Code Applied: {promoCodeApplied}</span>
                    <span className="font-mono font-bold">-{promoDiscount}%</span>
                  </div>
                )}

                {/* Subtotal metrics */}
                <div className="space-y-2 border-b border-black/5 dark:border-white/5 pb-4 font-sans text-xs">
                  <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
                    <span>BAG SUBTOTAL</span>
                    <span className="font-mono font-semibold">${cartSubtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-brand-green dark:text-brand-gold font-semibold">
                      <span>SPECIAL SAVINGS</span>
                      <span className="font-mono">-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
                    <span>SHIPPING</span>
                    <span className="font-mono font-semibold">{cartSubtotal >= 100 ? 'FREE' : '$15'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between font-serif text-lg text-stone-900 dark:text-stone-100 font-bold py-1">
                  <span>ESTIMATED TOTAL</span>
                  <span className="font-mono">${cartTotal + (cartSubtotal >= 100 ? 0 : 15)}</span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setRoute('checkout');
                  }}
                  className="w-full bg-brand-green hover:bg-brand-green-hover dark:bg-brand-gold text-white dark:text-stone-900 py-4 rounded-full text-xs font-sans tracking-widest font-bold transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-green/10 dark:shadow-brand-gold/10"
                >
                  <span>SECURE CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-center text-[10px] text-stone-400 dark:text-stone-500 font-sans">
                  🛡️ 256-BIT ENCRYPTED SSL SECURE CONNECTION
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
