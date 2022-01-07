<template>
  <div class="pageBox">
      <div class="pageName">放射源基本信息</div>
      <div class="panelMain">
          <!-- <div class="content" v-for="(item,index) in infoData" :key="index">
            <div class="name">{{item.name}}</div>
            <div class="detail">{{item.value}}</div>
          </div> -->
      <!-- <el-descriptions :column="2" border>
        <el-descriptions-item  v-for="(item,index) in infoData" :key="index" :label="item.name" label-class-name="my-label" content-class-name="my-content">{{item.value}}</el-descriptions-item>
      </el-descriptions> -->
      <el-descriptions :column="2" border>
        <el-descriptions-item label="核素：" label-class-name="my-label" content-class-name="my-content">{{infoData.nuclide}}</el-descriptions-item>
        <el-descriptions-item label="出厂日期：" label-class-name="my-label" content-class-name="my-content">{{infoData.exitDate}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="出场活度（Bq）：" label-class-name="my-label" content-class-name="my-content">{{infoData.exitActivity}}</el-descriptions-item>
        <el-descriptions-item label="实时活度（Bq）：" label-class-name="my-label" content-class-name="my-content">{{infoData.realTimeActivity}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="编码：" label-class-name="my-label" content-class-name="my-content">{{infoData.code}}</el-descriptions-item>
        <el-descriptions-item label="类别：" label-class-name="my-label" content-class-name="my-content">{{infoData.category}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="标号：" label-class-name="my-label" content-class-name="my-content">{{infoData.grade}}</el-descriptions-item>
        <el-descriptions-item label="用途：" label-class-name="my-label" content-class-name="my-content">{{infoData.purpose}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="现所属单位：" label-class-name="my-label" content-class-name="my-content">{{infoData.unitName}}</el-descriptions-item>
        <el-descriptions-item label="许可证号：" label-class-name="my-label" content-class-name="my-content">{{infoData.licenseum}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="单位性质：" label-class-name="my-label" content-class-name="my-content">{{infoData.unitPropertyName}}</el-descriptions-item>
        <el-descriptions-item label="放射源状态：" label-class-name="my-label" content-class-name="my-content">{{infoData.state}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="产源国家：" label-class-name="my-label" content-class-name="my-content">{{infoData.sourceCountry}}</el-descriptions-item>
        <el-descriptions-item label="产源单位：" label-class-name="my-label" content-class-name="my-content">{{infoData.manufacturerUnit}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="所属区域：" label-class-name="my-label" content-class-name="my-content">{{infoData.regionName}}</el-descriptions-item>
        <el-descriptions-item label="" label-class-name="my-label" content-class-name="my-content"></el-descriptions-item>
      </el-descriptions>
      </div>
  </div>
</template>

<script>
import Api from '../../common/api/Information/index'
export default {
  name: 'RadioactiveInformation',
  data(){
    return{
       infoData:{
        code: "test_code1",
        nuclide: null,
        sourceCountry: null,
        manufacturerUnit: null,
        category: "Ⅰ类",
        purpose: "移动使用伽玛探伤机",
        exitActivity: null,
        realTimeActivity: null,
        unitName: null,
        licenseum: "11111111",
        industryCategory: "18",
        regionName:'',
        state: "1"
       },
       id: '',
    }
  },
  mounted(){
    this.getSourceInfoById()
  },
  methods:{
    getSourceInfoById(){
      Api.getSourceInfoById({id:this.$route.query.id}).then(res=>{
        if(res.code == 0){
          this.infoData = res.data
        }
      })
    }
    
  }
}
</script>

<style>
.el-descriptions-item__label.is-bordered-label{
    background: #fff;
    width: 25%;
    /* color: #000; */
    text-align: right;
}
.el-descriptions-item__content{
  width: 25%;
}
</style>
