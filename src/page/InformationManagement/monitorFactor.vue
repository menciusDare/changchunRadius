<template>
  <div class="pageBox">
    <div class="pageName">监测因子</div>
    <div class="panelMain">
      <el-form :inline="true" class="myForm">
        <el-form-item label="名称：" >
          <el-input v-model="pollutionName" placeholder="请输入监测因子名称"></el-input>
        </el-form-item>
        <el-form-item label="编码：" >
          <el-input v-model="pollutionCode" placeholder="请输入因子编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sreachList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" class="btn-add" @click="openView('')">添加</el-button>
        </el-form-item>
      </el-form>
      <div class="tableWrap">
        <el-table :data="tableData" border style="width: 100%" height="100%" class="myTableBox">
          <el-table-column type="index"  label="序号" align="center" width="70px" :index="getIndex">
          </el-table-column>
          <el-table-column prop="pollutionName" label="监测因子名称" align="center">
          </el-table-column>
          <el-table-column prop="pollutionEnglishName" label="英文名称" align="center">
          </el-table-column>
          <el-table-column prop="pollutionCode" label="监测因子编码" align="center">
          </el-table-column>
          <el-table-column prop="pollutionUnit" label="单位" align="center">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" align="center">
          </el-table-column>
          <el-table-column prop="pm10AvgValue" label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="updateView(scope.row,true)">编辑</el-button>
              <el-button type="text" @click="deleteData(scope.row.pkId,true)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination ref="paginationObj" class="paginationBox" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>
    </div>
    <el-dialog class="myDialog" :title="textMap" :visible.sync="dialogFormVisible" @close="closeDia" width="900px" :modal-append-to-body="false" :close-on-click-modal="false">
      <div class="form-box" element-loading-text="拼命加载中" :rules="rules">
        <el-form ref="editForm" :model="editForm" :rules="rules">
          <el-form-item label="监测因子名称：" prop="pollutionName" class="is-required">
            <el-input v-model="editForm.pollutionName" :readonly="canRead" placeholder="请输入监测因子名称"></el-input>
          </el-form-item>
          <el-form-item label="pkId" prop="pkId" hidden="true">
            <el-input v-model="editForm.pkId" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="英文名称：" >
            <el-input v-model="editForm.pollutionEnglishName" :readonly="canRead" placeholder="请输入英文名称"></el-input>
          </el-form-item>
          <el-form-item label="监测因子编码：" prop="pollutionCode" class="is-required">
            <el-input v-model="editForm.pollutionCode" :readonly="canRead" placeholder="请输入监测因子编码"></el-input>
          </el-form-item>
          <el-form-item label="单位：" prop="pollutionUnit" >
            <el-input v-model="editForm.pollutionUnit" :readonly="canRead" placeholder="请输入单位"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
        <el-button @click="dialogFormVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from './components/Pagination'
