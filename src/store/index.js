import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import editor from './modules/editor';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {}, // 必须同步执行
    actions: {},
    getters: {},
    modules: {
        user,
        editor,
    },
});
