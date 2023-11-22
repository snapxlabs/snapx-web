import * as Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-plus'
import '@element-plus/theme-chalk/dist/index.css'
import locale from 'element-plus/lib/locale/lang/en' // lang i18n
import 'element-plus/dist/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// import Icons from '@/icons' // icon
import SvgIcon from '@/components/SvgIcon'
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
const app = Vue.createApp(App)
app.component('SvgIcon', SvgIcon)
window.$vueApp = app

// Icons(app)
import 'virtual:svg-icons-register'

// set ElementUI lang to EN
window.$vueApp.use(ElementUI, { locale })

window.$vueApp.config.globalProperties.routerAppend = (path, pathToAppend) => {
  return path + (path.endsWith('/') ? '' : '/') + pathToAppend
}
window.$vueApp.use(store)
window.$vueApp.use(router)
window.$vueApp.mount('#app')
