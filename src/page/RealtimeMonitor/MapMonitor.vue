<template>
  <div class="mapMonitorContainer">
    <selectMap
      class="selectMap"
      :rangeData="rangeData"
      :companyList="companyList"
      :selectedQueryData="selectedQueryData"
      @changePopMain="changePopMain" @loadingMapData="loadingMapData">
    </selectMap>
    <MapContainer class="MapContainer" :companyList="companyList" @changePopMain="changePopMain"></MapContainer>
    <NumList class="NumList" :NumList="NumList"></NumList>
    <div class="length">
      <div v-for="item in lengthList" :key="item.id" class="rowFlex">
        <div :class="item.id"></div>
        <div>{{item.name}}</div>
      </div>
    </div>
    <PopMainTab
      :changeCloseShow="changeCloseShow"
      class="popMain">
    </PopMainTab>
    <div class="rangeList">
      <el-dialog
          class="rangeList"
          title="活动种类和范围"
          :visible.sync="popStatus"
          :append-to-body="appendStatus"
          width="50%">
        <div class="rowFlex">
<!--          <div class="">活动种类和范围</div>-->
          <div class="rowFlex rowTypeLi alignCenter" v-for="item in rangeListType" :key="item.id">
            <el-checkbox v-model="item.status" @change="changeRangeListType(item.id, item.status)"></el-checkbox>
            <div class="itemRangeText">{{item.name}}</div>
          </div>
        </div>
        <div class="rangeContent">
          <div class="rangeContentTop"></div>
          <div v-for="item in rangeList" :key="item.id" class="rowFlex rangeContentLi">
            <div class="rangeContentName">{{item.name}}</div>
            <div class="rangeContentText flexWrap alignCenter">
              <div v-for="(itemChildren, itemKey) in item.isChildren" :key="itemKey" class="rangeContentTextLi">
                <div v-if="itemChildren != null" class="rowFlex alignCenter">
                  <div class="itemKeyName">{{rangeName[itemKey]}}：</div>
                  <div v-for="itemRange in itemChildren" :key="itemRange.id" class="rowFlex alignCenter">
                    <el-checkbox v-model="itemRange.status" @change="changeRangeData(itemKey, item.id, itemRange.code, itemRange.status)" :disabled="!item.isDisable"></el-checkbox>
                    <div class="itemRangeText">
                      {{itemRange.name}}
                    </div>
                  </div>
                </div>
                <div v-else></div>
              </div>
            </div>
          </div>
        </div>
        <el-button @click="closePopFun({status: false,
        isList: true})" class="queryButton" type="primary">确定</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MapContainer from './MapContainer/MapCon'
