<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 bg-light">
        <button class="btn btn-secondary">加入官方Linr@</button>
        <br />
        <br />
        <h4>聯絡信箱：yourquestionweanswer@hotmail.com</h4>
      </div>

      <div class="col-12 col-md-8 offset-md-2 mt-4">
        <!-- If submitted, show thank you -->
        <div
          v-if="submitted"
          class="col-md-8 offset-md-2 p-4 text-center bg-success text-white rounded"
        >
          <h4>感謝您的留言！</h4>
          <p>我們已經收到您的訊息，會盡快回覆您。</p>
          <button class="btn btn-light mt-3" @click="submitted = false">
            再次填寫
          </button>
        </div>

        <!-- Otherwise show form -->
        <div v-else class="col-md-8 offset-md-2">
          <form  @submit.prevent="submitForm">
            <label for="cname" class="form-label">姓名：</label>
            <input
              type="text"
              class="form-control"
              v-model="name"
              placeholder="您的大名"
              required
            />
            <div class="form-text">您所填的資料我們不會分享給其他人</div>
            <br />
  
            <label for="email" class="form-label">電子郵件信箱：</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="您的信箱地址"
              required
            />
            <br />
  
            <label for="number" class="form-label">連絡電話號碼：</label>
            <input
              type="number"
              class="form-control"
              v-model="phone"
              placeholder="您的電話號碼"
              required
            />
            <br />
  
            <label for="message" class="form-label">想留給我們的訊息：</label>
            <textarea
              rows="6"
              v-model="message"
              class="form-control"
              required
            ></textarea>
            <br />
  
            <button type="submit" class="btn btn-secondary text-white">
              傳送訊息
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMessageStore } from "@/stores/messageStore";

const name = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");
const submitted = ref(false);

const messageStore = useMessageStore();

const submitForm = async () => {
  await messageStore.sendMessage({
    name: name.value,
    email: email.value,
    phone: phone.value,
    message: message.value,
  });

  if (messageStore.success) {
    // clear form
    name.value = "";
    email.value = "";
    phone.value = "";
    message.value = "";
    // show thank you
    submitted.value = true;
  } else if (messageStore.error) {
    alert("傳送失敗：" + messageStore.error);
  }
};
</script>

<style></style>