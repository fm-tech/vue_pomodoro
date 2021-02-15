import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    setItems(state, { resource, items }) {
      state[resource].items = items
    },
    setItem(state, { resource, item }) {
      state[resource].item = item
    }
  },
  actions: {},
  modules: {}
})
