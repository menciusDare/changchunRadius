
<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">非密封放射性物质工作场所分级</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">

      </div>
      <div class="Xratable heXratable">
         <el-table :data="tableData" border
         :header-cell-style="tableHeaderColor"
          style="width: 100%; font-size: 16px"
          height="60%" :cell-style="styleBack" ref="multipleTable">
                  <el-table-column
        type="index"
        label=" 序号"
         align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="level"
        label="级别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="value"
        header-align="center"
         align="left"
        label="日等效最大操作量/Bq">
      </el-table-column>

 </el-table>
    <div class="ClassificationInfo">
         <br>
      <div  style="font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;非密封源分类 </div>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;非密封源工作场所按放射性核素日等效量最大操作量分为甲乙丙三级，具体分级标准见《电离辐射防护与辐射源安全标准》(GB 18871-2002)。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;甲级非密封源工作场所的安全管理参照I类放射源</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙级和丙级非密封源工作场所的安全管理参照II,III类放射源。</p>
    <br>
    </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '@/common/api/knowledgeBase/knowledgeBase/index.js'
export default {
  name: 'NonBlockWorkClass',
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234'

      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621'

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
    this.gettableList()
  },
  mounted () {

  },
  methods: {

    gettableList () {
      Api.getNonBlockWorkList().then(res => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            // let frontArr = res.data.splice(0, 16)

            // let backArr = res.data

            // frontArr.forEach((item, index) => {
            //   item.id = item.start + '-' + item.end
            //   backArr.forEach((e, idx) => {
            //     if (index === idx) {
            //       item.code = e.start + '-' + e.end
            //       item.region = e.regionName
            //     }
            //   })
            // })
            this.tableData = res.data
            console.log('hhhhh', this.tableData)
          }
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
@import "../../../assets/Xraydevice/index.css";
.jupm_atag{
  color: blue;
  cursor: pointer;
}
.heXratable {
  margin-top: 2rem;
    width: 100%;
    height: calc(100% - 280px)!important;
    background: #FFFFFF;
    border-radius: 5px;
    /* border: 1px solid #DDDDDD; */
}
.Xratable {
  border:none;
}
.ClassificationInfo{
  margin-top: 80px;
  border: 1px solid #EBEEF5;
  border-radius: 4px;
}
</style>
