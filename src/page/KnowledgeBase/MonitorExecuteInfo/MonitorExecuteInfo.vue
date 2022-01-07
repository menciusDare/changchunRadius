<template>
  <div class="pageBox">
    <div class="pageName">监督执法信息</div>
    <div class="panelMain">
      <div class="topBox">
        <div class="name" >监督执法类型</div>
        <div class="tableBox">
          <el-table
            :data="tableDataExec"
            border
            :header-cell-style="tableHeaderColor"
            style="width: 100%; font-size: 16px"
            height="100%" :cell-style="styleBack" ref="multipleTable">
            <el-table-column
              prop="supervisionCode"
              label="序号"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="supervisionName"
              label="类型"
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="bottomBox">
        <div class="name" style="margin-top: 20px">执法处罚类型</div>
        <div class="tableBox">
          <el-table :data="tableDataEnforce" border
                    :header-cell-style="tableHeaderColor"
                    style="width: 100%; font-size: 16px"
                    height="100%" :cell-style="styleBack" ref="multipleTable">

            <el-table-column
              prop="enforcementCode"
              label="序号"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="enforcementName"
              label="类型"
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/common/api/knowledgeBase/knowledgeBase/index.js'
export default {
  name: 'MonitorExecuteInfo',
  data () {
    return {
      tableDataEnforce: [],
      tableDataExec: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234'

      }
      // {
      //   id: '非密封源分类 非密封源工作场所按放射性核素日等效量最大操作量分为甲乙丙三级，具体分级标准见《电离辐射防护与辐射源安全标准》(GB 18871-2002)。甲级非密封源工作场所的安全管理参照I类放射源 乙级和丙级非密封源工作场所的安全管理参照II,III类放射源。',
      //   name: '王小虎',
      //   amount1: '539'

      // }

      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      Api.getMonitorListKB().then(res => {
        if (res.code === 0) {
          this.tableDataEnforce = res.data.enforcementList
          this.tableDataExec = res.data.supervisionList
        }
      })
        .catch(err => {
          console.log('err', err)
        })
    },
    styleBack ({ row, column, rowIndex, columnIndex }) {
      return 'border-right:none;font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;'
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;'
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 3) {
        if (columnIndex === 0) {
          return [3, 3]
        } else if (columnIndex === 0) {
          return [0, 0]
        }
      }
    }
    // objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     if (rowIndex % 2 === 0) {
    //       return {
    //         rowspan: 2,
    //         colspan: 1
    //       }
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
.topBox{
  height: 45%;
}
.bottomBox{
  height: 55%;
}
.name{
  margin-bottom: 5px;
}
  .tableBox{
    height: calc(100% - 30px);
  }
</style>
