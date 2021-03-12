import { userLogin, userInfo, userPermission } from '@/api/user'; // eslint-disable-line no-unused-vars
import { setCookies } from '@/utils/base';
import { generateRoutes } from '@/utils/permission';

const state = {
    token: '',
    info: {},
    permission: [],
    active_app: window.location.pathname.split('/')[1]
        ? '/' + window.location.pathname.split('/')[1]
        : '/features',
};

const mutations = {
    LOGIN: (state, token) => {
        state.token = token;
    },
    USER_INFO: (state, info) => {
        state.info = info;
    },
    USER_PERMISSION: (state, permission) => {
        state.permission = permission;
    },
    ACTIVE_APP: (state, app) => {
        state.active_app = app;
    },
};
const actions = {
    // eslint-disable-next-line no-unused-vars
    login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            userLogin(userInfo)
                .then((res) => {
                    commit('LOGIN', res.data.token);

                    setCookies('token', res.data.token);

                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    info({ commit }) {
        return new Promise((resolve, reject) => {
            userInfo()
                .then((res) => {
                    commit('USER_INFO', res.data.info);
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    permission({ commit }) {
        return new Promise((resolve, reject) => {
            userPermission()
                .then((res) => {
                    const routes = generateRoutes(res.data.permissions);
                    commit('USER_PERMISSION', routes);
                    resolve(routes);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    active_app({ commit }, app) {
        commit('ACTIVE_APP', app);
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
