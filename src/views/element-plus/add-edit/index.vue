<template>
  <div class="project-page-style scroll-y">
    <BasicInfo ref="refBasicInfo" :basic-type="2"/>
    <!-- 前端请求接口配置  -->
    <FoldingCard title="接口配置">
      <el-form ref="refForm" label-width="100px" :inline="true" :model="apiConfig" class="pr-5">
        <el-form-item label="新增接口" prop="insertApi" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.insertApi" placeholder="新增接口" class="w-380px" />
        </el-form-item>
        <el-form-item label="新增方法" prop="insertMethod" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.insertMethod" placeholder="新增方法" class="w-80px" />
        </el-form-item>
        <el-form-item label="更新接口" prop="updateApi" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.updateApi" placeholder="更新接口" class="w-380px" />
        </el-form-item>
        <el-form-item label="更新方法" prop="updateMethod" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.updateMethod" placeholder="更新方法" class="w-80px" />
        </el-form-item>
        <el-form-item label="详情接口" prop="detailApi" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.detailApi" placeholder="详情接口" class="w-380px" />
        </el-form-item>
        <el-form-item label="详情方法" prop="detailMethod" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.detailMethod" placeholder="详情方法" class="w-80px" />
        </el-form-item>
      </el-form>
    </FoldingCard>
    <ColumnGenerator ref="refColumnGenerator" @setReq="setReq"/>
    <FoldingCard title="提交form字段配置">
      <FrontLowCodeTable ref="refFormTableConfig" :table-type="3"/>
    </FoldingCard>
    <DateAndFileExport ref="refDateAndFileExport"/>
  </div>
</template>

<script setup lang="ts">
import {changeDashToCase, changeDashToCaseAndFirstWord,} from "@/components/TableExtra/front-extra-code";
import {copyReactive, downLoadTempByApi, getCurrentTime} from '@/hooks/use-common'

/**********ref***********/
const refFormTableConfig = ref()
const refCustomInputColumn = ref()
const refBasicInfo = ref()
const refDateAndFileExport = ref()
/**********reactive***********/
const apiConfig = reactive({
  insertApi: '',
  insertMethod: 'post',
  updateApi: '',
  updateMethod: 'put',
  detailApi: '',
  detailMethod: 'get'
})

/**********mounted***********/
const { formRules } = useElement()

onMounted(()=>{})


/**********methods***********/

const setReq = (data) => {
  refFormTableConfig.value.setData(data)
}

/**********request***********/

/*******get,set,reset,clear*******/
const getSaveTmp=()=>{
  refBasicInfo.value.getSaveTmp()
}

const getData = () => {
  return new Promise((resolve) => {
    //基础配置
    const basicConfig = refBasicInfo.value.getData()
    //配置保存和导出
    const dateAndFileExport = refDateAndFileExport.value.getData()
    //表单
    const tableList=refFormTableConfig.value.getData()
    const generatorData = {
      basicConfig,
      dateAndFileExport,
      apiConfig,
      tableList,
    }
    resolve(generatorData)
  })
}

const setData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  refBasicInfo.value.setData(generatorConfig.basicConfig)
  //生成文件
  refDateAndFileExport.value.setData(generatorConfig.dateAndFileExport)
  //api文件
  copyReactive(apiConfig, generatorConfig.apiConfig)
  //form
  refFormTableConfig.value.reshowData(generatorConfig.tableList)
}
/******defineExpose*******/
defineExpose({getData, setData,getSaveTmp})
</script>
