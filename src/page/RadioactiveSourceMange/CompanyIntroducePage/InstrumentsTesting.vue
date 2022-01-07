<!--InstrumentsTesting监测仪器-->
<template>
  <div>
    <div class="tableMain">
      <div class="tableTitle">监测仪器</div>
      <div class="tableHeightMain">
        <TableCommon :dataName="dataNameMonitoring" :data="dataMonitoring" paginationShow='false'></TableCommon>
      </div>
    </div>
    <div class="tableMain">
      <div class="tableTitle">防护用品</div>
      <div class="tableHeightMain">
        <TableCommon :dataName="dataNameProtective" :data="dataProtective" paginationShow='false'></TableCommon>
      </div>
    </div>
  </div>
</template>

<script>
import TableCommon from '@/components/Table/TableCommon'
import InstrumentsTesting from '../../../common/api/RadioactiveSourceMange/companyIntroduce/InstrumentsTesting'
export default {
  name: 'InstrumentsTesting',
  data () {
    return {
      // 防护用品
      dataNameProtective: [
        {
          label: '名称',
          type: 'normal',
          prop: 'name'
        },
        {
          label: '数量',
          type: 'normal',
          prop: 'amount'
        }
      ],
      dataProtective: [],
      dataNameMonitoring: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '仪器名称',
          type: 'normal',
          prop: 'name'
        },
        {
          label: '型号',
          type: 'normal',
          prop: 'model'
        },
        {
          label: '购置日期',
          type: 'normal',
          prop: 'purchaseDate'
        },
        {
          label: '仪器状态',
          type: 'index',
          prop: 'status'
        },
        {
          label: '数量',
          type: 'normal',
          prop: 'amount'
        }
      ],
      dataMonitoring: [],
      data: []
    }
  },
  components: {
    TableCommon
  },
  methods: {
    loadingDataNameMonitoring () {
      let params = {
        pageNum: 1,
        pageSize: 10000,
        unitId: this.$route.query.id
      }
      InstrumentsTesting.getMonitoringInstrumentList(params).then(res => {
        this.dataMonitoring = res.data.list
      })
    },
    loadingDataNameProtective () {
      let params = {
        pageNum: 1,
        pageSize: 10000,
        unitId: this.$route.query.id
      }
      InstrumentsTesting.getProtectiveEquipmentList(params).then(res => {
        this.dataProtective = res.data.list
      })
    }
  },
  mounted () {
    this.loadingDataNameMonitoring()
    this.loadingDataNameProtective()
  }
}
</script>

<style scoped>
.tableMain{
  max-height: 50%;
  height: 50%;
  padding-bottom: 30px;
  box-sizing: border-box;
}
.tableHeightMain{
  height: calc(100% - 30px);
}
.tableTitle{
  color: rgba(26, 30, 40, 1);
  font-size: 18px;
  line-height: 24px;
}
</style>
