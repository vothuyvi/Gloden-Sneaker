import "./bootstrap";
import { createApp } from "vue";
import { createPinia } from 'pinia'
import "@/style/common.scss";
import "@/style/index.scss";
import router from "@/router/index.js";
import App from "@/App.vue";

const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
