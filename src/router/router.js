import { createRouter, createWebHashHistory } from 'vue-router'
const userIsLoggedIn = () => {
  return localStorage.getItem('token') !== null;
}
const commonBeforeEnter = (to, from, next) => {
  if (userIsLoggedIn()) {
    next();
  } else {
    next('/');
  }
};
const afterSucessfullloginsignup = (to, from, next) => {

  if (userIsLoggedIn()) {
    next('/polling');
  } else {
    next();
  }
};
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../pages/loginPage.vue'),
    beforeEnter: afterSucessfullloginsignup,
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../pages/signupPage.vue'),
    beforeEnter: afterSucessfullloginsignup,
  },
  {
    path: '/polling',
    name: 'polling',
    component: () => import('../pages/pollListPage.vue'),
    beforeEnter: commonBeforeEnter,
  },
  {
    path: '/addpoll',
    name: 'createpoll',
    component: () => import("../pages/createPoll.vue"),
    beforeEnter: commonBeforeEnter,
  },
  {
    path: '/updatetitle/:id',
    name: 'updatetitles',
    component: () => import("../pages/createPoll.vue"),
    beforeEnter: commonBeforeEnter,
  },
  {
    path: '/singlepoll/:id',
    name: 'singlepoll',
    component: () => import("../pages/singlePoll.vue"),
    beforeEnter: commonBeforeEnter,
  }
];
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const isLoggedOut = (to.name !== 'login' && to.name !== 'signup' && !userIsLoggedIn());
  if (isLoggedOut) {
    next({ name: 'login' });
  } else {
    next();
  }
});
export default router
