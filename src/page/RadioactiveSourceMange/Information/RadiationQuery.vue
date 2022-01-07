<template>
  <div class="pageBox">
    <div class="pageName">放射源查询</div>
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
            :btnList="btnList"
            @onBtnClick="onBtnClick"
            @cellClick="cellClick"
            @fileClick="fileClick"
            :getIndex="getIndex"
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
import SelfSearch from '../../../components/SearchCom/SelfSearch.vue'
import SelfTable from '../../../components/Table/SelfTable.vue'
import {device_category, status_list} from '../../../common/constants'
import Api from '../../../common/api/Information/index'
import ComApi from '../../../common/api/commonApi'
import listDownLoad from '../../../common/listDownLoad'
import {EventBus} from '@/common/eventbus'
export default {
  name: 'RadiationQuery',
  components: {SelfSearch, SelfTable},
  data () {
    return {
      formData: {},
      isBtn: true,
      isIndex: true,
      isPage: true,
      total: 20,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      colModel: [
        {
          prop: 'nuclide',
          type: 'select',
          label: '核素名称：',
          optsData: 'nuclideList',
          aliasLabel: 'nuclideName', // 设置别名-select使用的label，value字段
          aliasValue: 'id'
        },
        {
          prop: 'category',
          type: 'selectmultiple',
          label: '放射源类别：',
          optsData: 'categoryList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        },
        {
          prop: 'code',
          type: 'input',
          label: '放射源编码：'
        },
        {
          prop: 'licenseNum',
          type: 'input',
          label: '许可证号：'
        },
        {
          prop: 'unitName',
          type: 'input',
          label: '所属单位：'
        },
        {
          prop: 'industryCategory',
          type: 'select',
          label: '行业分类：',
          optsData: 'industryCategoryList',
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
        },
        {
          prop: 'purpose',
          type: 'select',
          label: '放射源用途：',
          optsData: 'purposeList',
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
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
          label: '出厂时间：'
        }
      ],
      optionList: {
        nuclideList: [
        ],
        categoryList: [
          { value: 1, label: 'Ⅰ类' },
          { value: 2, label: 'Ⅱ类' },
          { value: 3, label: 'Ⅲ类' },
          { value: 4, label: 'Ⅳ类' },
          { value: 5, label: 'Ⅴ类' },
          { value: 6, label: 'N类' }
        ],
        industryCategoryList: [
        ],
        purposeList: [
        ],
        regionList: [
        ]
      },
      headerData: [
        { value: 'code', title: '放射源编码' },
        { value: 'nuclide', title: '核素名称' },
        { value: 'sourceCountry', title: '国家' },
        { value: 'manufacturerUnit', title: '生产厂家'},
        { value: 'category', title: '放射源类别' },
        { value: 'purpose', title: '放射源用途' },
        { value: 'exitActivity', title: '出厂活度（Bq）' },
        { value: 'realTimeActivity', title: '实时活度（Bq）' },
        { value: 'unitName', title: '所属单位' },
        { value: 'licenseNum', title: '许可证号', type: 'clickFile' },
        { value: 'state', title: '放射源使用状态' }
      ],
      tableData: [
        // {
        //   name: "1",
        //   num: "1",
        //   region: "beijing",
        //   IndustryType: "1",
        //   unitStatus: "1",
        //   issuingAuthority: "1",
        //   issuingTime: "2",
        //   validUntil: "3",
        //   unitType: "2",
        // },
      ],
      btnList: [{ name: '查看' }]
    }
  },
  created () {
    EventBus.$on('RadiationQueryCheck', (params) => {
      let form = {}
      form.times = params.outFDate
      // form.industryCategory=params.outFDate
      form.category = params.classType
      // form.times=params.outFDate
      this.onSearch(form)
      let param = [
        'category',
        'times'
      ]
      setInterval(() => {
        console.log('00000000000000000')
      }, 1000)
      this.initcolModel(param)
    })
  },
  mounted () {
    this.getNuclideInfos() // 核素名称
    this.getIndustryCategories() // 行业分类
    this.getRadiativeResourcePurposes() // 用途
    this.getRegions() // 区域
    // this.$nextTick(() => {

    // })
  },
  beforeDestroy () {
    EventBus.$off('RadiationQueryCheck')
  },
  methods: {
    initcolModel (param) {
      this.colModel.forEach(item => {
        if (param.indexOf(item.prop) > -1) {
          item.isDisabled = true
        }
      })
      console.log('lllllllll', this.colModel)
    },
    getIndex (index) {
      let _this = this
      let curPage = _this.currentPage
      let limitPage = _this.pageSize
      return (index + 1) + (curPage - 1) * limitPage
    },
    fileClick (row) {
      this.$router.push({
        path: '/homeHtml/radioactiveSourceMange/companyIntroduceTab',
        query: {
          id: row.unitId,
          // orgId: row.pkId,
          page: 'RadiationQuery'
        }
      })
    },
    // 获取核素名称列表
    getNuclideInfos () {
      let params = {
        nuclideTypeCode: 0
      }
      ComApi.getNuclideInfos(params).then(res => {
        if (res.code === 0) {
          this.optionList.nuclideList = res.data
        }
      })
    },
    // 获取行业分类列表
    getIndustryCategories () {
      ComApi.getIndustryCategories().then(res => {
        if (res.code === 0) {
          this.optionList.industryCategoryList = res.data
        }
      })
    },
    // 获取用途列表
    getRadiativeResourcePurposes () {
      let params = {
        current: '1',
        size: '10000'
      }
      ComApi.getRadiativeResourcePurposes(params).then(res => {
        if (res.code === 0) {
          this.optionList.purposeList = res.data.records
        }
      })
    },
    // 获取区域列表
    getRegions () {
      ComApi.getRegions().then(res => {
        if (res.code === 0) {
          this.optionList.regionList = res.data
        }
      })
    },
    onExport (form) {
      let derivationData = {
        category: form.category,
        code: form.code,
        endTime: form.time ? form.times[1] : '',
        industryCategory: form.industryCategory,
        licenseNum: form.licenseNum,
        nuclide: form.nuclide,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        purpose: form.purpose,
        regionCode: form.regionCode,
        startTime: form.time ? form.times[0] : '',
        unitName: form.unitName
      }
      // listDownLoad.downloadFile('usingUnit/industryExport', statisticsParam, 'post')
      listDownLoad.downloadFile('/informationQuery/sourceInfoExport', derivationData, 'post', 'xls')
      // listDownLoad.downloadFile('alarmQuery/exporAlarmQuery', statisticsParam, 'formData')
    },
    onSearch (form) {
      this.optionList.nuclideList.map(item => {
        if (form.nuclide && item.id === form.nuclide) {
          form.nuclide = item.nuclideName
        }
      })
      form.startTime = form.time ? form.times[0] : ''
      form.endTime = form.time ? form.times[1] : ''
      form.category = form.category ? form.category : []
      this.formData = form
      this.init()
    },
    // let params = {
    //   category: form.category,
    //   code: form.code,
    //   endTime: form.time ? form.times[1] : '',
    //   industryCategory: form.industryCategory,
    //   licenseNum: form.licenseNum,
    //   nuclide: temporary,
    //   pageNum: this.currentPage,
    //   pageSize: this.pageSize,
    //   purpose: form.purpose,
    //   regionCode: form.regionCode,
    //   startTime: form.time ? form.times[0] : '',
    //   unitName: form.unitName
    // }
    init () {
      let params = Object.assign({}, this.formData, {'pageSize': this.pageSize, 'pageNum': this.currentPage})
      Api.getSourceInfoList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.totalCount
          // .map(
          //   item => {
          //     item.category = device_category[item.category]
          //     return item
          //   }
          // )
        // if (res.code == 0) {
        //   this.tableData = res.data.list
        //   this.total = res.data.totalCount
        // }
          // })
        }
      })
    },
    onBtnClick (scope, name) {
      if (name === '查看') {
        this.$router.push({
          path: '/homeHtml/radioactiveSourceMange/RadioactiveInformation',
          query: {
            id: '1'
          }
        })
      }
    },
    cellClick (row, col, cell, event) {
      if (col.property === 'region') {
        // alert(111)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.init()
    }
  }
}
</script>

<style scoped>
.tableCommonHeight{
    height: calc(100% - 240px);
  }
</style>
