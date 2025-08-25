<template>
    <div class="container-fluid createaccpage">
    <div class="row justify-content-center  mt-5">
        <div class="col-md-8 col-xxl-8 offset-xxl-2 flex-column ">
            <form @submit.prevent="onSubmit" class="shadow p-5 pt-3 rounded-4">
                <h1>註冊帳號</h1>
                
                <label class="form-label mt-3" for="name">名字：</label>
                <input class="form-control" type="text" v-model="name">
                <br>
                <label class="form-label" for="email">電子郵件：(設為登入帳號)</label>
                <input class="form-control" type="text" v-model="email">
                <br>
                <label class="form-label" for="password">密碼：</label>
                <input class="form-control" type="password" v-model="password">
                <br>
                <label class="form-label" for="name">密碼確認：(請重複輸入密碼)</label>
                <input class="form-control" type="password" v-model="confirmPassword">
                <br>
                <label class="form-label">連絡電話：</label>
                <input type="text" class="form-control" v-model="phone"/>
                <br>
                <label class="form-label">地址：</label>
                <input type="text" class="form-control" v-model="address">
                <br>
                <br>
                <div class="float-end"><button type="submit" class="btn btn-primary me-3 ">提交</button></div>
            </form>
        </div>
        <div v-if="errorMsg" class="alert alert-danger mt-2">{{ errorMsg }}</div>
        <div v-if="successMsg" class="alert alert-success mt-2">{{ successMsg }}</div>

    </div>

    </div>

</template>

<script setup>
import {ref} from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const name=ref('');
const email=ref('');
const password=ref('');
const confirmPassword=ref('');
const phone=ref('');
const address=ref('');
const errorMsg=ref('');
const successMsg=ref('');
const router=useRouter();
const userStore=useUserStore();

const onSubmit=async()=>{
    if(password.value !==confirmPassword.value){
        errorMsg.value='密碼與確認密碼不一致';
        return;
    }
    const result= await userStore.register(
        name.value,
        email.value,
        password.value,
        phone.value,
        address.value,
    );
    if(result.success){
        successMsg.value='註冊成功，請登入';
        setTimeout(()=>router.push('/login'),2000);
    }else{
        errorMsg.value=result.message || '註冊失敗';
    }
};



</script>

<style scoped>
.createaccpage{
    height: 100vh;
    

}

</style>