import "./mocks";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/custom.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useUserStore } from "./stores/userStore";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.use(createPinia());

const userStore = useUserStore();
userStore.fetchCurrentUser().then(() => {
  app.mount("#app");
});

// if(import.meta.env.DEV){
//     import('./mocks')
// }