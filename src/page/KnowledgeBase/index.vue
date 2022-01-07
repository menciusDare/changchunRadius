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
          name: '源信息',
          id: 'knowledgeBase',
          isChildren: true,
          to: '/homeHtml/knowledgeBase',
          manage: '/homeHtml/knowledgeBase',
          children: [
            {
              name: '放射源核素信息',
              id: 'RadiusElementInfo',
              isChildren: false
            },
            {
              name: '非密封放射性物质核素信息',
              id: 'NonBlockRadiusMaterial',
              isChildren: false
            },
            {
              name: '放射源编码序列编号分配',
              id: 'RadiusCodeNum',
              isChildren: false
            },
            {
              name: '源的分类规则',
              id: 'CodeDividRule',
              isChildren: false
            },
            {
              name: '非密封放射性物质工作场所分级',
              id: 'NonBlockWorkClass',
              isChildren: false
            },
            {
              name: '射线装置分类',
              id: 'XRayDeviceClass',
              isChildren: false
            }

          ]

        },
        {
          name: '辐射源用途',
          id: 'RadiusUage',
          isChildren: true,
          to: '/homeHtml/knowledgeBase',
          manage: '/homeHtml/knowledgeBase',
          children: [
            {
              name: '放射源用途',
              id: 'RadiusUage',
              isChildren: false
            },
            {
              name: '非密封放射性物质用途',
              id: 'NonBlockMaterialUasge',
              isChildren: false
            },
            {
              name: '射线装置用途',
              id: 'XRayUsageRU',
              isChildren: false
            }

          ]

        },
        {
          name: '放射源编码规则',
          id: 'XRayCodeRule',
          isChildren: false,
          to: '/homeHtml/knowledgeBase',
          manage: '/homeHtml/knowledgeBase'

        },
        {
          name: '监督执法信息',
          id: 'MonitorExecuteInfo',
          isChildren: false,
          to: '/homeHtml/knowledgeBase',
          manage: '/homeHtml/knowledgeBase'

        },
        {
          name: '公共文档库',
          id: 'PublicDocument',
          isChildren: false,
          to: '/homeHtml/knowledgeBase',
          manage: '/homeHtml/knowledgeBase'

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
