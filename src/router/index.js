import HomeView from '@/views/HomeView.vue';
import NotFound from '@/views/404View.vue';

import { createRouter, createWebHashHistory } from 'vue-router';

const stage = import.meta.env.VITE_STAGE;

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: '/home',
    //   redirect: { name: 'home' }
    // },
    { path: '/404', component: NotFound },
    { path: '/:catchAll(.*)', redirect: '/404' },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: ['/home'],
      meta: {
        requiresAuth: false,
      },
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/session',
      component: () => import('../views/SessionView.vue'),
      meta: {
        requiresAuth: false,
      },
      children: [
        {
          path: '',
          components: {
            default: () => import('../views/LoginView.vue'),
            register: () => import('../views/RegisterView.vue'),
          },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/chats',
      component: () => import('../views/ChatsView.vue'),
      meta: {
        requiresAuth: false,
        roles: ['admin'],
      },
      children: [
        {
          path: ':chatId(\\d+)',
          component: () => import('../views/ChatView.vue'),
          //props: true
          props: (route) => {
            return {
              chatId: route.params.chatId,
            };
          },
        },
      ],
    },
  ],
});

if (stage === 'test') {
  router.addRoute({
    path: '/profile',
    component: () => import('@/views/ProfileVue.vue'),
  });
}

router.beforeEach((to, from) => {
  console.log('to: ', to, 'from: ', from);

  // if (to.meta?.requiresAuth) {
  //   console.log(to.path, 'requires auth');
  //   return '/session';
  // }

  // if (to.path === '/') {
  //   return { name: 'about' };
  // }
  return true;
});

export default router;
