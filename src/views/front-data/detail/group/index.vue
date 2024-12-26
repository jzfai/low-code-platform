<template>
  <div class="project-page-style">
    <FoldingCard title="基础配置">
      <el-form ref="refForm" label-width="115px" :inline="true" :model="basicConfig" class="pr-5">
        <div class="mb-10px">
          <el-form-item label="选择回显配置" label-position="left">
            <el-select v-model="chooseTmp" filterable placeholder="选择回显配置" class="wi-300px">
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
          <el-input v-model="basicConfig.author" placeholder="请输入作者" class="w-300px" />
        </el-form-item>
        <el-form-item label="生成的api文件名" prop="apiFileName" :rules="formRules.isNotNull('不能为空')">
          <el-input v-model="basicConfig.apiFileName" placeholder="生成的api文件名" class="w-300px" />
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
              <el-input v-model="basicConfig.modalTitle" placeholder="modal标题" class="w-200px" />
            </el-form-item>
            <el-form-item label="modal宽度" prop="modalWidth" :rules="formRules.isNotNull('不能为空')">
              <el-input v-model="basicConfig.modalWidth" placeholder="modal宽度" class="w-100px" />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </FoldingCard>
    <FoldingCard title="接口配置">
      <el-form ref="refForm" label-width="120px" :inline="true" :model="apiConfig" class="pr-5">
        <el-form-item label="详情接口" prop="detailApi" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="apiConfig.detailApi" placeholder="详情接口" class="w-380px" />
        </el-form-item>
        <el-form-item
          label="详情方法"
          prop="detailMethod"
          :rules="formRules.isNotNull('不能为空')"
          label-position="left"
        >
          <el-input v-model="apiConfig.detailMethod" placeholder="详情方法" class="w-80px" />
        </el-form-item>
      </el-form>
    </FoldingCard>
    <FoldingCard title="字段配置">
      <div class="rowSC mb-40px">
        <span class="mr-10px">几个模块:</span>
        <el-select v-model="choosePie" placeholder="选择几份">
          <el-option key="1" label="1" :value="1" @click="choosePieClick(1)" />
          <el-option key="2" label="2" :value="2" @click="choosePieClick(2)" />
          <el-option key="3" label="3" :value="3" @click="choosePieClick(3)" />
          <el-option key="4" label="4" :value="4" @click="choosePieClick(4)" />
        </el-select>
      </div>
      <div v-for="(item, index) in choosePieArr" :key="index" :class="[choosePieArr.length - 1 !== index && 'mb-50px']">
        <DetailTableConfig ref="refDetailTableConfig" :item="item" />
      </div>
    </FoldingCard>

    <FoldingCard title="保存和生成模板">
      <div class="rowSS mb-20px">
        <el-input v-model="saveFileName" class="wi-200px mr-10px" placeholder="保存文件名(可以不填写)" />
        <el-button type="primary" @click="saveTmp">保存配置</el-button>
        <el-button type="primary" @click="copyJson">复制json数据</el-button>
      </div>
      <div>
        <div class="mb-10px">选择模板文件</div>
        <TemplateConfig ref="refTemplateConfig" />
      </div>
      <div class="mt-20px">
        <div class="mt-10px mb-20px">
          <el-image
            style="width: 100px; height: 100px"
            src="./pre-image/settle-detail.png"
            :preview-src-list="['./pre-image/settle-detail.png']"
            :initial-index="1"
            fit="cover"
          />
        </div>
        <el-button type="primary" @click="generatorBaseModelTemp">点击生成模板</el-button>
      </div>
    </FoldingCard>
  </div>
</template>

<script setup lang="ts">
import DetailTableConfig from './DetailTableConfig.vue'
import {changeWordToCase} from "@/components/TableExtra/front-extra-code";
import {copyReactive, downLoadTempByApi} from '@/hooks/use-common'
const { formRules } = useElement()
/*项目和作者信息配置*/
const basicConfig = reactive({
  author: '',
  apiFileName: '',
  apiFileNameCase: '',
  dataTime: getCurrentTime(),
  modalTitle: '',
  modalWidth: 500,
  isModal: 'false'
})
/*前端api接口配置*/
const apiConfig = reactive({
  detailApi: '',
  detailMethod: 'get'
})

/*表字段信息（可多选）*/
//Search
const refDetailTableConfig = ref([])
const copyJson = async () => {
  const subData = await generatorSubData()
  copyValueToClipboard(JSON.stringify(subData))
  elMessage('复制成功')
}

//生成模板
const generatorSubData = () => {
  const saveArr: Array<any> = []
  return new Promise((resolve) => {
    refDetailTableConfig.value.forEach((fItem:any) => {
      const pieItem = fItem.getSearchTableData()
      saveArr.push(pieItem)
    })

    basicConfig.apiFileNameCase = changeWordToCase(basicConfig.apiFileName)
    const generatorData = {
      basicConfig,
      apiConfig,
      saveFileName:saveFileName.value,
      tableConfigArr: saveArr
    }
    if (!saveFileName) {
      saveFileName.value = basicConfig.apiFileName
    }
    resolve(generatorData)
  })
}

const refTemplateConfig = ref()
const generatorBaseModelTemp = async () => {
  const subData: any = await generatorSubData()
  const { id } = refTemplateConfig.value.returnData()
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
const saveFileName:any = ref()
const saveName = 'settle-first-detail'
const saveTmp = async () => {
  const subData = await generatorSubData()
  const reqConfig = {
    url: '/generator/configSave',
    method: 'post',
    data: {
      name: `${saveFileName.value}-${saveName}(${getCurrentTime()})`,
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
const configList:any = ref([])
const chooseTmp = ref('')
const getSaveTmp = () => {
  const reqConfig = {
    url: '/generator/configSave/listPage',
    method: 'get',
    bfLoading: true,
    data: { pageSize: 200, pageNum: 1, name: saveName }
  }
  axiosReq(reqConfig).then(({ data }) => {
    configList.value = data
    //回显第一个元素
    for (const fItem of configList.value) {
      if (fItem.name?.includes(saveName)) {
        chooseTmp.value = fItem.name
        reshowData(fItem)
        return
      }
    }
  })
}

//配置选择
const reshowConfig = (item) => {
  reshowData(item)
}
const reshowData = (item) => {
  const generatorConfig = JSON.parse(item.generatorConfig)
  copyReactive(basicConfig,generatorConfig.basicConfig || generatorConfig.poaForm)
  copyReactive(apiConfig,generatorConfig.apiConfig || {})
  saveFileName.value = generatorConfig.saveFileName
  choosePie.value = generatorConfig.tableConfigArr.length
  choosePieClick(choosePie.value)
  //回显table的数据
  nextTick(() => {
    refDetailTableConfig.value.forEach((fItem:any, fIndex) => {
      fItem.reshowSearchTableData(generatorConfig.tableConfigArr[fIndex] || [])
    })
  })
}

const choosePie = ref(1) //1.文字-横向 2.文字-纵向 3.表格
const choosePieArr:any = ref([])
const choosePieClick = (value) => {
  choosePieArr.value = []
  for (let i = 0; i < value; i++) {
    choosePieArr.value.push({
      direction: '1',
      tableDataType: 2,
      field: '',
      method: '',
      api: '',
      splitNum: 2,
      cartTitle: '',
      columnArr: [],
      dillColumnArr: []
    })
  }
}
defineExpose({ generatorSubData })
</script>

<style scoped lang="scss"></style>
