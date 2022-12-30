<template>
  <div class="project-page-style">
    <FoldingCard :title="isEdit ? '编辑' : '新增'">
      <el-form ref="refForm" label-width="150px" :inline="false" :model="subForm">
        <el-form-item label="品牌名称" prop="name" :rules="formRules.isNotNull('品牌名称不能为空')">
          <el-input v-model="subForm.name" class="wi-150px" placeholder="品牌名称" />
        </el-form-item>
        <el-form-item label="品牌图片地址" prop="image" :rules="formRules.isNotNull('请先上传品牌图片地址')">
          <div class="rowSE">
            <img v-if="subForm.image" :src="subForm.image" class="wi-120px h-120px" style="border-radius: 6px" />
            <div :class="[subForm.image && 'ml-10px']" class="rowSS">
              <el-button type="primary" @click="imageUploadFile">
                <i class="el-icon-upload2" />
                上传
                <input
                  id="uploadFile"
                  ref="imageRef"
                  type="file"
                  accept=".png, .jpg"
                  style="display: none"
                  @change="imageUploadSave"
                />
              </el-button>
              <div class="ml-1">{{ chooseFileName }}</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="品牌的首字母" prop="letter" :rules="formRules.isNotNull('品牌的首字母不能为空')">
          <el-input v-model="subForm.letter" class="wi-150px" placeholder="品牌的首字母" />
        </el-form-item>
        <el-form-item label="排序" prop="seq" :rules="formRules.isNotNull('排序不能为空')">
          <el-input v-model="subForm.seq" class="wi-150px" placeholder="排序" />
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

<script setup lang="ts" name="BrandAddEdit">
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
    url: '/basis-func/brand/selectById',
    data: { id },
    method: 'get'
  })
}
onMounted(() => {})
/*新增和更新*/
let subForm = reactive({
  id: '',
  name: '',
  image: '',
  letter: '',
  seq: ''
})
const refForm = $ref(null)
const confirmBtnClick = () => {
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
const insertReq = () => {
  const data = JSON.parse(JSON.stringify(subForm))
  delete data.id
  axiosReq({
    url: '/basis-func/brand/insert',
    data,
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
    url: '/basis-func/brand/updateById',
    data: subForm,
    method: 'put',
    bfLoading: true
  }).then(() => {
    elMessage('更新成功')
    routerBack()
  })
}
/*4.上传文件*/
const imageRef = $ref(null)
//上传图片方法
const imageUploadFile = () => {
  imageRef.click()
}
const imageUploadSave = async () => {
  const { fileUrl } = await fileUpload(imageRef)
  subForm.image = fileUrl
}

const { reshowData, fileUpload, chooseFileName, handleCancel, formRules } = useForm(subForm)
</script>

<style scoped lang="scss"></style>
