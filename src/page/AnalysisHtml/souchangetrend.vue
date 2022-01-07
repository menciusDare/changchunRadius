<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">放射源数量出厂时间变化趋势图</span>
    </div>
    <div class="Xraechart-main">
      <div class="Xrasearch-wrap">
      <el-form :inline="true"  class="myForm">
                     <el-form-item label="所属区域" prop="belongArea">
                    <el-select v-model="belongArea" clearable placeholder="请选择" >
                        <!-- <el-option :key="-1" :label="'请选择'" :value="-1"></el-option> -->
                       <el-option
                            v-for="item in belongAreaList"
                            :key="item.pkId"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="发证机关" prop="releaseOrganization">
                    <el-select v-model="releaseOrganization" clearable placeholder="请选择" >
                        <!-- <el-option :key="-1" :label="'请选择'" :value="-1"></el-option> -->
                          <el-option
                            v-for="item in giveOrganizationsList"
                           :key="item.pkId"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>

  <el-form-item label="出厂时间:" prop="outFactionaryDate">
     <div class="block">
    <el-date-picker
      v-model="outFactionaryDate"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
                        </el-form-item>

                       <br>
                                  <el-form-item label="放射源状态" prop="radiusSpotStatus">
                    <el-select v-model="radiusSpotStatus" clearable placeholder="请选择" >
                        <!-- <el-option :key="-1" :label="'请选择'" :value="-1"></el-option> -->
                        <el-option
                            v-for="item in radiusSpotList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                 <el-button type="primary" @click="searchInfo()"
                  style="
                width: 115px;
                height: 35px;
                background: rgba(66, 139, 202, 1);
                border-color: rgba(66, 139, 202, 1);
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #ffffff;
                margin-top: -20px;
              ">查询</el-button>
                </el-form-item>
                 </el-form>
        <!-- <el-form :inline="true" :model="searchForm" class="myForm">
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
        </el-form> -->
      </div>

      <div class="Xraechart ">
        <div class="Xraecharttext">非密封放射性物质历史变化趋势</div>

        <div id="main" class="Xraechartid newXraechartid"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/Xraydevice/index.css";
</style>

