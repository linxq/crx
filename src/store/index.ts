import { createPinia } from 'pinia';
import useUserStore from './modules/user';
import useImageStore from './modules/image';

const pinia = createPinia();

export { useUserStore, useImageStore };
export default pinia;
