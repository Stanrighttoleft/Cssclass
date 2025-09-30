import { defineStore } from "pinia";
import request from "@/api/request";
import { ref } from "vue";

export const useStoreOwnerStore = defineStore("storeOwner", () => {
  const products = ref([]);
  const orders = ref([]);
  const baseURL=import.meta.env.VITE_API_BASE_URL;

  //change the image path
  const resolveImageUrl=(path)=>{
    if(!path) return "";
    if(path.startsWith("http")) return path;
    return `${baseURL}/${path}`.replace(/\+/,'/'); //clean double slashes
  }


  const fetchProducts = async () => {
    const res = await request.get("/admin/products.php");
    if (res.data.success) {
      products.value = (res.data.products ?? []).map(product=>({...product, 
        image:resolveImageUrl(product.image),
      }));
      console.log("Fetched products:",products.value);
    }
  };

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

    const res = await request.post("/admin/add_product.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("新增商品失敗", error);
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
    addProduct,
    updateProduct,
    deleteProduct,
    fetchOrders,
    confirmOrder,
    deleteOrder,
  };
});