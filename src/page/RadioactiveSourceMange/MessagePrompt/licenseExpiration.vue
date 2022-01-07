<template>
  <div class="pageBox">
    <div class="pageName">许可证到期提示</div>
    <div class="panelMain">
      <SelfSearch  :searchOpts="colModel"
                   :optionList="optionList"
                   :isShowDownloadBtn="isShowDownloadBtn"
                    @on-search="onSearch"></SelfSearch>
      <div class="tableCommonHeight">
        <SelfTable
          :tableData="tableData"
          :headerData="headerData"
          :btnList="btnList"
          @onBtnClick="onBtnClick"
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
/*  许可证到期提示 */
import SelfSearch from '../../../components/SearchCom/SelfSearch.vue'
import SelfTable from '../../../components/Table/SelfTable.vue'
import myPageApi from '@/common/api/RadioactiveSourceMange/MessagePrompt/index'
import commonApi from '@/common/api/commonApi'
import {notice_status, expiration_Time_Category} from '@/common/constants'
export default {
  components: {SelfSearch, SelfTable},
  name: 'licenseExpiration',
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      isShowDownloadBtn: false,
      /* form表单项 */
      colModel: [
        {
          prop: 'time',
          type: 'daterange',
          label: '到期时间：',
          format: 'yyyy-MM-dd'
        },
        {
          prop: 'issuingAuthority',
          type: 'select',
          label: '发证机关：',
          optsData: 'issuingAuthorityList',
          aliasLabel: 'name', // 设置别名-select使用的label，value字段
          aliasValue: 'code'
        },
        {
          prop: 'noticeStatus',
          type: 'select',
          label: '通知状态：',
          optsData: 'notiStatusList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        },
        {
          prop: 'category',
          type: 'select',
          label: '类型：',
          optsData: 'typeList',
          aliasLabel: 'label', // 设置别名-select使用的label，value字段
          aliasValue: 'value'
        }
      ],
      /* 下拉框选择项 */
      optionList: {
        issuingAuthorityList: [],
        notiStatusList: [
          { value: '', label: '全部' },
          { value: '0', label: '已自动通知' },
          { value: '1', label: '已手动通知' }
        ],
        typeList: [
          {label: '全部', value: ''},
          {label: '已到期', value: '1'},
          {label: '30天内到期', value: '2'},
          {label: '6个月内到期', value: '3'}
        ]
      },
      headerData: [
        { value: 'unitName', title: '单位名称' },
        { value: 'licenseNum', title: '许可证号' },
        { value: 'category', title: '类型' },
        { value: 'expireTime', title: '到期时间'},
        { value: 'issuingAuthority', title: '发证机关' },
        { value: 'noticeTime', title: '通知时间' },
        { value: 'noticeStatus', title: '通知状态' }
      ],
      tableData: [],
      btnList: [{ name: '手动通知' }],
      formData: {}
    }
  },
  mounted () {
    this.issuingAuthorityList()
  },

  methods: {
    onSearch (form) {
      this.formData = form
      this.init()
    },
    init () {
      let params = Object.assign({}, this.formData, {'pageSize': this.pageSize, 'pageNum': this.currentPage}, {'startTime': this.formData.time[0], endTime: this.formData.time[1]})
      myPageApi.getLicenceExpireTipsList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.list
          //   .map(
          //   item => {
          //     item.handleNoticeStatus = notice_status[item.noticeStatus]
          //     // item.handleCategory = expiration_Time_Category[item.category]
          //     return item
          //   }
          // )
          this.total = res.data.totalCount
        }
      })
    },
    issuingAuthorityList () {
      commonApi.getLicenseAuthoritys().then((res) => {
        if (res.code === 0) {
          let dataList = res.data
          dataList.unshift({ code: '', name: '全部' })
          this.optionList.issuingAuthorityList = dataList
        }
      })
    },
    onBtnClick (row, btnNmae) {
      if (btnNmae === '手动通知') {
        this.$message.info('系统正在连调中...')
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.init()
    },
    getIndex (index) {
      let _this = this
      let curPage = _this.currentPage
      let limitPage = _this.pageSize
      return (index + 1) + (curPage - 1) * limitPage
    }
  }
}
</script>

<style scoped>
  .tableCommonHeight{
    height: calc(100% - 180px);
  }
</style>
