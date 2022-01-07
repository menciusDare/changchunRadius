<template>
  <div
    v-if="isShow"
    :style="{
      transform: `translate3d( ${Math.round((this.params.coordinates[0])/2 - 50 )}px,
      ${Math.round(this.params.coordinates[1] + 376/2)}px,0)`}"
    :detailData="detailData">
    <div class="rowLine rowSpace alignCenter">
      <div class="rowFlex alignCenter">
        <div class="name">{{detailData.unitName}}</div>
        <div
          class="onlineStatus" :class="`onlineStatus${detailData.unitState}`">
          {{detailData.unitStateName}}
        </div>
      </div>
      <div
        class="el-icon-close"
        @click="loadingClosePop"></div>
    </div>
    <popDetail :detailData="detailData" :changeToolValue = "changeToolValue"></popDetail>
  </div>
</template>

<script>
import {EventBus} from '../../../../common/eventbus'
import popDetail from './popDetail'
import MapMonitor from '../../../../common/api/RealtimeMonitor/MapMonitor'
export default {
  name: 'PopMainTab',
  methods: {
    loadingShowPop () {
      EventBus.$on('showPop', (params) => {
        console.log(params)
        // this.isShow = false
        this.params = params
        this.isShow = true
        this.popId = params.id
        this.getData()
      })
    },
    loadingClosePop () {
      // let params = {
      //   status: false,
      //   isList: false
      // }
      // this.$emit('closeMapPopFun', params)
      this.isShow = false
    },
    getData () {
      MapMonitor.getMapUnitInfo({unitId: this.popId}).then(res => {
        this.detailData = res.data
        this.companyName = res.data.unitName
        this.changeToolValue = res.data.equipments.length > 0 ? res.data.equipments[0].pkId : ''
      })
    },
    mapChangePopStatus () {
      EventBus.$on('loadingMapChangePopStatus', (params) => {
        console.log("关闭")
        this.isShow = params
      })
    }
  },
  data () {
    return {
      params: {},
      popId: '',
      isShow: false,
      detailData: {},
      changeToolValue: ''
    }
  },
  beforeDestroy () {
    EventBus.$off('showPop')
    EventBus.$off('loadingMapChangePopStatus')
  },
  mounted () {
    // this.getData()
    this.loadingShowPop()
    this.mapChangePopStatus()
  },
  components: {
    popDetail
  },
  props: {
    closePopFun: Function,
    changeCloseShow: Boolean
  },
  watch: {
    changeCloseShow: function () {
      this.isShow = false
    }
  }
}
</script>

<style scoped>
.rowLine{
  padding: 22px 0px 9px 0px;
  box-sizing: border-box;
  border-bottom: 2px solid rgba(237, 239, 245, 1);
}
.rowLine .name{
  font-weight: bold;
  color: #333333;
  font-size: 18px;
  margin-right: 10px;
  padding-left: 10px;
}
.el-icon-close{
  margin-right: 10px;
}
.onlineStatus{
  padding: 1px 8px;
  box-sizing: border-box;
  background: rgba(54, 202, 105, 1);
  font-size: 12px;
  color: #FFFFFF;
  border-radius: 2px;
}
.onlineStatus.onlineStatus1{
  background: rgba(54, 202, 105, 1);
}
.onlineStatus.onlineStatus2{
  background: rgba(170, 170, 170, 1);
}
.onlineStatus.onlineStatus3{
  background: rgba(242, 14, 37, 1);
}
</style>
