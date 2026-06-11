import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CartContext } from './cart-context';

const STORAGE_KEY = 'fakomerce-cart';

const loadCart = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    // Corrupt JSON or storage unavailable — start with an empty cart
    return [];
  }
};

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
    toast.success('Added to cart', { description: product.title });
  };

  const removeItem = (productId) => {
    const item = items.find((item) => item.product.id === productId);
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    if (item) {
      toast.info('Removed from cart', { description: item.product.title });
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    const item = items.find((item) => item.product.id === productId);
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
    if (item) {
      const delta = quantity - item.quantity;
      if (delta > 0) {
        toast.success(`+${delta}`, { description: item.product.title });
      } else {
        toast.error(`${delta}`, { description: item.product.title });
      }
    }
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
