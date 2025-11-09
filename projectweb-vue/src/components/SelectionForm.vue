<template>
  <div class="form">
    <label for="try" class="form-label">選擇商品</label>
    <div style="display: flex; gap: 10px; align-items: center">
      <select v-model="selectedValue" id="try" class="form-control" required>
        <option value="" selected disabled hidden>Choose one</option>
        <option :value="item.id" v-for="item in list" :key="item.id">
          {{ item.content }} - ${{ item.price }}
        </option>
      </select>

      <button type="button" @click="addItem">加入</button>
    </div>

    <hr />

    <h3>已選商品：</h3>
    <ul>
      <li v-for="(p, index) in showList" :key="p.id">
        {{ p.content }} — ${{ p.price }}
        <button type="button" @click="removeItem(index)">移除</button>
      </li>
    </ul>

    <p><strong>總價：</strong> ${{ totalPrice }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// 商品清單
const list = ref([
  { id: 1, content: "information", value: "information", price: 100 },
  { id: 2, content: "webdesign", value: "webdesign", price: 200 },
  { id: 3, content: "warehouse", value: "warehouse", price: 300 },
  { id: 4, content: "office", value: "office", price: 400 },
]);

// 使用者選擇的商品 ID
const selectedValue = ref("");

// 已加入的商品
const showList = ref([]);

// 總價
const totalPrice = ref(0);

// 點擊「加入」按鈕
function addItem() {
  const selected = list.value.find((item) => item.id === selectedValue.value);
  if (selected && !showList.value.find((p) => p.id === selected.id)) {
    showList.value.push(selected);
  }
}

// 移除項目
function removeItem(index) {
  showList.value.splice(index, 1);
}

// 🔍 使用 watch 監聽 showList 改變 → 更新總價
watch(
  showList,
  (newList) => {
    let total = 0;
    newList.forEach((item) => {
      total += item.price;
    });
    totalPrice.value = total;
  },
  { deep: true }
);
</script>
