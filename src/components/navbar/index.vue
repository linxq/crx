<template>
  <ul class="right-side">
    <li>
      <a-dropdown trigger="click">
        <span class="user-name">用户1，您好</span>
        <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
          <img alt="avatar" :src="avatar" />
        </a-avatar>
        <template #content>
          <a-doption>
            <a-space @click="handleLogout">
              <icon-export />
              <span>退出登录</span>
            </a-space>
          </a-doption>
        </template>
      </a-dropdown>
    </li>
  </ul>
</template>
<script setup>
import avatar from '@/assets/images/avatar.png';
function handleLogout() {}
</script>

<style scoped>
.right-side {
  margin-right: 20px;
  li {
    list-style: none;
  }
}
.user-name {
  margin-right: 20px;
}
</style>
