<template>
  <div class="pageBox">
    <div class="pageName pageNameBox"><Breadcrumb :breadcrumb="breadcrumb"></Breadcrumb><span class="text"> / 核技术利用单位管理</span></div>
    <div class="panelMain">
      <el-form
        :inline="true"
        :model="searchForm"
        label-suffix="："
        class="myForm"
      >
        <el-form-item label="单位名称">
          <el-input
            v-model="searchForm.unitName"
            placeholder="请输入单位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="许可证号">
          <el-input
            class="w240"
            v-model="searchForm.licenseNum"
            placeholder="请输入许可证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="单位类型">
          <el-select
            class="w206"
            v-model="searchForm.unitType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in unitTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域">
          <el-select
            class="w206"
            clearable
            v-model="searchForm.region"
            placeholder="请选择"
            :disabled="true"
          >
            <el-option
              v-for="item in regionsList"
              :key="item.name"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="活动种类范围"
          :class="visibleDevice ? 'mr15' : ''"
          id="activitiesAndRange"
        >
          <el-checkbox
            class="mr40"
            v-model="typeAndScopeSole"
            @change="handleCategory()"
            >唯一</el-checkbox
          >
          <el-checkbox
            class="mr40"
            v-model="isDevice"
            @change="handleCategory('isDevice')"
            >放射源</el-checkbox
          >
          <el-checkbox
            class="mr40"
            v-model="isMaterial"
            @change="handleCategory('isMaterial')"
            >非密封放射性物质</el-checkbox
          >
          <el-checkbox
            class="mr40"
            v-model="isInstallation"
            @change="handleCategory('isInstallation')"
            >射线装置</el-checkbox
          >
        </el-form-item>
        <comActivitiesAndRange
          :isDevice="isDevice"
          :isMaterial="isMaterial"
          :isInstallation="isInstallation"
          :value="activitiesAndRange"
          @input="handleActivitiesAndRange"
          :optionAll="activitiesAndRangeOptionAll"
          class="mt20"
          v-show="visibleDevice"
        >
        </comActivitiesAndRange>

        <div>
          <el-form-item label="行业分类">
            <el-select
              clearable
              class="w206"
              v-model="searchForm.industryCategory"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in industryCategoriesList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发证机关">
            <el-select
              clearable
              class="w206"
              v-model="searchForm.licenseAuthority"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in licenseAuthorityList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button class="btn searchBtn" type="primary" @click="onSearch"
              >查询</el-button
            >
            <el-button class="btn exportBtn" @click="queryexport()"
              >导出</el-button
            >
          </el-form-item>
        </div>
      </el-form>
      <div class="tableCommonHeight">
        <TableCommon
          :data="tableData"
          :dataName="tableDataName"
          @changeButton="changeTableButton"
          :pagination="pagination"
        >
        </TableCommon>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../../common/api/RadioactiveSourceMange/companyIntroduce";
import commonApi from "../../common/api/commonApi";
import TableCommon from "../../components/Table/TableCommon.vue";
import comActivitiesAndRange from "../RadioactiveSourceMange/CompanyIntroduce/comActivitiesAndRange.vue";
import { EventBus } from "@/common/eventbus";
import listDownLoad from "@/common/listDownLoad";
import Breadcrumb from "@/components/CommonComponrnts/BreadcrumbCom";

