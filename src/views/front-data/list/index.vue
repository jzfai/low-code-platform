<template>
  <div class="project-page-style">
    <BasicInfo ref="refBasicInfo" :basic-type="2" :setData="setData" :showGeneralProject="true" :clearAllData="clearColumn"/>
    <ColumnGenerator ref="refColumnGenerator" :setByBackData="setByBackData"    @setReq="setReq"/>

    <!-- 前端请求接口配置  -->
    <FoldingCard title="接口配置">
      <el-form ref="refForm" label-width="100px" :inline="true" :model="apiConfig" class="pr-5">
        <el-form-item label="查询接口" prop="queryApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <div class="rowSS">
            <el-input v-model="apiConfig.queryApi" placeholder="查询接口" class="wi-250px"/>
            <el-input v-model="apiConfig.queryMethod" placeholder="查询方法" class="wi-80px"/>
          </div>
        </el-form-item>
        <el-form-item label="新增接口" prop="insertApi" :rules="formRules.isNotNull('新增接口')" label-position="left">
          <div class="rowSS">
            <el-input v-model="apiConfig.insertApi" placeholder="新增接口" class="wi-250px" />
            <el-input v-model="apiConfig.insertMethod" placeholder="新增方法" class="wi-80px" />
          </div>
        </el-form-item>
        <el-form-item label="更新接口" prop="updateApi" :rules="formRules.isNotNull('更新接口')" label-position="left">
          <div class="rowSS">
            <el-input v-model="apiConfig.updateApi" placeholder="更新接口" class="wi-250px" />
            <el-input v-model="apiConfig.updateMethod" placeholder="更新方法" class="wi-80px" />
          </div>
        </el-form-item>
        <el-form-item label="详情接口" prop="detailApi" :rules="formRules.isNotNull('详情接口')" label-position="left">
          <div class="rowSS"> <el-input v-model="apiConfig.detailApi" placeholder="详情接口" class="wi-250px" />
            <el-input v-model="apiConfig.detailMethod" placeholder="详情方法" class="wi-60px" /></div>
        </el-form-item>

        <el-form-item label="删除接口" prop="deleteApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <div class="rowSS">
            <el-input v-model="apiConfig.deleteApi" placeholder="删除接口" class="wi-250px"/>
            <el-input v-model="apiConfig.deleteMethod" placeholder="删除方法" class="wi-80px"/>
          </div>
        </el-form-item>
        <el-form-item label="批量删除接口" prop="multiDeleteApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <div class="rowSS">
            <el-input v-model="apiConfig.multiDeleteApi" placeholder="批量删除接口" class="wi-250px"/>
            <el-input v-model="apiConfig.multiDeleteMethod" placeholder="批量删除方法" class="wi-80px"/>
          </div>
        </el-form-item>
        <el-form-item label="基础文件名" prop="basicFileName" :rules="formRules.isNotNull('基础文件名')" label-position="left">
          <el-input v-model="apiConfig.basicFileName" placeholder="基础文件名" class="wi-250px" />
        </el-form-item>
        <el-form-item label="基础名称" prop="basicNameDesc" :rules="formRules.isNotNull('基础名称')" label-position="left">
          <el-input v-model="apiConfig.basicNameDesc" placeholder="基础名称" class="wi-250px" />
        </el-form-item>
      </el-form>
    </FoldingCard>
    <FoldingCard title="表格功能配置">
      <el-form ref="refCcForm" label-width="150px" :inline="true" :model="tableOperConfig" :rules="formRules" class="pr-5">
        <el-form-item label="新增" prop="isAdd" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
              v-model="tableOperConfig.isAdd"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="分页" prop="isPagination" :rules="formRules.isNotNull('isPagination not null')" label-position="left">
          <el-switch
              v-model="tableOperConfig.isPagination"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="编辑" prop="isEdit" :rules="formRules.isNotNull('isEdit is null')" label-position="left">
          <el-switch
              v-model="tableOperConfig.isEdit"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="详情" prop="isDetail" :rules="formRules.isNotNull('isDetail is not null')" label-position="left">
          <el-switch
              v-model="tableOperConfig.isDetail"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="删除" prop="isDelete" :rules="formRules.isNotNull('isDelete not null')" label-position="left">
          <el-switch
              v-model="tableOperConfig.isDelete"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>

