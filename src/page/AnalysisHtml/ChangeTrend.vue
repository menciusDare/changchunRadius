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
              @click="getechartsdata()"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="Xraechart">
        <div class="Xraecharttext">射线装置数量历史变化趋势</div>
        <div class="Xraechartid newXraechartid" id="Xraechartid"></div>
      </div>
    </div>
  </div>
</template>

<script>
import noRegionalstatistics from '../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics'
export default {
  name: 'ChangeTrend',
  data () {
    return {
      zoomshow: false,
      endValue: 100,
      searchForm: {
        regionCode: '',
        licenseAuthority: '',
        licenseIssuingTime: ['', '']
      },
      regionOptions: [],
      issuingauthorityOptions: []
    }
  },
  methods: {
    allinit () {
      this.getissuingauthority()
      this.getregion()
      this.getechartsdata()
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
    getechartsdata () {
      // console.log('licenseIssuingTime:', this.searchForm.licenseIssuingTime);
      let params = {
        current: 0,
        size: 0,
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeStart: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[0] : '',
        licenseIssuingTimeEnd: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[1] : '',
        regionCode: this.searchForm.regionCode
      }
      noRegionalstatistics.reecharts(params).then((res) => {
        if (res.code == 0) {
          var xdata = res.data.xdata
          var series = res.data.series ? res.data.series : []
          var name = []
          for (let i = 0; i < series.length; i++) {
            name.push(series[i].name)
          }
          if (xdata.length > 20) {
            // this.xData是横轴的数据，通过后台动态获取的
            this.zoomShow = true // 通过横轴数据多少来判断滚动条是否显示(官网说滚动条不显示，但过滤数据的功能还在，过滤数据请移步官网去看具体配置项说明)
            this.endValue = (10 / xdata.length) * 100
          } else {
            this.zoomShow = false
            this.endValue = 100 // 这里一定要注意不显示滚动条的时候一定要把滚动条结束位置设置一下，不然会有bug
          }
          this.getXraechart(xdata, series, name)
        }
      })
    },
    getXraechart (xdata, series, name) {
      // console.log(series, 'series')
      var myChart = this.$echarts.init(document.getElementById('Xraechartid'))
      var option = {
        backgroundColor: 'transparent',
        title: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)'
                  }
                ],
                global: false
              }
            }
          }
        },
        legend: {
          data: name,
          top: '5%',
          textStyle: {
            color: 'rgba(43, 59, 106, 0.4)'
          }
        },
        grid: {
          top: '12%',
          left: '4%',
          right: '5%',
          bottom: '5%'
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(72, 89, 112, 0.4)'
              }
            },
            splitArea: {
              // show: true,
              color: 'rgba(72, 89, 112, 0.4)',
              lineStyle: {
                color: '#f00'
              }
            },
            axisLabel: {
              color: 'rgba(43, 59, 106, 0.6)'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)',
                type: 'dotted'
              }
            },
            boundaryGap: false,
            data: xdata
          }
        ],

        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(224, 227, 230, 1)',
                type: 'dotted'
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: 20,
              textStyle: {
                color: 'rgba(51, 51, 51, 0.6)'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: series[0].name,
            type: 'line',
            smooth: true, // 是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: 'rgba(255, 219, 49, 1)',
                shadowColor: 'rgba(255, 219, 49, 0.2)',
                shadowBlur: 2,
                shadowOffsetY: 2,
                shadowOffsetX: 12
              }
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#6c50f3'
              }
            },
            itemStyle: {
              color: 'rgba(255, 219, 49, 1)',
              borderColor: '#fff',
              borderWidth: 1,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 0,
              shadowOffsetX: 0
            },
            tooltip: {
              show: true
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
                      color: 'rgba(255, 219, 49, 0.2)'
                    },
                    {
                      offset: 1,
                      color: '#fff'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(255, 219, 49, 0)',
                shadowBlur: 0
              }
            },
            data: series[0].values
          },
          {
            name: series[1].name,
            type: 'line',
            smooth: true, // 是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: 'rgba(91, 143, 249, 1)',
                shadowColor: 'rgba(91, 143, 249, 0.2)',
                shadowBlur: 2,
                shadowOffsetY: 2,
                shadowOffsetX: 12
              }
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#00ca95'
              }
            },

            itemStyle: {
              color: 'rgba(91, 143, 249, 1)',
              borderColor: '#fff',
              borderWidth: 1,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 0,
              shadowOffsetX: 0
            },
            tooltip: {
              show: true
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
                      color: 'rgba(91, 143, 249, 0.2)'
                    },
                    {
                      offset: 1,
                      color: '#fff'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(91, 143, 249, 0)',
                shadowBlur: 0
              }
            },
            data: series[1].values
          },
          {
            name: series[2].name,
            type: 'line',
            smooth: true, // 是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: 'rgba(238, 140, 45, 1)',
                shadowColor: 'rgba(238, 140, 45, 0.2)',
                shadowBlur: 2,
                shadowOffsetY: 2,
                shadowOffsetX: 12
              }
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#00ca95'
              }
            },

            itemStyle: {
              color: 'rgba(238, 140, 45, 1)',
              borderColor: '#fff',
              borderWidth: 1,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 0,
              shadowOffsetX: 0
            },
            tooltip: {
              show: true
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
                      color: 'rgba(238, 140, 45, .2)'
                    },
                    {
                      offset: 1,
                      color: '#fff'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(238, 140, 45, 0)',
                shadowBlur: 0
              }
            },
            data: series[2].values
          }
        ]
      }
      myChart.setOption(option)
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
