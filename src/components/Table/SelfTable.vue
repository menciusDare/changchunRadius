<template>
    <div class="tableBox">
        <el-table :data="tableData" border  @cell-click="cellClick" :cell-style="cellStyle" height="100%" :default-sort = "{prop: 'index', order: 'ascending'}" class="changeTable">
            <el-table-column v-if="isSelected" type="selection" width="55"></el-table-column>
            <el-table-column v-if="isIndex" type="index" :index="getIndex" label="序号" align="center" width="80"></el-table-column>
            <el-table-column v-for="(item,index) in headerData" :key="index" align="center" :prop="item.value" :label="item.title" :sortable="item.isSortable">
              <template slot-scope="scope">
                  <div v-if="item.type === 'clickFile'" style="color:blue;cursor: pointer" @click="fileClick(scope.row)">{{scope.row[item.value]}}</div>
                  <div v-else>{{scope.row[item.value]}}</div>
              </template>
            </el-table-column>
            <el-table-column
                        v-if="isBtn"
                        label="操作"
                        align="center"
                        :btnList="btnList"
                    >
                        <template slot-scope="scope">
                            <!-- <component :is="isCZName" :btnList="btnList" :scope="scope" @onBtnClick="onBtnClick"></component> -->
                            <el-button type="text" v-for="(item,index) in btnList" :key="index" @click="onBtnClick(scope,item.name)">{{item.name}}</el-button>
                            <!-- <span v-for="(item,index) in btnList" :key="index" :scope="scope" @click="onBtnClick(scope,item.name)" style="margin:0 5px">{{item.name}}</span> -->
                        </template>
                    </el-table-column>
        </el-table>
        <div class="pagination-container" v-if="isPage">
            <el-pagination
                class="changePagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="total, prev, pager, next, sizes"
                :total="total"
            ></el-pagination>
        </div>
        <div></div>
    </div>
</template>
<script>
export default {

  name: 'tableCom',
  props: {
    tableData: {
      type: Array
    },
    headerData: {
      type: Array
    },
    getIndex:{
      type:Function
    },
    // isSortable:{
    //     type:Boolean,
    //     default:false
    // },
    btnList: {
      type: Array
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isBtn: {
      type: Boolean,
      default: true
    },
    isIndex: {
      type: Boolean,
      default: true
    },
    isPage: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    // 分页一页总条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 分页一页条数数组
    pageSizes: {
      type: Array
    },
    // 分页当前页
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {

    }
  },
  methods: {
    onBtnClick (scope, name) {
      this.$emit('onBtnClick', scope, name)
    },
    fileClick(row){
      this.$emit('fileClick', row)
    },
    cellClick (row, col, cell, event) {
      this.$emit('cellClick', row, col, cell, event)
    },
    cellStyle (row) {
      if (row.column.property == 'region' || row.column.label == '操作') {
        return 'color:blue;'
      }
    },
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
<style>
  .tableBox{
    height: 100%;
  }
.pagination-container{
    text-align: right;
    margin-top: 25px;
}
  .el-table.changeTable .cell{
    color: #333;
  }
  .el-table.changeTable th .cell{
    color: #1A1E28;
  }
  .el-table.changeTable thead.is-group th{
    background: #fafafa;
  }
  .el-table.changeTable{
    height: 100%;
  }
.el-table.changeTable thead.is-group th{
  background: #fafafa;
}
.el-table--border td, .el-table--border th{
    border-right:none;
}

.changeTable.el-table--border td,.changeTable.el-table--border th,.changeTable.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
  border-right: none;
}
.changeTable.el-table--border td .cell{
  color: #1A1E28;
}
  .changeTable .cell .el-button--text{
    color: rgba(25, 184, 255, 1);
  }
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
