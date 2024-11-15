<script setup lang="ts">
import { useResetableRef, useResetableReactive } from "@/hooks/useResetable"

const [state, reset] = useResetableRef({
  a: 1,
  b: 2,
  c: [1, 2, 3]
})

const [obj, resetObj] = useResetableReactive({
  a: 1,
  b: 2,
  c: [1, 2, 3]
})
</script>

<template>
  <div class="flex flex-col gap5 text-26px">
    <div class="flex flex-col gap10">
      <span>a: {{ obj.a }}</span>
      <span>b: {{ obj.b }}</span>
      <span>c: {{ obj.c }}</span>
      <span>c: {{ obj.d }}</span>
    </div>

    <el-space>
      <el-button type="primary" @click="obj.a++">a++</el-button>
      <el-button type="primary" @click="obj.b++">b++</el-button>
      <el-button type="primary" @click="obj.c.push(1)">c push</el-button>
      <el-button type="primary" @click="obj.d = 10">添加新属性</el-button>
      <el-button type="primary" @click="resetObj">重置</el-button>
    </el-space>
  </div>
</template>
