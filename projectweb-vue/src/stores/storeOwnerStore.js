import { defineStore } from "pinia";
import request from "@/api/request";
import { ref } from "vue";

export const useStoreOwnerStore = defineStore("storeOwner", () => {
  const products = ref([]);
  const orders = ref([]);
  const baseURL=import.meta.env.VITE_API_BASE_URL;

  //change the image path
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
  const res = await request.get("/admin/products.php");
  if (res.data.success) {
      products.value = (res.data.products ?? []).map((product) => {
        // Correct the image URL based on the product's relative path
        const resolvedImageUrl = resolveImageUrl(product.image);
        return { ...product, image: resolvedImageUrl };
      });
      console.log("Fetched products:", products.value);
    }
  };

  const addProduct = async (productData, imageFile = null) => {
    console.log("🚀 addProduct called with:", productData, imageFile); // <-- Add this
  try {
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("sizes", JSON.stringify(productData.sizes));

    if (imageFile) {
      formData.append("image", imageFile);
    }
    console.log("📦 Sending FormData:", [...formData.entries()]); // <-- Log form contents
    const res = await request.post("/admin/add_product.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
     console.log("📨 Response from backend:", res); // <-- Check this in console

     if (res.data.success) {
      // Update the image URL based on the new upload path
      res.data.product.image = `${import.meta.env.VITE_BASE_URL}/products/small/${res.data.product.image}`;
    }

    return res.data;
  } catch (error) {
    console.error("🔥 API Error in addProduct:", error); 
    // Catch & log error
    return { success: false, message: "新增失敗，請檢查錯誤！" };
  }
};

  //fetch single product 
  const fetchProduct = async (productId) => {
  const res = await request.get(`/admin/product.php?id=${productId}`);
    if (res.data.success && res.data.product) {
      const product = res.data.product;
      product.image = resolveImageUrl(product.image); // 💡 resolve here
      return product;
    }
    return null;
  };


  const updateProduct = async (productId, productData, imageFile = null) => {
  try {
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("sizes", JSON.stringify(productData.sizes));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await request.post(`/admin/update_product.php?id=${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("更新商品失敗", error);
    return { success: false, message: "更新失敗，請檢查錯誤！" };
  }
};


  const deleteProduct = async (productId) => {
    const res = await request.post("/admin/delete_product.php", {
      id: productId,
    });
    return res.data;
  };

  const fetchOrders = async () => {
    const res = await request.get("/admin/orders.php");
    console.log("API response (storeowner):", res.data); // <-- Add this
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
    fetchProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchOrders,
    confirmOrder,
    deleteOrder,
  };
});