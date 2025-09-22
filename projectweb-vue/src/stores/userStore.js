// stores/userStore.js
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import request from "@/api/request";

export const useUserStore = defineStore("user", () => {
  const storedUser = localStorage.getItem("userInfo"); // all users fetched from API/mock
  const userInfo = ref(storedUser ? JSON.parse(storedUser) : null); // current logged-in user

  //call the restoreUser to keep the user information

  const userRole = computed(() => userInfo.value?.role ?? "member");

  //set user for keep the user information
  const setUser = (user, role) => {
    userInfo.value = { ...user, role };
    localStorage.setItem("userInfo", JSON.stringify({ ...user, role }));
  };

  const login = async (email, password) => {
    try {
      // const res = await request.post("/api/login.php", { email, password });
      const res = await request.post("/login.php", { email, password });
      if (res.data.success) {
        userInfo.value = res.data.user;
        //save to localhost
        setUser(res.data.user, res.data.user.role);
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
      // const res = await request.post("/api/register.php", {
      const res = await request.post("/register.php", {
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
    // await request.post("/api/logout.php");
    await request.post("/logout.php");
    userInfo.value = null;
    //remove from localstorage
    localStorage.removeItem("userInfo");
  };
  //fetch current user from server
  const fetchCurrentUser = async () => {
    try {
      const res = await request.get("/user.php", { withCredentials: true });

      if (res.data && res.data.user) {
        setUser(res.data.user, res.data.user.role);
      } else {
        // ⚠️ Don't auto-remove login if backend returns null
        console.warn("Server did not return a user, keeping local data");
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      // ⚠️ Don't clear userInfo here
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
    userRole,
    login,
    register,
    logout,
    fetchCurrentUser,
  };
});