<template>
  <div class="radioactive w100">
    <MenuRouter :menuParams="menuParams"></MenuRouter>
  </div>
</template>

<script>
import RouterAider from '@/components/RouterAider/index'
import MenuRouter from '../../components/CommonComponrnts/MenuRouter'
export default {
  name: 'InformationManagementIndex',
  components: {
    MenuRouter,
    RouterAider
  },
  data () {
    return {
      menuParams: [
        {
          name: '监测管理',
          id: 'monitorManagement',
          isChildren: true,
          manage: '/homeHtml/InformationManagement',
          children: [
            {
              name: '监控位置管理',
              id: 'monitoringLocation',
              isChildren: false
            },
            {
              name: '辐射装置管理',
              id: 'radiationDevice',
              isChildren: false
            },
            {
              name: '监测设备管理',
              id: 'monitoringEquipment',
              isChildren: false
            }
          ]
        },
        {
          name: '监测因子管理',
          id: 'monitorFactorManagement',
          isChildren: true,
          manage: '/homeHtml/InformationManagement',
          children: [
            {
              name: '监测因子',
              id: 'monitorFactor',
              isChildren: false
            },
            {
              name: '监测因子组',
              id: 'monitorFactorGroup',
              isChildren: false
            }
          ]
        },
        {
          name: '联系人管理',
          id: 'contactManagerF',
          isChildren: true,
          manage: '/homeHtml/InformationManagement',
          children: [
            {
              name: '联系人管理',
              id: 'contactManager',
              isChildren: false
            }
          ]
        },
        {
          name: '系统字典项管理',
          id: 'dictionaryManagement',
          isChildren: true,
          manage: '/homeHtml/InformationManagement',
          children: [
            {
              name: '核素管理',
              id: 'nuclideManagement',
              isChildren: false
            }
          ]
        }
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
