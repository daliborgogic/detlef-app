import Vuex from 'vuex'
import r2 from 'r2'

const createStore = () => {
  return new Vuex.Store({
    state: {
      category: 'sticky',
      posts: [],
      post: [],
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

    actions: {
      async nuxtServerInit ({ commit }, { params, error }) {
        if (params.slug) {
          const res = await r2(`https://${process.env.CMS_DOMAIN}/wp-json/wp/v2/posts?slug=${params.slug}`).response
          const posts = await res.json()

          if (!Array.isArray(posts) || !posts.length) {
            // array does not exist, is not an array, or is empty
            error({ statusCode: 404, message: 'Post not found' })
          } else {
            const post = posts.map(p => {
              const { id, title, content, acf  } = p

              return {
                id,
                title: title.rendered,
                content: content.rendered,
                images: acf.gallery_images
              }
            })
            commit('setPost', post)
          }
        }
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
