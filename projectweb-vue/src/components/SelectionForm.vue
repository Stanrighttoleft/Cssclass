<template>
  <form action="" class="form">
    <label for="" class="form-label">選擇列表</label>
    <select name="try" id="try" class="form-control" required>
      <option value="" selected disabled hidden>Choose one</option>
      <option value="itme.value" v-for="item in list" :key="item.id">
        {{ item.content }}
      </option>
    </select>
  </form>
</template>

<script setup>
import { ref } from "vue";

const list = [
  { id: 1, content: "information", value: " information" },
  { id: 2, content: "webdesign", value: "webdesign" },
  { id: 3, content: "warehouse", value: "warehouse" },
  { id: 4, content: "office", value: "office " },
];
</script>

<style></style>
