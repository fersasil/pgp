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
            state.user = {
                idUser: payload.data.idUser,
                nickname: payload.data.nickname,
                token: payload.data.token,
                name: payload.data.name
            }
        },
        wipeUserInfo(state) {
            state.idToken = null;
            state.userId = null;
            state.userName = null;
            state.userInfo = null;
        },
    },
    actions: {
        isLoggedIn({ commit }) {
            const encodedData = localStorage.getItem("data");

            if (!encodedData) {
                return
            }

            const decodedData = atob(encodedData);
            const data = JSON.parse(decodedData);
            data.expiresIn = new Date(data.expiresIn);

            const now = new Date();

            // console.log(JSON.parse(data))
            if (now >= data.expiresIn) {
                //wipe localstorage
                return;
            }

            commit('authUser', data);
            router.push({ name: 'Dashboard' });
        },
        
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
        userId(state){
            return state.user.userId;
        },

        userToken(state){
            return state.user.token;
        },

        userNickname(state){
            return state.user.nickname;
        },

        userName(state){
            return state.user.name;
        },

        user(state){
            return state.user;
        },

    }
});