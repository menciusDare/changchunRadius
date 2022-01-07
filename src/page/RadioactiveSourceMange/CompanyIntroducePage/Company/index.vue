<template>
  <div class="pageBox">
    <div class="title">{{ formData.unitName }}</div>
    <div class="central">
      <el-form label-width="100px" label-suffix="：" class="myForm">
        <el-form-item label="注册地址">
          <div class="itemDiv">
            <div>
              <p class="mb5 color8A8A8A">注册地行政区划分：</p>
              <p>{{ formData.registProvinceName }} {{ formData.registTownName }} {{ formData.registPrefectureName }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">地址：</p>
              <p>{{ formData.registAddress }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">经度：</p>
              <p>东经 {{ formData.registLongitude }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">纬度：</p>
              <p>北纬 {{ formData.registLatitude }}</p>
            </div>
            <!-- <div class="flex2">
              <p class="mb5 color8A8A8A">地址：</p>
              <p>长春市南关区亚泰大街西，南湖大路南万盛小区2号楼808室</p>
            </div> -->
          </div>
        </el-form-item>
        <el-form-item label="联系方式">
          <div class="itemDiv">
            <div>
              <p class="mb5 color8A8A8A">联系人：</p>
              <p>{{ formData.postalContactsName }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">电话：</p>
              <p>{{ formData.postalContactsPhone }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">邮编：</p>
              <p>{{ formData.postalPostCode }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">通讯地址：</p>
              <p>{{ formData.postalAddress }}</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="法定代表人">
          <div class="itemDiv">
            <div>
              <p class="mb5 color8A8A8A">姓名：</p>
              <p>{{ formData.legalPersonName }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">电话：</p>
              <p>{{ formData.legalPersonPhone }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">证件类型：</p>
              <p>{{ formData.legalPersonTypeName }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">证件号：</p>
              <p>{{ formData.legalPersonNumber }}</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="单位性质">
          <div class="itemDiv">
            <div>
              <p class="mb5 color8A8A8A">性质：</p>
              <p>{{ formData.unitPropertyName }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">行业类别：</p>
              <p>{{ formData.industryCategoryName }}</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="单位代码">
          <!-- <div class="itemDiv">统一社会信用代码 91220102066</div> -->
          <div class="itemDiv">{{ formData.unitCodeTypeName }} {{ formData.unitCode }}</div>
        </el-form-item>

        <el-form-item label="涉源部门">
          <el-table :data="formData.departments" style="width: 100%">
            <el-table-column type="index" label="序号" width="150"> </el-table-column>
            <el-table-column prop="name" label="部门名称"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column prop="person" label="负责人"> </el-table-column>
            <el-table-column prop="workplaceAddress" label="工作场所"> </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="种类和范围">
          <comActivitiesAndRange :formData="formData" />
        </el-form-item>
        <el-form-item label="附件">
          <el-table :data="formData.attachments" style="width: 100%">
            <el-table-column type="index" label="序号" width="150"> </el-table-column>
            <el-table-column prop="typeName" label="附件类型" width="800"> </el-table-column>
            <el-table-column label="附件名称" prop="fileName" width="150">
              <!-- <template slot-scope="scope">
                <span>{{ scope.row.fileName }}</span>
                <el-button @click="handlePreview(scope.row)" type="text" size="small">预览</el-button>
              </template> -->
            </el-table-column>
            <el-table-column label="">
              <template slot-scope="scope">
                <el-button @click="handlePreview(scope.row)" type="text" size="small">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="许可证信息">
          <div class="childernW20">
            <div>
              <p class="mb5 color8A8A8A">单位类型：</p>
              <p>{{ formData.unitTypeName }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">单位状态：</p>
              <p>{{ formData.unitStateName }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">发证机关：</p>
              <p>{{ formData.licenseAuthorityName }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">审批机关：</p>
              <p>{{ formData.licenseApproveOffice }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">证书编号：</p>
              <p>{{ formData.licenseNum }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">发证日期：</p>
              <p>{{ formData.licenseIssuingtime }}</p>
            </div>
            <div>
              <p class="mb5 color8A8A8A">有效期：</p>
              <p>{{ formData.licenseValidity }}</p>
            </div>
            <div style="flex: 3">
              <p class="mb5 color8A8A8A">许可证条件：</p>
              <p>{{ formData.licenseCondition }}</p>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Auth from '../../../../common/api/RadioactiveSourceMange/companyIntroduce'
import comActivitiesAndRange from './comActivitiesAndRange.vue'
import downFile from '@/common/downFile.js'

export default {
  name: 'Company',
  components: {
    comActivitiesAndRange
  },
  props: {
    id: [String, Number]
  },
  created () {
    this.unitId = this.$route.query.id || this.id
    this.queryDetail()
  },
  data () {
    return {
      formData: {},
      unitId: null,
    }
  },
  mounted () {
  },
  methods: {
    queryDetail () {
      Auth.detailApi({ unitId: this.unitId }).then(res => {
        if (res.code === 0) {
          this.formData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
        .catch(err => {
          this.$message.error(err.msg)
        })
    },
    handlePreview (row) {
      console.log('row', row);

      const index = row.downloadAddress.lastIndexOf(".");
      if (row.downloadAddress.substr(index + 1) === 'pdf') {
        // window.open('/static/js/pdf/web/viewer.html? file = "demo.pdf"') // encodeURIComponent()
        window.open(`/static/js/pdf/web/viewer.html? file = http://10.0.200.138:8000${row.downloadAddress}`)
      } else if (['jpeg', 'png', 'jpg'].indexOf(row.downloadAddress.substr(index + 1)) > 0) {
        window.open('http://10.0.200.138:8000/' + row.downloadAddress)
      } else {
        // downFile.downloadFile('http://10.0.200.138:8000/' + row.downloadAddress)
        window.open('http://10.0.200.138:8000/' + row.downloadAddress)
      }
    },
  }
}
</script>

<style scoped lang="less">
p {
  margin: 0;
  padding: 0;
  line-height: 20px;
}
.mb5 {
  margin-bottom: 5px;
}
.mb10 {
  margin-bottom: 10px;
}
.mr35 {
  margin-right: 35px;
}
.color8A8A8A {
  color: #8a8a8a;
}
.pageBox {
  margin-top: 20px;
  overflow: auto;
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  line-height: 31px;
  margin-bottom: 30px;
}

.itemDiv {
  display: flex;
  background: #f4f6fa;
  padding: 10px;
  div {
    flex: 1;
  }
}
.flex2 {
  flex: 2 !important;
}
.flex3 {
  flex: 3 !important;
}
.childernW20 {
  display: flex;
  flex-wrap: wrap;
  background: #f4f6fa;
  padding: 10px;
  div {
    width: 20%;
    margin-bottom: 15px;
  }
}
.myForm .el-button {
  margin-bottom: 0;
}
/deep/ .el-table {
  border: 1px solid #dddddd;
}
/deep/ .el-table td.el-table__cell {
  border-bottom: 1px solid #dddddd;
}
/deep/ .el-table th.gutter {
  display: table-cell !important;
}
/deep/ .el-table__header tr,
/deep/ .el-table__header th {
  padding: 0;
  height: 40px;
  color: #333333;
}
/deep/ .el-table__body tr,
/deep/ .el-table__body td {
  padding: 0;
  color: #333333;
  height: 40px;
}
// 表单
/deep/ .el-form-item__label {
  color: #1a1e28;
}
/deep/ .el-form-item__content {
  line-height: inherit;
}
</style>
