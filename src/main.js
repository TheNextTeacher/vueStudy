import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './components'
import './assets/icons'
import './lib/element-ui'

Vue.config.productionTip = false
Vue.use(Antd)

// 打包生产环境不需要Mock
if (process.env.NODE_ENV !== 'production') import('./mock')

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
