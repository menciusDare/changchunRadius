<template>
  <div class="panelMain panelBox">
    <el-form :inline="true" :model="searchForm" label-suffix="：" class="myForm">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="searchForm.cardType" clearable="" placeholder="请选择">
          <el-option label="身份证" value="0"></el-option>
          <el-option label="其他" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证据号码">
        <el-input v-model="searchForm.cardNum" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tips">
      <div class="tips-txt"></div>
      <p>
        提示：
        <img
          class="icon"
          src="@/assets/images/nav/record.png"
        />表示（辐射安全与防护培训记录）中最新的培训结束时间截至到现在已经超过四年未有培训记录；<img
          class="icon"
          src="@/assets/images/nav/remind.png"
          style="margin: 0 0 0 30px"
        />表示未填写【职业照射个人剂量监测档案】。
      </p>
    </div>
    <div class="tableMange">
      <el-table :data="tableData" style="width: 100%" class="changeTable" height="100%" border>
        <el-table-column type="index" label="序号" width="100"> </el-table-column>
        <el-table-column prop="date" label="提醒">
          <template slot-scope="scope">
            <img v-if="scope.row.radiationSafety" src="@/assets/images/nav/record.png" />
            <img v-if="scope.row.personalTestingFiles" src="@/assets/images/nav/remind.png" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="cardNum" label="证件号" width="180"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="birthday" label="出生年月"> </el-table-column>
        <el-table-column prop="job" label="工作岗位"> </el-table-column>
        <el-table-column prop="school" label="毕业学校"> </el-table-column>
        <el-table-column prop="education" label="学历"> </el-table-column>
        <el-table-column prop="profession" label="专业"> </el-table-column>
        <el-table-column prop="expiryDate" label="有效期"> </el-table-column>
        <el-table-column prop="serialNumber" label="培训/考试编号"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" class="lookBtn" type="text" @click="handleLook(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationCom :pagination="pagination" class="changePagination"> </PaginationCom>
    <el-dialog title="辐射工作人员登记表" :visible.sync="dialogTableVisible" :append-to-body="true" width="80%" class="myDialog">
      <div v-if="dialogTableVisible">
        <WorkersInfoCom :staffId="rowItem.pkId" :WorkersInfo="WorkersInfo" />
        <TrainingRecordListCom :cardNum="rowItem.cardNum" :unitId="unitId"></TrainingRecordListCom>
        <PersonalArchivesList :cardNum="rowItem.cardNum" :unitId="unitId"></PersonalArchivesList>
        <TestRecordListCom :cardNum="rowItem.cardNum" :unitId="unitId"></TestRecordListCom>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Auth from "../../../../common/api/RadioactiveSourceMange/companyIntroduce/RadiationWorkers"
import PaginationCom from "../../../../components/CommonComponrnts/PaginationCom.vue"
import WorkersInfoCom from './WorkersInfoCom.vue'
import TrainingRecordListCom from './TrainingRecordListCom.vue'
import PersonalArchivesList from './PersonalArchivesListCom.vue'
import TestRecordListCom from './TestRecordListCom.vue'
import { EventBus } from '../../../../common/eventbus'
export default {
  name: "RadiationWorkers",
  components: {
    PaginationCom,
    WorkersInfoCom,
    TrainingRecordListCom,
    PersonalArchivesList,
    TestRecordListCom
  },
  created () {
    this.unitId = this.$route.query.id
    if (!this.unitId) return
    this.queryRadiationWorkersList()
  },
  mounted () {
    this.loadingChangePage()
  },
  beforeDestroy () {
    EventBus.$off('changePage')
  },
  data () {
    return {
      rowItem: {},
      TrainingRecordList: [],
      WorkersInfo: {},
      dialogTableVisible: false,
      pagination: {
        total: 0,
        current: 1,
        size: 10
      },
      searchForm: {},
      tableData: []
    }
  },
  methods: {
    handleLook (index, row) {
      this.dialogTableVisible = true
      console.log('index, row', index, row);
      this.rowItem = row
    },
    queryRadiationWorkersList () {
      var params = {
        "cardNum": this.searchForm.cardNum,
        "cardType": this.searchForm.cardType,
        "name": this.searchForm.name,
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
        "unitId": this.unitId
      }
      Auth.getRadiationWorkersList(params).then((res) => {
        if (res.code === 0) {
          this.pagination.total = res.data.totalPage
          this.tableData = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onSearch () {
      this.pagination.curPage = 1
      this.queryRadiationWorkersList()
    },
    loadingChangePage () {
      EventBus.$on('changePage', (params) => {
        console.log('params', params);
        this.pagination.current = params.cur_page
        this.pagination.size = params.cur_pageSize
        this.queryRadiationWorkersList()
      })
    },
  }
}
</script>

<style scoped lang="less">
// 弹框内的
.myDialog /deep/ .el-pagination .el-select .el-input .el-input__inner {
  width: 100px !important;
}

.tableMange {
  height: calc(100% - 180px);
}
.panelBox {
  overflow: auto;
}
.icon {
  width: 16px;
  height: 16px;
  vertical-align: sub;
}
.title {
  font-size: 18px;
  color: #1a1e28;
  margin: 20px 0 10px 0;
}
.changePagination {
  height: 60px;
  margin-top: 5px;
  text-align: right;
}
.tips {
  position: relative;
  margin-bottom: 12px;
  .tips-txt {
    width: 100%;
    height: 30px;
    background: linear-gradient(270deg, rgba(255, 66, 66, 0) 0%, #ff2f2f 53%, rgba(255, 31, 31, 0.41) 100%);
    opacity: 0.1;
  }
  p {
    color: #ff1f1f;
    font-size: 12px;
    position: absolute;
    top: 50%;
    transform: translate(20px, -50%);
  }
}
.lookBtn {
  color: #19b8ff;
  text-decoration: underline;
}

/deep/ .el-table {
  border: 1px solid #dddddd;
}
/deep/ .el-table td.el-table__cell {
  border-bottom: 1px solid #dddddd;
}
/deep/ .el-table thead.is-group th.el-table__cell {
  background: #ffff;
}
/deep/ .el-table td.el-table__cell div {
  line-height: 19px;
}
/deep/ .el-table--border .el-table__cell {
  border-right: none;
}

/deep/ .el-table th.el-table__cell > .cell {
  font-weight: bold;
  line-height: 19px;
}
.myForm {
  margin-bottom: 18px;
}
/deep/ .myForm .el-form-item {
  margin-bottom: 0;
}
.myForm .el-button {
  margin-bottom: 0;
}
</style>


<style lang="less">
// 公共表格样式
.el-table__body-wrapper {
  overflow-y: auto !important;
}
.el-progress.el-progress--line {
  width: 100%;
}
.el-progress__text {
  color: #333;
  font-weight: 500;
  font-size: 25px !important;
}
.el-table .cell {
  color: #333;
}
.el-table th .cell {
  color: #1a1e28;
}
.el-table thead.is-group th {
  background: #fafafa;
}
.tablePaginations {
  width: 100%;
  height: 100%;
}
.changeTableH {
  height: calc(100% - 65px);
}
.changeTable.el-table--border td,
.changeTable.el-table--border th,
.changeTable.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: none;
}
.changeTable.el-table--border td .cell {
  color: #1a1e28;
}
</style>
