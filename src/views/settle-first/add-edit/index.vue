<template>
  <div class="project-page-style scroll-y">
    <FoldingCard title="基础配置">
      <el-form ref="refForm" label-width="115px" :inline="true" :model="basicConfig" class="pr-5">
        <div class="mb-10px">
          <el-form-item label="选择回显配置" label-position="left">
            <el-select v-model="chooseTmp" filterable placeholder="选择回显配置" class="w-300px">
              <el-option
                  v-for="item in configList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  @click="reshowConfig(item)"
              />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="作者" prop="author" :rules="formRules.isNotNull('不能为空')">
          <el-input v-model="basicConfig.author" placeholder="请输入作者" class="w-300px"/>
        </el-form-item>
        <el-form-item label="生成的api文件名" prop="apiFileName" :rules="formRules.isNotNull('不能为空')">
          <el-input v-model="basicConfig.apiFileName" placeholder="生成的api文件名" class="w-300px"/>
        </el-form-item>
        <div class="rowSC mt-20px">
          <el-form-item
              label="是否modal"
              prop="isImport"
              :rules="formRules.isNotNull('不能为空')"
              label-position="left"
          >
            <el-switch
                v-model="basicConfig.isModal"
                inline-prompt
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="true"
                inactive-value="false"
            />
          </el-form-item>
          <div v-if="basicConfig.isModal === 'true'" class="rowSC">
            <el-form-item label="modal标题" prop="modalTitle" :rules="formRules.isNotNull('不能为空')">
              <el-input v-model="basicConfig.modalTitle" placeholder="modal标题" class="w-200px"/>
            </el-form-item>
            <el-form-item label="modal宽度" prop="modalWidth" :rules="formRules.isNotNull('不能为空')">
              <el-input v-model="basicConfig.modalWidth" placeholder="modal宽度" class="w-100px"/>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </FoldingCard>
    <!-- 前端请求接口配置  -->
    <FoldingCard title="接口配置">
      <el-form ref="refForm" label-width="100px" :inline="true" :model="apiConfig" class="pr-5">
        <el-form-item label="新增接口" prop="insertApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="apiConfig.insertApi" placeholder="新增接口" class="w-380px"/>
        </el-form-item>
        <el-form-item
            label="新增方法"
            prop="insertMethod"
            :rules="formRules.isNotNull('不能为空')"
            label-position="left"
        >
          <el-input v-model="apiConfig.insertMethod" placeholder="新增方法" class="w-380px"/>
        </el-form-item>
        <el-form-item label="更新接口" prop="updateApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="apiConfig.updateApi" placeholder="更新接口" class="w-380px"/>
        </el-form-item>
        <el-form-item
            label="更新方法"
            prop="updateMethod"
            :rules="formRules.isNotNull('不能为空')"
            label-position="left"
        >
          <el-input v-model="apiConfig.updateMethod" placeholder="更新方法" class="w-380px"/>
        </el-form-item>

        <div>
          <el-button type="primary" @click="showCustomInput">通过swagger文档生成</el-button>
        </div>
      </el-form>
    </FoldingCard>

    <FoldingCard title="提交form字段配置">
      <FrontLowCodeTable ref="refFormTableConfig" :table-type="3"/>
    </FoldingCard>

    <FoldingCard title="保存和生成模板">
      <div class="mb-10px">保存当前配置</div>
      <div class="rowSS mb-20px">
        <el-input v-model="saveFileName" class="wi-200px mr-10px" placeholder="保存文件名(可以不填写)"/>
        <el-button type="primary" @click="saveTmp">保存配置</el-button>
        <el-button type="primary" @click="copyJson">复制json数据</el-button>
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
              src="./pre-image/settle-add-edit.png"
              :preview-src-list="['./pre-image/settle-add-edit.png']"
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
  changeTheFirstWordToCase
} from "@/components/TableExtra/front-extra-code";
import {copyReactive, downLoadTempByApi, getCurrentTime} from '@/hooks/use-common'

const {formRules} = useElement()
/*项目和作者信息配置*/
/*前端api接口配置*/
const basicConfig = reactive({
  author: '',
  apiFileName: '',
  apiFileNameDash: "",
  dataTime: getCurrentTime(),
  apiFileNameFirstCase: "",
  modalTitle: '',
  modalWidth: 500,
  isModal: 'false'
})
/*前端api接口配置*/
const apiConfig = reactive({
  insertApi: '',
  insertMethod: 'post',
  updateApi: '',
  updateMethod: 'post'
})

/*表字段信息（可多选）*/
const refFormTableConfig = ref()

//api文档
const refCustomInputColumn = ref()
const showCustomInput = () => {
  refCustomInputColumn.value.showModal()
}
const emitCICConfirm = ({requestParams, responseParams}) => {
  refFormTableConfig.value.setData(requestParams)
}

//生成模板
const generatorSubData = () => {
  return new Promise((resolve) => {
    basicConfig.apiFileNameDash = changeDashToCase(basicConfig.apiFileName)
    basicConfig.apiFileNameFirstCase = changeDashToCaseAndFirstWord(basicConfig.apiFileName)
    const generatorData = {
      basicConfig,
      apiConfig,
      saveFileName: saveFileName.value,
      tableList: refFormTableConfig.value.getData()
    }
    resolve(generatorData)
  })
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
const pageName = 'settle-first-add-edit'
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
  axiosReq(reqConfig).then(() => {
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
    bfLoading: true,
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

const reshowData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  copyReactive(basicConfig, generatorConfig.basicConfig)
  copyReactive(apiConfig, generatorConfig.apiConfig)
  saveFileName.value = generatorConfig.saveFileName
  refFormTableConfig.value.reshowData(generatorConfig.tableList)
}
defineExpose({generatorSubData})

</script>

<style scoped lang="scss"></style>
