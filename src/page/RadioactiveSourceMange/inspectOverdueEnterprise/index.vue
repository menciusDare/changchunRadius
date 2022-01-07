<template>
  <div class="pageBox">
    <div class="pageName">监督检查期限整改逾期企业列表</div>
    <div class="panelMain">
      <SelfSearch
        :searchOpts="colModel"
        :optionList="optionList"
        :isShowDownloadBtn='isShowDownloadBtn'
        @on-search="onSearch"
      ></SelfSearch>
      <div class="tableCommonHeight">
        <SelfTable
        :tableData="tableData"
        :headerData="headerData"
        :isBtn="isBtn"
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

  </div>
</template>

<script>
import SelfSearch from '../../../components/SearchCom/SelfSearch.vue'
import SelfTable from '../../../components/Table/SelfTable.vue'
import Api from '../../../common/api/Information/index'
export default {
  name: 'inspectOverdueEnterprise',
  components:{SelfSearch,SelfTable},
  data(){
    return{
      formData:'',
      isShowDownloadBtn:false,
      isBtn:false,
      isIndex: true,
      isPage: true,
      total: 20,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      colModel: [
        {
          prop: "times",
          type: "daterange",
          label: "整改期限：",
        },
      ],
      optionList:{},
     headerData: [
        { value: "checkCode", title: "检查编号" },
        { value: "unitName", title: "被检单位名称" },
        { value: "licenseNum", title: "许可证号",type:'clickFile' },
        { value: "checkUnitName", title: "检查单位名称" },
        { value: "checkTime", title: "检查时间" },
        { value: "deadline", title: "整改期限" },
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
    }
  },
  methods: {
    fileClick(row){
      this.$router.push({
          path: '/homeHtml/radioactiveSourceMange/companyIntroduceTab',
          query: {
            id: row.unitId,
            // orgId: row.pkId,
            page: 'inspectOverdueEnterprise'
          }
        })
    },
    getIndex(index){
      let _this = this;
      let curPage = _this.currentPage;
      let limitPage = _this.pageSize;
      return (index+1) + (curPage - 1) * limitPage;
    },
    onSearch(form) {
      form.startTime = form.times?form.times[0]:''
      form.endTime = form.times?form.times[1]:''
      this.formData = form
      this.init()
    },
      init(){
        let params = Object.assign({}, this.formData, {'pageSize': this.pageSize, 'pageNum': this.currentPage})
      Api.getOverDueInfoList(params).then(res=>{
         if(res.code==0){
           this.tableData = res.data.list
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
      if (col.property == "region") {
        alert(111);
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
  },
}
</script>

<style scoped>
.tableCommonHeight{
    height: calc(100% - 110px);
  }
</style>
