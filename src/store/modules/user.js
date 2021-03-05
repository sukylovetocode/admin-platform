import { userLogin, userInfo, userPermission } from '@/api/user'; // eslint-disable-line no-unused-vars
import { setCookies } from '@/utils/base';
import { generateRoutes } from '@/utils/permission';
import { asyncRoutes } from '@/router';
const state = {
    token: '',
    info: {},
    permission: [],
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
                    const routes = generateRoutes(
                        asyncRoutes,
                        res.data.permissions
                    );
                    commit('USER_PERMISSION', routes);
                    console.log(routes);
                    resolve(routes);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
