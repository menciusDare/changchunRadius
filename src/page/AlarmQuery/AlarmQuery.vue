<template>
  <div class="pageBox">
    <div class="pageName">报警查询</div>
    <div class="panelMain">
      <el-form :inline="true" label-suffix="：" class="myForm">
        <el-form-item label="所属区域">
          <el-select v-model="searchForm.regionCode" clearable placeholder="请选择">
            <el-option v-for="item in licenseAuthorityList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="searchForm.unitName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="报警类型">
          <el-select v-model="searchForm.alarmType" clearable placeholder="请选择">
            <el-option v-for="item in AlarmTypeOptions" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知状态">
          <el-select v-model="searchForm.status" clearable placeholder="请选择">
            <el-option :value="1" label="自动"></el-option>
            <el-option :value="2" label="手动"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker
            v-model="searchForm.times"
            type="daterange"
            range-separator="-"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch()">查询</el-button>
          <el-button @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
      <div class="tableCommonHeight">
        <TableCommon
          :pagination="pagination"
          :dataName="dataName"
          :data="tableData"
          @currentPage="currentPage"
          @sizeChange="sizeChange"
          @changeButton="changeButton"
          paginationShow="true"
        ></TableCommon>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../../common/api/AlarmQuery/AlarmQuery'
import commonApi from '@/common/api/commonApi'
import listDownLoad from '@/common/listDownLoad'

import TableCommon from '@/components/Table/TableCommon'
import { EventBus } from '@/common/eventbus'

export default {
  name: 'AlarmQuery',
  components: { TableCommon },
  created () {
    this.queryRegions()
    this.queryAlarmTypes()
    this.queryPageList()
  },
  mounted () {
    this.loadingChangePage()
  },
  beforeDestroy () {
    EventBus.$off('changePage')
  },
  data () {
    return {
      // 报警类型
      AlarmTypeOptions: [],
      // 所属区域
      licenseAuthorityList: [],
      pagination: {
        total: 0,
        current: 1,
        size: 10,
      },
      tableData: [],
      dataName: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '报警类型',
          type: 'normal',
          prop: 'alarmType'
        },
        {
          label: '报警内容',
          type: 'normal',
          prop: 'device'
        },
        {
          label: '首次报警时间',
          type: 'normal',
          prop: 'firstTime',
          width: '180px'
        },
        {
          label: '末次报警时间',
          type: 'normal',
          prop: 'lastTime',
          width: '180px'
        },
        {
          label: '所属监控位置',
          type: 'normal',
          prop: "location"
        },
        {
          label: '所属辐射装置',
          type: 'normal',
          prop: 'location'
        },
        {
          label: '所属企业',
          type: 'normal',
          prop: 'unitName'
        },
        {
          label: '通知状态',
          type: 'normal',
          prop: 'status'
        },
        {
          label: '操作',
          type: 'button',
          width: '150',
          buttonList: [
            { name: '通知', id: 'notify', status: '1' },
          ]
        }
      ],
      searchForm: {
        times: []
      },
    }
  },
  methods: {
    changeButton ({ itemButton, row }) {
      console.log(itemButton, row);
      if (itemButton.name == "通知") {
        this.$message.info('系统正在连调中...')
      }
    },
    loadingChangePage () {
      EventBus.$on('changePage', (params) => {
        console.log('params', params);
        this.pagination.current = params.cur_page
        this.pagination.size = params.cur_pageSize
        this.queryPageList()
      })
    },
    // 报警类型
    queryAlarmTypes () {
      commonApi.getAlarmTypes().then(res => {
        if (res.code === 0) {
          this.AlarmTypeOptions = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 查询所属区域
    queryRegions () {
      commonApi.getRegions().then(res => {
        if (res.code === 0) {
          this.licenseAuthorityList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    queryPageList () {
      var params = {
        unitName: this.searchForm.unitName,
        alarmType: this.searchForm.alarmType,
        status: this.searchForm.status,
        startTime: Array.isArray(this.searchForm.times) ? this.searchForm.times[0] : '',
        endTime: Array.isArray(this.searchForm.times) ? this.searchForm.times[1] : '',
        regionCode: this.searchForm.regionCode,
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
      }
      Auth.getCycleTaskList(params).then(res => {
        if (res.code === 0) {
          this.pagination.total = res.data.totalCount
          this.tableData = res.data.list.map(item => {
            item.statusCode = '1'
            return item
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleExport () {
      var params = {
        unitName: this.searchForm.unitName,
        status: this.searchForm.status,
        startTime: Array.isArray(this.searchForm.times) ? this.searchForm.times[0] : '',
        endTime: Array.isArray(this.searchForm.times) ? this.searchForm.times[1] : '',
        regionCode: this.searchForm.regionCode,
        "pageNum": this.pagination.curPage,
        "pageSize": this.pagination.curPageSize,
      }
      listDownLoad.downloadFile(Auth.exporAlarmQuery, params, 'post', 'xls')
    },
    handleSearch () {
      this.pagination.curPage = 1
      this.queryPageList()
    },
    currentPage (val) {
      this.pagination.curPage = val
      this.queryPageList()
    },
    sizeChange (val) {
      this.pagination.curPageSize = val
      this.queryPageList()
    },
  }
}
</script>

<style lang="less" scoped>
.tableCommonHeight {
  height: calc(100% - 120px);
}
@media (max-width: 1600px) {
  .tableCommonHeight {
    height: calc(100% - 230px);
  }
}
// /deep/ .el-range-separator {
//   // color: red;
// }
// // 日期图标
// /deep/ .el-date-editor .el-input__prefix {
//   font-size: 16px;
//   right: -75px;
//   left: auto;
//   color: #8a8a8a;
// }
</style>
