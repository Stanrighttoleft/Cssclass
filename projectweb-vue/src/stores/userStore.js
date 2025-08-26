// stores/userStore.js
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import request from "@/api/request";

export const useUserStore = defineStore("user", () => {
  const users = ref([]); // all users fetched from API/mock
  const userInfo = ref(null); // current logged-in user

  const login = async (email, password) => {
    try {
      const res = await request.post("/api/login.php", { email, password });
      if (res.data.success) {
        userInfo.value = res.data.user;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name, email, password, phone, address) => {
    try {
      const res = await request.post("/api/register.php", {
        name,
        email,
        password,
        phone,
        address,
      });
      console.log("Register API response:", res);
      return res.data;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };
  const logout = async () => {
    await request.post("/api/logout.php");
    userInfo.value = null;
  };
  const fetchCurrentUser = async () => {
    try {
      const res = await request.get("/api/user.php");
      userInfo.value = res.data.user || null;
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      userInfo.value = null;
    }
  };

  // Fetch users from API/mock
  // const fetchUsers = async () => {
  //   try {
  //     const response = await request.get("/api/users");
  //     console.log("API response data:", response.data.data);
  //     users.value = response.data.data;
  //     console.log("Users assigned to store:", users.value);
  //   } catch (error) {
  //     console.error("Failed to fetch users", error);
  //   }
  // };

  return {
    userInfo,
    login,
    register,
    logout,
    fetchCurrentUser,
  };
});
