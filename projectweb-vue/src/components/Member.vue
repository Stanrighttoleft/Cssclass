<template>
  <div class="container mt-5">
    <div v-if="user">
      <h1>Welcome, {{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phone }}</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>

    <h2>我的訂單</h2>
    <div v-if="orders.length === 0">目前沒有訂單</div>
    <div v-for="order in orders" :key="order.id" class="card mb-3">
      <div class="card-body">
        <h5>訂單編號: {{ order.id }}</h5>
        <p>金額: ${{ order.final_price }}</p>
        <p>付款方式: {{ order.payment_method }}</p>
        <p>建立時間: {{ order.created_at }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useOrderStore } from "@/stores/orderStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const order = useOrderStore();
const { orders } = order;
const user = computed(() => userStore.userInfo);
const logout = async () => {
  await userStore.logout();
  router.push({ name: "login" });
};

//Watch for user info to be loaded

onMounted(() => {
  order.fetchOrders();
  console.log("order info:", order.value);
  console.log("User info on member page:", user.value);
});
</script>