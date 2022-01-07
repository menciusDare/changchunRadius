<template>
  <div class="pageBox">
    <div class="pageName">区域统计</div>
    <div class="panelMain">
        <el-form :inline="true" class="myForm">
         <el-form-item label="放射源状态" prop="radiusSpotStatus">
                    <el-select v-model="radiusSpotStatus" clearable placeholder="请选择" class="handle-input mr10">
                        <!-- <el-option :key="-1" :label="'请选择'" :value="-1"></el-option> -->
                        <el-option
                            v-for="item in radiusSpotList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发证机关" prop="releaseOrganization">
                    <el-select v-model="releaseOrganization" clearable placeholder="请选择" class="handle-input mr10">
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
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>

                        </el-form-item>
    <el-form-item>
 <el-button type="primary" @click="searchInfo()" >查询</el-button>
                        <el-button type="primary" @click="exportExcel()" >导出</el-button>
               </el-form-item>
      </el-form>
      <div class="tableWrap">
        <el-table :data="tableData" border style="width: 100%" height="100%" class="myTableBox">
            <el-table-column type="index" label="序号" align="center" width="50px">
                </el-table-column>

                <el-table-column prop="industryName" label="区域"  align="center" :show-overflow-tooltip="true" >

                </el-table-column>

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
  name: 'souRegionalstatistics',
  data () {
    return {
      tableData: [],
      releaseOrganization: '', // 发证机关
      radiusSpotStatus: '', // 放射源状态
      distract: '', // 区域
      firstTypeSpot: '',
      secondTypeSpot: '',
      thirdTypeSpot: '',
      fourthTypeSpot: '',
      fifthTypeSpot: '',
      ntypeSpot: '',
      total: '',
      outFactionaryDate: '', // 出厂时间
      outFactionaryTilDate: '', // 出厂时间至
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
      roleName: '',
      roleType: -1,
      // roleTypeList: [
      // ],
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
    handleJump (row, classType) {
      localStorage.setItem('rowdistracPage', 'souRegionalstatistics')
      localStorage.setItem('rowdistractCodeRG', row.distractCode)
      localStorage.setItem('rowdistractNameRG', row.distract)
      localStorage.setItem('rowROALTYPERG', classType)
      this.$router.push({
        path: '/homeHtml/AnalysisHtml/souRadiationQuery',
        query: {
          page: 'souRegionalstatistics',
          row: row,
          classType: classType,
          radiuStatus: this.radiusSpotStatus,
          releaseOrg: this.releaseOrganization,
          outFDate: this.outFactionaryDate

        }
      })
    },
    // 导出
    exportExcel () {
      let query = {}
      // query.belongArea=this.belongArea;
      if (this.outFactionaryDate.length === 0) {
        query.outFactionaryDate = ''
        query.outFactionaryTilDate = ''
      } else {
        query.outFactionaryDate = this.outFactionaryDate[0]
        query.outFactionaryTilDate = this.outFactionaryDate[1]
      }
      query.radiusSpotStatus = this.radiusSpotStatus
      // query.responseType = 'arraybuffer'
      axios.get('/manager/radioactiveSources/regionExport', {
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
        let fileName = '区域统计.xlsx'
        link.download = fileName
        link.href = url
        link.click()
      })
    },
    styleBack ({ row, column, rowIndex, columnIndex }) {
      return 'border-right:none;font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;'
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;'
    },
    // 查询
    searchInfo () {
      let query = { }
      // query.belongArea=this.belongArea;
      if (this.outFactionaryDate && this.outFactionaryDate.length === 0) {
        query.outFactionaryDate = ''
        query.outFactionaryTilDate = ''
      } else {
        query.outFactionaryDate = this.outFactionaryDate[0]
        query.outFactionaryTilDate = this.outFactionaryDate[1]
      }
      query.radiusSpotStatus = this.radiusSpotStatus
      query.releaseOrganization = this.releaseOrganization
      Api.getTableInfoFS(query).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
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
      // _this.initPage()
    },
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
    // fomatterRegionLever (row) {
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
    idInList (id, list) {
      let flag = false
      list.forEach(v => {
        if (v === id) {
          flag = true
        }
      })
      return flag
    }
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
</style>
