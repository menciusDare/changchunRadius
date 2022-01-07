<template>
  <div class="Container">
    <HeaderMain></HeaderMain>
    <HomeMain></HomeMain>
  </div>
</template>

<script>
import HeaderMain from '../../components/HomeComponents/Header'
import HomeMain from '../../components/HomeComponents/HomeMain'
export default {
  name: 'HomeHtml',
  components: { HomeMain, HeaderMain }
}
</script>

<style>
  @import '../../assets/css/common.css';
</style>
