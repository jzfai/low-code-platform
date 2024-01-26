<template>
  <div class="project-page-style">
    <BasicInfo ref="refBasicInfo" :basic-type="2"/>
    <!-- 前端请求接口配置  -->
    <FoldingCard title="接口配置">
      <el-form ref="refForm" label-width="100px" :inline="true" :model="apiConfig" class="pr-5">
        <el-form-item label="查询接口" prop="queryApi" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.queryApi" placeholder="查询接口" class="w-380px"/>
        </el-form-item>
        <el-form-item label="查询方法" prop="queryMethod" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.queryMethod" placeholder="查询方法" class="w-100px"/>
        </el-form-item>
        <el-form-item label="删除接口" prop="deleteApi" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.deleteApi" placeholder="删除接口" class="w-380px"/>
        </el-form-item>
        <el-form-item label="删除方法" prop="queryApi" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.deleteMethod" placeholder="删除方法" class="w-100px"/>
        </el-form-item>
        <el-form-item label="批量删除接口" prop="multiDeleteApi" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="apiConfig.multiDeleteApi" placeholder="批量删除接口" class="w-380px"/>
        </el-form-item>
        <el-form-item
            label="批量删除方法"
            prop="multiDeleteMethod"
            :rules="formRules.isNotNull('不能为空')"
            label-position="left"
        >
          <el-input v-model="apiConfig.multiDeleteMethod" placeholder="批量删除方法" class="w-100px"/>
        </el-form-item>
      </el-form>
    </FoldingCard>
    <FoldingCard title="表格功能配置">
      <el-form ref="refCcForm" label-width="150px" :inline="true" :model="tableConfig" :rules="formRules" class="pr-5">
        <el-form-item label="新增" prop="isAdd" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
              v-model="tableConfig.isAdd"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="分页" prop="isPagination" :rules="formRules.isNotNull('isPagination not null')" label-position="left">
          <el-switch
              v-model="tableConfig.isPagination"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="编辑" prop="isEdit" :rules="formRules.isNotNull('isEdit is null')" label-position="left">
          <el-switch
              v-model="tableConfig.isEdit"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="详情" prop="isDetail" :rules="formRules.isNotNull('isDetail is not null')" label-position="left">
          <el-switch
              v-model="tableConfig.isDetail"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="删除" prop="isDelete" :rules="formRules.isNotNull('isDelete not null')" label-position="left">
          <el-switch
              v-model="tableConfig.isDelete"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>

        <el-form-item label="批量删除" prop="isMulDelete" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
              v-model="tableConfig.isMulDelete"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="是否多选" prop="isTableMulChoose" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
              v-model="tableConfig.isTableMulChoose"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="显示搜索" prop="showSearch" :rules="formRules.isNotNull('showSearch not null')" label-position="left">
          <el-switch
              v-model="tableConfig.showSearch"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="表格列操作" prop="columnSetting" :rules="formRules.isNotNull('columnSetting not null')" label-position="left">
          <el-switch
              v-model="tableConfig.columnSetting"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <div class="rowSS">
          <el-form-item label="导入" prop="isImport" :rules="formRules.isNotNull('isImport not null')" label-position="left">
            <el-switch
                v-model="tableConfig.isImport"
                inline-prompt
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="true"
                :inactive-value="false"
            />
          </el-form-item>
          <el-input v-if="tableConfig.isImport" v-model="apiConfig.importApi" class="wi-200px" placeholder="导入地址"/>
          <el-input v-if="tableConfig.isImport" v-model="apiConfig.templateDownApi" class="wi-200px" placeholder="模板下载地址"/>
        </div>
        <div class="rowSS">
          <el-form-item label="导出" prop="isExport" :rules="formRules.isNotNull('isExport not null')" label-position="left">
            <el-switch
                v-model="tableConfig.isExport"
                inline-prompt
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="true"
                :inactive-value="false"
            />
          </el-form-item>
          <el-input v-if="tableConfig.isExport" v-model="apiConfig.exportApi" class="wi-200px" placeholder="导出地址"/>
        </div>
      </el-form>
      <div>
        <el-button type="primary" @click="showCustomInput">通过swagger文档生成</el-button>
      </div>
    </FoldingCard>
    <FoldingCard title="查询字段配置">
      <FrontLowCodeTable ref="refSearchTableConfig"/>
    </FoldingCard>
    <FoldingCard title="表格字段配置">
      <FrontLowCodeTable ref="refListTableConfig" :table-type="2"/>
    </FoldingCard>
    <DateAndFileExport ref="refDateAndFileExport"/>
    <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="emitCICConfirm"/>
  </div>
</template>

<script setup lang="ts">
/*表字段信息（可多选）*/
import {useElement} from '@/hooks/use-element'
import {copyReactive} from '@/hooks/use-common'
import {changeDashToCase, changeDashToCaseAndFirstWord} from "@/components/TableExtra/front-extra-code";

/**********ref***********/
const refDateAndFileExport = ref()
const refBasicInfo = ref()
const {formRules} = useElement()
const refSearchTableConfig = ref()
const refListTableConfig = ref()
const refCustomInputColumn = ref()
/**********reactive***********/
/*前端api接口配置*/
const apiConfig = reactive({
  queryApi: '',
  queryMethod: 'get',
  deleteApi: '',
  exportApi: '',
  exportMethod: 'post',
  templateDownApi: '',
  importApi: '',
  importMethod: 'post',
  deleteMethod: 'delete',
  multiDeleteApi: '',
  multiDeleteMethod: 'delete'
})

/*前端页面参数配置*/
const tableConfig = reactive({
  isAdd: true,
  isExport: false,
  isImport: false,
  isDelete: true,
  isMulDelete: true,
  isEdit: true,
  showSearch: true,
  columnSetting: true,
  isPagination: true,
  isDetail: true,
  isTableMulChoose: true
})
/****watch,computed******/

/**********mounted***********/
onMounted(()=>{})


/**********methods***********/
const showCustomInput = () => {
  refCustomInputColumn.value.showModal()
}


const emitCICConfirm = ({requestParams, responseParams}: any) => {
  refSearchTableConfig.value.setData(requestParams)
  refListTableConfig.value.setData(responseParams)
}
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
    //查询
    const queryConfig=refSearchTableConfig.value.getData()
    //返回
    const tableList=refListTableConfig.value.getData()

    //转换基础配置
    basicConfig.apiFileNameDash = changeDashToCase(basicConfig.apiFileName)
    basicConfig.apiFileNameFirstCase = changeDashToCaseAndFirstWord(basicConfig.apiFileName)
    const generatorData = {
      basicConfig,
      dateAndFileExport,
      apiConfig,
      tableConfig,
      queryConfig,
      tableList
    }
    resolve(generatorData)
  })
}


//回显模板数据
const setData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  //基础配置
  refBasicInfo.value.setData(generatorConfig.basicConfig)
  //生成文件
  refDateAndFileExport.value.setData(generatorConfig.dateAndFileExport)
  //api文件
  copyReactive(apiConfig, generatorConfig.apiConfig)
  //查询
  refSearchTableConfig.value.reshowData(generatorConfig.queryConfig)
  //返回
  refListTableConfig.value.reshowData(generatorConfig.tableList)
}


/******defineExpose*******/
defineExpose({getData, setData,getSaveTmp})
</script>
