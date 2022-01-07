<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">非密封放射性物质用途</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xrasearch-wrap">
      </div>
      <div class="Xratable heXratable">
         <el-table :data="tableData" border
         :header-cell-style="tableHeaderColor"
          style="width: 100%; font-size: 16px"
          height="100%" :cell-style="styleBack" ref="multipleTable">

       <el-table-column
      label="序号"
      width="80"
     align="center"
      prop="pkId">

    </el-table-column>
    <el-table-column
      label="类型"
       align="center"
      prop="name">
    </el-table-column>
        <el-table-column
      label="备注"
       align="center"
      prop="comment">
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

// import downloadFile from 'ommon/downFile'
export default {
  components: {},
  name: 'NonBlockMaterialUasge',
  data () {
    return {
      updatedKey: true,
      search: '',
      pageNumber: 1, // 当前页
      pageSize: 10, // 每页大小
      totalRow: 0, // 总条数
      totalPage: 0, // 总页数
      input: '',
      /* 表格数据 */
      tableData: [],
      /* 表格表头配置 */
      tableDataName: [
        {label: '序号', type: 'index', width: '200', isCenter: true},
        {label: '用途编码', type: 'normal', width: 'auto', prop: 'code', isCenter: true},
        {label: '用途名称', type: 'normal', prop: 'name', width: 'auto', isCenter: true}
        // {label: '省,自治区,直辖市', type: 'normal', prop: 'region', width: '270', isCenter: true}
        // // {
        //   label: '操作',
        //   type: 'button',
        //   width: '150',
        //   buttonList: [
        //     {name: '查看', id: 'chakan', status: '0'}
        //   ]
        // }
      ]
      // pagination: {
      //   current: 1,
      //   total: 10,
      //   size: 10
      // }
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    // this.getRegionList()

  },
  methods: {
  // 分页点击方法
    // handleSizeChange (val) {
    //   // console.log(`每页 ${val} 条`);
    //   this.pageSize = val
    //   let params = {
    //     current: this.pageNumber,
    //     size: this.pageSize
    //   }
    //   this.findAll(params)
    // },
    // handleCurrentChange (val) {
    //   // console.log(`当前页: ${val}`);
    //   this.pageNumber = val
    //   let params = {
    //     current: this.pageNumber,
    //     size: this.pageSize
    //   }
    //   this.findAll(params)
    // },
    // 分页方法
    // findAll (params) {
    //   // 获取数据接口（调用封装的接口）
    //   this.getList(params)
    // },
    getList (params) {
      Api.getNonUsgaeListKB(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.records
          // this.pageNumber = res.data.current// 当前页
          // this.pageSize = res.data.pages // 每页大小
          this.totalRow = res.data.total // 总条数
          this.totalPage = res.data.pages // 总页数
          console.log('hhhhh', res.data.records)
        }
        // this.updatedKey = !this.updatedKey
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
    // /* 获取区域代码 */
    // getRegionList () {
    //   this.optionList.getRegionList = []
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
    width: 100%;
    height: calc(100% - 219px)!important;
    background: #FFFFFF;
    border-radius: 5px;
    border: 1px solid #DDDDDD;
}
</style>
