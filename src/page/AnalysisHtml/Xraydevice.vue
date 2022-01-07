<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">用途统计</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">
        <el-form :inline="true" :model="searchForm" class="myForm">
          <el-form-item label="类别：" prop="category">
            <el-select
              clearable
              v-model="searchForm.category"
              size="small"
              filterable
              placeholder="请输入"
              class="handle-input mr10"
              style="width: 240px"
            >
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item label="发证时间：" prop="time">
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
      <div class="Xratable heXratable">
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
            :index="getIndex"
            width="60px"
          >
          </el-table-column>
          <el-table-column
            prop="purposeName"
            label="射线装置用途"
          ></el-table-column>
          <el-table-column prop="deviceNum" label="数量">
            <template slot-scope="scope">
              <span
                class="tablenum"
                @click="jumpunsealedradioactive(scope.row.purposeCode)"
                >{{ scope.row.deviceNum }}</span
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
  name: 'Xraydevice',
  components: {
    pagination
  },
  data () {
    return {
      searchForm: {
        regionCode: '',
        licenseIssuingTime: ['', ''],
        category: '',
        licenseAuthority: ''
      },
      regionOptions: [],
      issuingauthorityOptions: [],
      categoryOptions: [
        {
          value: '1',
          label: 'Ⅰ类源'
        },
        {
          value: '2',
          label: 'Ⅱ类源'
        },
        {
          value: '3',
          label: 'Ⅲ类源'
        }
      ],
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
      let params = {
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeStart: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[0] : '',
        licenseIssuingTimeEnd: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[1] : '',
        registPrefecture: this.searchForm.regionCode,
        category: this.searchForm.category,
        current: this.$refs.paginationObj.cur_page,
        size: this.$refs.paginationObj.cur_pageSize
      }
      listDownLoad.downloadFile(
        '/rayApparatus/exportDevicePurposeStatistics',
        params,
        'get',
        '.xls'
      )
    },
    // 获取表格数据
    gettablelist () {
      let params = {
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeStart: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[0] : '',
        licenseIssuingTimeEnd: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[1] : '',
        registPrefecture: this.searchForm.regionCode,
        category: this.searchForm.category,
        current: this.$refs.paginationObj.cur_page,
        size: this.$refs.paginationObj.cur_pageSize
      }
      noRegionalstatistics.regtablelist(params).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.$refs.paginationObj.count = res.data.totalCount
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
    jumpunsealedradioactive (pollutionCode) {
      this.$router.push({
        path: '/homeHtml/AnalysisHtml/Raydevice',
        query: {
          data: this.searchForm,
          industryCode: pollutionCode,
          formPage: 'yongtu',
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
