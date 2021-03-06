import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    // authId: '98St7Q8Zi2N9SPa5ahzssq9kbyp6'
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },

  getters: {
    authUser (state) {
      return state.users[state.authId]
    }
  },

  actions: {
    createPost (context, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId

      context.commit('setPost', {post, postId})
      context.commit('appendPostToThread', {threadId: post.threadId, postId})
      context.commit('appendPostToUser', {userId: post.userId, postId})
    }
  },

  mutations: {
    setPost (state, {post, postId}) {
      Vue.set(state.posts, postId, post)
    },

    appendPostToThread (state, {postId, threadId}) {
      const thread = state.threads[threadId]
      Vue.set(thread.posts, postId, postId)
    },

    appendPostToUser (state, {postId, userId}) {
      const user = state.users[userId]
      Vue.set(user.posts, postId, postId)
    }
  }
})
