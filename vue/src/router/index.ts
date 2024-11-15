import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ContentView from '../components/ContentView.vue'
import StateResetHook from '../views/StateResetHook.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: ContentView
  },
  {
    path: '/state-reset-hook',
    component: StateResetHook
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 