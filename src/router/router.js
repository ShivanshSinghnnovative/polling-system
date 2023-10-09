import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../pages/loginPage.vue'
import signup from '../pages/signupPage.vue'
import polling from '../pages/pollingPage.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/polling',
    name: 'polling',
    component: polling
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
