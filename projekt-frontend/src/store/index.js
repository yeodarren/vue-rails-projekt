import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user/index'
import teamModule from './modules/team/index'
import projectModule from './modules/project/index'

Vue.use(Vuex)

export default new Vuex.Store({  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userModule,
    team: teamModule,
    project: projectModule
  }
})
