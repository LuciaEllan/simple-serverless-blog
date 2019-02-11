import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import BlogConfig from '@/configs/blog-config'

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
      currentUser: null
    },
    getters: {
      isWritableUser (state) {
        return state.currentUser && (BlogConfig.writers.includes(state.currentUser.uid))
      },
      currentUserID (state) {
        return state.currentUser ? state.currentUser.uid : undefined
      }
    },
    mutations: {
      changeLoginStatus (state, user) {
        state.currentUser = user
      }
    },
    actions: {}
  })

  return Store
}
