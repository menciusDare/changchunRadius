<template>
  <div class="homeMain" :class="path == 'MapMonitor' ? 'noPadding' :''">
    <RouterAider></RouterAider>
  </div>
</template>

<script>
import RouterAider from '@/components/RouterAider/index'
export default {
  name: 'HomeMain',
  components: {
    RouterAider
  },
  mounted () {
    console.log()
  },
  data () {
    return {
      path: ''
    }
  },
  watch: {
    $route: {
      handler (newName, oldName) {
        let pathList = newName.path.split('/')
        console.log(this.path)
        this.path = pathList[pathList.length - 1]
      },
      deep: true
    }
  },
  created () {
    let pathList = this.$route.path.split('/')
    this.path = pathList[pathList.length - 1]
  }
}
</script>

<style scoped>
.homeMain.noPadding{
  padding: 0px;
}
</style>
