<template>
  <div class="pageBox">
   <div class="pageName pageNameBox"><Breadcrumb :breadcrumb="breadcrumb"></Breadcrumb><span class="text"> / 非密封性物质查询</span></div>
    <div class="panelMain">
      <SelfSearch
        :showlevel="showlevel"
        :searchOpts="colModel"
        :optionList="optionList"
        @on-search="onSearch"
        @on-export="onExport"
      ></SelfSearch>
      <div class="tableCommonHeight">
        <SelfTable
          :tableData="tableData"
          :headerData="headerData"
          :btnList="btnList"
          @onBtnClick="onBtnClick"
          @cellClick="cellClick"
          @fileClick="fileClick"
          :total.sync="total"
          :pageSize.sync="pageSize"
          :pageSizes="pageSizes"
          :currentPage.sync="currentPage"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        ></SelfTable>
      </div>
    </div>
    <el-dialog
      title="详情查看"
      :visible.sync="dialogTableVisible"
      :append-to-body="true"
    >
      <!-- <el-descriptions :column="2" border>
        <el-descriptions-item  v-for="(item,index) in infoData" :key="index" :label="item.name" label-class-name="my-label" content-class-name="my-content">{{item.value}}</el-descriptions-item>
      </el-descriptions> -->
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="核素"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.nuclide }}</el-descriptions-item
        >
        <el-descriptions-item
          label="来源"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.source }}</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="标号"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.markNumber }}</el-descriptions-item
        >
        <el-descriptions-item
          label="工作场所"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.workplace }}</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="场所等级"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.level }}</el-descriptions-item
        >
        <el-descriptions-item
          label="用途"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.purposeName }}</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="年最大用量"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.maxTotal }}</el-descriptions-item
        >
        <el-descriptions-item
          label="日等效最大操作量"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.maxAmount }}</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="活动种类"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.kind }}</el-descriptions-item
        >
        <el-descriptions-item
          label="出厂日期"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.productionDate }}</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="出厂活度"
          label-class-name="my-label"
          content-class-name="my-content"
          >{{ infoData.factorActive }}</el-descriptions-item
        >
        <el-descriptions-item
          label=""
          label-class-name="my-label"
          content-class-name="my-content"
        ></el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import SelfSearch from "../../components/SearchCom/SelfSearch.vue";
import SelfTable from "../../components/Table/SelfTable.vue";
import { room_level } from "../../common/constants";
import Api from "../../common/api/Information/index";
import ComApi from "../../common/api/commonApi";
import listDownLoad from "../../common/listDownLoad";
import Breadcrumb from "@/components/CommonComponrnts/BreadcrumbCom";

