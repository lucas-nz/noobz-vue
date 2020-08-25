import Axios from "axios";
import {Message} from "element-ui";
import store from "@/store";
import {getToken} from "@/utils/auth";

const instance = Axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000
});

instance.interceptors.request.use(
    config => {
        console.log(store);
        console.log(config.headers["Authentication"]);
        console.log(getToken());
        return config
    },
    error => {
        console.log(error);
        Promise.reject(error)
    }
);

instance.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error);
        Message.error(error.message)
    }
);

export const createAPI = (url, method, data) => {
    let config = {};
    if (method === 'get') {
        config.params = data;
    } else {
        config.data = data;
    }
    return instance({
        url,
        method,
        ...config
    })
};

export const createFormAPI = (url, method, data) => {
    let config = {};
    config.data = data;
    config.headers = {
        'Cache-Control': 'no-cache',
        'Content-type': 'application/x-www-form-urlencoded'
    };

    config.responseType = 'json';
    config.transformRequest = [
        function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }
    ];
    return instance({
        url,
        method,
        ...config
    })
};

