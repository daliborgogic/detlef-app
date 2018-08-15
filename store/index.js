import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loading: false,
      posts: []
    },

    mutations: {
      setPosts (state, value) {
        state.posts = value
      },
      setLoading (state, value) {
        state.loading = value
      }
    }
  })
}

export default createStore