<!--        <el-form-item label="批量删除" prop="isMulDelete" :rules="formRules.isNotNull('不能为空')" label-position="left">-->
<!--          <el-switch-->
<!--              v-model="tableOperConfig.isMulDelete"-->
<!--              inline-prompt-->
<!--              active-color="#13ce66"-->
<!--              inactive-color="#ff4949"-->
<!--              :active-value="true"-->
<!--              :inactive-value="false"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="是否多选" prop="isTableMulChoose" :rules="formRules.isNotNull('不能为空')" label-position="left">-->
<!--          <el-switch-->
<!--              v-model="tableOperConfig.isTableMulChoose"-->
<!--              inline-prompt-->
<!--              active-color="#13ce66"-->
<!--              inactive-color="#ff4949"-->
<!--              :active-value="true"-->
<!--              :inactive-value="false"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="显示搜索" prop="showSearch" :rules="formRules.isNotNull('showSearch not null')" label-position="left">-->
<!--          <el-switch-->
<!--              v-model="tableOperConfig.showSearch"-->
<!--              inline-prompt-->
<!--              active-color="#13ce66"-->
<!--              inactive-color="#ff4949"-->
<!--              :active-value="true"-->
<!--              :inactive-value="false"-->
<!--          />-->
<!--        </el-form-item>-->
        <el-form-item label="表格列操作" prop="columnSetting" :rules="formRules.isNotNull('columnSetting not null')" label-position="left">
          <el-switch
              v-model="tableOperConfig.columnSetting"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />

        </el-form-item>
        <el-form-item label="导入" prop="isImport" :rules="formRules.isNotNull('isImport not null')" label-position="left">
          <el-switch
              v-model="tableOperConfig.isImport"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="导出" prop="isExport" :rules="formRules.isNotNull('isExport not null')" label-position="left">
          <el-switch
              v-model="tableOperConfig.isExport"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
<!--        <div class="rowSS">-->
<!-- -->
<!--&lt;!&ndash;          <el-input v-if="tableOperConfig.isImport" v-model="apiConfig.importApi" class="wi-200px" placeholder="导入地址"/>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-if="tableOperConfig.isImport" v-model="apiConfig.templateDownApi" class="wi-200px" placeholder="模板下载地址"/>&ndash;&gt;-->
<!--        </div>-->
<!--        <div class="rowSS">-->
<!--          <el-form-item label="导出" prop="isExport" :rules="formRules.isNotNull('isExport not null')" label-position="left">-->
<!--            <el-switch-->
<!--                v-model="tableOperConfig.isExport"-->
<!--                inline-prompt-->
<!--                active-color="#13ce66"-->
<!--                inactive-color="#ff4949"-->
<!--                :active-value="true"-->
<!--                :inactive-value="false"-->
<!--            />-->
<!--          </el-form-item>-->
<!--&lt;!&ndash;          <el-input v-if="tableOperConfig.isExport" v-model="apiConfig.exportApi" class="wi-200px" placeholder="导出地址"/>&ndash;&gt;-->
<!--        </div>-->
      </el-form>
    </FoldingCard>
    <FoldingCard title="查询字段配置">
      <FrontLowCodeTable ref="refSearchTableConfig"/>
    </FoldingCard>
    <FoldingCard title="表格字段配置">
      <FrontLowCodeTable ref="refListTableConfig" :table-type="2"/>
    </FoldingCard>
    <FoldingCard title="提交form字段配置">
      <FrontLowCodeTable ref="refFormTableConfig" :table-type="3"/>
    </FoldingCard>
    <FoldingCard title="详情字段配置">
      <FrontLowCodeTable ref="refDetailTableConfig" :table-type="2"/>
    </FoldingCard>
    <DateAndFileExport ref="refDateAndFileExport" :getData="getData" :setData="setData" :getSaveTmp="getSaveTmp"/>
  </div>
</template>

<script setup lang="ts">
/*表字段信息（可多选）*/
import {useElement} from '@/hooks/use-element'
import {copyReactive, resetData} from '@/hooks/use-common'
import {changeDashToCaseAndFirstWord} from "@/views/sql/sql-extra-code";
/**********ref***********/
const refDateAndFileExport = ref()
const refFormTableConfig = ref()
const refBasicInfo = ref()
const {formRules} = useElement()
const refSearchTableConfig = ref()
const refListTableConfig = ref()
const refDetailTableConfig = ref()

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
  basicFileName:"",
  basicFileNameCase:"",
  importMethod: 'post',
  deleteMethod: 'delete',
  multiDeleteApi: '',
  insertApi: '',
  insertMethod: 'post',
  basicNameDesc: "",
  updateApi: '',
  updateMethod: 'put',
  detailApi: '',
  detailMethod: 'get',
  multiDeleteMethod: 'delete'
})
const apiConfigBak=JSON.stringify(apiConfig)

