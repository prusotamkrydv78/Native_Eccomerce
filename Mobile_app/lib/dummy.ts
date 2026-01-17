export type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  description: string;
  isPopular?: boolean;
  isNew?: boolean;
  isFlashSale?: boolean;
  discount?: number;
};

export const CATEGORIES = [
  { name: "All", icon: "grid-outline" },
  { name: "Neo Wear", icon: "shirt-outline" },
  { name: "Tech", icon: "laptop-outline" },
  { name: "Beauty", icon: "sparkles-outline" },
  { name: "Home", icon: "home-outline" },
  { name: "Sports", icon: "fitness-outline" },
  { name: "Kids", icon: "happy-outline" },
];

export const BANNERS = [
  {
    id: "b1",
    title: "Summer Collection",
    subtitle: "Up to 50% OFF",
    image:
      "https://images.unsplash.com/photo-1523381235312-3590050e9961?auto=format&fit=crop&w=1200&q=80",
    color: "#6366F1",
  },
  {
    id: "b2",
    title: "Tech Week",
    subtitle: "New Gadgets In Stock",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    color: "#F97316",
  },
  {
    id: "b3",
    title: "Beauty Glow",
    subtitle: "Premium Skin Care",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&w=1200&q=80",
    color: "#EC4899",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Nebula Runner Sneakers",
    price: 129.99,
    rating: 4.8,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Ultra-light, shock-absorb, and designed for long missions. Neon comfort meets daily durability.",
    isPopular: true,
    isFlashSale: true,
    discount: 20,
  },
  {
    id: "p2",
    title: "Quantum Noise Headset",
    price: 199.0,
    rating: 4.7,
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description:
      "Immersive sound. Zero distraction. A futuristic headset tuned for focus and bass.",
    isPopular: true,
    isNew: true,
  },
  {
    id: "p3",
    title: "Aurora Glow Serum",
    price: 39.5,
    rating: 4.6,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1612810436541-336d5462d4a1?auto=format&fit=crop&w=900&q=80",
    description:
      "Hydration + glow. Lightweight formula for a clean, bright look.",
    isFlashSale: true,
    discount: 15,
  },
  {
    id: "p4",
    title: "Neo Minimal Desk Lamp",
    price: 59.0,
    rating: 4.5,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b383584f?auto=format&fit=crop&w=900&q=80",
    description:
      "Soft light with futuristic lines. Perfect for work and late-night browsing.",
  },
  {
    id: "p5",
    title: "Cosmic Mechanical Keyboard",
    price: 149.0,
    rating: 4.9,
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80",
    description:
      "Tactile feedback with RGB symphony. Built for the elite players.",
    isNew: true,
  },
  {
    id: "p6",
    title: "Cyberpunk Tech Hoodie",
    price: 89.0,
    rating: 4.4,
    category: "Neo Wear",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    description:
      "Stay warm in the digital winter. High-grade fabric with hidden pockets.",
    isPopular: true,
  },
  {
    id: "p7",
    title: "Hydra Tech Bottle",
    price: 25.0,
    rating: 4.3,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1602143399032-bd8161587343?auto=format&fit=crop&w=900&q=80",
    description: "Smart temperature tracking bottle for peak performance.",
  },
];

export const TRUST_INDICATORS = [
  { icon: "shield-checkmark-outline", text: "Secure Payments" },
  { icon: "bus-outline", text: "Free Delivery" },
  { icon: "refresh-outline", text: "Easy Returns" },
  { icon: "headset-outline", text: "24/7 Support" },
];

export const ORDERS = [
  {
    id: 'ORD-9921',
    createdAt: 'Oct 24, 2026',
    total: 358.99,
    status: 'Shipped',
    items: [
      { title: 'Nebula Runner Sneakers', qty: 1, price: 129.99, productId: 'p1' },
      { title: 'Quantum Noise Headset', qty: 1, price: 199.00, productId: 'p2' },
    ],
  },
  {
    id: 'ORD-8812',
    createdAt: 'Oct 20, 2026',
    total: 89.00,
    status: 'Delivered',
    items: [
      { title: 'Cyberpunk Tech Hoodie', qty: 1, price: 89.00, productId: 'p6' },
    ],
  },
  {
    id: 'ORD-7754',
    createdAt: 'Oct 15, 2026',
    total: 59.00,
    status: 'Processing',
    items: [
      { title: 'Neo Minimal Desk Lamp', qty: 1, price: 59.00, productId: 'p4' },
    ],
  },
];

export const NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'order',
    title: 'Order Shipped!',
    body: 'Your order #ORD-9921 has been shipped and is on its way.',
    time: '2 hours ago',
  },
  {
    id: 'n2',
    type: 'promo',
    title: 'Weekend Flash Sale',
    body: 'Get up to 70% off on all tech gadgets this weekend only!',
    time: '5 hours ago',
  },
  {
    id: 'n3',
    type: 'alert',
    title: 'Security Alert',
    body: 'A new login was detected from a Chrome browser on Linux.',
    time: '1 day ago',
  },
];
