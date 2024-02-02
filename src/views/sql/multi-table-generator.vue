<template>
  <div class="project-page-style">
    <BasicInfo ref="refBasicInfo"/>
    <DBColumn ref="refDBColumn" :db-info="dataBaseInfo"/>
    <FoldingCard title="字段用途配置">
      <div class="mt-20px">
        <el-button type="primary" @click="generatorToSearch">同步到查询</el-button>
<!--        <el-button type="primary" @click="generatorToBack">同步到返回</el-button>-->
      </div>
      <!--  查询配置  -->
      <div class="mt-30px mb-10px">查询字段</div>
      <SqlSelectTable ref="refSqlSelectTable"/>
    </FoldingCard>
    <DateAndFileExport ref="refDateAndFileExport"/>
    <DbChooseModal ref="refDbChooseModal"/>
  </div>
</template>

<script setup lang="ts" injectCode>
import DbChooseModal from "./DbChooseModal.vue";
import SqlSelectTable from "./SqlSelectTable.vue";
import {arrGroupByKey} from "@/hooks/use-common-utils";
import {copyReactive} from "@/hooks/use-common";
import DateAndFileExport from "@/components/common/DateAndFileExport.vue";
import DBColumn from "@/components/common/DBColumn.vue";
import BasicInfo from "@/components/common/BasicInfo.vue";

/*初始数据设置*/
const dataBaseInfo = reactive({
  url: "159.75.144.202:3310",
  name: "root",
  password: "@Root123",
  dbName: "micro-service-single",
  tbName: "",
})

/**********props***********/
/**********ref***********/
//生成基础模板
const refSqlSelectTable = ref()
const refDateAndFileExport = ref()
const refBasicInfo = ref()
const refDBColumn = ref()

/**********reactive***********/
const fromAfterTableInfo = reactive({
  filterTableName: ""
})

/**********methods***********/

const generatorToSearch = () => {
  refSqlSelectTable.value.setData(refDBColumn.value.getCheckColumn())
}
const getSaveTmp=()=>{
  refBasicInfo.value.getSaveTmp()
}

//生成模板
const getData = () => {
  return new Promise((resolve) => {
    //基础配置
    const basicConfig = refBasicInfo.value.getData()
    //配置保存和导出
    const dateAndFileExport = refDateAndFileExport.value.getData()
    //数据库
    const dBColumn = refDBColumn.value.getData()

    //查询
    const queryConfig = refSqlSelectTable.value.getData()
    //条件字段
    const sqlFilterTableCroup = arrGroupByKey(refSqlSelectTable.value.getData(), 'filterKey')

    const generatorData = {
      basicConfig,
      dBColumn,
      dateAndFileExport,
      fromAfterTableInfo,
      sqlFilterTableCroup,
      queryConfig
    }
    resolve(generatorData)
  })
}
const setData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  //基础配置
  refBasicInfo.value.setData(generatorConfig.basicConfig)
  //生成文件
  refDateAndFileExport.value.setData(generatorConfig.dateAndFileExport)
  //数据库信息
  refDBColumn.value.reshowData(generatorConfig.dBColumn)
  //查询
  refSqlSelectTable.value.reshowData(generatorConfig.queryConfig)
  copyReactive(fromAfterTableInfo, generatorConfig.fromAfterTableInfo)
}
/******defineExpose*******/
defineExpose({getData, setData})
</script>

<style scoped lang="scss"></style>
