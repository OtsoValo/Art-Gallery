<template>
  <div class="w-modal">
    <transition name="slide-fade">
      <div class="modal is-active" v-show="isActive">
        <div class="modal-background"></div>
        <div class="modal-content">
          <!-- Any other Bulma elements you want -->
          <p class="image is-4by3">
            <img :src="displaySrc">
          </p>
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
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .2s ease-in;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: scale(1.2);
    opacity: 0;
  }
</style>