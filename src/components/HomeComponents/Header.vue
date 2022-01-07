<template>
  <div class="headerMain rowSpace alignCenter">
    <div class="projectName"> {{projectName}} </div>
    <div class="navList rowFlex">
      <div
        class="navListLi alignCenter"
        v-for="item in navList"
        :key="item.id"
        :class="navListId === item.id ? 'selected' : ''"
        @click="changeSelected(item.id)">
        <div class="triangle-up" v-if="navListId === item.id"></div>
        <img :src="item.img">
        {{item.name}}
      </div>
    </div>
    <div class="right rowSpace alignCenter">
      <div>欢迎您，系统管理员</div>
      <div @click="handelOpenModal" class="logout">注销</div>
    </div>
  </div>
</template>

<script>
import radioactiveSourceMange from '../../assets/images/nav/radioactiveSourceMange.png'
import alarmQuery from '../../assets/images/nav/alarmQuery.png'
import mobilePatrol from '../../assets/images/nav/mobilePatrol.png'
import realTimeMonitoring from '../../assets/images/nav/realTimeMonitoring.png'
import statisticalAnalysis from '../../assets/images/nav/statisticalAnalysis.png'
import knowledgeBase from '../../assets/images/nav/knowledgeBase.png'
import informationManagement from '../../assets/images/nav/informationManagement.png'
import Config from '@/common/config'
export default {
  name: 'Header',
  data () {
    return {
      projectName: Config.PROJECT_NAME,
      navList: [
        {
          name: '放射源信息管理',
          id: 'radioactiveSourceMange',
          img: radioactiveSourceMange
        },
        {
          name: '报警查询',
          id: 'alarmQuery',
          img: alarmQuery
        },
        {
          name: '移动巡查',
          id: 'mobilePatrol',
          img: mobilePatrol
        },
        {
          name: '实时监测',
          id: 'realTimeMonitoring',
          img: realTimeMonitoring
        },
        {
          name: '统计分析',
          id: 'statisticalAnalysis',
          img: statisticalAnalysis
        },
        {
          name: '知识库',
          id: 'knowledgeBase',
          img: knowledgeBase
        },
        {
          name: '信息管理',
          id: 'informationManagement',
          img: informationManagement
        }
      ],
      navListId: 'radioactiveSourceMange',
      navListParams: {
        'radioactiveSourceMange': 'radioactiveSourceMange',
        'alarmQuery': 'alarmQuery',
        'MobilePatrol': 'mobilePatrol',
        'RealtimeMonitor': 'realTimeMonitoring',
        'AnalysisHtml': 'statisticalAnalysis',
        'KnowledgeBase': 'knowledgeBase',
        'InformationManagement': 'informationManagement'
      }
    }
  },
  methods: {
    handelOpenModal () {
      this.$store.dispatch('SIGN_OUT').then(resp => {
        console.log(this.$route.fullPath)
        this.$router.replace({
          path: '/login',
          query: { redirect: this.$route.fullPath }
        })
      })
    },
    changeSelected (id) {
      this.navListId = id
      this.$router.push({
        path: `/homeHtml/${id}`
      })
    }
  },
  watch: {
    $route: {
      handler (newName, oldName) {
        let pathList = newName.path.split('/')
        console.log(this.path)
        this.navListId = this.navListParams[pathList[pathList.length - 2]]
      },
      deep: true
    }
  },
  created () {
    let pathList = this.$route.path.split('/')
    this.navListId = this.navListParams[pathList[pathList.length - 2]]
  }
}
</script>

<style scoped>
.headerMain{
  padding: 0 20px;
  box-sizing: border-box;
}
.logout{
  cursor: pointer;
  margin-left: 20px;
  height: 35px;
  border-radius: 3px;
  background: rgba(255, 255, 255, .2);
  line-height: 35px;
  padding: 0 22px;
}
.navListLi{
  margin-left: 30px;
  cursor: pointer;
  color: #fff;
  position: relative;
  height: 61px;
  opacity: 0.7;
}
.navListLi.selected{
  color: #fff;
  font-weight: bold;
  opacity: 1;
}
.projectName{
  font-size: 28px;
  font-weight: bold;
  color: #FFFFFF;
}
.triangle-up {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -5px;
}
@media screen and (max-width: 1400px) {
  .projectName{
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
  }
  .navListLi{
    margin-left: 10px;
  }
  .logout{
    cursor: pointer;
    margin-left: 10px;
    padding: 0 10px;
    font-size: 14px;
  }
}
</style>
