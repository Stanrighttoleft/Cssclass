import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useOrderStore = defineStore("order", () => {
  // Try to load saved order from localStorage
  const savedOrder = localStorage.getItem("currentOrder");
  const currentOrder = ref(savedOrder ? JSON.parse(savedOrder) : null);

  function createOrder(orderData) {
    currentOrder.value = { ...orderData, createdAt: new Date() };
  }

  function clearOrder() {
    currentOrder.value = null;
  }

  // Watch for changes and save to localStorage
  watch(
    currentOrder,
    (newOrder) => {
      if (newOrder) {
        localStorage.setItem("currentOrder", JSON.stringify(newOrder));
      } else {
        localStorage.removeItem("currentOrder");
      }
    },
    { deep: true }
  );

  return { currentOrder, createOrder, clearOrder };
});