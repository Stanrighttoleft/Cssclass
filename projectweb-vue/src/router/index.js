import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemoView from '@/views/MemoView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ContactView from '@/views/ContactView.vue'
import login from '@/views/LoginView.vue'
import NewsList from '@/views/NewsList.vue'
import PasswordView from '@/views/PasswordView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CartListView from '@/views/CartListView.vue'
import OrderPageView from '@/views/OrderPageView.vue'
import CreateAccView from '@/views/CreateAccView.vue'
import MemberView from '@/views/MemberView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/memo',
      name: 'memo',
      component: MemoView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView ,
    },
    {
      path:'/products/:id',
      name:'productdetail',
      component: ProductDetailView,
      props:true,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView ,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{guestOnly:true},

    },
    {
      path:'/member',
      name: 'member',
      component: MemberView,
      meta:{requiresAuth:true},


    },
    
    {
      path: '/newslist',
      name: 'newslist',
      component: NewsList,
    },{
      path:'/login/password',
      name: 'password',
      component: PasswordView,
    },{
      path: '/login/createacc',
      name: 'createacc',
      component: CreateAccView,
    },{
      path:'/cart',
      name:'cart',
      component:CartListView,

    },{
      path:'/order',
      name:'order',
      component:OrderPageView,
    }
  ],
})

router.beforeEach((to, from, next)=>{
  const userStore=useUserStore();
  const isLoggedIn=!!userStore.userInfo;

  if(to.meta.requiresAuth && !isLoggedIn){
    return next({name:'login'});
  }
  if(to.meta.guestOnly && isLoggedIn){
    return next({name:'member'});
  }
  next();
})

export default router