import myPageApi from '@/common/api/InformationManagement/index'
export default {
  components: {
    pagination
  },
  name: 'monitorFactor',
  data: function () {
    return {
      loadtext: '',
      pollutantTypeList: [],
      tableData: [],
      deleteList: [],
      pollutantNameList: [],
      pollutantTy: '',
      fkPollutanttypeid: '',
      pollutionCode: '',
      pollutionName: '',
      poName: '',
      poCode: '',
      NameAndCode: [], // 名称和编码
      textMap: '新增', // 用来控制表格标题
      dialogFormVisible: false, // 用来控制是否显示弹出
      canRead: false, // 用来控制能否进行写入，false为可以写入，这里一般不会进行变更，没有查看详情操作
      editForm: {
        pkId: '', // 通过id判断是否为新增或更新
        pollutionName: '',
        pollutionEnglishName: '',
        pollutionCode: '',
        pollutionUnit: ''
      },
      // 表单的数据验证
      rules: {
        pollutionName: [
          {required: true, message: '请输入监测因子名称', trigger: 'blur'},
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
        ],
        pollutionCode: [{required: true, message: '请输入监测因子编码', trigger: 'blur'},
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
        ],
        pollutionUnit: [{required: true, message: '请输入单位', trigger: 'blur'},
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
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
        pollutionName: this.pollutionName,
        pollutionCode: this.pollutionCode
      }
      myPageApi.pollutantList(params).then(res => {
        if (res.code === 0) {
          if (!res.data.total) {
            this.loadtext = '暂无数据'
          }
          this.$refs.paginationObj.count = res.data.total
          this.tableData = res.data.records
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
    },
    // 打开新增页面
    openView: function () {
      var _this = this
      _this.dialogFormVisible = true
      _this.textMap = '添加监测因子'
    },

    // 获得选中状态
    selectionChange: function (val) {
      this.deleteList = val
    },

    // 提交表单
    submitForm: function (editForm) {
      let _this = this
      if (_this.editForm.pkId === '') {
        console.log('即将进行新增')
        this.insertService(editForm)
      } else {
        console.log('编辑')
        this.updateService(editForm)
      }
    },

    // 数据新增操作，并更新页面
    insertService: function (editForm) {
      var _this = this
      _this.$refs[editForm].validate(function (valid) {
        if (valid) {
          myPageApi.pollutantAdd(_this.editForm).then(function (res) {
            if (res.code === 0) {
              _this.$message.success('提交成功！')
              _this.dialogFormVisible = false
              _this.$refs.paginationObj.cur_page = 1
              _this.init()
            } else {
              _this.$message.error(res.msg)
            }
          }).catch(function (err) {
            console.log(err)
            // self.message = "连接服务器失败！"
            _this.$message.info('提交失败！')
          })
        }
      })
    },
    // 数据更新操作，并更新页面
    updateService: function (editForm) {
      var _this = this
      _this.$refs[editForm].validate(function (valid) {
        if (valid) {
          myPageApi.pollutantUpdate(_this.editForm).then(function (res) {
            if (res.code === 0) {
              _this.$message.success('修改成功！')
              _this.dialogFormVisible = false
              _this.$refs.paginationObj.cur_page = 1
              _this.init()
            } else {
              _this.$message.error(res.msg)
            }
          }).catch(function (err) {
            console.log(err)
            _this.$message.info('修改失败！')
          })
        } else {
          _this.$message.error('修改失败！')
        }
      })
    },
    // 点击编辑打开弹框后传一行的id进行查询后回显
    updateView: function (row) {
      let _this = this
      _this.dialogFormVisible = true
      _this.textMap = '编辑监测因子'
      _this.editForm.pkId = row.pkId
      _this.editForm.pollutionName = row.pollutionName
      _this.editForm.pollutionEnglishName = row.pollutionEnglishName
      _this.editForm.pollutionCode = row.pollutionCode
      _this.editForm.pollutionUnit = row.pollutionUnit
    },
    // 信息删除
    deleteData: function (id) {
      let _this = this
      _this.$confirm('此操作将删除该监测因子信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        let params = {
          id: id
        }
        myPageApi.pollutantRemove(params).then(function (res) {
          if (res.code == 0) {
            _this.$message.success('删除成功！')
            _this.$refs.paginationObj.cur_page = 1
            _this.init()
          } else {
            _this.$message.error(res.msg)
          }
        })
      }).catch(function () {
        _this.$message({
          showClose: true,
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

    // 关闭弹框
    closeDia: function () {
      this.$refs.editForm.resetFields()
      this.editForm.pollutionName = ''
      this.editForm.pollutionCode = ''
      this.editForm.pollutionUnit = ''
      this.editForm.pollutionEnglishName = ''
      this.editForm.pkId = ''
      this.init()
    },

    /* 污染源来源类型 加载 */
    pollutantTyList () {
      var that = this
      that.$axios.get(
        '/api-manage/pollutant/pollutantTyList'
      ).then(
        function (res) {
          if (res.code == 0) {
            that.pollutantTypeList = res.data
          }
        }
      )
    },

  },

  mounted: function () {
    this.sreachList()
    this.pollutantTyList()
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
  .paginationBox{
    text-align: right;
    margin-top: 20px;
  }
.myTableBox .cell .el-button--text{
  color: rgba(25, 184, 255, 1);
}
</style>
