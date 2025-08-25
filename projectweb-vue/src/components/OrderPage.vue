<template>
  <div class="container-fluid mt-5 orderpage">
    <div class="row">
      <div class="col-12 col-xxl-8 offset-xxl-2">
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

          <!-- Cart Summary -->
          <h3>購買商品</h3>
          <ul>
            <li v-for="item in cart.items" :key="item.id">
              {{ item.title }} x {{ item.cartQuantity }} (${{
                item.price * item.cartQuantity
              }})
            </li>
          </ul>
          <p>運費: {{ cart.shippingCost }}</p>
          <p>總金額: {{ cart.finalPrice }}</p>

          <button type="submit" class="btn btn-success">確認送出</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useOrderStore } from "@/stores/orderStore";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const order = useOrderStore();
const cart = useCartStore();
const user = useUserStore();
const router = useRouter();

const form = reactive({
  customerName: "",
  email: "",
  phone: "",
  address: "",
  paymentMethod: "credit",
});

onMounted(async () => {
  await user.fetchUsers();

  // Pre-fill from logged-in user
  if (user.userInfo) {
    form.customerName = user.userInfo.name;
    form.email = user.userInfo.email;
    form.phone = user.userInfo.phone;
    form.address = user.userInfo.address;
  }

  // Pre-fill from previous order in localStorage
  if (order.currentOrder) {
    form.customerName = form.customerName || order.currentOrder.customerName;
    form.email = form.email || order.currentOrder.email;
    form.phone = form.phone || order.currentOrder.phone;
    form.address = form.address || order.currentOrder.address;
    form.paymentMethod = form.paymentMethod || order.currentOrder.paymentMethod;
  }
});

function submitOrder() {
  if (cart.items.length === 0) {
    return alert("購物車是空的！");
  }

  order.createOrder({
    items: cart.items,
    shipping: cart.selectedShipping,
    shippingCost: cart.shippingCost,
    finalPrice: cart.finalPrice,
    ...form,
  });

  console.log("送出訂單:", order.currentOrder);

  cart.clearCart();
  router.push("/thank-you");
}
</script>

<style>
.orderpage {
  height: 100vh;
}
</style>