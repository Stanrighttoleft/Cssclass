
<template>
  <div class="container-fluid mt-5 orderpage">
    <div class="row">
      <div class="col-12 col-md-6 col-xxl-4 offset-xxl-2">
        <h1>訂單確認 & 收件資訊</h1>

        <form @submit.prevent="submitOrder">
          <!-- Customer Info -->
          <div class="mb-3">
            <label>姓名</label>
            <input
              type="text"
              v-model="form.customerName"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label>Email</label>
            <input
              type="email"
              v-model="form.email"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label>電話</label>
            <input
              type="tel"
              v-model="form.phone"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label>地址</label>
            <textarea
              v-model="form.address"
              class="form-control"
              maxlength="200"
              placeholder="請輸入收件地址"
              required
            ></textarea>
          </div>

          <div class="mb-3">
            <label>付款方式</label>
            <select v-model="form.paymentMethod" class="form-select" required>
              <option value="credit">信用卡</option>
              <option value="atm">ATM 轉帳</option>
              <option value="cod">貨到付款</option>
            </select>
          </div>
          <p>運送方式：{{ shippingway }}</p>

          <p>運費: {{ cart.shippingCost }}</p>
          <p>總金額: {{ cart.finalPrice }}</p>

          <button type="submit" class="btn btn-success">確認送出</button>
        </form>
      </div>
      <!-- Cart Summary -->
      <div class="col-6 col-xxl-4">
        <h1>訂購資訊</h1>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
import { useOrderStore } from "@/stores/orderStore";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const order = useOrderStore();
const cart = useCartStore();
const user = useUserStore();
const userInformation = storeToRefs(user);
const router = useRouter();

const form = reactive({
  customerName: "",
  email: "",
  phone: "",
  address: "",
  paymentMethod: "credit",
});

const shippingway = computed(() => {
  switch (cart.selectedShipping) {
    case "family":
      return "全家便利商店取貨";
      break;
    case "seven":
      return "Seven-Eleven便利商店取貨";
      break;
    case "hilife":
      return "萊爾富便利商店取貨";
      break;
    case "postoffice":
      break;
    default:
      return "全家便利商店取貨";
      break;
  }
});

onMounted(async () => {
  await user.fetchCurrentUser();

  // Pre-fill from logged-in user
  if (userInformation.userInfo?.value) {
    const { name, email, phone, address } = userInformation.userInfo.value;
    form.customerName = name || "";
    form.email = email || "";
    form.phone = phone || "";
    form.address = address || "";
  }
});

async function submitOrder() {
  if (cart.items.length === 0) {
    return alert("購物車是空的！");
  }

  const success = await order.createOrder({
    items: cart.items,
    shipping: cart.selectedShipping,
    shippingCost: cart.shippingCost,
    finalPrice: cart.finalPrice,
    ...form,
  });

  if (success) {
    cart.clearCart();
    router.push("/thank-you");
    console.log("送出訂單:", order.currentOrder);
  }
}
</script>

<style>
.orderpage {
  height: 100vh;
}
</style>
