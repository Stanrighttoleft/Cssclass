import { defineStore } from "pinia";
import { ref } from "vue";
import request from "@/api/request";

export const useOrderStore = defineStore("order", () => {
  const currentOrder = ref(null);
  const orders = ref([]);

  async function createOrder(orderData) {
    try {
      const res = await request.post("/order.php", orderData);

      if (res.data.code === 200) {
        currentOrder.value = res.data.order;
        return true;
      } else {
        alert(res.data.message || "下單失敗");
        return false;
      }
    } catch (err) {
      console.error("Create order error:", err);
      alert("伺服器錯誤，請稍後再試");
      return false;
    }
  }

  async function fetchOrders() {
    try {
      const res = await request.get("/orders.php");
      if (res.data.code === 200) {
        orders.value = res.data.orders;
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  }

  return {
    currentOrder,
    orders,
    createOrder,
    fetchOrders,
  };
});