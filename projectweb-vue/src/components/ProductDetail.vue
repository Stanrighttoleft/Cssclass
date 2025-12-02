<template>
  <div class="container-fluid productdetail">
    <div class="row">
      <div class="col-md-6 col-xxl-4 offset-xxl-2">
        <div class="float-end">
          <img class="productimage float-end" :src="product.image" alt="" />
        </div>
        <div></div>
      </div>
      <div class="col-md-6 col-xxl-4">
        <h1>{{ product.title }}</h1>
        <h2>{{ product.price }}</h2>
        <hr />
        <h3>購買前須知</h3>
        <hr />
        <label class="form-label" for="itemSize">產品規格</label>
        <select
          class="form-control"
          name="itemSize"
          v-model="selectedSize"
          :disabled="!product.sizes || product.sizes.length === 0"
        >
          <option
            v-if="!product.sizes || product.sizes.length === 0"
            value="singleSize"
          >
            單一尺寸
          </option>

          <option v-for="size in product.sizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        <br />
        <label for="orderQuantity form-label">訂購數量</label>
        <select
          class="form-control"
          name="orderQuantity"
          v-model="cartQuantity"
          id=""
        >
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
        </select>
        <hr />
        <button class="btn btn-warning me-2" @click="addCart">
          加入購物車
        </button>
        <button class="btn btn-warning">立即購買</button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="offset-xxl-3 col-xxl-6 col-12">
        <h1>產品描述</h1>
        <hr />
        <div v-if="product.description" v-html="product.description"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";

//set up for the product from backend

const productStore = useProductStore();
const { product } = storeToRefs(productStore);
// const {fetchProducts}=productStore;
const { fetchProduct } = productStore;

const route = useRoute();
const productId = route.params.id;

// set up for the product sizes

//set up the cart
const cart = useCartStore();
const cartQuantity = ref(1);
const selectedSize = ref("singleSize");

const addCart = () => {
  cart.addToCart(
    {
      ...product.value,
      size: selectedSize.value,
    },
    cartQuantity.value
  );
  alert(`已加入購物車!加入${cartQuantity.value}件!`);
};

onMounted(async () => {
  await fetchProduct(productId);
  console.log("product in component:", product.value);
});
watch(product, (newVal) => {
  if (!newVal.sizes || newVal.sizes.length === 0) {
    selectedSize.value = "singleSize";
  } else {
    selectedSize.value = newVal.sizes[0];
  }
  console.log("products updated", newVal);
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
