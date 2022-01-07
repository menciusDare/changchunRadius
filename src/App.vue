<template>
  <div id="app" class="wH100">
    <router-view/>
  </div>
</template>

<script>
import Storage from './common/storage';
import C from './common/constants';
import { UPDATE_AUTH } from './store/mutation-types';
export default {
  name: 'App',
  beforeCreate () {
    // 更新用户信息
    const user = JSON.parse(Storage.get(C.KEY_USER))
    user && this.$store.commit(UPDATE_AUTH, user)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, MicrosoftYaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
   position: fixed;
   overflow: hidden;
}
</style>
