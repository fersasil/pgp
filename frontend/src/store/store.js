import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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

    },
    actions: {

    },
    getters: {

    }
});