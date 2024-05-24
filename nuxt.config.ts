import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import dev from './lib/config/development';
import stg from './lib/config/staging';
import prod from './lib/config/production';
import { Environments, WebStorageKeys } from './lib/values/general.values';

const env = process.env.ENV ? process.env.ENV : process.env.NODE_ENV;

let CONFIG = dev;
if (env === Environments.prod) {
  CONFIG = prod;
} else if (env === Environments.stg) {
  CONFIG = stg;
} else if (env === Environments.beta) {
  CONFIG = beta;
}

// @TODO
const meta = {
  title: 'FUEL Game',
  description: 'Get behind the wheel and feel the speed of Fuel!',
  url: CONFIG.APP_URL,
  image: `${CONFIG.APP_URL}/images/logo.svg`,
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      API_BASE: CONFIG.API_BASE || 'https://api-game.fuel.network/',
      APP_URL: CONFIG.APP_URL || 'https://app-game.fuel.network/',
      GAME_URL: CONFIG.GAME_URL || 'https://game.fuel.network/',
      ENV: env || Environments.dev,
    },
  },

  components: ['~/components/general', '~/components/parts'],

  imports: {
    dirs: ['composables/', 'stores/**', 'lib/utils/**'],
  },

  modules: [
    ['@nuxtjs/tailwindcss', { cssPath: '~/assets/styles/index.css' }],
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-icons',
    '@nuxtjs/i18n',
  ],

  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': ['useMessage'],
          },
        ],
      }),

      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],

    optimizeDeps: {
      include: process.env.NODE_ENV === 'development' ? ['naive-ui'] : [],
    },
  },

  build: {
    transpile:
      // must use NODE_ENV (to build production version with dev config)
      process.env.NODE_ENV === Environments.prod
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
        : ['@juggle/resize-observer'],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      bodyAttrs: { id: 'fuel' },
      title: meta.title,
      titleTemplate: `%s - ${meta.title}`,
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',

      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#070707' },
        { name: 'description', content: meta.description, hid: 'description' },
        { name: 'og:title', content: meta.title, hid: 'og:title' },
        { name: 'og:description', content: meta.description, hid: 'og:description' },
        { name: 'og:url', content: meta.url, hid: 'og:url' },
        { name: 'og:image', content: meta.image },
        { name: 'og:type', content: 'website' },
        { name: 'twitter:title', content: meta.title, hid: 'twitter:title' },
        { name: 'twitter:description', content: meta.description, hid: 'twitter:description' },
        { name: 'twitter:url', content: meta.url, hid: 'twitter:url' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: meta.image },
      ],

      link: [
        { rel: 'icon', type: 'image/png', href: '/images/favicon.svg' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
          crossorigin: '',
        },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=block',
        },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap"',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=block',
          media: 'print',
          onload: "this.media='all'",
        },
      ],
    },
  },

  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: WebStorageKeys.LANGUAGE,
      redirectOn: 'root',
    },
  },

  devtools: { enabled: true },
  devServer: {
    port: 3000,
  },
});
