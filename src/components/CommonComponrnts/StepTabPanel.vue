/**
* @components StepTabPanel.vue
* @desc 公用tab显示
* @params
* @return
* @name apple
* @time 2021/12/22
*/
<template>
  <div class="rowFlex">
    <div
        v-for="item in tabList"
        :key="item.id"
        class="panelLi alignCenter"
        :class="item.id == componentSelected ? 'selected' : ''"
        @click="changeTabList(item.id)">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepTabPanel',
  props: {
    tabList: Array,
    componentSelected: String,
    changeComponents: Function
  },
  methods: {
    changeTabList (id) {
      this.$emit('changeComponents', id)
    }
  }
}
</script>

<style scoped>
.panelLi{
  height: 64px;
  width: 257px;
  background: linear-gradient(270deg, rgba(119, 251, 255,.2) 0%, rgba(61, 184, 255, .2)  100%);
  box-shadow: 0px 2px 12px 0px rgba(233, 238, 250, 0.5);
  position: relative;
  font-size: 20px;
  font-weight: bold;
  color: #34516F;
  cursor: pointer;
  margin-right: 10px;
  padding-left: 54px;
  box-sizing: border-box;
}
.panelLi.selected{
  height: 64px;
  width: 257px;
  background: linear-gradient(270deg, #3CC0C4 0%, #438EB9 100%);
  box-shadow: 0px 2px 12px 0px rgba(233, 238, 250, 0.5);
  position: relative;
  color: rgba(255, 255, 255, 1);
}
.panelLi.selected:after{
  width: 0;
  height: 0;
  border-top: 32px solid transparent;
  border-left: 32px solid #3CC0C4;
  border-bottom: 32px solid transparent;
  position: absolute;
  content: '';
  right: -32px;
  z-index: 1000;
}
.panelLi:after{
  width: 0;
  height: 0;
  border-top: 32px solid transparent;
  border-left: 32px solid rgba(119, 251, 255,.2);
  border-bottom: 32px solid transparent;
  position: absolute;
  content: '';
  right: -32px;
  z-index: 1000;
}
.panelLi:nth-child(n+2):before{
  width: 0;
  height: 0;
  border-top: 32px solid transparent;
  border-left: 32px solid #F5F6F8;
  border-bottom: 32px solid transparent;
  position: absolute;
  content: '';
  left: 0px;
}
@media (max-width: 1600px) {
  .panelLi{
    width: 230px;
    font-size: 14px;
  }
  .panelLi.selected{
    width: 230px;
  }
}
</style>
