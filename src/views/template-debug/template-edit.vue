<template>
  <div class="project-page-style scroll-y">
    <!-- 导入文件部分   -->
    <FoldingCard title="基础模板和数据配置">
      <div class="rowSS mb-10px">
        <el-select v-model="chooseTmpFile" filterable placeholder="选择项目" class="w-200px mr-10px">
          <el-option
              v-for="item in templateFileData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click="chooseTemplateFile(item)"
          />
        </el-select>
        <el-select v-model="chooseConfig" filterable placeholder="选择数据" class="w-200px">
          <el-option
            v-for="item in configList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click="reshowConfig(item)"
          />
        </el-select>
        <el-button class="ml-20px" type="primary" @click="editJson">修改json数据</el-button>
        <el-button class="ml-20px"  type="primary" @click="templateFileReq">刷新项目</el-button>
        <el-button class="ml-20px"  type="primary" @click="getSaveTmp">刷新数据</el-button>
        <el-button class="ml-20px"  type="primary" @click="generatorBaseModelTemp">导出代码</el-button>
      </div>
      <div class="rowSC" style="flex-wrap: wrap">
        <el-button v-for="(item, index) in chooseTemplateFileArr" :key="index" class="mb-10px" style="margin-left: 0px; margin-right: 12px"  :type="chooseFileItem.id===item.id&&'warning'" @click="choseFileClick(item)">
          <span v-if="item.modelType===5">{{item.modelName}}/{{ item.name }}({{chooseTemplateItem.id}},{{item.id}})</span>
          <span v-else>{{item.modelName}}/{{ item.name }}({{item.remark}})</span>

        </el-button>
      </div>
    </FoldingCard>
    <div class="rowSC">
      <InputCode ref="refInputCode" />
      <el-button class="ml-4px mr-4px" @click="generatorOutputCode">生成</el-button>
      <OutputCode ref="refOutPutCode" />
    </div>
    <!--  新增配置数据-->
    <CustomJsonInput ref="refCustomJsonInput" @reloadPage="saveModal" />
  </div>
</template>

<script setup lang="ts">
import InputCode from './InputCode.vue'
import OutputCode from './OutputCode.vue'
import { downLoadTempByApi } from '@/hooks/use-common'
import {getConfigSaveDetail} from "@/api/basic";
//获取模板
onMounted(() => {
  //getSaveTmp()
 templateFileReq()
})

let configItem:any = {}
const reshowConfig = (item) => {
  configItem = item
  // tmpJsonData.value = JSON.parse(item.generatorConfig)
}

//查询模板
const configList = ref([])
const chooseConfig = ref('')

//查询配置模版
const templateFileData = ref([])
const chooseTmpDetailFile=ref()
const templateFileReq = () => {
  const reqConfig = {
    url: '/generator/templateFile/listPage',
    method: 'get',
    data: { pageSize: 500, pageNum: 1 }
  }
  axiosReq(reqConfig).then(({ data }) => {
    templateFileData.value = data
    templateFileDetailData.value = []
    chooseTmpDetailFile.value = ""
  })
}

const templateFileDetailData=ref()
const templateDetailFileReq = (data) => {
  const reqConfig = {
    url: '/generator/templateFileDetail/selectTemplateFileDetailAll',
    method: 'post',
    data
  }

  axiosReq(reqConfig).then(({ data }) => {
    chooseTemplateFileArr.value = data
  })
}
const chooseTemplateItem:any = ref()
const chooseTemplateFileArr = ref([])
const chooseTmpFile = ref('')

//选择模块后操作
const chooseTemplateFile = (item) => {
  chooseTemplateItem.value = item



  //去请求文件
  templateDetailFileReq({templateId:item.id})


  //获取数据
  chooseConfig.value=""
  getSaveTmp(item.id)
}
//请求后端返回文件数据
const chooseFileItem:any = ref({})
const choseFileClick = (item) => {
  chooseFileItem.value = item

  const reqConfig = {
    url: '/generator/templateFile/readFileToStringByFileName',
    method: 'get',
    params: { fileName: item.name, fileId: item.id,modelId:chooseTemplateItem.value.id }
  }

  axiosReq(reqConfig).then(({ data }) => {
    refInputCode.value.setCode(data)
  })
}

//保存数据
const saveModal = () => {
  getSaveTmp()
}
const getSaveTmp = (name?) => {
  const reqConfig = {
    url: '/generator/configSave/listPage',
    method: 'get',
    bfLoading: true,
    data: { pageSize: 300, pageNum: 1,name}
  }
  axiosReq(reqConfig).then(({ data }) => {
    configList.value= data
    //回显之前的配置项
    configList.value.forEach((fItem:any)=>{
      if(fItem.id===chooseConfig.value){
        reshowConfig(fItem)
      }
    })
  })
}

//生成低代码演示
const refInputCode = ref()
const refOutPutCode = ref()
const generatorOutputCode = async () => {
  //获取基础模板文件
  const subFormData = new FormData()
  //获取edit里的数据
  const inputCode = refInputCode.value.code
  if(!inputCode){
    elMessage("code不合法","warning")
    return ;
  }
  if(!chooseTmpFile.value){
    elMessage("模板选择不能为空","warning")
    return ;
  }
  if(!chooseConfig.value){
    elMessage("数据不能为空","warning")
    return ;
  }
  subFormData.append('code', inputCode)
  subFormData.append('modelId', chooseTemplateItem.value.id)
  subFormData.append('id', chooseFileItem.value.id)
  subFormData.append('fileName', chooseFileItem.value.name)
  const backData=await  getConfigSaveDetail(configItem.id)
  subFormData.append('jsonData', backData.data?.generatorConfig)
  //回显返回的字符串
  const data = await fileUploadSave(subFormData)
  refOutPutCode.value.setCode("")
  refOutPutCode.value.setCode(data)
}

const fileUploadSave = (formData) => {
  return new Promise((resolve) => {
    axiosReq({
      url: '/generator/templateFile/changeInputCode',
      data: formData,
      method: 'post',
      bfLoading: false,
      isUploadFile: true
    }).then(({ data }) => {
      resolve(data)
    })
  })
}
const { formRules } = useElement()
const refCustomJsonInput = ref()
const editJson = async () => {
  getConfigSaveDetail(configItem.id).then(({data})=>{
    refCustomJsonInput.value.showModal(data)
  })

}
const generatorBaseModelTemp = async () => {
  const subFormData = new FormData()
  //获取edit里的数据
  subFormData.append('modelId', chooseTemplateItem.value.id)
  const backData=await getConfigSaveDetail(configItem.id)
  subFormData.append('jsonData', backData.data?.generatorConfig)
  const reqConfig = {
    url: '/generator/templateFile/createProjectByConfig',
    method: 'post',
    data: subFormData
  }
  downLoadTempByApi(reqConfig)
}
</script>

<style scoped lang="scss"></style>
