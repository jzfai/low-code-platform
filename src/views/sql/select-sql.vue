<template>
  <div class="project-page-style">
    <!--项目和作者信息配置-->
    <FoldingCard title="基础信息配置">
      <div class="mb-10px">
        <el-form-item label="选择回显配置" label-position="left">
          <el-select v-model="chooseTmp" filterable placeholder="选择回显配置" class="wi-300px">
            <el-option
                v-for="item in configList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                @click="reshowData(item)"
            />
          </el-select>
        </el-form-item>
      </div>
      <el-form ref="refForm" label-width="120px" :inline="true" :model="basicConfig" :rules="formRules" class="pr-50px">
        <el-form-item label="作者" prop="author" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="basicConfig.author" placeholder="作者" />
        </el-form-item>
      <!--        <el-form-item label="包名" prop="packageName" :rules="formRules.isNotNull()" label-position="left">-->
      <!--          <el-input v-model="basicConfig.packageName" class="w-200px" placeholder="包名" />-->
      <!--        </el-form-item>-->
      </el-form>
    </FoldingCard>
    <DBColumn ref="refDBColumn" />
    <FoldingCard title="字段用途配置">
      <div class="mt-20px">
        <el-button type="primary" @click="generatorToSearch">同步到查询</el-button>
      </div>
      <div class="rowSC mt-20px">
        <div>From后的表</div>
        <el-button v-if="fromAfterTableInfo.filterTableName" text type="primary" @click="showDbModal">{{fromAfterTableInfo.filterTableName}}</el-button>
        <el-button v-else text type="primary" @click="showDbModal">选表和字段</el-button>
      </div>
      <!--  查询配置  -->
      <div class="mt-30px mb-10px">查询字段</div>
      <SqlSelectTable ref="refSqlSelectTable" />
      <!--  表格配置  -->
      <div class="mt-30px mb-10px">条件字段</div>
      <SqlFilterTable ref="refSqlFilterTable" />
    </FoldingCard>
    <FoldingCard title="保存和生成模板">
      <div class="mb-10px">保存当前配置</div>
      <div class="rowSS mb-20px">
        <el-input v-model="saveFileName" class="wi-200px mr-10px" placeholder="保存文件名(可以不填写)" />
        <el-button type="primary" @click="saveTmp">保存</el-button>
      </div>
      <div>
        <div class="mb-10px">选择模板文件</div>
        <TemplateConfig ref="refTemplateConfig" />
      </div>
      <el-button type="primary" class="mt-20px" @click="generatorBaseModelTemp">点击生成模板</el-button>
    </FoldingCard>
    <DbChooseModal  ref="refDbChooseModal"/>
  </div>
</template>

<script setup lang="ts">

import SqlFilterTable from "./SqlFilterTable.vue";
import DbChooseModal from "./DbChooseModal.vue";
import SqlSelectTable from "./SqlSelectTable.vue";
import {arrGroupByKey} from "@/hooks/use-common-utils";
import  DBColumn from "./DBColumn.vue"
import {copyReactive} from "@/hooks/use-common";
const { formRules } = useElement()
/*基础配置*/
const basicConfig = reactive({
  author: '',
  packageName: '',
  basicClassName: '',
  basicClassDesc: '',
  dateTime: ''
})

const refDbChooseModal=ref()
const fromAfterTableInfo=reactive({
  filterTableName:""
})
const showDbModal=()=>{
  refDbChooseModal.value.showModal(fromAfterTableInfo)
}
const refSqlSelectTable = ref()
const refDBColumn=ref()
const generatorToSearch = () => {
  refSqlSelectTable.value.setData(refDBColumn.value.checkColumnArr)
}
const refSqlFilterTable=ref()

//生成模板
const generatorSubData = () => {
  return new Promise((resolve) => {
    const searchTableConfig = refSqlSelectTable.value.getData()
    const sqlFilterTableConfig = refSqlFilterTable.value.getData()
    const sqlFilterTableCroup =  arrGroupByKey(refSqlFilterTable.value.getData(),'filterKey')
    // const searchTableGroup = arrGroupByKey(searchTableConfig, 'tableName')
    // const listTableGroup = arrGroupByKey(searchTableConfig, 'tableName')
    //设置时间
    basicConfig.dateTime = getCurrentTime()
    const generatorData = {
      basicConfig,
      fromAfterTableInfo,
      sqlFilterTableConfig,
      sqlFilterTableCroup,
      queryConfig: searchTableConfig,
      saveFileName:saveFileName.value,
      ...refDBColumn.value.getData()
    }
    resolve(generatorData)
  })
}

//保存模板
const saveFileName = ref('')
const pageName = 'mysql-select'
const saveTmp = async () => {
  const subData = await generatorSubData()
  const reqConfig = {
    url: '/basis-func/configSave/insert',
    method: 'post',
    data: {
      name: `${saveFileName.value} ${pageName}(${getCurrentTime()})`,
      generatorConfig: JSON.stringify(subData)
    }
  }
  axiosReq(reqConfig).then(() => {
    elMessage('配置保存成功')
    getSaveTmp()
  })
}
//查询模板
onMounted(() => {
  getSaveTmp()
})
const configList:any = ref([])
const chooseTmp = ref(pageName)
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


//回显数据
const reshowData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  refSqlSelectTable.value.reshowData(generatorConfig.queryConfig)
  refSqlFilterTable.value.reshowData(generatorConfig.sqlFilterTableConfig)
  saveFileName.value = generatorConfig.saveFileName
  copyReactive(basicConfig,generatorConfig.basicConfig)
  copyReactive(fromAfterTableInfo,generatorConfig.fromAfterTableInfo)
  //回显数据库操作部分
  refDBColumn.value.reshowData(generatorConfig)
}

//生成基础模板
const refTemplateConfig = ref()
const generatorBaseModelTemp = async () => {
  const subData: any = await generatorSubData()
  const { id } = refTemplateConfig.value.returnData()
  const subFormData = new FormData()
  subFormData.append('id', id)
  subFormData.append('jsonData', JSON.stringify(subData))
  //subFormData.append('fileNamePre', currentTableInfo.value.tbNameCase)
  const reqConfig = {
    url: '/basis-func/templateFile/generatorTemplateFileByConfig',
    method: 'post',
    data: subFormData
  }
  downLoadTempByApi(reqConfig)
}
defineExpose({ generatorSubData })
</script>

<style scoped lang="scss"></style>
