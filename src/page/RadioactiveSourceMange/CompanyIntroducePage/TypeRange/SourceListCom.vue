<template>
  <div class="tableCommonHeight">
    <SelfSearch :searchOpts="colModel" :optionList="optionList" :isShowDownloadBtn="false" @on-search="onSearch"></SelfSearch>
    <TableCommon paginationShow="false" :data="tableData" :dataName="tableDataName"> </TableCommon>
  </div>
</template>

<script>
/*  非密封放射性物质 */
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
        { label: '工作场所', type: 'normal', prop: 'workplace', isCenter: true, sortable: true },
        { label: '场所等级', type: 'normal', prop: 'level', isCenter: true, sortable: true },
        { label: '核素', type: 'normal', prop: 'chineseName', isCenter: true, sortable: true },
        { label: '日等效最大操作量', type: 'normal', prop: 'maxAmount', isCenter: true, sortable: true },
        { label: '年最大用量', type: 'normal', prop: 'maxTotal', isCenter: true, sortable: true },
        { label: '活动种类', type: 'normal', prop: 'kindName', isCenter: true, sortable: true },
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
      myPageApi.getLedgerDetailsNuclideList({ nuclideTypeCode: 2 }).then(res => {
        this.optionList.nuclideTypeList = res.data
      })
    },
    init () {
      var params = {
        unitId: this.unitId,
        nuclideTypeCode: this.formData.nuclideTypeCode,
        workPlace: this.formData.workPlace,
      }
      Auth.getUnsealedMaterials(params).then((res) => {
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
