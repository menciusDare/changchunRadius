<template>
  <div class="pageBox">
    <div class="pageName">监测设备管理</div>
    <div class="panelMain">
      <el-form :inline="true" class="myForm">
        <el-form-item label="监测设备名称：" >
          <el-input v-model="name" placeholder="请输入监测设备名称"></el-input>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" icon="search" @click="queryByParam()">查询</el-button>
            <el-button icon="el-icon-plus" class="btn-add" @click="openView('')">添加</el-button>
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
    <el-dialog title="监控设备管理" :visible.sync="dialogTableVisible" @close="closeDia" :append-to-body="true" class="myDialog" width="900px">
      <el-form ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="监测设备名称：" prop="equipmentName">
          <el-input v-model="editForm.equipmentName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="设备类型：" prop="equipmentType">
          <el-select v-model="editForm.equipmentType" placeholder="请选择">
            <el-option
                v-for="item in equipmentTypeList"
                :key="item.equipmentType"
                :value="item.equipmentType"
                :label="item.equipmentTypeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备硬编码：" prop="equipmentCode">
          <el-input v-model="editForm.equipmentCode" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="设备状态：" prop="equipmentStatus">
          <el-select v-model="editForm.equipmentStatus" placeholder="请选择">
            <el-option
                v-for="item in equipmentStatusList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="辐射装置名称：" prop="radiationId">
          <el-select v-model="editForm.radiationId"  @change="radiationChange" placeholder="请选择">
            <el-option
                v-for="item in radiationList"
                :key="item.pkId"
                :value="item.pkId"
                :label="item.radiationName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="监控位置：" prop="locationName">
          <el-input v-model="editForm.locationName" disabled placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所属单位：" prop="unitName">
          <el-input v-model="editForm.unitName" disabled placeholder=""></el-input>
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
import API from '../../common/api/MonitoringManagement/MonitoringEquipment'
export default {
  name: 'monitoringEquipment',
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
        { value: "equipmentName", title: "监测设备名称" },
        { value: "equipmentTypeName", title: "设备类型" },
        { value: "equipmentCode", title: "设备硬编码" },
        { value: "unitName", title: "所属单位"},
        { value: "radiationName", title: "辐射装置名称" },
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
      equipmentStatusList:[
        {value:'1',label:'在线'},
        {value:'2',label:'离线'},
        {value:'3',label:'报警'}
      ],
      btnList: [{ name: "编辑" },{ name: "删除" }],
      editForm:{
        equipmentCode: "",
        equipmentName: "",
        equipmentStatus: '',
        equipmentType: '',
        equipmentTypeName: "",
        isStatus: 0,
        locationId: 0,
        locationName: "",
        radiationId: '',
        radiationName: "",
        unitCode: "",
        unitId: 0,
        unitName: ""
      },
      equipmentTypeList:[],
      radiationList:[],
      rules: {
        equipmentName: [
          { required: true, message: '请输入监测设备名称', trigger: 'blur' }
        ],
        equipmentType: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        equipmentCode: [
          { required: true, message: '请输入设备编码', trigger: 'blur' }
        ],
        equipmentStatus: [
          { required: true, message: '请选择设备状态', trigger: 'blur' }
        ],
        radiationId: [
          { required: true, message: '请选择辐射装置', trigger: 'blur' }
        ],
        locationName: [
          { required: true, message: '请选择辐射装置', trigger: 'blur' }
        ],
        unitName: [
          { required: true, message: '请选择辐射装置', trigger: 'blur' }
        ],
      }
    }
  },
  mounted(){
    this.queryByParam()
    this.getEquipmentTypes()
    this.getRadiations()
  },
  methods:{
    // 设备类型
    getEquipmentTypes(){
      API.getEquipmentTypes().then(res=>{
        if(res.code === 0){
          this.equipmentTypeList = res.data
        }
      })
    },
    getIndex(index){
      let _this = this;
      let curPage = _this.currentPage;
      let limitPage = _this.pageSize;
      return (index+1) + (curPage - 1) * limitPage;
    },
    // 辐射装置名称
    getRadiations(){
      API.getRadiations().then(res=>{
        if(res.code === 0){
          this.radiationList = res.data
        }
      })
    },
    // 根据辐射装置名称查监控位置和所属单位
    radiationChange(val){
          this.radiationList.forEach(item=>{
            console.log(item)
            if(item.pkId == val){
              this.editForm.radiationName = item.radiationName
              this.editForm.locationId = item.locationId
              this.editForm.locationName = item.locationName
              this.editForm.unitName = item.unitName
              this.editForm.unitCode = item.unitCode
              this.editForm.unitId = item.unitId
            }
          })
           
    },
    queryByParam(){
      let params = {
        equipmentName:this.name,
        pageSize:this.pageSize,
        pageNum:this.currentPage
      }
      API.getEquipmentList(params).then(res=>{
        if(res.code === 0){
          this.tableData = res.data.list
          this.total = res.data.totalCount
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
    // 弹框关闭事件   清空表单内容
    closeDia(){
      this.$refs.editForm.resetFields()
    },
    // 数据新增操作，并更新页面
    insertService: function (editForm) {
      var _this = this
      _this.$refs[editForm].validate(function (valid) {
        if (valid) {
          API.saveEquipment(_this.editForm).then(function (res) {
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
          API.updateEquipment(_this.editForm).then(function (res) {
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
      this.$refs.editForm.resetFields()
    },
    onBtnClick(scope, name) {
      var _this = this
      console.log(scope, name);
      if (name == "编辑") {
        _this.dialogTableVisible = true
        let params = {
          pkId: scope.row.pkId
        }
        API.getEquipmentById(params).then(res=>{
          if(res.code === 0){
            _this.editForm.pkId= res.data.pkId,
            _this.editForm.equipmentCode= res.data.equipmentCode,
            _this.editForm.equipmentName= res.data.equipmentName,
            _this.editForm.equipmentStatus= res.data.equipmentStatus + '',
            _this.editForm.equipmentType= res.data.equipmentType,
            _this.editForm.locationId= res.data.locationId,
            _this.editForm.locationName= res.data.locationName,
            _this.editForm.radiationId= res.data.radiationId,
            _this.editForm.radiationName= res.data.radiationName,
            _this.editForm.unitCode= res.data.unitCode,
            _this.editForm.unitId= res.data.unitId,
            _this.editForm.unitName= res.data.unitName
          }
        })
      } else {
        _this.$confirm('此操作将删除该数据信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(function () {
        let params = {
          pkId: scope.row.pkId
        }
        API.deleteEquipment(params).then(function (res) {
          if (res.code === 0) {
            _this.$message.success('删除成功！')
            // this.$refs.paginationObj.cur_page = 1
             _this.queryByParam()
          } else {
            // this.$message.error(res.msg)
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
  }
}
</script>

<style scoped>
.tableCommonHeight{
    height: calc(100% - 120px);
  }
</style>
