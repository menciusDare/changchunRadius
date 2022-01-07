<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">实时数据监控</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap newXrasearch-wrap">
        <el-form :inline="true" :model="searchForm" class="myForm">
          <el-form-item label="地址名称：" prop="region">
            <el-select
              clearable
              v-model="searchForm.region"
              size="small"
              filterable
              placeholder="请输入"
              class="handle-input mr10"
              style="width: 240px"
              @change="changeregion"
            >
              <el-option
                v-for="item in regionOptions"
                :key="item.pkId"
                :label="item.equipmentName"
                :value="item.pkId+':'+item.channelNum+':'+item.pinCode+':'+item.serialNum"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="videoXralayout-main clearfix">
        <div class="videobox">
          <iframe
            class="art-video"
            autoplay="true"
            paused
            :src="srcurl"
            width="100%"
            height="100%"
            controls="true"
          ></iframe>
          <!-- <video id="example_video" width="1217" height="650" class="video-js vjs-default-skin " controls poster="">
	    <source src="../../assets/img/video/normalvideo.mp4" type="mp4">
        </video> -->
        </div>
        <ul class="videocontrol">
          <li class="videob" @click="sourceup(0)"></li>
          <li class="videobbtext">N</li>
          <li class="videonan" @click="sourcedown(1)"></li>
          <li class="videonantext">S</li>
          <li class="videod" @click="videogo(3)"></li>
          <li class="videodtext">E</li>
          <li class="videox" @click="videoback(2)"></li>
          <li class="videoxtext">W</li>
          <!-- 上面是東南西北以及文字 -->
          <li
            :class="{ videoswitch: videobo, videostop: videostop }"
            @click="closevideo()"
          ></li>
          <!-- 中間開關 -->
          <li class="videobj" @click="zs(4)"></li>
          <li class="videodj" @click="ys(6)"></li>
          <li class="videoxj" @click="yx(7)"></li>
          <li class="videonj" @click="zx(5)"></li>
          <!-- 東南西北四個角 -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "../AnalysisHtml/compoents/Pagination.vue";
import noRegionalstatistics from "../../common/api/AnalysisHtml/noRegionalstatistics/noRegionalstatistics";

