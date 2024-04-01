<template>
  <div class="context-space">
    <left />
    <center />
    <right />
  </div>
</template>
<script setup>
import left from './components/left.vue';
import center from './components/center.vue';
import right from './components/right.vue';
</script>

<style scoped>
.context-space {
  overflow: auto;
  display: flex;
  justify-content: space-around;
  border-radius: 8px;
  gap: 20px;
  margin: 20px;
  height: 100%;
}
</style>
