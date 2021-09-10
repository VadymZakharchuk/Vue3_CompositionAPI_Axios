<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header__info">
            <span>Author: {{ picData.author}}&nbsp;</span>
            <span>Camera: {{ picData.camera}}&nbsp;</span>
            <span>Tag: {{ picData.tags}}</span>
          </div>
          <div class="modal-header__scale">
            <input type="range" v-model="iScale" min="0" max="20" step="1">
          </div>
          <div class="modal-header__info">
            <button class="modal-header__info-btn">Share</button>
          </div>
          <div class="modal-header__close">
            <img src="@/assets/close.svg" alt="close" @click="$emit('close')">
          </div>
        </div>

        <div class="modal-body">
          <div class="modal-body__chevron">
            <img src="@/assets/chevron-left.svg" alt="left chevron" @click="prevImage">
          </div>
          <img class="modal-body__image" :src="picData.full_picture"  :width="iWidth" alt="" />
          <div class="modal-body__chevron">
            <img src="@/assets/chevron-right.svg" alt="right chevron" @click="nextImage">
          </div>
        </div>

        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, watch, onMounted, computed } from 'vue'

export default {
  props: {
    iData: {
      type: String
    }
  },
  setup (props) {
    const store = useStore()
    const iScale = ref(4)
    const iWidth = ref(300)
    const idNow = ref(props.iData)
    const picData = computed(() => store.getters.imageData)
    const nextImage = () => {
      const currentIndex = store.getters.imageIndex(idNow.value)
      if (store.getters.imageNav(currentIndex + 1)) {
        idNow.value = store.getters.imageNav(currentIndex + 1)
      }
    }
    const prevImage = () => {
      const currentIndex = store.getters.imageIndex(idNow.value)
      if (store.getters.imageNav(currentIndex - 1)) {
        idNow.value = store.getters.imageNav(currentIndex - 1)
      }
    }
    onMounted(() => {
      store.dispatch('getImageData', idNow.value)
    })
    watch(idNow, () => {
      store.dispatch('getImageData', idNow.value)
    })
    watch(iScale, () => {
      iWidth.value = iScale.value * 50
    })
    return {
      picData,
      nextImage,
      prevImage,
      iScale,
      iWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  color: darkblue;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &__info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &-btn {
      outline: none;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 36px;
      width: 72px;
      cursor: pointer;
    }
  }
  &__close {
    cursor: pointer;
  }
}

.modal-body {
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &__chevron {
    cursor: pointer;
  }
  &__image {
    object-fit: contain;
  }
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}
</style>
