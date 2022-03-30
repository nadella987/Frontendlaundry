import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import axios from 'axios'

import VueHtml2pdf from 'vue-html2pdf'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'))
Vue.use(VueHtml2pdf)
Vue.use(VueSweetalert2)

Vue.component('navbar-component', require('./components/Template/MyNavbar.vue').default);
Vue.component('sidebar-component', require('./components/Template/MySidebar.vue').default);
Vue.component('footer-component', require('./components/Template/MyFooter.vue').default);

axios.defaults.baseURL = `http://127.0.0.1:8000/api`

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')