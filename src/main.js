import Vue from 'vue'
import App from './App.vue'

import Button from './components/button'
import Icon from './components/icon'
import Toast from './components/toast'

Vue.config.productionTip = false
Vue.use(Button, Button)
// Vue.use(Toast, Toast)
// Vue.use(Icon, Icon)

new Vue({
  render: h => h(App),
}).$mount('#app')
