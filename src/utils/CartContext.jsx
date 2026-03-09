import { createContext, useContext, useState, useCallback } from 'react';

const CART_KEY = 'shoe_cart';
const ORDERS_KEY = 'shoe_orders';

function parseCSV(csv) {
  if (!csv) return [];
  return csv.split('\n').filter(Boolean).map((row) => {
    const [productId, qty] = row.split(',');
    return { productId: Number(productId), qty: Number(qty) };
  });
}

function toCSV(items) {
  return items.map((i) => `${i.productId},${i.qty}`).join('\n');
}

function loadCart() {
  try { return parseCSV(localStorage.getItem(CART_KEY)); }
  catch { return []; }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, toCSV(items));
}

function loadOrders() {
  try { return JSON.parse(sessionStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
}

function saveOrders(orders) {
  sessionStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);
  const [orders, setOrders] = useState(loadOrders);

  const addToCart = useCallback((productId, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId);
      let next;
      if (idx >= 0) {
        next = prev.map((item, i) =>
          i === idx ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        next = [...prev, { productId, qty }];
      }
      saveCart(next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQty = useCallback((productId, qty) => {
    if (qty < 1) return;
    setCartItems((prev) => {
      const next = prev.map((i) =>
        i.productId === productId ? { ...i, qty } : i
      );
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(CART_KEY);
  }, []);

  const placeOrder = useCallback((method, cartWithProducts, total) => {
    const order = {
      id: Date.now().toString(36),
      date: new Date().toISOString(),
      method,
      total,
      items: cartWithProducts.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        qty: i.qty,
        unitPrice: i.product.price,
      })),
    };
    setOrders((prev) => {
      const next = [...prev, order];
      saveOrders(next);
      return next;
    });
    clearCart();
    return order;
  }, [clearCart]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, orders,
      addToCart, removeFromCart, updateQty, clearCart, placeOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
