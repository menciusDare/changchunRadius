<template>
  <div class="pageBox">
    <div class="pageName">监控位置管理</div>
    <div class="panelMain">
      <el-form :inline="true" class="myForm">
        <el-form-item label="监控位置名称：" >
          <el-input v-model="name" placeholder="请输入监控位置名称"></el-input>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" @click="queryByParam()">查询</el-button>
            <el-button  icon="el-icon-plus" class="btn-add" @click="openView('')">添加</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="tableCommonHeight">
        <SelfTable
            :tableData="tableData"
            :headerData="headerData"
            :btnList="btnList"
            @onBtnClick="onBtnClick"
            @cellClick="cellClick"
            :total.sync="total"
            :getIndex="getIndex"
            :pageSize.sync="pageSize"
            :pageSizes="pageSizes"
            :currentPage.sync="currentPage"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        ></SelfTable>
      </div>
    </div>
    <el-dialog title="监控位置管理" :visible.sync="dialogTableVisible" :append-to-body="true" class="myDialog" width="900px">
      <el-form ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="监测点名称：" prop="locationName">
          <el-input v-model="editForm.locationName" placeholder="请输入监测点名称" ></el-input>
        </el-form-item>
        <el-form-item label="监控位置类型：" prop="locationType">
          <el-select v-model="editForm.locationType" placeholder="请选择" >
            <el-option
                v-for="item in monitorTypeList"
                :key="item.id"
                :value="item.id"
                :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在经度：" prop="longitude">
          <el-input v-model="editForm.longitude" placeholder="" ></el-input>
        </el-form-item>
        <el-form-item label="所在纬度：" prop="latitude">
          <el-input v-model="editForm.latitude" placeholder="" ></el-input>
        </el-form-item>
        <el-form-item label="所属单位：" prop="unitId">
          <el-select v-model="editForm.unitId"  @change="unitChange" placeholder="请选择" >
            <el-option
                v-for="item in unitList"
                :key="item.pkId"
                :value="item.pkId"
                :label="item.unitName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="editForm.remark" placeholder="" ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('editForm')">确定</el-button>
        <el-button  @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SelfTable from '../../components/Table/SelfTable.vue'
