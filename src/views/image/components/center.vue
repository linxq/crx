<template>
  <div class="center">
    <div class="center-img">
      <div style="display: flex; justify-content: center; width: 100%">
        <h3>图片展示</h3>
      </div>
      <div class="back">
        <img class="production-img" :src="production" />
        <img class="logo" :src="production" />
      </div>
    </div>
  </div>
</template>
<script setup>
import production from '@/assets/images/production.jpg';
</script>
<style scoped>
.center {
  background-color: #ffffff;
  flex: 5 5 auto;
  margin: 0px;
  display: flex;
  justify-content: center;
  .center-img {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .back {
    width: 600px;
    height: 600px;
    box-shadow: 1px 1px 2px 2px #a1a1a1;
    position: relative;
    .production-img {
      width: 100%;
    }
    .logo {
      display: block;
      position: absolute;
      border: 1px dashed #a1a1a1;
      top: 20px;
      left: 20px;
      width: 60px;
      height: 60px;
      z-index: 100;
      cursor: pointer;
    }
    .active {
      border: 1px dashed #165dff;
    }
  }
}
</style>
