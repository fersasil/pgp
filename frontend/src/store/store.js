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
    if(!data.expiresIn) data.expiresIn = 3600;
    
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
            nicknameUser: null,
            nameUser: null,
            cpfUser: null
        }
    },
    mutations: {
        authUser(state, payload) {
            state.user = {
                idUser: payload.data.idUser,
                nicknameUser: payload.data.nicknameUser,
                token: payload.data.token,
                nameUser: payload.data.nameUser,
                cpfUser: payload.data.cpfUser
            }
        },
        updateUser(state, payload){
            if(payload.nicknameUser)
                state.nameUser = payload.nameUser; 
            else if(payload.userNickname) 
                state.nicknameUser = payload.nicknameUser;
            
            saveLocalStorage(state);
        },
        wipeUserInfo(state) {
            state.user.token = null;
            state.user.idUser = null;
            state.user.nicknameUser = null;
            state.user.nameUser = null;
            state.user.cpfUser = null;
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

            if (now >= data.expiresIn) {
                localStorage.removeItem("data");    
                router.replace({ name: 'welcome' });
                return;
            }

            commit('authUser', data);
            router.replace({ name: 'Dashboard' });
        },
        
        login({ commit, dispatch }, userData) {
            commit('authUser', userData);

            dispatch('setLogoutTimer', 3600); // 1hora

            userData.expiresIn = 3600;
            saveLocalStorage(userData);

            router.replace({ name: "dashboard" });
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
        },

        updateUser({commit}, payload){
            const data = {};

            if(payload.nicknameUser)
                data.nameUser = payload.nameUser; 
            else if(payload.userNickname) 
                data.nicknameUser = payload.nicknameUser; 
            if(Object.keys(data).length > 0)
                commit("updateUser", data);
        }

    },
    getters: {
        idUser(state){
            return state.user.idUser;
        },

        userToken(state){
            return state.user.token;
        },

        userNickname(state){
            return state.user.nicknameUser;
        },

        nameUser(state){
            return state.user.name;
        },

        user(state){
            return state.user;
        },

    }
});