export default {
  name: "CompanyIntroduce",
  components: {
    comActivitiesAndRange,
    TableCommon,
    Breadcrumb,
  },
  created() {
    this.queryUnitTypes();
    this.queryIndustryCategories();
    this.queryLicenseAuthoritys();
    this.queryRegions();
    this.queryPageList();
  },
  // mounted() {
  //   this.tableCommonOffsetHeight =
  //     document.querySelector(".tableCommonHeight").offsetHeight;
  // },
  data() {
    return {
      breadcrumb: [
        {
          name: "返回",
          path: "",
        },
      ],
      path: "",
      showindusty: false,
      showregion: false,
      tableCommonOffsetHeight: "",
      visibleDevice: false, // 活动种类和范围
      unitTypeList: [], // 单位类型
      industryCategoriesList: [], // 行列分类
      licenseAuthorityList: [], // 发证机关
      regionsList: [], // 所属区域
      // 活动种类和范围
      activitiesAndRange: {
        Device: {
          production: [1, 2, 3, 4, 5],
          use: [1, 2, 3, 4, 5],
          sale: [1, 2, 3, 4, 5],
        },
        Material: {
          production: [101, 102, 103, 100],
          use: [101, 102, 103, 100],
          sale: [101, 102, 103, 100],
        },
        Installation: {
          isBuildInstallation: true,
          production: [2, 3],
          use: [2, 3],
          sale: [1, 2, 3],
        },
      },
      // 活动种类和范围 -option
      activitiesAndRangeOptionAll: {
        Device: {
          production: [
            { name: "I类", code: 1 },
            { name: "II类", code: 2 },
            { name: "III类", code: 3 },
            { name: "IV类", code: 4 },
            { name: "V类", code: 5 },
          ],
          use: [
            { name: "I类", code: 1 },
            { name: "II类", code: 2 },
            { name: "III类", code: 3 },
            { name: "IV类", code: 4 },
            { name: "V类", code: 5 },
          ],
          sale: [
            { name: "I类", code: 1 },
            { name: "II类", code: 2 },
            { name: "III类", code: 3 },
            { name: "IV类", code: 4 },
            { name: "V类", code: 5 },
          ],
        },
        Material: {
          production: [
            { name: "甲", code: 101 },
            { name: "乙", code: 102 },
            { name: "丙", code: 103 },
            { name: "无", code: 100 },
          ],
          use: [
            { name: "甲", code: 101 },
            { name: "乙", code: 102 },
            { name: "丙", code: 103 },
            { name: "无", code: 100 },
          ],
          sale: [
            { name: "甲", code: 101 },
            { name: "乙", code: 102 },
            { name: "丙", code: 103 },
            { name: "无", code: 100 },
          ],
        },
        Installation: {
          isBuildInstallation: false,
          production: [
            { name: "II类", code: 2 },
            { name: "III类", code: 3 },
          ],
          use: [
            { name: "II类", code: 2 },
            { name: "III类", code: 3 },
          ],
          sale: [
            { name: "I类", code: 1 },
            { name: "II类", code: 2 },
            { name: "III类", code: 3 },
          ],
        },
      },
      typeAndScopeSole: false, // 唯一
      isDevice: false, // 是否使用放射源设备
      isMaterial: false, // 是否使用非密封放射性物质
      isInstallation: false, // 是否使用射线装置
      searchForm: {},
      tableData: [],
      /* 表格表头配置 */
      tableDataName: [
        { label: "序号", type: "index", width: "60", isCenter: true },
        { label: "单位名称", type: "normal", prop: "unitName", isCenter: true },
        {
          label: "许可证号",
          type: "normal",
          prop: "licenseNum",
          isCenter: true,
        },
        {
          label: "所属区域",
          type: "normal",
          prop: "registPrefectureName",
          isCenter: true,
        },
        {
          label: "单位性质",
          type: "normal",
          prop: "unitPropertyName",
          isCenter: true,
        },
        {
          label: "行业分类",
          type: "normal",
          prop: "industryCategoryName",
          isCenter: true,
        },
        {
          label: "单位状态",
          type: "normal",
          prop: "unitStateName",
          isCenter: true,
        },
        {
          label: "发证机关",
          type: "normal",
          prop: "licenseAuthorityName",
          isCenter: true,
        },
        {
          label: "发证时间",
          type: "normal",
          prop: "licenseIssuingtime",
          isCenter: true,
        },
        {
          label: "有效期至",
          type: "normal",
          prop: "licenseValidity",
          isCenter: true,
        },
        {
          label: "单位类型",
          type: "normal",
          prop: "unitTypeName",
          isCenter: true,
        },
        {
          label: "操作",
          type: "button",
          width: "150",
          buttonList: [{ name: "查看", id: "chakan", statusCode: "1" }],
        },
      ],
      pagination: {
        current: 1,
        total: 10,
        size: 10,
      },
    };
  },
  mounted() {
    this.path = "/homeHtml/AnalysisHtml/noindustrystatistics";
    if (this.$route.query.hasOwnProperty("data")) {
      var pathname = this.$route.query.pathname;
      localStorage.setItem("pathname", pathname);
      if (pathname == "2") {
        this.searchForm.industryCategory =
          this.$route.query.data.industryCategory;
        this.searchForm.licenseAuthority =
          this.$route.query.data.licenseAuthority;
        this.showregion = false;
        this.showindusty = true;
        this.breadcrumb = [
          {
            name: "返回",
            path: "/homeHtml/AnalysisHtml/noRegionalstatistics",
          },
        ];
      }
      if (pathname == "1") {
        this.searchForm.licenseAuthority =
          this.$route.query.data.licenseAuthority;
        this.showregion = true;
        this.showindusty = false;
        this.searchForm.registPrefecture = this.$route.query.data.regionCode;
        this.breadcrumb = [
          {
            name: "返回",
            path: "/homeHtml/AnalysisHtml/noindustrystatistics",
          },
        ];
      }
    }
    if (localStorage.getItem("pathname") == "2") {
      this.breadcrumb = [
        {
          name: "返回",
          path: "/homeHtml/AnalysisHtml/noRegionalstatistics",
        },
      ];
    } else {
      this.breadcrumb = [
        {
          name: "返回",
          path: "/homeHtml/AnalysisHtml/noindustrystatistics",
        },
      ];
    }

    this.tableCommonOffsetHeight =
      document.querySelector(".tableCommonHeight").offsetHeight;
    this.loadingChangePage();
  },
  methods: {
    loadingChangePage() {
      EventBus.$on("changePage", (params) => {
        console.log("params", params);
        this.pagination.current = params.cur_page;
        this.pagination.size = params.cur_pageSize;
        this.queryPageList();
      });
    },
    // 活动种类范围
    handleActivitiesAndRange(newValList) {
      console.log("new", newValList);
      for (const key in newValList) {
        if (
          this.activitiesAndRange.hasOwnProperty.call(
            this.activitiesAndRange,
            key
          )
        ) {
          this.activitiesAndRange[key] = newValList[key];
        }
      }
      console.log("this.activitiesAndRange", this.activitiesAndRange);
    },
    // 活动种类和范围
    handleCategory(name) {
      if (!this.isDevice && !this.isMaterial && !this.isInstallation) {
        this.visibleDevice = false;
      } else {
        this.visibleDevice = true;
      }
      var heightTemp = this.tableCommonOffsetHeight;
      this.$nextTick(() => {
        if (this.isDevice) {
          heightTemp -= document.querySelector("#isDevice").offsetHeight;
        }
        if (this.isMaterial) {
          heightTemp -= document.querySelector("#isMaterial").offsetHeight;
        }
        if (this.isInstallation) {
          heightTemp -= document.querySelector("#isInstallation").offsetHeight;
        }
        var tableCommonHeight = document.querySelector(".tableCommonHeight");
        if (!this.isDevice && !this.isMaterial && !this.isInstallation) {
          tableCommonHeight.style.height = heightTemp + "px";
        } else {
          tableCommonHeight.style.height = heightTemp - 5 + "px";
        }
      });
    },
    // 查询所属区域
    queryRegions() {
      commonApi
        .getRegions()
        .then((res) => {
          if (res.code === 0) {
            this.regionsList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },

    // 查询发证机关
    queryLicenseAuthoritys() {
      commonApi
        .getLicenseAuthoritys()
        .then((res) => {
          if (res.code === 0) {
            this.licenseAuthorityList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    // 查询行业分类
    queryIndustryCategories() {
      commonApi
        .getIndustryCategories()
        .then((res) => {
          if (res.code === 0) {
            this.industryCategoriesList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    // 查询单位类型
    queryUnitTypes() {
      Auth.unitTypesApi()
        .then((res) => {
          console.log("res", res);
          if (res.code === 0) {
            this.unitTypeList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    queryPageList() {
      var newregion = "";
      var newindustryCategory = "";
      if (this.$route.query.hasOwnProperty("data")) {
        var pathname = this.$route.query.pathname;
        localStorage.setItem("pathname", pathname);
        var unitState = this.$route.query.data.unitState;
        if (pathname == "2") {
          var registPrefecture = this.$route.query.distract;
          localStorage.setItem("registPrefecture", registPrefecture);
          var industryCategory = this.$route.query.data.industryCategory;
          localStorage.setItem("industryCategory", industryCategory);
          var licenseAuthority = this.$route.query.data.licenseAuthority;
          localStorage.setItem("licenseAuthority", licenseAuthority);
        }
        if (pathname == "1") {
          var industryCategory = this.$route.query.industryCategory;
          var registPrefecture = this.$route.query.data.regionCode;
          var licenseAuthority = this.$route.query.data.licenseAuthority;
          localStorage.setItem("registPrefecture", registPrefecture);
          localStorage.setItem("licenseAuthority", licenseAuthority);
          localStorage.setItem("industryCategory", industryCategory);
        }
        var licenseIssuingTimeStart = "";
        var licenseIssuingTimeEnd = "";
        var time = this.$route.query.data.licenseIssuingTimeStart;
        localStorage.setItem("time", time);
        var newtime = localStorage.getItem("time").split(",");
        if (newtime == null) {
          localStorage.setItem("time", []);
        }
        if (newtime.length == "0") {
          var licenseIssuingTimeStart = "";
          var licenseIssuingTimeEnd = "";
        } else {
          var licenseIssuingTimeStart = newtime[0];
          var licenseIssuingTimeEnd = newtime[1];
        }
        var keyPoint = this.$route.query.juge;
        localStorage.setItem("keyPoint", keyPoint);
      }
      if (localStorage.getItem("pathname") == "1") {
        this.searchForm.licenseAuthority =
          localStorage.getItem("licenseAuthority");
        this.searchForm.region = localStorage.getItem("registPrefecture");
        var newregion = this.searchForm.region;
        this.searchForm.industryCategory =
          localStorage.getItem("industryCategory");
        var newindustryCategory = this.searchForm.industryCategory;
      }
      if (localStorage.getItem("pathname") == "2") {
        this.searchForm.industryCategory =
          localStorage.getItem("industryCategory");
        this.searchForm.licenseAuthority =
          localStorage.getItem("licenseAuthority");
        this.searchForm.region = localStorage.getItem("registPrefecture");
        var newregion = this.searchForm.region;
        var newindustryCategory = localStorage.getItem("industryCategory");
      }

      var params = {
        unitName: this.searchForm.unitName,
        licenseNum: this.searchForm.licenseNum,
        unitType: this.searchForm.unitType,
        industryCategory: newindustryCategory,
        licenseAuthority: this.searchForm.licenseAuthority,
        registPrefecture: newregion,
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
        keyPoint: keyPoint,
        licenseIssuingTimeStart: licenseIssuingTimeStart,
        licenseIssuingTimeEnd: licenseIssuingTimeEnd,
        unitState: unitState,
        typeAndScopeSole: this.typeAndScopeSole ? 1 : 0,
      };
      // 放射源
      if (this.isDevice) {
        // 是否生产放射源设备
        params.isProduceDevice = 1;
        params.produceDeviceCategory =
          this.activitiesAndRange.Device.production;
        // 是否销售放射源设备
        params.isSaleDevice = 1;
        params.saleDeviceCategory = this.activitiesAndRange.Device.sale;
        // 是否使用放射源设备
        params.isuseDevice = 1;
        params.useDeviceCategory = this.activitiesAndRange.Device.use;
      } else {
        // 是否生产放射源设备
        params.isProduceDevice = 0;
        params.produceDeviceCategory = [];
        // 是否销售放射源设备
        params.isSaleDevice = 0;
        params.saleDeviceCategory = [];
        // 是否使用放射源设备
        params.isDevice = 0;
        params.useDeviceCategory = [];
      }

      // 非密封放射性物质
      if (this.isMaterial) {
        // 是否生产非密封放射性物质
        params.isUnsealedMaterial = 1;
        params.unsealedMaterialLevel =
          this.activitiesAndRange.Material.production;
        // 是否销售非密封放射性物质
        params.isSaleUnsealedMaterial = 1;
        params.saleUnsealedMaterialLevel =
          this.activitiesAndRange.Material.sale;
        // 是否使用非密封放射性物质
        params.isUseUnsealedMaterial = 1;
        params.useUnsealedMaterialLevel = this.activitiesAndRange.Material.use;
      } else {
        // 是否生产非密封放射性物质
        params.isUnsealedMaterial = 0;
        params.produceDeviceCategory = [];
        // 是否销售非密封放射性物质
        params.isSaleUnsealedMaterial = 0;
        params.saleDeviceCategory = [];
        // 是否使用非密封放射性物质
        params.isUseUnsealedMaterial = 0;
        params.DeviceCategory = [];
      }

      // 射线装置
      if (this.isMaterial) {
        // 是否销售（含建造）Ⅰ类射线装置
        params.isBuildInstallation = 1;
        // 是否生产射线装置
        params.isproduceInstallation = 1;
        params.produceInstallationCategory =
          this.activitiesAndRange.Installation.production;
        // 是否销售射线装置
        params.issaleInstallation = 1;
        params.saleInstallationCategory =
          this.activitiesAndRange.Installation.sale;
        // 是否使用射线装置
        params.isuseInstallation = 1;
        params.useInstallationCategory =
          this.activitiesAndRange.Installation.use;
      } else {
        // 是否销售（含建造）Ⅰ类射线装置
        params.isBuildInstallation = 0;
        // 是否生产射线装置
        params.isproduceInstallation = 0;
        params.produceInstallationCategory = [];
        // 是否销售射线装置
        params.issaleInstallation = 0;
        params.saleInstallationCategory = [];
        // 是否使用射线装置
        params.isuseInstallation = 0;
        params.useInstallationCategory = [];
      }
      Auth.pageListApi(params)
        .then((res) => {
          if (res.code === 0) {
            this.pagination.total = res.data.totalCount || 0;
            this.tableData = res.data.list.map((item) => {
              item.status = "1";
              // item.belongingRegion = item.registProvince + item.registTown + item.registPrefecture
              return item;
            });
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err._msg || "获取列表错误");
        });
    },
    queryexport() {
      var newregion = "";
      var newindustryCategory = "";
      if (this.$route.query.hasOwnProperty("data")) {
        var pathname = this.$route.query.pathname;
        localStorage.setItem("pathname", pathname);
        var unitState = this.$route.query.data.unitState;
        if (pathname == "2") {
          var registPrefecture = this.$route.query.distract;
          localStorage.setItem("registPrefecture", registPrefecture);
          var industryCategory = this.$route.query.data.industryCategory;
          localStorage.setItem("industryCategory", industryCategory);
          var licenseAuthority = this.$route.query.data.licenseAuthority;
          localStorage.setItem("licenseAuthority", licenseAuthority);
        }
        if (pathname == "1") {
          var industryCategory = this.$route.query.industryCategory;
          var registPrefecture = this.$route.query.data.regionCode;
          var licenseAuthority = this.$route.query.data.licenseAuthority;
          localStorage.setItem("registPrefecture", registPrefecture);
          localStorage.setItem("licenseAuthority", licenseAuthority);
          localStorage.setItem("industryCategory", industryCategory);
        }
        var licenseIssuingTimeStart = "";
        var licenseIssuingTimeEnd = "";
        var time = this.$route.query.data.licenseIssuingTimeStart;
        localStorage.setItem("time", time);
        var newtime = localStorage.getItem("time").split(",");
        if (newtime == null) {
          localStorage.setItem("time", []);
        }
        if (newtime.length == "0") {
          var licenseIssuingTimeStart = "";
          var licenseIssuingTimeEnd = "";
        } else {
          var licenseIssuingTimeStart = newtime[0];
          var licenseIssuingTimeEnd = newtime[1];
        }
        var keyPoint = this.$route.query.juge;
        localStorage.setItem("keyPoint", keyPoint);
      }
      if (localStorage.getItem("pathname") == "1") {
        this.searchForm.licenseAuthority =
          localStorage.getItem("licenseAuthority");
        this.searchForm.region = localStorage.getItem("registPrefecture");
        var newregion = this.searchForm.region;
        this.searchForm.industryCategory =
          localStorage.getItem("industryCategory");
        var newindustryCategory = this.searchForm.industryCategory;
      }
      if (localStorage.getItem("pathname") == "2") {
        this.searchForm.industryCategory =
          localStorage.getItem("industryCategory");
        this.searchForm.licenseAuthority =
          localStorage.getItem("licenseAuthority");
        this.searchForm.region = localStorage.getItem("registPrefecture");
        var newregion = this.searchForm.region;
        var newindustryCategory = localStorage.getItem("industryCategory");
      }

      var params = {
        unitName: this.searchForm.unitName,
        licenseNum: this.searchForm.licenseNum,
        unitType: this.searchForm.unitType,
        industryCategory: newindustryCategory,
        licenseAuthority: this.searchForm.licenseAuthority,
        registPrefecture: newregion,
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
        keyPoint: keyPoint,
        licenseIssuingTimeStart: licenseIssuingTimeStart,
        licenseIssuingTimeEnd: licenseIssuingTimeEnd,
        unitState: unitState,
        typeAndScopeSole: this.typeAndScopeSole ? 1 : 0,
      };
      // 放射源
      if (this.isDevice) {
        // 是否生产放射源设备
        params.isProduceDevice = 1;
        params.produceDeviceCategory =
          this.activitiesAndRange.Device.production;
        // 是否销售放射源设备
        params.isSaleDevice = 1;
        params.saleDeviceCategory = this.activitiesAndRange.Device.sale;
        // 是否使用放射源设备
        params.isuseDevice = 1;
        params.useDeviceCategory = this.activitiesAndRange.Device.use;
      } else {
        // 是否生产放射源设备
        params.isProduceDevice = 0;
        params.produceDeviceCategory = [];
        // 是否销售放射源设备
        params.isSaleDevice = 0;
        params.saleDeviceCategory = [];
        // 是否使用放射源设备
        params.isDevice = 0;
        params.useDeviceCategory = [];
      }

      // 非密封放射性物质
      if (this.isMaterial) {
        // 是否生产非密封放射性物质
        params.isUnsealedMaterial = 1;
        params.unsealedMaterialLevel =
          this.activitiesAndRange.Material.production;
        // 是否销售非密封放射性物质
        params.isSaleUnsealedMaterial = 1;
        params.saleUnsealedMaterialLevel =
          this.activitiesAndRange.Material.sale;
        // 是否使用非密封放射性物质
        params.isUseUnsealedMaterial = 1;
        params.useUnsealedMaterialLevel = this.activitiesAndRange.Material.use;
      } else {
        // 是否生产非密封放射性物质
        params.isUnsealedMaterial = 0;
        params.produceDeviceCategory = [];
        // 是否销售非密封放射性物质
        params.isSaleUnsealedMaterial = 0;
        params.saleDeviceCategory = [];
        // 是否使用非密封放射性物质
        params.isUseUnsealedMaterial = 0;
        params.DeviceCategory = [];
      }

      // 射线装置
      if (this.isMaterial) {
        // 是否销售（含建造）Ⅰ类射线装置
        params.isBuildInstallation = 1;
        // 是否生产射线装置
        params.isproduceInstallation = 1;
        params.produceInstallationCategory =
          this.activitiesAndRange.Installation.production;
        // 是否销售射线装置
        params.issaleInstallation = 1;
        params.saleInstallationCategory =
          this.activitiesAndRange.Installation.sale;
        // 是否使用射线装置
        params.isuseInstallation = 1;
        params.useInstallationCategory =
          this.activitiesAndRange.Installation.use;
      } else {
        // 是否销售（含建造）Ⅰ类射线装置
        params.isBuildInstallation = 0;
        // 是否生产射线装置
        params.isproduceInstallation = 0;
        params.produceInstallationCategory = [];
        // 是否销售射线装置
        params.issaleInstallation = 0;
        params.saleInstallationCategory = [];
        // 是否使用射线装置
        params.isuseInstallation = 0;
        params.useInstallationCategory = [];
      }
      listDownLoad.downloadFile(
        "/unitManagement/exportPageList",
        params,
        "post",
        ".xls"
      );
    },
    onSearch() {
      console.log("查询");
      this.pagination.current = 1;
      this.queryPageList();
    },
    changeTableButton(itemButton) {
      if (itemButton.itemButton.id === "chakan") {
        this.$router.push({
          path: "/homeHtml/AnalysisHtml/companyIntroduceTab",
          query: {
            id: itemButton.row.pkId,
            page: "nucleartechnologyjump",
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.tableCommonHeight {
  height: calc(100% - 230px);
}
.mr40 {
  margin-right: 40px;
}
.mr5 {
  margin-right: 5px;
}
.mt20 {
  margin-bottom: 20px;
}
.mr15 {
  margin-bottom: 15px;
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
