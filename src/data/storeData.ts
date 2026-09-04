/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Ingredient, SkinConcernDetail, BlogPost } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'lum-c',
    name: 'Luminosity C Glow Serum',
    category: 'Serums',
    concern: 'Hyperpigmentation',
    price: 88,
    originalPrice: 110,
    rating: 4.8,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
    description: 'A 15% pure Vitamin C serum combined with Ferulic Acid and Vitamin E to dramatically brighten skin, fade dark spots, and defend against environmental aging.',
    longDescription: 'Our signature brightening complex represents the pinnacle of modern dermatology. Formulated at a precise pH of 3.2, this potent water-light serum penetrates deeply to block melanin synthesis, promote collagen genesis, and neutralize free radical damage. Enhanced with medical-grade Squalane and Camellia Leaf extract to protect the skin barrier while reversing stubborn UV damage.',
    ingredients: ['Vitamin C', 'Ferulic Acid', 'Vitamin E', 'Hyaluronic Acid', 'Squalane', 'Aloe Vera'],
    benefits: [
      'Dramatically brightens dull complexion',
      'Fades dark spots and hyperpigmentation in 4 weeks',
      'Neutralizes free radicals and environmental stressors',
      'Smooths skin texture and minimizes fine lines'
    ],
    usage: [
      'Apply 4-5 drops to a clean, dry face, neck, and chest in the morning.',
      'Allow the serum to fully absorb into the skin.',
      'Follow with your favorite moisturizer and SPF 30+ sunscreen.'
    ],
    skinTypes: ['Dry', 'Oily', 'Combination', 'Normal'],
    concernsSolved: ['Dark Spots', 'Hyperpigmentation', 'Dullness', 'Fine Lines'],
    clinicalResults: [
      '94% reported significantly brighter skin after 14 days.',
      '89% noticed a visible reduction in dark spots after 4 weeks.',
      '97% felt immediate skin hydration and smoothness.'
    ],
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600'
    ],
    variantSizes: ['30ml', '50ml'],
    isBestSeller: true,
    isSubscription: true,
    refillPrice: 75
  },
  {
    id: 'cer-barrier',
    name: 'Ceramide Barrier Restoring Cream',
    category: 'Moisturizers',
    concern: 'Sensitivity',
    price: 72,
    rating: 4.9,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1629732047847-50b7ecf0cbf1?auto=format&fit=crop&q=80&w=600',
    description: 'An ultra-rich moisturizing cream with 3 essential Ceramides, Hyaluronic Acid, and Peptides to rebuild compromised skin barriers, lock in hydration, and soothe redness.',
    longDescription: 'Specifically engineered for dry, sensitive, or redness-prone skin, this nourishing cloud cream features an optimized 3:1:1 lipid ratio of Ceramides, Cholesterol, and Fatty Acids. This advanced formula mimics your skin’s natural lipid structure to seal micro-cracks, prevent transepidermal water loss, and deliver 48-hour deep structural hydration.',
    ingredients: ['Ceramides', 'Peptides', 'Hyaluronic Acid', 'Squalane', 'Centella Asiatica'],
    benefits: [
      'Instantly repairs and strengthens the skin protective barrier',
      'Calms visible redness, irritation, and inflammation',
      'Locks in deep hydration for up to 48 hours',
      'Firms skin structure with multi-action peptide complex'
    ],
    usage: [
      'Apply a nickel-sized amount to cleansed, toned skin morning and night.',
      'Gently massage in upward circular motions until fully absorbed.',
      'Excellent for use after active treatments like Retinol or AHAs.'
    ],
    skinTypes: ['Dry', 'Sensitive', 'Normal', 'Combination'],
    concernsSolved: ['Redness', 'Sensitivity', 'Dehydration', 'Dry Skin'],
    clinicalResults: [
      '98% experienced a complete restoration of dry patches in 3 days.',
      '95% reported immediate relief from skin tightness and burning.',
      '92% observed a visible decrease in persistent skin redness.'
    ],
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629732047847-50b7ecf0cbf1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600'
    ],
    variantSizes: ['50ml', '80ml'],
    isBestSeller: true,
    isSubscription: true,
    refillPrice: 60
  },
  {
    id: 'ret-night',
    name: 'Retinol Youth Renewal Serum',
    category: 'Serums',
    concern: 'Aging',
    price: 95,
    rating: 4.7,
    reviewsCount: 289,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
    description: 'An advanced encapsulated 0.5% Retinol serum with Peptides and Squalane to smooth deep wrinkles, increase collagen production, and improve skin elasticity without irritation.',
    longDescription: 'Experience the transformative power of Retinol without the traditional redness and peeling. Our proprietary micro-encapsulation technology delivers pure retinol slowly and deep within the epidermal layers overnight. This ensures steady skin renewal, acceleration of cell turnover, and dramatic smoothing of stubborn deep lines, backed by soothing botanical extracts.',
    ingredients: ['Retinol', 'Peptides', 'Squalane', 'Ceramides', 'Green Tea Extract'],
    benefits: [
      'Visibly reduces the appearance of fine lines and deep wrinkles',
      'Refines uneven skin texture and tightens large pores',
      'Boosts cellular turnover and stimulates natural collagen synthesis',
      'Improves skin firmness, elasticity, and youthful bounce'
    ],
    usage: [
      'In the evening, apply 2-3 drops to a clean, dry face, avoiding the eye area.',
      'Start by using 2 nights a week, then gradually increase frequency.',
      'Always apply SPF 30+ sunscreen the following morning.'
    ],
    skinTypes: ['Oily', 'Combination', 'Normal', 'Dry'],
    concernsSolved: ['Wrinkles', 'Aging', 'Fine Lines', 'Large Pores', 'Uneven Tone'],
    clinicalResults: [
      '91% reported smoother texture and refined pores in 2 weeks.',
      '87% noticed visible lifting and reduction in fine wrinkles in 28 days.',
      '94% experienced zero dryness or irritation compared to traditional retinol.'
    ],
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600'
    ],
    variantSizes: ['30ml'],
    isBestSeller: true,
    isSubscription: true,
    refillPrice: 80
  },
  {
    id: 'hydra-plump',
    name: 'Multi-Molecular Hyaluronic Gel Cream',
    category: 'Moisturizers',
    concern: 'Dehydration',
    price: 58,
    rating: 4.8,
    reviewsCount: 411,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=600',
    description: 'A light-as-air gel-cream featuring 5 weights of Hyaluronic Acid, Squalane, and Aloe Vera to drench skin in immediate cooling moisture and plump away dehydration lines.',
    longDescription: 'This breakthrough water-gel moisturizer utilizes five distinct molecular weights of Hyaluronic Acid to hydrate every layer of the skin—from the topmost barrier to the deepest epidermal cells. Designed with a non-comedogenic, oil-free cooling base, it absorbs in 3 seconds flat, leaving a dewy, glowing finish that is perfect under makeup or on its own.',
    ingredients: ['Hyaluronic Acid', 'Squalane', 'Aloe Vera', 'Niacinamide', 'Zinc PCA'],
    benefits: [
      'Provides multi-depth, lock-in hydration for a plumped look',
      'Smoothes dehydration-induced fine lines and dry flakes',
      'Oil-free, weightless formula controls shine while hydrating',
      'Gives skin a fresh, glass-like dewy glow'
    ],
    usage: [
      'Smooth over face, neck, and chest morning and night after cleansing.',
      'Apply to slightly damp skin to maximize moisture absorption.',
      'Use as a refreshing moisture-prep before applying makeup.'
    ],
    skinTypes: ['Normal', 'Oily', 'Combination', 'Sensitive', 'Dry'],
    concernsSolved: ['Dehydration', 'Dullness', 'Fine Lines', 'Dry Skin'],
    clinicalResults: [
      '100% felt immediate cooling relief and surge of hydration.',
      '96% noticed plumper, bouncier skin within 7 days.',
      '93% reported skin looked fresh and glowing without greasy residue.'
    ],
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600'
    ],
    variantSizes: ['50ml', '100ml'],
    isSubscription: true,
    refillPrice: 48
  },
  {
    id: 'squalane-oil',
    name: 'Squalane & Tea Tree Clarifying Oil',
    category: 'Face Oils',
    concern: 'Acne',
    price: 64,
    rating: 4.6,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    description: 'A lightweight, non-greasy facial oil formulated with plant-derived Squalane, Salicylic Acid, and Tea Tree oil to clear persistent breakouts, balance sebum, and soothe acne-irritated skin.',
    longDescription: 'Who says oily, acne-prone skin cannot benefit from a face oil? Our innovative purifying oil combines high-purity Squalane, which mimics skin’s natural lipid barrier, with 1.5% Salicylic Acid to exfoliate inside pore walls. Therapeutic tea tree and blue tansy oils clear blemish-causing microbes while preventing dry, scaly skin associated with typical acne treatments.',
    ingredients: ['Squalane', 'Salicylic Acid', 'Aloe Vera', 'Centella Asiatica', 'Green Tea Extract'],
    benefits: [
      'Clears active breakouts and prevents future blemishes',
      'Regulates excess oil production and refines large pores',
      'Deeply nourishes acne-stressed skin without clogging pores',
      'Soothes skin redness and inflammation associated with breakouts'
    ],
    usage: [
      'Press 2-3 drops onto face as the final step of your nighttime routine.',
      'Can be mixed directly into your moisturizer for a purifying hydration boost.',
      'Use as a spot treatment for stubborn individual blemishes.'
    ],
    skinTypes: ['Oily', 'Combination', 'Sensitive', 'Normal'],
    concernsSolved: ['Acne', 'Large Pores', 'Redness', 'Oily Skin'],
    clinicalResults: [
      '86% reported a visible clearance of active blemishes in 7 days.',
      '91% saw a significant reduction in overall skin shininess.',
      '95% confirmed their skin did not feel stripped, dry, or irritated.'
    ],
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600'
    ],
    variantSizes: ['30ml'],
    isSubscription: true,
    refillPrice: 52
  },
  {
    id: 'sal-cleanser',
    name: 'Salicylic Acid Purifying Cleanser',
    category: 'Cleansers',
    concern: 'Acne',
    price: 42,
    rating: 4.7,
    reviewsCount: 382,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    description: 'A foaming gel cleanser with 2% Salicylic Acid, Zinc PCA, and Niacinamide to deeply clear pores, banish blackheads, and control sebum without striping the skin.',
    longDescription: 'Achieve deep-pore purification without compromising skin integrity. Our soap-free, non-stripping cleanser utilizes a clean surfactants base to wash away daily debris and impurities. Active 2% Salicylic Acid targets deep dead cells to clear blackheads, while Zinc PCA balances lipid production, and Niacinamide repairs skin barriers to minimize post-blemish marks.',
    ingredients: ['Salicylic Acid', 'Zinc PCA', 'Niacinamide', 'Centella Asiatica', 'Aloe Vera'],
    benefits: [
      'Deeply cleanses skin pores and prevents blackheads and whiteheads',
      'Balances excess sebum and reduces facial shine',
      'Supports healthy skin cell renewal with gentle exfoliation',
      'Soothes skin with Centella and Aloe, leaving skin soft'
    ],
    usage: [
      'Wet face and massage 1-2 pumps of cleanser onto skin in gentle circles.',
      'Focus on areas of congestion like the forehead, nose, and chin.',
      'Rinse thoroughly with lukewarm water. Use morning and night.'
    ],
    skinTypes: ['Oily', 'Combination', 'Normal'],
    concernsSolved: ['Acne', 'Large Pores', 'Oily Skin'],
    clinicalResults: [
      '95% felt skin was thoroughly clean but not tight or dry.',
      '88% saw a visible decrease in blackheads after 2 weeks.',
      '91% noticed a calmer, less inflamed overall skin tone.'
    ],
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600'
    ],
    variantSizes: ['150ml', '250ml'],
    isSubscription: true,
    refillPrice: 34
  },
  {
    id: 'zinc-toner',
    name: 'Zinc PCA Calming & Balancing Toner',
    category: 'Toners',
    concern: 'Redness',
    price: 45,
    rating: 4.8,
    reviewsCount: 224,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
    description: 'An alcohol-free soothing toner rich in Zinc PCA, Centella Asiatica, and Green Tea Extract to restore skin’s natural pH, soothe redness, and tighten pores.',
    longDescription: 'This botanical-rich hydrating toner is the ultimate reset button for stressed skin. It quickly works to rebalance the skin’s delicate acid mantle after cleansing, infusing the skin with high-purity Zinc PCA to clarify and calm. Highly concentrated Centella Asiatica (Cica) and calming green tea extract form a protective hydration matrix that immediately neutralizes redness.',
    ingredients: ['Zinc PCA', 'Centella Asiatica', 'Green Tea Extract', 'Hyaluronic Acid', 'Aloe Vera'],
    benefits: [
      'Restores skin protective acidic mantle to ideal pH of 5.5',
      'Calms immediate redness, burning, and skin sensitivity',
      'Preps skin layers for maximum serum absorption',
      'Visibly refines pore structure and smooths skin texture'
    ],
    usage: [
      'After cleansing, apply a generous splash of toner to hands or cotton pad.',
      'Gently pat into the face and neck until fully absorbed.',
      'Follow immediately with serums while skin is still slightly damp.'
    ],
    skinTypes: ['Sensitive', 'Dry', 'Normal', 'Combination', 'Oily'],
    concernsSolved: ['Redness', 'Sensitivity', 'Dehydration', 'Large Pores'],
    clinicalResults: [
      '97% noticed immediate skin cooling and soothing effect.',
      '91% saw a reduction in facial redness within 10 minutes.',
      '94% reported subsequent products absorbed faster and performed better.'
    ],
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600'
    ],
    variantSizes: ['150ml'],
    isSubscription: true,
    refillPrice: 38
  },
  {
    id: 'mineral-spf',
    name: 'Mineral Shield Invisible SPF 50',
    category: 'Sunscreens',
    concern: 'Aging',
    price: 52,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
    description: 'A lightweight, non-greasy, 100% Zinc Oxide mineral sunscreen that offers broad-spectrum UVA/UVB protection with zero white cast and a smooth satin finish.',
    longDescription: 'The ultimate protection against photo-aging. Our ultra-purified micronized Zinc Oxide provides an invisible physical block against cellular damage, while Niacinamide brightens skin, and organic Squalane nourishes. Water-resistant, oil-free, and formulated to never clog pores or sting sensitive eyes, this is daily sun protection you will actually enjoy wearing.',
    ingredients: ['Zinc PCA', 'Niacinamide', 'Squalane', 'Vitamin E', 'Green Tea Extract'],
    benefits: [
      'Broad-spectrum SPF 50 defense against aging UVA and burning UVB',
      'Completely sheer, invisible finish with absolutely zero chalky white cast',
      'Niacinamide fades existing UV damage while SPF prevents new marks',
      'Doubles as a silky, pore-blurring makeup primer'
    ],
    usage: [
      'Apply generously to the face, neck, and ears as the final step of morning routine.',
      'Use the two-finger rule to ensure adequate overall protection.',
      'Reapply every 2 hours if swimming, sweating, or in direct sunlight.'
    ],
    skinTypes: ['Sensitive', 'Normal', 'Dry', 'Oily', 'Combination'],
    concernsSolved: ['Aging', 'Dark Spots', 'Hyperpigmentation', 'Redness'],
    clinicalResults: [
      '100% confirmed it left zero white cast on all skin tones.',
      '96% reported it felt incredibly light and breathable.',
      '93% noted it sat beautifully under makeup without piling.'
    ],
    images: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600'
    ],
    variantSizes: ['50ml', '80ml'],
    isBestSeller: true,
    isSubscription: true,
    refillPrice: 42
  }
];

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'vit-c',
    name: 'Vitamin C',
    description: 'A powerful water-soluble antioxidant that brightens skin tone, increases collagen production, and fades dark spots by blocking melanin pathway.',
    benefits: [
      'Protects skin from UV-induced free radical damage',
      'Improves the appearance of dark spots and hyperpigmentation',
      'Boosts natural skin collagen production to minimize lines',
      'Gives skin a luminous, radiant complexion'
    ],
    skinTypes: ['Normal', 'Dry', 'Combination', 'Oily'],
    concerns: ['Hyperpigmentation', 'Dark Spots', 'Aging', 'Fine Lines'],
    classification: 'Antioxidant',
    origin: 'Natural (Derived from Citrus/Fermentation) & Scientific Synthesis',
    usage: 'Best used in your morning routine as an antioxidant shield under sunscreen. Do not mix directly in the same step as Retinol or strong AHAs.',
    compatibility: ['Ferulic Acid', 'Vitamin E', 'Hyaluronic Acid'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'retinol',
    name: 'Retinol',
    description: 'A derivative of Vitamin A that acts as the gold standard in modern anti-aging, promoting cellular turnover and boosting collagen synthesis.',
    benefits: [
      'Smoothes deep stubborn wrinkles and fine lines',
      'Accelerates skin cell regeneration and turn-over',
      'Firms skin structure and restores youthful bounce',
      'Refines pore walls and clears texture congestion'
    ],
    skinTypes: ['Normal', 'Combination', 'Oily', 'Dry'],
    concerns: ['Aging', 'Wrinkles', 'Fine Lines', 'Large Pores'],
    classification: 'Retinoid (Vitamin A Derivative)',
    origin: 'Dermatological Laboratory Synthesis',
    usage: 'Use strictly in the evening. Start slowly (2 nights a week) and always use SPF 30+ daily, as retinol increases sun sensitivity.',
    compatibility: ['Ceramides', 'Hyaluronic Acid', 'Peptides'],
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'niacinamide',
    name: 'Niacinamide',
    description: 'Also known as Vitamin B3, Niacinamide is a highly versatile active that controls oil production, repairs the skin barrier, and calms redness.',
    benefits: [
      'Regulates excess sebum production and prevents breakouts',
      'Fades post-acne marks and stubborn hyperpigmentation',
      'Repairs skin lipid barrier by boosting ceramide generation',
      'Reduces appearance of large pores and calms inflammation'
    ],
    skinTypes: ['Sensitive', 'Oily', 'Combination', 'Normal', 'Dry'],
    concerns: ['Acne', 'Large Pores', 'Redness', 'Hyperpigmentation'],
    classification: 'B-Vitamin Complex',
    origin: 'Organic synthesis',
    usage: 'Highly stable and suitable for both morning and night. Can be easily layered with almost any active, including Retinol and Vitamin C.',
    compatibility: ['Zinc PCA', 'Hyaluronic Acid', 'Ceramides', 'Retinol'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'hyaluronic',
    name: 'Hyaluronic Acid',
    description: 'A natural humectant that can hold up to 1000 times its weight in water, drawing deep structural moisture into skin cells and plumping fine lines.',
    benefits: [
      'Delivers instant surge of structural moisture to skin cells',
      'Plumps skin from within to fade dry fine lines',
      'Improves skin bounce, texture, and elasticity',
      'Soothes skin tight discomfort'
    ],
    skinTypes: ['Dry', 'Normal', 'Oily', 'Combination', 'Sensitive'],
    concerns: ['Dehydration', 'Dry Skin', 'Fine Lines'],
    classification: 'Humectant',
    origin: 'Natural bio-fermentation',
    usage: 'Apply to damp skin morning and night. Layer beneath occlusive moisturizers to seal in hydration.',
    compatibility: ['Niacinamide', 'Ceramides', 'Vitamin C', 'Peptides'],
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ceramides',
    name: 'Ceramides',
    description: 'Lipids naturally found in high concentrations in skin layers, essential for repairing the protective barrier and retaining deep hydration.',
    benefits: [
      'Rebuilds and seals the skin natural protective barrier',
      'Locks in crucial moisture and prevents water evaporation',
      'Protects against environmental irritants and pollution',
      'Calms redness and reduces skin hypersensitivity'
    ],
    skinTypes: ['Dry', 'Sensitive', 'Normal', 'Combination'],
    concerns: ['Sensitivity', 'Redness', 'Dry Skin', 'Dehydration'],
    classification: 'Lipid (Fatty Acid Complex)',
    origin: 'Bio-synthetic plant-derived extraction',
    usage: 'Perfect for morning and evening routines in moisturizers. Especially beneficial for pairing with resurfacing treatments.',
    compatibility: ['Hyaluronic Acid', 'Retinol', 'Peptides', 'Squalane'],
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600'
  }
];

