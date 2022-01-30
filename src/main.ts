import { createApp } from 'vue';
import App from './App.vue';
import router from '../router/index';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

const app = createApp(App);

Sentry.init({
  app,
  environment: 'testing',
  dsn: import.meta.env.VITE_SENTRY_DSN as string,
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
});

app.use(router);
app.mount('#app');
