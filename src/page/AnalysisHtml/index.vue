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
          name: '核技术利用单位统计',
          id: 'hjs',
          isChildren: true,
          manage: '/homeHtml/AnalysisHtml',
          children: [
            {
              name: '区域统计',
              id: 'noRegionalstatistics',
              isChildren: false
            },
            {
              name: '行业统计',
              id: 'noindustrystatistics',
              isChildren: false
            },
            {
              name: '变化趋势图',
              id: 'nochangetrend',
              isChildren: false
            }

          ]
        },
        {
          name: '放射源统计',
          id: 'fs',
          isChildren: true,
          manage: '/homeHtml/AnalysisHtml',
          children: [
            {
              name: '区域统计',
              id: 'souRegionalstatistics',
              isChildren: false
            },
            {
              name: '行业统计',
              id: 'souindustrystatistics',
              isChildren: false
            },

            {
              name: '用途统计',
              id: 'souusagestatistics',
              isChildren: false
            },
            {
              name: '核素统计',
              id: 'sounuclidestatistics',
              isChildren: false
            },
            {
              name: '变化趋势图',
              id: 'souchangetrend',
              isChildren: false
            }

          ]
        },
        {
          name: '非密封放射性物质统计',
          id: 'Unsealedradioactive',
          isChildren: true,
          manage: '/homeHtml/AnalysisHtml',
          children: [
            {
              name: '区域内场所统计',
              id: 'Regionalfield',
              isChildren: false
            },
            {
              name: '行业统计',
              id: 'Unindustrystatistics',
              isChildren: false
            },
            {
              name: '变化趋势图',
              id: 'Unchangetrend',
              isChildren: false
            }

          ]

        },
        {
          name: '射线装置统计',
          id: 'xrc',
          isChildren: true,
          manage: '/homeHtml/AnalysisHtml',
          children: [
            {
              name: '用途统计',
              id: 'Xraydevice',
              isChildren: false
            },
            {
              name: '行业统计',
              id: 'Industrystatistics',
              isChildren: false
            },
            {
              name: '变化趋势图',
              id: 'ChangeTrend',
              isChildren: false
            }

          ]
        },
        {
          name: '移动巡查统计',
          id: 'Mob',
          isChildren: true,
          manage: '/homeHtml/AnalysisHtml',
          children: [
            {
              name: '巡检情况统计',
              id: 'Mobilepatrol',
              isChildren: false
            },
            // {
            //   name: '行业统计',
            //   id: 'Mobindustrystatistics',
            //   isChildren: false
            // },
            {
              name: '变化趋势图',
              id: 'Mobchangetrend',
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
