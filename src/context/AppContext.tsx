/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  UserProfile,
  SkinQuizResult,
  SkinAnalysisReport,
  AppRoute,
  Order
} from '../types';
import { PRODUCTS } from '../data/storeData';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, isSubscription: boolean, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;
  activeConcernId: string | null;
  setActiveConcernId: (id: string | null) => void;
  activeBlogId: string | null;
  setActiveBlogId: (id: string | null) => void;
  quizStep: number;
  setQuizStep: (step: number) => void;
  quizAnswers: Partial<SkinQuizResult>;
  setQuizAnswers: (answers: Partial<SkinQuizResult>) => void;
  quizResult: SkinAnalysisReport | null;
  generateQuizResult: () => void;
  resetQuiz: () => void;
  skinAnalysisReport: SkinAnalysisReport | null;
  runSkinAnalysis: (imageUrl?: string) => Promise<void>;
  resetSkinAnalysis: () => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  recentlyViewed: string[];
  addToRecentlyViewed: (id: string) => void;
  compareProductIds: string[];
  toggleCompare: (id: string) => void;
  chatMessages: { id: string; sender: 'user' | 'bot' | 'system'; text: string; timestamp: string }[];
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  sendChatMessage: (text: string) => Promise<void>;
  isPreloaderActive: boolean;
  setIsPreloaderActive: (active: boolean) => void;
  promoDiscount: number;
  promoCodeApplied: string | null;
  applyPromoCode: (code: string) => { success: boolean; discount: number; message: string };
  placeOrder: (shippingInfo: any, paymentMethod: string) => Order;
  isChatLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  name: 'Amara Vance',
  email: 'amara.vance@luxurybeauty.com',
  phone: '+1 (555) 342-9812',
  loyaltyPoints: 340,
  tier: 'Gold',
  orders: [
    {
      id: 'ORD-93821',
      date: 'May 14, 2026',
      total: 130,
      items: [
        { productName: 'Luminosity C Glow Serum', size: '30ml', quantity: 1, price: 88, isSubscription: false },
        { productName: 'Salicylic Acid Purifying Cleanser', size: '150ml', quantity: 1, price: 42, isSubscription: false }
      ],
      status: 'Delivered',
      trackingNumber: 'LUBBY-482019-US',
      dateEst: 'May 18, 2026'
    }
  ],
  savedAddresses: ['1428 Emerald Blvd, Suite 400, Seattle, WA 98101'],
  wishlist: ['cer-barrier'],
  referralsCount: 2,
  referralCode: 'LUBBY-AMARA-340',
  referralsEarned: 20,
  activeSubscriptions: [
    {
      id: 'SUB-4829',
      productId: 'cer-barrier',
      productName: 'Ceramide Barrier Restoring Cream',
      nextDelivery: 'July 15, 2026',
      frequency: 'Every 30 Days',
      price: 60,
      size: '50ml'
    }
  ]
};

