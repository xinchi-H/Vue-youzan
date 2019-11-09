// 使用vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Address from 'js/addressService.js'

//创建Store实例
const store = new Vuex.Store({
    state: {
        lists: null,
    },
    mutations: {
        init(state, lists) {
            state.lists = lists
        },
        add(state, instance) {

        }
    },
    actions: {
        getLists({ commit }) {
            Address.list().then(res => {
                // store.commit('init', res.data.lists)
                commit('init', res.data.lists)
            })
        },
        addAction({ commit }) {
            Address.add()
        }
    },
})

export default store