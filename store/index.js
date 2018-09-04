import Vuex from 'vuex'
import r2 from 'r2'
import cookieparser from 'cookieparser'

const createStore = () => {
  return new Vuex.Store({
    state: {
      gotIt: null,
      category: 'sticky',
      posts: [],
      gotNew: {
        show: false,
        state: 1
      }
    },

    mutations: {
      setGotIt: (state, value) => state.gotIt = value,
      setCategory: (state, value) => state.category = value,
      setPosts: (state, value) => state.posts = value,
      setGotNew: (state, value) => state.gotNew = value
    },

    actions: {
      async nuxtServerInit ({ commit }, { req }) {
        const featured = await r2(`https://${process.env.CMS_DOMAIN}/wp-json/wp/v2/posts?per_page=100`).response
        const posts = await featured.json()

        const mapPosts = posts.map(post => {
          const { id, title, slug, sticky, content, acf, better_featured_image } = post

          return {
            id,
            title: title.rendered,
            slug: slug,
            sticky,
            hide: acf.hide,
            content: content.rendered,
            categories: post.categories,
            featuredImage: better_featured_image,
            images: acf.gallery_images
          }
        })

        commit('setPosts', mapPosts)

        let privacy = false
        if (req.headers.cookie) {
          let parsed = cookieparser.parse(req.headers.cookie)
          privacy = JSON.parse(parsed.gotIt)
        }
        commit('setGotIt', privacy)
      }
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
