/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import TDesign from 'tdesign-vue';
import routes from './routes';
import App from './App.vue';

import Codesandbox from './components/codesandbox/index.vue';

// import tdesign style;
import 'tdesign-vue/style/index.js';
import '@common/style/web/docs.less';

// import site webcomponents
import 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/style.css';
import 'tdesign-site-components/lib/styles/prism-theme.less';
import 'tdesign-site-components/lib/styles/prism-theme-dark.less';

// import icons webcomponents
import 'tdesign-icons-view';

Vue.use(TDesign);
Vue.use(VueRouter);

Vue.config.ignoredElements = [/^td-/];

Vue.component('Codesandbox', Codesandbox);

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (typeof NProgress !== 'undefined') {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  if (typeof NProgress !== 'undefined') {
    NProgress.done();
  }
});

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
});
