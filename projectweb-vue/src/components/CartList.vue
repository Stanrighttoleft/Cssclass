<template>
  <div class="container mt-5">
    <div v-if="cart.items.length === 0" class="alert alert-info">
      購物車是空的,快去選購商品吧!
    </div>
    <div v-else class="row">
      <div class="col-12 col-xxl-8 offset-xxl-2">
        <h1 class="mb-4">我的購物車</h1>
        <div
          v-for="item in cart.items"
          :key="item.id + '-' + (item.size || '')"
          class="card mb-3"
        >
          <div class="row g-0 align-items-center">
            <div class="col-md-2 text-center">
              <img
                :src="item.image"
                class="img-fluid rounded"
                alt="product pic"
                style="max-height: 200px"
              />
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="cart-title">{{ item.title }}</h5>
                <p class="card-text mb-1">品牌:{{ item.brand }}</p>
                <p class="card-text mb-1">尺寸:{{ item.size }}</p>
                <p class="card-text fw-bold text-danger">${{ item.price }}</p>
              </div>
            </div>

            <!-- quantity and actions -->
            <div class="col-md-4 d-flex flex-column align-items-center">
              <div class="d-flex align-items-center mb-2">
                <button
                  class="btn btn-outline-sceondary btn-sm me-2"
                  @click="cart.decreaseQuantity(item.id)"
                >
                  -
                </button>
                <input
                  type="number"
                  v-model.number="item.cartQuantity"
                  min="1"
                  class="form-control text-center"
                  style="width: 60px"
                  @change="onQuantityChange(item)"
                />
                <button
                  class="btn btn-outline-sceondary btn-sm ms-2"
                  @click="cart.addToCart(item)"
                >
                  +
                </button>
              </div>
              <button
                class="btn btn-danger btn-sm"
                @click="cart.removeFromCart(item.id)"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
        <!-- Delivery way -->
        <div class="mt-4">
          <h2 class="bg-light">運送方式</h2>
          <select
            name="deliveryway"
            v-model="cart.selectedShipping"
            class="form-select"
            id=""
          >
            <option value="seven">7-Eleven取貨,運費+60元</option>
            <option value="family">全家取貨,運費+70元</option>
            <option value="hilife">萊爾富取貨,運費+70元</option>
            <option value="postoffice">郵遞掛號,運費+70元</option>
          </select>
          <br />
          <h3 class="mt-2 bg-light">商品滿2000免運費</h3>
          <h3 class="bg-light">離島不寄送，敬請見諒。</h3>
        </div>

        <!-- cart summary -->
        <div class="text-end mt-4">
          <h5>總數量:{{ cart.totalQuantity }}</h5>
          <h4 class="text-danger">總金額:${{ cart.totalPrice }}</h4>
          <h4>運費：${{ cart.shippingCost }}</h4>
          <h4 class="text-danger">應付總金額：${{ cart.finalPrice }}</h4>
          <button class="btn btn-outline-danger mt-2" @click="cart.clearCart">
            清空購物車
          </button>
          <RouterLink to="/order">
            <button
              class="btn btn-secondary text-white mt-2 ms-2"
              @click="placeOrder"
            >
              我要下單
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { useRouter, RouterLink } from "vue-router";
import { ref, computed } from "vue";

const cart = useCartStore();
const order = useOrderStore();
const router = useRouter();

function placeOrder() {
  if (cart.items.length === 0) return alert("購物車是空的!");

  router.push("/order");
}

//when user types a number manually in input
function onQuantityChange(item) {
  if (item.cartQuantity <= 0) {
    cart.removeFromCart(item.id);
  } else {
    cart.saveToLocalStorage?.();
  }
}
</script>

<style>
.card-title {
  font-size: 1.2rem;
}
</style>

<template>
  <div class="container mt-5">
    <div v-if="cart.items.length === 0" class="alert alert-info">
      購物車是空的,快去選購商品吧!
    </div>
    <div v-else class="row">
      <div class="col-12 col-xxl-8 offset-xxl-2">
        <h1 class="mb-4">我的購物車</h1>
        <div
          v-for="item in cart.items"
          :key="item.id + '-' + (item.size || '')"
          class="card mb-3"
        >
          <div class="row g-0 align-items-center">
            <div class="col-md-2 text-center">
              <img
                :src="item.image"
                class="img-fluid rounded"
                alt="product pic"
                style="max-height: 200px"
              />
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="cart-title">{{ item.title }}</h5>
                <p class="card-text mb-1">品牌:{{ item.brand }}</p>
                <p class="card-text mb-1">尺寸:{{ item.size }}</p>
                <p class="card-text fw-bold text-danger">${{ item.price }}</p>
              </div>
            </div>

            <!-- quantity and actions -->
            <div class="col-md-4 d-flex flex-column align-items-center">
              <div class="d-flex align-items-center mb-2">
                <button
                  class="btn btn-outline-sceondary btn-sm me-2"
                  @click="cart.decreaseQuantity(item.id)"
                >
                  -
                </button>
                <input
                  type="number"
                  v-model.number="item.cartQuantity"
                  min="1"
                  class="form-control text-center"
                  style="width: 60px"
                  @change="onQuantityChange(item)"
                />
                <button
                  class="btn btn-outline-sceondary btn-sm ms-2"
                  @click="cart.addToCart(item)"
                >
                  +
                </button>
              </div>
              <button
                class="btn btn-danger btn-sm"
                @click="cart.removeFromCart(item.id)"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
        <!-- Delivery way -->
        <div class="mt-4">
          <h2 class="bg-light">運送方式</h2>
          <select
            name="deliveryway"
            v-model="cart.selectedShipping"
            class="form-select"
            id=""
          >
            <option value="seven">7-Eleven取貨,運費+60元</option>
            <option value="family">全家取貨,運費+70元</option>
            <option value="hilife">萊爾富取貨,運費+70元</option>
            <option value="postoffice">郵遞掛號,運費+70元</option>
          </select>
          <br />
          <h3 class="mt-2 bg-light">商品滿2000免運費</h3>
          <h3 class="bg-light">離島不寄送，敬請見諒。</h3>
        </div>

        <!-- cart summary -->
        <div class="text-end mt-4">
          <h5>總數量:{{ cart.totalQuantity }}</h5>
          <h4 class="text-danger">總金額:${{ cart.totalPrice }}</h4>
          <h4>運費：${{ cart.shippingCost }}</h4>
          <h4 class="text-danger">應付總金額：${{ cart.finalPrice }}</h4>
          <button class="btn btn-outline-danger mt-2" @click="cart.clearCart">
            清空購物車
          </button>
          <RouterLink to="/order">
            <button
              class="btn btn-secondary text-white mt-2 ms-2"
              @click="placeOrder"
            >
              我要下單
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { useRouter, RouterLink } from "vue-router";
import { ref, computed } from "vue";

const cart = useCartStore();
const order = useOrderStore();
const router = useRouter();

function placeOrder() {
  if (cart.items.length === 0) return alert("購物車是空的!");

  router.push("/order");
}

//when user types a number manually in input
function onQuantityChange(item) {
  if (item.cartQuantity <= 0) {
    cart.removeFromCart(item.id);
  } else {
    cart.saveToLocalStorage?.();
  }
}
</script>

<style>
.card-title {
  font-size: 1.2rem;
}
</style>
