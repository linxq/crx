import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/App.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/manager',
      name: 'manager',
      component: () => import('@/layout/default-layout.vue'),
      children: [
        {
          path: '/manager/image',
          name: '/manager/image',
          component: () => import('@/views/image/index.vue'),
          meta: {
            requiresAuth: false
          }
        }
      ],
      meta: {
        requiresAuth: false
      }
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
