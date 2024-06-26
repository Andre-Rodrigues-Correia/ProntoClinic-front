import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faTrash, faEdit, faUser, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store';
import PrimeVue from 'primevue/config';
import '@fortawesome/fontawesome-svg-core/styles.css'
import Multiselect from 'vue-multiselect'





library.add(faEye, faTrash, faEdit, faUser, faEyeSlash)


const app = createApp(App)

const axiosInstance = axios.create({
    //baseURL: 'https://prontoclinic.onrender.com',
    baseURL: 'http://localhost:3000', // Substitua com o endereço real da sua API
  });
  

app.config.globalProperties.$axios = axiosInstance;




app.component('font-awesome-icon', FontAwesomeIcon)
app.component('multiselect', Multiselect)





app.use(store)
app.use(router)
app.use(PrimeVue);


app.mount('#app')