export function AppProvider({ children }: { children: ReactNode }) {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('lubbycare_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Routing state
  const [activeRoute, setRouteState] = useState<AppRoute>('home');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Shopping States
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lubbycare_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('lubbycare_wishlist');
    return saved ? JSON.parse(saved) : DEFAULT_USER.wishlist;
  });

  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeConcernId, setActiveConcernId] = useState<string | null>(null);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  // Recently Viewed and Compare
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('lubbycare_recent');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareProductIds, setCompareProductIds] = useState<string[]>([]);

  // AI Quiz States
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Partial<SkinQuizResult>>({});
  const [quizResult, setQuizResult] = useState<SkinAnalysisReport | null>(null);

  // AI Skin Analysis States
  const [skinAnalysisReport, setSkinAnalysisReport] = useState<SkinAnalysisReport | null>(null);

  // User Profile
  const [userProfile, setUserProfileState] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lubbycare_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  // Chat States
  const [chatMessages, setChatMessages] = useState<{ id: string; sender: 'user' | 'bot' | 'system'; text: string; timestamp: string }[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: "Welcome to LubbyCare luxury concierge. I'm your AI Skincare Assistant, trained by top dermatologists. How may I elevate your skincare rituals today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Preloader
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  // Promo and Checkout
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCodeApplied, setPromoCodeApplied] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('lubbycare_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lubbycare_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lubbycare_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lubbycare_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('lubbycare_user', JSON.stringify(userProfile));
  }, [userProfile]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setRoute = (route: AppRoute) => {
    setIsPreloaderActive(true);
    setRouteState(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size: string, isSubscription: boolean, quantity = 1) => {
    const itemPrice = isSubscription ? (product.refillPrice || product.price * 0.85) : product.price;
    const cartId = `${product.id}-${size}-${isSubscription ? 'sub' : 'one'}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === cartId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevCart,
        {
          id: cartId,
          product: { ...product, price: itemPrice },
          quantity,
          size,
          isSubscription
        }
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoDiscount(0);
    setPromoCodeApplied(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const updated = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      setUserProfileState(curr => ({ ...curr, wishlist: updated }));
      return updated;
    });
  };

  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 5);
    });
  };

  const toggleCompare = (id: string) => {
    setCompareProductIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]; // Keep max 3
      }
      return [...prev, id];
    });
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfileState(prev => ({ ...prev, ...profile }));
  };

  // AI Quiz logic
  const generateQuizResult = () => {
    const report: SkinAnalysisReport = {
      id: `QUIZ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString(),
      diagnostics: {
        dryness: quizAnswers.skinType === 'Dry' ? 85 : quizAnswers.skinType === 'Combination' ? 45 : 20,
        oiliness: quizAnswers.skinType === 'Oily' ? 90 : quizAnswers.skinType === 'Combination' ? 65 : 15,
        redness: quizAnswers.sensitivity === 'High' ? 80 : 30,
        acne: quizAnswers.concerns?.includes('Acne') ? 75 : 10,
        unevenTone: quizAnswers.concerns?.includes('Hyperpigmentation') ? 70 : 25,
        pores: quizAnswers.skinType === 'Oily' ? 80 : 40,
        hydration: quizAnswers.skinType === 'Dry' ? 30 : 75,
        collagenIndex: quizAnswers.ageRange === '50+' ? 45 : quizAnswers.ageRange === '35-49' ? 70 : 92
      },
      recommendations: [
        'lum-c',
        quizAnswers.skinType === 'Dry' || quizAnswers.sensitivity === 'High' ? 'cer-barrier' : 'hydra-plump',
        'mineral-spf'
      ],
      routines: {
        morning: [
          'Wash face with lukewarm water.',
          'Apply 3 drops of Luminosity C Glow Serum.',
          'Lock in with Ceramide Barrier Cream.',
          'Finish with Mineral Shield SPF 50.'
        ],
        night: [
          'Double cleanse with Salicylic Purifying Cleanser.',
          'Pat on Zinc PCA Calming Toner.',
          'Nourish deeply with Squalane & Tea Tree Clarifying Oil.'
        ]
      }
    };
    setQuizResult(report);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResult(null);
  };

  // AI Skin Analysis
  const runSkinAnalysis = async (imageUrl?: string) => {
    setIsChatLoading(true);
    // Simulate server side analysis trigger
    try {
      const response = await fetch('/api/analyze-skin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl || 'default-glowing-face' })
      });
      if (response.ok) {
        const data = await response.json();
        setSkinAnalysisReport(data.report);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (e) {
      // Robust client fallback
      const report: SkinAnalysisReport = {
        id: `DIAG-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString(),
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
        diagnostics: {
          dryness: 48,
          oiliness: 32,
          redness: 55,
          acne: 22,
          unevenTone: 61,
          pores: 44,
          hydration: 68,
          collagenIndex: 84
        },
        recommendations: ['lum-c', 'cer-barrier', 'mineral-spf'],
        routines: {
          morning: [
            'Gently cleanse with water to protect surface oils.',
            'Apply 4 drops of Luminosity C Glow Serum to brighten hyperpigmentation.',
            'Massage Ceramide Barrier Restoring Cream to lock moisture and calm redness.',
            'Protect skin cellular matrix with Mineral Shield SPF 50.'
          ],
          night: [
            'Wipe off soot with oil pre-cleansing, then wash with Purifying Cleanser.',
            'Replenish pH with Zinc PCA Calming Toner.',
            'Apply Retinol Youth Renewal Serum (3 nights a week) for cellular rejuvenation.',
            'Seal with Ceramide Barrier Restoring Cream.'
          ]
        }
      };
      setSkinAnalysisReport(report);
    } finally {
      setIsChatLoading(false);
    }
  };

  const resetSkinAnalysis = () => {
    setSkinAnalysisReport(null);
  };

  // Promo Code
  const applyPromoCode = (code: string) => {
    const uppercaseCode = code.trim().toUpperCase();
    if (uppercaseCode === 'LUBBY10' || uppercaseCode === 'WELCOME10') {
      setPromoDiscount(10);
      setPromoCodeApplied(uppercaseCode);
      return { success: true, discount: 10, message: '10% OFF promo code applied successfully!' };
    }
    if (uppercaseCode === 'GOLDEN20') {
      setPromoDiscount(20);
      setPromoCodeApplied(uppercaseCode);
      return { success: true, discount: 20, message: '20% Special luxury discount applied!' };
    }
    return { success: false, discount: 0, message: 'Invalid coupon code. Try WELCOME10.' };
  };

  // Place Order
  const placeOrder = (shippingInfo: any, paymentMethod: string) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountAmt = (subtotal * promoDiscount) / 100;
    const total = subtotal - discountAmt;

    const newOrder: Order = {
      id: `LUBBY-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      total,
      items: cart.map(item => ({
        productName: item.product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
        isSubscription: item.isSubscription
      })),
      status: 'Processing',
      trackingNumber: `LUBBY-${Math.floor(100000 + Math.random() * 900000)}-US`,
      dateEst: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    // Calculate added loyalty points (1 point per dollar spent)
    const pointsEarned = Math.floor(total);

    setUserProfileState(prev => {
      const updatedOrders = [newOrder, ...prev.orders];
      const newPoints = prev.loyaltyPoints + pointsEarned;
      const newTier = newPoints >= 1000 ? 'Platinum' : newPoints >= 500 ? 'Gold' : 'Silver';

      // Setup any subscriptions
      const subItems = cart
        .filter(item => item.isSubscription)
        .map((item, idx) => ({
          id: `SUB-${Math.floor(1000 + Math.random() * 9000)}-${idx}`,
          productId: item.product.id,
          productName: item.product.name,
          nextDelivery: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          frequency: 'Every 30 Days',
          price: item.product.price,
          size: item.size
        }));

      return {
        ...prev,
        orders: updatedOrders,
        loyaltyPoints: newPoints,
        tier: newTier,
        activeSubscriptions: [...prev.activeSubscriptions, ...subItems]
      };
    });

    clearCart();
    return newOrder;
  };

  // AI Chat Assistant
  const sendChatMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot' as const,
          text: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('Chat failed');
      }
    } catch (e) {
      // Dynamic client simulation fallback
      let reply = "I would love to help you design your optimal LubbyCare ritual. Our botanically active compounds work synergistically to restore your skin matrix. ";
      const query = text.toLowerCase();

      if (query.includes('dry') || query.includes('hydrate') || query.includes('moisture')) {
        reply = "For dry, dehydrated skin, I highly recommend our **Ceramide Barrier Restoring Cream** paired with the **Multi-Molecular Hyaluronic Gel Cream**. This provides deep molecular hydration and locks it in for 48 hours.";
      } else if (query.includes('bright') || query.includes('spots') || query.includes('vitamin c') || query.includes('hyperpigmentation')) {
        reply = "Our **Luminosity C Glow Serum** is formulated with 15% pure L-Ascorbic Acid, Ferulic Acid, and Vitamin E. Applying 4-5 drops every morning will dramatically brighten dark spots and protect against UV damage.";
      } else if (query.includes('acne') || query.includes('breakout') || query.includes('clogged') || query.includes('pimples')) {
        reply = "To balance breakouts, begin with the **Salicylic Acid Purifying Cleanser** (2% BHA) to clear deep-pore walls, then press 2 drops of **Squalane & Tea Tree Clarifying Oil** into active zones at night.";
      } else if (query.includes('aging') || query.includes('wrinkles') || query.includes('retinol')) {
        reply = "The **Retinol Youth Renewal Serum** (0.5% encapsulated retinol) is our gold standard for smoothing deep lines and boosting collagen, safely optimized with soothing squalane.";
      } else if (query.includes('sensitive') || query.includes('redness') || query.includes('irritat')) {
        reply = "Our alcohol-free **Zinc PCA Calming Toner** and **Ceramide Barrier Restoring Cream** are strictly formulated without allergens or fragrances, clinically proven to soothe redness instantly.";
      } else if (query.includes('order') || query.includes('shipping') || query.includes('track')) {
        reply = "You can easily check your shipments inside your **Customer Dashboard** under the **Order History** tab, featuring our live tracking progress timeline.";
      } else {
        reply = "That is an excellent inquiry. To elevate your skin health, we recommend starting with our interactive **AI Skin Quiz** or uploading a selfie to our **AI Skin Analysis** portal. Would you like me to guide you to those pages?";
      }

      const botMsg = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot' as const,
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeRoute,
        setRoute,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        activeProductId,
        setActiveProductId,
        activeConcernId,
        setActiveConcernId,
        activeBlogId,
        setActiveBlogId,
        quizStep,
        setQuizStep,
        quizAnswers,
        setQuizAnswers,
        quizResult,
        generateQuizResult,
        resetQuiz,
        skinAnalysisReport,
        runSkinAnalysis,
        resetSkinAnalysis,
        userProfile,
        updateUserProfile,
        recentlyViewed,
        addToRecentlyViewed,
        compareProductIds,
        toggleCompare,
        chatMessages,
        isChatOpen,
        setIsChatOpen,
        sendChatMessage,
        isPreloaderActive,
        setIsPreloaderActive,
        promoDiscount,
        promoCodeApplied,
        applyPromoCode,
        placeOrder,
        isChatLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
