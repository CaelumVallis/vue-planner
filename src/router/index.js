import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'app',
    component: App
  },
  {
    path: '/login',
    name: 'Login',
    component: App
  },
  {
    path: '/register',
    name: 'Register',
    component: App
  },
  // {
  //   path: '/login',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
