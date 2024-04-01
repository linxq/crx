import { loadEnv, type ConfigEnv, type UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import configArcoStyleImportPlugin from './src/plugin/arcoStyleImport';

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_BASE } = loadEnv(mode, process.cwd());

  return {
    base: VITE_BASE,
    server: {
      // 允许跨域
      cors: true,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: true,
      // 端口号（这里使用了变量 VITE_PORT）
      port: Number(VITE_PORT),
      // 本地跨域代理-> 代理到服务器的接口地址
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      },
      // 预热文件以降低启动期间的初始页面加载时长
      warmup: {
        // 预热的客户端文件：首页、views、 components
        clientFiles: ['./index.html', './src/{views,components}/*']
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              'src/assets/style/variables.less'
            )}";`
          },
          // https://lesscss.org/usage/#less-options
          math: 'parens-division',
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [vue(), configArcoStyleImportPlugin()]
  };
};
