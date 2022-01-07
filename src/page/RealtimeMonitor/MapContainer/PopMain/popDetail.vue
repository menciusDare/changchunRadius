<template>
  <div>
    <div class="companyIntroduce">
      <div v-for="item in detailDataList" :key="item.id" class="rowFlex">
        <div class="companyIntroduceName">{{item.name}}</div>
        <div class="companyIntroduceNum">{{detailData[item.id]}}</div>
      </div>
    </div>
    <div class="realTime">
      <div class="rowSpace alignCenter">
        <div class="realTimeName">实时数据</div>
        <el-select v-model="changeToolValue" placeholder="请选择" @change="changeTool">
          <el-option
              v-for="item in detailData.equipments"
              :key="item.pkId"
              :label="item.equipmentName"
              :value="item.pkId">
          </el-option>
        </el-select>
      </div>
      <div class="companyIntroduce">
        <div class="rowFlex flexWrap">
          <!--          {{realTimeData}} - {{item.pollutionCode}}-->
          <div class="companyIntroduceName">监测时间：</div>
          <div class="companyIntroduceNum">{{realTimeData['monitorTime']}}</div>
        </div>
        <div v-for="item in detailData.pollutions" :key="item.pollutionCode" class="rowFlex flexWrap">
<!--          {{realTimeData}} - {{item.pollutionCode}}-->
          <div class="companyIntroduceName">{{item.pollutionName}}：</div>
          <div class="companyIntroduceNum">{{realTimeData[item.pollutionCode]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {EventBus} from '../../../../common/eventbus'
import MapMonitor from '../../../../common/api/RealtimeMonitor/MapMonitor'
export default {
  name: 'popDetail',
  props: {
    detailData: Object,
    // changeToolValue: {
    //   type: [Number, String],
    //   default: ''
    // }
  },
  methods: {
    changeTool (main) {
      console.log(this.detailData.equipments, main)
      this.realTimeData = this.detailData.equipments.length > 0 ? this.detailData.equipments.filter(item => item.pkId == main)[0] : {}
      console.log(this.realTimeData)
    }
  },
  data () {
    return {
      detailDataList: [
        {
          name: '许可证编号：',
          id: 'licenseNum'
        },
        {
          name: '单位状态：',
          id: 'unitStateName'
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
          name: '射线装置数量：',
          id: 'installationNum'
        }
      ],
      realTime: [
        {
          name: '数据时间：',
          id: 'monitorTime'
        },
        {
          name: '辐射剂量（uSv/h）：',
          id: 'monitorValue'
        }
      ],
      realTimeData: {},
      changeToolValue: ''
    }
  },
  mounted () {
    // this.changeToolValue = this.detailData.equipments.length > 0 ? this.detailData.equipments[0].pkId : ''
    // this.changeTool(this.changeToolValue)
  },
  watch: {
    detailData: function () {
      this.changeToolValue = this.detailData.equipments.length > 0 ? this.detailData.equipments[0].pkId : ''
      this.changeTool(this.changeToolValue)
    }
  }
}
</script>

<style scoped>
.companyIntroduce{
  padding: 14px 0px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333333;
}
.companyIntroduce>div{
  margin-bottom: 9px;
}
.companyIntroduceName{
  width: 40%;
  text-align: right;
  padding-left: 10px;
  box-sizing: border-box;
}
.companyIntroduceNum{
  width: 60%;
  padding-left: 10px;
  box-sizing: border-box;
}
.realTimeName{
  font-weight: bold;
  color: #333333;
  font-size: 14px;
}
.realTime{
  padding: 15px;
  box-sizing: border-box;
}
</style>
<style>
.realTime .el-input__inner{
  line-height: 30px;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  height: 30px;
  color: rgba(51, 51, 51, 1);
}
.realTime .el-input__inner::placeholder{
  color: rgba(138, 138, 138, 1);
}
.realTime .el-input__icon{
  line-height: 30px;
  height: 30px;
}
</style>
