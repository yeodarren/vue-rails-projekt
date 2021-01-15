import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import moment from 'moment'

Vue.use(Vuelidate)

Vue.mixin({
  methods: {
    $elvis: p => eval('this.'+p)
  }
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM-DD-YYYY hh:mm')
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
