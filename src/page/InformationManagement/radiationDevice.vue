<template>
  <div class="pageBox">
    <div class="pageName">辐射装置管理</div>
    <div class="panelMain">
      <el-form :inline="true" class="myForm">
        <el-form-item label="辐射装置名称：" >
          <el-input v-model="name" placeholder="请输入辐射装置名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="queryByParam()">查询</el-button>
          <el-button icon="el-icon-plus" class="btn-add" @click="openView('')">添加</el-button>
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
    <el-dialog title="辐射装置管理" :visible.sync="dialogTableVisible" :append-to-body="true" @close="closeDia" class="myDialog" width="900px">
      <el-form ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="辐射装置名称：" prop="radiationName">
          <el-input v-model="editForm.radiationName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所属单位：" prop="unitCode">
          <el-select v-model="editForm.unitCode" @change="changeUnit" placeholder="请选择">
            <el-option
                v-for="item in unitList"
                :key="item.unitCode"
                :value="item.unitCode"
                :label="item.unitName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域：" prop="regionName">
          <el-input v-model="editForm.regionName" disabled placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="辐射装置生产厂家：" prop="radiationProduction">
          <el-input v-model="editForm.radiationProduction" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="绑定监控位置：" prop="locationId">
          <el-select v-model="editForm.locationId" @change="locationChange" placeholder="请选择">
            <el-option
                v-for="item in locationList"
                :key="item.pkId"
                :value="item.pkId"
                :label="item.locationName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="辐射装置用途：" prop="radiationUse">
          <el-input v-model="editForm.radiationUse" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="linkman">
          <el-input v-model="editForm.linkman" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input v-model="editForm.phone" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="科室：" prop="department">
          <el-input v-model="editForm.department" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="型号：" prop="model">
          <el-input v-model="editForm.model" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="使用期限：" prop="period">
          <el-input v-model="editForm.period" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="辐射装置描述：" prop="deviceDescribe">
          <el-input v-model="editForm.deviceDescribe" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="辐射级别：" prop="level">
          <el-select v-model="editForm.level" placeholder="请选择">
            <el-option
                v-for="item in levelList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="源数量：" prop="number">
          <el-input v-model="editForm.number" disabled placeholder=""></el-input>
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
import API from '../../common/api/MonitoringManagement/RadiationDevice'
import ComApi from '../../common/api/commonApi'
import {device_category, status_list} from '../../common/constants'
export default {
  name: 'radiationDevice',
  components: {SelfTable},
  data () {
    return {
      dialogTableVisible: false,
      name: '',
      isBtn: true,
      isIndex: true,
      isPage: true,
      regionName:'',
      total: 20,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      currentPage: 1,
      headerData: [
        { value: 'radiationName', title: '辐射装置' },
        { value: 'unitName', title: '所属单位' },
        { value: 'locationName', title: '监控位置' },
        { value: 'level', title: '辐射级别'},
        { value: 'number', title: '源数量' }
      ],
      tableData: [
        {
          name: '1',
          num: '1',
          region: 'beijing',
          IndustryType: '1',
          unitStatus: '1',
          issuingAuthority: '1',
          issuingTime: '2',
          validUntil: '3',
          unitType: '2'
        }
      ],
      btnList: [{ name: '编辑' }, { name: '删除' }],
      editForm: {
        radiationName:'',
        unitName:'',
        regionName:'',
        radiationProduction:'',
        locationName:'',
        radiationUse:'',
        locationId:'',
        linkman:'',
        unitCode:'',
        pkId:'',
        phone:'',
        department:'',
        model:'',
        period:'',
        deviceDescribe:'',
        level:'',
        number:'',
      },
      locationList: [],
      unitList: [],
      levelList:[
        { value: '1', label: 'Ⅰ类' },
          { value: '2', label: 'Ⅱ类' },
          { value: '3', label: 'Ⅲ类' },
          { value: '4', label: 'Ⅳ类' },
          { value: '5', label: 'Ⅴ类' },
      ],
      rules: {
        radiationName: [
          { required: true, message: '请输入辐射装置名称', trigger: 'blur' }
        ],
        unitCode: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        locationId: [
          { required: true, message: '请选择监控位置', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择辐射级别', trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    this.queryByParam()
    this.getUnitInfoList()
    this.getMonitoringLocations()
  },
  methods: {
    // 获取单位列表
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
    // 获取监控位置列表
    getMonitoringLocations(){
      ComApi.getMonitoringLocations().then(res=>{
        if(res.code === 0){
          this.locationList = res.data
        }
      })
    },
    getIndex(index){
      let _this = this;
      let curPage = _this.currentPage;
      let limitPage = _this.pageSize;
      return (index+1) + (curPage - 1) * limitPage;
    },
    changeUnit(value){
      console.log(value)
      this.unitList.forEach(item=>{
        if(item.unitCode == value){
          this.editForm.regionName = item.regionName
          this.editForm.number = item.sourceNum
          this.editForm.unitName = item.unitName
          this.editForm.unitCode  = item.unitCode
          this.editForm.unitId = item.pkId
        }
      })
    },
    locationChange(val){
       this.locationList.forEach(item=>{
         if(item.pkId == val){
          this.editForm.locationId = item.pkId
          this.editForm.locationName = item.locationName
         }
       })
    },
    queryByParam () {
      let params={
        radiationtName:this.name,
        pageSize:this.pageSize,
        pageNum:this.currentPage
      }
      API.getRadiationList(params).then(res=>{
        if(res.code === 0){
          this.tableData = res.data.list.map(
            item => {
                item.level = device_category[item.level]
                return item
              }
          )
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
    closeDia(){
      this.$refs.editForm.resetFields()
    },
    // 数据新增操作，并更新页面
    insertService: function (editForm) {
      var _this = this
      _this.$refs[editForm].validate(function (valid) {
        if (valid) {
          API.saveRadiation(_this.editForm).then(function (res) {
            if (res.code === 0) {
              _this.$message.success('提交成功！')
              _this.dialogTableVisible = false
              // _this.editForm ={}
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
      _this.$refs[editForm].validate(function (valid) {
        if (valid) {
          API.updateRadiation(_this.editForm).then(function (res) {
            if (res.code === 0) {
              _this.$message.success('修改成功！')
              _this.dialogTableVisible = false
              // _this.editForm = {}
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
    openView () {
      this.dialogTableVisible = true
       this.$refs.editForm.resetFields()
      // this.editForm = {}
    },
    onBtnClick (scope, name) {
      var _this = this
      console.log(scope, name)
      if (name == '编辑') {
        let params = {
          pkId: scope.row.pkId
        }
        API.getRadiationById(params).then(res=>{
          if(res.code === 0){
            let radData = res.data
              _this.editForm.pkId = radData.pkId
              _this.editForm.radiationName = radData.radiationName,
              _this.editForm.unitName = radData.unitName,
              _this.editForm.unitCode = radData.unitCode,
              _this.editForm.regionName = radData.regionName,
              _this.editForm.radiationProduction = radData.radiationProduction,
              _this.editForm.locationName = radData.locationName,
              _this.editForm.locationId = radData.locationId,
              _this.editForm.radiationUse = radData.radiationUse,
              _this.editForm.linkman = radData.linkman,
              _this.editForm.phone = radData.phone,
              _this.editForm.department = radData.department,
              _this.editForm.model = radData.model,
              _this.editForm.period = radData.period,
              _this.editForm.deviceDescribe = radData.deviceDescribe,
              _this.editForm.level = radData.level,
              _this.editForm.number = radData.number
          }
        })
        _this.dialogTableVisible = true
      } else {
        _this.$confirm('此操作将删除该数据信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(function () {
       let params = {
          pkId: scope.row.pkId
        }
        API.deleteRadiation(params).then(function (res) {
          if (res.code === 0) {
            _this.$message.success('删除成功！')
            // this.$refs.paginationObj.cur_page = 1
            _this.queryByParam()
          } else {
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
    cellClick (row, col, cell, event) {
      if (col.property == 'region') {
        alert(111)
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
