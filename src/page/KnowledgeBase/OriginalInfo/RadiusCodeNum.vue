<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">放射源编码序列编号分配</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">

      </div>
      <div class="Xratable heXratable">
         <el-table :data="tabledata" border
         :header-cell-style="tableHeaderColor"
          style="width: 100%; font-size: 16px"
          height="100%" :cell-style="styleBack" ref="multipleTable">
                <el-table-column
        prop="id"
        label="区段"

        align="center">
      </el-table-column>
      <el-table-column
        prop="regionName"
        label="省,自治区,直辖市"

        align="center">
      </el-table-column>
      <el-table-column
        prop="code"
        label="区段"

        align="center">
      </el-table-column>
        <el-table-column
        prop="region"
        label="省,自治区,直辖市"

        align="center">
      </el-table-column>

 </el-table>

      </div>
    </div>
  </div>
</template>

<script>

import Api from '@/common/api/knowledgeBase/knowledgeBase/index.js'

export default {
  components: {},
  name: 'RadiusCodeNum',
  data () {
    return {

      /* 表格数据 */
      tabledata: [],
      /* 表格表头配置 */
      pagination: {
        current: 1,
        total: 10,
        size: 10
      }
    }
  },

  watch: {
    // tabledata: {
    //   immediate: true,
    //   handler (newValue, oldValue) {
    //     for (let i = 0; i < newValue.length; i++) {
    //       if (oldValue[i] !== newValue[i]) {
    //         console.log('1234', newValue)
    //       }
    //     }
    //   },
    //   deep: true
    // }
  },
  created () {
    this.getList()
  },
  mounted () {

  },
  methods: {

    getList () {
      Api.getRadiusCodeNumList().then(res => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            let frontArr = res.data.splice(0, 16)
            let backArr = res.data
            frontArr.forEach((item, index) => {
              item.id = item.start + '-' + item.end
              backArr.forEach((e, idx) => {
                if (index === idx) {
                  item.code = e.start + '-' + e.end
                  item.region = e.regionName
                }
              })
            })
            this.tabledata = frontArr
            console.log('hhhhh', this.tabledata)
          }
        }
      })
        .catch(err => {
          console.log('err', err)
        })
    },
    init () {

    },
    onSearch () {
      this.pagination.current = 1
      this.init()
    },
    Export () {

    },
    styleBack ({ row, column, rowIndex, columnIndex }) {
      return 'border-right:none;font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;'
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;'
    },

    changeTableButton (item, data) {
      if (item.itemButton.id === 'chakan') {

      }
    }

  }
}
</script>

<style scoped>
@import "../../../assets/Xraydevice/index.css";
.jupm_atag{
  color: blue;
  cursor: pointer;
}
.heXratable {
  margin-top: 2rem;
    width: 100%;
    height: calc(100% - 64px)!important;
    background: #FFFFFF;
    border-radius: 5px;
    border: 1px solid #DDDDDD;
}
</style>
