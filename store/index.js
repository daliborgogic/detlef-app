import Vuex from 'vuex'
import r2 from 'r2'

const createStore = () => {
  return new Vuex.Store({
    state: {
      category: null,
      posts: []
    },

    mutations: {
      setCategory (state, value) {
        state.category = value
      },
      setPosts (state, value) {
        state.posts = value
      }
    },

    actions: {
      async nuxtServerInit ({commit}) {
        const featured = await r2(`https://${process.env.CMS}/wp-json/wp/v2/posts?featured=1`).response
        const posts = await featured.json()
        commit('setPosts', posts)
      }
    }
  })
}

export default createStore
