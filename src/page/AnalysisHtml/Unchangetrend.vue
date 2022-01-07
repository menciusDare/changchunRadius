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
              :picker-options = "pickerOptions"
              @change='changeDate'
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
              @click="getechartdata()"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="Xraechart ">
        <div class="Xraecharttext">非密封放射性物质历史变化趋势</div>
        <div class="Xraechartid newXraechartid" id="Xraechartid"></div>
      </div>
    </div>
  </div>
</template>

<script>
import noRegionalstatistics from '../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics'
export default {
  name: 'Unchangetrend',
  data () {
    return {
      zoomshow: false,
      endValue: 100,
      datetype: 'date',
      valueformat: 'yyyy-MM-dd',
      dateformat: 'yyyy-MM-dd',
      searchForm: {
        regionCode: '',
        licenseIssuingTime: ['', ''],
        dateType: '3',
        licenseAuthority: ''
      },
      dateTypeOptions: [
        {
          value: '1',
          label: '年'
        },
        {
          value: '2',
          label: '月'
        },
        {
          value: '3',
          label: '日'
        }
      ],
      minDate: '',
      maxDate: '',
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.minDate = minDate
          this.maxDate = maxDate
        },
        disabledDate: (time) => {
          let curDate = new Date().getTime()
          let three = 365 * 24 * 3600 * 1000
          if (this.minDate) {
            return (
              time.getTime() > Date.now() ||
              time > new Date(this.minDate.getTime() + three) ||
              time < new Date(this.minDate.getTime() - three)
            )
          }
          return time.getTime() > Date.now()
        }
      },
      regionOptions: [
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
      issuingauthorityOptions: [
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
      ]
    }
  },
  methods: {
    allinit () {
      this.getissuingauthority()
      this.getregion()
      this.getechartdata()
    },
    changeDate (e) {
      if (e === null) {
        this.minDate = ''
        this.maxDate = ''
        this.pickerBeginDateBefore = {
          disabledDate: (time) => {
            let curDate = new Date().getTime()
            let three = 365 * 24 * 3600 * 1000
            if (this.minDate) {
              return (
                time.getTime() > Date.now() ||
                time > new Date(this.minDate.getTime() + three) ||
                time < new Date(this.minDate.getTime() - three)
              )
            }
            return time.getTime() > Date.now()
          }
        }
      }
    },
    getechartdata () {
      let params = {
        licenseAuthority: this.searchForm.licenseAuthority,
        licenseIssuingTimeStart: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[0] : '',
        licenseIssuingTimeEnd: this.searchForm.licenseIssuingTime ? this.searchForm.licenseIssuingTime[1] : '',
        regionCode: this.searchForm.regionCode,
        dateType: this.searchForm.dateType
      }
      noRegionalstatistics.unecharts(params).then((res) => {
        if (res.code === 0) {
          var ydata = res.data.yData
          var xData = res.data.xData
          var firstlist = []
          var secondlist = []
          var thirdlist = []
          for (let i = 0; i < ydata.length; i++) {
            firstlist.push(ydata[i].firstCount)
            secondlist.push(ydata[i].secondCount)
            thirdlist.push(ydata[i].lastCount)
          }
          if (xData.length > 20) {
            // this.xData是横轴的数据，通过后台动态获取的
            this.zoomShow = true // 通过横轴数据多少来判断滚动条是否显示(官网说滚动条不显示，但过滤数据的功能还在，过滤数据请移步官网去看具体配置项说明)
            this.endValue = (10 / xData.length) * 100
          } else {
            this.zoomShow = false
            this.endValue = 100 // 这里一定要注意不显示滚动条的时候一定要把滚动条结束位置设置一下，不然会有bug
          }
          this.getXraechart(xData, firstlist, secondlist, thirdlist)
        }
      })
    },
    getXraechart (xData, firstlist, secondlist, thirdlist) {
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
          data: ['甲级', '乙级', '丙级'],
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
            data: xData
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
        dataZoom: {
          type: 'slider',
          orient: 'horizontal',
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
          bottom: '0%'
        },
        series: [
          {
            name: '甲级',
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
              borderWidth: 3,
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
                      color: 'rgba(255, 219, 49, 0.1)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(255, 219, 49, 0)',
                shadowBlur: 0
              }
            },
            data: firstlist
          },
          {
            name: '乙级',
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
              borderWidth: 10,
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
                      color: 'rgba(91, 143, 249, 0.1)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(91, 143, 249, 0)',
                shadowBlur: 0
              }
            },
            data: secondlist
          },
          {
            name: '丙级',
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
              borderWidth: 10,
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
                      color: 'rgba(238, 140, 45, .1)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(238, 140, 45, 0)',
                shadowBlur: 0
              }
            },
            data: thirdlist
          }
        ]
      }
      myChart.setOption(option)
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
    // 获取区域接口
    getregion () {
      noRegionalstatistics.regionfun().then((res) => {
        if (res.code == 0) {
          this.regionOptions = res.data
        }
      })
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
