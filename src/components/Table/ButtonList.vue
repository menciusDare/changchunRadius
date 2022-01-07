<template>
  <!-- TODO 未提交、退回：编辑、删除；已提交、审批中、审批完成、审批不通过：查看-->
  <div class="rowCenter">
    <div v-for="item in buttonList" :key="item.id">
      <el-button
        class="buttonLi"
        v-if="item.status === row.statusCode"
        type="text"
        @click="changeButtton(item, row)"
        size="small">
        {{item.name}}</el-button>
    </div>
  </div>
</template>

<script>
import {EventBus} from '@/common/eventbus'
export default {
  name: 'ButtonList',
  methods: {
    // table内部的按钮
    changeButtton (itemButton, row) {
      console.log(itemButton, row)
      if (itemButton.id != 'shanchu') {
        EventBus.$emit('changeButttonFun', {
          itemButton: itemButton,
          row: row
        })
      } else {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          EventBus.$emit('changeButttonFun', {
            itemButton: itemButton,
            row: row
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  },
  data () {
    return {
      BUTTON_STATUS: {}
    }
  },
  props: {
    buttonList: Array,
    row: Object
  }
}
</script>

<style scoped>
.buttonLi{
  margin-right: 10px;
  color: rgba(25, 184, 255, 1);
}
</style>
