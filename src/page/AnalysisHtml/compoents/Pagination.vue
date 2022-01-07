<template>
  <el-pagination background
                 :current-page="cur_page"
                 :page-sizes="pageSizes"
                 :page-size="cur_pageSize"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 layout="total, prev, pager, next, sizes"
                 :total=count
                 :hide-on-single-page="false">
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['totalNum'],
  data: function () {
    return {
      cur_page: 1, // 当前页
      cur_pageSize: 10, // 当前分页单位
      count: this.totalNum ? this.totalNum : 0,
      pageSizes: [10, 20, 50]
    }
  },
  methods: {
    handleCurrentChange: function (val) {
      this.cur_page = val
      this.$emit('paginationFunction')
    },
    handleSizeChange: function (val) {
      this.cur_pageSize = val
      this.cur_page = 1
      this.$emit('paginationFunction')
    }
  }
}
</script>

<style scoped>

</style>
