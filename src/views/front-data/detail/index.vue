<template>
  <div class="project-page-style">
    <BasicInfo ref="refBasicInfo" :basic-type="2" :setData="setData"/>
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
    <ColumnGenerator ref="refColumnGenerator"  @setRes="setRes"/>
    <FoldingCard title="详情字段配置">
      <FrontLowCodeTable ref="refFormTableConfig" :table-type="3"/>
    </FoldingCard>
    <DateAndFileExport ref="refDateAndFileExport" :getData="getData" :setData="setData" :getSaveTmp="getSaveTmp"/>
  </div>
</template>

<script setup lang="ts">
import {copyReactive} from "@/hooks/use-common";
/**********ref***********/
const refDateAndFileExport = ref()
const refBasicInfo = ref()
/*表字段信息（可多选）*/
const refFormTableConfig = ref()
/**********reactive***********/
//前端api接口配置
const apiConfig = reactive({
  detailApi: '',
  detailMethod: 'get'
})


/**********mounted***********/
const { formRules } = useElement()
onMounted(()=>{})


/**********methods***********/
//设置返回
const setRes=(data)=>{
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
    //返回字段
    const tableList=refFormTableConfig.value.getData()

    const generatorData = {
      basicConfig,
      dateAndFileExport,
      apiConfig,
      tableList
    }
    resolve(generatorData)
  })
}
const setData = async (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  //基础配置
  refBasicInfo.value.setData(generatorConfig.basicConfig)

  //生成文件
  refDateAndFileExport.value.setData(generatorConfig.dateAndFileExport)
  //api文件
  copyReactive(apiConfig, generatorConfig.apiConfig)

  //返回
  refFormTableConfig.value.reshowData(generatorConfig.tableList)
}



/******defineExpose*******/
defineExpose({getData, setData,getSaveTmp})
</script>
