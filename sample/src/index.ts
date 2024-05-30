import { createApp } from "vue";
import { pinia } from "./plugins/pinia.ts";
import { router } from "./plugins/router.ts";
import App from "./App.vue";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
