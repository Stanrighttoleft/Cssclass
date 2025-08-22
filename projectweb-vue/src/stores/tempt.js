import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [], // { id, title, price, quantity, image, brand }
  }),
  getters: {
    // Total price of all cart items
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    // Total count of all items in the cart
    totalQuantity: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
  },
  actions: {
    // Add a product to the cart, or increase quantity if it exists
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },

    // Remove a product completely from the cart by id
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
    },

    // Decrease quantity by 1, or remove if quantity goes to 0
    decreaseQuantity(productId) {
      const existingItem = this.items.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          this.removeFromCart(productId);
        }
      }
    },

    // Clear the entire cart
    clearCart() {
      this.items = [];
    },
  },
});
