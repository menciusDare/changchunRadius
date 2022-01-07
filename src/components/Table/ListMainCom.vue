<template>
  <div class="rowSpace flexWarp">
    <div
      class="rowSpace dataListMain"
      v-for="itemList in dataListName"
      :key="itemList.id">
      <div class="rowSpace w100">
        <div class="nameMain"> {{itemList.name}}:</div>
        <div class="TextMain  " v-if="itemList.type === 'input'">
           <div class="rowSpace">
             <div class="w100Div">
               <el-input
                 v-model="item[itemList.id]"
                 placeholder="无"
                 :disabled="itemList.disabled"></el-input>
               <el-input
                 class="modifyMain"
                 v-if="itemList.status === true && item[`${itemList.id}Status`]=== 1"
                 v-model="item[`${itemList.id}Modify`]"
                 placeholder="无"
                 :disabled="itemList.disabled"></el-input>
             </div>
             <div class="w3">
               <!--            {{item[`${itemList.id}Status`]}} {{itemList.type}} {{!item[`${itemList.id}Status`]}}-->

               <div
                 v-if="item[`${itemList.id}Status`] !== 9  && itemList.type != 'inputArray'"
                 class="TextMainIcon"
                 :class="item[`${itemList.id}Status`] == 0 ? 'el-icon-success' :(item[`${itemList.id}Status`] == 1 ? 'el-icon-error' : '')"></div>
             </div>
           </div>
          <div v-if="itemList.status === true && item[`${itemList.id}Status`]=== 1 && !!item[`${itemList.id}Url`]" class="rowSpace w100Div mTop10">
            <div v-for="itemUrl in  item[`${itemList.id}Url`].split(',')" class="w33">
              <img :src="`${AppConfig.appInfo.fastUrl}/${itemUrl}`" v-if="itemUrl!=''">
            </div>
          </div>
        </div>
        <div class="TextMain rowSpace " v-if="itemList.type === 'zubiao'">
           <div  class="" style="width: 100%">
             <div class="w100 rowFlex">
               <div class="rowFlex w100Div"
                    style="margin-bottom: 10px"
                    v-for="itemChildren in itemList.children"
                    :key="itemChildren.id">
                 <!-- 显示的坐标值 -->
                 <div class="rowFlex">
                   <el-input
                     placeholder="无"
                     v-model.trim="item[`${itemChildren.id}`]"
                     class="unchange"
                     :disabled="itemList.disabled">
                     <template slot="prepend">{{itemChildren.name}}</template>
                   </el-input>
                 </div>
               </div>
               <!-- 显示的图标 -->
               <div class="w3">
                 <div class="TextMainIcon"
                   v-if="item[`${itemList.children[0].id}Status`] !== 9 && itemList.type != 'inputArray'"
                   :class="
                    item[`${itemList.children[0].id}Status`] == 0 ? 'el-icon-success' :
                    (item[`${itemList.children[0].id}Status`] == 1  ? 'el-icon-error': '')"></div>
               </div>
             </div>
             <div class="modifyMain w100">
               <div class="rowFlex w100Div">
                 <div
                   class="rowFlex"
                   style="margin-bottom: 10px"
                   v-for="itemChildren in itemList.children"
                   :key="itemChildren.id">
                   <div class="rowFlex">
<!--                     {{item[`${itemChildren.id}Status`]}}-->
                     <el-input
                       v-if="itemList.status === true && item[`${itemChildren.id}Status`]== 1"
                       placeholder="无"
                       v-model.trim="item[`${itemChildren.id}Modify`]"
                       class="unchange"
                       :disabled="itemList.disabled">
                       <template slot="prepend">{{itemChildren.name}}</template>
                     </el-input>
                   </div>
                 </div>
<!--                 <div class="w3">-->
<!--                   <div class="TextMainIcon"-->
<!--                      :class="item[`${itemList.children[0].id}Status`] !== 1 ? 'el-icon-success' : 'el-icon-error'"-->
<!--                      v-if="item[`${itemList.children[0].id}Status`] !== 9 && itemList.type != 'inputArray'"></div>-->
<!--                 </div>-->
               </div>
             </div>
           </div>
        </div>
        <div  v-if="itemList.type === 'radios'" class="TextMain" style="line-height: 40px;">
<!--          {{item[`${itemList.id}Status`]}} {{itemList.type}} {{!item[`${itemList.id}Status`]}}-->
          <div class="rowSpace">
            <div  class="w100Div">
              <el-radio-group v-model="item[`${itemList.id}`]">
                <el-radio
                  :disabled="itemList.disabled"
                  v-for="itemChildren in itemList.children"
                  :key="itemChildren.id"
                  :label="itemChildren.id">{{ itemChildren.name }}</el-radio>
              </el-radio-group>
              <div>
                <el-radio-group v-model="item[`${itemList.id}Modify`]" class="" v-if="itemList.status === true && item[`${itemList.id}Status`]=== 1">
                  <el-radio
                    :disabled="itemList.disabled"
                    v-for="itemChildren in itemList.children"
                    :key="itemChildren.id"
                    :label="itemChildren.id">{{ itemChildren.name }}</el-radio>
                </el-radio-group>
              </div>
            </div>
