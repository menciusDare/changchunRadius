<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">区域统计</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">
        <el-form :inline="true" :model="searchForm" class="myForm">
          <el-form-item label="行业分类：" prop="industryCategory">
            <el-select
              clearable
              v-model="searchForm.industryCategory"
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
          <el-form-item label="单位状态：" prop="unitState">
            <el-select
              clearable
              v-model="searchForm.unitState"
              size="small"
              filterable
              placeholder="请输入"
              class="handle-input mr10"
              style="width: 240px"
            >
              <el-option
                v-for="item in unitstatusOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发证时间：" prop="time">
            <el-date-picker
              v-model="searchForm.licenseIssuingTimeStart"
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
          fit
          style="width: 100%; font-size: 16px"
          height="100%"
          empty-text="暂无数据"
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
          <el-table-column prop="distract" label="区域"> </el-table-column>
          <el-table-column prop="count" label="单位总数">
            <template slot-scope="scope">
              <span
                class="tablenum"
                @click="jumpnucleartechnology(searchForm, '', 2,scope.row.distractCode)"
                >{{ scope.row.count }}</span
              ></template
            >
          </el-table-column>
          <el-table-column prop="keyPointCount" label="重点单位">
            <template slot-scope="scope">
              <span
                class="tablenum"
                @click="jumpnucleartechnology(searchForm, 1, 2,scope.row.distractCode)"
                >{{ scope.row.keyPointCount }}</span
              ></template
            >
          </el-table-column>
          <el-table-column prop="nonKeyCount" label="非重点单位">
            <template slot-scope="scope">
              <span
                class="tablenum"
                @click="jumpnucleartechnology(searchForm, 0, 2,scope.row.distractCode)"
                >{{ scope.row.nonKeyCount }}</span
              ></template
            >
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="pagination-wrap">
        <pagination
          ref="paginationObj"
          @handleCurrentChange="handleCurrentChange"
          @paginationFunction="paginationFunction"
        ></pagination>
      </div> -->
    </div>
  </div>
</template>

<script>
// <<<<<<< HEAD
// import pagination from '../AnalysisHtml/compoents/Pagination.vue'
// import noRegionalstatistics from '../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics'
// import downloadFile from '../../common/unit/DownloadFile'
// =======
import pagination from '../AnalysisHtml/compoents/Pagination.vue'
import noRegionalstatistics from '../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics'
import listDownLoad from '@/common/listDownLoad'

export default {
  name: 'noRegionalstatistics',
  components: {
    pagination
  },
  data () {
    return {
      searchForm: {
        industryCategory: '',
        licenseAuthority: '',
        licenseIssuingTimeStart: [],
        registPrefecture: '',
        unitState: ''
      },
      regionOptions: [],
      issuingauthorityOptions: [],
      categoryOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      unitstatusOptions: [],
      tableData: []
    }
  },
  methods: {
    allinit () {
      this.getindustryclasslist()
      this.getissuingauthority()
      this.getunitstatusfun()
      this.gettablelist()
    },
    // 导出表格
    exportecal () {
      var licenseIssuingTimeStart = ''
      var licenseIssuingTimeEnd = ''
      if (this.searchForm.licenseIssuingTimeStart == null) {
        this.searchForm.licenseIssuingTimeStart = []
      }
      if (this.searchForm.licenseIssuingTimeStart.length == '0') {
        var licenseIssuingTimeStart = ''
        var licenseIssuingTimeEnd = ''
      } else {
        var licenseIssuingTimeStart =
          this.searchForm.licenseIssuingTimeStart[0]
        var licenseIssuingTimeEnd = this.searchForm.licenseIssuingTimeStart[1]
      }
      var params = {
        industryCategory: this.searchForm.industryCategory,
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeStart: licenseIssuingTimeStart,
        licenseIssuingTimeEnd: licenseIssuingTimeEnd,
        registPrefecture: this.searchForm.registPrefecture,
        // <<<<<<< HEAD
        //         unitState: this.searchForm.unitState
        //       }
        //       let url = '/manager/usingUnit/regionExport'
        //       this.$axios
        //         .post(url, params, { responseType: 'arraybuffer' })
        //         .then((res) => {
        //           console.log('数据....', res)
        //           downloadFile(res)
        //           return res.data
        //         })
        //         .catch((err) => {
        //           console.log(err)
        //         })
        // =======
        unitState: this.searchForm.unitState
      }
      listDownLoad.downloadFile(
        '/usingUnit/regionExport',
        params,
        'post',
        '.xls'
      )
    },
    // 获取表格数据
    gettablelist () {
      var licenseIssuingTimeStart = ''
      var licenseIssuingTimeEnd = ''
      if (this.searchForm.licenseIssuingTimeStart == null) {
        this.searchForm.licenseIssuingTimeStart = []
      }
      if (this.searchForm.licenseIssuingTimeStart.length == '0') {
        var licenseIssuingTimeStart = ''
        var licenseIssuingTimeEnd = ''
      } else {
        var licenseIssuingTimeStart =
          this.searchForm.licenseIssuingTimeStart[0]
        var licenseIssuingTimeEnd = this.searchForm.licenseIssuingTimeStart[1]
      }
      var params = {
        industryCategory: this.searchForm.industryCategory,
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeStart: licenseIssuingTimeStart,
        licenseIssuingTimeEnd: licenseIssuingTimeEnd,
        registPrefecture: this.searchForm.registPrefecture,
        unitState: this.searchForm.unitState
      }
      noRegionalstatistics.tablelist(params).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data
          // this.$refs.paginationObj.count = data.totalCount;
        }
      })
    },
    // 获取行业类别的接口
    getindustryclasslist () {
      noRegionalstatistics.industryclassfun().then((res) => {
        if (res.code == 0) {
          this.regionOptions = res.data
          // if (res.data.length > 0) {
          //   this.searchForm.industryCategory = res.data[0].code;
          // }
        }
      })
    },
    // 获取发证机关的接口
    getissuingauthority () {
      noRegionalstatistics.issuingauthfun().then((res) => {
        if (res.code == 0) {
          this.issuingauthorityOptions = res.data
          // if (res.data.length > 0) {
          //   this.searchForm.licenseAuthority = res.data[0].code;
          // }
        }
      })
    },
    getunitstatusfun () {
      noRegionalstatistics.unitstatusfun().then((res) => {
        if (res.code == 0) {
          this.unitstatusOptions = res.data
          // if (res.data.length > 0) {
          //   this.searchForm.licenseAuthority = res.data[0].code;
          // }
        }
      })
    },
    // <<<<<<< HEAD
    //     jumpnucleartechnology (data, juge, pathname) {
    //       this.$router.push({
    //         path: '/homeHtml/AnalysisHtml/nucleartechnologyjump',
    //         query: { data: data, juge: juge, pathname }
    //       })
    // =======
    jumpnucleartechnology (data, juge, pathname, distract) {
      this.$router.push({
        path: '/homeHtml/AnalysisHtml/nucleartechnologyjump',
        query: { data: data, juge: juge, pathname: pathname, distract: distract }
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
    handleCurrentChange () {},
    paginationFunction () {}
  },
  mounted () {
    this.allinit()
  }
}
</script>

<style scoped>
@import "../../assets/Xraydevice/index.css";
</style>
