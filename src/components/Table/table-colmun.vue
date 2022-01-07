/**
* @components table-colmun.vue
* @desc table表格的具体内容组件 column 为一行数据 changeButtton -> table内部的按钮 changeSelected->改变table列表的某一项 进行计算
* @params prop -> 对应tableData 数据的属性值 必填
* @params label -> 表头的名称 必填
* @params type -> 表格的类型 必填
    normal -> 普通类型
    input -> input输入框类型
    button -> button类型
    lookFile -> 查看文件
    buttonUpLoad ->文件上传
* @params type -> 表格的类型 必填
* @params isCenter -> 是否居中 默认为居中
* @params width -> 表格内容的宽度 默认为自适应
* @params children -> 是否为多级表头
    [{name: '', prop: '', type: '如果为定义为input类型 -》可以设置为可修改模式参数名：isChange  就是普通的div']
* @name 张宏
* @time 2021/8/28
*/
<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :align="column.isCenter === false ? 'left' : 'center'"
    :width="column.width ? column.width : 'auto'"
    :sortable="column.sortable"
  >
    <template v-if="column.children">
      <el-table-column
        v-for="item in column.children"
        :key="item.prop"
        :prop="item.prop"
        :label="item.name"
        :align="item.isCenter === false ? 'left' : 'center'"
      >
        <template slot-scope="scope">
          <div v-if="item.type === 'input'">
            <el-input-number
                v-if="scope.row['textType'] == 'number'"
                type="number"
                class="changeTableInput"
                placeholder='0'
                :controls="false" min="0"
                v-model="scope.row[item.prop]"
                :disabled="scope.row['isChange'] == true ? false : true"
                @keyup.enter.native="
                  changeSelected(
                    scope.row[item.prop],
                    item.prop,
                    item.name,
                    scope.row['typeId'])"
                @focus="
                  changeSelected(
                    scope.row[item.prop],
                    item.prop,
                    item.name,
                    scope.row['typeId']
                  )"
                @blur="
                  changeSelected(
                    scope.row[item.prop],
                    item.prop,
                    item.name,
                    scope.row['typeId']
                  )"
              ></el-input-number>
            <el-input
                v-else
                class="changeTableInput"
                v-model="scope.row[item.prop]"
                :disabled="scope.row['isChange'] == true ? false : true"
            ></el-input>
          </div>
          <div v-else>
            {{ scope.row[item.prop] }}
          </div>
        </template>
      </el-table-column>
    </template>
    <template slot="header" slot-scope="scope">
      <span>{{ column.label }}</span>
    </template>
    <template slot-scope="scope">
      <!--   index --- 序号   -->
      <div v-if="column.type === 'index'" class="indexCss">
        {{ scope.$index + 1 }}
      </div>
      <!--   normal --- 普通类型   -->
      <div v-if="column.type === 'normal'">
        <div v-if="column.isCount">
          {{ scope.row[column.isParams] * scope.row[column.isParams1] }}
        </div>
        <div v-else>{{ scope.row[column.prop] }}</div>
      </div>
      <!--   anniu --- 类型   -->
      <!--      -->
      <!-- TODO 未提交、退回：编辑、删除；已提交、审批中、审批完成、审批不通过：查看-->
      <div v-if="column.type === 'button'">
        <ButtonList
            :buttonList="column.buttonList"
            :row="scope.row"
        ></ButtonList>
      </div>
      <!--  lookFile -- 文件查看类型 -->
      <div v-if="column.type === 'lookFile'">
        <div style="color: blue; cursor: pointer">{{ scope.row[column.prop] }}</div>
      </div>
      <!--   按钮 --- 上传   -->
      <div v-if="column.type === 'buttonUpLoad'">
        <el-upload
          ref="buttonList"
          type="primary"
          size="small"
          v-for="itemButton in column.buttonList"
          :key="itemButton.id"
          :on-remove="(file, fileList)=>removeFile(file, fileList, scope.row['filetype'])"
          class="upload-demo"
          action="uploadFile/base/imageController/uploadFile"
          :on-success="(response, file, fileList)=>upLoadSuccess(response, file, fileList, scope.row['filetype'])"
          multiple
          :limit="3"
          :file-list="scope.row[column.prop]"
        >
          <el-button type="primary"> {{ itemButton.name }}</el-button>
          <!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
      </div>
      <!-- input-->
      <div v-if="column.type === 'input'">
        <el-input-number
          v-if="column['textType'] === 'number'"
          :controls="false" min="0"
          type="number"
          class="changeTableInput"
          placeholder='0'
          v-model="scope.row[column.prop]"
          @blur="changeNumber(column.isCount)"
        ></el-input-number>
        <el-input
          v-else
          class="changeTableInput"
          v-model="scope.row[column.prop]"
        ></el-input>
      </div>
      <div v-if="column.type === 'shangchuan'">
          <a
            @click="clickDownload(item.fileUrl)"
            class="fujianList"
            v-for="item in scope.row[column.prop]">
            {{item.fileName}}
          </a>
      </div>
      <div v-if="column.type === 'select'">
        <el-select v-model="scope.row[column.prop]" placeholder="请选择">
          <el-option
            v-for="itemSelect in column.options"
            :key="itemSelect.id"
            :label="itemSelect.name"
            :value="itemSelect.id">
          </el-option>
        </el-select>
      </div>
      <!-- 单选框 -->
      <!-- <div v-if="column.type === 'radio'">
        <el-radio v-model="scope.row[column.prop]"  :label="column.label"></el-radio>
      </div> -->
    </template>
  </el-table-column>
</template>

<script>
import { EventBus } from '@/common/eventbus'

// import File from '../../../common/api/fileApi'
import ButtonList from './ButtonList'
// import commonApi from '../../../common/api/commonApi'
import downFile from '@/common/downFile.js'
export default {
  name: 'table-colmun',
  components: {ButtonList},
  data () {
    return {}
  },
  methods: {
    // table内部的按钮
    changeButtton (itemButton, row) {
      EventBus.$emit('changeButttonFun', {
        itemButton: itemButton,
        row: row
      })
    },
    // 改变table列表的某一项 进行计算
    changeSelected (value, status, name, id) {
      EventBus.$emit('changeValue', {
        value: value,
        status: status,
        name: name,
        id: id
      })
    },
    // 文件上传成功
    upLoadSuccess (response, file, fileList, type) {
      EventBus.$emit('changeUpload', {
        response: response.data,
        type: type,
        name: '上传文件'
      })
    },
    removeFile (file, fileList, type) {
      EventBus.$emit('changeUploadDelete', {
        response: file.url,
        type: type,
        name: '删除文件'
      })
      // File.removeFile({
      //   fileUrl: file.url
      // }).then(
      //   res => {
      //     console.log(res)
      //   }
      // )
    },
    // 带搜素的下拉框
    remoteMethod (query) {
      EventBus.$emit('changeSelectedQuery', {
        query: query
      })
    },

    clickDownload (item) {
      console.log(item)
      downFile.downloadFile(item)
    },
    changeNumber (num) {
      if (num) {
        EventBus.$emit('changeNumber', {
          status: true
        })
      }
    }
  },
  mounted () {},
  props: {
    column: Object,
    index: String
  }
}
</script>

<style>
.changeTableInput.el-input.is-disabled .el-input__inner {
  background: none;
  border: 0px;
  color: #333;
}
.fujianList{
  color: #2379D5;
  cursor: pointer;
}
.center{
  text-align: center;
}
</style>
