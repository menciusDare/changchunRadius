/**
* @components PaginationCom.vue
* @desc 分页组件
* @params pagination 对象
* @return
* @name apple
* @time 2021/9/2
*/
<template>
  <el-pagination
    :current-page="cur_page"
    :page-sizes="pageSizes"
    :page-size="cur_pageSize"
    @current-change="currentPage"
    @size-change="sizeChange"
    layout="total, prev, pager, next, sizes"
    :total="pagination.total"
    :hide-on-single-page="false"
  >
  </el-pagination>
</template>

<script>
import {EventBus} from '../../common/eventbus'

export default {
  name: 'PaginationCom',
  props: {
    pagination: Object
  },
  data: function () {
    return {
      cur_page: this.pagination.current ? this.pagination.current : 1, // 当前页
      cur_pageSize: this.pagination.size ? this.pagination.size : 10, // 当前分页单位
      count: this.pagination.total ? this.pagination.total : 0,
      pageSizes: [10, 20, 50]
    }
  },
  methods: {
    currentPage (page) {
      this.cur_page = page
      EventBus.$emit('changePage', ({cur_page: this.cur_page, cur_pageSize: this.cur_pageSize}))
    },
    sizeChange (page) {
      this.cur_pageSize = page
      this.cur_page = 1
      EventBus.$emit('changePage', ({cur_page: this.cur_page, cur_pageSize: this.cur_pageSize}))
    }
  }
}
</script>

<style>
  .changePagination.el-pagination{
    font-weight: 500;
  }
  .changePagination .el-pager li{
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    width: 32px;
    height: 32px;
    min-width: 32px;
    max-width: 32px;
    line-height: 32px;
    font-size: 14px;
    margin-left: 8px;
    padding: 0px;
    margin-right: 8px;
  }
  .changePagination .el-pager li.active{
    border: 1px solid #1890FF;
    color: rgba(24, 144, 255, 1);
  }
  .changePagination .el-pager li.active+li{
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  .changePagination.el-pagination .btn-next, .changePagination.el-pagination .btn-prev{
    width: 32px;
    height: 32px;
    min-width: 32px;
    max-width: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    color: rgba(0, 0, 0, 0.65);
  }
  .changePagination.el-pagination button,  .changePagination.el-pagination span:not([class*=suffix]){
    color: rgba(0, 0, 0, 0.65);
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }
  .changePagination .el-input--mini{
    font-size: 14px;
  }
  .changePagination .el-input--mini .el-input__inner{
    line-height: 32px;
    height: 32px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
</style>