<!--            <div class="w3">-->
<!--              <div class="TextMainIcon"-->
<!--                   :class=" item[`${itemList.id}Status`] != 1 ? 'el-icon-success' : 'el-icon-error'"-->
<!--                   v-if="item[`${itemList.id}Status`] !== 9 && itemList.type != 'inputArray'"></div>-->
<!--            </div>-->
          </div>
          <div v-if="itemList.status === true && item[`${itemList.id}Status`]=== 1 && !!item[`${itemList.id}Url`]" class="rowSpace w100Div mTop10">
            <div v-for="itemUrl in  item[`${itemList.id}Url`].split(',')" class="w33">
              <img :src="`${AppConfig.appInfo.fastUrl}/${itemUrl}`" v-if="itemUrl!=''">
            </div>
          </div>
        </div>
        <div  v-if="itemList.type === 'radiosArray'" class="TextMain " style="line-height: 40px;">
          <div
            class=""
            v-for="(itemChildren, indexChildren) in item[`${itemList.idmain}`]"
            :key="indexChildren">
            <div class="rowFlex">
              <div>
                <el-radio-group v-model="itemChildren[`${itemList.id}`]">
                  <el-radio
                    :disabled="itemList.disabled"
                    v-for="itemChildrenRadio in itemList.children"
                    :key="itemChildrenRadio.id"
                    :label="itemChildrenRadio.id">{{ itemChildrenRadio.name }}</el-radio>
                </el-radio-group>
                <el-radio-group
                  v-model="itemChildren[`${itemList.id}Modify`]"
                  class="" v-if="itemList.status === true && itemChildren[`${itemList.id}Status`]=== 1">
                  <el-radio
                    :disabled="itemList.disabled"
                    v-for="itemChildrenRadio in itemList.children"
                    :key="itemChildrenRadio.id"
                    :label="itemChildrenRadio.id">{{ itemChildrenRadio.name }}</el-radio>
                </el-radio-group>
              </div>
              <div class="TextMainIcon"
                   :class="itemChildren[`${itemList.id}Status`] !== 1 ? 'el-icon-success' : 'el-icon-error'"
                   v-if="itemChildren[`${itemList.id}Status`]  !== 9 && itemList.type == 'radiosArray'"></div>
            </div>
            <div
              v-if="itemList.status === true && itemChildren[`${itemList.id}Status`] !== 9
              && !!itemChildren[`${itemList.id}Url`]"
              class=" w100Div mTop10 rowFlex flexWarp">
              <div v-for="itemUrl in  itemChildren[`${itemList.id}Url`].split(',')" class="w33 maLeft">
                <img :src="`${AppConfig.appInfo.fastUrl}/${itemUrl}`" v-if="itemUrl!=''">
              </div>
            </div>
          </div>
        </div>
        <div  v-if="itemList.type === 'inputArray'" class="TextMain">
          <div
            class="marginb10"
            v-for="(itemChildren, indexChildren) in item[`${itemList.id}`]"
            :key="indexChildren">
            <div class="rowFlex rowSpace">
              <div class="w100Div">
                <el-input
                  v-model="itemChildren[itemList.isChildren]"
                  placeholder="无"
                  :disabled="itemList.disabled"></el-input>
                <el-input
                  class="modifyMain"
                  v-if="itemList.status === true && itemChildren[`${itemList.isChildren}Status`]== 1"
                  v-model="itemChildren[`${[itemList.isChildren]}Modify`]"
                  placeholder="无"
                  :disabled="itemList.disabled"></el-input>
              </div>
              <div class="TextMainIcon w3"
                   :class="itemChildren[`${itemList.isChildren}Status`] != 1 ? 'el-icon-success' : 'el-icon-error'"
                   v-if="itemChildren[`${itemList.isChildren}Status`] != 9 && itemList.type == 'inputArray'"></div>
            </div>
            <div
              v-if="itemList.status === true && itemChildren[`${itemList.isChildren}Status`] !== 9
              && !!itemChildren[`${itemList.isChildren}Url`]" class="w100Div mTop10 rowFlex flexWarp">
              <div v-for="itemUrl in  itemChildren[`${itemList.isChildren}Url`].split(',')" class="w33 maLeft">
                <img :src="`${AppConfig.appInfo.fastUrl}/${itemUrl}`" v-if="itemUrl!=''">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListMainCom',
  props: {
    dataListName: Array,
    item: Object
  }
}
</script>

<style scoped>
.marginb10{
  margin-bottom: 10px;
}
.w100Div{
  width: 97%;
}
.w3{
  width: 3%;
}
.w33{
  width: 32%;
}
img{
  width: 100%;
  height: 100%;
}
.mTop10{
  margin-top: 10px;
}
.maLeft{
  margin-right: 1%;
}
.dataListMain{
    width: 50%;
    margin-top: 10px;
}
.w100{
    width: 100%;
}
.nameMain{
    width: 30%;
    padding: 10px;
    box-sizing: border-box;
}
.TextMain{
    width: 68%;
}
</style>
