<template>
  <div class="container py-5 text-center thankyou">
    <div class="card shadow p-4">
      <h1 class="text-success mb-3">✅ 訂單成立成功！</h1>
      <p class="lead">感謝您的購買，我們已經收到您的訂單。</p>

      <div v-if="order">
        <h3 class="mt-4">訂單編號：{{ order.id }}</h3>
        <p>姓名：{{ order.customerName }}</p>
        <p>總金額：${{ order.finalPrice }}</p>
      </div>

      <router-link to="/" class="btn btn-primary mt-4"> 返回首頁 </router-link>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();
const order = orderStore.currentOrder;
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: auto;
  border-radius: 12px;
}
.thankyou {
  margin: 100px;
  height: 100vh;
}
</style>