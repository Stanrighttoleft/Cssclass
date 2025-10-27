<template>
  <div class="container py-4">
    <h1 class="h4 fw-bold mb-4">訂單管理</h1>

    <!-- Loading indicator -->
    <div v-if="loading" class="text-muted">載入中...</div>

    <!-- No orders -->
    <div v-else-if="orders.length === 0" class="text-muted">尚無訂單。</div>

    <!-- Orders table -->
    <div v-else class="table-responsive">
      <table class="table table-bordered align-middle shadow-sm bg-white">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">客戶名稱</th>
            <th scope="col">總金額</th>
            <th scope="col">狀態</th>
            <th scope="col">建立時間</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
            <td>{{ index + 1 }}</td>
            <td>{{ order.customer_name || "未提供" }}</td>
            <td>{{ order.final_price }} 元</td>
            <td>
              <span
                :class="{
                  'badge bg-secondary': !order.status,
                  'badge bg-success': order.status === '已確認',
                  'badge bg-warning text-dark': order.status === '待處理',
                }"
              >
                {{ order.status || "待處理" }}
              </span>
            </td>
            <td>{{ formatDate(order.created_at) }}</td>
            <td>
              <button
                @click="confirm(order.id)"
                class="btn btn-success btn-sm me-2"
              >
                確認
              </button>
              <button @click="remove(order.id)" class="btn btn-danger btn-sm">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreOwnerStore } from "@/stores/storeOwnerStore";

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
