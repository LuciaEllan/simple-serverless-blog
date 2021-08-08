import { createStore } from 'vuex'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = createStore({
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
    actions: {},

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    // strict: process.env.DEBUGGING
    // I had to disable strict mode because Firebase Auth modifies the current user
    // TODO: somehow change user handling method
    strict: false
  })

  return Store
}
