import "./mocks";
import "./css/custom.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useUserStore } from "./stores/userStore";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const userStore = useUserStore();
userStore.fetchCurrentUser().then(() => {
  app.mount("#app");
});

// if(import.meta.env.DEV){
//     import('./mocks')
// }
