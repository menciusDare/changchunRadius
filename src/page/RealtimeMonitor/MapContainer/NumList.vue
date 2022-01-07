<template>
  <div class="rowSpace alignCenter">
    <div v-for="item in NumListName" :key="item.id" class="rowFlex alignCenter">
      <div class="NumListName">{{item.name}}</div>
      <div class="NumListValue" :class="item.id">{{NumList[item.id]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumList",
  data () {
    return {
      NumListName: [
        {
          name: '重点涉源企业',
          id: 'primaryUnitNum'
        },
        {
          name: '非重点涉源单位',
          id: 'unPrimaryNum'
        },
        {
          name: '放射源',
          id: 'sourceNum'
        },
        {
          name: '非密封放射性物质',
          id: 'unsealedMaterialNum'
        },
        {
          name: '射线装置',
          id: 'installationNum'
        },
        {
          name: '在线',
          id: 'onlineNum'
        },
        {
          name: '报警',
          id: 'alarmNum'
        },
        {
          name: '离线',
          id: 'offlineNum'
        }
      ]
    }
  },
  props: {
    NumList: Object
  }
}
</script>

<style scoped>
.NumListName{
  font-size: 14px;
  color: #333;
}
.NumListValue{
  font-size: 26px;
  font-weight: 500;
  color: #0882FD;
  margin-left: 10px;
  font-family: Oswald-Medium, Oswald;
}
.NumListValue.onlineNum{
  color: #32C966;
}
.NumListValue.alarmNum{
  color: rgba(242, 14, 37, 1);
}
.NumListValue.offlineNum{
  color: #AAAAAA;
}
</style>
