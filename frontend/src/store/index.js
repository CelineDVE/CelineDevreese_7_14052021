import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ourName: "Groupomania",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    copyright: (state) => {
      const currentYear = new Date().getFullYear();
      return ` © Copyright ${state.ourName} ${currentYear}`;
    },
  },
})
