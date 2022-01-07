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
          name: '报警查询',
          id: 'alarmQuery',
          isChildren: false,
          to: '/homeHtml/radioactiveSourceMange/companyIntroduce',
          manage: '/homeHtml/alarmQuery'
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
