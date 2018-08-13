import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: []
    },
    mutations: {
      setPosts (state, value) {
        state.posts = value
      }
    }
  })
}

export default createStore
