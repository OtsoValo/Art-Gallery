<template>
  <div class="w-modal">
    <transition name="slide-fade">
      <div class="modal is-active" v-show="isActive">
        <div class="modal-background"></div>
        <div class="modal-content scrollbar">
          <!-- Any other Bulma elements you want -->
          <img id="reallyImage" :src="displaySrc">
        </div>
        <button class="modal-close" @click="closeModal"></button>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      displaySrc: {
        type: String,
        default: 'http://bulma.io/images/placeholders/1280x960.png'
      }
    },
    data: () => ({
      isActive: false
    }),
    watch: {
      isShow(val) {
        this.isActive = val;
      }
    },
    methods: {
      closeModal() {
        this.$emit('closing');
      }
    },
    mounted() {
      this.isActive = this.isShow;
    }
  };

</script>

<style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all .2s ease-in;
  }
  
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: scale(1.2);
    opacity: 0;
  }
  
  .modal-content,
  .modal-card {
    position: relative;
    width: 96%;
    height: 100%;
  }
  #reallyImage{
    height: 100%;
    width: auto;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
</style>