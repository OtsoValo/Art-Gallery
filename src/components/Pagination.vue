<template>
  <div class="w-pagination">
    <nav class="pagination is-centered">
      <a class="pagination-previous" :class="{'is-disabled': isPrevDisabled}" @click="goPrevPage">上一页</a>
      <a class="pagination-next" :class="{'is-disabled': isNextDisabled}" @click="goNextPage">下一页</a>
      <ul class="pagination-list">
        <li v-for="i in totalPages">
          <a class="pagination-link" :class="{'is-current': page + 1 == i}" @click="goSpecPage(i)">{{i}}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      activePage: {
        type: Number,
        default: 0,
        required: true,
        validator: function (value) {
          return value >= 0;
        }
      },
      totalCount: {
        type: Number,
        required: true
      },
      pageSize: {
        type: Number,
        required: true
      }
    },
    data: () => ({
      isPrevDisabled: true,
      isNextDisabled: false,
      page: 0,
      totalPages: 0,
      lastIndex: 0,
    }),
    computed: {
    },
    watch: {
      page() {
        if (this.page <= 0) {
          this.isPrevDisabled = true;
        } else {
          this.isPrevDisabled = false;
        }
        if (this.page >= (this.totalPages - 1)) {
          this.isNextDisabled = true;
        } else {
          this.isNextDisabled = false;
        }
      },
      totalCount() {
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.lastIndex = this.totalPages + 1;
      }
    },
    methods: {
      goPrevPage() {
        this.page -= 1;
        this.$emit('paging', this.page);
      },
      goNextPage() {
        this.page += 1;
        this.$emit('paging', this.page);
      },
      goSpecPage(index) {
        this.page = index - 1;
        this.$emit('paging', this.page);
      }
    },
    mounted() {
      this.page = this.activePage;
    }
  };

</script>

<style scoped>
  .w-pagination {
    width: 600px;
    margin: 30px auto;
  }
</style>