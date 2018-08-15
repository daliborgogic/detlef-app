import Vuex from 'vuex'
import r2 from 'r2'

const createStore = () => {
  return new Vuex.Store({
    state: {
      category: 'featured',
      loading: false,
      posts: []
    },

    mutations: {
      setCategory (state, value) {
        state.category = value
      },
      setPosts (state, value) {
        state.posts = value
      },
      setLoading (state, value) {
        state.loading = value
      }
    },

    actions: {
      async nuxtServerInit ({commit}) {
        const featured = await r2(`https://${process.env.CMS}/wp-json/wp/v2/posts?per_page=100`).response
        const posts = await featured.json()
        commit('setPosts', posts)
        commit('setLoading', false)
      }
    }
  })
}

export default createStore
