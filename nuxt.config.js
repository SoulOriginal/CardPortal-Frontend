require("dotenv").config();
module.exports = {
  ssr: true, // Comment this for SSR
  server: {
    port: 4600, // default: 3000
    // host: '0.0.0.0' // default: localhost
  },
  srcDir: __dirname,

  env: {
    apiUrl: process.env.apiUrl || process.env.APP_URL + "/api",
    appName: "CardPortal",
    appLocale: process.env.APP_LOCALE || "pl",
  },

  head: {
    title: `CardPortal Title`,
    titleTemplate: "%s - " + process.env.APP_NAME,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "CardPortal hid",
        name: "CardPortal description",
        content: "CardPortal Content",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "logo-free.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400",
      },
    ],
  },

  loading: { color: "#007bff" },
  // loading: "~/components/LoadingBar.vue",
  // loading: {
  //   duration: 3000,
  //   continuous: true,
  // },
  // loadingIndicator: {
  //   name: "rotating-plane",
  //   color: "blue",
  //   background: "red",
  // },
  router: {
    middleware: ["locale", "check-auth"],
  },

  css: [{ src: "~assets/sass/app.scss", lang: "scss" }],

  plugins: [
    // { src: "~components/global", mode: "client" },
    { src: "~plugins/i18n" },
    { src: "~plugins/gsap", mode: "client", ssr: false },
    // { src: "plugins/vue-typer", ssr: false },
    // "~plugins/vform",
    { src: "~plugins/axios", mode: "client", ssr: false },
    // "~plugins/fontawesome",
    "~plugins/base",
    "~/plugins/notifications.js",
    // "~/plugins/imageViewer.js",
    // "~/plugins/google-autocomplete.js",
    // { src: "~/plugins/vue-html2pdf", mode: "client" },
    // "~plugins/nuxt-client-init", // Comment this for SSR
    { src: "~plugins/vuelidate", mode: "client" },
    // { src: "~plugins/vue-quill-editor", ssr: false },
    // { src: "~plugins/vuelayers", ssr: true },
    // { src: "~plugins/auth", ssr: false },
    // { src: "~/plugins/chart.js", mode: "client" }
    // { src: "~/plugins/socket.io.js", ssr: false },
    { src: "~/plugins/moment.js", ssr: true },
  ],

  modules: [
    "@nuxtjs/router",
    // "~/io",
    "nuxt-seo",
    "@nuxtjs/axios",
    "nuxt-leaflet",

    // 'nuxt-i18n',
    [
      "vue-sweetalert2/nuxt",
      {
        confirmButtonColor: "#41b882",
        cancelButtonColor: "#ff7674",
      },
    ],
    // "@nuxtjs/proxy",
    // ["@nuxtjs/proxy", { pathRewrite: { "^/api/ws": "/api/ws" } }],
  ],

  // io: {
  //   sockets: [
  //     {
  //       name: "getman",
  //       default: true,
  //       url: "http://localhost:4500/api/",
  //       path: "api",
  //     },
  //   ],
  //   // server: {
  //   //   cors: {
  //   //     credentials: true,
  //   //     origin: ["https://get-man.com"],
  //   //   },
  //   // },
  // },
  seo: {
    // Module options
    baseUrl: process.env.APP_URL,
    name: "CardPortal",
    title: "CardPortal Title",
    templateTitle: "%name% - %title%",
    description: "CardPortal Desc",
    // ...
  },

  i18n: {
    locales: ["pl", "en"],
    defaultLocale: "ru",
    lazy: true,
    vueI18n: {
      fallbackLocale: "ru",
    },
  },
  build: {
    analyze: false,
    extractCSS: false,
  },

  buildModules: [
    // With options
    ["@nuxtjs/vuetify"],
    "@nuxtjs/moment",
  ],
  moment: {
    defaultLocale: "pl",
    locales: ["pl", "ru"],
  },
  vuetify: {
    treeShake: true,
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      light: {
        primary: "#42a5f6",
        secondary: "#050b1f",
        accent: "#204165",
      },
    },
  },
  serverMiddleware: {
    "/api": "~/api",
    // "/ws": "~/websocket",
  },
  axios: {
    baseURL: "http://localhost:4600/",
  },
  // hooks: {
  //   generate: {
  //     done (generator) {
  //       // Copy dist files to public/_nuxt
  //       if (generator.nuxt.options.dev === false && generator.nuxt.options.mode === 'spa') {
  //         const publicDir = join(generator.nuxt.options.rootDir, 'public', '_nuxt')
  //         removeSync(publicDir)
  //         copySync(join(generator.nuxt.options.generate.dir, '_nuxt'), publicDir)
  //         copySync(join(generator.nuxt.options.generate.dir, '200.html'), join(publicDir, 'index.html'))
  //         removeSync(generator.nuxt.options.generate.dir)
  //       }
  //     }
  //   }
  // }
};
