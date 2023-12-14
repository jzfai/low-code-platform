<template>
  <div class="project-page-style">
    <FoldingCard :title="isEdit ? '编辑' : '新增'">
      <el-form ref="refForm" label-width="150px" :inline="false" :model="subForm">
        <el-form-item label="文件存储名" prop="name" :rules="formRules.isNotNull('文件存储名不能为空')">
          <el-input v-model="subForm.name" class="wi-300px" placeholder="文件存储名" />
        </el-form-item>
        <el-form-item label="文件数组" prop="fileArr" :rules="formRules.isNotNull('请先上传文件数组')">
          <div class="rowSE">
            <div v-if="isEdit">
              <el-select
                  v-model="subForm.fileOprArr"
                  multiple
                  filterable
                  allow-create
                  class="wi-500px"
                  default-first-option
                  :reserve-keyword="false"
                  placeholder="Choose tags for your article"
              >
                <el-option
                    v-for="item in fileShowArr"
                    :key="item"
                    :label="item"
                    :value="item"
                />
              </el-select>
            </div>
            <CustomUploadVms v-else ref="refCustomUploadVms" />
          </div>
        </el-form-item>
      </el-form>
      <div class="footer-btn columnCC">
        <div class="rowSS">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="confirmBtnClick">确定</el-button>
        </div>
      </div>
    </FoldingCard>
  </div>
</template>

<script setup lang="ts">
import CustomUploadVms from './CustomUploadVms.vue'
/*回显数据*/
const { isEdit, id } = getQueryParam() || {}
const fileShowArr = ref()

onMounted(async () => {
  if (isEdit) {
    const { data } = await getDetailByIdReq(id)
    fileShowArr.value = JSON.parse(data.fileArr)
    subForm.fileOprArr = JSON.parse(data.fileArr)
    reshowData(data, subForm)
  }
})

//获取详情数据
const getDetailByIdReq = (id) => {
  return axiosReq({
    url: `/generator/templateFile/${id}`,
    method: 'get'
  })
}
/*新增和更新*/
const subForm = reactive({
  id: '',
  name: '',
  fileArr: '',
  fileOprArr:[]
})
const refForm = ref()
const refCustomUploadVms = ref()
const confirmBtnClick = () => {
  //获取上传文件
  let fileArr = []
  if (!isEdit) {
    fileArr = refCustomUploadVms.value.returnData()
    subForm.fileArr = JSON.stringify(fileArr)
  }

  refForm.value.validate((valid) => {
    if (valid) {
      if (subForm.id) {
        subForm.fileArr=JSON.stringify(subForm.fileOprArr)
        updateReq()
      } else {
        const formData = new FormData()
        fileArr.forEach((fItem) => {
          formData.append('file', fItem)
        })
        //获取parent中的json数据
        formData.append('name', subForm.name)
        formData.append('id', subForm.id)
        insertReq(formData)
      }
    } else {
      return false
    }
  })
}
const insertReq = (formData) => {
  const data = JSON.parse(JSON.stringify(subForm))
  delete data.id
  axiosReq({
    url: '/generator/templateFile/saveTemplateFile',
    data: formData,
    method: 'post',
    bfLoading: true,
    isUploadFile: true
  }).then(() => {
    elMessage('保存成功')
    routerBack()
  })
}
//更新
let updateReq = () => {
  return axiosReq({
    url: '/generator/templateFile',
    data: subForm,
    method: 'put',
    bfLoading: true
  }).then(() => {
    elMessage('更新成功')
    routerBack()
  })
}
const { reshowData, handleCancel, formRules } = useForm(subForm)
</script>

<style scoped lang="scss"></style>
