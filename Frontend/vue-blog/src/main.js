import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import axios from 'axios'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'

stockInit(Highcharts)
Vue.use(HighchartsVue)
Vue.config.productionTip = false

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
