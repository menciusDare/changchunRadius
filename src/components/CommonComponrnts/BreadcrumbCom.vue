<template>
  <el-breadcrumb separator="-" class="changeBreadcrumb">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumb"
      :key="index"
      :to="{ path: item.path}">
      <i v-if="item.name == '返回'" class="el-icon-arrow-left"></i>
      <span class="changeBreadcrumbSpan" :class="item.name == '返回' ? 'return' : ''">
        {{item.name}}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    breadcrumb: Array
  }
}
</script>

<style scoped>
.changeBreadcrumbSpan{
  cursor: pointer;
  font-size: 18px;
  color: #1A1E28;
}
.changeBreadcrumbSpan.return{
  font-size: 14px;
}
.changeBreadcrumb{
  margin-bottom: 10px;
}
</style>
