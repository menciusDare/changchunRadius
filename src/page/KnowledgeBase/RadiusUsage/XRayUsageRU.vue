
<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">射线装置用途</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">
      </div>
      <div class="Xratable heXratable">
         <el-table
         :data="tableData"
          :span-method="objectSpanMethod"
         border
         :header-cell-style="tableHeaderColor"
          style="width: 100%; font-size: 16px"
          height="100%" :cell-style="styleBack" ref="multipleTable">

     <el-table-column
        prop="category"
        label="装置类别"
         align="center"
        width="280"
        >
      </el-table-column>
      <el-table-column
        prop="medical"
        label="医用射线装置"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nonMedical"
        align="center"
        label="非医用射线装置">
      </el-table-column>
 </el-table>

      </div>
           <!-- <div class="pagination_bottom">
     <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageNumber"
                   :page-sizes="[10, 15, 20, 30]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :text-align='right'
                   :total="this.totalRow">
    </el-pagination>
     </div> -->
    </div>
  </div>
</template>

<script>
import Api from '@/common/api/knowledgeBase/knowledgeBase/index.js'
export default {
  name: 'XRayUsageRU',
  data () {
    return {
      tableData: [
        {
          id: 'I类射线装置',
          name: '王小虎',
          amount1: '234'

        }, {
          name: '王小虎',
          amount1: '324'
        }, {
          name: '王小虎',
          amount1: '621'

        },
        {
          id: 'II类射线装置',
          name: '王小虎',
          amount1: '234'

        }, {

          name: '王小虎',
          amount1: '324'

        }, {

          name: '王小虎',
          amount1: '621'

        },
        {

          name: '王小虎',
          amount1: '234'

        }, {

          name: '王小虎',
          amount1: '324'

        }, {

          name: '王小虎',
          amount1: '621'

        },
        {

          name: '王小虎',
          amount1: '234'

        }, {

          name: '王小虎',
          amount1: '324'

        }, {

          name: '王小虎',
          amount1: '621'

        },
        {
          id: 'II类射线装置',
          name: '王小虎',
          amount1: '234'

        }, {

          name: '王小虎',
          amount1: '324'

        }, {

          name: '王小虎',
          amount1: '621'

        },
        {

          name: '王小虎',
          amount1: '234'

        }, {

          name: '王小虎',
          amount1: '324'

        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621'

        }

      ]
    }
  },
  // {
  //   id: '非密封源分类 非密封源工作场所按放射性核素日等效量最大操作量分为甲乙丙三级，具体分级标准见《电离辐射防护与辐射源安全标准》(GB 18871-2002)。甲级非密封源工作场所的安全管理参照I类放射源 乙级和丙级非密封源工作场所的安全管理参照II,III类放射源。',
  //   name: '王小虎',
  //   amount1: '539'

  // }
  created () {
    this.getList()
  },
  methods: {
    getList () {
      Api.getXRayListKB().then(res => {
        if (res.code === 0) {
          //
          // let result = this.fomatData(res.data)
          this.tableData = res.data
          // this.pageNumber = res.data.current// 当前页
          // this.pageSize = res.data.pages // 每页大小
          // this.totalRow = res.data.total // 总条数
          // this.totalPage = res.data.pages // 总页数
          // console.log('hhhhh', result)
        }
        // this.updatedKey = !this.updatedKey
      })
        .catch(err => {
          console.log('err', err)
        })
    },
    // fomatData (param) {
    //   let para = param
    //   let finalArr = []
    //   for (let k = 0; k < 3; k++) {
    //     let curObj = {}
    //     let curArrA = []
    //     let lenA = para[k].medicalList.length
    //     let lenB = para[k].nonMedicalList.length
    //     let lenFinal = lenA > lenB ? lenA : lenB
    //     for (let i = 0; i < lenFinal; i++) {
    //       if (para[k].medicalList[i] !== undefined) {
    //         curObj.medical = para[k].medicalList[i]
    //       } else {
    //         curObj.medical = ''
    //       }
    //       if (para[k].nonMedicalList[i] !== undefined) {
    //         curObj.nonMedical = para[k].nonMedicalList[i]
    //       } else {
    //         curObj.nonMedical = ''
    //       }
    //       curArrA.push(curObj)
    //     }
    //     curArrA[0].category = para[k].category
    //     finalArr.push(curArrA)
    //   }
    //   return finalArr[0].concat(finalArr[1]).concat(finalArr[2])
    // },
    styleBack ({ row, column, rowIndex, columnIndex }) {
      return 'font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;'
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;'
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex === 3) {
          return {
            rowspan: 9,
            colspan: 1
          }
        } else if (rowIndex === 12) {
          return {
            rowspan: 10,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
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
    width: 100%;
    height: calc(100% - 64px)!important;
    background: #FFFFFF;
    border-radius: 5px;
    border: 1px solid #DDDDDD;
}
</style>
