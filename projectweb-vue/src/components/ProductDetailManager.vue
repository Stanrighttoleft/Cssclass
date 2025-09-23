<template>
  <div class="container-fluid productdetail bg-light mt-5">
    <div class="row">
      <div class="col-md-6 col-xxl-4 offset-xxl-2">
        <div class="float-end mt-3">
          <label class="form-label">商品圖片</label>
          <input type="file" @change="onFileChange" class="form-control" />
          <img
            v-if="previewImage"
            :src="previewImage"
            class="mt-2"
            style="max-width: 200px"
          />
        </div>
      </div>
      <div class="col-md-6 col-xxl-4">
        <label class="form-label">商品標籤</label>
        <input type="text" v-model="product.title" class="form-control" />
        <label class="form-label">商品價格</label>
        <input type="number" v-model="product.price" class="form-control" />

        <h2>{{ product.price }}</h2>
        <hr />
        <h3>購買前須知</h3>
        <hr />
        <label class="form-label" for="itemSize">產品規格</label>
        <label class="form-label">可選尺寸（用逗號分隔）</label>
        <input type="text" v-model="sizeInput" class="form-control" />
        <br />
        <label for="orderQuantity form-label">訂購數量</label>

        <hr />

        <button class="btn btn-success mt-4" @click="updateProduct">
          更新商品資訊
        </button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="offset-xxl-3 col-xxl-6 col-12">
        <h1>產品描述</h1>
        <hr />
        <label class="form-label">商品描述</label>
        <textarea
          v-model="product.description"
          class="form-control"
          rows="5"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { useStoreOwnerStore } from "@/stores/storeOwnerStore";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch, watchEffect } from "vue";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";

//set up for the product from backend

const storeOwner = useStoreOwnerStore();
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
// const {fetchProducts}=productStore;
const { fetchProduct } = productStore;

const route = useRoute();
const productId = route.params.id;

// setup for the backend manager editable page
const previewImage = ref();
const selectedImageFile = ref(null);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedImageFile.value = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

//make the size input editable
const sizeInput = ref("");

watchEffect(() => {
  product.value.sizes = sizeInput.value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
});

onMounted(async () => {
  await fetchProduct(productId);
  sizeInput.value = product.value.sizes?.join(", ") || "";
});

//update the product

const updateProduct = async () => {
  try {
    const res = await storeOwner.updateProduct(
      productId,
      {
        title: product.value.title,
        price: product.value.price,
        description: product.value.description,
        sizes: product.value.sizes,
      },
      selectedImageFile.value
    );

    if (res.success) {
      alert("商品資訊已更新！");
    } else {
      console.error("更新失敗:", res.message);
      alert("更新失敗，請檢查資料！");
    }
  } catch (error) {
    console.error("更新錯誤:", error);
    alert("伺服器錯誤，請稍後再試！");
  }
};

onMounted(async () => {
  await fetchProduct(productId);
  previewImage.value = product.value.image;
  sizeInput.value = product.value.sizes?.join(",") || "";
  console.log("product in component:", product.value);
});
</script>

<style scoped>
.productdetail {
  height: 100vh;
  width: 100%;
  margin-top: 100px;
}
.productimage {
  max-width: 400px;
  height: auto;
}
</style>
