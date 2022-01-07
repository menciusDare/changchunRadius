<template>
  <div class="tableCommonHeight">
    <SelfSearch :searchOpts="colModel" :optionList="optionList" :isShowDownloadBtn="false" @on-search="onSearch"></SelfSearch>
    <TableCommon paginationShow="false" :data="tableData" :dataName="tableDataName"> </TableCommon>
  </div>
</template>

<script>
/*  放射源 */
import SelfSearch from '../../../../components/SearchCom/SelfSearch.vue'
import TableCommon from '../../../../components/Table/TableCommon.vue'
import myPageApi from '../../../../common/api/RadioactiveSourceMange/index'
import Auth from '../../../../common/api/RadioactiveSourceMange/companyIntroduce/TypeRange'
export default {
  components: { SelfSearch, TableCommon },
  name: 'UnsealedMaterialsCom',
  props: {
    unitId: [String, Number],
  },
  data () {
    return {
      /* form表单项 */
      colModel: [
        {
          prop: 'nuclideTypeCode',
          type: 'select',
          label: '核素：',
          optsData: 'nuclideTypeList',
          aliasValue: 'id',
          aliasLabel: 'chineseName',
          placeholder: '请选择'
        },
        {
          prop: 'workPlace',
          type: 'select',
          optsData: 'placeList',
          aliasValue: 'code',
          aliasLabel: 'name',
          label: '工作场所：',
          placeholder: '请选择'
        },
      ],
      /* 下拉框选择项 */
      optionList: {
        nuclideTypeList: [],
        placeList: []
      },
      /* 表格数据 */
      tableData: [],
      /* 表格表头配置 */
      tableDataName: [
        { label: '序号', type: 'index', width: '80', isCenter: true, sortable: true },
        { label: '工作场所', type: 'normal', prop: 'place', isCenter: true, sortable: true },
        { label: '核素', type: 'normal', prop: 'nuclideName', isCenter: true, sortable: true },
        { label: '类别', type: 'normal', prop: 'category', isCenter: true, sortable: true },
        { label: '总活度（贝可）/活度（贝可）x枚数', type: 'normal', prop: 'totalActivity', isCenter: true, sortable: true },
        { label: '活动种类', type: 'normal', prop: 'activitiesTypeName', isCenter: true, sortable: true },
      ],
      formData: {}
    }
  },
  mounted () {
    this.loadingGetLedgerDetailsNuclideList()
    this.loadingGetLedgerDetailsPlaceList()

  },
  methods: {
    // 获取场所
    loadingGetLedgerDetailsPlaceList () {
      myPageApi.getLedgerDetailsPlaceList().then(res => {
        this.optionList.placeList = res.data
      })
    },
    // 核素
    loadingGetLedgerDetailsNuclideList () {
      myPageApi.getLedgerDetailsNuclideList({ nuclideTypeCode: 1 }).then(res => {
        this.optionList.nuclideTypeList = res.data
      })
    },
    init () {
      var params = {
        unitId: this.unitId,
        nuclideTypeCode: this.formData.nuclideTypeCode,
        workPlace: this.formData.workPlace,
      }
      Auth.getSourceList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    onSearch (form) {
      this.formData = form
      this.init()
    },
  }
}
</script>

<style scoped>
.tableCommonHeight {
  height: calc(100% - 180px);
}
</style>
