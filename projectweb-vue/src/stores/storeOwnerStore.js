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
      console.log(products.value);
    }
  };

  const fetchProduct=async(productId)=>{
    try{
      const res=await request.get(`/admin/product.php?id=${productId}`);
      console.log("fetchProduct response:", res.data);
      if(res.data.code===200){
        return res.data.data;
      }else{
        console.error("Fetch single product failed:",res.data.message);
        return null;
      }
    }catch(err){
      console.error("Fetch single product error:",err);
    }
  }

  const addProduct = async (productData, imageFile = null) => {
    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("sizes", JSON.stringify(productData.sizes));

      if (imageFile) {
        formData.append("image", imageFile);
      }
      // 🔍 Debug logs:
      console.log("🟢 Preparing to send addProduct request...");
      console.log("👉 Base URL:", request.defaults.baseURL);
      console.log("👉 Endpoint:", "/admin/add_product.php");
      console.log("👉 Full URL:", `${request.defaults.baseURL}/admin/add_product.php`);

      for (const pair of formData.entries()) {
      console.log("📦 FormData field:", pair[0], "→", pair[1]);
      }

      const res = await request.post("/admin/add_product.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Server response:", res);

      return res.data;
    } catch (error) {

      console.error("新增商品失敗", error);
      if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      console.error("Response headers:", error.response.headers);
      }
      return { success: false, message: "新增失敗，請檢查錯誤！" };
    }
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

      const res = await request.post(
        `/admin/update_product.php?id=${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
    try {
      const res = await request.get("/admin/orders.php");
      console.log("API response (storeowner):", res.data);

      if (res.data.success) {
        orders.value = res.data.orders ?? [];
      } else {
        console.error("Failed:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const confirmOrder = async (orderId) => {
    try {
      const res = await request.post("/admin/confirm_order.php", {
        id: orderId,
      });
      return res.data;
    } catch (err) {
      console.error("Confirm order error:", err);
      return { success: false };
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const res = await request.post("/admin/delete_order.php", {
        id: orderId,
      });
      return res.data;
    } catch (err) {
      console.error("Delete order error:", err);
      return { success: false };
    }
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
