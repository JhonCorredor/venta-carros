import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import bootswatch from '../node_modules/bootswatch/dist/simplex/bootstrap.css'
import bootstrapjs from '../node_modules/bootstrap/dist/js/bootstrap.js'
// import sweetalert2 from '../node_modules/sweetalert2/dist/sweetalert2.js'

createApp(App,bootswatch,bootstrapjs).use(router).mount('#app')
