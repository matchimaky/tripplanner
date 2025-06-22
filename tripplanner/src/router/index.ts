import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import StartPlan from '@/views/StartPlan.vue'
import FilterPage from '@/views/FilterPage.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
     {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
     {
      path: '/startplan',
      name: 'startplan',
      component: StartPlan,
    },
      {
      path: '/filterpage',
      name: 'filterpage',
      component: FilterPage,
    },
   
  ],
})

export default router
