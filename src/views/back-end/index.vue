<template>
  <div class="project-page-style">
    <BasicInfo ref="refBasicInfo" :setData="setData" :clearAllData="clearAllData" :show-general-project="true"/>
    <DBColumn ref="refDBColumn" :showParseSql="showParseSql"  :show-sql-parse="true"/>
    <div class="mt-20px">
      <el-button type="primary" @click="toSearch">同步到查询</el-button>
      <el-button type="primary" @click="toTable">同步到表格</el-button>
      <el-button type="primary" @click="toForm">同步到表单</el-button>
      <el-button type="primary" @click="toAll">同步所有</el-button>
      <el-button type="primary" @click="clearAll">清空所有</el-button>
    </div>
    <FoldingCard title="字段用途配置">
      <!--  查询配置  -->
      <div class="mt-30px mb-10px">查询字段</div>
      <BackLowCodeTable ref="refSearchTableConfig" :table-type="1"/>
      <!--  表格配置  -->
      <div class="mt-30px mb-10px">返回字段</div>
      <BackLowCodeTable ref="refListTableConfig" :table-type="2"/>
      <!--  提交from表单配置  -->
      <div class="mt-30px mb-10px">新增和编辑字段</div>
      <BackLowCodeTable ref="refFormTableConfig" :table-type="3"/>
    </FoldingCard>
    <DateAndFileExport ref="refDateAndFileExport" :getData="getData" :setData="setData" :getSaveTmp="getSaveTmp"/>
    <SqlParseModal ref="refSqlParseModal" @sqlParseInfo="sqlParseInfo"/>
  </div>
</template>

<script setup lang="ts">
import SqlParseModal from "./SqlParseModal.vue";
import DateAndFileExport from "@/components/common/DateAndFileExport.vue";
import BasicInfo from "@/components/common/BasicInfo.vue";
import DBColumn from "@/components/common/DBColumn.vue";
import BackLowCodeTable from "@/components/TableExtra/BackLowCodeTable.vue";
import {
  changeDashToCase,
  changeDashToCaseAndFirstWord,
  changeTheFirstWordToCase,
  tbTypeMapping
} from "@/components/TableExtra/back-extra-code";

const {formRules} = useElement()
/*初始数据设置*/
// const dataBaseInfo = reactive({
//   url: "10.100.2.177:8123",
//   name: "iotolap_rw",
//   password: "THmNgYQZwtGNmLw5^iuz",
//   dbName: "",
//   tbName: "",
// })
/**********ref***********/
//生成基础模板
const refDBColumn = ref()
const refDateAndFileExport = ref()
const refBasicInfo = ref()
const refSearchTableConfig = ref<any>()
const refListTableConfig = ref<any>([])
const refFormTableConfig = ref<any>()
const refSqlParseModal = ref()

//获取到解析后的数据
const sqlParseInfo = (sqlObjInfo) => {
  clearParse()
  //回显选中的表
  refDBColumn.value.setCheckTable(Object.values(sqlObjInfo.tableAndAlias))
  //获取表相关数据
  refDBColumn.value.returnMultiTableColumn(Object.values(sqlObjInfo.tableAndAlias)).then((data) => {
    //查询
    const whereColumnFilter: any = []
    data.forEach(f => {
      sqlObjInfo.whereColumn.forEach(m => {
        if (m.columnName === f.columnName && f.tableName === m.tableName) {
          whereColumnFilter.push(f)
        }
      })
    })
    const columnNameArrFilter: any = []
    data.forEach(f => {
      sqlObjInfo.columnNameArr.forEach(m => {
        if (m.columnName === f.columnName && f.tableName === m.tableName) {
          columnNameArrFilter.push(f)
        }
      })
    })
    refSearchTableConfig.value.setData(changeColumn(whereColumnFilter))
    refListTableConfig.value.setData(changeColumn(columnNameArrFilter))
  })
}

const  changeColumn = (checkColumnArr) => {
  return checkColumnArr.map(fItem => {
    fItem.field = changeDashToCase(fItem.columnName) //_转驼峰
    fItem.desc = fItem.columnComment
    fItem.fieldCase = changeDashToCaseAndFirstWord(fItem.columnName) //_转驼峰
    fItem.originField = fItem.columnName
    fItem.type = tbTypeMapping(fItem.dataType)
    return fItem;
  })
}

/**********methods***********/
const showParseSql = () => {
  refSqlParseModal.value.showModal()
}

