// import { userLogin, userInfo, userPermission } from '@/api/user'; // eslint-disable-line no-unused-vars
import { setCookies } from '@/utils/base';
import { generateRoutes } from '@/utils/permission';
import permissions from '../permissions';

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
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            commit('LOGIN', 'token');
            setCookies('token', 'token');
            resolve({ status: 200 });

            // userLogin(userInfo)
            //     .then((res) => {
            //         commit('LOGIN', res.data.token);

            //         setCookies('token', res.data.token);

            //         resolve(res.data);
            //     })
            //     .catch((err) => {
            //         reject(err);
            //     });
        });
    },
    // eslint-disable-next-line no-unused-vars
    info({ commit }) {
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            resolve();
            // userInfo()
            //     .then((res) => {
            //         commit('USER_INFO', res.data.info);
            //         resolve();
            //     })
            //     .catch((err) => {
            //         reject(err);
            //     });
        });
    },
    permission({ commit }) {
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            const routes = generateRoutes(permissions);
            commit('USER_PERMISSION', routes);
            setTimeout(() => {
                resolve(routes);
            }, 20);

            // userPermission()
            //     .then((res) => {
            //         const routes = generateRoutes(res.data.permissions);
            //         commit('USER_PERMISSION', routes);
            //         resolve(routes);
            //     })
            //     .catch((err) => {
            //         reject(err);
            //     });
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
