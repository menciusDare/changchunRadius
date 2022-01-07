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
        accountType: '', // 台账类型
        useAccountValidity: '', // 使用台账
        selectAccountValidity: '', // 销售台账
        nuclideCode: '', // 核素名称
        datetimeRange: [], // 出厂时间
        sourceCountry: '' // 来源
      },
      selectedList: [
        {
          name: '台账类型：',
          isChildren: true,
          id: 'accountType',
          child: [
            {
              name: '使用台账',
              id: 'use',
              value: '1',
              isChildren: [
                {
                  type: 'select',
                  options: [
                    {
                      name: '现有台账',
                      id: '1'
                    },
                    {
                      name: '历史台账',
                      id: '2'
                    }
                  ],
                  optionsId: 'useAccountValidity',
                  isBorder: false,
                  typeId: 'id'
                }
              ]
            }
          ]
        },
        {
          name: '核素：',
          isChildren: false,
          id: 'nuclideCode',
          type: 'select',
          options: [
            {
              name: '现有台账',
              id: 'now'
            },
            {
              name: '历史台账',
              id: 'history'
            }
          ],
          optionsId: 'nuclideCode',
          typeId: 'nuclideName'
        },
        {
          name: '用途：',
          isChildren: false,
          id: 'purpose',
          type: 'select',
          options: [
            {
              name: '现有台账',
              id: 'now'
            },
            {
              name: '历史台账',
              id: 'history'
            }
          ],
          optionsId: 'purpose',
          typeId: 'code'
        },
        {
          name: '来源：',
          isChildren: false,
          id: 'sourceCountry',
          type: 'input'
        },
        {
          name: '出厂日期：',
          isChildren: false,
          id: 'datetimeRange',
          type: 'datetimeRange',
          typeValue: 'daterange',
          valueFormat: 'yyyy-MM-dd',
          format: 'yyyy-MM-dd'
        }
      ],
      dataName: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '核素',
          type: 'normal',
          prop: 'nuclideName'
        },
        {
          label: '出厂活度（贝可）',
          type: 'normal',
          prop: 'factorActive'
        },
        {
          label: '频次',
          type: 'normal',
          prop: 'frequency'
        },
        {
          label: '工作场所',
          type: 'normal',
          prop: 'workplace'
        },
        {
          label: '用途',
          type: 'normal',
          prop: 'purpose'
        },
        {
          label: '来源',
          type: 'normal',
          prop: 'source'
        },
        {
          label: '审核人',
          type: 'normal',
          prop: 'auditUser'
        },
        {
          label: '审核时间',
          type: 'normal',
          prop: 'auditDate'
        },
        {
          label: '备注',
          type: 'normal',
          prop: 'remark'
        }
      ],
      data: [],
      paginationShow: false,
      changeManyTabId: 'use'
    }
  },
  methods: {
    queryListFun () {
      const {accountType, useAccountValidity, selectAccountValidity, datetimeRange, ...otherParams} = this.queryList
      let accountTypeList = {
        use: useAccountValidity,
        select: selectAccountValidity
      }
      let params = {
        accountType: this.changeManyTabId == 'use' ? '1' : '2',
        accountValidity: accountTypeList[this.changeManyTabId],
        endTime: datetimeRange ? datetimeRange[0] : '',
        startTime: datetimeRange ? datetimeRange[0] : '',
        unitId: this.$route.query.id,
        ...otherParams
      }
      this.loadingLedgerDetailsRayDeviceList(params)
    },
    changeManyTab (id) {
      this.changeManyTabId = id
    },
    // 列表
    loadingLedgerDetailsRayDeviceList (params) {
      AccountDetails.getLedgerDetailsUnsealedRadioactiveMaterialList(params).then(res => {
        this.data = res.data
      })
    },
    // 核素
    loadingGetLedgerDetailsNuclideList () {
      let params = {
        nuclideTypeCode: 1
      }
      AccountDetails.getLedgerDetailsNuclideList(params).then(res => {
        this.selectedList[1].options = res.data.map(item => {
          item.name = item.chineseName
          return item
        })
      })
    },
    // 获取用途
    loadingGetLedgerDetailsPurposeList () {
      AccountDetails.getLedgerDetailsPurposeList().then(res => {
        this.selectedList[2].options = res.data
      })
    }
  },
  created () {
    // 台账明细-核素
    this.loadingGetLedgerDetailsNuclideList()
    // 台账明细-获取用途
    this.loadingGetLedgerDetailsPurposeList()
    // 查看列表
    this.queryListFun()
  }
}
</script>

<style scoped>
.selectedList{
  width: 100%;
  margin-top: 10px;
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
.tableCommonHeight{
  height: calc(100% - 110px);
}
@media (max-width: 1600px) {
  .tableCommonHeight{
    height: calc(100% - 150px);
  }
}
</style>
