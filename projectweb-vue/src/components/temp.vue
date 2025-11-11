<template>
  <div>
    <button @click="list.push(list.length + 1)">追加</button>
    <ul ref="ullist">
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

const list = ref([]);
const ullist = ref(null);
watch(
  list,
  async () => {
    console.log("一般", ullist.value?.offsetHeight);
    await nextTick();
    console.log("nextTick", ullist.value?.offsetHeight);
  },
  { deep: true }
);
</script>

<style></style>
