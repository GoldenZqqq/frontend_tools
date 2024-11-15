<script setup lang="ts">
import KnowledgeLayout from "../components/KnowledgeLayout.vue"

const state = ref({
  a: 1,
  b: 2,
  c: [1,2,3]
})
</script>

<template>
  <KnowledgeLayout>
    <h1>Vue组件状态重置 Hook</h1>
    <div class="content">
      <h2>介绍</h2>
      <p>
        在Vue组件中，有时我们需要将组件的状态重置为初始值。这个自定义Hook可以帮助我们优雅地处理这个需求。
      </p>

      <!-- 这里可以添加更多内容 -->
       
    </div>
  </KnowledgeLayout>
</template>

<style scoped>
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
}
</style>
