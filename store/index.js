import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      filter: '*',
      posts: []
    },
    mutations: {
      setFilter (state, value) {
        state.filter = value
      },
      setPosts (state, value) {
        state.posts = value
      }
    }
  })
}

export default createStore
