<template>
  <nav class="navbar fixed-top navbar-expand-lg manager-nav bg-white">
    <div class="container-fluid bg-white">
      <RouterLink class="navbar-brand" to="/admin">後臺管理</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon bg-white"></span>
      </button>
      <div
        class="collapse navbar-collapse bg-white"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item me-5">
            <RouterLink class="nav-link" aria-current="page" to="/"
              >首頁</RouterLink
            >
          </li>
          <li class="nav-item dropdown me-2">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              商品管理
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/admin/productsmanager"
                  >編輯商品</RouterLink
                >
              </li>

              <li><hr class="dropdown-divider" /></li>
              <li>
                <RouterLink class="dropdown-item" to="#">新增商品</RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              訂單管理
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">編輯訂單</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" role="search" @submit="onSearch">
          <input
            v-model="searchTerm"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const searchTerm = ref("");

function onSearch(e) {
  e.preventDefault();
  if (searchTerm.value.trim()) {
    router.push({
      path: "/admin/productsmanager",
      query: { keyword: searchTerm.value.trim() },
    });
  }
}
</script>

<style></style>
