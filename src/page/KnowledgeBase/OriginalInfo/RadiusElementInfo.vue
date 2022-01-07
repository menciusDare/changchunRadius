<template>
  <div class="Xraydevice">
    <div class="Xrabreadcrumb">
      <span class="">放射源核素信息</span>
    </div>
    <div class="Xralayout-main">
      <div class="Xraindex-wrap">
        <div class="indexsearch clearfix">
          <p class="indexsearchtitle">点击索引根据核素名称的首字母快速查找：</p>
          <p
            v-for="item in categoryOptions"
            class="indexsearcletter"
            @click="changindexsearcletter(item.value)"
            :class="item.value == rangeCode ? 'btm-activex' : ''"
          >
            {{ item.label }}
          </p>
        </div>
      </div>
      <div class="Xratable">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          empty-text="暂无数据"
          fit
          style="width: 100%; font-size: 16px"
          height="100%"
          :header-cell-style="tableHeaderColor"
          :cell-style="styleBack"
          :row-class-name="TableRowClassName"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            :index="getIndex"
            width="60px"
          >
          </el-table-column>
          <el-table-column prop="nuclideName" label="核素名称">
          </el-table-column>
          <el-table-column prop="chineseName" label="中文名称">
          </el-table-column>
          <el-table-column prop="halfTime" label="半衰期"> </el-table-column>
          <el-table-column prop="dateUnit" label="单位"> </el-table-column>
          <el-table-column prop="shorthand" label="简写"> </el-table-column>
          <el-table-column prop="one" label="Ⅰ类源"> </el-table-column>
          <el-table-column prop="two" label="Ⅱ类源"> </el-table-column>
          <el-table-column prop="three" label="Ⅲ类源"> </el-table-column>
          <el-table-column prop="four" label="Ⅳ类源"> </el-table-column>
          <el-table-column prop="five" label="Ⅴ类源"> </el-table-column>
          <el-table-column prop="decayCycle" label="衰变周期" :formatter="formatDate">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrap">
        <pagination
          ref="paginationObj"
          @handleCurrentChange="handleCurrentChange"
          @paginationFunction="paginationFunction"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "../../AnalysisHtml/compoents/Pagination.vue";
import Api from '@/common/api/knowledgeBase/knowledgeBase/index.js'
export default {
  name: "RadiusElementInfo",
  components: {
    pagination,
  },
  data() {
    return {
      searchForm: {
        region: "",
        issuingauthority: "",
        category: "",
        time: "",
      },
      rangeCode: "",
      regionOptions: [],
      issuingauthorityOptions: [],
      categoryOptions: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "A",
          value: "A",
        },
        {
          label: "B",
          value: "B",
        },
        {
          label: "C",
          value: "C",
        },
        {
          label: "D",
          value: "D",
        },
        {
          label: "E",
          value: "E",
        },
        {
          label: "F",
          value: "F",
        },
        {
          label: "G",
          value: "G",
        },
        {
          label: "H",
          value: "H",
        },
        {
          label: "I",
          value: "I",
        },
        {
          label: "J",
          value: "J",
        },
        {
          label: "K",
          value: "K",
        },
        {
          label: "L",
          value: "L",
        },
        {
          label: "M",
          value: "M",
        },
        {
          label: "N",
          value: "N",
        },
        {
          label: "O",
          value: "O",
        },
        {
          label: "P",
          value: "P",
        },
        {
          label: "Q",
          value: "Q",
        },
        {
          label: "R",
          value: "R",
        },
        {
          label: "S",
          value: "S",
        },
        {
          label: "T",
          value: "T",
        },
        {
          label: "U",
          value: "U",
        },
        {
          label: "V",
          value: "V",
        },
        {
          label: "W",
          value: "W",
        },
        {
          label: "X",
          value: "X",
        },
        {
          label: "Y",
          value: "Y",
        },
        {
          label: "Z",
          value: "Z",
        },
      ],
      tableData: [],
    };
  },
  methods: {
     formatDate(row, column) {
       // 获取单元格数据
       let data = row[column.property]
       if (data ==null) {
           return '--'
       }else{
         return data;
       }},
    //获取表格数据
    gettablelist(code) {
      
      if (code == undefined) {
        code = "";
      }
       var _this = this;
      var params = {
        firstLetter: code,
        pageNum: _this.$refs.paginationObj.cur_page,
        pageSize: _this.$refs.paginationObj.cur_pageSize,
      };
      Api.getRadionuclide(params).then(res => {
       if (res.code === 0) {
           _this.tableData = res.data.list;
          console.log(res.data, "this.tableData");
          _this.$refs.paginationObj.count = res.data.totalCount;
       }
      })
        .catch(err => {
          console.log('err', err)
        })
        
    },
    changindexsearcletter(code) {
      this.rangeCode = code;
      this.gettablelist(code);
    },
    jumpunsealedradioactive() {
      this.$router.push({
        path: "/homeHtml/AnalysisHtml/unsealedradioactivejump",
        query: { userId: 1 },
      });
    },
    init() {
      this.$refs.paginationObj.count = 10;
    },
    TableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "statistics-warning-row";
      } else {
        return "";
      }
    },
    styleBack({ row, column, rowIndex, columnIndex }) {
      return "border-right:none;font-size: 14px;font-family: MicrosoftYaHei;color: #1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1px solid #DDDDDD;";
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background:none;color: #333333;font-weight: 500;border:none;font-size: 14px;font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;font-weight:bold;text-align:center;border-bottom: 1px solid #DDDDDD;background: #FFFFFF;border-right:none;border-top:none;";
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "th";
      }
      return "";
    },
    handleCurrentChange() {
      var code=this.rangeCode;
      this.gettablelist(code);
    },
    paginationFunction() {
    var code=this.rangeCode;
      this.gettablelist(code);
    },
    getIndex(index, value) {
      let curPage = this.$refs.paginationObj.cur_page;
      let limitPage = this.$refs.paginationObj.cur_pageSize;
      console.log(curPage, "curPage");
      console.log(limitPage, "limitPage");
      return index + 1 + (curPage - 1) * limitPage;
    },
  },
  mounted() {
    this.gettablelist();
  },
};
</script>

<style scoped>
@import "../../../assets/Xraydevice/index.css";
</style>
    