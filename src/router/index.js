import { createWebHistory, createRouter } from 'vue-router'
import Main from '@pages/Main.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    }
  ],
})

export default router