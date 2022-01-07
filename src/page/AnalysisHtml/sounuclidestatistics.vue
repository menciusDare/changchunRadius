<template>
  <div class="pageBox">
    <div class="pageName">核素统计</div>
    <div class="panelMain">
        <el-form :inline="true" class="myForm">
             <el-form-item label="所属区域" prop="belongArea">
                    <el-select v-model="belongArea" clearable placeholder="请选择" style="width: 150px">
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
                    <el-select v-model="releaseOrganization" clearable placeholder="请选择" style="width: 150px">
                        <!-- <el-option :key="-1" :label="'请选择'" :value="-1"></el-option> -->
                        <el-option
                            v-for="item in giveOrganizationsList"
                           :key="item.pkId"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>

                                   <el-form-item label="出厂时间:" prop="outFactionaryDate">
                        <div class="block">
    <el-date-picker
      v-model="outFactionaryDate"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>

                        </el-form-item>

                       <br>
                                  <el-form-item label="放射源状态" prop="radiusSpotStatus">
                    <el-select v-model="radiusSpotStatus" clearable placeholder="请选择" style="width: 150px">
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
 <el-button type="primary" @click="searchInfo()" >查询</el-button>
                        <el-button type="primary" @click="exportExcel()" >导出</el-button>
               </el-form-item>
      </el-form>
      <div class="tableWrap">
        <el-table :data="tableData" border style="width: 100%" height="100%" class="myTableBox">
                       <el-table-column type="index" label="序号" align="center" width="50px">
                <!-- <el-table-column type="index" :index="getIndex" label="序号" align="center" width="50px"> -->
                </el-table-column>

                <el-table-column prop="nuclideName" label="核素名称"  align="center" :show-overflow-tooltip="true" ></el-table-column>
                          <el-table-column prop="firstTypeSpot" label="Ⅰ类源"  align="center" :show-overflow-tooltip="true" >
                                 <template slot-scope="scope">
             <a @click="handleJump(scope.row,1)" class="jupm_atag">{{scope.row.firstTypeSpot}}</a>

  </template>
                 </el-table-column>
                               <el-table-column prop="secondTypeSpot" label="Ⅱ类源"  align="center" :show-overflow-tooltip="true" >
                                                                 <template slot-scope="scope">
             <a @click="handleJump(scope.row,2)" class="jupm_atag">{{scope.row.secondTypeSpot}}</a>

  </template>
                               </el-table-column>
                                   <el-table-column prop="thirdTypeSpot" label="Ⅲ类源"  align="center" :show-overflow-tooltip="true" >
                                                                     <template slot-scope="scope">
             <a @click="handleJump(scope.row,3)" class="jupm_atag">{{scope.row.thirdTypeSpot}}</a>

  </template>
                                   </el-table-column>
                                       <el-table-column prop="fourthTypeSpot" label="Ⅳ类源"  align="center" :show-overflow-tooltip="true" >
                                                                     <template slot-scope="scope">
             <a @click="handleJump(scope.row,4)" class="jupm_atag">{{scope.row.fourthTypeSpot}}</a>

  </template>
                                       </el-table-column>
                                           <el-table-column prop="fifthTypeSpot" label="Ⅴ类源"  align="center" :show-overflow-tooltip="true" >
                                                                    <template slot-scope="scope">
             <a @click="handleJump(scope.row,5)" class="jupm_atag">{{scope.row.fifthTypeSpot}}</a>

  </template>
                                           </el-table-column>
                                               <el-table-column prop="ntypeSpot" label="N类源"  align="center" :show-overflow-tooltip="true" >
                                                                    <template slot-scope="scope">
             <a @click="handleJump(scope.row,6)" class="jupm_atag">{{scope.row.ntypeSpot}}</a>

  </template>
                                               </el-table-column>
                                                   <el-table-column prop="total" label="合计"  align="center" :show-overflow-tooltip="true" >
                                                                    <template slot-scope="scope">
             <a @click="handleJump(scope.row,-1)" class="jupm_atag">{{scope.row.total}}</a>
  </template>
  </el-table-column>
                <!-- <el-table-column label="操作" align="center" width="210">
                    <template  slot-scope="scope">
                        <el-button @click="addOrUpRole(2,scope.row)">修改</el-button>
                        <el-button @click="roleDelete(scope.row)">删除</el-button>
                        <el-button @click="roleAuthorization(scope.row)">授权</el-button>
                    </template>
                </el-table-column> -->
        </el-table>
      </div>

    </div>

  </div>
</template>