import API from '../../common/api/MonitoringManagement/MonitoringLocation'
import ComApi from '../../common/api/commonApi'
export default {
  name: 'monitoringLocation',
  components:{SelfTable},
  data(){
    return{
      dialogTableVisible:false,
      name:'',
      isBtn:true,
      isIndex: true,
      isPage: true,
      total: 20,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      headerData: [
        { value: "locationName", title: "监控位置名称" },
        { value: "locationTypeName", title: "监控位置类型" },
        { value: "longitude", title: "所在经度" },
        { value: "latitude", title: "所在纬度"},
        { value: "locationUnitName", title: "所属单位" },
        { value: "remark", title: "备注" },
      ],
      tableData: [
        {
          name: "1",
          num: "1",
          region: "beijing",
          IndustryType: "1",
          unitStatus: "1",
          issuingAuthority: "1",
          issuingTime: "2",
          validUntil: "3",
          unitType: "2",
        },
      ],
      btnList: [{ name: "编辑" },{ name: "删除" }],
      editForm:{
        locationName:'',
        locationType:'',
        longitude:'',
        latitude:'',
        unitId:'',
        remark:'',
        unitInfo:''
      },
      monitorTypeList:[
        {id:'1',label:'源库'},
        {id:'2',label:'车间'},
        {id:'3',label: '医学科室'},
        {id: '4',label: '石油勘探'},
      ],
      unitList: [],
      rules: {
        locationName: [
          { required: true, message: '请输入监测点名称', trigger: 'blur' }
        ],
        locationType: [
          { required: true, message: '请选择监控位置类型', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请输入所在经度', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入所在纬度', trigger: 'blur' }
        ],
        unitId: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
      }
    }
  },
  mounted(){
    this.queryByParam()
    this.getUnitInfoList()
  },
  methods:{
    getUnitInfoList(){
      let params = {
        code:''
      }
      ComApi.getUnitInfoList(params).then(res=>{
        if(res.code === 0){
          this.unitList = res.data
        }
      })
    },
    getIndex(index){
      let _this = this;
      let curPage = _this.currentPage;
      let limitPage = _this.pageSize;
      return (index+1) + (curPage - 1) * limitPage;
    },
    queryByParam(){
      let params = {
        name:this.name,
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }
      API.getTBasMonitoringLocationList(params).then(res=>{
        if(res.code === 0){
          this.tableData = res.data.list
          this.total = res.data.totalCount
        }
      })
    },
    // 监控所属单位change事件
    unitChange(val){
      this.unitList.map(item=>{
        if(item.pkId == val){
          this.editForm.unitCode = item.unitCode;
          this.editForm.locationUnitName = item.unitName;
        }
      })
    },
    // 提交表单
    submitForm: function (editForm) {
      let _this = this
      if (!_this.editForm.pkId) {
        console.log('即将进行新增')
        this.insertService(editForm)
      } else {
        console.log('编辑')
        this.updateService(editForm)
      }
    },

    // 数据新增操作，并更新页面
    insertService: function (editForm) {
      var _this = this
      _this.$refs[editForm].validate(function (valid) {
        if (valid) {
          // console.log(_this.editForm.unitInfo)
          // let t = _this.editForm.unitInfo.split(':')
          // _this.editForm.unitId = t[0];
          // _this.editForm.unitCode = t[1];
          // _this.editForm.locationUnitName = t[2];
          API.saveMonitoringLocation(_this.editForm).then(function (res) {
            if (res.code === 0) {
              _this.$message.success('提交成功！')
              _this.dialogTableVisible = false
              _this.queryByParam()
            } else {
              _this.$message.error(res.msg)
            }
          }).catch(function (err) {
            console.log(err)
            // self.message = "连接服务器失败！"
            _this.$message.info('提交失败！')
          })
        }
      })
    },
    // 数据更新操作，并更新页面
    updateService: function (editForm) {
      var _this = this
      console.log(_this.editForm)
      _this.$refs[editForm].validate(function (valid) {
        if (valid) {
          API.updateMonitoringLocation(_this.editForm).then(function (res) {
            if (res.code === 0) {
              _this.$message.success('修改成功！')
              _this.dialogTableVisible = false
              _this.queryByParam()
            } else {
              _this.$message.error(res.msg)
            }
          }).catch(function (err) {
            console.log(err)
            _this.$message.info('修改失败！')
          })
        } else {
          _this.$message.error('修改失败！')
        }
      })
    },
    openView(){
      this.dialogTableVisible = true
      this.editForm = {}
    },
    onBtnClick(scope, name) {
      var _this = this
      console.log(scope, name);
      if (name == "编辑") {
        _this.dialogTableVisible = true
        console.log(scope.row)
        _this.editForm.pkId = scope.row.pkId
        _this.editForm.locationName = scope.row.locationName
        _this.editForm.locationType = scope.row.locationType
        _this.editForm.longitude = scope.row.longitude
        _this.editForm.latitude = scope.row.latitude
        _this.editForm.remark = scope.row.remark
        _this.editForm.unitId = scope.row.unitId;
        _this.editForm.unitCode = scope.row.unitCode;
        _this.editForm.locationUnitName = scope.row.locationUnitName;
        // _this.editForm.unitInfo = scope.row.unitId+':'+ scope.row.unitCode+':'+scope.row.locationUnitName

      } else {
        _this.$confirm('此操作将删除该数据信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(function () {
        let params = {
          pkId: scope.row.pkId
        }
        API.deleteMonitoringLocation(params).then(function (res) {
          if (res.code === 0) {
           _this.$message.success('删除成功！')
            // this.$refs.paginationObj.cur_page = 1
             _this.queryByParam()
          } else {
            // this.$message.error(res.msg)
             _this.$message({
                message: res.msg,
                type: 'warning'
              });
          }
        })
        }).catch(function () {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
        })
      }
    },
    cellClick(row, col, cell, event) {
      if (col.property == "region") {
        alert(111);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.queryByParam()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryByParam()
    },
    // unitInfoChange(val){
    //   debugger
    //   console.log(this.editForm.unitInfo.split[':']);
    //   this.editForm.unitId = val.split[':'];
    //   this.editForm.unitCode = val.split[':'][1];
    //   this.editForm.locationUnitName = val.split[':'][2];
    // }
  }
}
</script>

<style scoped>
.tableCommonHeight{
    height: calc(100% - 120px);
  }
</style>
