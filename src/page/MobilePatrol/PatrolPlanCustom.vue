<template>
  <div class="pageBox">
    <div class="pageName">巡查计划定制</div>
    <div class="panelMain">
      <el-form :inline="true" label-suffix="：" class="myForm">
        <el-form-item label="所属区域">
          <el-select clearable v-model="searchForm.regionCode" placeholder="请选择">
            <el-option v-for="item in licenseAuthorityList" :key="item.name" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡查对象">
          <el-input v-model="searchForm.unitName" placeholder="请输入任务地点"></el-input>
        </el-form-item>
        <el-form-item label="发起时间">
          <el-date-picker
            clearable
            v-model="searchForm.startTime"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch()">查询</el-button>
        </el-form-item>
        <p>
          <el-button icon="el-icon-plus" class="btn-add" @click="handleAdd()">添加</el-button>
        </p>
      </el-form>
      <div class="mt10 tableCommonHeight">
        <TableCommon
          :pagination="pagination"
          :dataName="dataName"
          :data="tableData"
          @changeButton="changeButton"
          paginationShow="true"
        ></TableCommon>
      </div>
    </div>
    <el-dialog title="巡查计划制定" :visible.sync="dialogTableVisible" :append-to-body="true" class="myDialog" width="900px">
      <el-form label-suffix="：" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="区域" prop="regionCode">
          <el-select v-model="editForm.regionCode" placeholder="请选择" @change="regionChange">
            <el-option v-for="item in licenseAuthorityList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡查开始时间" prop="startTime">
          <el-date-picker value-format="yyyy-MM-dd" v-model="editForm.startTime" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="巡查对象" prop="unitIdList">
          <el-select :popper-append-to-body="false" v-model="editForm.unitIdList" placeholder="请选择" multiple @change="unitIdListChange">
            <el-option v-for="item in EditUnitVOListOptions" :key="item.pkId" :value="item.pkId" :label="item.unitName">
              <input type="checkbox" v-model="item.checkoutValue" />
              <span>{{ item.unitName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡查结束时间" prop="endTime">
          <el-date-picker value-format="yyyy-MM-dd" v-model="editForm.endTime" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="巡查频次" required>
          <br />
          <div style="transform: translateY(-15px); display: flex">
            <el-form-item prop="frequency" style="padding-left: 0">
              <el-select class="inpW145" v-model="editForm.frequency" placeholder="请选择">
                <el-option v-for="item in frequencyOptions" :key="item.code" :value="item.code" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="frequencyNum" style="padding-left: 0">
              <el-input class="inpW145" v-model.number="editForm.frequencyNum" placeholder="请输入">
                <span slot="suffix" class="">次</span>
              </el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-select v-model="editForm.userType" disabled placeholder="请选择">
            <el-option v-for="item in userTypeList" :label="item.userTypeName" :value="item.userType" :key="item.userType"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align: center" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit">确定</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Auth from '../../common/api/MobilePatrol/PatrolPlanCustom.js'
import commonApi from '@/common/api/commonApi'
import { EventBus } from '@/common/eventbus'

import TableCommon from '@/components/Table/TableCommon'
export default {
  name: 'PatrolPlanCustom',
  components: { TableCommon },
  created () {
    this.queryRegions()
    this.queryPageList()
    this.loadingGetUserTypeList()
  },
  mounted () {
    this.loadingChangePage()
  },
  beforeDestroy () {
    EventBus.$off('changePage')
  },
  data () {
    return {
      userTypeList: [],
      licenseAuthorityList: [],
      tableData: [],
      dataName: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '区域',
          type: 'normal',
          prop: 'regionName'
        },
        {
          label: '巡查对象',
          type: 'normal',
          prop: 'unitName'
        },
        {
          label: '用户类型',
          type: 'normal',
          prop: 'userTypeName'
        },
        {
          label: '巡查频率',
          type: 'normal',
          prop: 'frequencyLable'
        },
        {
          label: '巡查开始时间',
          type: 'normal',
          prop: "startTime"
        },
        {
          label: '巡查结束时间',
          type: 'normal',
          prop: 'endTime'
        },
        {
          label: '操作',
          type: 'button',
          width: '150',
          buttonList: [
            { name: '编辑', id: 'edit', status: '1' },
            { name: '删除', id: 'delete', status: '1' }
          ]
        }
      ],
      pagination: {
        total: 0,
        current: 1,
        size: 10
      },
      searchForm: {
        startTime: []
      },
      // 巡查对象
      unitVOListOptions: [],
      EditUnitVOListOptions: [],
      frequencyOptions: [
        { code: 1, name: '年' },
        { code: 2, name: '季' }
      ],
      dialogTableVisible: false,
      editForm: {},
      rules: {
        regionCode: [
          { required: true, message: '请选择区域', trigger: ['change'] }
        ],
        startTime: [
          { required: true, message: '请选择巡查开始时间', trigger: ['blur'] }
        ],
        unitIdList: [
          { required: true, message: '请输入巡查对象', trigger: ['change'] }
        ],
        endTime: [
          { required: true, message: '请选择巡查结束时间', trigger: ['blur'] }
        ],
        frequency: [
          { required: true, message: '请选择巡查频率', trigger: ['change'] }
        ],
        frequencyNum: [
          { required: true, message: '请选择巡查次数', trigger: ['blur'] },
          { type: 'number', message: '巡查次数必须为数字值' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: ['blur'] }
        ],
      }
    }
  },
  methods: {
    // 用户类型
    loadingGetUserTypeList () {
      Auth.getUserTypeList().then(res => {
        if (res.code === 0) {
          this.userTypeList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    loadingChangePage () {
      EventBus.$on('changePage', (params) => {
        console.log('params', params);
        this.pagination.current = params.cur_page
        this.pagination.size = params.cur_pageSize
        this.queryPageList()
      })
    },
    // 查询所有涉源单位
    queryUnitInfoList (regionCode = '') {
      if (regionCode == 220100) {
        regionCode = ''
      }
      commonApi.getUnitInfoList({ code: regionCode }).then(res => {
        if (res.code === 0) {
          this.EditUnitVOListOptions = res.data
          this.unitIdListChange()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 详情
    queryInfo (cycleId) {
      Auth.getCycleTaskById({ cycleId }).then(res => {
        if (res.code === 0) {
          res.data.unitIdList = res.data.unitVOList.map(item => {
            return item.unitId
          })
          this.editForm = res.data
          this.queryUnitInfoList(res.data.regionCode)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 查询所属区域
    queryRegions () {
      commonApi.getRegions().then(res => {
        if (res.code === 0) {
          this.licenseAuthorityList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 删除
    deleteSysCycle (sysCycleId) {
      Auth.deleteSysCycle({ sysCycleId }).then(res => {
        if (res.code === 0) {
          this.queryPageList()
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleAdd () {
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.$refs.editForm.resetFields()
        this.editForm = {
          unitIdList: [],
          userType: 5
        }
        this.EditUnitVOListOptions = []
      })
    },
    queryPageList () {
      var params = {
        "regionCode": this.searchForm.regionCode,
        "startTime": Array.isArray(this.searchForm.startTime) ? this.searchForm.startTime[0] : '',
        "endTime": Array.isArray(this.searchForm.startTime) ? this.searchForm.startTime[1] : '',
        "unitName": this.searchForm.unitName,
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
      }
      Auth.getCycleTaskList(params).then(res => {
        if (res.code === 0) {
          this.pagination.total = res.data.totalCount
          this.tableData = res.data.list.map(item => {
            // 1年/2季
            var Lable = item.frequency === 1 ? '一年' : '一季度'
            item.frequencyLable = Lable + item.frequencyNum + '次'
            item.statusCode = '1'
            return item
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    regionChange (val) {
      console.log('val', val);
      this.editForm.unitIdList = []
      this.queryUnitInfoList(this.editForm.regionCode)
      this.EditUnitVOListOptions = []
    },
    unitIdListChange () {
      this.EditUnitVOListOptions.forEach(item => {
        if (this.editForm.unitIdList && this.editForm.unitIdList.includes(item.pkId)) {
          item.checkoutValue = true
        } else {
          item.checkoutValue = false
        }
      })
    },
    handleEdit () {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          var params = {
            regionCode: this.editForm.regionCode,
            startTime: this.editForm.startTime,
            endTime: this.editForm.endTime,
            frequency: this.editForm.frequency,
            frequencyNum: this.editForm.frequencyNum,
            unitIdList: this.editForm.unitIdList,
            userType: this.editForm.userType
          }
          try {
            var res = null
            if (this.editForm.pkId) {
              params.pkId = this.editForm.pkId
              res = await Auth.updateSysCycle(params)
            } else {
              res = await Auth.saveSysCycle(params)
            }
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success',
              duration: '1500'
            });
            this.dialogTableVisible = false
            this.pagination.curPage = 1
            this.queryPageList()
          } catch (e) {
            this.$message.error('错误')
          }
        } else {
          return false;
        }
      });
    },
    handleSearch () {
      this.pagination.curPage = 1
      this.queryPageList()
    },
    changeButton ({ itemButton, row }) {
      console.log(itemButton, row);
      if (itemButton.name == "编辑") {
        this.queryInfo(row.pkId)
        this.dialogTableVisible = true
      } else if (itemButton.name == "删除") {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSysCycle(row.pkId)
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
.pageBox {
  height: 100%;
}
.tableCommonHeight {
  height: calc(100% - 100px);
}
@media (max-width: 1600px) {
  .tableCommonHeight {
    height: calc(100% - 230px);
  }
}
.inpW145 {
  width: 145px;
  /deep/ .el-input__inner {
    width: 145px;
  }
}
.mt10 {
  margin-top: 10px;
}
.myForm /deep/ .el-button {
  margin-bottom: 0;
}
// 日期图标
/deep/ .el-date-editor .el-input__prefix {
  font-size: 16px;
  right: -75px;
  left: auto;
  color: #8a8a8a;
}
// 多选下拉
/deep/ .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  content: '';
}
</style>
