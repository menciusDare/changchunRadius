<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">实时一览</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">
        <el-form :inline="true" :model="searchForm" class="myForm">
          <el-form-item label="单位名称：" prop="unitName">
            <el-input
              v-model="searchForm.unitName"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备名称：" prop="equipmentName">
            <el-input
              v-model="searchForm.equipmentName"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="监测因子组：" prop="jince">
            <el-select
              clearable
              v-model="searchForm.jince"
              size="small"
              filterable
              placeholder="请输入"
              class="handle-input mr10"
              style="width: 240px"
              @change="Customfactorgrouplist"
            >
              <el-option
                v-for="item in jinceOptions"
                :key="item.pkId"
                :label="item.groupName"
                :value="item.pkId"
              >
              </el-option>
              <el-option key="0" label="自定义因子组" value="0"> </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item
            label="自定义因子组："
            prop="Custom"
            v-show="searchForm.jince == '0'"
          >
            <el-select
              clearable
              v-model="searchForm.Custom"
              size="small"
              multiple
              placeholder="请输入"
              class="handle-input mr10"
              style="width: 206px"
              @change="changecustom()"
            >
              <el-option
                v-for="item in data"
                :key="item.pkId"
                :label="item.pollutionName"
                :value="item.pkId"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
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
          <el-form-item label="时间：" prop="time">
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
          <!-- <el-form-item>
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
          </el-form-item> -->
        </el-form>
      </div>
      <div class="status">
        <ul class="statuslist clearfix">
          <li>
            <span class="statustext newstatustext"
              >全部<span> {{ total }}</span></span
            >
          </li>
          <li>
            <span class="statustext"
              >在线<span> {{ onlineCount }}</span></span
            >
            <div class="statuscolor statuscolor1"></div>
          </li>
          <li>
            <span class="statustext"
              >离线<span> {{ offlineCount }}</span></span
            >
            <div class="statuscolor statuscolor2"></div>
          </li>
          <li>
            <span class="statustext"
              >报警<span> {{ alarmCount }}</span></span
            >
            <div class="statuscolor statuscolor3"></div>
          </li>
        </ul>
      </div>
      <div class="Xratable sXratable">
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
          <el-table-column prop="unitName" label="单位名称"> </el-table-column>
          <el-table-column prop="locationName" label="监控位置">
          </el-table-column>
          <el-table-column prop="equipmentName" label="设备名称">
          </el-table-column>
          <el-table-column prop="equipmentCode" label="设备编码">
          </el-table-column>
          <el-table-column prop="monitorTime" label="监测时间" :formatter="formatDate">
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <div class="statusbox" :class="setColor(scope.row.status)"></div
            ></template>
          </el-table-column>
          <el-table-column prop="isVideo" label="监控视频">
            <template slot-scope="scope">
              <div
                class="surveillancevideo"
                @click="jumpRealtimeGlancejump(scope.row.pkId)"
                v-if="scope.row.isVideo == 1"
              ></div>
              <span v-else>{{ "--" }}</span>
            </template>
          </el-table-column>
          <template>
            <el-table-column
              :prop="item.pollutionCode"
              :label="item.pollutionName"
              v-for="(item, index) in eltablecolumn"
              :key="index"
            >
            </el-table-column>
          </template>
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
    <el-dialog
      title="自定义因子组"
      :visible.sync="dialogVisible"
      width="36%"
      :modal-append-to-body="false"
    >
      <!-- :before-close="handleClose" -->
      <div class="Unsealedinquiry clearfix">
        <el-transfer
          v-model="jiancevalue"
          :data="data"
          :titles="title"
          @change="changeright()"
          @right-check-change="rightcheckchange()"
        ></el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
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
          @click="Custofun()"
          >确 定</el-button
        >
        <el-button
          @click="dialogVisible = false"
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
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "../AnalysisHtml/compoents/Pagination.vue";
import noRegionalstatistics from "../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics";
export default {
  name: "RealtimeGlance",
  components: {
    pagination,
  },
  data() {
    return {
      title:['自定义因子组','自定义因子组'],
      eltablecolumn: [],
      dialogVisible: false,
      searchForm: {
        regionCode: "",
        licenseIssuingTimeStart:[],
        unitName: "",
        equipmentName: "",
        jince: "",
        Custom: [],
      },
      onlineCount: "",
      offlineCount: "",
      alarmCount: "",
      total: "",
      jiancevalue: [],
      data: [],
      jinceOptions: [],
      regionOptions: [],
      issuingauthorityOptions: [],
      categoryOptions: [],
      unitstatusOptions: [],
      tableData: [],
    };
  },
  methods: {
     formatDate(row, column) {
       // 获取单元格数据
       let data = row[column.property]
       if (data ==null) {
           return '--'
       }else{
         return data;
       }},
    Custofun() {
      this.gettablelist();
     this.dialogVisible=false;
    },
    changecustom() {
      this.gettablelist();
    },
    Customfactorgrouplist() {
      if (this.searchForm.jince == "0") {
        this.searchForm.Custom = "";
        this.jiancevalue=[];
        this.data=[];
        this.getCustomfactor();
      }else{
         this.jiancevalue=[];
          this.data=[];
       this.dialogVisible=false;
      }
      this.gettablelist();
     
    },
    changeright() {
      console.log(this.jiancevalue, "jiancevalue");
    },
    rightcheckchange() {
      console.log(this.jiancevalue, "rightjiancevalue");
    },
    allinit() {
      this.getregion();
      this.gettablelist();
      this.getFactorgrouplist();
    },
    //获取表格数据
    gettablelist() {
      var pollutionIds = this.jiancevalue.toString();
      console.log(pollutionIds, " pollutionIds");
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
        pageNum: this.$refs.paginationObj.cur_page,
        pageSize: this.$refs.paginationObj.cur_pageSize,
        equipmentName: this.searchForm.equipmentName,
        monitorTimeEnd: licenseIssuingTimeEnd,
        monitorTimeStart: licenseIssuingTimeStart,
        regionCode: this.searchForm.regionCode,
        unitName: this.searchForm.unitName,
        groupId: this.searchForm.jince,
        pollutionIds: pollutionIds,
      };
      noRegionalstatistics.Realtablelist(params).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.tableData.records;
          this.$refs.paginationObj.count = res.data.tableData.total;
          this.onlineCount = res.data.onlineCount;
          this.offlineCount = res.data.offlineCount;
          this.alarmCount = res.data.alarmCount;
          this.total = res.data.tableData.total;
          this.eltablecolumn = res.data.pollutions;
          console.log(this.eltablecolumn, "this.eltablecolumn");
        }
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
    //获取监测因子组
    getFactorgrouplist() {
      var params = {
        current: 1,
        size: 10000,
      };
      noRegionalstatistics.Factorgrouplist(params).then((res) => {
        if (res.code == 0) {
          this.jinceOptions = res.data.records;
        }
      });
    },
    //获取自定义监测因子组
    getCustomfactor() {
      this.dialogVisible=true;
      var params = {
        pageNum: 1,
        pageSize: 10000,
      };
      noRegionalstatistics.Customgrouplist(params).then((res) => {
        if (res.code == 0) {
          var list = res.data.records;
          for(let i=0;i<list.length;i++){
             this.data.push({
            key: Number(list[i].pkId),
            label:list[i].pollutionName ,
          });
          }

          

        
        }
      });
    },
    jumpRealtimeGlancejump(useid) {
      this.$router.push({
        path: "/homeHtml/RealtimeMonitor/RealtimeGlancejump",
        query: { userId: useid },
      });
    },
    setColor(value) {
      let background = "";
      if (value == "1") {
        background = "level1";
      } else if (value == "2") {
        background = "level2";
      } else if (value == "3") {
        background = "level3";
      } else {
        background = "level4";
      }

      return background;
    },
    jumplook() {
      this.dialogVisible = true;
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
    handleCurrentChange() {
      this.gettablelist();
    },
    paginationFunction() {
      this.gettablelist();
    },
    getIndex(index, value) {
      let curPage = this.$refs.paginationObj.cur_page;
      let limitPage = this.$refs.paginationObj.cur_pageSize;
      console.log(curPage, "curPage");
      console.log(limitPage, "limitPage");
      return index + 1 + (curPage - 1) * limitPage;
    },
  },
  mounted() {
    this.allinit();
  },
};
</script>

<style scoped>
@import "../../assets/Xraydevice/index.css";
</style>
    