<template>
  <div class="pageBox">
    <div class="pageName">联系人管理</div>
    <div class="panelMain">
      <el-form :inline="true"  class="myForm">
        <el-form-item label="单位名称：" >
          <el-input v-model="unitName" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="人员姓名：" >
          <el-input v-model="userName" placeholder="请输入人员姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sreachList()">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tableWrap">
        <el-table :data="tableData" border style="width: 100%"  height="100%" class="myTableBox">
          <el-table-column type="index"  label="序号" align="center" width="70px" :index="getIndex">
          </el-table-column>
          <el-table-column prop="name" label="人员姓名" align="center">
          </el-table-column>
          <el-table-column prop="roleName" label="角色" align="center">
          </el-table-column>
          <el-table-column prop="regionName" label="所属区域" align="center">
          </el-table-column>
          <el-table-column prop="unitName" label="单位名称" align="center">
          </el-table-column>
          <el-table-column prop="department" label="部门名称" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="联系电话" align="center">
          </el-table-column>
          <el-table-column prop="sourceUnitName" label="关联涉源单位" align="center">
          </el-table-column>
        </el-table>
      </div>
      <pagination ref="paginationObj" class="paginationBox" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from './components/Pagination'
import myPageApi from '@/common/api/InformationManagement/index'
export default {
  components: {
    pagination
  },
  name: 'contactManager',
  data: function () {
    return {
      loadtext: '',
      tableData: [],
      userName: '',
      unitName: ''
    }
  },

  methods: {
    sreachList () {
      this.$refs.paginationObj.cur_page = 1
      this.init()
    },
    // 初始化查询
    init: function () {
      var params = {
        pageNum: this.$refs.paginationObj.cur_page,
        pageSize: this.$refs.paginationObj.cur_pageSize,
        unitName: this.unitName,
        userName: this.userName
      }
      myPageApi.getGridUserList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.$refs.paginationObj.count = res.data.totalCount
        }
      }).catch(err => {
        this.loadtext = '暂无数据'
      })
    },
    // 分页回调
    handleCurrentChange: function () {
      this.init()
    },
    paginationFunction: function () {
      this.init()
    },
    getIndex: function (index, value) {
      var _this = this
      let curPage = _this.$refs.paginationObj.cur_page
      let limitPage = _this.$refs.paginationObj.cur_pageSize
      return (index + 1) + (curPage - 1) * limitPage
    }
  },
  mounted: function () {
    this.sreachList()
  }
}
</script>

<style>
  .tableWrap{
    height: calc(100% - 120px);
    overflow-y: auto;
  }
  .el-table.myTableBox .cell{
    color: #333;
  }
  .el-table.myTableBox th .cell{
    color: #1A1E28;
  }
  .el-table.myTableBox thead.is-group th{
    background: #fafafa;
  }
  .paginationBox{
    text-align: right;
    margin-top: 20px;
  }
  .myTableBox.el-table--border td,.myTableBox.el-table--border th,.myTableBox.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right: none;
  }
  .myTableBox.el-table--border td .cell{
    color: #1A1E28;
  }
  .myTableBox .cell .el-button--text{
    color: rgba(25, 184, 255, 1);
  }
</style>