<script>
import echarts from 'echarts'
import Api from '@/common/api/AnalysisHtml/radiusOriginAnalysis/index.js'
export default {
  name: 'souchangetrend',
  data () {
    return {
      legendList: [{'color': 'orange', 'label': 'Ⅰ类源'}, {'color': 'red', 'label': 'Ⅱ类源'}, {'color': 'green', 'label': 'Ⅲ类源'},
        {'color': 'purple', 'label': 'Ⅳ类源'},
        {'color': 'blue', 'label': 'Ⅴ类源'}, {'color': 'yellow', 'label': 'N类源'}],
      charts: '',
      xdata: ['2021年6月', '2021年7月', '2021年8月', '2021年9月', '2021年10月', '2021年11月', '2021年12月', '2021年13月'],
      adata: [0, 0, 0, 0, 20, 40, 10, 30, 12, 19, 27, 45],
      bdata: [0, 0, 0, 0, 9, 17, 35, 70, 29, 43, 46],
      cdata: [0, 0, 0, 0, 0, 0, 28, 34, 38, 70, 67, 55, 77],
      ddata: [20, 30, 46, 91, 40, 57, 83, 87, 19, 27],
      edata: [78, 67, 55, 0, 9, 70, 46, 10, 28, 50, 40],
      fdata: [70, 20, 29, 0, 0, 0, 90, 34, 38, 78, 77, 77, 7],

      belongAreaList: [ ],
      belongArea: '',
      releaseOrganization: '', // 发证机关
      radiusSpotStatus: '', // 放射源状态
      purposeCode: '', // 区域
      firstTypeSpot: '',
      secondTypeSpot: '',
      thirdTypeSpot: '',
      fourthTypeSpot: '',
      fifthTypeSpot: '',
      ntypeSpot: '',
      total: '',
      outFactionaryDate: '', // 出厂时间
      // outFactionaryTilDate: '', // 出厂时间至
      radiusSpotList: [ {'value': 1, 'label': '在用源'}, {'value': 2, 'label': '非在用源'} ],

      giveOrganizationsList: [ ],
      count: 1000, // 默认数据总数---------------------------------------新加以上数据----------------------------------------------
      cur_page: 1,
      cur_pageSize: 10,
      istag: true,
      dialogadd: false,
      dialogedit: false,
      dialogdelete: false,
      shouquan: false,
      expandedKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 展开的菜单项
      checkedKeys: [], // 选中的菜单项
      pageSizes: [5, 10, 15, 20],
      addOrUp: '1',
      menuItems: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        createDate: '',
        createId: 0,
        deleteFlag: 0,
        regionLever: '',
        remarks: '',
        roleCode: '',
        roleType: 1,
        roleId: '',
        roleName: '',
        updateDate: ''
      },
      formMu: {
        menuIds: [],
        roleId: 0
      },
      value5: [],
      tableData: [],
      roleName: '',
      roleType: -1,
      roleTypeList: [/* {'value': 1, 'label': '网格员'},{'value': 3, 'label': '监管人'},{'value': 5, 'label': '领导'},
                    {'value':46,'label':'公众服务用户'},
                    {'value': 1001, 'label': '街道执法人员'},
                    {'value': 2001, 'label': '区县分局监管人'},
                    {'value': 3001, 'label': '环评处'},
                    {'value': 4001, 'label': '水专班'},
                    {'value': 5001, 'label': '气专班'},
                    {'value': 6001, 'label': '土专班'},
                    {'value': 7001, 'label': '声专班'},
                    {'value': 8001, 'label': '渣专班'},
                    {'value': 9001, 'label': '第三方技术公司'} */
      ],
      leverList: [{'value': '1', 'label': '市级'}, {'value': '2', 'label': '县/区级'}, {'value': '3', 'label': '镇/街级'}],
      rules: {
        regionLever: [
          {required: true, message: '请选择行政级别', trigger: 'blur'}
        ],
        roleName: [
          {required: true, message: '请填写角色名称', trigger: 'change'}
        ]
      }

    }
  },
  computed: {
    // getTable () {
    //   const self = this
    //   return self.tableData
    // }
  },
  methods: {
    drawLine (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          // text: '放射源变化趋势图',
          // x: '50%',
          // y: '1%',
          // textAlign: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Ⅰ类源', 'Ⅱ类源', 'Ⅲ类源', 'Ⅳ类源', 'Ⅴ类源', 'N类源'], // 图例
          // show: false,
          icon: '',
          top: '5%',
          textStyle: {
            color: 'rgba(43, 59, 106, 0.4)'
          }
          // orient: 'vertical', // 垂直显示
          // y: '10%', // 延Y轴居中
          // x: 'center' // 居右显示
          // itemWidth: 15, // 设置宽度
          // itemHeight: 15, // 设置高度
          // padding: 0.5 // 调节legend的位置
          // selected: {'Ⅰ类源': false, 'Ⅱ类源': false, 'Ⅲ类源': false, 'Ⅳ类源': false, 'Ⅴ类源': false, 'N类源': false}

        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {// 横坐标
          name: '时间',
          type: 'category',
          boundaryGap: false,
          data: this.xdata

        },
        yAxis: {
          name: '数量',
          type: 'value'
        },
        // 三条折线就有三种series，可以更改type以改变是否为折线
        series: [{
          name: 'Ⅰ类源',
          type: 'line',
          smooth: true,
          symbol: 'circle', // 拐点样式
          symbolSize: 6, // 拐点大小
          lineStyle: {
            normal: {
              color: '#FFF1AD',
              width: 3
            }
          },
          itemStyle: {
            normal: {
              color: '#FFF1AD', // 拐点颜色
              borderColor: '#fff', // 拐点边框颜色
              borderWidth: 1// 拐点边框大小
            }
          },
          areaStyle: {
            normal: {
              // 右，下，左，上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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

          data: this.adata
        },
        {
          name: 'Ⅱ类源',
          type: 'line',
          smooth: true,
          symbol: 'circle', // 拐点样式
          symbolSize: 6, // 拐点大小
          lineStyle: {
            normal: {
              color: '#5B8FF9',
              width: 3
            }
          },
          itemStyle: {
            normal: {
              color: '#5B8FF9', // 拐点颜色
              borderColor: '#fff', // 拐点边框颜色
              borderWidth: 1// 拐点边框大小
            }
          },
          areaStyle: {
            normal: {
              // 右，下，左，上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
          data: this.bdata
        },
        {
          name: 'Ⅲ类源',
          type: 'line',
          smooth: true,
          symbol: 'circle', // 拐点样式
          symbolSize: 6, // 拐点大小
          lineStyle: {
            normal: {
              color: '#F9D1AB',
              width: 3
            }
          },
          itemStyle: {
            normal: {
              color: '#F9D1AB', // 拐点颜色
              borderColor: '#fff', // 拐点边框颜色
              borderWidth: 1// 拐点边框大小
            }
          },
          areaStyle: {
            normal: {
              // 右，下，左，上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
          data: this.cdata
        }, {
          name: 'Ⅳ类源',
          type: 'line',
          smooth: true,
          symbol: 'circle', // 拐点样式
          symbolSize: 6, // 拐点大小
          lineStyle: {
            normal: {
              color: '#7451F1',
              width: 3
            }
          },
          itemStyle: {
            normal: {
              color: '#7451F1', // 拐点颜色
              borderColor: '#fff', // 拐点边框颜色
              borderWidth: 1// 拐点边框大小
            }
          },
          areaStyle: {
            normal: {
              // 右，下，左，上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#7451F1'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ], false)

            }
          },
          data: this.ddata
        }, {
          name: 'Ⅴ类源',
          type: 'line',
          smooth: true,
          symbol: 'circle', // 拐点样式
          symbolSize: 6, // 拐点大小
          // symbolColor: 'blue',
          lineStyle: {
            normal: {
              color: '#BDF0DC',
              width: 3

            }
          },
          itemStyle: {
            normal: {
              color: '#BDF0DC', // 拐点颜色
              borderColor: '#fff', // 拐点边框颜色
              borderWidth: 1// 拐点边框大小
            }
          },
          areaStyle: {
            normal: {
              // 右，下，左，上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#BDF0DC'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ], false)

            }
          },
          data: this.edata
        }, {
          name: 'N类源',
          type: 'line',
          smooth: true,
          symbol: 'circle', // 拐点样式
          symbolSize: 6, // 拐点大小
          lineStyle: {
            normal: {
              color: '#FFB9B9',
              width: 3
            }
          },
          itemStyle: {
            normal: {
              color: '#FFB9B9', // 拐点颜色
              borderColor: '#fff', // 拐点边框颜色
              borderWidth: 1// 拐点边框大小
            }
          },
          areaStyle: {
            normal: {
              // 右，下，左，上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#FFB9B9'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ], false)

            }
          },
          data: this.fdata
        }
        ]
      })
    },
    // 查询
    searchInfo () {
      let query = { }
      query.belongArea = this.belongArea
      if (this.outFactionaryDate.length === 0) {
        query.outFactionaryDate = ''
        query.outFactionaryTilDate = ''
      } else {
        query.outFactionaryDate = this.outFactionaryDate[0]
        query.outFactionaryTilDate = this.outFactionaryDate[1]
      }
      query.radiusSpotStatus = this.radiusSpotStatus
      query.releaseOrganization = this.releaseOrganization
      Api.getChangeTrend(query).then(res => {
        if (res.code === 0) {
          this.xdata = res.data.xdata
          this.adata = res.data.series[0].values
          this.bdata = res.data.series[1].values
          this.cdata = res.data.series[2].values
          this.ddata = res.data.series[3].values
          this.edata = res.data.series[4].values
          this.fdata = res.data.series[5].values
        }
        this.drawLine('main')
      })
        .catch(err => {
          console.log('err', err)
        })
    },
    getAreaListData () {
      Api.getAreaList().then(res => {
        if (res.code === 0) {
          this.belongAreaList = res.data
        }
      })
        .catch(err => {
          console.log('err', err)
        })
    },
    getOrgListData () {
      Api.getOrgList().then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.giveOrganizationsList = res.data
        }
      })
        .catch(err => {
          console.log('err', err)
        })
    },
    show () {
      var _this = this
      _this.cur_page = 1
      _this.initPage()
    }
    // tableRowClassName ({row, rowIndex}) {
    //   if (rowIndex === 0) {
    //     return 'th'
    //   }
    //   return ''
    // },
    // switchChange () {
    //   this.istag = !this.istag
    // },

    // current_change: function (currentPage) {
    //   this.currentPage = currentPage
    // },
    // roleDelete (row) {
    //   let self = this
    //   self.$confirm('是否删除该角色?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     self.$axios.delete('/api/base/sysRole/' + row.roleId, {}).then((res) => {
    //       if (res.code == 0) {
    //         self.initPage()
    //         self.$message({
    //           type: 'success',
    //           message: '删除成功!'
    //         })
    //       } else {
    //         self.$message({
    //           type: 'error',
    //           message: '删除失败!'
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     self.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // handleSizeChange (val) {
    //   // 改变每页显示的条数
    //   this.pagesize = val
    //   // 注意：在改变每页显示的条数时，要将页码显示到第一页
    //   this.currentPage = 1
    // },
    // initPage () {
    //   var _this = this
    //   var url = '/api/base/sysRole/page'
    //   _this.$axios.get(url, {
    //     params: {
    //       page: _this.cur_page,
    //       limit: _this.cur_pageSize,
    //       roleName: _this.roleName,
    //       roleType: _this.roleType !== '' ? _this.roleType : '-1',
    //       orderByField: 'createDate',
    //       isAsc: true

    //     }
    //   }).then(function (response) {
    //     _this.tableData = response.data.records
    //     _this.count = response.data.total
    //   })
    // },
    // getIndex (index) {
    //   let curPage = this.cur_page
    //   let limitPage = this.cur_pageSize
    //   return (index + 1) + (curPage - 1) * limitPage
    // },
    // handleCurrentChange (val) {
    //   this.cur_page = val
    //   this.initPage()
    // },
    // handleSizeChange (val) {
    //   const self = this
    //   self.cur_pageSize = val
    //   self.initPage()
    // },
    // insertRole (Form) {
    //   const self = this
    //   self.$refs[Form].validate((valid) => {
    //     if (valid) {
    //       self.$axios.post(
    //         '/api/base/sysRole', self.form
    //       ).then(function (res) {
    //         if (res.code == 0) {
    //           self.$message.success('提交成功！')
    //           self.closeAddRole()
    //           self.cur_page = 1
    //           self.initPage()
    //           // console.log(self.tableData);
    //         } else {
    //           self.$message.error(res.msg)
    //         }
    //       }).catch(function (err) {
    //         self.$message.info('提交失败！')
    //       })
    //     } else {
    //       this.$message.error('提交失败！')
    //     }
    //   })
    // },
    // fomatterRegionLever (row, column) {
    //   var str = ''
    //   this.leverList.forEach(function (item) {
    //     if (row.regionLever === item.value) {
    //       str = item.label
    //     }
    //   })
    //   return str
    // },
    // closeAddRole () {
    //   const self = this
    //   self.dialogadd = false
    //   self.addOrUp = '1'
    //   self.form = {
    //     createDate: '',
    //     createId: 0,
    //     deleteFlag: 0,
    //     // regionLever: '',
    //     remarks: '',
    //     roleCode: '',
    //     roleId: '',
    //     roleType: 1,
    //     roleName: '',
    //     updateDate: ''
    //   }
    // },
    // addOrUpRole (type, row) {
    //   const self = this
    //   if (type === 1) {
    //     self.addOrUp = '1'
    //     self.dialogadd = true
    //   } else if (type === 2) {
    //     self.showRoleInfo(row)
    //   }
    // },
    // upRole (Form) {
    //   const self = this
    //   self.$refs[Form].validate((valid) => {
    //     if (valid) {
    //       self.$axios.put(
    //         '/api/base/sysRole', self.form
    //       ).then(function (res) {
    //         if (res.code == 0) {
    //           self.$message.success('修改成功！')
    //           self.closeAddRole()
    //           self.cur_page = 1
    //           self.initPage()
    //           // console.log(self.tableData);
    //         } else {
    //           self.$message.error(res.msg)
    //         }
    //       }).catch(function (err) {
    //         self.$message.info('修改失败！')
    //       })
    //     } else {
    //       this.$message.error('修改失败！')
    //     }
    //   })
    // },
    // showRoleInfo (row) {
    //   // 查询
    //   let self = this
    //   self.$axios.get('/api/base/sysRole/' + row.roleId, {}).then((res) => {
    //     if (res.code === 0) {
    //       self.form = res.data
    //       self.addOrUp = '2'
    //       self.dialogadd = true
    //     } else {
    //       this.$message.error('查询失败！')
    //     }
    //   })
    // },
    // roleAuthorization (row) {
    //   let self = this
    //   self.form = row
    //   var url = '/api/base/sysMenu/getTree'
    //   self.$axios.get(url, {}).then(function (response) {
    //     self.menuItems = response.data
    //     var url = '/api/base/sysMenu/roleTree/' + row.roleId
    //     self.$axios.get(url, {}).then(function (response) {
    //       self.checkedKeys = response.data
    //       let parentList = self.menuItems
    //       while (parentList.length > 0) {
    //         let item = parentList.pop()
    //         if (item.children == null) {
    //           continue
    //         } else if (self.idInList(item.id, self.checkedKeys)) {
    //           self.checkedKeys.splice(self.checkedKeys.findIndex(a => a === item.id), 1)
    //         }
    //         parentList = parentList.concat(item.children)
    //       }
    //       self.shouquan = true
    //     })
    //   })
    // },
    // idInList (id, list) {
    //   let flag = false
    //   list.forEach(v => {
    //     if (v === id) {
    //       flag = true
    //     }
    //   })
    //   return flag
    // }
    // insertMenu () {
    //   let self = this
    //   var roleTree = self.$refs.treeMenu.getCheckedNodes(false, true)
    //   if (roleTree != null && roleTree.length > 0) {
    //     var menu = []
    //     for (var i = 0; i < roleTree.length; i++) {
    //       menu.push(roleTree[i].id)
    //     }
    //     self.formMu.menuIds = menu
    //     self.formMu.roleId = self.form.roleId
    //     self.$axios.post(
    //       '/api/base/sysRole/roleMenuUpd', self.formMu
    //     ).then(function (res) {
    //       if (res.code == 0) {
    //         self.$message.success('授权成功！')
    //         self.shouquan = false
    //         self.initPage()
    //         // console.log(self.tableData);
    //       } else {
    //         self.$message.error(res.data.msg)
    //       }
    //     }).catch(function (err) {
    //       self.$message.info('授权失败！')
    //     })
    //     self.form = {
    //       createDate: '',
    //       createId: 0,
    //       deleteFlag: 0,
    //       regionLever: '',
    //       remarks: '',
    //       roleCode: '',
    //       roleId: '',
    //       roleName: '',
    //       updateDate: ''
    //     }
    //   } else {
    //     self.$message.error('请选择菜单！')
    //   }
    // },
    // closeMenu () {
    //   this.checkedKeys = []
    //   this.formMu = {
    //     menuIds: [],
    //     roleId: 0
    //   }
    //   this.shouquan = false
    // },
    // roleNameChange () {
    //   this.form.roleName = this.form.roleName.replace(' ', '')
    // },
    // showDictSelect (type) {
    //   var _this = this
    //   var urlDept = '/api/base/sysDictDetails/info?typeId=' + type
    //   _this.$axios.get(urlDept).then(function (response) {
    //     if (response.data && response.data.length > 0) {
    //       response.data.forEach(item => {
    //         item.code = parseInt(item.code)
    //       })
    //     }
    //     _this.roleTypeList = response.data
    //   })
    // }
  },
  created: function () {
    this.searchInfo()
    this.getAreaListData()
    this.getOrgListData()
    // this.total = this.tableData.length
    // this.initPage()
    // this.showDictSelect(24)
  },
  mounted () {
    this.$nextTick(function () {
      this.drawLine('main')
    })
  }
}
</script>

<style scoped>
@import "../../assets/Xraydevice/index.css";
.legend_icon{
  width:15px;
  height:15px;
}
</style>
