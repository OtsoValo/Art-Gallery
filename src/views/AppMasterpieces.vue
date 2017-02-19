<template>
  <div id="appMasterpieces">
    <div class="columns is-multiline is-mobile">
      <template v-for="smallmp in smallmps">
        <div class="atx-container column is-2">
          <div class="atx-mpbox">
            <img class="atx-mp" :src="smallmp.url" alt="">
          </div>
        </div>
      </template>
      <!--<div class="mp-stage-mask">
        <mp-card 
          class="mp-stage"
          :mpTitle="mpTitle"
          :mpSubTitle="mpSubTitle"
          :mpSrc="mpSrc"
          :mpContent="mpContent">
        </mp-card>
      </div>-->
    </div>
  </div>
</template>

<script>
  import MpCard from '../components/MpCard'
  export default {
    name: 'appMasterpieces',
    data: () => ({
      smallmps: [],
      mpTitle: '1kg',
      mpSubTitle: 'A Front-End Coder',
      mpSrc: '/api/masterpiece?id=1120',
      mpArtist: '',
      mpContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris.`
    }),
    components: {
      MpCard
    },
    mounted() {
      let self = this;
      this.$http.get('/api/smallmpsList').then(function (resp) {
        self.smallmps = resp.data.smallmps;
      })
    }
  }

</script>

<style scoped>
  .atx-container {}
  
  .atx-mpbox {
    position: relative;
    width: 100%;
    height: 240px;
    overflow: hidden;
  }
  
  .atx-mp:hover {
    cursor: pointer;
  }
  
  .atx-mp {
    /*height: 100%;*/
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .mp-stage-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, .6);
  }
  
  .mp-stage {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>