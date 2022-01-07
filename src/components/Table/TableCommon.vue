/**
 * @components TableCommon.vue
 * @desc table表格 和 分页
 * @params dataName 表头名称列表
 * @params dataName 表头名称列表
 * @params isHeBing 是否合并单元格
 * @params data table表格内容项得值 paginationShow
 * @params paginationShow 是否显示pagination组件
 * @params pagination {total: 总也数，pageCount：总页数，currentPage：当前页， pageSizes：每页展示  }
 * @引入组件 table组件 和 pagination组件
 * @name apple
 * @time 2021/9/2
 */
<template>
  <div class="tablePaginations">
    <div class="changeTableH" :style="{height: paginationShow == 'true' ? 'calc(100% - 40px)' : '100%'}">
      <el-table
        class="changeTable"
        :cell-style="setSellStyle"
        :data="data"
        height="100%"
        border
        :span-method="isHeBing ? objectSpanMethod : null"
        style="width: 100%">
        <table-colmun
          v-for="(item, index) in dataName"
          :key="`dataTable${index}`"
          :column="item">
        </table-colmun>
      </el-table>
    </div>
    <PaginationCom
        v-if="paginationShow != 'false'"
        :pagination="pagination"
        class="changePagination">
    </PaginationCom>
  </div>
</template>

<script>
import TableColmun from './table-colmun'
import {EventBus} from '@/common/eventbus'
import PaginationCom from '../CommonComponrnts/PaginationCom'
export default {
  name: 'TableCommon',
  components: {
    PaginationCom,
    TableColmun
  },
  props: {

    data: Array,
    dataName: Array,
    changeButton: Function,
    isHeBing: Boolean,
    paginationShow: {
      type: [String, Boolean],
      default: true
    },
    pagination: {
      type: Object
    },
    isHeight: String
  },
  data () {
    return {
      // tabledataNew: [],
      color: {
        'Ⅰ': 'rgba(90, 216, 166, 1)',
        'Ⅱ': 'rgba(255, 221, 38, 1)',
        'Ⅲ': '#FF8800',
        'Ⅳ': '#FF7C7C',
        'Ⅴ': '#FF0000',
        '劣Ⅴ': '#E02020'
      },
      zhexianParams: {
        xIsTrue: false,
        yIsTrue: false,
        color: ['#fff'],
        isAreaStyle: true,
        id: 'common',
        grid: {
          width: '90%',
          height: '100%',
          top: 0,
          left: 0
        },
        legend: false,
        position: 'right'
      },
      airColor: {
        '严重污染': 'rgba(182, 32, 224, .24)',
        '重度污染': 'rgba(224, 32, 32, .24)',
        '中度污染': 'rgba(247, 181, 0, .24)',
        '轻度污染': 'rgba(50, 197, 255, .24)',
        '优良': 'rgba(109, 212, 0, .24)'
      },
      xietongStatus: {
        '已超时': {
          color: 'rgba(224, 32, 32, 1)',
          border: 'rgba(224, 32, 32, 0.33)',
          back: 'rgba(224, 32, 32, 0.1)'
        },
        '已办结': {
          color: 'rgba(236, 178, 6, 1)',
          border: 'rgba(236, 178, 6, .33)',
          back: 'rgba(247, 181, 0, 0.1)'
        },
        '处理中': {
          color: 'rgba(82, 110, 228, 1)',
          border: 'rgba(82, 110, 228, .33)',
          back: 'rgba(59, 75, 237, 0.1)'
        },
        '已完成': {
          color: 'rgba(109, 212, 0, 1)',
          border: 'rgba(109, 212, 0, .33)',
          back: 'rgba(109, 212, 0, .1)'
        }
      },
      waterLevel: {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: '劣V'
      }
    }
  },

  // watch: {
  //   tabledata: {
  //     handler (newValue, oldValue) {
  //       for (let i = 0; i < newValue.length; i++) {
  //         if (oldValue[i] !== newValue[i]) {
  //           console.log('123', newValue)
  //         }
  //       }
  //     },
  //     deep: true
  //   }
  // },

  methods: {
    // 设置特殊的 table 模块的样式
    setSellStyle ({ row, column, rowIndex, columnIndex }) {
      if (row.typeName === '申请量') {
        // console.log(row, column, rowIndex, columnIndex)
      }
      if (column.property === 'jianceColor') { // 第三第四列的背景色就改变了2和3都是列数的下标
        let color = null
        if (row.jianceColor > 1) {
          color = '#ffbd00'
        } else {
          color = '#4b0903'
        }
        return `background: ${color}; color: #fff;`
      }
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.data.length === 0) {
          return {
            rowspan: this.data.length,
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
  },

  mounted () {
    EventBus.$on('changeButttonFun', (itemButton, row) => {
      console.log(itemButton, row)
      this.$emit('changeButton', (itemButton), (row))
    })
  },

  beforeDestroy () {
    EventBus.$off('changeButttonFun')
  }
}
</script>

<style scoped>
.indexCss{
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  width: 50px;
  height: 50px;
  font-size: 22px;
}
.indexCss.isBackground{
  background: #4164F5;
  color: #fff;
}
.mubiaoIcon{
  width: 15px;
  height: 15px;
  border-radius: 100%;
}
/*.jiantouIcon{*/
/*  width: 26px;*/
/*  height: 16px;*/
/*  background: url("../../assets/img/waterIcon/jiantou.png") no-repeat center;*/
/*  background-size: 100%;*/
/*}*/
.mRight10{
  margin-right:3px;
}
/*.mubiaoIcon.level1{*/
/*  */
/*}*/
</style>
<style>
.el-table__body-wrapper{
  overflow-y: auto!important;
}
.el-progress.el-progress--line{
  width: 100%;
}
.el-progress__text{
  color: #333;
  font-weight: 500;
  font-size: 25px!important;
}
.zhexianData{
  width: 41px;
  height: 38px;
}
.cuiban{
  margin-right: 10px;
  color: rgba(94, 126, 255, 1);
}
.chaobiao{
  background: rgba(224, 32, 32, 0.1);
  border-radius: 7px;
  border: 2px solid rgba(224, 32, 32, 0.33);
  width: 100%;
  height: 100%;
  text-align: center;
}
.tableIcon{
  width: 11px;
  height: 11px;
  margin-right: 5px;
}
/*.shangsheng .tableIcon{*/
/*    background: url("../../../assets/img/tableCommon/shansheng.png") no-repeat center;*/
/*    background-size: 80%;*/
/*}*/
/*.shangsheng>div{*/
/*    color: #00B600;*/
/*}*/
/*.xiajiang .tableIcon{*/
/*    background: url("../../../assets/img/tableCommon/xiajiang.png") no-repeat center;*/
/*    background-size: 80%;*/
/*}*/
.xiajiang>div{
  color: red;
}
.el-table.changeTable .cell{
  color: #333;
}
.el-table.changeTable th .cell{
  color: #1A1E28;
}
.el-table.changeTable thead.is-group th{
  background: #fafafa;
}
.tablePaginations{
  width: 100%;
  height: 100%;
}
.changeTableH{
  height: calc(100% - 40px);
}
.changePagination{
  height: 40px;
  margin-top: 20px;
  text-align: right;
}
/*.changeTableH.nopaginationShow{*/
/*  height: 100%;*/
/*}*/
.changeTable.el-table--border td,.changeTable.el-table--border th,.changeTable.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
  border-right: none;
}
.changeTable.el-table--border td .cell{
  color: #1A1E28;
}
</style>
