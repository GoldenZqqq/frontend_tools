<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="knowledge-layout">
    <div class="content">
      <h1>{{ route.meta.title }}</h1>
      <p class="description">{{ route.meta.description }}</p>
      <div class="divider"></div>
      <!-- 子路由内容 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-layout {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.content {
  max-width: 800px;
  margin: 0 auto;

  h1 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }

  .description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  .divider {
    height: 1px;
    background: var(--border-color);
    margin: 2rem 0;
  }
}
</style> 