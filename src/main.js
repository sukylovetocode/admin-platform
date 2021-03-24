import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import './element-ui';
import './permission';
import './echart';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'CN',
    messages: {
        CN: require('@/locale/zh_CN'),
        EN: require('@/locale/en_US'),
    },
});
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
