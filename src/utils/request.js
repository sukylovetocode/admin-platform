import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        // 检测有无token,有就主动添加到我们的请求头上

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => {
        if (res.status === 200) {
            return Promise.resolve(res);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, params)
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
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
