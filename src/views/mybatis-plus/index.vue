<template>
  <div class="project-page-style">
    <BasicInfo ref="refBasicInfo"/>
    <DBColumn ref="refDBColumn" :db-info="dataBaseInfo"/>
    <div  class="mt-20px">
      <el-button type="primary" @click="toSearch">同步到查询</el-button>
      <el-button type="primary" @click="toTable">同步到表格</el-button>
      <el-button type="primary" @click="toForm">同步到表单</el-button>
    </div>
    <FoldingCard title="字段用途配置">
      <!--  查询配置  -->
      <div class="mt-30px mb-10px">查询字段</div>
      <BackLowCodeTable ref="refSearchTableConfig" :table-type="1" />
      <!--  表格配置  -->
      <div class="mt-30px mb-10px">表格字段</div>
      <BackLowCodeTable ref="refListTableConfig" :table-type="2" />
      <!--  提交from表单配置  -->
      <div class="mt-30px mb-10px">新增和修改字段</div>
      <BackLowCodeTable ref="refFormTableConfig" :table-type="3" />
    </FoldingCard>
    <DateAndFileExport ref="refDateAndFileExport"/>
  </div>
</template>

<script setup lang="ts">
import DateAndFileExport from "@/components/common/DateAndFileExport.vue";
import BasicInfo from "@/components/common/BasicInfo.vue";
import DBColumn from "@/components/common/DBColumn.vue";
import BackLowCodeTable from "@/components/TableExtra/BackLowCodeTable.vue";
const { formRules } = useElement()
/*初始数据设置*/
const dataBaseInfo=reactive({
  url:"159.75.144.202:3310",
  name:"root",
  password:"@Root123",
  dbName:"micro-service-single",
  tbName:"",
})
/**********ref***********/
//生成基础模板
const refDBColumn = ref()

const refDateAndFileExport=ref()
const refBasicInfo=ref()

const refSearchTableConfig = ref<any>()

const refListTableConfig = ref<any>([])

const refFormTableConfig = ref<any>()

/**********methods***********/
const toSearch = ()=>{
  refSearchTableConfig.value.setData(refDBColumn.value.getCheckColumn())
}
const toTable=()=>{
  refListTableConfig.value.setData(refDBColumn.value.getCheckColumn())
}
const toForm=()=>{
  refFormTableConfig.value.setData(refDBColumn.value.getCheckColumn())
}

/*******get,set,reset,clear*******/
//生成模板
const getData = () => {
  return new Promise((resolve) => {
    //基础配置
    const basicConfig = refBasicInfo.value.getData()
    //配置保存和导出
    const dateAndFileExport=refDateAndFileExport.value.getData()
    //数据库
    const dBColumn=refDBColumn.value.getData()

    //查询，返回，新增
    const queryConfig = refSearchTableConfig.value.getData()
    const tableConfig = refListTableConfig.value.getData()
    const formConfig = refFormTableConfig.value.getData()

    const generatorData = {
      basicConfig,
      dBColumn,
      dateAndFileExport,
      queryConfig,
      tableConfig,
      formConfig
    }
    resolve(generatorData)
  })
}
//回显数据
const setData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  //基础配置
  refBasicInfo.value.setData(generatorConfig.basicConfig)
  //生成文件
  refDateAndFileExport.value.setData(generatorConfig.dateAndFileExport)
  //数据库信息
  refDBColumn.value.reshowData(generatorConfig.dBColumn)
  //查询，返回，新增
  refSearchTableConfig.value.reshowData(generatorConfig.queryConfig)
  refListTableConfig.value.reshowData(generatorConfig.tableConfig)
  refFormTableConfig.value.reshowData(generatorConfig.formConfig)
}
const getSaveTmp=()=>{
  refBasicInfo.value.getSaveTmp()
}
/******defineExpose*******/
defineExpose({ getData,setData })
</script>

<style scoped lang="scss"></style>
