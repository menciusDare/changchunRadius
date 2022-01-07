<template>
  <div class="pageBox">
    <div class="pageName">填报信息缺失提示</div>
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
/*  填报信息缺失提示 */
import SelfSearch from '../../../components/SearchCom/SelfSearch.vue'
import TableCommon from '../../../components/Table/TableCommon.vue'
import {EventBus} from '@/common/eventbus'
import myPageApi from '@/common/api/RadioactiveSourceMange/MessagePrompt/index'
import commonApi from '@/common/api/commonApi'
import {notice_status} from '@/common/constants'
export default {
  components: {SelfSearch, TableCommon},
  name: 'missingInformation',
  data () {
    return {
      isShowDownloadBtn: false,
      /* form表单项 */
      colModel: [
        {
          prop: 'category',
          type: 'selectmultiple',
          label: '缺失类型：',
          optsData: 'lackTypeList',
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
        },
        {
          prop: 'time',
          type: 'daterange',
          label: '时间：'
        },
        {
          prop: 'noticeStatus',
          type: 'select',
          label: '通知状态：',
          optsData: 'notiStatusList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        }
      ],
      /* 下拉框选择项 */
      optionList: {
        lackTypeList: [
          // { value: '1', label: '放射源台账缺失' },
          // { value: '2', label: '非密封放射性物质台账缺失' },
          // { value: '3', label: '射线装置台账缺失' },
          // { value: '4', label: '防护用品-个人剂量计缺失' },
          // { value: '5', label: '监测仪器缺失' },
          // { value: '6', label: '辐射安全管理机构缺失' },
          // { value: '7', label: '辐射安全与防护培训记录缺失' },
          // { value: '8', label: '职业照射个人剂量检测档案缺失' }
        ],
        notiStatusList: [
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
        {label: '缺失类型', type: 'normal', prop: 'category', isCenter: true},
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
        size: 10
      },
      formData: {}
    }
  },
  mounted () {
    this.getLackTypeList()
    this.loadingChangePage()
  },
  beforeDestroy () {
    EventBus.$off('changePage')
  },
  methods: {
    init () {
      let params = Object.assign({}, this.formData, {'pageSize': this.pagination.size, 'pageNum': this.pagination.current}, {'startTime': this.formData.time[0], endTime: this.formData.time[1]})
      myPageApi.getFillMissingTipsList(params).then((res) => {
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
    onSearch (form) {
      this.formData = form
      this.pagination.current = 1
      this.init()
    },
    changeTableButton (item, data) {
      if (item.itemButton.id === 'notice') {
        this.$message.info('系统正在连调中...')
      }
    },
    getLackTypeList () {
      commonApi.getMissingTypes().then((res) => {
        if (res.code === 0) {
          this.optionList.lackTypeList = res.data
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
    height: calc(100% - 120px);
  }
</style>
