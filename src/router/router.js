import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../pages/loginPage.vue'),
    beforeEnter: (to, from, next) => {
    
      if (userIsLoggedIn()) {
        next({ name: 'polling' });
      } else {
        next();
      }
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../pages/signupPage.vue'),
    beforeEnter: (to, from, next) => {
      if (userIsLoggedIn()) {
        next({ name: 'polling' });
      } else {
        next();
      }
    },

  },
  {
    path: '/polling',
    name: 'polling',
    component: () => import('../pages/pollingPage.vue'),
    beforeEnter: (to, from, next) => {
      if (userIsLoggedIn()) {
        next();
      } else {
        next({ name: 'login' });
      }
    },
  },
  {
    path:'/addpoll',
    name:'createpoll',
    component:()=>import("../pages/createPoll.vue"),
    beforeEnter:(to,from,next)=>{
      if(userIsLoggedIn()){
        next();
      } else {
        next({ name: 'login' });
      }
    }
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


function userIsLoggedIn() {
  return localStorage.getItem('token') !== null;
}

export default router
