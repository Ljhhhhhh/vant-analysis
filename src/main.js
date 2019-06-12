import Vue from 'vue'
import App from './App.vue'

import Button from './components/button'
import Icon from './components/icon'
import Toast from './components/toast'

Vue.config.productionTip = false


// console.log(Button.install, '111');
// Vue.use(Button)
// Vue.use(Toast)
// Vue.use(Icon)

const components = [
  Button,
  Toast,
  Icon
]

const install = (Vue) => {
  components.forEach(Component => {
    Vue.use(Component, Component);
  });
};

/* istanbul ignore if */
window.Vue = Vue
install(Vue);

new Vue({
  render: h => h(App),
}).$mount('#app')
