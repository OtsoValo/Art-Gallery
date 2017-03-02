<template>
  <div id="appMasterpieces" class="m-app-masterpieces">
    <template v-for="smallmp in smallmps">
      <div class="w-smallmp-box">
        <img class="w-smallmp" :src="smallmp.url" alt="">
      </div>
    </template>
  </div>
</template>

<script>
  const size = 8;
  export default {
    name: 'appMasterpieces',
    data: () => ({
      totalCount: 0,
      pageIndex: 0,
      smallmps: []
    }),
    components: {
      // MpCard
    },
    methods: {
      nextPage() {

      },
      prevPage() {

      }
    },
    mounted() {
      let self = this;
      this.$http.get('/api/smallmps/list', { params: { page: 0, size: 20 } }).then((resp) => {
        self.smallmps = resp.data.listData;
        self.totalCount = resp.data.totalCount;
      });
    }
  }

</script>

<style scoped>
  .m-app-masterpieces {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: auto;
    overflow-x: hidden;
    max-width: 1050px;
    min-width: 630px;
    margin: 10px auto;
  }
  
  .w-smallmp-box {
    position: relative;
    box-sizing: border-box;
    float: left;
    width: 200px;
    height: 200px;
    margin-top: 10px;
    overflow: hidden;
    background-color: #eee;
    border-radius: 4px;
    box-shadow: 2px 2px 6px #ddd;
  }
  
  .w-smallmp-box:hover {
    box-shadow: 4px 4px 12px #999;
  }
  
  .w-smallmp {
    position: absolute;
    display: block;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  @media screen and (min-width: 720px) {
    .w-smallmp-box {
      /*width: 25%;*/
    }
  }
</style>