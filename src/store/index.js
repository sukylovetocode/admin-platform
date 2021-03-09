import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

function getTopMenu(menus) {
    let menu = [];
    menus.forEach((item) => {
        let tmp = { ...item };
        if (tmp.topMenu) {
            menu.push(tmp);
            if (tmp.children) {
                tmp.children = getTopMenu(tmp.children);
                if (tmp.children.length <= 0) {
                    delete tmp.children;
                }
            }
        }
    });
    return menu;
}
export default new Vuex.Store({
    state: {},
    mutations: {}, // 必须同步执行
    actions: {},
    getters: {
        hasPermission: (state) => state.user.permission,
        active_app: (state) => {
            let obj;
            state.user.permission.forEach((item) => {
                if (item.path === state.user.active_app) {
                    obj = item;
                }
            });
            return obj;
        },
        top_menu: (state) => {
            return getTopMenu(state.user.permission);
        },
    },
    modules: {
        user,
    },
});
