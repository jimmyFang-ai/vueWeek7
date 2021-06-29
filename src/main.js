import { createApp } from 'vue'

// vee-validate 套件
import {
  Field, Form, ErrorMessage, defineRule, configure
} from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// Vue3Loading 套件
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

// vue axios 套件
import axios from 'axios'
import VueAxios from 'vue-axios'

// 自己開發的程式碼放最後import
import App from './App.vue'
import router from './router'

// 匯入date(時間搓) 、currency(貨幣轉換千分位) 方法 到全域使用
import { date, currency } from './methods/filters'

// vee-validate 套件規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW')// 設定預設語系

// 將匯入的套件啟用並掛載至app.vue
const app = createApp(App)

// 在全域可調用 date 及 currency 方法
app.config.globalProperties.$filters = {
  date,
  currency
}

// 引用套件
app.use(VueAxios, axios)
app.use(router)

// 註冊元件
app.component('Loading', Loading)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
