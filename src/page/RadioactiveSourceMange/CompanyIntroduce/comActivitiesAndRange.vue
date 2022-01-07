<template>
  <div class="panelBox">
    <i class="el-icon-caret-top iconCaretTop"></i>
    <div class="flex1 row" v-show="isDevice" id="isDevice">
      <h4 class="typeName">放射源：</h4>
      <div class="flex1">
        <div class="flex1 mr40">
          <div class="title">生产：</div>
          <div class="">
            <el-checkbox-group v-model="value.Device.production" @change="checkboxChange">
              <el-checkbox v-for="item in optionAll.Device.production" :label="item.code" :key="item.code">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex1 mr40">
          <div class="title">销售：</div>
          <el-checkbox-group v-model="value.Device.sale" @change="checkboxChange">
            <el-checkbox v-for="item in optionAll.Device.sale" :label="item.code" :key="item.code">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="flex1">
          <div class="title">使用：</div>
          <el-checkbox-group v-model="value.Device.use" @change="checkboxChange">
            <el-checkbox v-for="item in optionAll.Device.use" :label="item.code" :key="item.code">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>

    <div class="flex1 row" v-show="isMaterial" id="isMaterial">
      <h4 class="typeName">非密封放射性物质：</h4>
      <div class="flex1">
        <div class="flex1 mr40">
          <div class="title">生产：</div>
          <el-checkbox-group v-model="value.Material.production" @change="checkboxChange">
            <el-checkbox v-for="item in optionAll.Material.production" :label="item.code" :key="item.code">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="flex1 mr40">
          <div class="title">销售：</div>
          <el-checkbox-group v-model="value.Material.sale" @change="checkboxChange">
            <el-checkbox v-for="item in optionAll.Material.sale" :label="item.code" :key="item.code">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="flex1">
          <div class="title">使用：</div>
          <el-checkbox-group v-model="value.Material.use" @change="checkboxChange">
            <el-checkbox v-for="item in optionAll.Material.use" :label="item.code" :key="item.code">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>

    <div class="flex1 row" v-show="isInstallation" id="isInstallation">
      <h4 class="typeName">射线装置：</h4>
      <div class="flex1">
        <div class="flex1">
          <el-checkbox v-model="value.Installation.isBuildInstallation" @change="checkboxChange">销售（含建造） I类射线装置</el-checkbox>
        </div>
        <div class="flex1">
          <div class="title">生产：</div>
          <el-checkbox-group v-model="value.Installation.production" @change="checkboxChange">
            <el-checkbox v-for="item in optionAll.Installation.production" :label="item.code" :key="item.code">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="flex1">
          <div class="title">销售：</div>
          <el-checkbox-group v-model="value.Installation.sale" @change="checkboxChange">
            <el-checkbox v-for="item in optionAll.Installation.sale" :label="item.code" :key="item.code">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="flex1">
          <div class="title">使用：</div>
          <el-checkbox-group v-model="value.Installation.use" @change="checkboxChange">
            <el-checkbox v-for="item in optionAll.Installation.use" :label="item.code" :key="item.code">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comActivitiesAndRange',
  props: {
    value: {
      type: Object,
      default () {
        return {
          Device: {
            production: [],
            use: [],
            sale: []
          },
          Material: {
            production: [],
            use: [],
            sale: []
          },
          Installation: {
            isBuildInstallation: false,
            production: [],
            use: [],
            sale: []
          }
        }
      }
    },
    // 活动种类和范围的选项
    optionAll: {
      Device: {
        production: [],
        use: [],
        sale: []
      },
      Material: {
        production: [],
        use: [],
        sale: []
      },
      Installation: {
        isconstruction: false,
        production: [],
        use: [],
        sale: []
      }
    },
    // 是否使用放射源设备
    isDevice: {
      type: Boolean,
      default: false
    },
    // 是否使用非密封放射性物质
    isMaterial: {
      type: Boolean,
      default: false
    },
    // 是否使用射线装置
    isInstallation: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    var div = document.querySelector('#activitiesAndRange .el-form-item__label')
    document.querySelector('.iconCaretTop').style.right = screen.width - div.offsetLeft - div.offsetWidth + 'px'
  },
  data () {
    return {

    }
  },
  methods: {
    checkboxChange (val) {
      // console.log('val', val);
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped lang='less'>
.panelBox {
  background: #f4f6fa;
  font-size: 14px;
  position: relative;
  border-top: 1px solid #ccd2df;
  margin-top: -10px;
}
.iconCaretTop {
  position: absolute;
  top: -10px;
  // left: 34px;
  width: 12px;
  height: 12px;
  color: #a5b2cb;
}
.w100 {
  width: 100%;
}
.mr40 {
  margin-right: 40px;
}
.panelBox > .row {
  border-top: 1px solid #ccd2df;
}
.typeName {
  width: 146px;
  padding-left: 14px;
  margin-right: 13px;
  color: #333333;
  line-height: 50px;
  background: rgba(177, 184, 201, 0.2);
}
.title {
  font-weight: bold;
  color: #459bff;
  line-height: 50px;
  margin-right: 20px;
}
/deep/ .el-checkbox {
  margin-right: 20px;
  line-height: 50px;
}
/deep/ .el-form-item__content {
  line-height: 50px;
}
</style>
