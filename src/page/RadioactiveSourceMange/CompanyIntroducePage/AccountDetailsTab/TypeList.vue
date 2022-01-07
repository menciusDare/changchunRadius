<template>
  <div class="typeList">
    <div class="dataList" v-if="typeList.type === 'dataList'">
      <elx-radio-group
          v-model="dataMain[typeList.id]"
          size="mini"
          @change="typeList.isChangeShow ? changeButtonFun('querySelectd', typeList.id) : null">
        <el-radio-button
            v-for="(item, index) in typeList.data"
            :key="index"
            :label="item.name"
            :name="item.name"></el-radio-button>
      </elx-radio-group>
    </div>
    <!--  时间类型  -->
    <div
        class="dataList"
        v-if="typeList.type === 'datetimeRange'">
      <el-date-picker
          :format="typeList.format"
          :value-format="typeList.valueFormat"
          v-model="dataMain[typeList.id]"
          :type="typeList.typeValue"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <!--  下拉框类型  -->
    <div v-if="typeList.type === 'select'">
      <el-select
        :disabled="disabled ? disabled : false"
        v-model="dataMain[typeList.optionsId]"
        clearable
        placeholder="请选择"
        :class="typeList.isBorder == false ? 'noBorder': ''">
        <el-option
            v-for="(item, index) in typeList.options"
            :key="`${typeList.typeId}${index}`"
            :label="item.name"
            :value="item[typeList.typeId]">
        </el-option>
      </el-select>
    </div>
    <div v-if="typeList.type === 'input'">
      <el-input v-model="dataMain[typeList.id]" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "TypeList",
  props: {
    typeList: Object,
    dataMain: Object,
    disabled: Boolean
  }
}
</script>

<style>
.typeList .el-input__inner{
  height: 35px;
  line-height: 35px;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
}
.typeList .el-input__inner::placeholder{
  color: rgba(138, 138, 138, 1);
  font-size: 14px;
}
.noBorder .el-input__inner {
  border: 0px;
  height: 33px;
  line-height: 33px;
  margin-top: 1px;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
}
.typeList .el-date-editor .el-range-input{
  color: rgba(51, 51, 51, 1);
}
.typeList .el-date-editor .el-range-input::placeholder{
  color: rgba(138, 138, 138, 1);
}
</style>
