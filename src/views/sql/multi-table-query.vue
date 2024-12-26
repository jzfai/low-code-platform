<template>
  <div class="project-page-style">
    <BasicInfo ref="refBasicInfo" :setData="setData"/>
    <DBColumn ref="refDBColumn" :db-info="dataBaseInfo"/>
    <FoldingCard title="字段用途配置">
      <div class="mt-20px">
        <el-button type="primary" @click="generatorToSearch">同步到查询</el-button>
        <el-button type="primary" @click="generatorToBack">同步到返回</el-button>
      </div>
      <div class="rowSC mt-20px">
        <div>From后的表</div>
        <el-button v-if="fromAfterTableInfo.filterTableName" text type="primary" @click="showDbModal">
          {{ fromAfterTableInfo.filterTableName }}
        </el-button>
        <el-button v-else text type="primary" @click="showDbModal">选表和字段</el-button>
      </div>
      <!--  查询配置  -->
      <div class="mt-30px mb-10px">查询字段</div>
      <SqlSelectTable ref="refSqlSelectTable"/>

      <!--  返回配置  -->
      <div class="mt-30px mb-10px">返回字段</div>
      <SqlBackTable ref="refSqlBackTable" :table-type="3"/>

      <!--  表格配置  -->
      <div class="mt-30px mb-10px">条件字段</div>
      <SqlFilterTable ref="refSqlFilterTable"/>
    </FoldingCard>
    <DateAndFileExport ref="refDateAndFileExport" :getData="getData" :setData="setData" :getSaveTmp="getSaveTmp"/>
    <DbChooseModal ref="refDbChooseModal"/>
  </div>
</template>

<script setup lang="ts">
import SqlFilterTable from "./SqlFilterTable.vue";
import DbChooseModal from "./DbChooseModal.vue";
import SqlSelectTable from "./SqlSelectTable.vue";
import {arrGroupByKey} from "@/hooks/use-common-utils";
import {copyReactive} from "@/hooks/use-common";
import SqlBackTable from "@/components/common/SqlBackTable.vue";
import DateAndFileExport from "@/components/common/DateAndFileExport.vue";
import DBColumn from "@/components/common/DBColumn.vue";
import BasicInfo from "@/components/common/BasicInfo.vue";

/*初始数据设置*/
const dataBaseInfo = reactive({
  url: "10.100.2.170:3306",
  name: "devuser",
  password: "gl92p=NU6bRUF9Am=aRO",
  dbName: "",
  tbName: "",
})

/**********props***********/
/**********ref***********/
//生成基础模板
const refDbChooseModal = ref()
const refSqlSelectTable = ref()
const refDBColumn = ref()
const refSqlBackTable = ref()
const refSqlFilterTable = ref()
const refDateAndFileExport = ref()
const refBasicInfo = ref()

/**********reactive***********/
const fromAfterTableInfo = reactive({
  filterTableName: ""
})

/**********methods***********/
const showDbModal = () => {
  refDbChooseModal.value.showModal(fromAfterTableInfo)
}
const generatorToSearch = () => {
  refSqlSelectTable.value.setData(refDBColumn.value.getCheckColumn())
}
const generatorToBack = () => {
  refSqlBackTable.value.setData(refDBColumn.value.getCheckColumn())
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
    //返回
    const backConfig = refSqlBackTable.value.getData()
    //条件字段
    const sqlFilterTableConfig = refSqlFilterTable.value.getData()
    const sqlFilterTableCroup = arrGroupByKey(refSqlFilterTable.value.getData(), 'filterKey')

    const generatorData = {
      basicConfig,
      dBColumn,
      dateAndFileExport,
      fromAfterTableInfo,
      sqlFilterTableConfig,
      sqlFilterTableCroup,
      queryConfig,
      backConfig,
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
  //返回
  refSqlBackTable.value.reshowData(generatorConfig.backConfig || [])
  //条件字段
  refSqlFilterTable.value.reshowData(generatorConfig.sqlFilterTableConfig)
  copyReactive(fromAfterTableInfo, generatorConfig.fromAfterTableInfo)
}
/******defineExpose*******/
defineExpose({getData, setData})
</script>

<style scoped lang="scss"></style>