export const CONCERNS: SkinConcernDetail[] = [
  {
    id: 'acne',
    name: 'Acne & Congestion',
    description: 'Acne develops when hair follicles become clogged with dead skin cells and excess oil, creating an ideal environment for bacteria to multiply.',
    causes: 'Acne is primarily driven by excess sebum production, follicle blockage by hyper-keratinization, and colonization of Cutibacterium acnes bacteria. Hormones, high-stress levels, and generic pore-clogging cosmetics can exacerbate these factors.',
    symptoms: [
      'Blackheads (open clogged pores)',
      'Whiteheads (closed clogged pores)',
      'Papules (small red inflammatory bumps)',
      'Pustules (pus-filled inflammatory pimples)',
      'Deep, painful cystic nodules'
    ],
    recommendedIngredients: ['Salicylic Acid', 'Niacinamide', 'Squalane', 'Zinc PCA'],
    products: ['sal-cleanser', 'squalane-oil', 'hydra-plump'],
    morningRoutine: [
      'Cleanse with Salicylic Purifying Cleanser to wash away overnight excess sebum.',
      'Soothe with Zinc PCA Calming Toner to reset pH and minimize inflammation.',
      'Hydrate with weightless Multi-Molecular Hyaluronic Gel Cream.',
      'Protect with Mineral Shield SPF 50 (non-comedogenic sun defense).'
    ],
    nightRoutine: [
      'Double cleanse with Salicylic Purifying Cleanser to sweep away grime.',
      'Apply 2-3 drops of Squalane & Tea Tree Clarifying Oil to active blemish zones.',
      'Seal with a light layer of Ceramide Barrier Restoring Cream if dry areas exist.'
    ],
    faqs: [
      {
        q: 'How long does it take to see results with acne treatments?',
        a: 'Active ingredients like Salicylic Acid can calm red active bumps in 24-48 hours. However, preventing new micro-comedones from forming deep in the pores requires consistent daily treatment for 4 to 12 weeks.'
      },
      {
        q: 'Should I stop using face oils if I have oily, acne-prone skin?',
        a: 'Absolutely not! Dehydrated skin often over-produces sebum to compensate, causing more clogged pores. Using a lightweight, non-comedogenic oil (like high-purity Squalane) mimics the natural lipid barrier, signaling pores to reduce natural oil output.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'hyperpigmentation',
    name: 'Hyperpigmentation & Dark Spots',
    description: 'Hyperpigmentation occurs when the skin overproduces melanin—the pigment that gives skin its color—forming stubborn flat brown spots or uneven patches.',
    causes: 'Triggered by sun exposure, hormonal shifts (such as melasma), age, or inflammatory injuries like acne (Post-Inflammatory Hyperpigmentation). When UV rays hit unprotected skin, melanocytes generate excessive melanin as a defense mechanism.',
    symptoms: [
      'Localized dark brown or sun spots',
      'Post-acne red or brown spots (PIH/PIE)',
      'Symmetrical mask-like facial patches (Melasma)',
      'Overall dull, uneven, flat skin tone'
    ],
    recommendedIngredients: ['Vitamin C', 'Niacinamide', 'Retinol', 'Zinc PCA'],
    products: ['lum-c', 'ret-night', 'mineral-spf'],
    morningRoutine: [
      'Cleanse gently and apply Zinc PCA Calming Toner.',
      'Massage 4-5 drops of Luminosity C Glow Serum (15% pure Vitamin C) to block melanin synthesis.',
      'Hydrate with Hyaluronic Gel Cream.',
      'Crucial step: Apply Mineral Shield SPF 50 to block UV rays from darkening spots.'
    ],
    nightRoutine: [
      'Cleanse and tone skin thoroughly.',
      'Apply Retinol Youth Renewal Serum (promotes cellular turn-over to shed pigmented cells fast).',
      'Nourish skin overnight with Ceramide Barrier Restoring Cream.'
    ],
    faqs: [
      {
        q: 'Why is sunscreen mandatory for fading dark spots?',
        a: 'Melanin is generated as a direct response to UV radiation. Even if you use the strongest brightening serums, just 5 minutes of unprotected sun exposure will re-trigger the melanin pathways, completely undoing weeks of treatment.'
      },
      {
        q: 'Can Vitamin C and Retinol be used together?',
        a: 'Yes, but not at the exact same time. Vitamin C functions best at a low, acidic pH under morning sun shields, while Retinol is a photosensitive night active. Use Vitamin C in the morning and Retinol at night for the ultimate synergistic routine.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'redness',
    name: 'Redness & Skin Sensitivity',
    description: 'Persistent redness and skin sensitivity are markers of a compromised skin protective barrier and chronic inflammation, leaving the skin vulnerable to external irritants.',
    causes: 'A weakened stratum corneum (skin barrier) allows irritants to slip in and essential water to leak out. Genetics, harsh exfoliating acids, sudden weather changes, or underlying issues like rosacea contribute to this state.',
    symptoms: [
      'Persistent facial flushing or broken capillaries',
      'Frequent stinging, burning, or itching sensations',
      'Dry, flaky patches that do not respond to water',
      'Hypersensitivity to skincare active ingredients'
    ],
    recommendedIngredients: ['Ceramides', 'Centella Asiatica', 'Hyaluronic Acid', 'Niacinamide'],
    products: ['cer-barrier', 'zinc-toner', 'hydra-plump'],
    morningRoutine: [
      'Wash face gently with plain water or ultra-mild cleanser.',
      'Splash on Zinc PCA Calming & Balancing Toner to cool and reset skin.',
      'Apply Ceramide Barrier Restoring Cream to seal the protective lipid wall.',
      'Protect with Mineral Shield SPF 50 (non-nano zinc-based physical sunscreen).'
    ],
    nightRoutine: [
      'Cleanse with a mild hydrating cleanser.',
      'Soothe with several layers of Zinc PCA Calming Toner (7-Skin Method).',
      'Apply an extra thick layer of Ceramide Barrier Restoring Cream as a night repair mask.'
    ],
    faqs: [
      {
        q: 'What should I do if my skin barrier is completely broken?',
        a: 'Strip your routine back to the absolute basics: a gentle hydrating cleanser, a rich ceramide-restoring cream, and physical SPF. Put all active acids (AHAs, BHAs, Retinol, Vitamin C) on complete hold for 2 to 4 weeks until stinging stops.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&q=80&w=600'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'science-barrier',
    title: 'The Science of the Skin Barrier: Why Lipids are Key',
    category: 'Skincare Education',
    author: 'Dr. Helen Carter, Dermatologist',
    date: 'June 18, 2026',
    excerpt: 'Your stratum corneum is your shield. Discover the exact biochemical ratio of ceramides, fatty acids, and cholesterol required to maintain absolute skin health.',
    content: 'Skincare is often discussed in terms of external glow, but true dermatological health is governed entirely by structural biology. The topmost layer of your skin, the stratum corneum, is biochemically structured like a brick wall. The "bricks" are corneocytes (dead skin cells), and the "mortar" holding them together is a dense lipid matrix of ceramides, cholesterol, and free fatty acids. When this lipid mortar is depleted—due to aging, harsh weather, or over-exfoliation—micro-fissures develop, allowing water to escape (Transepidermal Water Loss) and environmental pathogens to invade. Scientific research proves that only an optimized 3:1:1 ratio of Ceramides, Cholesterol, and Fatty Acids can safely mimic and restore this delicate cellular matrix, immediately locking in moisture and halting the inflammatory cascade.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
    tags: ['Skin Barrier', 'Ceramides', 'Science-Backed', 'Dermatology']
  },
  {
    id: 'retinol-guide',
    title: 'Demystifying Retinol: The Gold Standard of Skin Aging',
    category: 'Ingredient Science',
    author: 'Sarah Lin, Cosmetic Chemist',
    date: 'May 24, 2026',
    excerpt: 'Retinol is the most clinically proven anti-aging molecule in history. Learn how it communicates with your cells and why micro-encapsulation changes everything.',
    content: 'Retinol (Vitamin A) is the absolute holy grail of cosmetic science. Unlike basic moisturizers that merely hydrate the surface, retinol functions at a cellular level. It binds directly to retinoic acid receptors in the skin, instructing cells to accelerate their rate of division and turn-over. This sweeps away old, hyperpigmented cells on the surface and stimulates deep fibroblasts to synthesize fresh, structural collagen and elastin. However, pure retinol is incredibly unstable and chemically volatile. When exposed to light or air, it quickly degrades and can trigger significant epidermal inflammation. Enter micro-encapsulation technology: by wrapping pure retinol inside microscopic lipid spheres, we protect the active from degradation and release it slowly throughout the night, bypassing surface irritation to work directly in the dermal layers.',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    tags: ['Retinol', 'Anti-Aging', 'Cosmetic Chemistry', 'Collagen']
  },
  {
    id: 'double-cleansing',
    title: 'The Art and Chemisty of the Double Cleanse Method',
    category: 'Beauty Tips',
    author: 'Marcus Vance, Aesthetician',
    date: 'April 12, 2026',
    excerpt: 'Like dissolves like. Why your normal water-based face wash is leaving behind waterproof SPF, heavy sebum, and industrial city grime.',
    content: 'If you are only washing your face once, you aren’t truly cleansing. Think about the daily components on your face: excess sebum, mineral sunscreens, heavy makeup, and lipophilic atmospheric soot from traffic. These elements are highly lipophilic, meaning they are chemically designed to repel water. Standard foaming cleansers, which are water-based, struggle to dissolve these bonds. To solve this, the Double Cleanse technique utilizes a lightweight, oil-based cleanser first. The oil binds directly to the sebum and mineral filters, melting them off easily. Once rinsed, a second water-based salicylic or gentle foaming wash sweeps away the remaining water-soluble dirt and sweat, ensuring perfectly pure pores and optimal preparation for active serums.',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
    tags: ['Cleansing', 'Pore Congestion', 'Skincare Habits', 'Tips']
  }
];

export const CERTIFICATIONS = [
  {
    name: '100% Vegan Certified',
    description: 'We absolutely refuse to use any animal-derived ingredients or byproducts. Every formula is entirely plant-based, certified by the global Vegan Society.',
    icon: 'Leaf'
  },
  {
    name: 'Cruelty-Free Approved',
    description: 'LubbyCare never has, and never will, test on animals at any stage of product development. Officially certified by Leaping Bunny and PETA.',
    icon: 'Heart'
  },
  {
    name: 'Dermatologist Clinically Tested',
    description: 'Our formulations undergo rigorous independent scientific testing and clinical evaluations to ensure hypoallergenic safety, non-comedogenic status, and real efficacy.',
    icon: 'ShieldCheck'
  },
  {
    name: 'Carbon-Neutral Operations',
    description: 'From botanical sourcing to local warehousing, we offset 100% of our carbon emissions. Certified Climate Neutral, protecting our shared natural home.',
    icon: 'Globe'
  },
  {
    name: 'Sustainable FSC Packaging',
    description: 'All outer shipping boxes and product cartons are made of 100% FSC-certified post-consumer recycled paper, printed with eco-friendly organic soy inks.',
    icon: 'Package'
  }
];

export const REVIEWS = [
  {
    id: 'rev-1',
    user: 'Amara N.',
    rating: 5,
    title: 'Literally cured my post-acne dark spots!',
    comment: 'I struggled with hyperpigmentation for 2 years after a massive hormonal breakout. The Luminosity C Serum has worked absolute wonders. In 3 weeks, my face looks completely even and has this beautiful healthy glass glow. Safe to say I am a customer for life!',
    date: 'June 14, 2026',
    product: 'Luminosity C Glow Serum',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-2',
    user: 'Dmitri V.',
    rating: 5,
    title: 'The only cream that calms my eczema',
    comment: 'My skin barrier was completely broken from using a harsh prescription acid. Everything I put on my face burned. This Ceramide Restoring Cream immediately cooled my burning skin and healed my eczema dry patches in 2 days. It feels like a protective velvet glove.',
    date: 'May 28, 2026',
    product: 'Ceramide Barrier Restoring Cream',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-3',
    user: 'Isabella R.',
    rating: 5,
    title: 'Best sunscreen on the market hands down',
    comment: 'As a dark-skinned woman, finding a mineral sunscreen that does not make me look like a ghost is a nightmare. This Invisible SPF 50 is literally black-magic! It rubs in in 5 seconds, leaves zero white cast, and leaves this gorgeous satin, blurred base under my makeup.',
    date: 'June 02, 2026',
    product: 'Mineral Shield Invisible SPF 50',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-4',
    user: 'James T.',
    rating: 4,
    title: 'Great clarifying oil, pore size is visibly smaller',
    comment: 'Highly skeptical about applying oil to my oily, acne-prone nose, but this squalane tea tree blend actually works. It has balanced my oily shine and my blackheads are almost entirely gone. Dropped one star just because the tea tree smell is quite therapeutic/herbal.',
    date: 'May 10, 2026',
    product: 'Squalane & Tea Tree Clarifying Oil',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
  }
];
