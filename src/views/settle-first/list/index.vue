<template>
  <div  class="project-page-style scroll-y">
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
        <el-form-item label="作者" prop="author" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="basicConfig.author" placeholder="请输入作者" class="w-300px" />
        </el-form-item>
        <el-form-item
          label="路由父路径"
          prop="routerParentDir"
          :rules="formRules.isNotNull('不能为空')"
          label-position="left"
        >
          <el-input v-model="basicConfig.routerParentDir" placeholder="路由父路径" class="w-300px" />
        </el-form-item>
        <el-form-item
          label="生成的api文件名"
          prop="apiFileName"
          :rules="formRules.isNotNull('不能为空')"
          label-position="left"
        >
          <el-input v-model="basicConfig.apiFileName" placeholder="生成的api文件名" class="w-300px" />
        </el-form-item>
      </el-form>
    </FoldingCard>
    <!-- 前端请求接口配置  -->
    <FoldingCard title="接口配置">
      <el-form ref="refForm" label-width="100px" :inline="true" :model="apiConfig" class="pr-5">
        <el-form-item label="查询接口" prop="queryApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="apiConfig.queryApi" placeholder="查询接口" class="w-380px" />
        </el-form-item>
        <el-form-item
          label="查询方法"
          prop="queryMethod"
          :rules="formRules.isNotNull('不能为空')"
          label-position="left"
        >
          <el-input v-model="apiConfig.queryMethod" placeholder="查询方法" class="w-100px" />
        </el-form-item>

        <el-form-item label="作废接口" prop="invalidApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="apiConfig.invalidApi" placeholder="作废接口" class="w-380px" />
        </el-form-item>
        <el-form-item
          label="作废方法"
          prop="invalidMethod"
          :rules="formRules.isNotNull('不能为空')"
          label-position="left"
        >
          <el-input v-model="apiConfig.invalidMethod" placeholder="作废方法" class="w-100px" />
        </el-form-item>
      </el-form>
    </FoldingCard>
    <FoldingCard title="表格功能配置">
      <el-form ref="refCcForm" label-width="100px" :inline="true" :model="tableConfig" :rules="formRules" class="pr-5">
        <el-form-item label="新增" prop="isAdd" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
            v-model="tableConfig.isAdd"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"
          />
        </el-form-item>

        <el-form-item label="开启头过滤" prop="isAdd" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
            v-model="tableConfig.isFilterHead"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"
          />
        </el-form-item>

        <el-form-item label="分页" prop="isPagination" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
            v-model="tableConfig.isPagination"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="编辑" prop="isEdit" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
            v-model="tableConfig.isEdit"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"
          />
        </el-form-item>
        <el-form-item label="详情" prop="isDetail" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
            v-model="tableConfig.isDetail"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"
          />
        </el-form-item>

        <el-form-item label="作废" prop="isInvalid" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
            v-model="tableConfig.isInvalid"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"
          />
        </el-form-item>

        <el-form-item
          label="查询表单label宽度"
          label-width="150px"
          prop="searchLabelWidth"
          :rules="formRules.isNotNull('不能为空')"
        >
          <el-input v-model="tableConfig.searchLabelWidth" class="w-80px" />
        </el-form-item>
        <el-form-item label="表格操作宽度" prop="tableOptionWidth" :rules="formRules.isNotNull('不能为空')">
          <el-input v-model="tableConfig.tableOptionWidth" class="w-80px" />
        </el-form-item>
        <el-form-item label="导出" prop="isAdd" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-switch
            v-model="tableConfig.isExport"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"
          />
        </el-form-item>

        <div class="rowSC mt-20px">
          <el-form-item label="导入" prop="isImport" :rules="formRules.isNotNull('不能为空')" label-position="left">
            <el-switch
              v-model="tableConfig.isImport"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="true"
              inactive-value="false"
            />
          </el-form-item>
          <div v-if="tableConfig.isImport === true" class="rowSC">
            <el-form-item label="" prop="importApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
              <el-input v-model="tableConfig.importApi" class="w-200px" placeholder="导入请求api" />
            </el-form-item>
            <el-form-item label="" prop="importMethod" :rules="formRules.isNotNull('不能为空')" label-position="left">
              <el-input v-model="tableConfig.importMethod" class="w-100px" placeholder="方法" />
            </el-form-item>

            <el-form-item label="" prop="importTitle" :rules="formRules.isNotNull('不能为空')" label-position="left">
              <el-input v-model="tableConfig.importTitle" class="w-100px" placeholder="导入modal标题" />
            </el-form-item>

            <el-form-item label="" prop="importWidth" :rules="formRules.isNotNull('不能为空')" label-position="left">
              <el-input v-model="tableConfig.importWidth" class="w-100px" placeholder="导入modal宽度" />
            </el-form-item>

            <el-form-item
              label="是否显示下载模板"
              prop="importShowDownLoadTmp"
              :rules="formRules.isNotNull('不能为空')"
              label-width="120px"
              label-position="left"
            >
              <el-switch
                v-model="tableConfig.importShowDownLoadTmp"
                inline-prompt
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="true"
                inactive-value="false"
              />
            </el-form-item>

            <el-form-item
              v-if="tableConfig.importShowDownLoadTmp === true"
              label=""
              prop="importDownLoadTmpUrl"
              :rules="formRules.isNotNull('不能为空')"
              label-position="left"
            >
              <el-input v-model="tableConfig.importDownLoadTmpUrl" class="w-150px" placeholder="下载模板地址" />
            </el-form-item>
          </div>
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
        <el-input v-model="saveFileName" class="wi-200px mr-10px" placeholder="保存文件名(可以不填写)" />
        <el-button type="primary" @click="saveTmp">保存</el-button>
      </div>
      <div>
        <div class="mb-10px">选择模板文件</div>
        <TemplateConfig ref="refTemplateConfig"/>
      </div>
      <div class="mt-20px">生成模板和预览</div>
      <div class="mb-20px">
        <div class="mt-10px mb-20px">
          <el-image
            style="width: 100px; height: 100px"
            src="./pre-image/settle-list.png"
            :preview-src-list="['./pre-image/settle-list.png']"
            :initial-index="1"
            fit="cover"
          />
        </div>
        <el-button type="primary" @click="generatorBaseModelTemp">点击生成模板</el-button>
      </div>
    </FoldingCard>
    <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="emitCICConfirm"/>
  </div>
