<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = (): void => {
  router.push('/')
}
</script>

<template>
  <div class="knowledge-layout">
    <div class="knowledge-header">
      <button class="back-button" @click="goHome">
        <span class="arrow">←</span> 返回首页
      </button>
    </div>
    <div class="knowledge-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.knowledge-layout {
  padding: 2rem;
}

.knowledge-header {
  margin-bottom: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.back-button:hover {
  background: #3aa876;
}

.arrow {
  font-size: 1.2rem;
}
</style> 