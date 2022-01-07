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
          <el-table-column prop="industryName" label="行业"> </el-table-column>
          <el-table-column prop="count" label="单位总数">
            <template slot-scope="scope">
              <span class="tablenum" @click="look(searchForm, '', 1, scope.row.industryCode)">{{
                scope.row.count
              }}</span></template
            >
          </el-table-column>
          <el-table-column prop="keyPointCount" label="重点单位">
            <template slot-scope="scope">
              <span class="tablenum" @click="look(searchForm, 1, 1,scope.row.industryCode)">{{
                scope.row.keyPointCount
              }}</span></template
            >
          </el-table-column>
          <el-table-column prop="nonKeyCount" label="非重点单位">
            <template slot-scope="scope">
              <span class="tablenum" @click="look(searchForm, 0, 1,scope.row.industryCode)">{{
                scope.row.nonKeyCount
              }}</span></template
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
import noRegionalstatistics from "../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics";
import pagination from "../AnalysisHtml/compoents/Pagination.vue";
import listDownLoad from '@/common/listDownLoad'
export default {
  name: "noindustrystatistics",
  components: {
    pagination,
  },
  data() {
    return {
      searchForm: {
        regionCode: "",
        licenseAuthority: "",
        licenseIssuingTimeStart: [],
        registPrefecture: "",
        unitState: "",
      },
      regionOptions: [],
      issuingauthorityOptions: [],
      categoryOptions: [],
      unitstatusOptions: [],
      tableData: [],
    };
  },
  methods: {
    allinit() {
      this.getregion();
      this.getissuingauthority();
      this.getunitstatusfun();
      this.gettablelist();
    },
    //获取区域接口
    getregion() {
      noRegionalstatistics.regionfun().then((res) => {
        if (res.code == 0) {
          this.regionOptions = res.data;
        }
      });
    },
    // 导出表格
    exportecal() {
      var licenseIssuingTimeStart = "";
      var licenseIssuingTimeEnd = "";
      if (this.searchForm.licenseIssuingTimeStart == null) {
        this.searchForm.licenseIssuingTimeStart = [];
      }
      if (this.searchForm.licenseIssuingTimeStart.length == "0") {
        var licenseIssuingTimeStart = "";
        var licenseIssuingTimeEnd = "";
      } else {
        var licenseIssuingTimeStart =
          this.searchForm.licenseIssuingTimeStart[0];
        var licenseIssuingTimeEnd = this.searchForm.licenseIssuingTimeStart[1];
      }
      var params = {
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeEnd: licenseIssuingTimeEnd,
        licenseIssuingTimeStart: licenseIssuingTimeStart,
        registPrefecture: this.searchForm.regionCode,
        unitState: this.searchForm.unitState,
      };
      listDownLoad.downloadFile(
        '/usingUnit/industryExport',
        params,
        'post',
        '.xls'
      )
    },
    //获取表格数据
    gettablelist() {
      var licenseIssuingTimeStart = "";
      var licenseIssuingTimeEnd = "";
      if (this.searchForm.licenseIssuingTimeStart == null) {
        this.searchForm.licenseIssuingTimeStart = [];
      }
      if (this.searchForm.licenseIssuingTimeStart.length == "0") {
        var licenseIssuingTimeStart = "";
        var licenseIssuingTimeEnd = "";
      } else {
        var licenseIssuingTimeStart =
          this.searchForm.licenseIssuingTimeStart[0];
        var licenseIssuingTimeEnd = this.searchForm.licenseIssuingTimeStart[1];
      }
      var params = {
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeEnd: licenseIssuingTimeEnd,
        licenseIssuingTimeStart: licenseIssuingTimeStart,
        registPrefecture: this.searchForm.regionCode,
        unitState: this.searchForm.unitState,
      };
      noRegionalstatistics.intablelist(params).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data;
          // this.$refs.paginationObj.count = data.totalCount;
        }
      });
    },
    //获取行业类别的接口
    getindustryclasslist() {
      noRegionalstatistics.industryclassfun().then((res) => {
        if (res.code == 0) {
          this.regionOptions = res.data;
          // if (res.data.length > 0) {
          //   this.searchForm.industryCategory = res.data[0].code;
          // }
        }
      });
    },
    //获取发证机关的接口
    getissuingauthority() {
      noRegionalstatistics.issuingauthfun().then((res) => {
        if (res.code == 0) {
          this.issuingauthorityOptions = res.data;
          // if (res.data.length > 0) {
          //   this.searchForm.licenseAuthority = res.data[0].code;
          // }
        }
      });
    },
    getunitstatusfun() {
      noRegionalstatistics.unitstatusfun().then((res) => {
        if (res.code == 0) {
          this.unitstatusOptions = res.data;
          // if (res.data.length > 0) {
          //   this.searchForm.licenseAuthority = res.data[0].code;
          // }
        }
      });
    },
    look(data, juge, pathname,industryCategory) {
      this.$router.push({
        path: "/homeHtml/AnalysisHtml/nucleartechnologyjump",
        query: { data: data, juge: juge, pathname:pathname,industryCategory:industryCategory },
      });
    },
    init() {
      this.$refs.paginationObj.count = 10;
    },
    TableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    styleBack({ row, column, rowIndex, columnIndex }) {
      return "border-right:none;font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;";
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;";
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "th";
      }
      return "";
    },
    handleCurrentChange() {},
    paginationFunction() {},
  },
  mounted() {
    this.allinit();
  },
};
</script>

<style scoped>
@import "../../assets/Xraydevice/index.css";
</style>
    