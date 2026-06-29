// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-29',
  devtools: { enabled: true },
  
  app: {
    baseURL: '/booking-sport-ui/',
    head: {
      title: 'Kinetic Court | Ứng Dụng Đặt Sân Thể Thao',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Kinetic Court - Ứng dụng đặt sân thể thao nhanh chóng và tiện lợi. Đặt sân Pickleball, Cầu lông, Tennis và Bóng rổ trong giây lát.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
      ]
    }
  },

  modules: [
    '@primevue/nuxt-module'
  ],

  primevue: {
    options: {
      ripple: true,
      theme: 'none' // We will use our custom light-mode and responsive design styles on top of PrimeVue component properties
    }
  },

  css: [
    '~/assets/css/style.css',
    'primeicons/primeicons.css'
  ]
})
