<template>
  <div class="ActivitiesAndRange">
    <div class="itemDiv">
      <h4 class="mr35">放射源</h4>
      <div>
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.isproduceDevice">生产</el-checkbox>
        <el-checkbox-group size="mini" :value="produceDeviceCategory">
          <el-checkbox-button :label="1">I类</el-checkbox-button>
          <el-checkbox-button :label="2">II类</el-checkbox-button>
          <el-checkbox-button :label="3">III类</el-checkbox-button>
          <el-checkbox-button :label="4">IV类</el-checkbox-button>
          <el-checkbox-button :label="5">V类</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div>
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.issaleDevice">销售</el-checkbox>
        <el-checkbox-group size="mini" :value="saleDeviceCategory">
          <el-checkbox-button :label="1">I类</el-checkbox-button>
          <el-checkbox-button :label="2">II类</el-checkbox-button>
          <el-checkbox-button :label="3">III类</el-checkbox-button>
          <el-checkbox-button :label="4">IV类</el-checkbox-button>
          <el-checkbox-button :label="5">V类</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div>
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.isuseDevice">使用</el-checkbox>
        <el-checkbox-group size="mini" :value="useDeviceCategory">
          <el-checkbox-button :label="1">I类</el-checkbox-button>
          <el-checkbox-button :label="2">II类</el-checkbox-button>
          <el-checkbox-button :label="3">III类</el-checkbox-button>
          <el-checkbox-button :label="4">IV类</el-checkbox-button>
          <el-checkbox-button :label="5">V类</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <div class="itemDiv">
      <h4 class="mr35">非密封放射性物质</h4>
      <div>
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.isunsealedMaterial">生产</el-checkbox>
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.issaleUnsealedMaterial">销售</el-checkbox>
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.isuseDevice">使用</el-checkbox>
      </div>
      <div style="transform: translateX(-41%)">
        <el-checkbox-group size="mini" :value="unsealedMaterialLevel">
          <el-checkbox-button :label="101">甲</el-checkbox-button>
          <el-checkbox-button :label="102">乙</el-checkbox-button>
          <el-checkbox-button :label="103">丙</el-checkbox-button>
          <el-checkbox-button :label="104">无</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <div class="itemDiv">
      <h4 class="mr35">射线装置</h4>
      <div>
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.isproduceInstallation">生产</el-checkbox>
        <el-checkbox-group size="mini" :value="produceInstallationCategory">
          <el-checkbox-button :label="2">II类</el-checkbox-button>
          <el-checkbox-button :label="3">III类</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div>
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.issaleInstallation">销售</el-checkbox>
        <el-checkbox-group size="mini" :value="saleInstallationCategory">
          <el-checkbox-button :label="2">II类</el-checkbox-button>
          <el-checkbox-button :label="3">III类</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div>
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.isuseInstallation">使用</el-checkbox>
        <el-checkbox-group size="mini" :value="useInstallationCategory">
          <el-checkbox-button :label="1">I类</el-checkbox-button>
          <el-checkbox-button :label="2">II类</el-checkbox-button>
          <el-checkbox-button :label="3">III类</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="transform: translateX(30%)">
        <el-checkbox :true-label="1" :false-label="0" class="mb10" :value="formData.isBuildInstallation">销售（含建造）</el-checkbox>
        <p style="margin-left: 22px">I类射线装置</p>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
  computed: {
    /** 放射源 **/
    // 生产的放射源设备类别
    produceDeviceCategory () {
      return this.formData.produceDeviceCategory ? this.formData.produceDeviceCategory.map(item => {
        return item.categoryCode
      }) : []
    },
    // 销售的放射源设备类别
    saleDeviceCategory () {
      return this.formData.saleDeviceCategory ? this.formData.saleDeviceCategory.map(item => {
        return item.categoryCode
      }) : []
    },
    // 使用的放射源设备类别
    useDeviceCategory () {
      return this.formData.useDeviceCategory ? this.formData.useDeviceCategory.map(item => {
        return item.categoryCode
      }) : []
    },

    /** 非密封放射性物质 **/
    // 生产非密封放射性物质装置工作场所等级
    unsealedMaterialLevel () {
      return this.formData.unsealedMaterialLevel ? this.formData.unsealedMaterialLevel.map(item => {
        return item.categoryCode
      }) : []
    },
    // 销售非密封放射性物质装置工作场所等级
    saleUnsealedMaterialLevel () {
      return this.formData.saleUnsealedMaterialLevel ? this.formData.saleUnsealedMaterialLevel.map(item => {
        return item.categoryCode
      }) : []
    },
    // 使用非密封放射性物质装置工作场所等级
    useUnsealedMaterialLevel () {
      return this.formData.useUnsealedMaterialLevel ? this.formData.useUnsealedMaterialLevel.map(item => {
        return item.categoryCode
      }) : []
    },

    /** 射线装置 **/
    // 生产的射线装置类别
    produceInstallationCategory () {
      return this.formData.produceInstallationCategory ? this.formData.produceInstallationCategory.map(item => {
        return item.categoryCode
      }) : []
    },
    // 销售的射线装置类别
    saleInstallationCategory () {
      return this.formData.saleInstallationCategory ? this.formData.saleInstallationCategory.map(item => {
        return item.categoryCode
      }) : []
    },
    // 使用的射线装置类别
    useInstallationCategory () {
      return this.formData.useInstallationCategory ? this.formData.useInstallationCategory.map(item => {
        return item.categoryCode
      }) : []
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }

}
</script>

<style scoped lang="less">
.ActivitiesAndRange {
  .mb10 {
    margin-bottom: 10px;
  }
  .mr35 {
    margin-right: 35px;
  }
  padding: 0 20px;
  background: #f4f6fa;
  > div {
    border-bottom: 1px solid #d7d7d7;
    padding-bottom: 10px;
    padding-top: 20px;
  }
  :last-child {
    border-bottom: none;
  }
  .itemDiv {
    display: flex;
    background: #f4f6fa;
    div {
      flex: 1;
    }
  }
}
/deep/ .el-checkbox-button .el-checkbox-button__inner {
  width: 64px;
  height: 25px;
  border-radius: 3px;
  color: #8a8a8a;
}
/deep/ .is-checked .el-checkbox-button__inner {
  color: #ffffff;
}
/deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner {
  background: #459bff;
}
/deep/ .el-checkbox-button.is-checked ::after {
  content: '';
  display: inline-block;
  width: 13px;
  height: 14px;
  background: url('~@/assets/images/nav/checked.png') no-repeat;
  position: absolute;
  right: -1px;
  bottom: 0;
}
// 多选框
/deep/ .el-checkbox {
  margin-right: 10px;
}
/deep/ .el-checkbox .el-form-item__content {
  line-height: 0%;
}
/deep/ .el-checkbox .el-form-item__content {
  height: 25px;
  margin-right: 10px;
}
/deep/ .el-checkbox-button {
  margin-right: 10px;
  margin-bottom: 10px;
}
/deep/ .el-checkbox .el-checkbox__inner,
/deep/ .is-focus .el-checkbox__inner {
  border-color: #8a8a8a;
}
/deep/ .el-checkbox-button.is-focus .el-checkbox-button__inner,
/deep/ .el-checkbox .is-focus .el-checkbox-button__inner {
  border-color: #d7d7d7;
}
/deep/ .el-checkbox-button__inner:hover {
  color: #8a8a8a;
}
/deep/ .is-checked .el-checkbox-button__inner:hover {
  color: #fff;
}
</style>