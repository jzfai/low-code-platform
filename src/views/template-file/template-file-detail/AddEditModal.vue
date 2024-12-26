<template>
  <el-dialog
v-model="open" :close-on-press-escape="false" :close-on-click-modal="false" :destroy-on-close="true" :title="title" width="600px" append-to-body
      @close="cancel">
    <el-form ref="templateFileDetailRef" :model="addEditForm" label-width="120px">
      <el-form-item label="文件名" prop="name" >
        <el-input  v-model="addEditForm.name" :disabled="addEditForm.id" class="wi-250px" placeholder="文件名"/>
      </el-form-item>
      <el-form-item label="归属项目" :rules="formRules.isNotNull('请选择模板id')">
        <el-select v-model="addEditForm.templateId" placeholder="归属项目" class="wi-250px">
          <el-option
              v-for="item in templateIdOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click="chooseProject(item)"/>
        </el-select>
      </el-form-item>
<!--      <el-form-item v-if="!addEditForm.id" label="文件上传" prop="name" :rules="formRules.isNotNull('文件名不能为空')">-->
<!--        <CustomUploadVms ref="refCustomUploadVms"/>-->
<!--      </el-form-item>-->
      <el-form-item label="文件归属类型" :rules="formRules.isNotNull('请选择文件归属类型')">
        <el-select v-model="addEditForm.modelType" placeholder="文件归属类型" class="wi-250px">
          <el-option key="1" label="项目" :value="1"/>
          <el-option key="2" label="模块" :value="2"/>
          <el-option key="3" label="包" :value="3"/>
          <el-option key="4" label="配置文件" :value="4"/>
          <el-option key="5" label="通用文件" :value="5"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="[2,3,4].includes(addEditForm.modelType)" label="模块名" prop="modelName" :rules="formRules.isNotNull('模块名')">
        <el-select v-model="addEditForm.modelName" placeholder="模块名" class="wi-250px">
          <el-option
              v-for="item in modelList"
              :key="item"
              :label="item"
              :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="[3,4].includes(addEditForm.modelType)" label="源类型" prop="resourceType" :rules="formRules.isNotNull('源类型')">
        <el-select v-model="addEditForm.resourceType" placeholder="源类型" class="wi-250px">
          <el-option key="1" label="main" :value="1"/>
          <el-option key="2" label="test" :value="2"/>
          <el-option key="3" label="resource" :value="3"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="[3,4].includes(addEditForm.modelType)" label="文件名前缀" prop="fileNamePre">
        <el-input v-model="addEditForm.fileNamePre" class="wi-250px" placeholder="文件名前缀"/>
      </el-form-item>
      <el-form-item v-if="[3,4].includes(addEditForm.modelType)" label="目录" prop="packageSuffix">
        <el-input v-model="addEditForm.packageSuffix" class="wi-250px" placeholder="目录"/>
      </el-form-item>
      <el-form-item v-if="[3,4].includes(addEditForm.modelType)" label="是否注入基础名" prop="injectBasicName">
        <el-select v-model="addEditForm.injectBasicName" placeholder="是否注入基础名" class="wi-250px">
          <el-option key="1" label="是" :value="1"/>
          <el-option key="0" label="否" :value="0"/>
        </el-select>
      </el-form-item>

      <el-form-item label="文件生效" prop="injectBasicName">
        <el-select v-model="addEditForm.status" placeholder="请选择文件生效" class="wi-250px">
          <el-option key="1" label="是" :value="1"/>
          <el-option key="0" label="否" :value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="addEditForm.remark" type="textarea" class="wi-250px" placeholder="目录"/>
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
import {ElMessage} from 'element-plus'
import CustomUploadVms from './CustomUploadVms.vue'
import {
  getTemplateFileDetail,
  templateIdReq,
  updateTemplateFileDetail
} from '@/api/templateFileDetail'
import {resetData, reshowData} from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const templateFileDetailRef = ref('')
const open = ref(false)
const title = ref('新增templateFile')
const emits = defineEmits([])
const addEditForm = reactive({
  id: "",
  name: "",
  modelType: 1,
  remark: "",
  fileNamePre: "",
  injectBasicName: 1,
  status:1,
  packageSuffix: "",
  resourceType:1,
  templateId: null,
  modelName: "",
})
const formString = JSON.stringify(addEditForm)
// const refCustomUploadVms = ref()
const submitForm = () => {
  templateFileDetailRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.id !== '') {
        updateTemplateFileDetail(addEditForm).then(() => {
          ElMessage({message: '修改成功', type: 'success'})
          open.value = false
          emits('getList')
        })
      } else {
        // const formData = new FormData()
        // //const fileArr = refCustomUploadVms.value.returnData()
        // //获取parent中的json数据
        // formData.append('templateFileDetail', JSON.stringify(addEditForm))
        // formData.append('modelId', addEditForm.templateId)
        // formData.append('file', fileArr[0])
        insertReq(addEditForm)
      }
    }
  })
}
//选择项目
const chooseProject=(item)=>{
  modelList.value=item?.modelList||[]
}

const insertReq = (formData) => {
  return axiosReq({
    url: 'generator/templateFileDetail',
    data: formData,
    method: 'post',
    bfLoading: true
    // isUploadFile: true
  }).then(() => {
    open.value = false
    emits('getList')
    //routerBack()
  })
}
/** 取消按钮 */
const cancel = () => {
  open.value = false
  resetData(addEditForm, formString)
}

const modelList=ref({})
const showModal = (row) => {
  if (row.id) {
    getTemplateFileDetail(row.id).then(({data}) => {
      reshowData(addEditForm, data)
      //edit modal
      title.value = '编辑'
    })
  }
  if(row.modelList){
    modelList.value=JSON.parse(row.modelList)
  }
  //回显templateId
  if(row.templateId){
    addEditForm.templateId=Number.parseInt(row.templateId)
  }

  title.value = '新增'
  open.value = true
}
const templateIdOptions = ref([])
const getTemplateFileDetailData = () => {
  templateIdReq().then(({data}) => {
    templateIdOptions.value = data
  })
}

onMounted(() => {
  getTemplateFileDetailData()
})
//导出给refs使用
defineExpose({cancel, showModal})
</script>

<style scoped lang="scss"></style>
