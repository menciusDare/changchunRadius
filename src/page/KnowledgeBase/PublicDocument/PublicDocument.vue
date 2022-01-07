<template>
  <div class="pageBox">
    <div class="pageName">公共文档库</div>
    <div class="panelMain">
      <el-form :inline="true" class="myForm">
        <el-form-item label="文件名称："
                      :prop="form.fileName">
          <el-input
            placeholder="请输入文件名称"
            v-model="fileName"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="文件类型："
          :prop="form.fileType"
        >
          <el-select
            placeholder="请选择"
            v-model="fileType"
          >
            <el-option
              v-for="item2 in fileTypeList"
              :key="item2.value"
              :label="item2.label"
              :value="item2.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传时间：" prop="form.dateArray">
          <div class="block">
            <el-date-picker
              v-model="dateArray"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button @click="getList" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="alert"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="loadJsonFromFile"
            :file-list="fileList">
            <el-button  type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="tableWrap">
        <el-table :data="tableData" border
                  style="width: 100%;"
                  height="100%"
                  class="myTableBox">
          <el-table-column
            label="序号"
             width="80"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{(pageNumber - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="文件名称"
            align="center"
            prop="fileName">
          </el-table-column>
          <el-table-column
            label="文件类型"
            align="center"
            :formatter="formatFileType"
            prop="fileType">
          </el-table-column>
          <el-table-column
            label="上传时间"
            align="center"
            :formatter=" formatTime"
            prop="uploadTime">
          </el-table-column>
          <el-table-column
            label="上传人"
            align="center"
            prop=" createId">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="text"  @click="handleDownload(scope.$index, scope.row)">下载</el-button>
              <el-button type="text"  @click="handledelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="changePagination" style="margin-top: 25px; font-weight: 500">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageNumber"
                       :page-sizes="[10, 20, 50]"
                       :page-size="pageSize"
                       layout="total, prev, pager, next, sizes"
                       align='right'
                       :total="this.totalRow">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
/*  许可证变更申请查询 */
import SelfSearch from '../../../components/SearchCom/SelfSearch.vue'
import Api from '@/common/api/knowledgeBase/knowledgeBase/index.js'
import listDownLoad from '../../../common/listDownLoad'

export default {
  components: {SelfSearch},
  name: 'PublicDocument',
  data () {
    return {
      /* form表单项 */
      fileList: [],
      form: {
        dateArray: [],
        fileName: '',
        fileType: ''

      },
      dateArray: [],
      fileType: '',
      fileTypeList: [{value: 0, label: '法律法规'}, {value: 1, label: '标准规范'}, {value: 2, label: '导则'}, {
        value: 3,
        label: '通知'
      }, {value: 4, label: '通告文档'}, {value: 5, label: '其他'}],
      fileName: '',
      isShowDownloadBtn: false,

      /* 下拉框选择项 */
      optionList: {
        regionList: [],
        examineStatusList: [
          {value: '', label: '全部'},
          {value: '1', label: '待受理'},
          {value: '2', label: '已受理'},
          {value: '3', label: '审批通过'},
          {value: '4', label: '审批不通过'},
          {value: '5', label: '退回'}
        ]
      },
      search: '',
      pageNumber: 1, // 当前页
      pageSize: 10, // 每页大小
      totalRow: 0, // 总条数
      totalPage: 0, // 总页数
      input: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.getList()
  },
  mounted () {
  },
  methods: {

    handledelete: function (index, row) {
      let _this = this
      _this.$confirm('此操作将删除该核素信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        let param = row.pkId
        Api.deletePubDoc(param).then(function (res) {
          if (res.code === 0) {
            _this.$message.success('删除成功！')
            _this.getList()
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
    styleBack ({row, column, rowIndex, columnIndex}) {
      return 'border-right:none;font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;'
    },

    handleDownload (index, row) {
      console.log(row.downloadUrl)
      let para = row.downloadUrl
      let params = {
        pathUrl: para
      }
      // listDownLoad.downloadFile('usingUnit/industryExport', statisticsParam, 'post')
      // listDownLoad.downloadFile('usingUnit/industryExport', statisticsParam, 'get')
      listDownLoad.downloadFile('publicDocument/downLoad', params, 'formData', `.${row.downloadUrl.split('.')[1]}`)
    },
    // 格式化时间
    formatTime (row, column, cellValue) {
      let date = cellValue
      let dateee = new Date(date).toJSON()
      let res = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return res.slice(0, 16)
    },

    // 合规表文件类型
    formatFileType (row, column, cellValue) {
      let cur = ''
      switch (cellValue) {
        case 0:
          cur = '法律法规'
          break
        case 1:
          cur = '标准规范'
          break
        case 2:
          cur = '导则'
          break
        case 3:
          cur = '通知'
          break
        case 4:
          cur = '通告文档'

          break
        case 5:
          cur = '其他'
          break
        default:
          break
      }
      return cur
    },
    // 文件上传
    loadJsonFromFile (file, fileList) {
      let param = new FormData()
      let fileType = this.fileType
      param.append('fileType', fileType)
      param.append('file', new Blob([file]), file.name)
      Api.uploadFileKB(param).then(res => {
        if (res.code === 0) {
          console.log('res', res)
        }
      })
        .catch(err => {
          console.log('err', err)
        })
    },
    getList (param) {
      let query = {}
      if (param === undefined) {
        query.pageNum = this.pageNumber
        query.pageSize = this.pageSize
      } else {
        query = param
      }
      if (this.dateArray.length === 0) {
        query.startTime = ''
        query.endTime = ''
      } else {
        query.endTime = this.dateArray[1]
        query.startTime = this.dateArray[0]
      }
      query.fileName = this.fileName
      query.fileType = this.fileType
      Api.getQueryListKB(query).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.totalRow = res.data.totalCount // 总条数
          this.totalPage = res.data.totalPage // 总页数
          console.log('hhhhh', this.tableData)
        }
      })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 分页点击方法
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      var params = {
        pageNum: this.pageNumber,
        pageSize: this.pageSize
      }
      this.findAll(params)
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      var params = {
        pageNum: this.pageNumber,
        pageSize: this.pageSize
      }
      this.findAll(params)
    },
    // 分页方法
    findAll (params) {
      this.getList(params)
    }
  },
  // 文件上传
  loadJsonFromFile (file, fileList) {
    let param = new FormData()
    let fileType = this.fileType
    param.append('fileType', fileType)
    param.append('file', new Blob([file]), file.name)
    Api.uploadFileKB(param).then(res => {
      if (res.code === 0) {
        this.$message.success('上传成功!')
      }
    })
      .catch(_err => {
        this.$message.success('上传失败!')
      })
  },
  getList (param) {
    if (param === undefined) {
      param = {}
    }
    debugger
    let query = param
    query.pageNum = this.pageNumber
    query.pageSize = this.pageSize

    if (this.dateArray.length === 0) {
      query.startTime = ''
      query.endTime = ''
    } else {
      query.endTime = this.dateArray[1]
      query.startTime = this.dateArray[0]
    }
    query.fileName = this.fileName
    query.fileType = this.fileType

    Api.getQueryListKB(query).then(res => {
      if (res.code === 0) {
        this.tableData = res.data.list
        this.totalRow = res.data.totalCount // 总条数
        this.totalPage = res.data.totalPage // 总页数
        console.log('hhhhh', this.tableData)
      }
    })
      .catch(err => {
        console.log('err', err)
      })
  },

  /* 获取区域代码 */
  getRegionList () {
    this.optionList.getRegionList = []
  }

}
</script>
<style>
  .changePagination.el-pagination{
    font-weight: 500 !important;
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
    border-left: 1px solid rgba(0, 0, 0, 0.15);
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
    /*font-weight: 400;*/
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
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
</style>
