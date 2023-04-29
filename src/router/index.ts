import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import store from '@/store';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name : 'Home',
    component: () => import('@/views/TheAuthorisation.vue')
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/TheDashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters['authModule/userAuthenticated']) {
        next()
      } else {
        next('/login')
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
