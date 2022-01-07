<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">变化趋势图</span>
    </div>
    <div class="Xraechart-main">
      <div class="Xrasearch-wrap">
        <el-form :inline="true" :model="searchForm" class="myForm">
          <el-form-item label="所属区域：" prop="registPrefecture">
            <el-select
              clearable
              v-model="searchForm.registPrefecture"
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
                v-for="item in industyOptions"
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
              @click="getecharts()"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="Xraechart">
        <div class="Xraecharttext">放射源变化趋势图</div>
        <div class="Xraechartid" id="Xraechartid"></div>
      </div>
    </div>
  </div>
</template>

<script>
import noRegionalstatistics from "../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics";
export default {
  name: "nochangetrend",
  data() {
    return {
      zoomshow: false,
      endValue: 100,
      searchForm: {
        industryCategory: "",
        licenseAuthority: "",
        licenseIssuingTimeStart: [],
        registPrefecture: "",
        unitState: "",
        registPrefecture: "",
      },
      unitstatusOptions: [],
      regionOptions: [],
      issuingauthorityOptions: [],
      categoryOptions: [],
      industyOptions: [],
    };
  },
  methods: {
    //获取区域接口
    getregion() {
      noRegionalstatistics.regionfun().then((res) => {
        if (res.code == 0) {
          this.regionOptions = res.data;
        }
      });
    },
    changtimeend() {
      if (
        this.searchForm.licenseIssuingTimeStart == "" ||
        this.searchForm.licenseIssuingTimeEnd == ""
      ) {
        return;
      } else {
        var starttime = new Date(this.searchForm.licenseIssuingTimeStart);
        var endtime = new Date(this.searchForm.licenseIssuingTimeEnd);
        var day = (endtime - starttime) / 1000 / 60 / 60 / 24;
        if (day > 365) {
          this.searchForm.licenseIssuingTimeEnd = "";
          this.$message.error("时间范围不能超过一年哦！");
        }
      }
    },
    allinit() {
      this.getindustryclasslist();
      this.getissuingauthority();
      this.getunitstatusfun();
      this.getecharts();
      this.getregion();
    },
    // 获取echarts图
    getecharts() {
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
        licenseIssuingTimeStart: licenseIssuingTimeStart,
        licenseIssuingTimeEnd: licenseIssuingTimeEnd,
        industryCategory: this.searchForm.industryCategory,
        registPrefecture: this.searchForm.registPrefecture,
        unitState: this.searchForm.unitState,
      };
      noRegionalstatistics.inecharts(params).then((res) => {
        if (res.code == 0) {
          var xdata = res.data.xdata;
          var series = res.data.series;
          if (xdata.length > 20) {
            //this.xData是横轴的数据，通过后台动态获取的
            this.zoomShow = true; //通过横轴数据多少来判断滚动条是否显示(官网说滚动条不显示，但过滤数据的功能还在，过滤数据请移步官网去看具体配置项说明)
            this.endValue = (10 / xdata.length) * 100;
          } else {
            this.zoomShow = false;
            this.endValue = 100; //这里一定要注意不显示滚动条的时候一定要把滚动条结束位置设置一下，不然会有bug
          }
          this.getXraechart(xdata, series);
        }
      });
    },
    //获取行业类别的接口
    getindustryclasslist() {
      noRegionalstatistics.industryclassfun().then((res) => {
        if (res.code == 0) {
          this.industyOptions = res.data;
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
    getXraechart(xdata, series) {
      if (series.lenght == 0) {
        series = [
          {
            value: [],
            name: "",
          },
          {
            value: [],
            name: "",
          },
        ];
      }
      var myChart = this.$echarts.init(document.getElementById("Xraechartid"));
      var option = {
        backgroundColor: "transparent",
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 255, 233,0)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255, 255, 255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 255, 233,0)",
                  },
                ],
                global: false,
              },
            },
          },
        },
        legend: {
          data: ["重点单位", "非重点单位"],
          top: "5%",
          textStyle: {
            color: "rgba(43, 59, 106, 0.4)",
          },
        },
        grid: {
          top: "12%",
          left: "4%",
          right: "5%",
          bottom: "10%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(72, 89, 112, 0.4)",
              },
            },
            splitArea: {
              // show: true,
              color: "rgba(72, 89, 112, 0.4)",
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              color: "rgba(43, 59, 106, 0.6)",
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
                type: "dotted",
              },
            },
            boundaryGap: false,
            data: xdata,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(224, 227, 230, 1)",
                type: "dotted",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 20,
              textStyle: {
                color: "rgba(51, 51, 51, 0.6)",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        dataZoom: {
          type: "slider",
          orient: "horizontal",
          show: this.zoomshow,
          start: 0,
          end: this.endValue,
          // backgroundColor: "#fff",
          // dataBackgroundColor: {
          //   lineStyle: {
          //     color: "#fff",
          //   },
          //   areaStyle: {
          //     color: "yellow",
          //   },
          // },
          // fillerColor: "pink",
          // borderColor: "red",
          bottom: "0%",
        },
        series: [
          {
            name: series[0].name,
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: "rgba(255, 219, 49, 1)",
                shadowColor: "rgba(255, 219, 49, 0.2)",
                shadowBlur: 2,
                shadowOffsetY: 2,
                shadowOffsetX: 12,
              },
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#6c50f3",
              },
            },
            itemStyle: {
              color: "rgba(255, 219, 49, 1)",
              borderColor: "#fff",
              borderWidth: 1,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 0,
              shadowOffsetX: 0,
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(255, 219, 49, 0.2)",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(255, 219, 49, 0)",
                shadowBlur: 0,
              },
            },
            data: series[0].values,
          },
          {
            name: series[1].name,
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: "rgba(116, 81, 241, 1)",
                shadowColor: "rgba(116, 81, 241, .2)",
                shadowBlur: 2,
                shadowOffsetY: 2,
                shadowOffsetX: 12,
              },
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#00ca95",
              },
            },

            itemStyle: {
              color: "rgba(116, 81, 241, 1)",
              borderColor: "#fff",
              borderWidth: 1,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 0,
              shadowOffsetX: 0,
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(116, 81, 241, .2)",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(116, 81, 241, .1)",
                shadowBlur: 0,
              },
            },
            data: series[1].values,
          },
        ],
      };
      myChart.setOption(option);
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
    