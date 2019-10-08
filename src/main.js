import Vue from 'vue';
import App from './App.vue';
import iView from 'iview';
import router from './router'
import 'iview/dist/styles/iview.css';

Vue.use(iView);

new Vue({
  el: '#app',
  components: { App },
  template: '<app/>',
  router
})