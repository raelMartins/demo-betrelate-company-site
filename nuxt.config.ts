// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL
    }
  },
  buildModules: ['@nuxt/image'],
  components: [{ path: '~/components/ads', prefix: 'Ads' }, '~/components']
});
