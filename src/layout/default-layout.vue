<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">
      <div class="content-header">
        <img class="logo" :src="logo1" />
        <navbar></navbar>
      </div>
    </a-layout-header>

    <a-layout>
      <a-layout-sider collapsible breakpoint="xl">
        <div class="logo" />
        <a-menu
          :default-open-keys="['1']"
          :default-selected-keys="['0_3']"
          :style="{ width: '100%' }"
        >
          <a-menu-item
            v-for="item in menuJson"
            :key="item.name"
            @click="router.push(item.url)"
          >
            <component :is="item.icon"></component>
            {{ item.title }}
          </a-menu-item>
        </a-menu>
        <!-- trigger -->
        <template #trigger="{ collapsed }">
          <IconCaretRight v-if="collapsed"></IconCaretRight>
          <IconCaretLeft v-else></IconCaretLeft>
        </template>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="content">
          <RouterView></RouterView>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { defineComponent } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useRouter, useRoute } from 'vue-router';
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar
} from '@arco-design/web-vue/es/icon';
import logo1 from '@/assets/images/logo2.png';
import navbar from '@/components/navbar/index.vue';

const menuJson = [
  {
    title: '首页',
    url: '/manager',
    icon: 'icon-home'
  },
  {
    title: '主图处理',
    url: '/manager/image',
    icon: 'icon-file-image'
  }
];

const router = useRouter();
</script>
<style scoped>
.layout {
  height: 100vh;
  overflow: hidden;
  :deep(.arco-layout) {
    overflow: hidden;
  }
  .layout-header {
    height: 80px;
    .content-header {
      display: flex;
      box-shadow: 0px 1px 3px #e1e1e1;
      align-items: center;
      justify-content: space-between;
      .logo {
        height: 60px;
      }
    }
  }
  .content-header {
    height: 77px;
  }
  .content {
    background: #f5f5f5;
  }
}
</style>
