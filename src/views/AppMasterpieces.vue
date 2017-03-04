<template>
  <div id="appMasterpieces" class="m-app-masterpieces">
    <transition-group name="smallmp" tag="section">
      <div v-for="smallmp in smallmps" :key="smallmp" class="w-smallmp-box">
        <img class="w-smallmp" :src="smallmp.url" alt="">
      </div>
    </transition-group>

    <pagination :active-page="pageIndex" :total-count="totalCount" :page-size="pageSize" @paging="pagingRequest"></pagination>
  </div>
</template>

<script>
  import Pagination from '../components/Pagination';
  const MPSLIST_SIZE = 50;
  export default {
    name: 'appMasterpieces',
    data: () => ({
      totalCount: 0,
      pageSize: MPSLIST_SIZE,
      pageIndex: 0,
      smallmps: []
    }),
    components: { Pagination },
    watch: {
    },
    methods: {
      pagingRequest(i) {
        this.fetchMpsList(i);
      },
      fetchMpsList(page, size = MPSLIST_SIZE) {
        this.$http.get('/api/smallmps/list', { params: { page: page, size: size } }).then((resp) => {
          this.smallmps = resp.data.listData;
          this.totalCount = resp.data.totalCount;
        });
      }
    },
    mounted() {
      this.fetchMpsList(0);
    }
  }

</script>

<style scoped>
  .smallmp-enter-active {
    position: absolute;
  }
  .smallmp-enter {
    transform: rotate(60deg) scale(0.6);
    opacity: 0;
  }
  .smallmp-leave-to {
    display: none;
  }
  .m-app-masterpieces > section {
    display: block;
    height: auto;
    overflow: hidden;
    max-width: 1100px;
    min-width: 630px;
    margin: 10px auto;
  }
  .w-smallmp-box {
    transition: all .6s;
    position: relative;
    box-sizing: border-box;
    float: left;
    width: 100px;
    height: 100px;
    margin-top: 10px;
    margin-left: 10px;
    overflow: hidden;
    background-color: #e9e9e9;
    border-radius: 4px;
    box-shadow: 2px 2px 6px #ddd;
    cursor: pointer;
  }
  .w-smallmp-box:hover {
    box-shadow: 4px 4px 8px #999;
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