import axios from 'axios';

axios.defaults.timeout = 10000; // 请求超时

axios.defaults.headers.post['Context-Type'] =
    'application/x-www-form-urlencodedcharset=UTF-8'; // 设置post请求头

axios.interceptors.request.use(
    (config) => {
        // 检测有无token,有就主动添加到我们的请求头上
        // const token = this.$store.user.state.token;
        // if (token) {
        //     config.headers.Authorization = token;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => {
        Promise.resolve(res);
        // if (res.status === 200) {
        //     return Promise.resolve(res);
        // } else {
        //     return Promise.reject(res);
        // }
    },
    (error) => {
        Promise.reject(error);
    }
);

export function get(url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, params, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
