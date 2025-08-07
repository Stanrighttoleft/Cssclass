<template>
    <div>
        <h2>Users</h2>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }} ({{user.age  }})

            </li>
        </ul>
    </div>
  
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const { users, fetchUsers } = useUserStore()

onMounted(() => {
  fetchUsers()
})


</script>

<style>

</style>