import { createStore } from 'vuex'
import imageService from '@/service/image.service'

export default createStore({
  state: {
    images: [],
    totalCount: 0,
    imageData: []
  },
  getters: {
    imagesList: (state) => state.images,
    totalCount: (state) => state.totalCount,
    imageData: (state) => state.imageData,
    imageIndex: (state) => (id) => state.images.findIndex((x) => x.id === id),
    imageNav: (state) => (index) => {
      if (index < state.images.length && index > 0) {
        return state.images[index].id
      } else {
        return ''
      }
    }
  },
  mutations: {
    setImages (state, data) {
      state.images = data
    },
    setImageData (state, data) {
      state.imageData = data
    }
  },
  actions: {
    async fetchToken () {
      await imageService.getBearerToken()
    },
    async fetchImagesList ({ commit, dispatch }, pageNo) {
      try {
        const imageList = await imageService.getImagesList(pageNo)
        commit('setImages', imageList.data.pictures)
      } catch (err) {
        dispatch('Alert/error', err)
      }
    },
    async getImageData ({ commit, dispatch }, imageId) {
      try {
        const imageData = await imageService.getImage(imageId)
        commit('setImageData', imageData.data)
      } catch (err) {
        dispatch('Alert/error', err)
      }
    }
  },
  modules: {
  }
})
