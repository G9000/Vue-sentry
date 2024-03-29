import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

const app = createApp(App);

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    app,
    environment: process.env.NODE_ENV,
    dsn: import.meta.env.VITE_SENTRY_DSN as string,
    // release: `v0.1.1 ${process.env.NODE_ENV}`,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
      }),
    ],
    debug: process.env.NODE_ENV !== 'production',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1,
    tracingOptions: {
      trackComponents: true,
    },

    logErrors: process.env.NODE_ENV === 'production' ? false : true, // call original vue log error function
    attachProps: true, //Sentry will send all Vue components’ props for logging purpose
    attachStacktrace: true, //Stack traces are automatically attached to all messages logged
  });
}

app.use(router);
app.mount('#app');
