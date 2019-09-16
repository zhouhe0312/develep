import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import VueJsonp from 'vue-jsonp'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import GeminiScrollbar from 'vue-gemini-scrollbar'

Vue.use(GeminiScrollbar)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueJsonp)
Vue.use(VueLazyload, {
  preLoad: 1.3,//元素距离页面底部距离的百分比
  lazyComponent: true,//是否启用懒加载组件
  error: require('@/assets/fileError.png'),
  loading: require('@/assets/loading.gif'),
  attempt: 3,//图片加载失败后的重试次数
  listenEvents: [ 'scroll' ],
  observer:true,//可选
  observerOptions:{ rootMargin: '0px', threshold: 0.1 } 
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
