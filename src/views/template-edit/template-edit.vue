<template>
  <div class="project-page-style">
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
        <el-select v-model="chooseTmp" filterable placeholder="选择回显配置" class="w-200px">
          <el-option
            v-for="item in configList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click="reshowConfig(item)"
          />
        </el-select>
        <el-button class="ml-20px" type="primary" @click="editJson">修改json数据</el-button>

        <div class="ml-40px">
          <el-button type="primary" @click="generatorBaseModelTemp">生成文件</el-button>
        </div>
      </div>

      <div class="rowSC" style="flex-wrap: wrap">
        <el-button v-for="(item, index) in chooseTemplateFileArr" :key="index" @click="choseFileClick(item)">
          {{ item }}
        </el-button>
      </div>
    </FoldingCard>
    <div class="rowSC mt-20px">
      <InputCode ref="refInputCode" />
      <el-button class="ml-4px mr-4px" @click="generatorOutputCode">生成</el-button>
      <OutputCode ref="refOutPutCode" />
    </div>
    <!--  新增配置数据-->
    <CustomJsonInput ref="refCustomJsonInput" @reloadPage="getSaveTmp"/>
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

let tmpJsonData = $ref({})
let configItem=$ref({})
const reshowConfig = (item) => {
  configItem=item
  tmpJsonData = JSON.parse(item.generatorConfig)
}


//选择完数据后返回
const chooseDateBack = (JsonData) => {
  if(JsonData){
    tmpJsonData = JsonData
  }
}

//查询模板
let configList = $ref([])
const chooseTmp = $ref('')

//查询配置模版
let templateFileData = $ref([])
const templateFileReq = () => {
  const reqConfig = {
    url: '/basis-func/templateFile/selectPage',
    method: 'get',
    data: { pageSize: 500, pageNum: 1 }
  }
  axiosReq(reqConfig).then(({ data }) => {
    templateFileData = data?.records
  })
}
let chooseTemplateItem = $ref({})
let chooseTemplateFileArr = $ref([])
const chooseTmpFile = $ref('')
const chooseTemplateFile = (item) => {
  chooseTemplateItem = item
  chooseTemplateFileArr = JSON.parse(item.fileArr)
}
//请求后端返回文件数据
let chooseFileName = $ref()
const choseFileClick = (item) => {
  const reqConfig = {
    url: '/basis-func/templateFile/readFileToStringByFileName',
    method: 'post',
    params: { fileName: item, id: chooseTemplateItem.id }
  }
  chooseFileName = item
  axiosReq(reqConfig).then(({ data }) => {
    refInputCode.setCode(data)
  })
}

const getSaveTmp = () => {
  const reqConfig = {
    url: '/basis-func/configSave/selectPage',
    method: 'get',
    bfLoading: true,
    data: { pageSize: 50, pageNum: 1 }
  }
  axiosReq(reqConfig).then(({ data }) => {
    configList = data?.records
  })
}

//生成低代码演示
const refInputCode = $ref(null)
const refOutPutCode = $ref(null)
const generatorOutputCode = async () => {
  //获取基础模板文件
  const subFormData = new FormData()
  //获取edit里的数据
  const inputCode = refInputCode.code
  subFormData.append('code', inputCode)
  subFormData.append('id', chooseTemplateItem.id)
  subFormData.append('name', chooseFileName)
  subFormData.append('jsonData', JSON.stringify(tmpJsonData))
  //回显返回的字符串
  const data = await fileUploadSave(subFormData)
  refOutPutCode.setCode(data)
}

const fileUploadSave = (formData) => {
  return new Promise((resolve) => {
    axiosReq({
      url: '/basis-func/templateFile/changeInputCode',
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
const refCustomJsonInput=$ref();
const editJson = async () => {
  refCustomJsonInput.showModal(configItem)
}

const generatorBaseModelTemp = async () => {
  const subFormData = new FormData()
  //获取edit里的数据
  subFormData.append('id', chooseTemplateItem.id)
  subFormData.append('jsonData', JSON.stringify(tmpJsonData))
  subFormData.append('fileNamePre', tmpJsonData.basicConfig?.apiFileName || tmpJsonData.currentTableInfo?.tableNameCase)
  const reqConfig = {
    url: '/basis-func/templateFile/generatorTemplateFileByConfig',
    method: 'post',
    data: subFormData
  }
  downLoadTempByApi(reqConfig)
}
</script>

<style scoped lang="scss"></style>
