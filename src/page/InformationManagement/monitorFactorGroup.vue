<template>
  <div class="pageBox">
    <div class="pageName">监测因子组</div>
    <div class="panelMain">
      <!--搜索表单-->
      <el-form :inline="true" class="myForm">
        <el-form-item label="组名称：" >
          <el-input v-model="groupName" placeholder="请输入分组名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sreachList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" class="btn-add" @click="openView('')">添加</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <div class="tableWrap">
        <el-table :data="tableData" border style="width: 100%" height="100%" ref="multipleTable" class="myTableBox">
          <el-table-column type="index" width="80" label="序号" :index="getIndex" align="center">
          </el-table-column>
          <el-table-column prop="groupName" label="分组名称" align="center" width="300">
          </el-table-column>
          <el-table-column  label="包含的因子" align="center" prop="containPollutant">
          </el-table-column>
          <el-table-column  label="是否默认分组" align="center" prop="isDefaultName">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="updateView(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteData(scope.row.pkId,true)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination ref="paginationObj" class="paginationBox" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>
    </div>
    <el-dialog :title="textMap" :visible.sync="dialogFormVisible" @close="closeDia" width="800px"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               class="myDialogColumn"
    >
      <div class="form-box" :rules="rules" >
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="分组名称：" prop="groupName" class="is-required">
            <el-input v-model="form.groupName"
                      style="width:280px;" :readonly="canRead"></el-input>
          </el-form-item>
          <!--默认情况下id为-1 ，所以外增加 隐藏id-->
          <el-form-item label="pkId" prop="pkId" hidden="true">
            <el-input v-model="form.pkId"
                      style="width:300px;" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="监测因子：">
            <el-transfer
              :filter-placeholder="str"
              filterable
              :titles="['候选因子', '已选因子']"
              v-model="form.pollutants"
              :props="{key: 'pkId',label: 'pollutionName'}"
              :data="polluteList"
              ref="myTransfer">
            </el-transfer>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button  @click="dialogFormVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from './components/Pagination'
import myPageApi from '@/common/api/InformationManagement/index'
export default {
  name: 'monitorFactorGroup',
  components: {
    pagination
  },
  data: function () {
    return {
      loadtext: '',
      str: '请输入搜索内容',
      tableData: [],
      polluteList: [],
      deleteList: [],
      groupName: '',
      textMap: '添加监测因子组',
      dialogFormVisible: false,
      canRead: false,
      query: String,
      form: {
        pkId: '',
        groupName: '',
        pollutants: []
      },
      rules: {
        groupName: [
          { required: true, message: '请输入分组名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
    this.sreachList()
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
        groupName: this.groupName
      }
      myPageApi.getPollutantGroupList(params).then(res => {
        if (res.code === 0) {
          this.$refs.paginationObj.count = res.data.total
          this.tableData = res.data.records
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 打开增加页面
    openView: function (id) {
      var _this = this
      _this.dialogFormVisible = true
      this.getPolluteList(1)
    },

    getIndex: function (index) {
      var _this = this
      let curPage = _this.$refs.paginationObj.cur_page
      let limitPage = _this.$refs.paginationObj.cur_pageSize
      return (index + 1) + (curPage - 1) * limitPage
    },
    // 信息删除
    deleteData: function (id) {
      let _this = this
      _this.$confirm('此操作将删除该因子组信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        let params = {
          id: id
        }
        myPageApi.removePollutantGroup(params).then(function (res) {
          if (res.code === 0) {
            _this.$message.success('删除成功！')
            _this.$refs.paginationObj.cur_page = 1
            _this.init()
          } else {
            _this.$message.error(res.msg)
          }
        })
      }).catch(function () {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量删除
    deleteS: function () {
      var _this = this
      var ids = []
      if (_this.deleteList.length == 0) {
        _this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      } else {
        var temp = _this
        for (var i = 0; i < temp.deleteList.length; i++) {
          ids.push(temp.deleteList[i].pkId)
        }
        _this.deleteData(ids)
      }
    },

    // 数据查询一条，进行编辑，编辑视图
    updateView: function (row) { // flag为true则为新增，false为查看，这里一般情况下不会涉及到查看
      let _this = this
      _this.getCheackedPolluteList(row.pkId)
      _this.getPolluteList()
      _this.form.pkId = row.pkId
      _this.form.groupName = row.groupName
      _this.textMap = '编辑监测因子组'
      _this.dialogFormVisible = true
    },
    // 提交数据
    submitForm: function (form) {
      let _this = this
      if (_this.form.pkId == '') {
        console.log('即将进行新增')
        this.insertService(form)
      } else {
        console.log('编辑')
        this.updateService(form)
      }
    },
    // 查询因子
    getPolluteList: function () {
      var _this = this
      var params = {
        pageNum: 1,
        pageSize: 10000,
        pollutionName: '',
        pollutionCode: ''
      }
      myPageApi.pollutantList(params).then(function (res) {
        if (res.code === 0) {
          _this.polluteList = res.data.records
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    getCheackedPolluteList: function (id) {
      var params = {
        id: id
      }
      myPageApi.detailPollutantGroup(params).then((res) => {
        if (res.code === 0) {
          this.form.pollutants = res.data.pollutants
        }
      })
    },
    // 数据新增操作，并更新页面
    insertService: function (form) {
      var _this = this
      _this.$refs[form].validate(function (valid) {
        if (valid) {
          myPageApi.editPollutantGroup(_this.form).then(function (res) {
            if (res.code === 0) {
              _this.$message.success('提交成功！')
              _this.dialogFormVisible = false
              _this.sreachList()
            } else {
              _this.$message.error(res.msg)
            }
          }).catch(function (err) {
            console.log(err)
            _this.$message.info('提交失败！')
          })
        }
      })
    },
    // 数据更新操作，并更新页面
    updateService: function (form) {
      let _this = this
      _this.$refs[form].validate(function (valid) {
        if (valid) {
          myPageApi.editPollutantGroup(_this.form).then(function (res) {
            if (res.code === 0) {
              _this.$message.success('修改成功！')
              _this.dialogFormVisible = false
              _this.sreachList()
            } else {
              _this.$message.error(res.msg)
            }
          }).catch(function (err) {
            _this.$message.info('修改失败！')
          })
        } else {
          this.$message.error('修改失败！')
        }
      })
    },
    // 分页回调
    handleCurrentChange: function () {
      this.init()
    },
    paginationFunction: function () {
      this.init()
    },

    // 关闭弹框
    closeDia: function () {
      // 清空穿梭框中的内容
      this.$refs.form.resetFields()
      this.dialogFormVisible = false
      this.form.groupName = null
      this.form.pkId = ''
      this.form.pollutants = []
      // 清空穿梭框搜索内容
      if (this.$refs.myTransfer) {
        this.$refs.myTransfer.$children['0']._data.query = ''
        // 清空右边搜索
        this.$refs.myTransfer.$children['3']._data.query = ''
      }
    }
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
  .myTableBox.el-table--border td,.myTableBox.el-table--border th,.myTableBox.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right: none;
  }
  .myTableBox.el-table--border td .cell{
    color: #1A1E28;
  }
  .myTableBox .cell .el-button--text{
    color: rgba(25, 184, 255, 1);
  }
  .paginationBox{
    text-align: right;
    margin-top: 20px;
  }
</style>
