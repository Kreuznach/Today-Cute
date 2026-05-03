import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'today-cute-pick',

  brand: {
    displayName: '?ㅻ뒛??洹?ъ슫 戮묎린',
    // NOTE: ?깆씤?좎뒪 肄섏넄?먯꽌 ?ㅼ젣 ?꾩씠肄?URL濡?援먯껜
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

