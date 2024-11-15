<script setup lang="ts">
const state = ref({
  a: 1,
  b: 2,
  c: [1, 2, 3]
})
</script>

<template>
  <div class="flex gap20">
    <span>a: {{ state.a }}</span>
    <span>b: {{ state.b }}</span>
    <span>c: {{ state.c }}</span>

    <el-space>
      <el-button type="primary" @click="state.a++">a++</el-button>
      <el-button type="primary" @click="state.b++">b++</el-button>
      <el-button type="primary" @click="state.c.push(1)">c push</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-space>
  </div>
</template>
