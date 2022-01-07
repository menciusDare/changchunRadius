<template>
  <div>
    <div class="title">职业照射时个人剂量监测档案</div>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="rowClass">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="yeartime" label="检测年份"> </el-table-column>
      <el-table-column align="center" label="外照射个人剂量（mSv）" class-name="borderNone">
        <el-table-column prop="hp" label="Hp(0.07)"> </el-table-column>
        <el-table-column prop="hp3" label="Hp(3)"> </el-table-column>
        <el-table-column prop="hp10" label="Hp(10)"> </el-table-column>
      </el-table-column>
      <el-table-column prop="ei" label="内照射待积有效剂量（Ei(mSv)）" width="260"> </el-table-column>
      <el-table-column prop="total" label="总有效剂量E (mSv )"> </el-table-column>
      <el-table-column prop="testingOrg" label="检测机构"> </el-table-column>
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
        current: 1,
        total: 0,
        size: 10
      },
    }
  },
  created () {
    this.queryStaffPersonalArchivesList()
  },
  methods: {
    changePage (page) {
      this.pagination.current = page.cur_page
      this.pagination.size = page.cur_pageSize
      this.queryStaffPersonalArchivesList()
    },
    // 职业照射个人剂量检测档案
    queryStaffPersonalArchivesList () {
      var params = {
        cardNum: this.cardNum,
        unitId: this.unitId,
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
      }
      Auth.getStaffPersonalArchivesList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.pagination.total = res.data.totalCount
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    rowClass (row) {
      if (row.columnIndex === 2 && row.rowIndex === 0) {
        return "color: #8A8A8A;";
      }
      return 'color:#1A1E28;'
    }
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 18px;
  color: #1a1e28;
  margin: 20px 0 10px 0;
}
/deep/ .borderNone{
  border-bottom: none !important;
}
</style>