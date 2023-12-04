import { resolve } from "path";
export default defineNuxtConfig({
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
      },
    ],
    script: [
      { src: "https://cdn.jsdelivr.net/npm/vue@3" },
      { src: "https://cdn.jsdelivr.net/npm/vue-demi" },
      { src: "https://cdn.jsdelivr.net/npm/@vuelidate/core" },
      { src: "https://cdn.jsdelivr.net/npm/@vuelidate/validators" },
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js",
        async: true,
      },
    ],
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  devtools: { enabled: true },
  css: ["./assets/main.sass", "vue-toast-notification/dist/theme-default.css"],
  ssr: true,
  modules: [
    "@nuxt/content",
    "@nuxt/image",
  ],
  imports: {
    dirs: ['store', 'utils']
  }
});
