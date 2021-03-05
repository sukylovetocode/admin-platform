import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {}, // 必须同步执行
    actions: {},
    getters: {
        hasPermission: (state) => state.user.permission,
    },
    modules: {
        user,
    },
});
