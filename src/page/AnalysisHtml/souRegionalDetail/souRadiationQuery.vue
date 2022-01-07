<template>
  <div class="pageBox">
    <div class="pageName"><span class="back_btn" @click="handleBack">{{backbtn}}</span>&nbsp;&nbsp;&nbsp;&nbsp;/放射源查询</div>
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
import SelfSearch from './specialSearch.vue'
import SelfTable from '../../../components/Table/SelfTable.vue'
// import {device_category, status_list} from '../../../common/constants'
import Api from '../../../common/api/Information/index'
import ComApi from '../../../common/api/commonApi'
// import KBApi from '../../../common/api/knowledgeBase/knowledgeBase/index'
import listDownLoad from '../../../common/listDownLoad'
// import {EventBus} from '@/common/eventbus'
export default {
  name: 'souRadiationQuery',
  components: {SelfSearch, SelfTable},
  data () {
    return {
      backbtn: '<返回',
      sourceList: ['', 'Ⅰ类源', 'Ⅱ类源', 'Ⅲ类源', 'Ⅳ类源', 'Ⅴ类源', 'N类源'],
      // temporary: '', // 临时变量
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
    this.getNuclideInfos() // 核素名称
    this.getIndustryCategories() // 行业分类
    this.getRadiativeResourcePurposes() // 用途
    this.getRegions() // 区域
  },
  mounted () {
    this.initialSearch()

    this.initcolModel()
  },
  beforeDestroy () {
    // EventBus.$off('RadiationQueryCheck')
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    initialSearch () {
      let form = {}
      let comePage = localStorage.getItem('rowdistracPage')
      if (comePage === 'souRegionalstatistics') {
        let curArr = []
        if (localStorage.getItem('rowROALTYPERG') !== '-1') {
          curArr.push(localStorage.getItem('rowROALTYPERG'))
        }
        form.category = curArr
        let distractCode = localStorage.getItem('rowdistractCodeRG')
        if (distractCode !== 'undefined') {
          form.regionCode = distractCode
        } else {
          form.regionCode = ''
        }
      } else if (comePage === 'souindustrystatistics') {
        form.times = this.$route.query.outFDate

        let curArr = []
        if (localStorage.getItem('rowROALTYPE') !== '-1') {
          curArr.push(localStorage.getItem('rowROALTYPE'))
        }
        form.category = curArr
        let distractCode = localStorage.getItem('rowdistractCode')
        if (distractCode !== 'undefined') {
          form.regionCode = ' '
        }
        // 行业分类
        form.industryCategory = localStorage.getItem('rowIndustryCode')
      } else if (comePage === 'souusagestatistics') {
        form.times = this.$route.query.outFDate
        // form.industryCategory=params.outFDate
        let curArrA = []
        if (localStorage.getItem('rowROALTYPEUSAG') !== '-1') {
          curArrA.push(localStorage.getItem('rowROALTYPEUSAG'))
        }
        form.category = curArrA
        // form.regionCode = this.$route.query.row.distractCode
        let distractCode = localStorage.getItem('rowROALAreaCodeUSAG')
        if (distractCode !== 'undefined') {
          form.regionCode = distractCode
        }
        // 用途
        let purpose = localStorage.getItem('rowpurposeCodeUSAG')
        if (purpose !== 'undefined') {
          form.purpose = purpose
        }
      } else if (comePage === 'sounuclidestatistics') {
        form.times = this.$route.query.outFDate
        // form.industryCategory=params.outFDate
        let curArrC = []
        let cateTyle = localStorage.getItem('rowROAclassTypel')
        if (cateTyle !== '-1') {
          curArrC.push(cateTyle)
        }
        form.category = curArrC
        let purpose = localStorage.getItem('rowROALnuclideName')
        if (purpose !== 'undefined') {
          form.nuclide = purpose
        }
      }

      this.onSearch(form)
    },
    initcolModel () {
      let comePage = this.$route.query.page
      if (comePage === 'souRegionalstatistics') {
        this.colModel[8].isDisabled = true // 出场时间
        this.colModel[7].isDisabled = true // 所属区域
        this.colModel[7].placeholder = localStorage.getItem('rowdistractNameRG')
        let idx = localStorage.getItem('rowROALTYPERG')
        this.colModel[1].placeholder = this.sourceList[idx]
        this.colModel[1].isDisabled = true // 放射源类别
      } else if (comePage === 'souindustrystatistics') {
        this.colModel[8].isDisabled = true // 出场时间
        this.colModel[7].isDisabled = true // 所属区域
        this.colModel[7].placeholder = localStorage.getItem('rowROALAreaCodeIND')
        let idx = localStorage.getItem('rowROALTYPE')
        this.colModel[1].placeholder = this.sourceList[idx]
        this.colModel[1].isDisabled = true // 放射源类别
        this.colModel[5].placeholder = localStorage.getItem('rowIndustryNameIND')
        this.colModel[5].isDisabled = true // 行业
      } else if (comePage === 'souusagestatistics') {
        this.colModel[8].isDisabled = true // 出场时间
        this.colModel[6].isDisabled = true // 用途
        this.colModel[6].placeholder = localStorage.getItem('rowpurposeNameUSAG')
        this.colModel[7].isDisabled = true // 所属区域
        this.colModel[7].placeholder = localStorage.getItem('rowROALAreaCodeUCL')
        this.colModel[1].isDisabled = true // 放射源类别
        let idx = localStorage.getItem('rowROALTYPEUSAG')
        this.colModel[1].placeholder = this.sourceList[idx]
      } else if (comePage === 'sounuclidestatistics') {
        this.colModel[8].isDisabled = true // 出场时间
        this.colModel[7].isDisabled = true // 所属区域
        this.colModel[0].isDisabled = true // 核素名称
        this.colModel[0].placeholder = localStorage.getItem('rowROALnuclideName')
        this.colModel[1].isDisabled = true // 放射源类别   sounuclidestatistics
        let idx = localStorage.getItem('rowROAclassTypel')
        this.colModel[1].placeholder = this.sourceList[idx]
      }
    },

    fileClick (row) {
      this.$router.push({
        path: '/homeHtml/AnalysisHtml/companyIntroduceTab',
        query: {
          id: row.pkId,
          page: 'souRadiationQuery'
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
      // if (form.nuclide !== 'undefined') {
      //   form.nuclide = form.nuclide
      // }
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
      console.log(params, 'bian')
      Api.getSourceInfoList(params).then(res => {
        if (res.code === 0) {
          this.total = res.data.totalCount
          // this.pageSizes = res.data.totalPage
          this.tableData = res.data.list
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
      console.log(scope, 'kkkk')
      if (name === '查看') {
        this.$router.push({
          path: '/homeHtml/AnalysisHtml/RadioactiveInfoDetail',
          query: {
            id: scope.row.pkId
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
.back_btn{
  cursor: pointer;
  font-size: 14px;
  color: #1A1E28;
}
.tableCommonHeight{
    height: calc(100% - 240px);
  }
</style>
