<template>
  <div class="left">
    <h3>选项</h3>
    <a-form layout="vertical">
      <a-form-item field="name" label="选择背景色">
        <div
          v-for="item in data.colors"
          :style="{
            background: item === 'transparent' ? `url(${transparent})` : item
          }"
          style="background-size: contain"
          :key="item"
          :class="{ active: item === form.color }"
          class="color-cell"
          @click="checkColor(item)"
        ></div>
      </a-form-item>
      <a-form-item field="name" label="上传logo（可选）">
        <a-upload
          action="/"
          :fileList="file ? [file] : []"
          :show-file-list="false"
          @change="onChange"
          @progress="onProgress"
        >
          <template #upload-button>
            <div
              :class="`arco-upload-list-item${
                file && file.status === 'error'
                  ? ' arco-upload-list-item-error'
                  : ''
              }`"
            >
              <div
                class="arco-upload-list-picture custom-upload-avatar"
                v-if="file && file.url"
              >
                <img :src="file.url" />
                <div class="arco-upload-list-picture-mask">
                  <IconEdit />
                </div>
                <a-progress
                  v-if="file.status === 'uploading' && file.percent < 100"
                  :percent="file.percent"
                  type="circle"
                  size="mini"
                  :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)'
                  }"
                />
              </div>
              <div class="arco-upload-picture-card" v-else>
                <div class="arco-upload-picture-card-text">
                  <IconPlus />
                  <div style="margin-top: 10px; font-weight: 600">正方形图</div>
                </div>
              </div>
            </div>
          </template>
        </a-upload>
      </a-form-item>
      <a-form-item label="是否批量" style="width: 500px; display: block">
        <a-radio-group
          v-model="form.batch"
          style="width: 500px; display: block"
        >
          <template v-for="item in ['单张', '批量']" :key="item">
            <a-radio :value="item">
              <template #radio="{ checked }">
                <a-space
                  align="start"
                  class="custom-radio-card"
                  :class="{ 'custom-radio-card-checked': checked }"
                >
                  <div className="custom-radio-card-mask">
                    <div className="custom-radio-card-mask-dot" />
                  </div>
                  <div>
                    <div className="custom-radio-card-title">
                      {{ item }}
                    </div>
                    <a-typography-text type="secondary">
                      {{ item === '单张' ? '需上传图片' : '需上传压缩包' }}
                    </a-typography-text>
                  </div>
                </a-space>
              </template>
            </a-radio>
          </template>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="form.batch === '单张'" label="上传图片"></a-form-item>
      <a-form-item v-else label="上传压缩包"></a-form-item>
      <a-form-item label="图片大小">
        <a-select v-model="form.size">
          <a-option :value="400">400*400</a-option>
          <a-option :value="800">800*800</a-option>
          <a-option :value="1000">1000*1000</a-option>
        </a-select>
      </a-form-item>
    </a-form>
    <a-space style="margin-bottom: 20px">
      <a-button type="outline">生成</a-button>
    </a-space>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import transparent from '@/assets/images/transparent.png';
const form = reactive({
  name: 'name',
  color: 'transparent',
  batch: '批量',
  size: 800
});
const data = reactive({
  colors: ['transparent', '#ffffff', '#165DFF']
});
const file = ref({});

function checkColor(colorValue) {
  form.color = colorValue;
}
</script>
<style scoped>
.left {
  overflow: hidden;
  flex: 3 3 250px;
  margin: 0px;
  padding: 0px 10px;
  background: #ffffff;
  .color-cell {
    height: 30px;
    width: 30px;
    border: 2px solid #e1e1e1;
    margin-right: 15px;
    cursor: pointer;
    border-radius: 5px;
  }
  .active {
    box-shadow: 0px 0px 1px 2px #165dff;
  }
}

.custom-radio-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 150px;
  box-sizing: border-box;
}

.custom-radio-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-radio-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}
.custom-radio-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>
