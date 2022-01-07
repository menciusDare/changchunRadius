<template>
  <div class="menuMain rowSpace">
    <el-menu
        :default-active="defaultActive"
        class="menuList">
      <template
        v-for="item in menuParams">
        <el-submenu v-if="item.isChildren" :key="item.id" :index="item.id">
          <template slot="title">
            <i :class="`icon-${item.id}`" class="icon iconfont"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group
              v-for="itemChild in item.children"
              :key="itemChild.id">
            <el-menu-item :index="itemChild.id"  @click="changeMenu(item.manage, itemChild.id)">{{ itemChild.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.id" :key="item.id" @click="changeMenu(item.manage, item.id)" v-else>
          <i :class="`icon-${item.id}`" class="icon iconfont"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="RouterAider">
      <RouterAider></RouterAider>
    </div>
  </div>
</template>

<script>
import RouterAider from '@/components/RouterAider/index'
import '@/assets/images/icon/iconfont.css'
export default {
  name: 'MenuRouter',
  props: {
    menuParams: Array
  },
  data () {
    return {
      defaultActive: ''
    }
  },
  methods: {
    changeMenu (manage, id) {
      if (this.$route.path == `${manage}/${id}`) return
      this.$router.push({
        path: `${manage}/${id}`
      })
    }
  },
  mounted () {
    let pathList = this.$route.path.split('/')
    if (pathList[pathList.length - 1]) {
      this.defaultActive = pathList[pathList.length - 1]
    } else {
      this.defaultActive = this.menuParams[0].isChildren ? this.menuParams[0].children[0].id : this.menuParams[0].id
    }
  },
  components: {
    RouterAider
  }
}
</script>

<style scoped>
.menuMain {
  width: 100%;
  height: 100%;
  padding: 0 0 10px 0;
  box-sizing: border-box;
}
.menuList{
  width: 240px;
  max-height: 100%;
  overflow-y: auto;
}
.RouterAider{
  width: calc(100% - 240px);
  padding: 0px 30px 30px 32px;
  box-sizing: border-box;
}
</style>
<style>
.menuList.el-menu{
  background: none;
  border-right: none;
}
/*.menuList.el-menu li {*/
/*  display: flex;*/
/*  align-items: center;*/
/*}*/
.menuList.el-menu li .el-submenu__title{
  margin-bottom: 5px;
  height: 48px;
  background: #fff;
  padding-left: 40px;
  line-height: 48px;
  border-radius: 5px;
}
.menuList.el-menu li.el-menu-item{
  margin-bottom: 5px;
  height: 48px;
  background: #fff;
  padding-left: 40px;
  line-height: 48px;
  border-radius: 5px;
}
.menuList.el-menu li span{
  color: #565659;
  font-size: 14px;
}
.menuList.el-menu li.is-active span{
  color: #0882FD;
}
.menuList.el-menu li.is-active i{
  color: #0882FD;
}
.menuList .el-menu-item.is-active{
  color: #0882FD;
}
.icon{
  width: 24px;
  height: 24px;
  overflow: hidden;
}
</style>
