<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    title="根据文档输入字段生成"
    width="800px"
    :before-close="handleClose"
  >
    <div class="h-680px">
     <div class="mb-10px rowSC">
       <div>保存文件名：</div>
       <el-input v-model="saveFileName" class="wi-400px">保存文件名字</el-input>
     </div>
      <json-editor-vue  v-model="jsonData" :mode-list="couldView" style="height: 650px"
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
import { ElMessageBox } from 'element-plus'

//1.导入json-editor-vue3
//2.定义修改的json字段的值,
const couldView = ref(["tree", "code", "form", "view"])

let jsonData=$ref({name:"test"})
const updateModelValue = (val) => {
  jsonData=val
}

let dialogVisible = $ref(false)
const handleClose = () => {
  ElMessageBox.confirm('退出将清空您配置的数据').then(() => {
    dialogVisible = false
  })
}

let saveFileId=null
const showModal = (row) => {
  const {id,name,generatorConfig}=row||{}
  if(id){
    saveFileId=id
  }
  if(name){
    saveFileName=name
  }
  if(generatorConfig){
    jsonData=JSON.parse(generatorConfig)
  }
  dialogVisible = true
}
const confirmBtnClick = () => {
  if(saveFileId){
    updateTmp()
  }else{
    saveTmp()
  }
  dialogVisible = false
}

//保存模板
let saveFileName = $ref('')
const emits=defineEmits(["reloadPage"])
const saveTmp = async () => {
  const reqConfig = {
    url: '/basis-func/configSave/insert',
    method: 'post',
    data: {
      name: `${saveFileName}-custom`,
      generatorConfig: JSON.stringify(jsonData)
    }
  }
  axiosReq(reqConfig).then(() => {
    elMessage('配置保存成功')
    emits("reloadPage",jsonData)
  })
}

//更新模板
const updateTmp = async () => {
  const reqConfig = {
    url: '/basis-func/configSave/updateById',
    method: 'put',
    data: {
      id: saveFileId,
      name: `${saveFileName}`,
      generatorConfig: JSON.stringify(jsonData)
    }
  }
  axiosReq(reqConfig).then(() => {
    elMessage('更新成功')
    emits("reloadPage")
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