/*前端页面参数配置*/
const tableOperConfig = reactive({
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

//通过后端数据回显
const setByBackData=(data)=>{
  const {queryConfig,tableConfig,basicConfig,formConfig}=data
  let reqConfig:any={}
  if(data.projectInfo?.apiConfig){
      reqConfig=JSON.parse(data.projectInfo?.apiConfig)
  }
  //清空数据
  clearColumn()
  //回显接口配置数据,此处完成api自动生成
  //查询
  if(reqConfig.apiPre){
    apiConfig.queryApi=`${reqConfig.apiPre}/${basicConfig.basicName}/${reqConfig.queryApi}`
    apiConfig.queryMethod=`${reqConfig.queryMethod}`

    //新增
    apiConfig.insertApi=`${reqConfig.apiPre}/${basicConfig.basicName}`
    apiConfig.insertMethod=`${reqConfig.insertMethod}`

    //更新
    apiConfig.updateApi=`${reqConfig.apiPre}/${basicConfig.basicName}`
    apiConfig.updateMethod=`${reqConfig.updateMethod}`

    //详情
    apiConfig.detailApi=`${reqConfig.apiPre}/${basicConfig.basicName}/${reqConfig.detailApi}`
    if(reqConfig.detailApi==="id"){
      apiConfig.detailApi=`${reqConfig.apiPre}/${basicConfig.basicName}`+`/\${${reqConfig.detailApi}}`
    }

    apiConfig.detailMethod=`${reqConfig.detailMethod}`

    //删除
    apiConfig.deleteApi=`${reqConfig.apiPre}/${basicConfig.basicName}/${reqConfig.deleteApi}`
    if(reqConfig.detailApi==="id"){
      apiConfig.deleteApi=`${reqConfig.apiPre}/${basicConfig.basicName}`+`/\${${reqConfig.deleteApi}}`
    }
    apiConfig.deleteMethod=`${reqConfig.deleteMethod}`


    //批量删除
    apiConfig.multiDeleteApi=`${reqConfig.apiPre}/${basicConfig.basicName}/${reqConfig.multiDeleteApi}`
    apiConfig.multiDeleteMethod=`${reqConfig.multiDeleteMethod}`
  }


  apiConfig.basicFileName=basicConfig.basicName
  apiConfig.basicNameDesc=basicConfig.basicNameDesc

  // const apiConfig = reactive({
  //   queryApi: '/list',
  //   queryMethod: 'Post',
  //   deleteApi: '',
  //   exportApi: '',
  //   exportMethod: 'post',
  //   templateDownApi: '',
  //   importApi: '',
  //   importMethod: 'post',
  //   deleteMethod: 'delete',
  //   multiDeleteApi: '',
  //   multiDeleteMethod: 'delete'
  // })

  //查询字段
  refSearchTableConfig.value.setData(queryConfig)
  //表格字段
  refListTableConfig.value.setData(tableConfig)

  //详情去表格字段
  refDetailTableConfig.value.setData(tableConfig)

  //form表单字段
  refFormTableConfig.value.setData(formConfig)



  //设置saveName
  refDateAndFileExport.value.setSaveFileName(basicConfig.basicNameDesc)
}

//swagger请求返回数据
const setReq = (data) => {
  refSearchTableConfig.value.setData(data)
}



const clearColumn=()=>{
  //清空原有数据
  refSearchTableConfig.value.clearData()
  refListTableConfig.value.clearData()
  refDetailTableConfig.value.clearData()
  refFormTableConfig.value.clearData()
  refBasicInfo.value.resetData()

  resetData(apiConfig,apiConfigBak)

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
    const projectInfo = refDateAndFileExport.value.getProjectInfo()
    //查询
    const queryConfig=refSearchTableConfig.value.getData()
    //返回
    const tableConfig=refListTableConfig.value.getData()
    const detailConfig=refDetailTableConfig.value.getData()
    const formConfig=refFormTableConfig.value.getData()
    basicConfig.basicName=apiConfig.basicFileName
    basicConfig.basicNameCase=changeDashToCaseAndFirstWord(apiConfig.basicFileName)
    const generatorData = {
      basicConfig,
      dateAndFileExport,
      projectInfo,
      apiConfig,
      tableOperConfig,
      queryConfig,
      detailConfig,
      tableConfig,
      formConfig
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
  refDateAndFileExport.value.setData(generatorConfig)
  //api文件
  copyReactive(apiConfig, generatorConfig.apiConfig)

  //回显table配置
  copyReactive(tableOperConfig, generatorConfig.tableOperConfig)

  //查询
  refSearchTableConfig.value.reshowData(generatorConfig.queryConfig)

  //返回
  refListTableConfig.value.reshowData(generatorConfig.tableConfig)
  refDetailTableConfig.value.reshowData(generatorConfig.detailConfig)

  //表单
  refFormTableConfig.value.reshowData(generatorConfig.formConfig)
}
/******defineExpose*******/
defineExpose({getData, setData,getSaveTmp})
</script>
