<template>
  <div class="project-page-style scroll-y">
    <FoldingCard title="基础配置">
      <el-form ref="refForm" label-width="115px" :inline="true" :model="basicConfig" class="pr-5">
        <div class="mb-10px">
          <el-form-item label="选择回显配置" label-position="left">
            <el-select v-model="chooseTmp" filterable placeholder="选择回显配置" class="w-300px">
              <el-option
                  v-for="item in configList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  @click="reshowConfig(item)"
              />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="作者" prop="author" :rules="formRules.isNotNull('不能为空')">
          <el-input v-model="basicConfig.author" placeholder="请输入作者" class="w-300px" />
        </el-form-item>
        <el-form-item label="生成的api文件名" prop="apiFileName" :rules="formRules.isNotNull('不能为空')">
          <el-input v-model="basicConfig.apiFileName" placeholder="生成的api文件名" class="w-300px" />
        </el-form-item>

        <div class="rowSC mt-20px">
          <el-form-item
              label="是否modal"
              prop="isImport"
              :rules="formRules.isNotNull('不能为空')"
              label-position="left"
          >
            <el-switch
                v-model="basicConfig.isModal"
                inline-prompt
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="true"
                inactive-value="false"
            />
          </el-form-item>
          <div v-if="basicConfig.isModal === 'true'" class="rowSC">
            <el-form-item label="modal标题" prop="modalTitle" :rules="formRules.isNotNull('不能为空')">
              <el-input v-model="basicConfig.modalTitle" placeholder="modal标题" class="w-200px" />
            </el-form-item>
            <el-form-item label="modal宽度" prop="modalWidth" :rules="formRules.isNotNull('不能为空')">
              <el-input v-model="basicConfig.modalWidth" placeholder="modal宽度" class="w-100px" />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </FoldingCard>
    <FoldingCard title="接口配置">
      <el-form ref="refForm" label-width="120px" :inline="true" :model="apiConfig" class="pr-5">
        <el-form-item label="详情接口" prop="detailApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="apiConfig.detailApi" placeholder="详情接口" class="w-380px" />
        </el-form-item>
        <el-form-item
            label="详情方法"
            prop="detailMethod"
            :rules="formRules.isNotNull('不能为空')"
            label-position="left"
        >
          <el-input v-model="apiConfig.detailMethod" placeholder="详情方法" class="w-80px" />
        </el-form-item>
      </el-form>
    </FoldingCard>
    <FoldingCard title="详情字段配置">
      <FrontLowCodeTable ref="refFormTableConfig" :table-type="3"/>
    </FoldingCard>
    <FoldingCard title="保存和生成模板">
      <div class="mb-10px">保存当前配置</div>
      <div class="rowSS mb-20px">
        <el-input v-model="saveFileName" class="mr-10px wi-300px" placeholder="保存文件名(可以不填写)" />
        <el-button type="primary" @click="saveTmp">保存</el-button>
      </div>
      <div>
        <div class="mb-10px">选择模板文件</div>
        <TemplateConfig ref="refTemplateConfig" />
      </div>
      <el-button type="primary" class="mt-20px" @click="generatorBaseModelTemp">点击生成模板</el-button>
    </FoldingCard>
    <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="emitCICConfirm" />
  </div>
</template>

<script setup lang="ts">

import {changeTheFirstWordToCase} from "@/components/TableExtra/back-extra-code";
import {changeDashToCase, changeDashToCaseAndFirstWord} from "@/components/TableExtra/front-extra-code";

//table
import {copyReactive, downLoadTempByApi, getCurrentTime} from '@/hooks/use-common'
const { formRules } = useElement()
/*项目和作者信息配置*/
const basicConfig = reactive({
  author: '',
  apiFileName: '',
  apiFileNameFirstCase: '',
  apiFileNameDash: '',
  dataTime: getCurrentTime(),
  modalTitle: '',
  modalWidth: 500,
  isModal: 'false'
})
/*前端api接口配置*/
const apiConfig = reactive({
  detailApi: '',
  detailMethod: 'get'
})

/*表字段信息（可多选）*/
const refFormTableConfig = ref()

//api文档
const refCustomInputColumn = ref()
const showCustomInput = () => {
  refCustomInputColumn.value.showModal()
}
const emitCICConfirm = ({requestParams,responseParams}) => {
  refFormTableConfig.value.setData(requestParams)
}

//生成模板
const generatorSubData = () => {
  return new Promise((resolve) => {
    basicConfig.apiFileNameDash = changeDashToCase(basicConfig.apiFileName)
    basicConfig.apiFileNameFirstCase = changeDashToCaseAndFirstWord(basicConfig.apiFileName)
    const generatorData = {
      basicConfig,
      apiConfig,
      saveFileName:saveFileName.value,
      tableList:  refFormTableConfig.value.getData()
    }
    resolve(generatorData)
  })
}

//生成基础模板
const refTemplateConfig = ref()
const generatorBaseModelTemp = async () => {
  const subData: any = await generatorSubData()
  const { id } = refTemplateConfig.value.returnData()
  const subFormData = new FormData()
  //获取edit里的数据
  subFormData.append('id', id)
  subFormData.append('jsonData', JSON.stringify(subData))
  subFormData.append('fileNamePre', basicConfig.apiFileName)
  const reqConfig = {
    url: '/basis-func/templateFile/generatorTemplateFileByConfig',
    method: 'post',
    data: subFormData
  }
  downLoadTempByApi(reqConfig)
}

//保存模板
const saveFileName = ref('')
const pageName = 'element-plus-add-edit'
const saveTmp = async () => {
  const subData = await generatorSubData()
  const reqConfig = {
    url: '/basis-func/configSave/insert',
    method: 'post',
    data: {
      name: `${saveFileName.value}_${pageName}(${getCurrentTime()})`,
      generatorConfig: JSON.stringify(subData)
    }
  }
  axiosReq(reqConfig).then(() => {
    elMessage('配置保存成功')
    getSaveTmp()
  })
}
//获取模板
onMounted(() => {
  getSaveTmp()
})

//查询模板
const configList:any = ref([])
const chooseTmp= ref(pageName)
const getSaveTmp = () => {
  const reqConfig = {
    url: '/basis-func/configSave/selectPage',
    method: 'get',
    bfLoading: true,
    data: { pageSize: 50, pageNum: 1, name: pageName }
  }
  axiosReq(reqConfig).then(({ data }) => {
    configList.value = data?.records
    //回显第一个元素
    for (const fItem of configList.value) {
      if (fItem.name.includes(pageName)) {
        chooseTmp.value = fItem.name
        reshowData(fItem)
        return
      }
    }
  })
}

const reshowData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  copyReactive(basicConfig,generatorConfig.basicConfig)
  copyReactive(apiConfig,generatorConfig.apiConfig)
  saveFileName.value=generatorConfig.saveFileName
  refFormTableConfig.value.reshowData(generatorConfig.tableList)
}
defineExpose({ generatorSubData })
</script>
