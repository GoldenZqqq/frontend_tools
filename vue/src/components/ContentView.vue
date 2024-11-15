<script setup lang="ts">
</script>

<template>
  <div class="content-view">
    <div class="welcome-message">
      <h2>Vue中的奇技淫巧</h2>
      <p class="intro">
        这是我个人整理的Vue开发技巧与实用方案集合。在日常开发中，我们经常会遇到一些特殊的需求和场景，
        这些场景可能需要一些独特的解决方案。这个项目就是为了收集和分享这些实用的开发技巧，
        帮助大家在Vue开发中少走弯路。
      </p>
      <div class="features">
        <div class="feature">
          <h3>🎯 实用技巧</h3>
          <p>收集日常开发中的实用技巧和解决方案</p>
        </div>
        <div class="feature">
          <h3>📝 最佳实践</h3>
          <p>整理Vue开发中的最佳实践和推荐做法</p>
        </div>
        <div class="feature">
          <h3>💡 奇技淫巧</h3>
          <p>分享一些有趣的Vue开发技巧和黑科技</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.intro {
  margin: 2rem auto;
  max-width: 600px;
  color: #666;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  padding: 1.5rem;
  background: var(--bg-light);
  border-radius: 8px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
}

h2 {
  color: var(--primary-color);
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