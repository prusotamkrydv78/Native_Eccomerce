import React, { createContext, useContext, useMemo, useState } from "react";

type CartItem = {
  productId: string;
  title: string;
  price: number;
  image?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((a, b) => a + b.qty, 0);
    const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);

    return {
      items,
      itemCount,
      subtotal,
      addItem: (item, qty = 1) => {
        setItems((prev) => {
          const existing = prev.find((p) => p.productId === item.productId);
          if (existing) {
            return prev.map((p) =>
              p.productId === item.productId ? { ...p, qty: p.qty + qty } : p
            );
          }
          return [...prev, { ...item, qty }];
        });
      },
      removeItem: (productId) => {
        setItems((prev) => prev.filter((p) => p.productId !== productId));
      },
      setQty: (productId, qty) => {
        setItems((prev) =>
          prev
            .map((p) => (p.productId === productId ? { ...p, qty } : p))
            .filter((p) => p.qty > 0)
        );
      },
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