const getCheckColumn = () => {
  const checkColumn = refDBColumn.value.getCheckColumn()
  return JSON.parse(JSON.stringify(checkColumn))
}

const toSearch = () => {
  refSearchTableConfig.value.setData(getCheckColumn())
}
const toTable = () => {
  refListTableConfig.value.setData(getCheckColumn())
}
const toForm = () => {
  refFormTableConfig.value.setData(getCheckColumn())
}
//同步所有
const toAll = () => {
  toSearch()
  toTable()
  toForm()
}
//清空所有
const clearAll = () => {
  refSearchTableConfig.value.clearData()
  refListTableConfig.value.clearData()
  refFormTableConfig.value.clearData()
}
/*******get,set,reset,clear*******/
//生成模板
const getData = () => {
  return new Promise((resolve) => {
    //基础配置
    const basicConfigFile = refDBColumn.value.getBasicInfo()
    const basicConfig = Object.assign(refBasicInfo.value.getData(), basicConfigFile)


    //配置保存和导出
    const dateAndFileExport = refDateAndFileExport.value.getData()
    const projectInfo = refDateAndFileExport.value.getProjectInfo()


    //apiConfig处理
    if(projectInfo.apiConfig){
      projectInfo.apiConfigJson=JSON.parse(projectInfo.apiConfig)
    }


    //moduleList处理
    if(projectInfo.modelList){
      projectInfo.modelListJson=JSON.parse(projectInfo.modelList)
    }

    let baseLayerInfo:any={}
    //应用层文件名处理
    if(projectInfo.projectType===3&&projectInfo.baseLayerInfo){
      baseLayerInfo=JSON.parse(projectInfo.baseLayerInfo)
      baseLayerInfo.projectDir=baseLayerInfo.originPackage.replace(/com./g, '').replace(/\./g, '-');
      const originPackageArr=baseLayerInfo.originPackage.split(".")
      basicConfig.dillName=originPackageArr.at(-2)+changeTheFirstWordToCase(originPackageArr.at(-1))
      basicConfig.dillBasicName=originPackageArr.at(-2)+changeTheFirstWordToCase(originPackageArr.at(-1))+basicConfig.basicNameCase
      basicConfig.dillBasicNameCase=changeTheFirstWordToCase(originPackageArr.at(-2))+changeTheFirstWordToCase(originPackageArr.at(-1))+basicConfig.basicNameCase
    }

    //数据库
    const dBColumn = refDBColumn.value.getData()

    //查询，返回，新增
    const queryConfig = refSearchTableConfig.value.getData()
    const tableConfig = refListTableConfig.value.getData()
    const formConfig = refFormTableConfig.value.getData()
    const queryConfigGroup = arrGroupByKey(queryConfig, 'tableName')
    const tableConfigGroup = arrGroupByKey(tableConfig, 'tableName')
    const formConfigGroup = arrGroupByKey(formConfig, 'tableName')

    const generatorData = {
      basicConfig,
      dBColumn,
      dateAndFileExport,
      queryConfig,
      tableConfig,
      projectInfo,
      baseLayerInfo,
      formConfig,
      queryConfigGroup,
      tableConfigGroup,
      formConfigGroup
    }
    resolve(generatorData)
  })
}

/*清空所有数据*/
const clearAllData = () => {
  //基础配置
  refBasicInfo.value.resetData()
  //生成文件
  refDateAndFileExport.value.resetData()
  //数据库信息
  refDBColumn.value.resetData()
  clearAll()
}

//sql解析清空数据
const clearParse = () => {
  //数据库信息
  refDBColumn.value.resetParseData()
  clearAll()
}
//回显数据
const setData = (fItem) => {

  const generatorConfig = JSON.parse(fItem.generatorConfig)
  //基础配置
  refBasicInfo.value.setData(generatorConfig.basicConfig)
  //生成文件
  refDateAndFileExport.value.setData(generatorConfig)
  //数据库信息
  refDBColumn.value.reshowData(generatorConfig.dBColumn,generatorConfig.basicConfig)
  //查询，返回，新增
  refSearchTableConfig.value.reshowData(generatorConfig.queryConfig)
  refListTableConfig.value.reshowData(generatorConfig.tableConfig)
  refFormTableConfig.value.reshowData(generatorConfig.formConfig)
}
const getSaveTmp = () => {
  refBasicInfo.value.getSaveTmp()
}
/******defineExpose*******/
defineExpose({getData, setData})
</script>

<style scoped lang="scss"></style>
