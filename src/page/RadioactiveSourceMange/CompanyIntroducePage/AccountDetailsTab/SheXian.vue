<!--非密封放射性物质-->
<template>
  <div class="rowSpace flexColumn">
    <div class="selectedList rowFlex">
      <div class="rowFlex flexWrap">
        <div class="rowFlex selectedListLi alignCenter" v-for="item in selectedList" :key="item.id">
          <div class="selectedListLiName">
            {{item.name}}
          </div>
          <div v-if="item.isChildren" class="rowFlex">
            <div v-for="itemChild in item.child" :key="itemChild.id" class="rowFlex alignCenter">
              <div
                  class="manyTabSelected rowCenter alignCenter"
                  :class="changeManyTabId == itemChild.id ? 'selected' : ''"
                  @click="changeManyTab(itemChild.id)">
                <div class="manyTabSelectedSmall"></div>
              </div>
              <div class="manySelect rowFlex alignCenter">
                <div class="manySelectName">{{itemChild.name}}</div>
                <TypeList
                    :typeList="itemChild.isChildren[0]"
                    :dataMain="queryList"
                    :disabled="itemChild.id == changeManyTabId ? false : true"></TypeList>
              </div>
            </div>
          </div>
          <div v-else>
            <TypeList :typeList="item" :dataMain="queryList"></TypeList>
          </div>
        </div>
        <el-button type="primary" class="queryButton" @click="queryListFun">查看</el-button>
      </div>
    </div>
    <div class="tableCommonHeight">
      <TableCommon :dataName="dataName" :data="data" paginationShow='false'></TableCommon>
    </div>
  </div>
</template>

<script>
import TypeList from './TypeList'
import TableCommon from '../../../../components/Table/TableCommon'
import AccountDetails from '../../../../common/api/RadioactiveSourceMange/companyIntroduce/AccountDetails'
export default {
  name: 'FangSheYuan',
  components: {TableCommon, TypeList},
  data () {
    return {
      queryList: {
        name: '', // 装置名称
        place: '', // 工作场所
        purpose: '', // 用途
        category: '', // 类别
        status: '' // 装置状态
      },
      selectedList: [
        {
          name: '装置名称：',
          id: 'name',
          type: 'input'
        },
        {
          name: '工作场所：',
          isChildren: false,
          id: 'place',
          type: 'select',
          options: [],
          typeId: 'code',
          optionsId: 'place'
        },
        {
          name: '用途：',
          isChildren: false,
          id: 'purpose',
          type: 'select',
          options: [
            {
              name: 'Ⅰ类',
              id: 'Ⅰ类'
            },
            {
              name: 'Ⅱ类',
              id: 'Ⅱ类'
            },
            {
              name: 'Ⅲ类',
              id: 'Ⅲ类'
            },
            {
              name: 'Ⅳ类',
              id: 'Ⅳ类'
            },
            {
              name: 'Ⅴ类',
              id: 'Ⅴ类'
            },
            {
              name: 'N类',
              id: 'N类'
            }
          ],
          optionsId: 'purpose',
          typeId: 'code'
        },
        {
          name: '类别：',
          isChildren: false,
          id: 'category',
          type: 'select',
          options: [
            {
              name: 'Ⅰ类',
              id: '1'
            },
            {
              name: 'Ⅱ类',
              id: '2'
            },
            {
              name: 'Ⅲ类',
              id: '3'
            },
            {
              name: 'Ⅳ类',
              id: '4'
            },
            {
              name: 'Ⅴ类',
              id: '5'
            },
            {
              name: 'N类',
              id: '6'
            }
          ],
          optionsId: 'category',
          typeId: 'id'
        },
        {
          name: '装置状态：',
          isChildren: false,
          id: 'status',
          type: 'select',
          options: [
            {
              name: '在用',
              id: '1'
            },
            {
              name: '非在用',
              id: '2'
            }
          ],
          typeId: 'id',
          optionsId: 'status'
        }
      ],
      dataName: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '装置名称',
          type: 'normal',
          prop: 'name'
        },
        {
          label: '规格型号',
          type: 'normal',
          prop: 'model'
        },
        {
          label: '类别',
          type: 'normal',
          prop: 'category'
        },
        {
          label: '管电压',
          type: 'normal',
          prop: 'voltage'
        },
        {
          label: '管电流',
          type: 'normal',
          prop: 'electricity'
        },
        {
          label: '功率',
          type: 'normal',
          prop: 'power'
        },
        {
          label: '粒子能量',
          type: 'normal',
          prop: 'energy'
        },
        {
          label: '用途',
          type: 'normal',
          prop: 'purpose'
        },
        {
          label: '工作场所',
          type: 'normal',
          prop: 'workplace'
        },
        {
          label: '来源',
          type: 'normal',
          prop: 'source'
        },
        {
          label: '去向',
          type: 'normal',
          prop: 'dispositon'
        },
        {
          label: '装置状态',
          type: 'normal',
          prop: 'status'
        }
      ],
      data: [],
      paginationShow: false,
      changeManyTabId: 'use'
    }
  },
  methods: {
    queryListFun () {
      this.queryList['unitId'] = this.$route.query.id
      let params = this.queryList
      this.loadingLedgerDetailsUnsealedRadioactiveMaterialList(params)
    },
    changeManyTab (id) {
      this.changeManyTabId = id
    },
    // 获取场所
    loadingGetLedgerDetailsPlaceList () {
      AccountDetails.getLedgerDetailsPlaceList().then(res => {
        this.selectedList[1].options = res.data
      })
    },
    // 获取用途
    loadingGetLedgerDetailsPurposeList () {
      AccountDetails.getDevicePurposeList().then(res => {
        this.selectedList[2].options = res.data
      })
    },
    loadingLedgerDetailsUnsealedRadioactiveMaterialList(params) {
      AccountDetails.getLedgerDetailsRayDeviceList(params).then(res => {
        this.data = res.data
      })
    }
  },
  mounted () {
    this.loadingGetLedgerDetailsPlaceList()
    // 台账明细-获取用途
    this.loadingGetLedgerDetailsPurposeList()
    this.queryListFun()
  }
}
</script>

<style scoped>
.selectedList{
  width: 100%;
  margin-top: 10px;
}
.tableCommonHeight{
  height: calc(100% - 60px);
}
.selectedListLi{
  min-width: 267px;
  height: 37px;
  margin-bottom: 14px;
}
.selectedListLiName{
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  color: rgba(26, 30, 40, 1);
  font-size: 14px;
}
.manySelect{
  border: 1px solid rgba(204, 204, 204, 1);
  height: 35px;
  line-height: 35px;
  margin-right: 35px;
  border-radius: 3px;
}
.manySelectName{
  padding: 0px 10px;
  border-right: 1px solid rgba(221, 221, 221, 1);
  line-height: 19px;
  height: 19px;
  color: rgba(26, 30, 40, 1);
}
.queryButton{
  height: 35px;
  line-height: 35px;
  background: rgba(66, 139, 202, 1);
  padding: 0px 43px;
  margin-left: 10px;
}
.manyTabSelected{
  width: 18px;
  height: 18px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 100%;
  margin-right: 10px;
  position: relative;
}
.manyTabSelectedSmall{
  width: 10px;
  height: 10px;
  background: #DDDDDD;
  border-radius: 100%;
}
.manyTabSelected.selected{
  border-color: rgba(69, 155, 255, 1);
}
.manyTabSelected.selected .manyTabSelectedSmall{
  background: rgba(69, 155, 255, 1);
}
@media (max-width: 1600px) {
  .tableCommonHeight{
    height: calc(100% - 100px);
  }
}
</style>
