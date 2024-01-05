<template>
  <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      title="根据文档填入"
      width="800px"
      append-to-body
      :before-close="handleClose"
  >
    <div>
      <el-input v-model="swaggerApi" placeholder="文档路径"/>
      <div class="rowSS mt-10px">
        <el-input v-model="apiPath" placeholder="接口路径" class="wi-300px mr-10px"/>
        <el-input v-model="method" placeholder="接口方法" class="wi-80px mr-20px"/>
        <el-button type="primary" @click="generatorCode">生成</el-button>
      </div>

      <!--  请求字段   -->
      <RequestParams ref="refRequestParams"/>
      <!--  响应字段   -->
      <ResponseParams ref="refResponseParams"/>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirmBtnClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import {ElMessageBox} from 'element-plus'
import RequestParams from "./RequestParams.vue"
import ResponseParams from "./ResponseParams.vue"
import {dillSwagger3ByParams} from "@/hooks/use-swagger-analysis";

const dialogVisible = ref(false)
const handleClose = () => {
  ElMessageBox.confirm('退出将清空您配置的数据').then(() => {
    dialogVisible.value = false
  })
}
const showModal = (tableArr) => {
  if (tableArr?.length) {
    const objValue = {}
    tableArr.forEach((fItem) => {
      objValue[fItem.columnName] = fItem.columnComment
    })
    // textareaValue.value = JSON.stringify(objValue)
  }

  dialogVisible.value = true
}
const emits = defineEmits(['emitCICConfirm'])

const confirmBtnClick = () => {
  emits('emitCICConfirm',{
    requestParams:refRequestParams.value.getData(),
    responseParams:refResponseParams.value.getData(),
    swaggerApiConfig:swaggerApiConfig.value
  })
  dialogVisible.value = false
}

const swaggerApi=ref("https://github.jzfai.top/v3/api-docs/system")
const apiPath=ref("/system/platform/list")
const method=ref("post")
const refRequestParams = ref()
const refResponseParams = ref()
const swaggerApiConfig = ref()
const generatorCode = () => {
  axios.get(swaggerApi.value).then(({data}) => {
    let swaggerData
    if(swaggerApi.value.includes("v3/api-docs")){
      swaggerData = dillSwagger3ByParams(data,apiPath.value,method.value);

    }else{
      swaggerData = dillSwaggerByParams(data,apiPath.value,method.value);
    }
    const {requestBody,responses}=swaggerData
    //请求字段
    refRequestParams.value.setData(requestBody)
    refResponseParams.value.setData(responses)
    swaggerApiConfig.value=swaggerData
  })
}
defineExpose({showModal})
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.modal-style {
  width: 1000px !important;
  min-height: 500px;
}
</style>
