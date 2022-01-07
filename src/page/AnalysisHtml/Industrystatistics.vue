<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">行业统计</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">
        <el-form :inline="true" :model="searchForm" class="myForm">
          <el-form-item label="所属区域：" prop="regionCode">
            <el-select
              clearable
              v-model="searchForm.regionCode"
              size="small"
              filterable
              placeholder="请输入"
              class="handle-input mr10"
              style="width: 240px"
            >
              <el-option
                v-for="item in regionOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发证机关：" prop="licenseAuthority">
            <el-select
              clearable
              v-model="searchForm.licenseAuthority"
              size="small"
              filterable
              placeholder="请输入"
              class="handle-input mr10"
              style="width: 240px"
            >
              <el-option
                v-for="item in issuingauthorityOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="添加时间：" prop="time">
            <el-date-picker
              v-model="searchForm.licenseIssuingTime"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="search"
              size="small"
              style="
                width: 115px;
                height: 35px;
                background: rgba(66, 139, 202, 1);
                border-color: rgba(66, 139, 202, 1);
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #ffffff;
                margin-top: -20px;
              "
              @click="gettablelist()"
              >查询</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="search"
              size="small"
              style="
                width: 115px;
                height: 35px;
                background: #ffffff;
                border-radius: 3px;
                border: 1px solid #428bca;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #428bca;
                margin-top: -20px;
              "
              @click="exportecal()"
              >导出</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="Xratable">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          empty-text="暂无数据"
          fit
          style="width: 100%; font-size: 16px"
          height="100%"
          :header-cell-style="tableHeaderColor"
          :cell-style="styleBack"
          :row-class-name="TableRowClassName"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60px"
          >
          </el-table-column>
          <el-table-column prop="industryName" label="行业名称">
          </el-table-column>
          <el-table-column prop="oneLevelCount" label="Ⅰ类源">
            <template slot-scope="scope">
              <span
                class="tablenum"
                @click="jumpunsealedradioactive(1, scope.row.industryCode)"
                >{{ scope.row.oneLevelCount }}</span
              ></template
            >
          </el-table-column>
          <el-table-column prop="twoLevelCount" label="Ⅱ类源">
            <template slot-scope="scope">
              <span
                class="tablenum"
                @click="jumpunsealedradioactive(2, scope.row.industryCode)"
                >{{ scope.row.twoLevelCount }}</span
              ></template
            >
          </el-table-column>
          <el-table-column prop="threeLevelCount" label="Ⅲ类源">
            <template slot-scope="scope">
              <span
                class="tablenum"
                @click="jumpunsealedradioactive(3, scope.row.industryCode)"
                >{{ scope.row.threeLevelCount }}</span
              ></template
            >
          </el-table-column>
          <el-table-column prop="totalCounta" label="合计">
            <template slot-scope="scope">
              <span
                class="tablenum"
                @click="jumpunsealedradioactive('', scope.row.industryCode)"
                >{{ scope.row.totalCount }}</span
              ></template
            >
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrap">
        <pagination
          ref="paginationObj"
          @handleCurrentChange="handleCurrentChange"
          @paginationFunction="paginationFunction"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '../AnalysisHtml/compoents/Pagination.vue'
import noRegionalstatistics from '../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics'
import downloadFile from '../../common/unit/DownloadFile'
import listDownLoad from '../../common/listDownLoad'

export default {
  name: 'Industrystatistics',
  components: {
    pagination
  },
  data () {
    return {
      searchForm: {
        regionCode: '',
        licenseIssuingTime: ['', ''],
        licenseAuthority: ''
      },
      regionOptions: [],
      issuingauthorityOptions: [],
      categoryOptions: [],
      tableData: []
    }
  },
  methods: {
    allinit () {
      this.getissuingauthority()
      this.getregion()
      this.gettablelist()
    },
    // 导出表格
    exportecal () {
      let derivationData = {
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeStart: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[0] : '',
        licenseIssuingTimeEnd: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[1] : '',
        regionCode: this.searchForm.regionCode,
        current: this.$refs.paginationObj.cur_page,
        size: this.$refs.paginationObj.cur_pageSize
      }
      listDownLoad.downloadFile(
        '/rayApparatus/exportIndustryDeviceStatistics',
        derivationData,
        'get',
        '.xls'
      )
    },
    // 获取表格数据
    gettablelist () {
      let newparams = {
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeStart: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[0] : '',
        licenseIssuingTimeEnd: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[1] : '',
        regionCode: this.searchForm.regionCode,
        current: this.$refs.paginationObj.cur_page,
        size: this.$refs.paginationObj.cur_pageSize
      }
      noRegionalstatistics.reguntablelist(newparams).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.records
          this.$refs.paginationObj.count = res.data.total
        }
      })
    },
    // 获取发证机关的接口
    getissuingauthority () {
      noRegionalstatistics.issuingauthfun().then((res) => {
        if (res.code == 0) {
          this.issuingauthorityOptions = res.data
        }
      })
    },
    // 获取区域接口
    getregion () {
      noRegionalstatistics.regionfun().then((res) => {
        if (res.code == 0) {
          this.regionOptions = res.data
        }
      })
    },
    jumpunsealedradioactive (deviceCategory, industryCode) {
      let deviceCategoryArry = []
      if (deviceCategory === '') {
        deviceCategoryArry = []
      } else {
        deviceCategoryArry.push(deviceCategory)
      }
      // console.log(deviceCategoryArry);
      // console.log(Object.assign({}, this.searchForm, {deviceCategory: deviceCategoryArry}));
      // debugger
      this.$router.push({
        path: '/homeHtml/AnalysisHtml/Raydevice',
        query: {
          data: Object.assign({}, this.searchForm, {deviceCategory: deviceCategoryArry}),
          industryCode: industryCode,
          formPage: 'hangye',
          toPageFirst: true
        }
      })
    },
    init () {
      this.$refs.paginationObj.count = 10
    },
    TableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return 'statistics-warning-row'
      } else {
        return ''
      }
    },
    styleBack ({ row, column, rowIndex, columnIndex }) {
      return 'border-right:none;font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;'
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;'
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'th'
      }
      return ''
    },
    handleCurrentChange () {
      this.gettablelist()
    },
    paginationFunction () {
      this.gettablelist()
    },
    getIndex (index, value) {
      let curPage = this.$refs.paginationObj.cur_page
      let limitPage = this.$refs.paginationObj.cur_pageSize
      // console.log(curPage, 'curPage')
      // console.log(limitPage, 'limitPage')
      return index + 1 + (curPage - 1) * limitPage
    }
  },
  mounted () {
    this.allinit()
  }
}
</script>

<style scoped>
@import "../../assets/Xraydevice/index.css";
</style>
