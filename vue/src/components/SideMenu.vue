<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import type { MenuItem } from "../types/menu"

const router = useRouter()
const props = defineProps<{
  items: MenuItem[]
}>()

const activeItem = ref<string | null>(null)

const handleItemClick = (itemId: string): void => {
  activeItem.value = itemId
  router.push(`/knowledge/${itemId}`)
}
</script>

<template>
  <div class="side-menu">
    <div
      v-for="item in items"
      :key="item.id"
      :class="['menu-item', { active: activeItem === item.id }]"
      @click="handleItemClick(item.id)"
    >
      <h2 class="category-title">{{ item.title }}</h2>
    </div>
  </div>
</template>

<style scoped>
.side-menu {
  width: 250px;
  background: #f8f8f8;
  padding: 1rem;
  overflow-y: auto;
  border-right: 1px solid #eee;
}

.category {
  margin-bottom: 1.5rem;
}

.category-title {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.menu-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin: 0.2rem 0;
  color: #666;
}

.menu-item:hover {
  background: #e8e8e8;
}

.menu-item.active {
  background: #42b88333;
  color: #42b883;
}
</style>
