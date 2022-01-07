<template>
  <div class="radioactive w100">
    <MenuRouter :menuParams="menuParams"></MenuRouter>
  </div>
</template>

<script>
import RouterAider from '@/components/RouterAider/index'
import MenuRouter from '../../components/CommonComponrnts/MenuRouter'
export default {
  name: 'Index',
  components: {
    MenuRouter,
    RouterAider
  },
  data () {
    return {
      menuParams: [
        {
          name: '核技术利用单位管理',
          id: 'companyIntroduce',
          isChildren: false,
          to: '/homeHtml/radioactiveSourceMange/companyIntroduce',
          manage: '/homeHtml/radioactiveSourceMange'
        },
        {
          name: '许可证管理',
          id: 'LicenseManagement',
          isChildren: true,
          manage: '/homeHtml/radioactiveSourceMange',
          children: [
            {
              name: '许可证首次申请查询',
              id: 'firstQuery',
              isChildren: false
            },
            {
              name: '许可证变更申请查询',
              id: 'changeQuery',
              isChildren: false
            },
            {
              name: '许可证重新申请查询',
              id: 'againQuery',
              isChildren: false
            },
            {
              name: '许可证延续申请查询',
              id: 'continueQuery',
              isChildren: false
            },
            {
              name: '许可证注销申请查询',
              id: 'cancellationQuery',
              isChildren: false
            }
          ]
        },
        {
          name: '消息提示',
          id: 'MessagePrompt',
          isChildren: true,
          manage: '/homeHtml/radioactiveSourceMange',
          children: [
            {
              name: '许可证到期提示',
              id: 'licenseExpiration',
              isChildren: false
            },
            {
              name: '年报缺失提示',
              id: 'annualReportMissing',
              isChildren: false
            },
            {
              name: '填报信息缺失提示',
              id: 'missingInformation',
              isChildren: false
            },
          ]
        },
        {
          name: '信息查询',
          id: 'Information',
          isChildren: true,
          manage: '/homeHtml/radioactiveSourceMange',
          children: [
            {
              name: '放射源查询',
              id: 'RadiationQuery',
              isChildren: false
            },
            {
              name: '非密封性物质查询',
              id: 'UnsealedQuery',
              isChildren: false
            },
            {
              name: '射线装置查询',
              id: 'RayDeviceQuery',
              isChildren: false
            },
          ]
        },
        {
          name: '监督检查期限整改逾期企业',
          id: 'inspectOverdueEnterprise',
          isChildren: false,
          to: '/homeHtml/radioactiveSourceMange',
          manage: '/homeHtml/radioactiveSourceMange'
        },
      ]
    }
  }
}
</script>

<style scoped>
.radioactive {
  width: 100%;
  height: 100%;
}
</style>
