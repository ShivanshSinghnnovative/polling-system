import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

library.add(faEye);
library.add(faEyeSlash);



createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).mount('#app')
