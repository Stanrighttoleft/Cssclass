<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-xxl-8 offset-xxl-2 bg-light">
        <button class="btn btn-secondary">加入官方Linr@</button>
        <br />
        <br />
        <h4>聯絡信箱：yourquestionweanswer@hotmail.com</h4>
      </div>
      <div class="col-12 col-xxl-8 offset-xxl-2 mt-4">
        <form action="">
          <label for="cname" class="form-label">姓名：</label>
          <input
            type="text"
            class="form-control"
            name="cname"
            placeholder="您的大名"
            required
          />
          <div class="form-text">您所填的資料我們不會分享給其他人</div>
          <br />
          <label for="email" class="form-label">電子郵件信箱：</label>
          <input
            type="email"
            class="form-control"
            name="email"
            placeholder="您的信箱地址"
            required
          />
          <br />
          <label for="number" class="form-label">連絡電話號碼：</label>
          <input
            type="number"
            class="form-control"
            name="phone"
            placeholder="您的電話號碼"
            required
          />
          <br />
          <label for="message" class="fomr-label">想留給我們的訊息：</label>
          <textarea
            type="text"
            rows="6"
            name="message"
            class="form-control"
            required
          ></textarea>
          <br />
          <button class="btn btn-secondary text-white">傳送訊息</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>