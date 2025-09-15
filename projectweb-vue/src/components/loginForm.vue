<template>
  <div class="d-flex justify-content-center row loginform">
    <div class="col-sm-6 mt-5">
      <form @submit.prevent="onSubmit">
        <div class="shadow p-5 pt-3 rounded-4">
          <h1>會員登入</h1>
          <br />
          <label class="form-label" for="email">帳號：</label>

          <input
            class="form-control"
            type="text"
            id="email"
            v-model="email"
            autocomplete="username"
            required
          />

          <br />
          <br />
          <label class="form-label" for="Password">密碼：</label>
          <input
            class="form-control"
            type="password"
            id="Password"
            v-model="password"
            autocomplete="current-password"
            required
          />
          <Router-Link to="/login/password"
            ><span class="float-end text-danger">忘記密碼?</span></Router-Link
          >
          <br />
          <br />
          <br />

          <div class="d-flex justify-content-between gap-3">
            <div>
              <RouterLink to="/login/createacc"
                ><button class="btn btn-primary">申請帳號</button></RouterLink
              >
            </div>
            <div>
              <button
                type="reset"
                class="btn btn-primary me-3"
                @click="clearForm"
              >
                清除
              </button>
              <button type="submit" class="btn btn-primary">提交</button>
            </div>
          </div>
        </div>
        <div v-if="errorMsg" class="alert alert-danger mt-3">
          {{ errorMsg }}
        </div>
      </form>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, RouterLink } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();
const userStore = useUserStore();

const onSubmit = async () => {
  errorMsg.value = "";
  const success = await userStore.login(email.value, password.value);
    if (success) {
    const role = userStore.userInfo?.role || "member";

    if (role === "storeowner") {
      router.push({ name: "admindashboard" }); // Redirect to admin dashboard
    } else {
      router.push({ name: "member" }); // Redirect to regular member page
    }
  } else {
    errorMsg.value = "登入失敗,請檢察帳號密碼";
  }


  const clearForm = () => {
    email.value = "";
    password.value = "";
    errorMsg.value = "";
  };
};
</script>

<style scoped>
.loginform {
  height: 600px;
}
</style>