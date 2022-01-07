<template>
  <div>
    <el-form :model="searchForm" :inline="true" class="myForm">
      <template v-for="item in searchOpts">
        <el-form-item
          :key="item.label"
          :label="item.label"
          :prop="item.prop"
          v-if="item.type == 'select'"
        >
          <el-select
            :placeholder="item.placeholder"
            filterable
            clearable
            v-model="searchForm[item.prop]"
            :disabled="item.isDisabled ? item.isDisabled : false"
          >
            <el-option
              v-for="item2 in optionList[item.optsData]"
              :key="item2[item.aliasValue]"
              :label="item2[item.aliasLabel]"
              :value="item2[item.aliasValue]"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :key="item.label" :label="item.label"
                      v-if="item.type==='selectmultiple'">
          <el-select
              :placeholder="item.placeholder"
              :style="item.width"
              multiple
              collapse-tags
              v-model="searchForm[item.prop]"
              :disabled="item.isDisabled ? item.isDisabled : false"
          >
            <el-option
              v-for="item2 in optionList[item.optsData]"
              :key="item2[item.aliasValue]"
              :label="item2[item.aliasLabel]"
              :value="item2[item.aliasValue]"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :key="item.label" :label="item.label"
                      v-if="item.type==='input'">
          <el-input
              :placeholder="item.placeholder"
              clearable
              v-model="searchForm[item.prop]"
              :disabled="item.isDisabled ? item.isDisabled : false"
          >
          </el-input>
        </el-form-item>
        <el-form-item :key="item.label" :label="item.label"
                                       v-if="item.type==='daterange'">
        <el-date-picker
          :format="item.format"
          value-format="yyyy-MM-dd"
          end-placeholder="结束日期"
          start-placeholder="开始日期"
          type="daterange"
          v-model="searchForm[item.prop]"
          :disabled="item.isDisabled ? item.isDisabled : false"
        >
        </el-date-picker>
      </el-form-item>
        <el-form-item :key="item.label" :label="item.label"
                      v-if="item.type==='dateYear'">
          <el-date-picker
            :format="item.format"
            value-format="yyyy"
            type="year"
            v-model="searchForm[item.prop]"
            :disabled="item.isDisabled ? item.isDisabled : false"
          >
          </el-date-picker>
        </el-form-item>
      </template>
      <el-button @click="handleSearch" type="primary">查询</el-button>
      <el-button v-if="isShowDownloadBtn" @click="derivation" >导出</el-button>
    </el-form>
  </div>
</template>
<script>
import time, {C_TIME} from '@/common/utils'
export default {
  name: 'SearchCom',
  props: {
    searchOpts: {
      type: Array,
      default: function () {
        return []
      }
    },
    isShowDownloadBtn: {
      type: Boolean,
      default: true
    },
    optionList: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      searchForm: {}
    }
  },
  mounted () {
    this.initSearchForm()
  },
  methods: {
    // 设置searchForm表单默认值
    initSearchForm () {
      this.searchOpts.forEach((item) => {
        if (item.type === 'daterange') {
          this.$set(this.searchForm, item.prop, ['', ''])
        } else if (item.type === 'selectmultiple') {
          this.$set(this.searchForm, item.prop, [])
        } else {
          this.$set(this.searchForm, item.prop, '')
        }
        if (item.type === 'dateYear') {
          this.initTime(item, item.type)
        }
      })
      this.handleSearch()
    },
    initTime: function (item, type) {
      if (type === 'dateYear') {
        this.searchForm[item.prop] = time.timeFmt(new Date(), C_TIME.Y)
      }
    },
    handleSearch () {
      this.$emit('on-search', this.searchForm)
    },
    derivation () {
      this.$emit('on-export', this.searchForm)
    }
  }
}
</script>
<style>
</style>
