<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">訂單管理</h1>

    <!-- Loading indicator -->
    <div v-if="loading" class="text-gray-500">載入中...</div>

    <!-- No orders -->
    <div v-else-if="orders.length === 0" class="text-gray-500">尚無訂單。</div>

    <!-- Orders table -->
    <table
      v-else
      class="min-w-full border border-gray-300 bg-white rounded-lg shadow-sm"
    >
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-4 py-2 text-left">#</th>
          <th class="border px-4 py-2 text-left">客戶名稱</th>
          <th class="border px-4 py-2 text-left">總金額</th>
          <th class="border px-4 py-2 text-left">狀態</th>
          <th class="border px-4 py-2 text-left">建立時間</th>
          <th class="border px-4 py-2 text-left">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in orders"
          :key="order.id"
          class="hover:bg-gray-50 transition"
        >
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">
            {{ order.customer_name || "未提供" }}
          </td>
          <td class="border px-4 py-2">{{ order.final_price }} 元</td>
          <td class="border px-4 py-2">{{ order.status || "待處理" }}</td>
          <td class="border px-4 py-2">
            {{ formatDate(order.created_at) }}
          </td>
          <td class="border px-4 py-2 space-x-2">
            <button
              @click="confirm(order.id)"
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              確認
            </button>
            <button
              @click="remove(order.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreOwnerStore } from "@/stores/storeownerstore";

const storeOwner = useStoreOwnerStore();
const { orders } = storeToRefs(storeOwner);
const { fetchOrders, confirmOrder, deleteOrder } = storeOwner;
const loading = ref(true);

// load orders on mount
onMounted(async () => {
  await fetchOrders();
  console.log("Fetched orders:", orders.value);
  loading.value = false;
});

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("zh-TW");
};

// confirm an order
const confirm = async (id) => {
  if (confirm("確定要確認這筆訂單嗎？")) {
    const res = await confirmOrder(id);
    if (res.success) {
      alert("訂單已確認");
      await fetchOrders();
    } else {
      alert("確認失敗：" + res.message);
    }
  }
};

// delete an order
const remove = async (id) => {
  if (confirm("確定要刪除這筆訂單嗎？")) {
    const res = await deleteOrder(id);
    if (res.success) {
      alert("訂單已刪除");
      await fetchOrders();
    } else {
      alert("刪除失敗：" + res.message);
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
