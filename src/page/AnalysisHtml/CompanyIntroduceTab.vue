<template>
  <div class="componentIntroduce">
    <BreadcrumbCom :breadcrumb="breadcrumb"></BreadcrumbCom>
    <!--  切换项  routerMange 路由前缀 -->
    <StepTabPanel
      class="StepTabPanel"
      :tabList="componentList"
      :componentSelected="componentSelected"
      @changeComponents="changeComponents"
    ></StepTabPanel>
    <component :is="componentSelected" class="componentMain panelMain" :id="$route.query.id"></component>
  </div>
</template>

<script>
import StepTabPanel from '../../../src/components/CommonComponrnts/StepTabPanel.vue'
import BreadcrumbCom from '../../../src/components/CommonComponrnts/BreadcrumbCom'
import Company from '../RadioactiveSourceMange/CompanyIntroducePage/Company'
import TypeRange from '../RadioactiveSourceMange/CompanyIntroducePage/TypeRange/index.vue'
import AccountDetails from '../RadioactiveSourceMange/CompanyIntroducePage/AccountDetails'
import InstrumentsTesting from '../RadioactiveSourceMange/CompanyIntroducePage/InstrumentsTesting'
import RadiationSafety from '../RadioactiveSourceMange/CompanyIntroducePage/RadiationSafety.vue'
import RadiationWorkers from '../RadioactiveSourceMange/CompanyIntroducePage/RadiationWorkers'
export default {
  name: 'CompanyIntroduceMain',
  components: {
    StepTabPanel,
    BreadcrumbCom,
    Company,
    TypeRange,
    AccountDetails,
    InstrumentsTesting,
    RadiationSafety,
    RadiationWorkers
  },
  data () {
    return {
      breadcrumb: [
        {
          name: '返回',
          path: '/homeHtml/AnalysisHtml/companyIntroduceTab',
        }
      ],
      query:'',
      componentList: [
        {
          name: '单位基本信息',
          id: 'Company',
          img: 'first'
        },
        {
          name: '活动种类和范围',
          id: 'TypeRange',
          img: 'normal'
        },
        {
          name: '台账明细',
          id: 'AccountDetails',
          img: 'normal'
        },
        {
          name: '检测仪器和防护用品',
          id: 'InstrumentsTesting',
          img: 'normal'
        },
        {
          name: '辐射安全管理机构',
          id: 'RadiationSafety',
          img: 'normal'
        },
        {
          name: '辐射工作人员',
          id: 'RadiationWorkers',
          img: 'normal'
        }
      ],
      componentSelected: 'Company'
    }
  },
  methods: {
    changeComponents (id) {
      console.log(id)
      this.componentSelected = id
    }
  },
  mounted () {
    const {page} = this.$route.query;
    this.breadcrumb[0].path = `/homeHtml/AnalysisHtml/${page}`;
  }
}
</script>

<style scoped>
.StepTabPanel{
  /*height: 64px;*/
  /*box-sizing: border-box;*/
  /*padding: 10px 0px;*/
  width: 100%;
}
.componentMain{
  height: calc(100% - 100px);
  margin-top: 10px;
}
.componentIntroduce{
  height: 100%;
}
</style>
