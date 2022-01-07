<template>
  <div class="pageBox">
    <div class="pageName">巡查任务查询</div>
    <div class="panelMain">
      <el-form :inline="true" label-suffix="：" class="myForm">
        <el-form-item label="任务地点">
          <el-input v-model="searchForm.region" placeholder="请输入任务地点"></el-input>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="searchForm.status" clearable placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发起时间">
          <el-date-picker
            clearable
            v-model="searchForm.launchTime"
            type="daterange"
            range-separator=""
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch()">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tableCommonHeight">
        <TableCommon :pagination="pagination" :dataName="dataName" :data="tableData" @changeButton="changeButton"></TableCommon>
      </div>
    </div>
    <el-dialog title="巡查任务查询" :visible.sync="dialogTableVisible" :append-to-body="true" class="myDialog" width="900px">
      <el-form label-suffix="：" ref="editForm" :model="editForm">
        <el-form-item label="所属区域">
          <el-input disabled v-model="editForm.region" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="巡查对象">
          <el-input disabled v-model="editForm.unitName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-input disabled v-model="editForm.status" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-input disabled v-model="editForm.taskType" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="发起人">
          <el-input disabled v-model="editForm.createName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="处理人">
          <el-input disabled v-model="editForm.dealName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="发起时间">
          <el-input disabled v-model="editForm.createTime" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-input disabled v-model="editForm.completeTime" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="处理结果">
          <el-input disabled v-model="editForm.dealResult" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Auth from "../../common/api/MobilePatrol/TaskManage"
import TableCommon from '@/components/Table/TableCommon'
import { EventBus } from '@/common/eventbus'

export default {
  name: 'TaskManage',
  components: { TableCommon },
  created () {
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
      pagination: {
        total: 0,
        current: 1,
        size: 10
      },
      tableData: [],
      dataName: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '所属区域',
          type: 'normal',
          prop: 'region'
        },
        {
          label: '巡查对象',
          type: 'normal',
          prop: 'unitName'
        },
        {
          label: '任务状态',
          type: 'normal',
          prop: 'status'
        },
        {
          label: '任务类型',
          type: 'normal',
          prop: 'taskType'
        },
        {
          label: '发起人',
          type: 'normal',
          prop: "createName"
        },
        {
          label: '发起时间',
          type: 'normal',
          prop: 'createTime',
          width: '160'
        },
        {
          label: '处理人',
          type: 'normal',
          prop: 'dealName'
        },
        {
          label: '完成时间',
          type: 'normal',
          prop: 'completeTime'
        },
        {
          label: '处理结果',
          type: 'normal',
          prop: 'dealResult'
        },
        {
          label: '操作',
          type: 'button',
          width: '150',
          buttonList: [
            { name: '查看', id: 'look', status: '1' },
          ]
        }
      ],
      dialogTableVisible: false,
      searchForm: {
        launchTime: []
      },
      statusOptions: [
        {
          value: '1',
          label: '签收'
        },
        {
          value: '2',
          label: '处理中'
        },
        {
          value: '3',
          label: '已完成'
        }
      ],
      dialogTableVisible: false,
      editForm: {},
    }
  },
  methods: {
    loadingChangePage () {
      EventBus.$on('changePage', (params) => {
        console.log('params', params);
        this.pagination.current = params.cur_page
        this.pagination.size = params.cur_pageSize
        this.queryPageList()
      })
    },
    queryTaskInfo (id) {
      Auth.getTaskInfoById({ id }).then(res => {
        if (res.code === 0) {
          this.editForm = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    queryPageList () {
      var params = {
        region: this.searchForm.region,
        status: this.searchForm.status,
        startTime: Array.isArray(this.searchForm.launchTime) ? this.searchForm.launchTime[0] : '',
        endTime: Array.isArray(this.searchForm.launchTime) ? this.searchForm.launchTime[1] : '',
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
        .catch(err => {
          this.$message.error(err.msg)
        })
    },
    changeButton ({ itemButton, row }) {
      console.log(itemButton, row);
      if (itemButton.name == "查看") {
        this.queryTaskInfo(row.pkId)
        this.dialogTableVisible = true
      }
    },
    handleSearch () {
      this.pagination.current = 1
      this.queryPageList()
    },
  }
}
</script>

<style lang="less" scoped>
.QueryMain {
  height: calc(100% - 30px);
}
.tableCommonHeight {
  height: calc(100% - 130px);
}
@media (max-width: 1600px) {
  .tableCommonHeight {
    height: calc(100% - 230px);
  }
}
/deep/ .el-range-separator {
  // color: red;
}
</style>
