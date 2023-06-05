<template>
  <div class="project-page-style">
    <FoldingCard title="基础配置">
      <el-form ref="refForm" label-width="120px" :inline="true" :model="basicConfig" class="pr-5">
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
        <el-form-item label="作者" prop="author" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="basicConfig.author" placeholder="请输入作者" class="wi-300px"/>
        </el-form-item>
        <el-form-item label="生成的api文件名" prop="apiFileName" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="basicConfig.apiFileName" placeholder="生成的api文件名" class="wi-300px"/>
        </el-form-item>
        <el-form-item label="路由父路径" prop="routerParentDir" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="basicConfig.routerParentDir" placeholder="路由父路径" class="wi-300px"/>
        </el-form-item>
        <el-form-item label="modalName" prop="modalName"  label-position="left">
          <el-input v-model="basicConfig.modalName" placeholder="modalName" class="wi-300px"/>
        </el-form-item>
      </el-form>
    </FoldingCard>
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
            :rules="formRules.isNotNull()"
            label-position="left"
        >
          <el-input v-model="apiConfig.multiDeleteMethod" placeholder="批量删除方法" class="w-100px"/>
        </el-form-item>
      </el-form>
    </FoldingCard>
    <FoldingCard title="表格功能配置">
      <el-form ref="refCcForm" label-width="150px" :inline="true" :model="tableConfig" :rules="formRules" class="pr-5">
        <el-form-item label="新增" prop="isAdd" :rules="formRules.isNotNull()" label-position="left">
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

        <el-form-item label="批量删除" prop="isMulDelete" :rules="formRules.isNotNull()" label-position="left">
          <el-switch
              v-model="tableConfig.isMulDelete"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="是否多选" prop="isTableMulChoose" :rules="formRules.isNotNull()" label-position="left">
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
    <FoldingCard title="保存和生成模板">
      <div class="mb-10px">保存当前配置</div>
      <div class="rowSS mb-20px">
        <el-input v-model="saveFileName" class="wi-200px mr-10px" placeholder="保存文件名(可以不填写)"/>
        <el-button type="primary" @click="saveTmp">保存</el-button>
      </div>
      <div>
        <div class="mb-10px">选择模板文件</div>
        <TemplateConfig ref="refTemplateConfig"/>
      </div>
      <el-button type="primary" class="mt-20px" @click="generatorBaseModelTemp">点击生成模板</el-button>
    </FoldingCard>
    <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="emitCICConfirm"/>
  </div>
</template>

<script setup lang="ts">
import {changeWordToCase} from "@/components/TableExtra/front-extra-code";

/*表字段信息（可多选）*/
import TemplateConfig from '@/components/TemplateConfig.vue'
import {useElement} from '@/hooks/use-element'
import {copyReactive, downLoadTempByApi, getCurrentTime} from '@/hooks/use-common'

const {formRules} = useElement()
/*项目和作者信息配置*/
const basicConfig = reactive({
  author: '',
  apiFileName: '',
  modalName: '',
  apiFileNameFirstCase: '',
  routerParentDir: '',
  dataTime: getCurrentTime()
})
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
const refSearchTableConfig = ref()
const refListTableConfig = ref()
//生成模板
const generatorSubData = () => {
  return new Promise((resolve) => {
    basicConfig.apiFileNameFirstCase = changeWordToCase(basicConfig.apiFileName)
    const generatorData = {
      basicConfig,
      apiConfig,
      tableConfig,
      saveFileName: saveFileName.value,
      queryConfig: refSearchTableConfig.value.getData(),
      tableList: refListTableConfig.value.getData()
    }
    resolve(generatorData)
  })
}
//api文档
const refCustomInputColumn = ref()
const showCustomInput = () => {
  refCustomInputColumn.value.showModal()
}
const emitCICConfirm = ({requestParams, responseParams, swaggerApiConfig}: any) => {
  refSearchTableConfig.value.setData(requestParams)
  refListTableConfig.value.setData(responseParams)
  basicConfig.modalName = swaggerApiConfig.summary
  saveFileName.value = swaggerApiConfig.summary
}
//生成基础模板
const refTemplateConfig = ref()
const generatorBaseModelTemp = async () => {
  const subData: any = await generatorSubData()
  const {id} = refTemplateConfig.value.returnData()
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
const pageName = 'element-plus-list'
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
  axiosReq(reqConfig).then((res) => {
    elMessage('配置保存成功')
    getSaveTmp()
  })
}
//获取模板
onMounted(() => {
  getSaveTmp()
})

//查询模板
const configList: any = ref([])
const chooseTmp = ref(pageName)
const getSaveTmp = () => {
  const reqConfig = {
    url: '/basis-func/configSave/selectPage',
    method: 'get',
    data: {pageSize: 50, pageNum: 1, name: pageName}
  }
  axiosReq(reqConfig).then(({data}) => {
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

//回显模板数据
const reshowData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  copyReactive(basicConfig, generatorConfig.basicConfig)
  copyReactive(apiConfig, generatorConfig.apiConfig)
  saveFileName.value = generatorConfig.saveFileName
  copyReactive(tableConfig, generatorConfig.tableConfig)
  refSearchTableConfig.value.reshowData(generatorConfig.queryConfig)
  refListTableConfig.value.reshowData(generatorConfig.tableList)
}
defineExpose({generatorSubData})
</script>
