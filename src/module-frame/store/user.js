import {login, logout, profile} from "@/api/base/frame";
import {getToken, removeToken, setToken} from "@/utils/auth";

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },
    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar || "http://qexlqi5ka.hn-bkt.clouddn.com/fly.png";
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        LoginByUsername({commit}, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login({
                    username: username,
                    password: userInfo.password
                }).then(response => {
                    const data = response.data;
                    commit('SET_TOKEN', data.token);
                    setToken(data.token);
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                profile().then(response => {
                    const data = response.data;
                    commit('SET_ROLES', data.roles);
                    commit('SET_NAME', data.name);
                    commit('SET_AVATAR', data.avatar);
                    commit('SET_INTRODUCTION', data.introduction);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    // 登出
    LogOut({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                removeToken();
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 前端 登出
    FedLogOut({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            removeToken();
            resolve()
        })
    }

};

export default user;