<template>
  <div class="pageBox">
    <div class="pageName pageNameBox"><Breadcrumb :breadcrumb="breadcrumb"></Breadcrumb><span class="text"> / 射线装置查询</span></div>
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
          @fileClick="fileClick"
          :isBtn="isBtn"
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
import Api from '../../common/api/Information/index'
import { device_category, status_list } from '../../common/constants'
import ComApi from '../../common/api/commonApi'
import listDownLoad from '../../common/listDownLoad'
import Breadcrumb from '@/components/CommonComponrnts/BreadcrumbCom'
import Storage from '@/common/storage'
export default {
  name: 'RayDeviceQueryTransfer',
  components: { SelfSearch, SelfTable, Breadcrumb},
  data () {
    return {
      isBtn: false,
      isIndex: true,
      isPage: true,
      total: 20,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      colModel: [
        {
          prop: 'regionCode',
          type: 'select',
          label: '所属区域：',
          optsData: 'regionList',
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
        },
        {
          prop: 'deviceCategory',
          type: 'selectmultiple',
          label: '装置类别：',
          optsData: 'deviceList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        },
        {
          prop: 'deviceName',
          type: 'input',
          label: '装置名称：'
        },
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
          prop: 'status',
          type: 'select',
          label: '状态：',
          optsData: 'statusList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        },
        {
          prop: 'purposeId',
          type: 'select',
          label: '用途：',
          optsData: 'purposeList',
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
        },
        {
          prop: 'workplace',
          type: 'input',
          label: '工作场所名称：'
        }
      ],
      optionList: {
        regionList: [
          // { code: '', name: "全部" },
        ],
        deviceList: [
          { value: '1', label: 'Ⅰ类' },
          { value: '2', label: 'Ⅱ类' },
          { value: '3', label: 'Ⅲ类' },
          { value: '4', label: 'Ⅳ类' },
          { value: '5', label: 'Ⅴ类' },
          { value: '6', label: 'N类' }
        ],
        statusList: [
          { value: '', label: '全部' },
          { value: '1', label: '在用' },
          { value: '2', label: '非在用' }
        ],
        purposeList: [
          //  { code: '', name: "全部" },
        ]
      },
      headerData: [
        { value: 'unitName', title: '单位名称' },
        { value: 'licenseNum', title: '许可证号', type: 'clickFile' },
        { value: 'regionName', title: '所属区域' },
        { value: 'deviceName', title: '装置名称' },
        { value: 'category', title: '装置类别' },
        { value: 'purposeName', title: '用途' },
        { value: 'source', title: '来源' },
        { value: 'dispositon', title: '去向' },
        { value: 'workplace', title: '工作场所' },
        { value: 'status', title: '状态' }
      ],
      tableData: [],
      formPageData: this.$route.query.data,
      industryCode: this.$route.query.industryCode,
      formPageName: this.$route.query.formPage,
      toPageFirst: this.$route.query.toPageFirst,
      chengeFormPageData: {},
      breadcrumb: [
        {
          name: '返回',
          path: '/homeHtml/AnalysisHtml/Xraydevice'
        }
      ]
    }
  },
  created () {
    if (this.toPageFirst == true || this.toPageFirst == 'true') {
      Storage.remove('formPageName')
      Storage.remove('chengeFormPageData')
      if (this.formPageName === 'yongtu') {
        this.chengeFormPageData = {
          regionCode: this.formPageData.regionCode,
          licenseAuthority: this.formPageData.licenseAuthority,
          startDate: this.formPageData.licenseIssuingTime ? this.formPageData.licenseIssuingTime[0] : '',
          endDate: this.formPageData.licenseIssuingTime ? this.formPageData.licenseIssuingTime[1] : '',
          deviceCategory: this.formPageData.category ? [this.formPageData.category] : [],
          purposeId: this.industryCode
        }
        this.colModel.splice(0, 2)
      } else {
        this.chengeFormPageData = {
          regionCode: this.formPageData.regionCode,
          licenseAuthority: this.formPageData.licenseAuthority,
          startDate: this.formPageData.licenseIssuingTime ? this.formPageData.licenseIssuingTime[0] : '',
          endDate: this.formPageData.licenseIssuingTime ? this.formPageData.licenseIssuingTime[1] : '',
          industryCode: this.industryCode,
          deviceCategory: this.formPageData.deviceCategory
        }
        this.colModel.splice(0, 1)
      }
    } else {
      this.formPageName = Storage.get('formPageName')
      this.chengeFormPageData = JSON.parse(Storage.get('chengeFormPageData'))
      if (this.formPageName === 'yongtu') {
        this.colModel.splice(0, 2)
      } else {
        this.colModel.splice(0, 1)
      }
    }
  },
  mounted () {
    this.getRegions()
    this.getDevicePurposeList()
  },
  methods: {
    // 获取用途列表
    getDevicePurposeList () {
      ComApi.getDevicePurposeList().then((res) => {
        if (res.code === 0) {
          this.optionList.purposeList = res.data
        }
      })
    },
    fileClick (row) {
      Storage.set('formPageName', this.formPageName)
      Storage.set('chengeFormPageData', this.chengeFormPageData)
      this.$router.push({
        path: '/homeHtml/AnalysisHtml/companyIntroduceTab',
        query: {
          id: row.unitId,
          page: 'RayDevice',
          BackPath: '/homeHtml/AnalysisHtml/Raydevice'
        }
      })
    },
    // 获取区域列表
    getRegions () {
      ComApi.getRegions().then((res) => {
        if (res.code === 0) {
          this.optionList.regionList = res.data
        }
      })
    },
    // 导出
    onExport (form) {
      let derivationData = {
        regionCode: form.regionCode,
        unitName: form.unitName,
        licenseNum: form.licenseNum,
        deviceName: form.deviceName,
        deviceCategory: form.deviceCategory ? form.deviceCategory : [],
        status: form.status,
        purposeId: form.purposeId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      let paramsData = Object.assign({}, derivationData, this.chengeFormPageData)
      listDownLoad.downloadFile(
        '/informationQuery/rayDeviceExport',
        paramsData,
        'get'
      )
    },
    // 查询事件
    onSearch (form) {
      let params = {
        regionCode: form.regionCode,
        unitName: form.unitName,
        licenseNum: form.licenseNum,
        deviceName: form.deviceName,
        deviceCategory: form.deviceCategory ? form.deviceCategory : [],
        status: form.status,
        purposeId: form.purposeId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      // console.log('333', this.chengeFormPageData)
      let paramsData = Object.assign({}, params, this.chengeFormPageData)
      Api.getRayDeviceList(paramsData).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.list.map((item) => {
            item.status = status_list[item.status]
            return item
          })
          this.total = res.data.totalCount
        }
      })
    },
    onBtnClick (scope, name) {
      // console.log(scope, name)
      // console.log(1111)
      if (name == '编辑') {
        // alert('编辑')
      } else {
        // alert('查看')
      }
    },
    cellClick (row, col, cell, event) {
      if (col.property == 'licenseNum') {
        // alert(111)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.onSearch()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSearch()
    }
  }
}
</script>

<style scoped>
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
