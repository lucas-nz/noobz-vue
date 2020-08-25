import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store";
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import layer from "vue-layer"

/**
 * 注册业务模块
 */
import frame from '@/module-frame';

Vue.use(frame, store);

Vue.use(ElementUI, {
  size: 'medium'
});

Vue.prototype.$layer = layer(Vue);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
