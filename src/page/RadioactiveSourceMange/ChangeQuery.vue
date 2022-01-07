<template>
  <div class="pageBox">
    <div class="pageName">许可证变更申请查询</div>
    <div class="panelMain">
      <SelfSearch  :searchOpts="colModel"
                   :optionList="optionList"
                   @on-search="onSearch"
                   @on-export = "onExport"
      ></SelfSearch>
      <div class="tableCommonHeight">
        <TableCommon :data="tableData"
                     :dataName="tableDataName"
                     :paginationShow="true"
                     @changeButton="changeTableButton"
                     :pagination="pagination">
        </TableCommon>
      </div>
    </div>
  </div>
</template>

<script>
/*  许可证变更申请查询 */
import SelfSearch from '../../components/SearchCom/SelfSearch.vue'
import TableCommon from '../../components/Table/TableCommon.vue'
import downloadFile from '@/common/downFile'
import {EventBus} from '@/common/eventbus'
import myPageApi from '@/common/api/RadioactiveSourceMange/index'
import commonApi from '@/common/api/commonApi'
import {notice_status} from '@/common/constants'
import listDownLoad from '@/common/listDownLoad'
export default {
  components: {SelfSearch, TableCommon},
  name: 'ChangeQuery',
  data () {
    return {
      /* form表单项 */
      colModel: [
        {
          prop: 'unitName',
          type: 'input',
          label: '单位名称：',
          placeholder: '请输入单位名称'
        },
        {
          prop: 'licenseNum',
          type: 'input',
          label: '许可证号：',
          placeholder: '请输入许可证号'
        },
        {
          prop: 'registPrefecture',
          type: 'select',
          label: '所属区域：',
          optsData: 'regionList',
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
        },
        {
          prop: 'time',
          type: 'daterange',
          label: '提交时间：'
        },
        {
          prop: 'status',
          type: 'select',
          label: '审核状态：',
          optsData: 'examineStatusList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        }
      ],
      /* 下拉框选择项 */
      optionList: {
        regionList: [],
        examineStatusList: [
          { value: '', label: '全部' },
          { value: '1', label: '待受理' },
          { value: '2', label: '已受理' },
          { value: '3', label: '审批通过' },
          { value: '4', label: '审批不通过' },
          { value: '5', label: '退回' }
        ]
      },
      /* 表格数据 */
      tableData: [],
      /* 表格表头配置 */
      tableDataName: [
        {label: '序号', type: 'index', width: '50', isCenter: true},
        {label: '单位名称', type: 'normal', prop: 'unitName', isCenter: true},
        {label: '许可证号', type: 'normal', prop: 'licenseCode', isCenter: true},
        {label: '所属区域', type: 'normal', prop: 'regionName', isCenter: true},
        {label: '提交时间', type: 'normal', prop: 'firstTime', isCenter: true},
        {label: '审核状态', type: 'normal', prop: 'statusName', isCenter: true},
        {label: '批准文号', type: 'normal', prop: 'approvalCode', isCenter: true},
        {
          label: '操作',
          type: 'button',
          width: '150',
          buttonList: [
            {name: '查看', id: 'chakan', status: '0'}
          ]
        }
      ],
      pagination: {
        current: 1,
        total: 10,
        size: 10
      },
      formData: {}
    }
  },
  mounted () {
    this.getRegionList()
    this.loadingChangePage()
  },
  beforeDestroy () {
    EventBus.$off('changePage')
  },
  methods: {
    init () {
      let params = Object.assign({}, this.formData, {'pageSize': this.pagination.size, 'pageNum': this.pagination.current}, {'startTime': this.formData.time[0], endTime: this.formData.time[1], 'applyType': 2})
      myPageApi.getLicenseApplyList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.list.map(
            item => {
              item.statusCode = '0'
              return item
            }
          )
          this.pagination.total = res.data.totalCount
        }
      })
    },
    onSearch (form) {
      this.formData = form
      this.pagination.current = 1
      this.init()
    },
    // 导出
    onExport () {
      let params = Object.assign({}, this.formData, {'pageSize': this.pagination.size, 'pageNum': this.pagination.current}, {'startTime': this.formData.time[0], endTime: this.formData.time[1], 'applyType': 2})
      listDownLoad.downloadFile('/licenseManagement/exportLicenses', params, 'post')
    },
    changeTableButton (itemButton) {
      if (itemButton.itemButton.id === 'chakan') {
        this.$router.push({
          path: '/homeHtml/radioactiveSourceMange/companyIntroduceTab',
          query: {
            id: itemButton.row.unitId,
            page: 'changeQuery'
          }
        })
      }
    },
    /* 获取区域代码 */
    getRegionList () {
      commonApi.getRegions().then((res) => {
        if (res.code === 0) {
          this.optionList.regionList = res.data
        }
      })
    },
    // 点击分页
    loadingChangePage () {
      EventBus.$on('changePage', (pagination) => {
        // console.log(pagination);
        this.pagination.current = pagination.cur_page
        this.pagination.size = pagination.cur_pageSize
        this.init()
      })
    }
  }
}
</script>

<style scoped>
  .tableCommonHeight{
    height: calc(100% - 180px);
  }
</style>
