<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">射线装置分类</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">

      </div>
      <div class="Xratable heXratable">
         <el-table
         :data="tableData"
          border
          :span-method="objectSpanMethod"
         :header-cell-style="tableHeaderColor"
          style="width: 100%; font-size: 16px"
          height="100%"
          :cell-style="styleBack"
          ref="multipleTable">
             <el-table-column
        prop="category"
        label="装置类别"
        :formatter="formatValue"
        align="center"
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
<div style="border:0.3px #fff solid;background:#fff">
         <br>
      <div  style="font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;射线装置分类原则 </div>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据射线装置对人体健康和环境的潜在危害程度,从高到底将射线装置分为I类,II类,III类</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(一)I类射线装置:事故时短时间照射可以使受到照射的人员产生严重放射损伤,其安全与防护要求高;</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(二)II类射线装置：事故时可以使受到照射的人员产生比较严重放射损伤,其安全与防护要求较高;</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(三)III类射线装置：事故时一般不会使受到照射的人员产生放射损伤,其安全与防护要求相对简单。</p>
<div style="font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标注说明: </div>
 <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.血管造影用X射线装置包括用于心血管介入术，神经介入术等的X射线装置，以及含具备数字剪影 (DSA)血管造影功能的设备。</p>
 <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.医用X射线计算机断层扫描(CT)装置包括医学影像用CT机,放疗CT模拟定位机,核医学SPECT/CT和PET/CT等。</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.医用诊断X射线装置包括X射线摄影装置，床旁X射线摄影装置,X射线透视装置,移动X射线C臂机,手术用X射线机,X射线碎石机,乳腺X射线装置,胃肠X射线机,X射线骨密度等常见X射线诊断设备和开展非血管造影用X射线装置。</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.口腔(牙科)X射线装置包括口腔内X射线装置(牙片机),口腔外X射线装置(含全景机和口腔CT机)。</p>
 <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.工业用X射线探伤装置分为自屏蔽式X射线探伤装置和其他工业用X射线探伤装置,后者包括固定式X射线探伤系统,便携式X射线探伤机,移动式X射线探伤机装置和X射线照相仪等利用X射线照相仪等利用X射线进行无损探伤检测的装置。</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.对自屏蔽式X射线探伤装置的生产,销售活动按II类射线装置管理;使用活动按III类射线装置管理。</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7.对公共场所柜式X射线行李包检查装置的生产，销售活动按III类射线装置管理；对设备的用户单位实行豁免管理。</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8.对电子束焊机的生产,销售活动按III类射线装置管理;对其设备使用用户单位实行豁免管理。</p>
   <br>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/common/api/knowledgeBase/knowledgeBase/index.js'
export default {
  name: 'XRayDeviceClass',
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

          name: '王小虎',
          amount1: '621'

        }, {

          name: '王小虎',
          amount1: '324'

        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621'

        },
        {

          name: '王小虎',
          amount1: '324'

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
    this.getList()
  },

  methods: {
    // 规范化表的值
    formatValue (row, column, cellValue) {
      if (cellValue === 1) {
        cellValue = 'Ⅰ类射线装置'
      } else if (cellValue === 2) {
        cellValue = 'Ⅱ类射线装置'
      } else if (cellValue === 3) {
        cellValue = 'Ⅲ类射线装置'
      }
      return cellValue
    },
    styleBack ({ row, column, rowIndex, columnIndex }) {
      return 'font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;'
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;'
    },
    // 获取表列
    getList () {
      Api.getXrayDivisionList().then(res => {
        if (res.code === 0) {
          if (res.data && res.data.length > 0) {
            this.tableData = res.data[0].concat(res.data[1]).concat(res.data[2])
          }
        }
      })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 合并单元格
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
.el-table th {

    border-right: 1px solid grey!important;

}
.heXratable {
  margin-top: 2rem;
    width: 100%;
    height: calc(100% - 4px)!important;
    background: #FFFFFF;
    border-radius: 5px;
    border: 1px solid #DDDDDD;
}
.Xralayout-main {
        width: calc(100%);
        height: calc(100%);
        overflow-y:scroll;
        overflow-x:scroll
}
.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #EBEEF5!important;
}
</style>