<script>
import Api from '@/common/api/AnalysisHtml/radiusOriginAnalysis/index.js'
import axios from 'axios'
// import {EventBus} from '@/common/eventbus'
export default {
  name: 'sounuclidestatistics',
  data () {
    return {
      belongAreaList: [ ],
      belongArea: '',
      releaseOrganization: '', // 发证机关
      radiusSpotStatus: '', // 放射源状态
      nuclideName: '', // 区域
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
      // value5: [],
      tableData: [],
      roleName: '',
      roleType: -1,
      // roleTypeList: [
      // ],
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
    getTable () {
      const self = this
      return self.tableData
    }
  },
  methods: {
    styleBack ({ row, column, rowIndex, columnIndex }) {
      return 'border-right:none;font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;'
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;'
    },
    handleJump (row, classType) {
      localStorage.setItem('rowdistracPage', 'sounuclidestatistics')
      localStorage.setItem('rowROAclassTypel', classType)
      // if (row.nuclideCode !== 'undefined') {
      localStorage.setItem('rowROALnuclideCode', row.nuclideCode)
      localStorage.setItem('rowROALnuclideName', row.nuclideName)

      localStorage.setItem('rowROALAreaCodeUCL', this.belongArea)
      this.$router.push({
        path: '/homeHtml/AnalysisHtml/souRadiationQuery',
        query: {
          page: 'sounuclidestatistics',
          row: row,
          classType: classType,
          distractCode: this.belongArea,
          radiuStatus: this.radiusSpotStatus,
          releaseOrg: this.releaseOrganization,
          outFDate: this.outFactionaryDate

        }
      })
    },
    // 导出
    exportExcel () {
      let query = {}
      query.belongArea = this.belongArea
      if (this.outFactionaryDate.length === 0) {
        query.outFactionaryDate = ''
        query.outFactionaryTilDate = ''
      } else {
        query.outFactionaryDate = this.outFactionaryDate[0]
        query.outFactionaryTilDate = this.outFactionaryDate[1]
      }
      query.radiusSpotStatus = this.radiusSpotStatus
      axios.get('/manager/radioactiveSources/nuclideExport', {
        params: {
          'demoType': query
        },
        responseType: 'arraybuffer'
      }).then(result => {
        if (!result.data || result.data === null) {
          this.$message.error('导出失败！')
          return
        }
        let b = new Blob([result.data], { type: 'application/vnd.ms-excel' })
        // 根据传入的参数b创建一个指向该参数对象的URL
        let url = URL.createObjectURL(b)
        let link = document.createElement('a')
        // 导出的文件名
        let fileName = '核素统计.xlsx'
        link.download = fileName
        link.href = url
        link.click()
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
      Api.getTableInfoHS(query).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
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
    },

    closeAddRole () {
      const self = this
      self.dialogadd = false
      self.addOrUp = '1'
      self.form = {
        createDate: '',
        createId: 0,
        deleteFlag: 0,
        // regionLever: '',
        remarks: '',
        roleCode: '',
        roleId: '',
        roleType: 1,
        roleName: '',
        updateDate: ''
      }
    },

    showRoleInfo (row) {
      // 查询
      let self = this
      self.$axios.get('/api/base/sysRole/' + row.roleId, {}).then((res) => {
        if (res.code === 0) {
          self.form = res.data
          self.addOrUp = '2'
          self.dialogadd = true
        } else {
          this.$message.error('查询失败！')
        }
      })
    },

    idInList (id, list) {
      let flag = false
      list.forEach(v => {
        if (v === id) {
          flag = true
        }
      })
      return flag
    }

  },
  created: function () {
    this.searchInfo()
    this.getAreaListData()
    this.getOrgListData()
    // this.total = this.tableData.length
    // this.initPage()
    // this.showDictSelect(24)
  }
}
</script>

<style scoped>
.tableWrap{
  height: calc(100% - 120px);
  overflow-y: auto;
}
.el-table.myTableBox .cell{
  color: #333;
}
.el-table.myTableBox th .cell{
  color: #1A1E28;
}
.el-table.myTableBox thead.is-group th{
  background: #fafafa;
}
.myTableBox.el-table--border td,.myTableBox.el-table--border th,.myTableBox.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
  border-right: none;
}
.myTableBox.el-table--border td .cell{
  color: #1A1E28;
}
  .paginationBox{
    text-align: right;
    margin-top: 20px;
  }
.myTableBox .cell .el-button--text{
  color: rgba(25, 184, 255, 1);
}
.jupm_atag{
  color: blue;
  cursor: pointer;
}
.jupm_atag{
  color: blue;
  cursor: pointer;
}
.jupm_atag{
  color: blue;
  cursor: pointer;
}
</style>
