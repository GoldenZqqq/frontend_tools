<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import SideMenu from "./components/SideMenu.vue"
import type { MenuItem } from "./types/menu"

const router = useRouter()
const menuItems = ref<MenuItem[]>([
  { id: "state-reset-hook", title: "1.Vue组件状态重置 Hook" },
  // { id: "props-emits", title: "2.Props 与事件" }
])

const goHome = () => {
  router.push("/")
}
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="header-content" @click="goHome">
        <img src="./assets/img/Shin-chan.jpeg" class="logo" alt="蜡笔小新" />
        <h1>Vue Collection</h1>
      </div>
    </header>
    <div class="main-container">
      <SideMenu :items="menuItems" />
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--primary-color);
  color: white;
  padding: 1rem;

  &-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
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
