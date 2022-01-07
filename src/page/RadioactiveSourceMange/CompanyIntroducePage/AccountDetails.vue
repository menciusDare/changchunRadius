<!--台账明细-->
<template>
  <div class="accountDetail">
    <div class="tabListCon rowFlex">
      <div
        class="tabList"
        v-for="item in  tabList"
        :key="item.id"
        :class="tabListSelected === item.id ? 'selected' :''"
        @click="tabListSelected = item.id">
        {{item.name}}
      </div>
    </div>
    <component
      :is="tabListSelected"
      class="tabListSelected"></component>
  </div>
</template>

<script>
import fangSheYuan from './AccountDetailsTab/FangSheYuan'
import noMiFeng from './AccountDetailsTab/NoMiFeng'
import sheXian from './AccountDetailsTab/SheXian'
import AccountDetails from '../../../common/api/RadioactiveSourceMange/companyIntroduce/AccountDetails'
export default {
  name: 'AccountDetails',
  data () {
    return {
      tabList: [
        {
          name: '放射源',
          id: 'fangSheYuan'
        },
        {
          name: '非密封放射性物质',
          id: 'noMiFeng'
        },
        {
          name: '射线装置',
          id: 'sheXian'
        }
      ],
      tabListSelected: 'fangSheYuan',
      NuclideList: [],
      PlaceList: [],
      PurposeList: []
    }
  },
  methods: {
  },
  created () {},
  components: {
    fangSheYuan,
    noMiFeng,
    sheXian
  }
}
</script>

<style scoped>
.tabListCon{
  width: 100%;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  /*box-shadow: 0px 2px 12px 0px rgba(233, 238, 250, 0.5);*/
}
.tabList{
  font-size: 14px;
  font-weight: bold;
  color: #8A8A8A;
  padding-bottom: 8px;
  padding-left: 33px;
  padding-right: 33px;
  box-sizing: border-box;
  cursor: pointer;
}
.tabList.selected{
  padding-bottom: 6px;
  border-bottom: 2px solid rgba(69, 155, 255, 1);
  color: rgba(69, 155, 255, 1);
}
.accountDetail{
  width: 100%;
}
.tabListSelected{
  height: calc(100% - 30px);
}
</style>