export default {
  name: "RealtimeGlance",
  components: {
    pagination,
  },
  data() {
    return {
      pinCode:'',
      serialNum:'',
      channelNum:'',
      token:'',
      srcurl: "", //视频地址
      stopurl: "", //控制视频停止
      contrlurltop: "", //上
      contrlurlb: "", //下
      contrlurll: "", //左
      contrlurlr: "", //右
      contrlurlzs: "", //左上
      contrlurlzx: "", //左下
      contrlurlys: "", //右上
      contrlurlyx: "", //右下
      videobo: true,
      videostop: false,
      dialogVisible: false,
      videolist: [],
      searchForm: {
        region: "",
        issuingauthority: "",
        category: "",
        time: "",
        unitstatus: "",
        unit: "",
        licensekey: "",
        activitycategory: "",
      },
      regionOptions: [],
      issuingauthorityOptions: [],
      categoryOptions: [],
      unitstatusOptions: [],
    };
  },
  methods: {
    getVideoToken(){
      let appk = '' 
      let secret = ''
      noRegionalstatistics.getVideoToken().then(res=>{
        if(res.code === 0){
          appk = window.atob(res.data.appKey)
          secret = window.atob(res.data.secret)
        }
        this.getToken(appk,secret)
      })
    },
    getToken(appk,secret){
      this.$axios.post(`https://open.ys7.com/api/lapp/token/get?appKey=${appk}&appSecret=${secret}`).then(res=>{
          this.token = res.data.data.accessToken
      })
    },
    changeregion(val) {
      let videoData = val.split(':')
      this.pinCode = videoData[2],
      this.serialNum = videoData[3],
      this.channelNum = videoData[1],
      this.srcurl = `https://open.ys7.com/ezopen/h5/iframe?url=ezopen://${this.pinCode}@open.ys7.com/${this.serialNum}/${this.channelNum}.live&autoplay=1&accessToken=${this.token}`; //视频地址
          // this.contrlurltop = `https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${
          //   this.videolist[i].token
          // }&deviceSerial=${this.videolist[i].serialNum}&channelNo=${
          //   this.videolist[i].channelNum
          // }&direction=${0}&speed=1`; //控制视频停止
          // this.contrlurlb = `https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${
          //   this.videolist[i].token
          // }&deviceSerial=${this.videolist[i].serialNum}&channelNo=${
          //   this.videolist[i].channelNum
          // }&direction=${1}&speed=1`; //下
          // this.contrlurll = `https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${
          //   this.videolist[i].token
          // }&deviceSerial=${this.videolist[i].serialNum}&channelNo=${
          //   this.videolist[i].channelNum
          // }&direction=${2}&speed=1`; //左
          // this.contrlurlr = `https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${
          //   this.videolist[i].token
          // }&deviceSerial=${this.videolist[i].serialNum}&channelNo=${
          //   this.videolist[i].channelNum
          // }&direction=${3}&speed=1`; //右
          // this.contrlurlzs = `https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${
          //   this.videolist[i].token
          // }&deviceSerial=${this.videolist[i].serialNum}&channelNo=${
          //   this.videolist[i].channelNum
          // }&direction=${4}&speed=1`; //左上
          // this.contrlurlzx = `https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${
          //   this.videolist[i].token
          // }&deviceSerial=${this.videolist[i].serialNum}&channelNo=${
          //   this.videolist[i].channelNum
          // }&direction=${5}&speed=1`; //左下
          // this.contrlurlys = `https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${
          //   this.videolist[i].token
          // }&deviceSerial=${this.videolist[i].serialNum}&channelNo=${
          //   this.videolist[i].channelNum
          // }&direction=${6}&speed=1`; //右上
          // this.contrlurlyx = `https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${
          //   this.videolist[i].token
          // }&deviceSerial=${this.videolist[i].serialNum}&channelNo=${
          //   this.videolist[i].channelNum
          // }&direction=${7}&speed=1`; //右下
          // this.stopurl = `https://open.ys7.com/api/lapp/device/ptz/stop?accessToken=${this.videolist[i].token}&deviceSerial=${this.videolist[i].serialNum}&channelNo=${this.videolist[i].channelNum}`; //控制视频停止
    },
    init() {
      var userId = this.$route.query.userId;
      var params = {
        equipmentId: userId,
      };
      noRegionalstatistics.getvideo(params).then((res) => {
        if (res.code == 0) {
          this.regionOptions = res.data;
          this.videolist = res.data;
          if (this.searchForm.region == "") {
            this.srcurl = "https://open.ys7.com/ezopen/h5/iframe?autoplay=1";
          }
        }
      });
    },
    sourceup(val) {
      var _this = this
      // this.srcurl = this.contrlurltop; //上
      _this.$axios.post(`https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${_this.token}&deviceSerial=${_this.serialNum}&channelNo=${_this.channelNum}&direction=${val}&speed=1`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
       ).then(res=>{
          _this.$message.success("操作成功")
      })
    },
    sourcedown(val) {
      // this.srcurl = this.contrlurlb; //下
      this.$axios.post(`https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${this.token}&deviceSerial=${this.serialNum}&channelNo=${this.channelNum}&direction=${val}&speed=1`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
       ).then(res=>{
          this.$message.success("操作成功")
        console.log(res)
      })
    },
    jumplook() {
      this.dialogVisible = true;
    },
    videogo(val) {
      // this.srcurl = this.contrlurlr; //右
      //   console.log(this.srcurl,'右')
        this.$axios.post(`https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${this.token}&deviceSerial=${this.serialNum}&channelNo=${this.channelNum}&direction=${val}&speed=1`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
       ).then(res=>{
         this.$message.success("操作成功")
        console.log(res)
      })
    },
    videoback(val) {
      // this.srcurl = this.contrlurll; //左
        console.log(this.srcurl,'左')
        this.$axios.post(`https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${this.token}&deviceSerial=${this.serialNum}&channelNo=${this.channelNum}&direction=${val}&speed=1`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
       ).then(res=>{
         this.$message.success("操作成功")
        console.log(res)
      })
    },
    zs(val) {
      // this.srcurl = this.contrlurlzs; //左上
        console.log(this.srcurl,'左上')
        this.$axios.post(`https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${this.token}&deviceSerial=${this.serialNum}&channelNo=${this.channelNum}&direction=${val}&speed=1`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
       ).then(res=>{
         this.$message.success("操作成功")
        console.log(res)
      })
    },
    ys(val) {
      // this.srcurl = this.contrlurlys; //右上
        console.log(this.srcurl,'右上')
        this.$axios.post(`https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${this.token}&deviceSerial=${this.serialNum}&channelNo=${this.channelNum}&direction=${val}&speed=1`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
       ).then(res=>{
         this.$message.success("操作成功")
        console.log(res)
      })
    },
    zx(val) {
      // this.srcurl = this.contrlurlzx; //左下
        console.log(this.srcurl,'左下')
        this.$axios.post(`https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${this.token}&deviceSerial=${this.serialNum}&channelNo=${this.channelNum}&direction=${val}&speed=1`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
       ).then(res=>{
         this.$message.success("操作成功")
        console.log(res)
      })
    },
    yx(val) {
      // this.srcurl = this.contrlurlyx; //右下
        console.log(this.srcurl,'右下')
        this.$axios.post(`https://open.ys7.com/api/lapp/device/ptz/start?accessToken=${this.token}&deviceSerial=${this.serialNum}&channelNo=${this.channelNum}&direction=${val}&speed=1`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
       ).then(res=>{
         this.$message.success("操作成功")
        console.log(res)
      })
    },
    closevideo() {
      this.$axios.post(`https://open.ys7.com/api/lapp/device/ptz/stop?accessToken=${this.token}&deviceSerial=${this.serialNum}&channelNo=${this.channelNum}`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
       ).then(res=>{
         this.$message.success("操作成功")
        console.log(res)
      })
       console.log(this.srcurl,'暂停')
    },
  },
  mounted() {
    this.init();
    this.getVideoToken()
  },
};
</script>

<style scoped>
@import "../../assets/Xraydevice/index.css";
</style>
    