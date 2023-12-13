<template>
  <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      title="根据文档填入"
      width="800px"
      append-to-body
      :before-close="handleClose"
  >
    <div class="h-680px">
      <div class="mb-10px rowSC">
        <div>保存文件名：</div>
        <el-input v-model="saveFileName" class="wi-400px">保存文件名字</el-input>
      </div>
      <json-editor-vue
          v-model="jsonData" :mode-list="couldView" style="height: 650px"
          :current-mode="'code'"
          @update:modelValue="updateModelValue"/>

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
import {ElMessageBox} from 'element-plus'

//1.导入json-editor-vue3
//2.定义修改的json字段的值,
const couldView = ref(["tree", "code", "form", "view"])

const jsonData = ref()
const updateModelValue = (val) => {
  jsonData.value = val
}

const dialogVisible = ref(false)
const handleClose = () => {
  ElMessageBox.confirm('退出将清空您配置的数据').then(() => {
    resetData()
    dialogVisible.value = false
  })
}

let saveFileId = null
const showModal = (row) => {
  const {id, name, generatorConfig} = row || {}
  if (id) {
    saveFileId = id
  }
  if (name) {
    saveFileName.value = name
  }
  if (generatorConfig) {
    jsonData.value = JSON.parse(generatorConfig)
  }
  dialogVisible.value = true
}
const confirmBtnClick = () => {
  if (saveFileId) {
    updateTmp()
  } else {
    saveTmp()
  }
  dialogVisible.value = false
}

//保存模板
const saveFileName = ref('')
const emits = defineEmits(["reloadPage"])
const saveTmp = async () => {
  const reqConfig = {
    url: '/generator/configSave',
    method: 'post',
    data: {
      name: `${saveFileName.value}-custom`,
      generatorConfig: JSON.stringify(jsonData.value)
    }
  }
  axiosReq(reqConfig).then(() => {
    resetData()
    elMessage('配置保存成功')
    emits("reloadPage")
  })
}

//更新模板
const updateTmp = async () => {
  const reqConfig = {
    url: '/generator/configSave',
    method: 'put',
    data: {
      id: saveFileId,
      name: `${saveFileName.value}`,
      generatorConfig: JSON.stringify(jsonData.value)
    }
  }
  axiosReq(reqConfig).then(() => {
    elMessage('更新成功')
    resetData()
    emits("reloadPage")
  })
}

const resetData=()=>{
  saveFileName.value = ""
  jsonData.value = {}
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
