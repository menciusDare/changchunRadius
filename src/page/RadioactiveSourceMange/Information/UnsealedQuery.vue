<template>
  <div class="pageBox">
    <div class="pageName">非密封性物质查询</div>
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
        :getIndex="getIndex"
        :pageSize.sync="pageSize"
        :pageSizes="pageSizes"
        :currentPage.sync="currentPage"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></SelfTable>
      </div>
    </div>
  <el-dialog title="详情查看" :visible.sync="dialogTableVisible" :append-to-body="true">
      <!-- <el-descriptions :column="2" border>
        <el-descriptions-item  v-for="(item,index) in infoData" :key="index" :label="item.name" label-class-name="my-label" content-class-name="my-content">{{item.value}}</el-descriptions-item>
      </el-descriptions> -->
      <el-descriptions :column="2" border>
        <el-descriptions-item label="核素" label-class-name="my-label" content-class-name="my-content">{{infoData.nuclide}}</el-descriptions-item>
        <el-descriptions-item label="来源" label-class-name="my-label" content-class-name="my-content">{{infoData.source}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="标号" label-class-name="my-label" content-class-name="my-content">{{infoData.markNumber}}</el-descriptions-item>
        <el-descriptions-item label="工作场所" label-class-name="my-label" content-class-name="my-content">{{infoData.workplace}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="场所等级" label-class-name="my-label" content-class-name="my-content">{{infoData.level}}</el-descriptions-item>
        <el-descriptions-item label="用途" label-class-name="my-label" content-class-name="my-content">{{infoData.purposeName}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="年最大用量" label-class-name="my-label" content-class-name="my-content">{{infoData.maxTotal}}</el-descriptions-item>
        <el-descriptions-item label="日等效最大操作量" label-class-name="my-label" content-class-name="my-content">{{infoData.maxAmount}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="活动种类" label-class-name="my-label" content-class-name="my-content">{{infoData.kind}}</el-descriptions-item>
        <el-descriptions-item label="出厂日期" label-class-name="my-label" content-class-name="my-content">{{infoData.productionDate}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="出场活度" label-class-name="my-label" content-class-name="my-content">{{infoData.factorActive}}</el-descriptions-item>
         <el-descriptions-item label="" label-class-name="my-label" content-class-name="my-content"></el-descriptions-item>
      </el-descriptions>
  </el-dialog>
  </div>
</template>

<script>
import SelfSearch from '../../../components/SearchCom/SelfSearch.vue'
import SelfTable from '../../../components/Table/SelfTable.vue'
import {room_level} from '../../../common/constants'
import Api from '../../../common/api/Information/index'
import ComApi from '../../../common/api/commonApi'
import listDownLoad from '../../../common/listDownLoad'
export default {
  name: 'UnsealedQuery',
  components:{SelfSearch,SelfTable},
  data(){
    return{
      dialogTableVisible:false,
      isBtn:true,
      isIndex: true,
      isPage: true,
      total: 20,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      infoData:{},
      colModel: [
        {
          prop: "nuclide",
          type: "select",
          label: "核素名称：",
          optsData: "nuclideList",
          aliasLabel: 'nuclideName', // 设置别名-select使用的label，value字段
          aliasValue: 'id'
        },
        {
          prop: "level",
          type: "select",
          label: "场所等级：",
          optsData: "levelList",
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        },
        {
          prop: "workplace",
          type: "input",
          label: "工作场所：",
        },
        {
          prop: "licenseNum",
          type: "input",
          label: "许可证号："
        },
        {
          prop: "unitName",
          type: "input",
          label: "所属单位：",
        },
      ],
      optionList: {
        nuclideList: [
        ],
        levelList: [
          // { value: "", label: "全部" },
          { value: '1', label: "甲级" },
          { value: '2', label: "乙级" },
          { value: '3', label: "丙级" },
          { value: '4', label: "无" },
        ],
      },
     headerData: [
        { value: "nuclide", title: "核素" },
        { value: "factorActive", title: "出厂活度（Bq）" },
        { value: "workplace", title: "工作场所" },
        { value: "level", title: "场所等级" },
        { value: "purposeName", title: "用途"},
        { value: "source", title: "来源" },
        { value: "unitName", title: "单位名称" },
        { value: "licenseNum", title: "许可证号",type:'clickFile' },
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
      btnList: [{ name: "查看" }],   
      infoData:[
           {name:'核素：',value:''},
           {name:'来源：',value:''},
           {name:'标号：',value:''},
           {name:'工作场所：',value:''},
           {name:'场所等级：',value:''},
           {name:'用途：',value:''},
           {name:'来源：',value:''},
           {name:'日等效最大操作量：',value:''},
           {name:'年最大用量：',value:''},
           {name:'活动种类：',value:''},
           {name:'出厂日期：',value:''},
           {name:'出场活度：',value:''}
       ],
       formData:{}    
    }
  },
  mounted(){
    this.getNuclideInfos() // 核素名称
  },
  methods:{
    fileClick(row){
      this.$router.push({
          path: '/homeHtml/radioactiveSourceMange/companyIntroduceTab',
          query: {
            id: row.unitId,
            // orgId: row.pkId,
            page: 'UnsealedQuery'
          }
        })
    },
    getIndex(index){
      let _this = this;
      let curPage = _this.currentPage;
      let limitPage = _this.pageSize;
      return (index+1) + (curPage - 1) * limitPage;
    },
      // 获取核素名称列表
    getNuclideInfos(){
      let params = {
        nuclideTypeCode: 1
      }
      ComApi.getNuclideInfos(params).then(res=>{
        if(res.code === 0){
          this.optionList.nuclideList = res.data
        }
      })
    },
    // 导出
    onExport(form){
       let derivationData = Object.assign({}, this.formData, {'pageSize': this.pageSize, 'pageNum': this.currentPage})
      // listDownLoad.downloadFile('usingUnit/industryExport', statisticsParam, 'get')
        listDownLoad.downloadFile('/informationQuery/unsealedRadioactiveMaterialExport', derivationData, 'post','xls')
        // listDownLoad.downloadFile('alarmQuery/exporAlarmQuery', statisticsParam, 'formData')
    },
    onSearch(form) {
      this.optionList.nuclideList.map(item=>{
        if(form.nuclide && item.id == form.nuclide){
          form.nuclide= item.nuclideName
        }
      })
      this.formData = form
      this.init()
    },
    init () {
      let params = Object.assign({}, this.formData, {'pageSize': this.pageSize, 'pageNum': this.currentPage})
      Api.getUnsealedRadioactiveMaterialList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.list
          // .map(
          //   item => {
          //     item.level = room_level[item.level]
          //     return item
          //   }
          // )
          this.total = res.data.totalCount
        }
      })
    },
    onBtnClick(scope, name) {
      console.log(scope, name);
      console.log(1111);
      if (name == "查看") {
        this.dialogTableVisible = true
        Api.getUnsealedRadioactiveMaterialById({unsealedId:scope.row.pkId}).then(res=>{
          this.infoData = res.data
        })
      }
    },
    cellClick(row, col, cell, event) {
      if (col.property == "region") {
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

<style>
.el-descriptions-item__label.is-bordered-label{
    width: 25%;
    text-align: center;
    color: #333333;
}
.el-descriptions-item__content{
  width: 25%;
}
.tableCommonHeight{
    height: calc(100% - 180px);
  }
</style>