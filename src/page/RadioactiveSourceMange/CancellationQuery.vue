<template>
  <div class="pageBox">
    <div class="pageName">许可证注销申请查询</div>
    <div class="panelMain">
        <el-form :inline="true" class="myForm">
  <el-form-item label="单位名称：" prop="form.unitName">
          <el-input v-model="unitName" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="许可证号：" prop="form.licenseNum">
          <el-input v-model="licenseNum" placeholder="请输入许可证号"></el-input>
        </el-form-item>
        <el-form-item label="所属区域：" prop="form.registPrefecture">
          <el-select v-model="registPrefecture" clearable placeholder="请选择">

            <el-option
              v-for="item in belongAreaList"
              :key="item.pkId"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提交时间：" prop="form.submitDate">
          <div class="block">
            <el-date-picker
              v-model="submitDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="审核状态：" prop="form.status">
          <el-select v-model="status" clearable placeholder="请选择">
            <!-- <el-option :key="-1" :label="'请选择'" :value="-1"></el-option> -->
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button  @click="exportExcel" >导出</el-button>
        </el-form-item>
      </el-form>
      <div class="tableWrap">
        <el-table :data="tableData" border style="width: 100%" height="100%" class="myTableBox">
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
            label="单位名称"
            align="center"
            prop="unitName">
          </el-table-column>
          <el-table-column
            label="许可证号"
            width="180"
            align="center"
            prop="licenseCode">
          </el-table-column>
          <el-table-column
            label="所属区域"
            width="180"
            align="center"
            prop="regionName">
          </el-table-column>
          <el-table-column
            label="提交时间"
            width="180"
            align="center"
            prop="createTime">
          </el-table-column>
          <el-table-column
            label="审核状态"
            width="130"
            align="center"
            prop="statusName">
          </el-table-column>
          <el-table-column
            label="批准文号"
            width="180"
            align="center"
            prop="approvalCode">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <el-pagination class="changePagination"
                  @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNumber"
                     :page-sizes="[10, 15, 20, 30]"
                     :page-size="pageSize"
                   layout="total, prev, pager, next, sizes"
                     :total="this.totalRow"
                     align='right'
                   :hide-on-single-page="false">
    </el-pagination>

    </div>

  </div>
</template>

<script>
/*  许可证变更申请查询 */
import ApiRS from '@/common/api/RadioactiveSourceMange/companyIntroduce/TypeRange.js'
import Api from '@/common/api/AnalysisHtml/radiusOriginAnalysis/index.js'
// import axios from 'axios'
import listDownLoad from '@/common/listDownLoad'
// import downloadFile from '@/common/downFile'
export default {
  components: {},
  name: 'CancellationQuery',
  data () {
    return {
      submitDate: [],
      status: '',
      statusList: [
        { value: '1', label: '待受理' },
        { value: '2', label: '已受理' },
        { value: '3', label: '审批通过' },
        { value: '4', label: '审批不通过' },
        { value: '5', label: '退回' }
      ],
      form: {
        licenseNum: '',
        unitName: '',
        registPrefecture: ''
      },
      licenseNum: '',
      unitName: '',
      registPrefecture: '',
      belongAreaList: [],
      updatedKey: true,
      search: '',
      pageNumber: 1, // 当前页
      pageSize: 10, // 每页大小
      totalRow: 0, // 总条数
      totalPage: 0, // 总页数
      input: '',
      /* 表格数据 */
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  created () {
    this.getAreaListData()
  },
  mounted () {
    this.getList()
    // this.getRegionList()
  },
  methods: {
    styleBack ({ row, column, rowIndex, columnIndex }) {
      return 'border-right:none;font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;'
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;'
    },
    handleClick (row) {
      this.$router.push({
        path: '/homeHtml/radioactiveSourceMange/companyIntroduceTab',
        query: {
          id: row.unitId,
          page: 'CancellationQuery'
        }
      })
    },
    // 导出
    exportExcel (params) {
      let para = {}
      if (params !== undefined && Object.keys(params).length > 0) {
        para.applyType = 5
        para.pageNum = params.pageNum ? params.pageNum : this.pageNumber
        para.pageSize = params.pageSize ? params.pageSize : this.pageSize
        para.endTime = this.submitDate[1] ? this.submitDate[1] : ''
        para.startTime = this.submitDate[0] ? this.submitDate[0] : ''
        para.licenseNum = this.licenseNum
        para.registPrefecture = this.registPrefecture
        para.status = this.status
        para.unitName = this.unitName
      } else if (params === undefined) {
        let params = {}
        params.pageNum = params.pageNum ? params.pageNum : this.pageNumber
        params.pageSize = params.pageSize ? params.pageSize : this.pageSize
        params.applyType = 5
        params.endTime = this.submitDate[1] ? this.submitDate[1] : ''
        params.startTime = this.submitDate[0] ? this.submitDate[0] : ''
        params.licenseNum = this.licenseNum
        params.registPrefecture = this.registPrefecture
        params.status = this.status
        params.unitName = this.unitName
        para = params
      }

      listDownLoad.downloadFile('/licenseManagement/exportLicenses', para, 'post', `.xlsx`)
    },
    getAreaListData () {
      Api.getAreaList().then(res => {
        if (res.code === 0) {
          this.belongAreaList = res.data
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
      let params = {
        pageNum: this.pageNumber,
        pageSize: this.pageSize
      }
      this.findAll(params)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.pageNumber = val
      let params = {
        pageNum: this.pageNumber,
        pageSize: this.pageSize
      }
      this.findAll(params)
    },
    // 分页方法
    findAll (params) {
      // 获取数据接口（调用封装的接口）
      this.getList(params)
    },
    getList (params) {
      let para = {}
      if (params !== undefined && Object.keys(params).length > 0) {
        para.applyType = 5
        para.pageNum = params.pageNum ? params.pageNum : this.pageNumber
        para.pageSize = params.pageSize ? params.pageSize : this.pageSize
        para.endTime = this.submitDate[1] ? this.submitDate[1] : ''
        para.startTime = this.submitDate[0] ? this.submitDate[0] : ''
        para.licenseNum = this.licenseNum
        para.registPrefecture = this.registPrefecture
        para.status = this.status
        para.unitName = this.unitName
      } else if (params === undefined) {
        let params = {}
        params.pageNum = params.pageNum ? params.pageNum : this.pageNumber
        params.pageSize = params.pageSize ? params.pageSize : this.pageSize
        params.applyType = 5
        params.endTime = this.submitDate[1] ? this.submitDate[1] : ''
        params.startTime = this.submitDate[0] ? this.submitDate[0] : ''
        params.licenseNum = this.licenseNum
        params.registPrefecture = this.registPrefecture
        params.status = this.status
        params.unitName = this.unitName
        para = params
      }
      console.log('test', para)
      ApiRS.getCancellationQueryList(para).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.totalRow = res.data.totalCount // 总条数
          this.totalPage = res.data.totalPage // 总页数
        }
        // this.updatedKey = !this.updatedKey
      }).catch(err => {
        console.log('err', err)
      })
    },

    onSearch () {
      this.pagination.current = 1
      this.init()
    },

    changeTableButton (item, data) {
      if (item.itemButton.id === 'chakan') {

      }
    }

  }
}
</script>

<style >
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
</style>
