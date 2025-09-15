import { defineStore } from "pinia";
import request from "@/api/request";
import { ref } from "vue";

export const useStoreOwnerStore = defineStore("storeOwner", () => {
  const products = ref([]);
  const orders = ref([]);

  const fetchProducts = async () => {
    const res = await request.get("/admin/products.php");
    if (res.data.success) {
      products.value = res.data.products ?? [];
    }
  };

  const addProduct = async (productData) => {
    const res = await request.post("/admin/add_product.php", productData);
    return res.data;
  };

  const updateProduct = async (productData) => {
    const res = await request.post("/admin/edit_product.php", productData);
    return res.data;
  };

  const deleteProduct = async (productId) => {
    const res = await request.post("/admin/delete_product.php", { id: productId });
    return res.data;
  };

  const fetchOrders = async () => {
    const res = await request.get("/admin/orders.php");
    if (res.data.success) {
      orders.value = res.data.orders ?? [];
    }
  };

  const confirmOrder = async (orderId) => {
    const res = await request.post("/admin/confirm_order.php", { id: orderId });
    return res.data;
  };

  const deleteOrder = async (orderId) => {
    const res = await request.post("/admin/delete_order.php", { id: orderId });
    return res.data;
  };

  return {
    products,
    orders,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchOrders,
    confirmOrder,
    deleteOrder,
  };
});
