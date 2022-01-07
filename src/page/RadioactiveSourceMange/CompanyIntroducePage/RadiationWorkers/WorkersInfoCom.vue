<template>
  <div>
    <div class="title">辐射工作人员登记表</div>
    <div class="itemDiv">
      <div>
        <p class="color8A8A8A">姓名：</p>
        <p>{{ WorkersInfo.name }}</p>
      </div>
      <div>
        <p class="color8A8A8A">性别：</p>
        <p>{{ WorkersInfo.sex }}</p>
      </div>
      <div>
        <p class="color8A8A8A">出生日期：</p>
        <p>{{ WorkersInfo.birthday }}</p>
      </div>
      <div>
        <p class="color8A8A8A">毕业学校</p>
        <p>{{ WorkersInfo.school }}</p>
      </div>
      <div>
        <p class="color8A8A8A">学历</p>
        <p>{{ WorkersInfo.education }}</p>
      </div>
      <div>
        <p class="color8A8A8A">专业</p>
        <p>{{ WorkersInfo.profession }}</p>
      </div>
      <div>
        <p class="color8A8A8A">证件类型：</p>
        <p>{{ WorkersInfo.name }}</p>
      </div>
      <div>
        <p class="color8A8A8A">证件号码：</p>
        <p>{{ WorkersInfo.cardType }}</p>
      </div>
      <div>
        <p class="color8A8A8A">工作岗位：</p>
        <p>{{ WorkersInfo.name }}</p>
      </div>
      <div>
        <p class="color8A8A8A">备注：</p>
        <p>{{ WorkersInfo.remark }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../../../../common/api/RadioactiveSourceMange/companyIntroduce/RadiationWorkers"

export default {
  props: {
    staffId: {
      type: [String, Number],
    }
  },
  created () {
    this.queryRadiationWorkers(this.staffId)
  },
  data () {
    return {
      WorkersInfo: {}
    }
  },
  methods: {
    // 辐射工作人员详细信息
    queryRadiationWorkers (staffId) {
      this.WorkersInfo = {}
      Auth.getRadiationWorkers({ staffId }).then((res) => {
        if (res.code === 0) {
          this.WorkersInfo = res.data
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
.color8A8A8A {
  color: #8a8a8a;
}
.itemDiv {
  display: flex;
  background: #f4f6fa;
  padding: 15px 25px;
  font-size: 14px;
  div {
    flex: 1;
  }
}
</style>>