<template>
  <div>
    <div class="title">考试培训记录</div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="provice" label="考试省份"> </el-table-column>
      <el-table-column prop="profession" label="报考专业"> </el-table-column>
      <el-table-column prop="workType" label="辐射工作类别"> </el-table-column>
      <el-table-column prop="gradeBill" label="成绩报告单"> </el-table-column>
      <el-table-column prop="expireDate" label="有效期"> </el-table-column>
    </el-table>
    <PaginationCom :pagination="pagination" @changePage="changePage"></PaginationCom>
  </div>
</template>

<script>
import Auth from "../../../../common/api/RadioactiveSourceMange/companyIntroduce/RadiationWorkers"
import PaginationCom from "../../../../components/CommonComponrnts/Pagination.vue"

export default {
  components: {
    PaginationCom
  },
  props: {
    cardNum: {
      type: [String, Number],
    },
    unitId: {
      type: [String, Number],
    }
  },
  data () {
    return {
      tableData: [],
      pagination: {
        total: 0,
        current: 1,
        size: 10,
      },
    }
  },
  created () {
    this.queryStaffTestRecordList()
  },
  methods: {
    changePage (page) {
      this.pagination.current = page.cur_page
      this.pagination.size = page.cur_pageSize
      this.queryStaffTestRecordList()
    },
    // 辐射安全与安全防护培训记录
    queryStaffTestRecordList () {
      var params = {
        cardNum: this.cardNum,
        unitId: this.unitId,
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
      }
      Auth.getStaffTestRecordList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.pagination.total = res.data.totalCount
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 18px;
  color: #1a1e28;
  margin: 20px 0 10px 0;
}
</style>