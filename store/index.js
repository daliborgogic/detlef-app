import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      category: 'sticky',
      posts: [],
      post: [],
      postUpdate: {},
      postDelete: {},
      postNew: {},
      pageUpdate: {},
      gotNew: {
        show: false,
        state: 1
      }
    },

    mutations: {
      setCategory: (state, value) => state.category = value,
      setPosts: (state, value) => state.posts = value,
      setPost: (state, value) => state.post = value,
      setGotNew: (state, value) => state.gotNew = value
    },

    getters: {
      getCategory: state => {
        let s
        let value = state.category
        switch(value) {
          case(2):
            s = 'advertising'
            break
          case(3):
            s = 'fashion'
            break
          case(4):
            s = 'sports'
            break
          case(5):
            s = 'film'
            break
          default:
            s = 'sticky'
        }
        return s
      }
    }
  })
}

export default createStore
