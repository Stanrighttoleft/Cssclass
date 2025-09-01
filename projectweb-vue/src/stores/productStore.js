import { defineStore } from "pinia";
import { ref } from "vue";
import request from "@/api/request";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const product = ref([]);
  const fetchProducts = async () => {
    try {
      // const response = await request.get("api/products");
      const response = await request.get("/products.php");

      // products.value = response.data.data.nutrition;
      products.value = response.data.data;

      console.log("Products assigned to store:", products.value);
      
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const fetchProduct = async (id) => {
    try {
      // const response = await request.get(`api/products/${id}`);
      const response = await request.get(`/product.php?id=${id}`);
      product.value = response.data.data;
      console.log("product assigned to store:", product.value);
    } catch (error) {
      console.error("failed to fetch products:");
    }
  };
  return {
    products,
    product,
    fetchProducts,
    fetchProduct,
  };
});