</template>

<script setup lang="ts">
import {
  changeDashToCase,
  changeDashToCaseAndFirstWord,
  changeWordToCase
} from "@/components/TableExtra/front-extra-code";
import { useElement } from '@/hooks/use-element'
import {copyReactive, downLoadTempByApi, getCurrentTime} from '@/hooks/use-common'
const { formRules } = useElement()
/*项目和作者信息配置*/
const basicConfig = reactive({
  author: '',
  apiFileName: '',
  apiFileNameDash: '',
  routerParentDir: '',
  modalName: '',
  apiFileNameFirstCase: '',
  dataTime: getCurrentTime()
})
/*前端api接口配置*/
const apiConfig = reactive({
  queryApi: '',
  queryMethod: 'get',
  invalidApi: '',
  invalidMethod: 'post'
})

/*前端页面参数配置*/
const tableConfig = reactive({
  isAdd: true,
  isMulDelete: true,
  isEdit: true,
  isPagination: true,
  isDetail: true,
  isTableMulChoose: true,
  isInvalid: true,
  isFilterHead: true,
  isImport: false,
  isExport: false,
  searchLabelWidth: 100,
  tableOptionWidth: 100
})
const refSearchTableConfig = ref()
const refListTableConfig = ref()
//生成模板
const generatorSubData = () => {
  return new Promise((resolve) => {
    basicConfig.apiFileNameDash = changeDashToCase(basicConfig.apiFileName)
    basicConfig.apiFileNameFirstCase = changeDashToCaseAndFirstWord(basicConfig.apiFileName)
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
    url: '/generator/templateFile/generatorTemplateFileByConfig',
    method: 'post',
    data: subFormData
  }
  downLoadTempByApi(reqConfig)
}
//保存模板
const saveFileName = ref('')
const pageName = 'settle-first-list'
const saveTmp = async () => {
  const subData = await generatorSubData()
  const reqConfig = {
    url: '/generator/configSave',
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
    url: '/generator/configSave/listPage',
    method: 'get',
    data: {pageSize: 50, pageNum: 1, name: pageName}
  }
  axiosReq(reqConfig).then(({data}) => {
    configList.value = data
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

<style scoped lang="scss"></style>
