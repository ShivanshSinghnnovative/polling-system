import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../pages/loginPage.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../pages/signupPage.vue')
  },
  {
    path: '/polling',
    name: 'polling',
    component: () => import('../pages/pollingPage.vue')
  }
];
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
