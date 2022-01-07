<template>
  <div class="againQuery">
    <BreadcrumbCom :breadcrumb="breadcrumb"></BreadcrumbCom>
    <div class="panelMain againQueryMain">
      <div class="selectedList rowFlex">
        <div class="rowFlex flexWrap">
          <div class="rowFlex selectedListLi alignCenter" v-for="item in selectedList" :key="item.id">
            <div class="selectedListLiName">
              {{item.name}}
            </div>
            <TypeList :typeList="item" :dataMain="queryList"></TypeList>
          </div>
          <el-button type="primary" class="queryButton query" @click="queryListFun('query')">查询</el-button>
          <el-button type="plain" class="queryButton export" @click="queryListFun('export')">导出</el-button>
        </div>
      </div>
      <div class="tableCommonHeight">
        <TableCommon
            :pagination="pagination"
            :dataName="dataName"
            :data="data"
            @changeButton="changeButton"
            paginationShow='true'></TableCommon>
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumbCom from '@/components/CommonComponrnts/BreadcrumbCom'
import TypeList from './CompanyIntroducePage/AccountDetailsTab/TypeList'
import TableCommon from '@/components/Table/TableCommon'
import listDownLoad from '../../common/listDownLoad'
import againQuery from '../../common/api/RadioactiveSourceMange/index'
import commonApi from '@/common/api/commonApi'
import {EventBus} from '../../common/eventbus'
export default {
  name: 'AgainQuery',
  components: {
    BreadcrumbCom,
    TypeList,
    TableCommon
  },
  data () {
    return {
      breadcrumb: [
        {
          name: '许可证重新申请查询',
          path: ''
        }
      ],
      selectedList: [
        {
          name: '单位名称：',
          isChildren: false,
          id: 'unitName',
          type: 'input'
        },
        {
          name: '许可证号：',
          isChildren: false,
          id: 'licenseNum',
          type: 'input'
        },
        {
          name: '所属区域：',
          isChildren: false,
          id: 'registPrefecture',
          type: 'select',
          options: [],
          optionsId: 'registPostCode',
          typeId: 'code'
        },
        {
          name: '提交时间：',
          isChildren: false,
          id: 'datetimeRange',
          type: 'datetimeRange',
          typeValue: 'daterange',
          valueFormat: 'yyyy-MM-dd',
          format: 'yyyy-MM-dd'
        },
        {
          name: '审核状态：',
          isChildren: false,
          id: 'status',
          type: 'select',
          options: [
            { code: '1', name: '待受理' },
            { code: '2', name: '已受理' },
            { code: '3', name: '审批通过' },
            { code: '4', name: '审批不通过' },
            { code: '5', name: '退回' }
          ],
          optionsId: 'status',
          typeId: 'code'
        }
      ],
      queryList: {
        accountType: '', // 台账类型
        status: '', // 审核状态
        datetimeRange: '', // 提交时间
        registPostCode: '', // 所属区域
        licenseNum: '', // 许可证号
        unitName: ''// 单位名称
      },
      dataName: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '单位名称',
          type: 'normal',
          prop: 'unitName'
        },
        {
          label: '许可证号',
          type: 'normal',
          prop: 'licenseCode'
        },
        {
          label: '所属区域',
          type: 'normal',
          prop: 'regionName'
        },
        {
          label: '提交时间',
          type: 'normal',
          prop: 'firstTime'
        },
        {
          label: '审核状态',
          type: 'normal',
          prop: 'statusName'
        },
        {
          label: '批准文号',
          type: 'normal',
          prop: 'approvalCode'
        },
        {
          label: '操作',
          type: 'button',
          width: '100',
          buttonList: [
            {name: '查看', id: 'xiangqing', status: '1'}
          ]
        }
      ],
      data: [],
      pagination: {
        current: 1,
        total: 20,
        size: 10
      }
    }
  },
  methods: {
    // 查看列表
    queryListFun (id) {
      if (id == 'query') {
        this.pagination.current = 1
        this.loadingAgainQuery()
      } else {
        const {datetimeRange, ...list} = this.queryList
        let params = {
          endTime: datetimeRange ? datetimeRange[1] : '',
          startTime: datetimeRange ? datetimeRange[0] : '',
          ...list,
          pageNum: this.pagination.current,
          pageSize: this.pagination.size,
          applyType: '3'
        }
        // listDownLoad.downloadFile('usingUnit/industryExport', statisticsParam, 'post')
        // listDownLoad.downloadFile('usingUnit/industryExport', statisticsParam, 'get')
        listDownLoad.downloadFile('licenseManagement/exportLicenses', params, 'post')
      }
    },
    // table - 表格查看
    changeButton (item, data) {
      console.log(data, item)
      // this.
      this.$router.push({
        path: '/homeHtml/radioactiveSourceMange/companyIntroduceTab',
        query: {
          id: item.row.unitId,
          page: 'againQuery'
        }
      })
    },
    loadingAgainQuery () {
      const {datetimeRange, ...list} = this.queryList
      console.log(datetimeRange)
      let params = {
        endTime: datetimeRange ? datetimeRange[1] : '',
        startTime: datetimeRange ? datetimeRange[0] : '',
        ...list,
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
        applyType: '3'
      }
      againQuery.getLicenseApplyList(params).then(res => {
        this.data = res.data.list.map(item => {
          item.statusCode = '1'
          return item
        })
        this.pagination.total = res.data.totalCount
      })
    },
    loadingGetRegions () {
      commonApi.getRegions().then(res => {
        this.selectedList[2].options = res.data
      })
    },
    changePageMain () {
      EventBus.$on('changePage', (params) => {
        this.pagination.current = params.cur_page
        this.pagination.size = params.cur_pageSize
        this.loadingAgainQuery()
      })
    }
  },
  mounted () {
    this.loadingGetRegions()
    this.loadingAgainQuery()
    this.changePageMain()
  },
  beforeDestroy () {
    EventBus.$off('changePage')
  }
}
</script>

<style scoped>
.againQuery{
  height: 100%;
}
.againQueryMain{
  height: calc(100% - 30px);
}
.selectedListLi{
  margin-bottom: 20px;
  margin-right: 35px;
}
.selectedListLiName{
  min-width: 72px;
  color: #1A1E28;;
  font-size: 14px;
}
.queryButton{
  line-height: 35px;
  height: 35px;
  box-sizing: border-box;
  padding: 0px 43px;
  background: rgba(66, 139, 202, 1);
}
.queryButton.query{
  background: rgba(66, 139, 202, 1);
}
.queryButton.export{
  background: none;
  border: 1px solid rgba(66, 139, 202, 1);
  color: rgba(66, 139, 202, 1);
}
.tableCommonHeight{
  height: calc(100% - 100px);
}
@media (max-width: 1600px) {
  .tableCommonHeight{
    height: calc(100% - 150px);
  }
}
</style>
