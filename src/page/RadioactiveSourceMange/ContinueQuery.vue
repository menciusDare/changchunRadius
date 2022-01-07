<template>
  <div class="pageBox">
    <div class="pageName">许可证延续申请查询</div>
    <div class="panelMain">
      <SelfSearch
          :searchOpts="colModel"
          :optionList="optionList"
          @on-search="onSearch"
          @on-export="onExport"
      ></SelfSearch>
      <div class="tableCommonHeight">
        <SelfTable
            :tableData="tableData"
            :headerData="headerData"
            @onBtnClick="onBtnClick"
            @cellClick="cellClick"
            :isBtn="isBtn"
            :btnList="btnList"
            :total.sync="total"
            :pageSize.sync="pageSize"
            :pageSizes="pageSizes"
            :currentPage.sync="currentPage"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        ></SelfTable>
      </div>
    </div>
  </div>
</template>

<script>
import SelfSearch from '../../components/SearchCom/SelfSearch.vue'
import SelfTable from '../../components/Table/SelfTable.vue'
import API from '../../common/api/RadioactiveSourceMange/ContinueLicenseApply'
import ComApi from '../../common/api/commonApi'
import listDownLoad from '../../common/listDownLoad'
export default {
  components: {SelfSearch, SelfTable},
  name: 'ContinueQuery',
  data () {
    return {
      isBtn: true,
      isIndex: true,
      isPage: true,
      total: 0,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      colModel: [
        {
          prop: 'unitName',
          type: 'input',
          label: '单位名称：'
        },
        {
          prop: 'licenseNum',
          type: 'input',
          label: '许可证号：'
        },
        {
          prop: 'regionCode',
          type: 'select',
          label: '所属区域：',
          optsData: 'regionList',
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
        },
        {
          prop: 'times',
          type: 'daterange',
          label: '提交时间：'
        },
        {
          prop: 'status',
          type: 'select',
          label: '审核状态：',
          optsData: 'auditStatusList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        }
      ],
      optionList: {
        auditStatusList: [
          // {value: '', label: '全部'},
          { value: '1', label: '待受理' },
          { value: '2', label: '已受理' },
          { value: '3', label: '审批通过' },
          { value: '4', label: '审批不通过' },
          { value: '5', label: '退回' }
        ],
        // regionList: [
        //   //  {code:'',name:"全部"},
        // ],
        regionList: [
          // {code: '', name: '全部'}
        ]
      },
      headerData: [
        { value: 'unitName', title: '单位名称' },
        { value: 'licenseCode', title: '许可证号' },
        { value: 'regionName', title: '所属区域' },
        { value: 'firstTime', title: '提交时间' },
        { value: 'statusName', title: '审核状态' },
        { value: 'approvalCode', title: '批准文号' }
      ],
      tableData: [
        {
          name: '1',
          num: '1',
          region: 'beijing',
          IndustryType: '1',
          unitStatus: '1',
          issuingAuthority: '1',
          issuingTime: '2',
          validUntil: '3',
          unitType: '2'
        }
      ],
      btnList: [{name: '查看'}]
    }
  },
  mounted () {
    this.getRegions()
  },
  methods: {
    // 获取区域列表
    getRegions () {
      ComApi.getRegions().then(res => {
        if (res.code === 0) {
          this.optionList.regionList = res.data
        }
      })
    },
    onExport (form) {
      let dto = {
        applyType: 4,
        unitName: form.unitName,
        licenseNum: form.licenseNum,
        registPrefecture: form.regionCode,
        status: form.status,
        startTime: form.times ? form.times[0] : '',
        endTime: form.times ? form.times[1] : '',
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      // listDownLoad.downloadFile('usingUnit/industryExport', statisticsParam, 'post')
      listDownLoad.downloadFile('/licenseManagement/exportLicenses', dto, 'post','xls')
      // listDownLoad.downloadFile('alarmQuery/exporAlarmQuery', statisticsParam, 'formData')
    },
    onSearch (form) {
      this.formData = form
      this.init()
    },
    init(){
      let params = Object.assign({}, this.formData, {'pageSize': this.pageSize, 'pageNum': this.currentPage}, {'startTime': this.formData.times[0], endTime: this.formData.times[1], 'applyType': 4})
      API.getContinueLicenseApplyList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.totalCount
        }
      })
      // Api.getRayDeviceList(form).then(res=>{
      //   console.log(res)
      // })
    },
    onBtnClick (scope, name) {
      console.log(scope, name)
      console.log(1111)
      if (name === '查看') {
        this.$router.push({
          path: '/homeHtml/radioactiveSourceMange/companyIntroduceTab',
          query: {
            id: scope.row.unitId,
            // orgId: scope.row.pkId,
            page: 'ContinueQuery'
          }
        })
      }
    },
    cellClick (row, col, cell, event) {
      if (col.property === 'region') {
        alert(111)
      }
    },
     handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.init()
    },
  }
}
</script>

<style scoped>
.tableCommonHeight{
    height: calc(100% - 180px);
  }
</style>
