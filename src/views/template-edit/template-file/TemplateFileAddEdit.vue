<template>
  <div class="project-page-style">
    <FoldingCard :title="isEdit ? '编辑' : '新增'">
      <el-form ref="refForm" label-width="150px" :inline="false" :model="subForm">
        <el-form-item label="文件存储名" prop="name" :rules="formRules.isNotNull('文件存储名不能为空')">
          <el-input v-model="subForm.name" class="w-300px" placeholder="文件存储名" />
        </el-form-item>
        <el-form-item label="文件数组" prop="fileArr" :rules="formRules.isNotNull('请先上传文件数组')">
          <div class="rowSE">
            <img v-if="subForm.fileArr" :src="subForm.fileArr" class="w-120px h-120px" style="border-radius: 6px" />
            <div :class="[subForm.fileArr && 'ml-10px']" class="rowSS">
              <el-button type="primary" @click="fileArrUploadFile">
                <i class="el-icon-upload2" />
                上传
                <input
                  id="uploadFile"
                  ref="fileArrRef"
                  type="file"
                  accept=".png, .jpg"
                  style="display: none"
                  @change="fileArrUploadSave"
                />
              </el-button>
              <div class="ml-1">{{ chooseFileName }}</div>
            </div>
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
import useForm from '@/hooks/global/useForm'
const { getQueryParam, routerBack } = useVueRouter()
/*回显数据*/
const { isEdit, row } = getQueryParam()
if (isEdit) {
  onBeforeMount(async () => {
    const { data } = await getDetailByIdReq(row.id)
    reshowData(data, subForm)
  })
}
//获取详情数据
const getDetailByIdReq = (id) => {
  return axiosReq({
    url: '/basis-func/templateFile/selectById',
    data: { id },
    method: 'get'
  })
}
onMounted(() => {})
/*新增和更新*/
let subForm = reactive({
  id: '',
  name: '',
  fileArr: ''
})
const refForm = $ref(null)
let confirmBtnClick = () => {
  refForm.validate((valid) => {
    if (valid) {
      if (subForm.id) {
        updateReq()
      } else {
        insertReq()
      }
    } else {
      return false
    }
  })
}
const { elMessage } = useElement()
const insertReq = () => {
  const data = JSON.parse(JSON.stringify(subForm))
  delete data.id
  axiosReq({
    url: '/basis-func/templateFile/insert',
    data: data,
    method: 'post',
    bfLoading: true
  }).then(() => {
    elMessage('保存成功')
    routerBack()
  })
}
//更新
let updateReq = () => {
  return axiosReq({
    url: '/basis-func/templateFile/updateById',
    data: subForm,
    method: 'put',
    bfLoading: true
  }).then(() => {
    elMessage('更新成功')
    routerBack()
  })
}
/*4.上传文件*/
const fileArrRef = $ref(null)
const fileArrUploadFile = () => {
  fileArrRef.click()
}
const fileArrUploadSave = async () => {
  let { fileUrl } = await fileUpload(fileArrRef)
  subForm.fileArr = fileUrl
}

const { reshowData, fileUpload, chooseFileName, handleCancel, formRules } = useForm(subForm)
</script>

<style scoped lang="scss"></style>