export default {
  name: "UnsealedQuery",
  components: { SelfSearch, SelfTable, Breadcrumb },
  data() {
    return {
      breadcrumb: [
        {
          name: "返回",
          path: "",
        },
      ],
      data: {},
      juge: "",
      dialogTableVisible: false,
      showlevel: false,
      isBtn: true,
      isIndex: true,
      isPage: true,
      total: 20,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      infoData: {},
      colModel: [
        {
          prop: "nuclide",
          type: "select",
          label: "核素名称：",
          optsData: "nuclideList",
          aliasLabel: "nuclideName", // 设置别名-select使用的label，value字段
          aliasValue: "id",
        },
        {
          prop: "level",
          type: "select",
          label: "场所等级：",
          optsData: "levelList",
          aliasLabel: "label", // 设置别名-select使用的label，value字段
          aliasValue: "value",
          isDisabled: true,
        },
        {
          prop: "workplace",
          type: "input",
          label: "工作场所：",
        },
        {
          prop: "licenseNum",
          type: "input",
          label: "许可证号：",
        },
        {
          prop: "unitName",
          type: "input",
          label: "所属单位：",
        },
      ],
      optionList: {
        nuclideList: [{ value: "", label: "全部" }],
        levelList: [
          { value: "", label: "全部" },
          { value: "1", label: "甲级" },
          { value: "2", label: "乙级" },
          { value: "3", label: "丙级" },
          { value: "4", label: "无" },
        ],
      },
      headerData: [
        { value: "nuclide", title: "核素" },
        { value: "factorActive", title: "出厂活度（Bq）" },
        { value: "workplace", title: "工作场所" },
        { value: "level", title: "场所等级" },
        { value: "fkPurposeid", title: "用途" },
        { value: "source", title: "来源" },
        { value: "unitName", title: "单位名称" },
        { value: "licenseNum", title: "许可证号", type: "clickFile" },
      ],
      tableData: [
        // {
        //   name: "1",
        //   num: "1",
        //   region: "beijing",
        //   IndustryType: "1",
        //   unitStatus: "1",
        //   issuingAuthority: "1",
        //   issuingTime: "2",
        //   validUntil: "3",
        //   unitType: "2",
        // },
      ],
      btnList: [{ name: "查看" }],
      infoData: [
        { name: "核素：", value: "" },
        { name: "来源：", value: "" },
        { name: "标号：", value: "" },
        { name: "工作场所：", value: "" },
        { name: "场所等级：", value: "" },
        { name: "用途：", value: "" },
        { name: "来源：", value: "" },
        { name: "日等效最大操作量：", value: "" },
        { name: "年最大用量：", value: "" },
        { name: "活动种类：", value: "" },
        { name: "出厂日期：", value: "" },
        { name: "出场活度：", value: "" },
      ],
      formData: {},
    };
  },
  mounted() {
    this.getNuclideInfos(); // 核素名称
    this.init();
    if (this.$route.query.hasOwnProperty("data")) {
      var juge = this.$route.query.juge;
      if (this.$route.query.juge) {
        var juge = this.$route.query.juge;
        localStorage.setItem("juge", juge);
        if (juge == "1") {
          this.showlevel = true;
          this.breadcrumb = [
            {
              name: "返回",
              path: "/homeHtml/AnalysisHtml/Regionalfield",
            },
          ];
        } else {
          this.showlevel = false;
          this.breadcrumb = [
            {
              name: "返回",
              path: "/homeHtml/AnalysisHtml/Unindustrystatistics",
            },
          ];
        }
      }
    }
    if (localStorage.getItem("juge") == "1") {
      this.breadcrumb = [
        {
          name: "返回",
          path: "/homeHtml/AnalysisHtml/Regionalfield",
        },
      ];
    } else {
      this.breadcrumb = [
        {
          name: "返回",
          path: "/homeHtml/AnalysisHtml/Unindustrystatistics",
        },
      ];
    }
  },
  methods: {
    fileClick(row) {
      this.$router.push({
        path: "/homeHtml/AnalysisHtml/companyIntroduceTab",
        query: {
          id: row.unitId,
          page: "unsealedradioactivejump",
        },
      });
    },
    // 获取核素名称列表
    getNuclideInfos() {
      ComApi.getNuclideInfos().then((res) => {
        if (res.code === 0) {
          this.optionList.nuclideList = res.data;
        }
      });
    },
    // 导出
    onExport(form) {
      if (this.$route.query.hasOwnProperty("data")) {
        var juge = this.$route.query.juge;
        var licenseAuthority = this.$route.query.data.licenseAuthority;
        var time = this.$route.query.data.licenseIssuingTime;
        localStorage.setItem("licenseAuthority", licenseAuthority);
        localStorage.setItem("juge", juge);
        localStorage.setItem("time", time);
        if (localStorage.getItem("juge") == "1") {
          var regionCode = this.$route.query.regionCode;
          localStorage.setItem("regionCode", regionCode);
          var levelnew = this.$route.query.code;
          localStorage.setItem("levelnew", levelnew);
        }
        if (localStorage.getItem("juge") == "2") {
          var regionCode = this.$route.query.regionCode;
          localStorage.setItem("regionCode", regionCode);
          var industryCode = this.$route.query.userId;
          localStorage.setItem("industryCode", industryCode);
        }
      }
      console.log(localStorage.getItem("time"), 'localStorage.getItem("time")');
      var newtime = localStorage.getItem("time");
      console.log(newtime, "newtime");
      console.log(
        localStorage.getItem("licenseAuthority"),
        'localStorage.getItem("licenseAuthority")'
      );
      if (newtime == null) {
        localStorage.setItem("time", []);
      }
      if (newtime.length == "0") {
        var licenseIssuingTimeStart = "";
        var licenseIssuingTimeEnd = "";
      } else {
        var licenseIssuingTimeStart = newtime.split(",")[0];
        var licenseIssuingTimeEnd = newtime.split(",")[1];
      }
      if (localStorage.getItem("juge") == "1") {
        this.formData.level = localStorage.getItem("levelnew");
        var params = Object.assign({}, this.formData, {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          licenseAuthority: localStorage.getItem("licenseAuthority"),
          licenseIssuingTimeEnd: licenseIssuingTimeEnd,
          licenseIssuingTimeStart: licenseIssuingTimeStart,
          regionCode: localStorage.getItem("regionCode"),
        });
      }
      if (localStorage.getItem("juge") == "2") {
        var params = Object.assign({}, this.formData, {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          licenseAuthority: localStorage.getItem("licenseAuthority"),
          licenseIssuingTimeEnd: licenseIssuingTimeEnd,
          licenseIssuingTimeStart: licenseIssuingTimeStart,
          regionCode: localStorage.getItem("regionCode"),
          industryCode: localStorage.getItem("industryCode"),
        });
      }
      // listDownLoad.downloadFile('usingUnit/industryExport', statisticsParam, 'get')
      listDownLoad.downloadFile(
        "/informationQuery/unsealedRadioactiveMaterialExport",
        params,
        "post",
        'xls'
      );
      // listDownLoad.downloadFile('alarmQuery/exporAlarmQuery', statisticsParam, 'formData')
    },
    onSearch(form) {
      this.optionList.nuclideList.map(item=>{
        if(form.nuclide && item.id == form.nuclide){
          form.nuclide= item.nuclideName
        }
      })
      this.formData = form;
      this.init();
    },
    init() {
      if (this.$route.query.hasOwnProperty("data")) {
        var juge = this.$route.query.juge;
        var licenseAuthority = this.$route.query.data.licenseAuthority;
        var time = this.$route.query.data.licenseIssuingTime;
        localStorage.setItem("licenseAuthority", licenseAuthority);
        localStorage.setItem("juge", juge);
        localStorage.setItem("time", time);
        if (localStorage.getItem("juge") == "1") {
          var regionCode = this.$route.query.regionCode;
          localStorage.setItem("regionCode", regionCode);
          var levelnew = this.$route.query.code;
          localStorage.setItem("levelnew", levelnew);
        }
        if (localStorage.getItem("juge") == "2") {
          var regionCode = this.$route.query.regionCode;
          localStorage.setItem("regionCode", regionCode);
          var industryCode = this.$route.query.userId;
          localStorage.setItem("industryCode", industryCode);
        }
      }
      console.log(localStorage.getItem("time"), 'localStorage.getItem("time")');
      var newtime = localStorage.getItem("time");
      console.log(newtime, "newtime");
      console.log(
        localStorage.getItem("licenseAuthority"),
        'localStorage.getItem("licenseAuthority")'
      );
      if (newtime == null) {
        localStorage.setItem("time", []);
      }
      if (newtime.length == "0") {
        var licenseIssuingTimeStart = "";
        var licenseIssuingTimeEnd = "";
      } else {
        var licenseIssuingTimeStart = newtime.split(",")[0];
        var licenseIssuingTimeEnd = newtime.split(",")[1];
      }
      if (localStorage.getItem("juge") == "1") {
        this.formData.level = localStorage.getItem("levelnew");
        var params = Object.assign({}, this.formData, {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          licenseAuthority: localStorage.getItem("licenseAuthority"),
          licenseIssuingTimeEnd: licenseIssuingTimeEnd,
          licenseIssuingTimeStart: licenseIssuingTimeStart,
          regionCode: localStorage.getItem("regionCode"),
        });
      }
      if (localStorage.getItem("juge") == "2") {
        var params = Object.assign({}, this.formData, {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          licenseAuthority: localStorage.getItem("licenseAuthority"),
          licenseIssuingTimeEnd: licenseIssuingTimeEnd,
          licenseIssuingTimeStart: licenseIssuingTimeStart,
          regionCode: localStorage.getItem("regionCode"),
          industryCode: localStorage.getItem("industryCode"),
        });
      }

      Api.getUnsealedRadioactiveMaterialList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.list.map((item) => {
            // item.level = room_level[item.level];
            return item;
          });
          this.total = res.data.totalCount;
        }
      });
    },
    onBtnClick(scope, name) {
      console.log(scope, name);
      console.log(1111);
      if (name == "查看") {
        this.dialogTableVisible = true;
        Api.getUnsealedRadioactiveMaterialById({
          unsealedId: scope.row.pkId,
        }).then((res) => {
          this.infoData = res.data;
        });
      }
    },
    cellClick(row, col, cell, event) {
      if (col.property == "region") {
        alert(111);
      }
    },
    handleSizeChange(val) {
      console.log(1111);
    },
    handleCurrentChange(val) {
      console.log(22222);
    },
  },
};
</script>

<style>
.el-descriptions-item__label.is-bordered-label {
  width: 25%;
  text-align: center;
  color: #333333;
}
.el-descriptions-item__content {
  width: 25%;
}
.tableCommonHeight {
  height: calc(100% - 180px);
}
.pageNameBox{
    display: flex;
  }
  .text{
    margin-left: 20px;
  }
.tableCommonHeight {
  height: calc(100% - 220px);
}
</style>