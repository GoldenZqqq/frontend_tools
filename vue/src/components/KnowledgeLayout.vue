<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="knowledge-layout p50">
    <h1>{{ route.meta.title }}</h1>
    <div class="content">
      <h2>介绍</h2>
      <p>{{ route.meta.description }}</p>
      
      <!-- 这里渲染实际的内容 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.knowledge-layout {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.content {
  max-width: 800px;
}

h1 {
  color: #42b883;
  margin-bottom: 2rem;
}

h2 {
  color: #2c3e50;
  margin: 1.5rem 0 1rem;
}

p {
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
}
</style> 