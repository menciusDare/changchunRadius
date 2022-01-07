<template>
  <div>
    <div class="rowFlex selectedMenu alignCenter"  @click="$router.push({path: '/homeHtml/RealtimeMonitor/RealtimeGlance'})">
      <div class="el-icon-arrow-left"></div>
      <i class="icon iconfont icon-RealtimeGlance"></i>
      <div>实时一览</div>
    </div>
    <div class="selectedQuery">
      <div class="selectedQueryList">
        <el-select
            clearable
            v-model="selectedQueryData.regionCode"
            placeholder="请选择区域"
            @change="changeMapList">
          <el-option
              v-for="item in selectedQuery.area"
              :key="item.code"
              :label="item.name"
              :value="item.code">
          </el-option>
        </el-select>
        <div class="selectedQueryDataName rowSpace" @click="selectedRange">
          <div class="selectInput">请选择活动种类与范围</div>
          <div class="queryButton select"></div>
        </div>
        <div class="selectedQueryDataName rowSpace">
          <el-input v-model="selectedQueryData.unitName" placeholder="请输入单位名称"></el-input>
          <div class="queryButton" @click="changeMapList"></div>
        </div>
      </div>
      <div class="companyList">
        <div
          @click="changeCompany(itemContent)"
          class="companyListLi"
          v-for="(itemContent, index) in companyList"
          :key="`itemContent${index}`">
          <div v-for="itemName in companyListName" :key="itemName.id" class="rowFlex itemContent">
            <div class="itemName">{{itemName.name}}</div>
            <div :class="itemName.id">{{itemContent[itemName.id]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {EventBus} from '../../../common/eventbus'
import commonApi from '../../../common/api/commonApi'
import '@/assets/images/icon/iconfont.css'
export default {
  name: 'selectMap',
  data () {
    return {
      selectedQuery: {
        area: []
      },
      companyListName: [
        {
          name: '',
          id: 'unitName'
        },
        {
          name: '许可证编号：',
          id: 'licenseNum'
        },
        {
          name: '单位状态：',
          id: 'unitState'
        },
        {
          name: '单位类型：',
          id: 'unitType'
        },
        {
          name: '活动种类和范围：',
          id: 'unitCategory'
        },
        {
          name: '放射源数量：',
          id: 'sourceNum'
        },
        {
          name: '非密封放射性物质数量：',
          id: 'unsealedMaterialNum'
        },
        {
          name: '射线装置：',
          id: 'installationNum'
        }
      ]
    }
  },
  methods: {
    changeCompany (itemContent) {
      let point = [itemContent.longitude, itemContent.latitude]
      EventBus.$emit('changeCenter', {
        point: point,
        id: itemContent.unitId
      })
    },
    selectedRange () {
      this.$emit('changePopMain', true)
    },
    changeMapList () {
      // this.$emit('closeMapPopFun', {
      //   status: false,
      //   isList: true
      // })
      this.$emit('loadingMapData')
      // let params = {
      //   selectedQueryData: this.selectedQueryData,
      //   rangeData: this.rangeData
      // }
      // EventBus.$emit('changeMap', (params))
    },
    loadingGetRegions () {
      commonApi.getRegions().then(res => {
        this.selectedQuery.area = res.data
      })
    }
  },
  props: {
    companyList: Array,
    changePopMain: Function,
    selectedQueryData: Object,
    closeMapPopFun: Function,
    rangeData: Object
  },
  mounted () {
    this.loadingGetRegions()
  }
}
</script>

<style scoped>
.selectedQuery{
  height: calc(100% - 30px);
}
.selectedMenu{
  color: rgba(8, 130, 253, 1);
  cursor: pointer;
  margin-bottom: 13px;
}
.selectedQueryDataName{
  width: 100%;
  height: 32px;
  background: #FFFFFF;
  border-radius: 3px;
  border: 1px solid #CCCCCC;
  margin-top: 10px;
}
.queryButton{
  width: 40px;
  height: 30px;
  background: #0882FD url("../../../assets/images/MapMonitor/queryButton.png") no-repeat center;
  border-radius: 0px 3px 3px 0px;
}
.queryButton.select{
  background: #0882FD url("../../../assets/images/MapMonitor/select.png") no-repeat center;
  border-radius: 0px 3px 3px 0px;
}
.itemContent{
  font-size: 11px;
  color: #333333;
  line-height: 15px;
  margin-bottom: 12px;
}
.itemContent:last-child{
  margin-bottom: 0px;
}
.itemContent .name{
  color: #333333;
  font-weight: bold;
  line-height: 21px;
  font-size: 16px;
}
.companyListLi{
  border-bottom: 1px solid #DDDDDD;
  box-sizing: border-box;
  padding: 19px 0;
  cursor: pointer;
}
.companyList{
  height: calc(100% - 100px);
  overflow-y: auto;
}
.selectInput{
  width: calc(100% - 40px);
  color: #8A8A8A;
  font-size: 12px;
  line-height: 30px;
  padding-left: 10px;
  box-sizing: border-box;
}
.unitName{
  color: #333333;
  font-size: 16px;
  font-weight: bold;
}
</style>
<style>
.selectedQuery .el-select{
  width: 100%;
  color: #8A8A8A;
  line-height: 30px;
  height: 30px;
}
.selectedQueryDataName .el-input{
  color: #8A8A8A;
  width: calc(100% - 40px);
}
.selectedQuery .el-input__inner{
  line-height: 30px;
  height: 30px;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  width: 100%;
  color: #8A8A8A;
  padding-left: 10px;
  font-size: 12px;
}
.selectedQuery .el-input__inner::placeholder{
  color: #8A8A8A;
  font-size: 12px;
}
.selectedQueryDataName .el-input__inner{
  border: none;
}
.selectedQuery .el-input__icon{
  line-height: 30px;
}
</style>
