<template>
  <div class="pageBox">
    <div class="pageName">年度评估报告缺失提示</div>
    <div class="panelMain">
      <SelfSearch  :searchOpts="colModel"
                   :optionList="optionList"
                   :isShowDownloadBtn="isShowDownloadBtn"
                   @on-search="onSearch"></SelfSearch>
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
/*  年度评估报告缺失提示 */
import SelfSearch from '../../../components/SearchCom/SelfSearch.vue'
import TableCommon from '../../../components/Table/TableCommon.vue'
import myPageApi from '@/common/api/RadioactiveSourceMange/MessagePrompt/index'
import {notice_status} from '@/common/constants'
import {EventBus} from '@/common/eventbus'
export default {
  components: {SelfSearch, TableCommon},
  name: 'annualReportMissing',
  data () {
    return {
      isShowDownloadBtn: false,
      /* form表单项 */
      colModel: [
        {
          prop: 'isMissing',
          type: 'select',
          label: '历史年报是否缺失：',
          optsData: 'yearReportList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        },
        {
          prop: 'yearTime',
          type: 'dateYear',
          label: '缺失年份：',
          format: 'yyyy'
        },
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
          prop: 'noticeStatus',
          type: 'select',
          label: '通知状态：',
          optsData: 'noticeStatusList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        }
      ],
      /* 下拉框选择项 */
      optionList: {
        yearReportList: [
          { value: '', label: '全部' },
          { value: '1', label: '是' },
          { value: '0', label: '否' }
        ],
        noticeStatusList: [
          { value: '', label: '全部' },
          { value: '0', label: '已自动通知' },
          { value: '1', label: '已手动通知' }
        ]
      },
      /* 表格数据 */
      tableData: [],
      /* 表格表头配置 */
      tableDataName: [
        {label: '序号', type: 'index', width: '50', isCenter: true},
        {label: '单位名称', type: 'normal', prop: 'unitName', isCenter: true},
        {label: '许可证号', type: 'normal', prop: 'licenseNum', isCenter: true},
        {label: '历史年报是否缺失', type: 'normal', prop: 'isMissing', isCenter: true},
        {label: '缺失年份', type: 'normal', prop: 'yearTime', isCenter: true},
        {label: '通知时间', type: 'normal', prop: 'noticeTime', isCenter: true},
        {label: '通知状态', type: 'normal', prop: 'noticeStatus', isCenter: true},
        {
          label: '操作',
          type: 'button',
          width: '150',
          buttonList: [
            {name: '手动通知', id: 'notice', status: '2'}
          ]
        }
      ],
      pagination: {
        current: 1,
        total: 10,
        size: 1
      },
      formData: {},
      isMissing: {
        1: '是',
        0: '否'
      }
    }
  },
  mounted () {
    this.loadingChangePage()
  },
  beforeDestroy () {
    EventBus.$off('changePage')
  },
  methods: {
    onSearch (form) {
      this.formData = form
      this.pagination.current = 1
      this.init()
    },
    init () {
      let params = Object.assign({}, this.formData, {'pageSize': this.pagination.size, 'pageNum': this.pagination.current})
      myPageApi.getReportMissingRecordList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.list.map(
            item => {
              // item.handleNoticeStatus = notice_status[item.noticeStatus]
              item.statusCode = '2'
              return item
            }
          )
          this.pagination.total = res.data.totalCount
        }
      })
    },
    changeTableButton (item, data) {
      if (item.itemButton.id === 'notice') {
        this.$message.info('系统正在连调中...')
      }
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
