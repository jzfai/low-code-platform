<template>
  <el-dialog v-model="dialogVisible" title="根据文档填入" width="800px" append-to-body :before-close="handleClose">
    <div>
      <div class="mb-10px">文档路径(swagger文件打开f12查看接口路径，需要支持跨域)</div>
      <div class="rowSS">
        <el-input v-model="swaggerApi" placeholder="文档路径" />
        <el-button class="ml-10px" @click="parseDoc">解析</el-button>
      </div>
      <div class="rowSS mt-10px">
        <el-select v-model="swaggerApiKey" filterable placeholder="选择api接口">
          <el-option
            v-for="(value, key) in swaggerData"
            :key="key"
            :label="`${value.summary}-${key}-${value.method}`"
            :value="`${key}-${value.method}`"
            @click="generatorCode(value, value)"
          />
        </el-select>
      </div>
      <!--  请求字段   -->
      <RequestParams ref="refRequestParams" />
      <!--  响应字段   -->
      <ResponseParams ref="refResponseParams" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearData">清空</el-button>
        <el-button type="primary" @click="confirmBtnClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import RequestParams from './RequestParams.vue'
import ResponseParams from './ResponseParams.vue'
import { dillSwagger3ByParams, dillSwagger3ToUse, dillSwaggerToUse } from '@/hooks/use-swagger-analysis'

/*  data */
const swaggerApi = ref('https://github.jzfai.top/v3/api-docs/common')
const swaggerApiKey = ref()
const method = ref('post')
const refRequestParams = ref()
const refResponseParams = ref()
const swaggerApiConfig = ref()
const dialogVisible = ref(false)

const handleClose = () => {
  dialogVisible.value = false
}

const clearData = () => {
  ElMessageBox.confirm('退出将清空您配置的数据').then(() => {
    refRequestParams.value.clearData()
    refRequestParams.value.clearData()
    dialogVisible.value = false
    swaggerData.value = []
    swaggerApiKey.value = ''
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
  emits('emitCICConfirm', {
    requestParams: refRequestParams.value.getData(),
    responseParams: refResponseParams.value.getData(),
    swaggerApiConfig: swaggerApiConfig.value
  })
  dialogVisible.value = false
}

const generatorCode = (value, { requestParams, responses }) => {
  console.log(requestParams, responses)
  refRequestParams.value.clearData()
  refRequestParams.value.clearData()

  //请求字段
  if (requestParams?.length) {
    refRequestParams.value.setData(requestParams)
  }
  //请求字段
  if (responses?.length) {
    refResponseParams.value.setData(responses)
  }
  swaggerApiConfig.value = {}
}

/*  onMounted  */
onMounted(() => {
  parseDoc()
})

const swaggerData = ref({})
const parseDoc = () => {
  axios.get(swaggerApi.value).then(({ data }) => {
    if (swaggerApi.value.includes('v3/api-docs')) {
      swaggerData.value = dillSwagger3ToUse(data)
      console.log('swaggerData', swaggerData.value)
    } else {
      swaggerData.value = dillSwaggerToUse(data)
    }
  })
}

defineExpose({ showModal })
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
