import { createRouter, createWebHistory } from "vue-router"
import KnowledgeLayout from "../components/KnowledgeLayout.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: KnowledgeLayout,
      children: [
        {
          path: "state-reset-hook",
          component: () => import("../views/StateResetHook.vue"),
          meta: {
            title: "Vue组件状态重置 Hook",
            description:
              "在Vue组件中，有时我们需要将组件的状态重置为初始值。这个自定义Hook可以帮助我们优雅地处理这个需求。"
          }
        }
        // 其他路由配置...
      ]
    }
  ]
})

export default router
