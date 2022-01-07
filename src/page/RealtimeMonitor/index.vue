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
          name: '地图监测',
          id: 'MapMonitor',
          isChildren: false,
          to: '/homeHtml/RealtimeMonitor/MapMonitor',
          manage: '/homeHtml/RealtimeMonitor',
        },
        {
          name: '实时一览',
          id: 'RealtimeGlance',
          isChildren: false,
          to: '/homeHtml/RealtimeMonitor/RealtimeGlance',
          manage: '/homeHtml/RealtimeMonitor',
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