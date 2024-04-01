import { defineStore } from 'pinia';

const useImageStore = defineStore('image', {
  state: () => ({
    size: 800,
    position: {}
  }),
  getters: {},
  actions: {}
});
export default useImageStore;
