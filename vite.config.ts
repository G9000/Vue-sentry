import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import type { ViteSentryPluginOptions } from 'vite-plugin-sentry';
import viteSentry from 'vite-plugin-sentry';

// const sentryConfig: ViteSentryPluginOptions = {
//   url: 'https://my.ondemand.sentry.com',
//   authToken: '<SECRET_TOKEN_HERE>',
//   org: 'my_org',
//   project: 'my_project',
//   release: '1.0',
//   deploy: {
//     env: 'production',
//   },
//   setCommits: {
//     auto: true,
//   },
//   sourceMaps: {
//     include: ['./dist/assets'],
//     ignore: ['node_modules'],
//     urlPrefix: '~/assets',
//   },
// };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
