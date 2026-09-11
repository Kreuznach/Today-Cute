import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'today-cute-pick',

  brand: {
    primaryColor: '#FF6B9D'
  },

  webBundleDir: 'dist',
  permissions: [],

  navigationBar: {
    withBackButton: false,
  }
});
