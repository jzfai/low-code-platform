<template>
  <div class="project-page-style">
    <FoldingCard :title="isEditRef ? '编辑' : '新增'">
      <el-form ref="refForm" label-width="150px" :inline="false" :model="subForm">
        <el-form-item label="项目名" prop="name" :rules="formRules.isNotNull('项目名不能为空')">
          <el-input v-model="subForm.name" class="wi-300px" placeholder="项目名" />
        </el-form-item>
        <el-form-item label="基础包名" prop="originPackage" :rules="formRules.isNotNull('基础包名不能为空')">
          <el-input  v-model="subForm.originPackage" class="wi-300px" placeholder="基础包名" />
        </el-form-item>
        <el-form-item label="模块数组"  prop="modelList" :rules="formRules.isNotNull('模块数组不能为空')">
          <el-select
              v-model.trim="subForm.modelList"
              multiple
              :row="2"
              filterable
              allow-create
              class="wi-300px"
              default-first-option
              placeholder="输入回车创建">
            <el-option
                v-for="item in subForm.modelList"
                :key="item"
                :label="item"
                :value="item"/>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="文件数组" prop="fileArr" :rules="formRules.isNotNull('请先上传文件数组')">-->
<!--          <div class="rowSE">-->
<!--            <div >-->
<!--              <el-select-->
<!--                  v-model="subForm.fileOprArr"-->
<!--                  multiple-->
<!--                  filterable-->
<!--                  allow-create-->
<!--                  class="wi-500px"-->
<!--                  default-first-option-->
<!--                  :reserve-keyword="false"-->
<!--                  placeholder="Choose tags for your article"-->
<!--              >-->
<!--                <el-option-->
<!--                    v-for="item in fileShowArr"-->
<!--                    :key="item"-->
<!--                    :label="item"-->
<!--                    :value="item"-->
<!--                />-->
<!--              </el-select>-->
<!--            </div>-->
<!--            <CustomUploadVms v-else ref="refCustomUploadVms" />-->
<!--          </div>-->
<!--        </el-form-item>-->

        <el-form-item label="项目类型" prop="projectType" :rules="formRules.isNotNull('请选择项目类型')">
          <el-select v-model="subForm.projectType" placeholder="请选择项目类型"  class="wi-250px">
            <el-option :key="1"  label="前端项目" :value="1"/>
            <el-option :key="2"  label="基础层" :value="2"/>
            <el-option :key="3"  label="应用层" :value="3"/>
          </el-select>
        </el-form-item>


        <el-form-item v-if="[3].includes(subForm.projectType)" label="基础层(绑定)" prop="baseLayerId" :rules="formRules.isNotNull('请选择基础层')">
          <el-select v-model="subForm.baseLayerId" placeholder="请选择绑定基础层"  class="wi-250px">
            <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                @click="chooseProject(item)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="接口规则"  prop="apiConfig" :rules="formRules.isNotNull('请求接口规则不能为空')">
           <div class="wi-500px">
             <json-editor-vue  v-model="subForm.apiConfig" :mode-list="couldView" style="height: 300px" :current-mode="'code'"/>
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

const couldView = ref(["tree", "code", "form", "view"])
/*回显数据*/
const isEditRef=ref(false)
const fileShowArr = ref()
onMounted(async () => {
  const { isEdit, id } = getQueryParam() || {}
  isEditRef.value=false
  if (isEdit==="true") {
    isEditRef.value=true
    const { data } = await getDetailByIdReq(id)
    // fileShowArr.value = JSON.parse(data.fileArr)
    // subForm.fileOprArr = JSON.parse(data.fileArr)
    if(data.apiConfig){
      data.apiConfig=JSON.parse(data.apiConfig)
    }
    reshowData(data, subForm)
    subForm.modelList=JSON.parse(data.modelList)
    subForm.baseLayerId=Number.parseFloat(data.baseLayerId)

  }
  getProjectList()
})

//获取详情数据
const getDetailByIdReq = (id) => {
  return axiosReq({
    url: `/generator/templateFile/${id}`,
    method: 'get'
  })
}
/*新增和更新*/
const subForm:any = reactive({
  id: '',
  name: '',
  fileArr: '',
  apiConfig:"",
  projectType: '1',
  baseLayerId: null,
  baseLayerInfo: "",
  originPackage: [],
  modelList: [],
  fileOprArr:[]
})
const refForm = ref()
const confirmBtnClick = () => {
  //获取上传文件
  // let fileArr = []
  // if (isEditRef.value) {
  //   fileArr = refCustomUploadVms.value.returnData()
  //   subForm.fileArr = JSON.stringify(fileArr)
  // }
  const subData=JSON.parse(JSON.stringify(subForm))
  subData.modelList=JSON.stringify(subData.modelList.map(m=>m.replace(/\s*/g, "")))
  refForm.value.validate((valid) => {
    if (valid) {
      if (subForm.id) {
        // subForm.fileArr=JSON.stringify(subForm.fileOprArr)
        updateReq(subData)
      } else {
        // const formData = new FormData()
        // fileArr.forEach((fItem) => {
        //   formData.append('file', fItem)
        // })
        insertReq(subData)
      }
    } else {
      return false
    }
  })
}

//选择了project项目
const chooseProject=(item)=>{
  subForm.baseLayerInfo=JSON.stringify(item)
}

const insertReq = (data) => {
  delete data.id
  data.apiConfig=JSON.stringify(data.apiConfig)
  axiosReq({
    url: '/generator/templateFile/saveTemplateFile',
    data,
    method: 'post',
    bfLoading: true,
    isUploadFile: true
  }).then(() => {
    elMessage('保存成功',"success")
    routerBack()
  })
}
//更新
let updateReq = (data) => {
  data.apiConfig=JSON.stringify(data.apiConfig)
  return axiosReq({
    url: '/generator/templateFile',
    data,
    method: 'put',
    bfLoading: true
  }).then(() => {
    elMessage('更新成功',"success")
    routerBack()
  })
}

const projectList=ref()
const getProjectList=()=>{
  axiosReq({
    url: '/generator/templateFile/selectTemplateFileAll',
    method: 'get',
    params:{projectType:2}
  }).then(({data}) => {
    projectList.value=data
  })
}

const { reshowData, handleCancel, formRules } = useForm(subForm)
</script>

<style scoped lang="scss"></style>
