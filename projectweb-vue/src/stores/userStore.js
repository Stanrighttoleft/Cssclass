import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import request from '@/api/request'

export const useUserStore = defineStore('user', () => {
  const users=ref([])
  const fetchUsers= async () =>{
    try{
      const response =await request.get('/api/users')
      users.value=response.data
    }catch(error){
      console.error('failed to fetch users',error)
    }
    return{
      users,
      fetchUsers,
    }
  }

  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
