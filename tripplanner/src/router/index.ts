import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import StartPlan from '@/views/StartPlan.vue'
import FilterPage from '@/views/FilterPage.vue'
import maindashboard from '@/views/tripplannote/MainDashboard.vue'
import plan from '@/views/tripplannote/PlanningNote.vue'
import flight from '@/views/tripplannote/Flight.vue'
import hotel from '@/views/tripplannote/Hotel.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
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
    {
      // This is the parent route for the travel planner section
      path: '/maindashboard',
      name: 'maindashboard',
      component: maindashboard,
      children: [
           {
          // The flight view
          path: 'plan',
          name: 'plan',
          component: plan,
        },
      
        {
          // The flight view
          path: 'flight',
          name: 'flight',
          component: flight,
        },
        {
          // The hotel view
          path: 'hotel',
          name: 'hotel',
          component: hotel,
        },
      ],
    },
  ],
})

export default router