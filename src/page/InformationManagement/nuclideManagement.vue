<template>
  <div class="pageBox">
    <div class="pageName">核素管理</div>
    <div class="panelMain">
      <el-form :inline="true"  class="myForm">
        <el-form-item label="核素名称：" >
          <el-input v-model="nuclideName" placeholder="请输入核素名称"></el-input>
        </el-form-item>
        <el-form-item label="类别：" >
          <el-select v-model="type" placeholder="请选择类别">
            <el-option label="全部" value=""></el-option>
            <el-option label="放射源核素" value="0"></el-option>
            <el-option label="非密封性物质核素" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sreachList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" class="btn-add" @click="openView('')">添加</el-button>
        </el-form-item>
      </el-form>
      <div class="tableWrap">
        <el-table :data="tableData" border style="width: 100%"  height="100%" ref="multipleTable" class="myTableBox">
          <el-table-column type="index"  label="序号" align="center" width="60px" :index="getIndex">
          </el-table-column>
          <el-table-column prop="nuclideName" label="核素名称" align="center">
          </el-table-column>
          <el-table-column prop="chineseName" label="中文名称" align="center">
          </el-table-column>
          <el-table-column prop="halfTime" label="半衰期" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="dateUnit" label="单位" width="60px" align="center">
          </el-table-column>
          <el-table-column prop="shorthand" label="简写" width="60px" align="center">
          </el-table-column>
          <el-table-column prop="one" label="Ⅰ类" align="center">
          </el-table-column>
          <el-table-column prop="two" label="Ⅱ类" align="center">
          </el-table-column>
          <el-table-column prop="three" label="Ⅲ类" align="center">
          </el-table-column>
          <el-table-column prop="four" label="Ⅳ类" align="center">
          </el-table-column>
          <el-table-column prop="five" label="Ⅴ类" align="center">
          </el-table-column>
          <el-table-column prop="decayCycle" label="衰变周期" width="80" align="center">
          </el-table-column>
          <el-table-column prop="type" label="类别" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.type == 0 ? "放射源核素": '非密封性物质核素'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pm10AvgValue" label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="updateView(scope.row,true)">编辑</el-button>
              <el-button type="text" @click="deleteData(scope.row.id,true)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination ref="paginationObj" class="paginationBox" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>
    </div>
    <el-dialog :title="textMap" :visible.sync="dialogFormVisible" @close="closeDia" width="900px"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               class="myDialog"
    >
      <div class="form-box" element-loading-text="拼命加载中" :rules="rules">
        <el-form ref="editForm" :model="editForm" :rules="rules">
          <el-form-item label="pkId" hidden="true">
            <el-input v-model="editForm.id" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="核素名称：" prop="nuclideName">
            <el-input v-model="editForm.nuclideName" :readonly="canRead" placeholder="请输入核素名称"></el-input>
          </el-form-item>
          <el-form-item label="中文名称：">
            <el-input v-model="editForm.chineseName" :readonly="canRead" placeholder="请输入中文名称"></el-input>
          </el-form-item>
          <el-form-item label="半衰期：" prop="halfTime"  class="is-required">
            <el-input v-model="editForm.halfTime" :readonly="canRead" placeholder="请输入半衰期"></el-input>
          </el-form-item>
          <el-form-item label="单位：" prop="dateUnit" >
            <el-input v-model="editForm.dateUnit" :readonly="canRead" placeholder="请输入单位"></el-input>
          </el-form-item>
          <el-form-item label="简写：">
            <el-input v-model="editForm.shorthand" :readonly="canRead" placeholder="请输入简写"></el-input>
          </el-form-item>
          <el-form-item label="Ⅰ类：" prop="one" >
            <el-input v-model="editForm.one" :readonly="canRead" placeholder="请输入Ⅰ类"></el-input>
          </el-form-item>
          <el-form-item label="Ⅱ类：" prop="two" >
            <el-input v-model="editForm.two" :readonly="canRead" placeholder="请输入Ⅱ类"></el-input>
          </el-form-item>
          <el-form-item label="Ⅲ类：" prop="three" >
            <el-input v-model="editForm.three" :readonly="canRead" placeholder="请输入Ⅲ类"></el-input>
          </el-form-item>
          <el-form-item label="Ⅳ类：" prop="four" >
            <el-input v-model="editForm.four" :readonly="canRead" placeholder="请输入Ⅳ类"></el-input>
          </el-form-item>
          <el-form-item label="Ⅴ类：" prop="five" >
            <el-input v-model="editForm.five" :readonly="canRead" placeholder="请输入Ⅴ类"></el-input>
          </el-form-item>
          <el-form-item label="衰变周期：" prop="decayCycle" >
            <el-input v-model="editForm.decayCycle" :readonly="canRead" placeholder="请输入衰变周期"></el-input>
          </el-form-item>
          <el-form-item label="类别：" prop="type">
            <el-select v-model="editForm.type" placeholder="请选择类别">
              <el-option label="放射源核素" value="0"></el-option>
              <el-option label="非密封性物质核素" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
        <el-button  @click="dialogFormVisible=false">取消</el-button>
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
  name: 'nuclideManagement',
  data: function () {
    return {
      loadtext: '',
      tableData: [],
      deleteList: [],
      type: '',
      nuclideName: '',
      textMap: '新增', // 用来控制表格标题
      dialogFormVisible: false, // 用来控制是否显示弹出
      canRead: false, // 用来控制能否进行写入，false为可以写入，这里一般不会进行变更，没有查看详情操作
      editForm: {
        id: '', // 通过id判断是否为新增或更新
        nuclideName: '',
        chineseName: '',
        halfTime: '',
        dateUnit: '',
        shorthand: '',
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        decayCycle: '',
        type: ''
      },
      // 表单的数据验证
      rules: {
        nuclideName: [
          {required: true, message: '请输入核素名称', trigger: 'blur'},
          { min: 1, max: 10, message: '长度在 1 到 50 个字符', trigger: 'blur' }],
        halfTime: [{required: true, message: '请输入半衰期', trigger: 'blur'}],
        dateUnit: [{required: true, message: '请输入单位', trigger: 'blur'}],
        one: [{required: true, message: '请输入Ⅰ类', trigger: 'blur'}],
        two: [{required: true, message: '请输入Ⅱ类', trigger: 'blur'}],
        three: [{required: true, message: '请输入Ⅲ类', trigger: 'blur'}],
        four: [{required: true, message: '请输入Ⅳ类', trigger: 'blur'}],
        five: [{required: true, message: '请输入Ⅴ类', trigger: 'blur'}],
        decayCycle: [{required: true, message: '请输入衰变周期', trigger: 'blur'}],
        type: [{required: true, message: '请选择类别', trigger: 'change'}]
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
        name: this.nuclideName,
        type: this.type
      }
      myPageApi.getTNuclideInfoList(params).then(res => {
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
    },
    // 打开新增页面
    openView: function () {
      var _this = this
      _this.dialogFormVisible = true
      _this.textMap = '添加核素'
    },

    // 获得选中状态
    selectionChange: function (val) {
      this.deleteList = val
    },

    // 提交表单
    submitForm: function (editForm) {
      let _this = this
      if (_this.editForm.id == '') {
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
          console.info('进行了新增的请求')
          myPageApi.saveTNuclideInfo(_this.editForm).then(function (res) {
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
          myPageApi.updateTNuclideInfo(_this.editForm).then(function (res) {
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
        }
      })
    },
    // 点击编辑打开弹框后传一行的id进行查询后回显
    updateView: function (row) {
      let _this = this
      _this.editForm.id = row.id
      _this.editForm.nuclideName = row.nuclideName
      _this.editForm.chineseName = row.chineseName
      _this.editForm.halfTime = row.halfTime
      _this.editForm.dateUnit = row.dateUnit
      _this.editForm.shorthand = row.shorthand
      _this.editForm.one = row.one
      _this.editForm.two = row.two
      _this.editForm.three = row.three
      _this.editForm.four = row.four
      _this.editForm.five = row.five
      _this.editForm.decayCycle = row.decayCycle
      _this.editForm.type = row.type.toString()
      _this.dialogFormVisible = true
      _this.textMap = '编辑核素'
    },
    // 信息删除
    deleteData: function (id) {
      let _this = this
      _this.$confirm('此操作将删除该核素信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        let params = {
          pkId: id
        }
        myPageApi.removeTNuclideInfo(params).then(function (res) {
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
      this.dialogFormVisible = false
      this.editForm.nuclideName = ''
      this.editForm.chineseName = ''
      this.editForm.id = ''
      this.editForm.halfTime = ''
      this.editForm.dateUnit = ''
      this.editForm.shorthand = ''
      this.editForm.one = ''
      this.editForm.two = ''
      this.editForm.three = ''
      this.editForm.four = ''
      this.editForm.five = ''
      this.editForm.decayCycle = ''
      this.editForm.type = ''
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
