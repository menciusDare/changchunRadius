<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">变化趋势图</span>
    </div>
    <div class="Xraechart-main">
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
              @click="getechartsdata()"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="Xraechart">
        <div class="Xraecharttext">巡检情况变化趋势图</div>
        <div class="Xraechartid newXraechartid" id="Xraechartid"></div>
      </div>
    </div>
  </div>
</template>    

<script>
import noRegionalstatistics from "../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics";
export default {
  name: "Mobchangetrend",
  data() {
    return {
      zoomshow: false,
      endValue: 100,
      searchForm: {
        regionCode: "",
        licenseIssuingTimeStart: [],
      },
      regionOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      issuingauthorityOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      categoryOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  methods: {
    allinit() {
      this.getregion();
      this.getechartsdata();
    },
    //获取echarts接口
    getechartsdata() {
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
        regionCode: this.searchForm.regionCode,
        startTime: licenseIssuingTimeStart,
      };
      noRegionalstatistics.getmobechartshttp(params).then((res) => {
        if (res.code == 0) {
          console.log(res.data, "aaa");
          var totalCount = [];
          var xData = [];
          var actualCount = [];
          var completeRate = [];
          var ydata = res.data;
          console.log(ydata, "ydata");
          for (let i = 0; i < ydata.length; i++) {
            totalCount.push(ydata[i].totalCount);
            actualCount.push(ydata[i].actualCount);
            completeRate.push(ydata[i].completeRate);
            xData.push(ydata[i].year);
          }
          if (xData.length > 20) {
            //this.xData是横轴的数据，通过后台动态获取的
            this.zoomShow = true; //通过横轴数据多少来判断滚动条是否显示(官网说滚动条不显示，但过滤数据的功能还在，过滤数据请移步官网去看具体配置项说明)
            this.endValue = (10 / xData.length) * 100;
          } else {
            this.zoomShow = false;
            this.endValue = 100; //这里一定要注意不显示滚动条的时候一定要把滚动条结束位置设置一下，不然会有bug
          }
          this.getXraechart(totalCount, actualCount, completeRate, xData);
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
    getXraechart(totalCount, actualCount, completeRate, xData) {
      var myChart = this.$echarts.init(document.getElementById("Xraechartid"));
      var option = {
        backgroundColor: "transparent",
        title: {},
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            console.log(params, "paramskongtaixi");
            var htmlStr = "";
            for (var i = 0; i < params.length; i++) {
              var param = params[i];
              // var xName = param.name;//x轴的名称
              var seriesName = param.seriesName; //图例名称
              var value = param.value; //y轴值
              var color = param.color; //图例颜色

              htmlStr += "<div>";
              //为了保证和原来的效果一样，这里自己实现了一个点的效果
              htmlStr +=
                '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                color +
                ';"></span>';

              // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
              //htmlStr += '<span style="color:'+color+'">';
              if (seriesName == "巡检完成率") {
                value = value + "%";
              }else{
                value = value + "次";
              }
              //圆点后面显示的文本
              htmlStr += seriesName + "：" + value + "";

              // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
              //htmlStr += '</span>';

              htmlStr += "</div>";
            }
            return htmlStr;
          },
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
          data: ["目标巡检次数", "实际巡检次数", "巡检完成率"],
          top: "5%",
          textStyle: {
            color: "rgba(43, 59, 106, 0.4)",
          },
        },
        grid: {
          top: "12%",
          left: "4%",
          right: "5%",
          bottom: "5%",
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
            data: xData,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            name: "次数",
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
          {
            type: "value",
            name: "完成率（%）",
            min: 20,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: function (params) {
                console.log(params, "paramsssss");
                return params;
              },
            },
            axisLine: {
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
            name: "目标巡检次数",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: "rgba(255, 219, 49, 1)",
                // shadowColor: "rgba(255, 219, 49, 0.2)",
                // shadowBlur: 2,
                // shadowOffsetY: 2,
                // shadowOffsetX: 12,
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
              // shadowColor: "rgba(0, 0, 0, .3)",
              // shadowBlur: 0,
              // shadowOffsetY: 0,
              // shadowOffsetX: 0,
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
            normal: {
              // 右，下，左，上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#FFF1AD'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ], false)

            }
          },

            data: totalCount,
          },
          {
            name: "实际巡检次数",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: "rgba(91, 143, 249, 1)",
                // shadowColor: "rgba(91, 143, 249, 0.2)",
                // shadowBlur: 2,
                // shadowOffsetY: 2,
                // shadowOffsetX: 12,
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
              color: "rgba(91, 143, 249, 1)",
              borderColor: "#fff",
              borderWidth: 1,
              // shadowColor: "rgba(0, 0, 0, .3)",
              // shadowBlur: 0,
              // shadowOffsetY: 0,
              // shadowOffsetX: 0,
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
            normal: {
              // 右，下，左，上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#5B8FF9'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ], false)

            }
          },
            data: actualCount,
          },
          {
            name: "巡检完成率",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            yAxisIndex: 1,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: "rgba(238, 140, 45, 1)",
                shadowColor: "rgba(238, 140, 45, 0.2)",
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
              color: "rgba(238, 140, 45, 1)",
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
              // 右，下，左，上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#F9D1AB'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ], false)

            }
          },
            data: completeRate,
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
    