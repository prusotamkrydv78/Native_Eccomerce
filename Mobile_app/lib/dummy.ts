export type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  description: string;
};

export const CATEGORIES = [
  "All",
  "Neo Wear",
  "Tech",
  "Beauty",
  "Home",
  "Sports",
  "Kids",
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
  },
  {
    id: "p2",
    title: "Quantum Noise Cancelling Headset",
    price: 199.0,
    rating: 4.7,
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1518441987397-873fe5c6a16d?auto=format&fit=crop&w=900&q=80",
    description:
      "Immersive sound. Zero distraction. A futuristic headset tuned for focus and bass.",
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
];

export type Order = {
  id: string;
  createdAt: string;
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
  items: { title: string; qty: number; price: number }[];
};

export const ORDERS: Order[] = [
  {
    id: "o1001",
    createdAt: "2026-01-12",
    status: "Shipped",
    total: 328.99,
    items: [
      { title: "Quantum Noise Cancelling Headset", qty: 1, price: 199 },
      { title: "Nebula Runner Sneakers", qty: 1, price: 129.99 },
    ],
  },
  {
    id: "o1002",
    createdAt: "2026-01-03",
    status: "Delivered",
    total: 39.5,
    items: [{ title: "Aurora Glow Serum", qty: 1, price: 39.5 }],
  },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  type: "order" | "promo" | "system";
};

export const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Order shipped",
    body: "Your order o1001 is on the way.",
    time: "2h ago",
    type: "order",
  },
  {
    id: "n2",
    title: "New drop",
    body: "Neo Wear collection is live. Limited stock.",
    time: "1d ago",
    type: "promo",
  },
];