import selectMap from './MapContainer/selectMap'
import NumList from './MapContainer/NumList'
import PopMainTab from './MapContainer/PopMain/PopMainTab'
import MapMonitor from '../../common/api/RealtimeMonitor/MapMonitor'
import {EventBus} from '../../common/eventbus'
export default {
  name: 'AgainQuery',
  data () {
    return {
      breadcrumb: [
        {
          name: '许可证重新申请查询',
          path: '/homeHtml/RealtimeMonitor/RealtimeGlance'
        }
      ],
      lengthList: [
        {
          name: '非重点单位',
          id: 'fei'
        },
        {
          name: '重点单位',
          id: 'zhong'
        },
        {
          name: '移动源单位',
          id: 'yidong'
        }
      ],
      companyList: [],
      popStatus: false,
      appendStatus: true,
      rangeListType: [
        {
          name: '唯一',
          id: 'weiyi',
          status: false
        },
        {
          name: '放射源',
          id: 'source',
          status: false
        },
        {
          name: '非密封放射性物质',
          id: 'unsealedMaterial',
          status: false
        },
        {
          name: '射线装置',
          id: 'installation',
          status: false
        }
      ],
      rangeList: [
        {
          name: '放射源',
          id: 'source',
          isChildren: [],
          isDisable: false
        },
        {
          name: '非密封放射性物质',
          id: 'unsealedMaterial',
          isChildren: [],
          isDisable: false
        },
        {
          name: '射线装置',
          id: 'installation',
          isChildren: [],
          isDisable: false
        }
      ],
      rangeData: {
        installation: {
          product: [],
          installationSale: [],
          sale: [],
          use: []
        },
        source: {
          product: [],
          installationSale: [],
          sale: [],
          use: []
        },
        unsealedMaterial: {
          product: [],
          installationSale: [],
          sale: [],
          use: []
        }
      },
      rangeName: {
        installationSale: '销售（含建造）I类射线装置',
        product: '生产',
        sale: '销售',
        use: '使用'
      },
      selectedQueryData: {
        regionCode: '',
        unitName: ''
      },
      NumList: {},
      isShow: false,
      params: {},
      popId: '',
      detailData: {},
      changeCloseShow: false,
      weiStatus: false
    }
  },
  methods: {
    loadingMapData () {
      this.popStatus = false
      let params = {
        ...this.selectedQueryData,
        ...this.rangeData,
        unique: this.weiStatus ? 1 : 0
      }
      MapMonitor.getMapUnitList(params).then(
        (res) => {
          this.companyList = res.data.unitInfoList
          this.NumList = res.data.stationOnlineInfo
          // this.changeCloseShow = !this.changeCloseShow
        }
      )
    },
    changePopMain (popStatus) {
      console.log(popStatus)
      this.popStatus = popStatus
    },
    loadingActiveCategory () {
      MapMonitor.getActiveCategory().then(res => {
        this.rangeList = this.rangeList.map(item => {
          item.isChildren = res.data[item.id]
          return item
        })
      })
    },
    changeRangeData (id, key, value, status) {
      if (status == true) {
        if (id != 'installationSale') {
          this.rangeData[key][id].push(value)
        } else {
          this.rangeData[key][id] = value
        }
        console.log(this.rangeData)
      } else {
        this.rangeData[key][id] = this.rangeData[key][id].filter(item => item != value)
        console.log(this.rangeData)
      }
    },
    changeRangeListType (keyValue, status) {
      if (keyValue == 'weiyi') {
        this.weiStatus = status
      } else {
        this.rangeList = this.rangeList.map(item => {
          if (item.id == keyValue) {
            item.isDisable = status
            Object.keys(item.isChildren).forEach((value, key) => {
              item.isChildren[value].map(itemKind => {
                itemKind.status = false
                // if (status == true) {
                //   this.rangeData[item.id][value].push(itemKind.code)
                // } else {
                //   this.rangeData[item.id][value] = this.rangeData[item.id][value].filter(item => item != itemKind.code)
                // }
                // return itemKind
              })
            })
          }
          return item
        })
      }
    },
    closePopFun (popStatus) {
      this.popStatus = popStatus
      this.loadingMapData()
    }
    // getData () {
    //   // this.companyName = 'xx固定放射源监测站'
    //   // this.detailData = {
    //   //   status: '在线',
    //   //   code: '吉环辐证[A0622]',
    //   //   companyStatus: '正常',
    //   //   companyType: '核技术利用单位',
    //   //   companyRange: '生产、使用、销售I类射线装置',
    //   //   num: '3',
    //   //   jiliang: 'xxxxx'
    //   // }
    //   MapMonitor.getMapUnitInfo({unitId: this.popId}).then(res => {
    //     this.detailData = res.data
    //   })
    // },
    // loadingShowPop () {
    //   EventBus.$on('showPop', (params) => {
    //     console.log("展示弹窗内容")
    //     // this.isShow = false
    //     this.params = params
    //     this.isShow = true
    //     this.popId = params.id
    //     this.getData()
    //   })
    // }
  },
  mounted () {
    this.loadingMapData()
    this.loadingActiveCategory()
  },
  components: {
    MapContainer,
    selectMap,
    NumList,
    PopMainTab
  },
  watch: {
    popId: function () {
      this.getData()
    }
  }
}
</script>

