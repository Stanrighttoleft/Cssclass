import { defineStore } from "pinia";
import { ref } from "vue";
import request from "@/api/request";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const product = ref(null);
  const baseURL=import.meta.env.VITE_API_BASE_URL;
  const basefrontURL = import.meta.env.VITE_BASE_URL;  // changed to VITE_BASE_URL for consistency

  const resolveImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;         // Full URL already
    if (path.startsWith("/")) {
      // Path already has leading slash
      return `${import.meta.env.VITE_BASE_URL}${path}`;
    }
    // Otherwise, assume it's a filename and build full path
    return `${import.meta.env.VITE_BASE_URL}/${path}`;
  };

  const fetchProducts = async () => {
    try {
      // const response = await request.get("api/products");
      const response = await request.get("/products.php");

      // products.value = response.data.data.nutrition;
      products.value = (response.data.data ?? []).map(product => ({
      ...product,
    image: resolveImageUrl(product.image),
    }));

      console.log("Products assigned to store:", products.value);
      
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const fetchProduct = async (id) => {
    try {
      // const response = await request.get(`api/products/${id}`);
      const response = await request.get(`/product.php?id=${id}`);
       const data = response.data.data;
        product.value = {
          ...data,
          image: resolveImageUrl(data.image),
        };
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