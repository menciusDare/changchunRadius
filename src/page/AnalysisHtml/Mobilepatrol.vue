<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">巡检情况统计</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">
        <el-form :inline="true" :model="searchForm" class="myForm">
          <el-form-item label=" " prop="regionradio" >
            <el-radio v-model="searchForm.regionradio" label="0" @change="changeregion">区域</el-radio>
            <el-radio v-model="searchForm.regionradio" label="1" @change="changeregion"
              >涉源单位</el-radio
            >
          </el-form-item>
          <el-form-item
            label="所属区域："
            prop="regionCode"
            v-show="searchForm.regionradio == '1'"
          >
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
          <el-table-column prop="name" label="单位名称"></el-table-column>
          <el-table-column prop="totalCount" label="目标巡检次数">
            <template slot-scope="scope"> {{ scope.row.totalCount }}</template>
          </el-table-column>
          <el-table-column prop="actualCount" label="实际巡检次数">
            <template slot-scope="scope"> {{ scope.row.actualCount }}</template>
          </el-table-column>
          <el-table-column prop="completeRate" label="巡检完成率（%）">
            <template slot-scope="scope">
              {{ scope.row.completeRate }}%</template
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
import pagination from "../AnalysisHtml/compoents/Pagination.vue";
import noRegionalstatistics from "../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics";
import listDownLoad from "../../common/listDownLoad";

export default {
  name: "Mobilepatrol",
  components: {
    pagination,
  },
  data() {
    return {
      searchForm: {
        regionCode: "",
        licenseIssuingTimeStart: [],
        regionradio: "0",
      },
      regionOptions: [],
      issuingauthorityOptions: [],
      categoryOptions: [],
      tableData: [],
    };
  },
  methods: {
    changeregion(){
this.searchForm.regionCode='';
    },
    allinit() {
      this.getregion();
      this.gettablelist();
    },
    // 导出表格
    exportecal() {
      let url = "/manager/mobilePatrol/getInspectionSituationList";
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
        endTime: licenseIssuingTimeEnd,
        startTime: licenseIssuingTimeStart,
        'type':this.searchForm.regionradio,
        regionCode: this.searchForm.regionCode,
      };

      listDownLoad.downloadFile("mobilePatrol/export", params, "formData", ".xls");
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
        endTime: licenseIssuingTimeEnd,
        startTime: licenseIssuingTimeStart,
        type: this.searchForm.regionradio,
        regionCode: this.searchForm.regionCode,
      };
      noRegionalstatistics.getmobtoblehttp(params).then((res) => {
        this.tableData = res.data;
        // this.$refs.paginationObj.count = res.data.data[0].totalCount;
      });
    },
    //获取区域接口
    getregion() {
      noRegionalstatistics.regionfun().then((res) => {
        if (res.code == 0) {
          this.regionOptions = res.data;
        }
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
    