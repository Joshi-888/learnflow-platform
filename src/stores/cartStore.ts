import { create } from "zustand";

interface CartItem {
  id: string;
  type: "course" | "bundle";
  title: string;
  price: number;
  originalPrice: number;
  thumbnail?: string;
}

interface CartState {
  items: CartItem[];
  wishlist: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  addToWishlist: (item: CartItem) => void;
  removeFromWishlist: (id: string) => void;
  moveToCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  isInWishlist: (id: string) => boolean;
  clearCart: () => void;
  getTotal: () => number;
  getSavings: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  wishlist: [],
  addToCart: (item) =>
    set((s) => ({
      items: s.items.find((i) => i.id === item.id) ? s.items : [...s.items, item],
    })),
  removeFromCart: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  addToWishlist: (item) =>
    set((s) => ({
      wishlist: s.wishlist.find((i) => i.id === item.id) ? s.wishlist : [...s.wishlist, item],
    })),
  removeFromWishlist: (id) => set((s) => ({ wishlist: s.wishlist.filter((i) => i.id !== id) })),
  moveToCart: (id) => {
    const item = get().wishlist.find((i) => i.id === id);
    if (item) {
      set((s) => ({
        wishlist: s.wishlist.filter((i) => i.id !== id),
        items: s.items.find((i) => i.id === id) ? s.items : [...s.items, item],
      }));
    }
  },
  isInCart: (id) => get().items.some((i) => i.id === id),
  isInWishlist: (id) => get().wishlist.some((i) => i.id === id),
  clearCart: () => set({ items: [] }),
  getTotal: () => get().items.reduce((sum, i) => sum + i.price, 0),
  getSavings: () => get().items.reduce((sum, i) => sum + (i.originalPrice - i.price), 0),
}));
