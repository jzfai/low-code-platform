<template>
  <div class="project-page-style scroll-y">
    <!-- 导入文件部分   -->
    <FoldingCard title="基础模板和数据配置">
      <div class="rowSS mb-10px">
        <el-select v-model="chooseTmpFile" filterable placeholder="选择模版文件" class="w-200px mr-10px">
          <el-option
            v-for="item in templateFileData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click="chooseTemplateFile(item)"
          />
        </el-select>
        <el-select v-model="chooseConfig" filterable placeholder="选择回显配置" class="w-200px">
          <el-option
            v-for="item in configList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click="reshowConfig(item)"
          />
        </el-select>
        <el-button class="ml-20px" type="primary" @click="editJson">修改json数据</el-button>

        <el-button class="ml-20px"  type="primary" @click="generatorBaseModelTemp">生成文件</el-button>
        <el-button class="ml-20px"  type="primary" @click="templateFileReq">刷新模板</el-button>
        <el-button class="ml-20px"  type="primary" @click="getSaveTmp">刷新配置</el-button>
      </div>

      <div class="rowSC" style="flex-wrap: wrap">
        <el-button v-for="(item, index) in chooseTemplateFileArr" :key="index" class="mb-10px"  :type="chooseFileName===item&&'warning'" @click="choseFileClick(item)">
          {{ item }}
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
//获取模板
onMounted(() => {
  getSaveTmp()
  templateFileReq()
})

const tmpJsonData:any = ref({})
let configItem = {}
const reshowConfig = (item) => {
  configItem = item
  tmpJsonData.value = JSON.parse(item.generatorConfig)
}

//查询模板
const configList = ref([])
const chooseConfig = ref('')

//查询配置模版
const templateFileData = ref([])
const templateFileReq = () => {
  const reqConfig = {
    url: '/generator/templateFile/listPage',
    method: 'get',
    data: { pageSize: 500, pageNum: 1 }
  }
  axiosReq(reqConfig).then(({ data }) => {
    templateFileData.value = data
    chooseTemplateItem.value = []
    chooseTemplateFileArr.value = []
    chooseTmpFile.value = ""
  })
}
const chooseTemplateItem:any = ref()
const chooseTemplateFileArr = ref([])
const chooseTmpFile = ref('')
const chooseTemplateFile = (item) => {
  chooseTemplateItem.value = item
  chooseTemplateFileArr.value = JSON.parse(item.fileArr)
}
//请求后端返回文件数据
const chooseFileName = ref()
const choseFileClick = (item) => {
  const reqConfig = {
    url: '/generator/templateFile/readFileToStringByFileName',
    method: 'post',
    params: { fileName: item, id: chooseTemplateItem.value.id }
  }
  chooseFileName.value = item
  axiosReq(reqConfig).then(({ data }) => {
    refInputCode.value.setCode(data)
  })
}

//保存数据
const saveModal = () => {
  getSaveTmp()
}
const getSaveTmp = () => {
  const reqConfig = {
    url: '/generator/configSave/listPage',
    method: 'get',
    bfLoading: true,
    data: { pageSize: 50, pageNum: 1 }
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
  subFormData.append('id', chooseTemplateItem.value.id)
  subFormData.append('name', chooseFileName.value)
  subFormData.append('jsonData', JSON.stringify(tmpJsonData.value))
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
  refCustomJsonInput.value.showModal(configItem)
}
const generatorBaseModelTemp = async () => {
  const subFormData = new FormData()
  //获取edit里的数据
  subFormData.append('id', chooseTemplateItem.value.id)
  subFormData.append('jsonData', JSON.stringify(tmpJsonData.value))
  subFormData.append('fileNamePre', tmpJsonData.value.basicConfig?.basicNameCase||"")
  const reqConfig = {
    url: '/generator/templateFile/generatorTemplateFileByConfig',
    method: 'post',
    data: subFormData
  }
  downLoadTempByApi(reqConfig)
}
</script>

<style scoped lang="scss"></style>
