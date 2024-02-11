import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: '/home',
    //   redirect: { name: 'home' }
    // },
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
        requiresAuth: true,
        roles: ['admin'],
      },
      children: [
        {
          path: ':chatId',
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

router.beforeEach((to, from) => {
  console.log('to: ', to, 'from: ', from);

  if (to.meta?.requiresAuth && to.meta.includes('admin')) {
    console.log(to.path, 'requires auth');
    return '/session';
  }

  if (to.path === '/') {
    return { name: 'about' };
  }
  return true;
});

export default router;
