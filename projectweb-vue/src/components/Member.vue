<template>
  <div v-if="user">
    <h1>Welcome, {{ user.name }}</h1>
    <p>Email: {{ user.email }}</p>
    <p>Phone: {{ user.phone }}</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <p>Loading user data...</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const user = computed(() => userStore.userInfo);

const logout = async () => {
  await userStore.logout();
  router.push({ name: "login" });
};

onMounted(() => {
  console.log("User info on member page:", user.value);
});
</script>