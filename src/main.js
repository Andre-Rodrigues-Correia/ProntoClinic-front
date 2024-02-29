import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faTrash, faEdit, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

library.add(faEye, faTrash, faEdit, faUser)


const app = createApp(App)

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Substitua com o endereço real da sua API
  });
  

app.config.globalProperties.$axios = axiosInstance;

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
