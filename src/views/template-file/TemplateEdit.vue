<template>
  <!-- 添加或修改模板文件修改配置对话框 -->
  <el-dialog
    v-model="open"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :title="title"
    width="600px"
    append-to-body
    @close="cancel"
  >
    <el-form ref="templateFileRef" :model="addEditForm" label-width="100px">
      <el-form-item label="模板文件名" prop="fileName" :rules="formRules.isNotNull('模板名不能为空')">
        <el-input v-model="addEditForm.fileName" class="wi-150px" placeholder="模板名" />
      </el-form-item>
      <el-form-item label="配置名" prop="name" :rules="formRules.isNotNull('模板配置名不能为空')">
        <el-input v-model="addEditForm.name" disabled class="wi-150px" placeholder="模板配置名" />
      </el-form-item>
      <el-form-item label="文件数组" prop="fileArr" :rules="formRules.isNotNull('文件数组不能为空')">
        <el-input v-model="addEditForm.fileArr" disabled class="wi-300px" placeholder="文件数组" />
      </el-form-item>
      <el-form-item label="模板内容" prop="code" :rules="formRules.isNotNull('模板内容不能为空')">
        <el-input v-model="addEditForm.code" autosize type="textarea" row="10" placeholder="模板内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { resetData } from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const templateFileRef = ref('')
const open = ref(false)
const title = ref('新增模板文件修改')
const emits = defineEmits([])
const addEditForm = reactive({
  fileName: '',
  fileIndex: 0,
  code: '',
  id: '',
  name: '',
  fileArr: ''
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  templateFileRef.value.validate((valid) => {
    if (valid) {
      addEditForm.fileArr[addEditForm.fileIndex] = addEditForm.fileName
      const subData = JSON.parse(JSON.stringify(addEditForm))
      subData.fileArr = JSON.stringify(subData.fileArr)
      updateTemplateFile(subData).then(() => {
        ElMessage({ message: '修改成功', type: 'success' })
        open.value = false
        emits('getList')
      })
    }
  })
}
/**/
const updateTemplateFile = (addEditForm) => {
  return axiosReq({
    url: 'basis-func/templateFile/changeTemplateFile',
    data: addEditForm,
    method: 'post'
  })
}
const readFileToStringByFileName = (data) => {
  return axiosReq({
    url: 'basis-func/templateFile/readFileToStringByFileName',
    method: 'post',
    params: data
  })
}
/** 取消按钮 */
const cancel = () => {
  open.value = false
  resetData(addEditForm, formString)
}
const showModal = (row) => {
  if (row.id) {
    reshowData(addEditForm, row)
    //查询模板数据
    readFileToStringByFileName({ id: row.id, fileName: row.fileName }).then(({ data }) => {
      addEditForm.code = data
    })
    if (addEditForm.fileArr) {
      addEditForm.fileArr = JSON.parse(addEditForm.fileArr)
    }
    //edit modal
    title.value = '编辑模板文件修改'
  }
  open.value = true
}
const reshowData = (addEditForm, detailData) => {
  Object.keys(addEditForm).forEach((fItem) => {
    if (detailData[fItem]) {
      addEditForm[fItem] = detailData[fItem]
    }
  })
}
onMounted(() => {})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
