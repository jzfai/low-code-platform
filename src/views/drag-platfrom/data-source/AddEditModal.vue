<template>
  <!-- 添加或修改${basicConfig.modalName}配置对话框 -->
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
    <el-form ref="dataSourceRef" :model="addEditForm" label-width="80px">
      <el-form-item label="字典名称" prop="dictName" :rules="formRules.isNotNull('字典名称不能为空')">
        <el-input v-model="addEditForm.dictName" class="wi-400px" placeholder="字典名称" />
      </el-form-item>
      <el-form-item label="字典描述" prop="name" :rules="formRules.isNotNull('字典描述不能为空')">
        <el-input v-model="addEditForm.name" class="wi-400px" placeholder="字典描述" />
      </el-form-item>
      <el-form-item label="平台名称" prop="platName" :rules="formRules.isNotNull('平台名称不能为空')">
        <el-input v-model="addEditForm.platName" class="wi-400px" placeholder="平台名称" />
      </el-form-item>
      <el-form-item label="数据源" prop="dataSource" :rules="formRules.isNotNull('数据源不能为空')">
        <el-input v-model="addEditForm.dataSource" type="textarea" rows="10" class="wi-400px" placeholder="数据源" />
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
import { addDataSource, getDataSource, updateDataSource } from '@/api/dataSource'
import { resetData, reshowData } from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const dataSourceRef = ref('')
const open = ref(false)
const title = ref('新增${basicConfig.modalName}')
const emits = defineEmits([])
const addEditForm = reactive({
  id: '',
  dictName: '',
  platName: '',
  name: '',
  dataSource: ''
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  dataSourceRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.id !== '') {
        updateDataSource(addEditForm).then(() => {
          ElMessage({ message: '修改成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      } else {
        addDataSource(addEditForm).then(() => {
          ElMessage({ message: '新增成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      }
    }
  })
}
/** 取消按钮 */
const cancel = () => {
  open.value = false
  resetData(addEditForm, formString)
}
const showModal = (row) => {
  if (row.id) {
    getDataSource(row.id).then(({ data }) => {
      reshowData(addEditForm, data)
      //edit modal
      title.value = '编辑'
    })
  }
  title.value = '新增'
  open.value = true
}
onMounted(() => {})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
