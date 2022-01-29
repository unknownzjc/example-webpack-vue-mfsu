// main.ts
import { createApp } from "vue";
import Idux from "./idux";

import App from "./app.vue";

createApp(App).use(Idux).mount("#app");