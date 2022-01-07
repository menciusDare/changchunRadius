<template>
  <div class="panelMain">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="放射源" name="first"></el-tab-pane>
      <el-tab-pane label="非密封放射性物质" name="second"></el-tab-pane>
      <el-tab-pane label="射线装置" name="third"></el-tab-pane>
    </el-tabs>
    <UnsealedMaterialsCom v-if="activeName === 'first'" :unitId="unitId"></UnsealedMaterialsCom>
    <SourceListCom v-if="activeName === 'second'" :unitId="unitId"></SourceListCom>
    <RayDevicesCom v-if="activeName === 'third'" :unitId="unitId"></RayDevicesCom>
  </div>
</template>

<script>
import UnsealedMaterialsCom from './UnsealedMaterialsCom.vue'
import SourceListCom from './SourceListCom.vue'
import RayDevicesCom from './RayDevicesCom.vue'
export default {
  name: "TypeRange",
  components: {
    UnsealedMaterialsCom,
    SourceListCom,
    RayDevicesCom
  },
  created () {
    this.unitId = this.$route.query.id
  },
  data () {
    return {
      activeName: 'first',
      unitId: null,
    };
  },
  methods: {
    handleClick () {
      console.log(this.activeName);
    },
  }
}
</script>

<style scoped lang="less">
/deep/ .el-table thead.is-group th.el-table__cell {
  background: #ffff;
}
// tabs
/deep/ .el-tabs__header {
  margin-bottom: 20px;
}
/deep/ .el-tabs__item {
  font-weight: bold;
  color: #8a8a8a;
}
/deep/ .el-tabs__item.is-active {
  color: #459bff;
}
/deep/ .el-tabs__active-bar {
  height: 3px;
}
</style>
