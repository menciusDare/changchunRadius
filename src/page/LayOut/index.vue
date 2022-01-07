<template>
  <div class="rowFlex homeContentBox rowSpace">
    <div class="homeContentBoxNav">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
        </el-submenu>
      </el-menu>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods: {

  },
  components: {
  },
  mounted () {
    console.log(this.$route.params.id)
  },
  watch: {
    $route: {
      handler () {
        console.log(this.$route.params.id)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
