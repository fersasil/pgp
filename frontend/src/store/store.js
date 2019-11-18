import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router/index'

Vue.use(Vuex);


const expireTimeDate = expireInSeconds => {
    const now = new Date();
    const expireTimeMiliseconds = now.getTime() + expireInSeconds * 1000;
    return new Date(expireTimeMiliseconds);
}

const saveLocalStorage = (data => {
    //get expireTime from user info
    data.expiresIn = expireTimeDate(data.expiresIn);

    const dataEncoded = btoa(JSON.stringify(data));

    //atob() btoa()

    localStorage.setItem('data', dataEncoded);
    // localStorage.setItem('expires', data.expiresIn);
});



export default new Vuex.Store({
    state: {
        user: {
            token: null,
            idUser: null,
            nickname: null,
            name: null
        }
    },
    mutations: {
        authUser(state, payload) {
            state.token = payload.token;
            state.idUser = payload.idUser;
            state.nickname = payload.nickname;
            state.name = name;
        },
        wipeUserInfo(state) {
            state.idToken = null;
            state.userId = null;
            state.userName = null;
            state.userInfo = null;
        },
    },
    actions: {
        login({ commit, dispatch }, userData) {
            commit('authUser', userData);

            dispatch('setLogoutTimer', 3600); // 1hora

            userData.expiresIn = 3600;
            saveLocalStorage(userData);

            router.push({ name: "dashboard" });
        },

        setLogoutTimer({ dispatch }, expiresIn) {
            setTimeout(_ => {
                dispatch('logout')
            }, expiresIn * 1000);
        },

        logout({commit}){
            commit('wipeUserInfo');
            //wipe storage too
            localStorage.removeItem("data");

            router.replace({ name: 'welcome' })
        }
    },
    getters: {

    }
});