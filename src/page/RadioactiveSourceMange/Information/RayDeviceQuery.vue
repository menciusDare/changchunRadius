<template>
  <div class="pageBox">
    <div class="pageName">射线装置查询</div>
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
        :getIndex="getIndex"
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
import SelfSearch from '../../../components/SearchCom/SelfSearch.vue'
import SelfTable from '../../../components/Table/SelfTable.vue'
import Api from '../../../common/api/Information/index'
import {device_category,status_list} from '../../../common/constants'
import ComApi from '../../../common/api/commonApi'
import listDownLoad from '../../../common/listDownLoad'
export default {
  name: 'RayDeviceQuery',
  components:{SelfSearch,SelfTable},
  data(){
    return{
      isBtn:false,
      isIndex: true,
      isPage: true,
      total: 20,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      formData:{},
      colModel: [
        {
          prop: "regionCode",
          type: "select",
          label: "所属区域：",
          optsData: "regionList",
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
        },
        {
          prop: "unitName",
          type: "input",
          label: "单位名称：",
        },
        {
          prop: "licenseNum",
          type: "input",
          label: "许可证号：",
        },
        {
          prop: "deviceName",
          type: "input",
          label: "装置名称：",
        },
        {
          prop: "deviceCategory",
          type: "selectmultiple",
          label: "装置类别：",
          optsData: "deviceList",
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        },
        {
          prop: "status",
          type: "select",
          label: "状态：",
          optsData: "statusList",
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        },
        {
          prop: "purposeId",
          type: "select",
          label: "用途：",
          optsData: "purposeList",
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
        },
        {
          prop: "workplace",
          type: "input",
          label: "工作场所名称：",
        },
      ],
      optionList: {
        regionList:[
          // { code: '', name: "全部" },
        ],
        deviceList:[
          { value: '1', label: "Ⅰ类" },
          { value: '2', label: "Ⅱ类" },
          { value: '3', label: "Ⅲ类" },
          { value: '4', label: "Ⅳ类" },
          { value: '5', label: "Ⅴ类" },
          { value: '6', label: "N类" },
        ],
        statusList:[
          { value: '1', label: "在用" },
          { value: '2', label: "非在用" },
        ],
        purposeList:[
          //  { code: '', name: "全部" },
        ],
      },
     headerData: [
        { value: "unitName", title: "单位名称" },
        { value: "licenseNum", title: "许可证号",type:'clickFile' },
        { value: "regionName", title: "所属区域" },
        { value: "deviceName", title: "装置名称" },
        { value: "category", title: "装置类别"},
        { value: "purposeName", title: "用途" },
        { value: "source", title: "来源" },
        { value: "dispositon", title: "去向" },
        { value: "workplace", title: "工作场所" },
        { value: "status", title: "状态" },
      ],  
      tableData: [
        {
          unitName: "1",
          licenseNum: "1111",
          regionCode: "beijing",
          deviceName: "1",
          category: "1",
          purposeName: "1",
          source: "2",
          dispositon: "3",
          workplace: "2",
        },
      ],
    }
  },
mounted(){
  this.getRegions()
  this.getDevicePurposeList()
},
  methods:{
  fileClick(row){
      this.$router.push({
          path: '/homeHtml/radioactiveSourceMange/companyIntroduceTab',
          query: {
            id: row.unitId,
            // orgId: row.pkId,
            page: 'RayDeviceQuery'
          }
        })
    },
    getIndex(index){
      let _this = this;
      let curPage = _this.currentPage;
      let limitPage = _this.pageSize;
      return (index+1) + (curPage - 1) * limitPage;
    },
      // 获取用途列表
    getDevicePurposeList(){
      ComApi.getDevicePurposeList().then(res=>{
         if(res.code === 0){
           this.optionList.purposeList = res.data
         }
      })
    },
    // 获取区域列表
    getRegions(){
      ComApi.getRegions().then(res=>{
        if(res.code === 0){
          this.optionList.regionList = res.data
        }
      })
    },
      // 导出
    onExport(form){
      let derivationData = {
        regionCode:form.regionCode,
        unitName:form.unitName,
        licenseNum:form.licenseNum,
        deviceName:form.deviceName,
        deviceCategory:form.deviceCategory ? form.deviceCategory : [],
        status:form.status,
        purposeId:form.purposeId,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
      }
      // listDownLoad.downloadFile('usingUnit/industryExport', statisticsParam, 'post')
        listDownLoad.downloadFile('/informationQuery/rayDeviceExport', derivationData, 'post','xls')
        // listDownLoad.downloadFile('alarmQuery/exporAlarmQuery', statisticsParam, 'formData')
    },
    // 查询事件
    onSearch(form) {
      form.deviceCategory = form.deviceCategory ? form.deviceCategory : []
      this.formData = form
      this.init()
    },
    init () {
      let params = Object.assign({}, this.formData, {'pageSize': this.pageSize, 'pageNum': this.currentPage})
      Api.getRayDeviceList(params).then(res=>{
        if(res.code == 0){
          this.tableData = res.data.list.map(
            item => {
              item.status = status_list[item.status]
              // item.category = device_category[item.category]
              return item
            }
          )
          this.total = res.data.totalCount
        }
      })
    },
    onBtnClick(scope, name) {
      console.log(scope, name);
      console.log(1111);
      if (name == "编辑") {
        alert("编辑");
      } else {
        alert("查看");
      }
    },
    cellClick(row, col, cell, event) {
      if (col.property == "licenseNum") {
        // alert(111);
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
    height: calc(100% - 220px);
  }
</style>        
