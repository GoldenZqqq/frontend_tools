<script setup lang="ts">
</script>

<template>
  <div class="content-view">
    <div class="welcome-message">
      <h2>欢迎来到 Vue 知识库</h2>
      <p>请从左侧菜单选择要查看的知识点</p>
      <div class="features">
        <div class="feature">
          <h3>🎯 知识分类</h3>
          <p>清晰的知识点分类，方便查找和学习</p>
        </div>
        <div class="feature">
          <h3>📝 实例演示</h3>
          <p>每个知识点都配有代码示例和详细说明</p>
        </div>
        <div class="feature">
          <h3>💡 最佳实践</h3>
          <p>包含实用技巧和推荐做法</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-view {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.welcome-message {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: 8px;
}

h2 {
  color: #42b883;
  margin-bottom: 1rem;
}

h3 {
  color: #666;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
  line-height: 1.6;
}
</style> 