<style scoped>
.popMain{
  width: 468px;
  min-height: 376px;
  position: absolute;
  left: 50%;
  top: 0%;
  /*transform: translate(-50%, -50%);*/
  background: #fff;
  box-sizing: border-box;
  border-radius: 16px;
  z-index: 1000;
  box-shadow: 0px 0px 12px 0px rgba(33, 62, 145, 0.15);
}
.mapMonitorContainer{
  width: 100%;
  height: 100%;
  position: relative;
}
.MapContainer{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0px;
}
.selectMap{
  width: 240px;
  height: calc(100% - 64px);
  padding: 16px 9px;
  box-sizing: border-box;
  background: #fff;
  position: absolute;
  left: 20px;
  top: 32px;
  z-index: 1000;
  border-radius: 10px;
}
.NumList{
  width: 1100px;
  position: absolute;
  left: 50%;
  margin-left: -550px;
  bottom: 20px;
  z-index: 1000;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  height: 61px;
  padding: 0 25px;
  box-sizing: border-box;
}
.length{
  width: 110px;
  padding: 10px 15px;
  box-sizing: border-box;
  background: #FFFFFF;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 1000;
  border-radius: 10px;
  color: #333333;
  font-size: 12px;
}
.fei{
  width: 10px;
  height: 15px;
  background: url("../../assets/images/MapMonitor/noZhongdian.png") no-repeat center;
  background-size: 100%;
  margin-right: 8px;
}
.zhong{
  width: 10px;
  height: 15px;
  background: url("../../assets/images/MapMonitor/zhongdian.png") no-repeat center;
  background-size: 100%;
  margin-right: 8px;
}
.yidong{
  width: 10px;
  height: 15px;
  background: url("../../assets/images/MapMonitor/yidong.png") no-repeat center;
  background-size: 100%;
  margin-right: 8px;
}
.rangeList{
  color: #333333;
  font-size: 14px;
  width: 100%;
}
.rangeContent{
  background: rgba(244, 246, 250, 1);
  position: relative;
  margin-top: 18px;
  border-top: 2px solid rgba(165, 178, 203, 1);
}
.rangeContentTop{
  width: 0px;
  height: 0px;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-bottom: 14px solid #A5B2CB;
  position: absolute;
  top: -16px;
  left: 30px;
}
.rowTypeLi{
  margin-right: 40px;
}
.rangeContentLi{
  border-bottom: 1px solid #CCD2DF;
}
.rangeContentLi:last-child{
  border-bottom: 0px;
}
.rangeContentName{
  width: 20%;
  box-sizing: border-box;
  background: rgba(177, 184, 201,.2);
  padding: 15px 14px;
  font-weight: bold;
}
.itemKeyName{
  color: rgba(69, 155, 255, 1);
  margin-right: 20px;
}
.rangeContentText{
  padding: 15px 13px;
  box-sizing: border-box;
  width: 80%;
}
.rangeContentTextLi{
  width: 100%;
}
.itemRangeText{
  margin-right: 20px;
  margin-left: 10px;
}
</style>
<style>
.rangeList .el-dialog__body{
  padding: 20px 20px 15px;
}
.rangeList .el-dialog{
  box-shadow: 0px 0px 12px 0px rgba(33, 62, 145, 0.15);
  border-radius: 16px;
}
.rangeList .queryButton{
  margin-top: 10px;
  background: rgba(66, 139, 202, 1);
}
.rangeList .el-dialog__header{
  padding: 22px 26px 9px;
  border-bottom: 1px solid rgba(237, 239, 245, 1);
}
.rangeList .el-dialog__title{
  font-weight: bold;
  color: #333333;
  font-size: 18px;
}
</style>
