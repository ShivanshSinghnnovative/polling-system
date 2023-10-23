import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faEye,
    faEyeSlash,
    faSpinner,
    faPlus,
    faPen,
    faTrash,
    faArrowRight,
    faUser
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser)
library.add(faEye);
library.add(faEyeSlash);
library.add(faSpinner);
library.add(faPlus);
library.add(faPen);
library.add(faTrash);
library.add(faArrowRight);
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).mount('#app')
