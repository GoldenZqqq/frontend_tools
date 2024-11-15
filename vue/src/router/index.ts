import { createRouter, createWebHistory } from "vue-router"
import KnowledgeLayout from "../components/KnowledgeLayout.vue"
import ContentView from "../components/ContentView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ContentView
    },
    {
      path: "/knowledge",
      component: KnowledgeLayout,
      children: [
        {
          path: "state-reset-hook",
          component: () => import("@/views/StateResetHook/index.vue"),
          meta: {
            title: "Vue组件状态重置 Hook",
            description:
              "在Vue组件中，有时我们需要将组件的状态重置为初始值。这个自定义Hook可以帮助我们优雅地处理这个需求。"
          }
        }
      ]
    }
  ]
})

export default router
