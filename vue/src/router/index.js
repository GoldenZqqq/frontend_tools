import { createRouter, createWebHistory } from 'vue-router'
import ContentView from '../components/ContentView.vue'
import StateResetHook from '../views/StateResetHook.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: ContentView
    },
    {
      path: '/state-reset-hook',
      component: StateResetHook
    }
  ]
})

export default router 