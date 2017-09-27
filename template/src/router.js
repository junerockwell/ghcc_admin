import Vue from 'vue';
import VueRouter from 'vue-router';

/* Page components here
 =========================================== */
import Page1 from './pages/Page1';

/* Indicate that Vue must use VueRouter Module
 =========================================== */
Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    path: '/page1',
    component: Page1
  }, {
    path: '*', redirect: '/page1'
  }]
});
