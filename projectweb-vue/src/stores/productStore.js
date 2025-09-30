import { defineStore } from "pinia";
import { ref } from "vue";
import request from "@/api/request";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const product = ref([]);
  const baseURL=import.meta.env.VITE_API_BASE_URL;

  const resolveImageUrl=(path)=>{
    if(!path) return "";
    if(path.startsWith("http")) return path;
    return `${baseURL}/${path}`.replace(/([^:]\/)\/+/g, "$1"); // clean double slashes
  }

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