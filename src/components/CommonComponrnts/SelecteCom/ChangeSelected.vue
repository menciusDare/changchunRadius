<template>
    <div class="rowSpace alignCenter queryPanel" :class="noBorder ? '' : 'border'">
        <div class="flex1 alignCenter rowFlex changeQueryList">
            <div v-for="itemTool in toolData" :key="itemTool.id" class="itemToolLi alignCenter">
                <div class="itemToolLiName">{{itemTool.name}}</div>
                <!--  多项选择  -->
                <div class="dataList" v-if="itemTool.type === 'dataList'">
                    <el-radio-group
                        v-model="dataMain[itemTool.id]"
                        size="mini"
                        @change="itemTool.isChangeShow ? changeButtonFun('querySelectd', itemTool.id) : null">
                        <el-radio-button
                            v-for="(item, index) in itemTool.data"
                            :key="index"
                            :label="item.name"
                            :name="item.name"></el-radio-button>
                    </el-radio-group>
                </div>
                <!--  时间类型  -->
                <div
                    class="dataList"
                    v-if="itemTool.type === 'datetimerange'">
                    <el-date-picker
                        @change="itemTool.isChangeShow ? changeButtonFun('querySelectd', itemTool.id) : null"
                        :format="itemTool.format"
                        :value-format="itemTool.valueFormat"
                        v-model="dataMain[itemTool.id]"
                        :type="itemTool.typeValue"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <!--  下拉框类型  -->
                <div v-if="itemTool.type === 'select'">
                  <el-select v-model="dataMain[itemTool.id]" clearable placeholder="请选择">
                    <el-option
                      v-for="item in itemTool.data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              <div v-if="itemTool.type === 'input'">
                <el-input v-model="dataMain[itemTool.id]" placeholder="请输入内容"></el-input>
              </div>
            </div>
        </div>
        <!-- 按钮列表 -->
        <div class="buttonList rowFlex">
            <div
              class="ml10"
              v-for="itemButton in buttonList"
              :key="itemButton.func"
              @click="changeButtonFun(itemButton.func, 'changeButtonFun')">
                <el-button type="primary">{{itemButton.name}}</el-button></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ExhaustGasAlarmMainChange',
  data () {
    return {
    }
  },
  props: {
    dataMain: Object,
    toolData: Array,
    buttonList: Array,
    changeButton: Function,
    noBorder: Boolean
  },
  methods: {
    // 点击查询按钮
    changeButtonFun (status, id) {
      this.$emit('changeButton', (status), (this.dataMain), (id))
    }
  }
}
</script>

<style scoped>
.dataList{
    margin-left: 10px;
}
.changeSelected{
    padding: 10px 10px 10px 0px;
    box-sizing: border-box;
    border-radius: 5px;
    height: 41px;
}
/*.buttonList{*/
/*    padding-left: 10px;*/
/*    box-sizing: border-box;*/
/*    border-left: 1px solid #d8d8d8;*/
/*}*/
.ml10{
  margin-left: 10px;
}
.itemToolLi, .itemToolLiName{
  margin-right: 10px;
}
</style>
