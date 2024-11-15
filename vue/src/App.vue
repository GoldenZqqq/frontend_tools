<script setup lang="ts">
import { ref } from "vue"
import SideMenu from "./components/SideMenu.vue"
import ContentView from "./components/ContentView.vue"
import type { MenuCategory } from "./types/menu"

const menuItems = ref<MenuCategory[]>([
  {
    title: "Vue 基础",
    children: [
      { id: "template-syntax", title: "模板语法" },
      { id: "reactivity", title: "响应式原理" },
      { id: "computed-watch", title: "计算属性与侦听器" }
    ]
  },
  {
    title: "Vue 组件",
    children: [
      { id: "component-basics", title: "组件基础" },
      { id: "props-emits", title: "Props 与事件" },
      { id: "slots", title: "插槽使用" },
      { id: "state-reset-hook", title: "状态重置 Hook" }
    ]
  },
  {
    title: "Vue 生态",
    children: [
      { id: "vue-router", title: "Vue Router" },
      { id: "pinia", title: "状态管理 Pinia" },
      { id: "composition", title: "组合式 API" }
    ]
  }
])
</script>

<template>
  <div class="app-container">
    <header class="header">
      <img src="./assets/vue.svg" class="logo" alt="Vue logo" />
      <h1>Vue 知识库</h1>
    </header>
    <div class="main-container">
      <SideMenu :items="menuItems" />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #42b883;
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 2em;
}

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}
</style>
