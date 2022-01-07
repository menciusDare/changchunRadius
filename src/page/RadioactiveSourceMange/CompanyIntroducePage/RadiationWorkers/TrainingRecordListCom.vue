<template>
  <div>
    <div class="title">辐射安全与防护培训记录</div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="48"> </el-table-column>
      <el-table-column prop="startTime" label="开始时间"> </el-table-column>
      <el-table-column prop="endTime" label="结束时间"> </el-table-column>
      <el-table-column prop="trainingLevel" label="培训等级"> </el-table-column>
      <el-table-column prop="trainingType" label="培训性质"> </el-table-column>
      <el-table-column prop="creditHours" label="学时（小时）"> </el-table-column>
      <el-table-column prop="certificateNo" label="证书编号"> </el-table-column>
      <el-table-column prop="trainingOrgName" label="培训机构名称"> </el-table-column>
      <el-table-column prop="trainingContent" label="培训内容"> </el-table-column>
      <el-table-column prop="dataType" label="数据更新类型"> </el-table-column>
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
    this.queryStaffTrainingRecordList()
  },
  methods: {
    changePage (page) {
      this.pagination.current = page.cur_page
      this.pagination.size = page.cur_pageSize
      this.queryStaffTrainingRecordList()
    },
    // 辐射安全与安全防护培训记录
    queryStaffTrainingRecordList () {
      this.tableData = []
      var params = {
        cardNum: this.cardNum,
        unitId: this.unitId,
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
      }
      Auth.getStaffTrainingRecordList(params).then((res) => {
        if (res.code === 0) {
          this.pagination.total = res.data.totalCount
          this.tableData = res.data.list
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