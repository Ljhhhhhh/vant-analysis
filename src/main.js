import Vue from 'vue'
import App from './App.vue'

import Button from './components/button'

Vue.config.productionTip = false
Vue.use(Button, Button)

new Vue({
  render: h => h(App),
}).$mount('#app')
