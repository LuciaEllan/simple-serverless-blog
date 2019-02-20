import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    // modules: {
    //   example
    // },
    state: {
      currentUser: null,
      isAdmin: false
    },
    getters: {
      isWritableUser (state) {
        return state.currentUser && (state.isAdmin === true)
      },
      currentUserID (state) {
        return state.currentUser ? state.currentUser.uid : undefined
      }
    },
    mutations: {
      changeLoginStatus (state, user) {
        state.currentUser = user
      },
      changeAdminStatus (state, s) {
        state.isAdmin = s
      }
    },
    actions: {}
  })

  return Store
}
