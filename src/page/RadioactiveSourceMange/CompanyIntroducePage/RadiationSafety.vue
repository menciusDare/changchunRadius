<!--RadiationSafety辐射安全-->
<template>
  <div>
    <div class="panelMainTitle">辐射安全管理机构</div>
    <div class="safety">
      <div v-for="item in safetyList" :key="item.id" class="rowSpace">
        <div class="contentTitle">{{item.name}}</div>
        <div v-if="item.isChildren" class="contentMain rowSpace">
          <div v-for="itemChild in item.childrenList" :key="itemChild.id">
            <div class="contentMainName">{{itemChild.name}}</div>
            <div>{{safetyListValue[itemChild.id]}}</div>
          </div>
        </div>
        <div v-else class="contentMain">{{safetyListValue[item.id]}}</div>
      </div>
    </div>
    <div class="tableMange">
      <div class="panelMainTitle">管理人员</div>
      <div style="height: calc(100% - 30px)">
        <TableCommon
            :dataName="dataName"
            :data="data"
            paginationShow='true'
            :pagination="pagination"></TableCommon>
      </div>
    </div>
  </div>
</template>

<script>
import TableCommon from '../../../components/Table/TableCommon'
import RadiationSafety from '../../../common/api/RadioactiveSourceMange/companyIntroduce/RadiationSafety'
import {EventBus} from '../../../common/eventbus'
export default {
  name: 'RadiationWorkers',
  components: {TableCommon},
  data () {
    return {
      safetyList: [
        {
          name: '机构名称：',
          id: 'orgName',
          isChildren: false
        },
        {
          name: '联系人：',
          id: 'people',
          isChildren: true,
          childrenList: [
            {
              name: '姓名：',
              id: 'contactName'
            },
            {
              name: '电话：',
              id: 'contactNumber'
            },
            {
              name: '手机：',
              id: 'contactPhone'
            },
            {
              name: '传真：',
              id: 'faxNumber'
            },
            {
              name: 'Email：',
              id: 'contactMail'
            }
          ]
        }
      ],
      safetyListValue: {},
      dataName: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '管理人员性质',
          type: 'normal',
          prop: 'type'
        },
        {
          label: '姓名',
          type: 'index',
          prop: 'name'
        },
        {
          label: '性别',
          type: 'normal',
          prop: 'sex'
        },
        {
          label: '专业',
          type: 'normal',
          prop: 'profession'
        },
        {
          label: '职务或职称',
          type: 'index',
          prop: 'position'
        },
        {
          label: '工作部门',
          type: 'normal',
          prop: 'department'
        },
        {
          label: '专/兼职',
          type: 'normal',
          prop: 'isJob'
        },
        {
          label: '是/否注册核安全工程师',
          type: 'normal',
          prop: 'isRegister'
        }
      ],
      data: [],
      pagination: {
        current: 1,
        total: 10,
        size: 10
      }
    }
  },
  methods: {
    // 获取机构
    loadingRadiationSafetyManagementManagementOrganization (resolve) {
      let params = {
        unitId: this.$route.query.id
      }
      RadiationSafety.getRadiationSafetyManagementManagementOrganization(params).then(res => {
        this.safetyListValue = res.data
        resolve('ok')
      })
    },
    // 获取人员
    loadingRadiationSafetyManagementManagement () {
      let params = {
        orgId: this.safetyListValue.pkId,
        pageNum: this.pagination.current,
        pageSize: this.pagination.size
      }
      RadiationSafety.getRadiationSafetyManagementManagement(params).then(res => {
        this.data = res.data.list
        this.pagination.total = res.data.totalCount
      })
    },
    loadingChangePage () {
      EventBus.$on('changePage', (params) => {
        this.pagination.current = params.cur_page
        this.pagination.size = params.cur_pageSize
        this.loadingRadiationSafetyManagementManagement()
      })
    }
  },
  mounted () {
    new Promise((resolve, reject) => {
      this.loadingRadiationSafetyManagementManagementOrganization(resolve)
    }).then(res => {
      this.loadingRadiationSafetyManagementManagement()
    })
    this.loadingChangePage()
  },
  beforeDestroy () {
    EventBus.$off('changePage')
  }
}
</script>

<style scoped>
.contentMain{
  width: calc(100% - 80px);
  background: #F4F6FA;
  padding: 10px 25px;
  margin-bottom: 15px;
  box-sizing: border-box;
  color: #333333;
  font-size: 14px;
}
.contentTitle{
  width: 72px;
  font-size: 14px;
  color: #1A1E28;
  line-height: 35px;
}
.contentMainName{
  color: #8A8A8A;
  font-size: 14px;
}
.panelMainTitle{
  margin-bottom: 10px;
}
.tableMange{
  height: calc(100% - 180px);
}
</style>
