// stores/userStore.js
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import request from "@/api/request";

export const useUserStore = defineStore("user", () => {
  const users = ref([]); // all users fetched from API/mock
  const userInfo = ref(null); // current logged-in user

  // Fetch users from API/mock
  const fetchUsers = async () => {
    try {
      const response = await request.get("/api/users");
      console.log("API response data:", response.data.data);
      users.value = response.data.data;
      console.log("Users assigned to store:", users.value);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  // Login simulation: pick user by id
  const login = (userId) => {
    const user = users.value.find((u) => u.id === userId);
    if (user) {
      userInfo.value = user;
    }
  };

  const logout = () => {
    userInfo.value = null;
  };

  return {
    users,
    fetchUsers,
    userInfo,
    login,
    logout,
  };
});
