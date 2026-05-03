import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'today-cute-pick',

  brand: {
    displayName: '오늘의 귀여운 뽑기',
    // NOTE: 앱인토스 콘솔에서 실제 아이콘 URL로 교체
    icon: 'https://placehold.co/96x96/FF6B9D/ffffff.png?text=%EB%BD%91',
    primaryColor: '#FF6B9D',
  },

  web: {
    host: 'localhost',
    port: 3000,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },

  outdir: 'dist',

  permissions: [],

  navigationBar: {
    withBackButton: false,
  },
});
