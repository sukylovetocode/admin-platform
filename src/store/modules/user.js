import { userLogin } from '@/api/user'; // eslint-disable-line no-unused-vars
import { setCookies } from '@/utils/base';
const state = {
    token: '',
};

const mutations = {
    LOGIN: (state, token) => {
        state.token = token;
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
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
