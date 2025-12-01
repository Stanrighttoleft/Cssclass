<template>
  <div class="container mt-5">
    <div v-if="user">
      <table class="table table-striped">
        <h2 class="mt-2">會員專區：</h2>
        <br />
        <tbody>
          <tr>
            <td scope="col">歡迎回來</td>
            <td scope="col">{{ user.name }}</td>
          </tr>
          <tr>
            <td scope="col">會員信箱</td>
            <td scope="col">{{ user.email }}</td>
          </tr>
          <tr>
            <td scope="col">會員電話</td>
            <td scope="col">{{ user.phone }}</td>
          </tr>
          <tr>
            <td scope="col">登出會員</td>
            <td scope="col"><button @click="logout">Logout</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>

    <h2 class="mb-3">會員訂單</h2>
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
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const router = useRouter();

const order = useOrderStore();
const { orders } = storeToRefs(order);
const user = computed(() => userStore.userInfo);
const logout = async () => {
  await userStore.logout();
  router.push({ name: "login" });
};

//Watch for user info to be loaded

onMounted(async () => {
  await userStore.fetchCurrentUser();
});

watch(user, async (newUser) => {
  if (newUser) {
    await order.fetchOrders();
  }
});
</script>
