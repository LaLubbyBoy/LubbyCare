/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  concern: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  benefits: string[];
  usage: string[];
  skinTypes: string[];
  concernsSolved: string[];
  clinicalResults: string[];
  images: string[];
  variantSizes: string[];
  isBestSeller?: boolean;
  isSubscription?: boolean;
  refillPrice?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  skinTypes: string[];
  concerns: string[];
  classification: string;
  origin: string;
  usage: string;
  compatibility: string[];
  image: string;
}

export interface SkinConcernDetail {
  id: string;
  name: string;
  description: string;
  causes: string;
  symptoms: string[];
  recommendedIngredients: string[];
  products: string[]; // Product IDs
  morningRoutine: string[];
  nightRoutine: string[];
  faqs: { q: string; a: string }[];
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface CartItem {
  id: string; // unique ID for variant combinations
  product: Product;
  quantity: number;
  size: string;
  isSubscription: boolean;
}

export interface SubscriptionItem {
  id: string;
  productId: string;
  productName: string;
  nextDelivery: string;
  frequency: string;
  price: number;
  size: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: { productName: string; size: string; quantity: number; price: number; isSubscription: boolean }[];
  status: 'Processing' | 'Shipped' | 'Delivered' | 'In Transit';
  trackingNumber: string;
  dateEst: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
  orders: Order[];
  savedAddresses: string[];
  wishlist: string[]; // Product IDs
  referralsCount: number;
  referralCode: string;
  referralsEarned: number;
  activeSubscriptions: SubscriptionItem[];
}

export interface SkinQuizResult {
  ageRange: string;
  skinType: string;
  concerns: string[];
  sensitivity: string;
  lifestyle: string[];
  climate: string;
}

export interface SkinAnalysisReport {
  id: string;
  date: string;
  imageUrl?: string;
  diagnostics: {
    dryness: number;
    oiliness: number;
    redness: number;
    acne: number;
    unevenTone: number;
    pores: number;
    hydration: number;
    collagenIndex: number;
  };
  recommendations: string[];
  routines: {
    morning: string[];
    night: string[];
  };
}

export type AppRoute =
  | 'home'
  | 'shop'
  | 'ingredients'
  | 'concerns'
  | 'skin-types'
  | 'routines'
  | 'quiz'
  | 'analysis'
  | 'about'
  | 'sustainability'
  | 'certifications'
  | 'reviews'
  | 'journal'
  | 'contact'
  | 'faq'
  | 'dashboard'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'wholesale'
  | 'careers'
  | 'press'
  | 'privacy'
  | 'terms'
  | 'order-tracking'
  | 'loyalty'
  | 'referrals'
  | 'subscriptions';
