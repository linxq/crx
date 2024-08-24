import { defineStore } from 'pinia';
import { submitImage } from '@/api/image';
const useImageStore = defineStore('image', {
  state: () => ({
    size: 800,
    position: {}
  }),
  getters: {},
  actions: {
    async submitMainImage(info) {
      submitImage(info);
    }
  }
});
export default useImageStore;
