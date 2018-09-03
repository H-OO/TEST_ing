import Vue from 'vue'
import Vuex from 'vuex'
import T1 from './modules/T1'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    T1
  }
})
