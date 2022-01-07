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
          name: '任务管理',
          id: 'TaskManage',
          isChildren: false,
          to: '/homeHtml/MobilePatrol/TaskManage',
          manage: '/homeHtml/MobilePatrol',
        },
        {
          name: '移动巡查管理',
          id: 'MobilePatrolManage',
          isChildren: true,
          manage: '/homeHtml/MobilePatrol',
          children:[
              {
              name: '巡查计划定制',
              id: 'PatrolPlanCustom',
              isChildren: false
            },
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