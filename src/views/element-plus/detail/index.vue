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
        <el-form-item label="作者" prop="author" :rules="formRules.isNotNull('作者')" label-position="left">
          <el-input v-model="basicConfig.author" placeholder="请输入作者" class="wi-300px" />
        </el-form-item>
        <el-form-item
          label="生成的api文件名"
          prop="apiFileName"
          :rules="formRules.isNotNull('api文件名')"
          label-position="left"
        >
          <el-input v-model="basicConfig.apiFileName" placeholder="生成的api文件名" class="wi-300px" />
        </el-form-item>
      </el-form>
    </FoldingCard>
    <FoldingCard title="接口配置">
      <el-form ref="refForm" label-width="100px" :inline="true" :model="apiConfig" class="pr-5">
        <el-form-item label="详情接口" prop="detailApi" :rules="formRules.isNotNull('详情接口')" label-position="left">
          <el-input v-model="apiConfig.detailApi" placeholder="详情接口" class="w-380px" />
        </el-form-item>
        <el-form-item
          label="详情方法"
          prop="detailMethod"
          :rules="formRules.isNotNull('详情方法')"
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
        <SearchTableConfig ref="refSearchTableConfig" :item="item" />
      </div>
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
  </div>
</template>

<script setup lang="ts">
import SearchTableConfig from './SearchTableConfig.vue'

const { formRules } = useElement()
/*项目和作者信息配置*/
let basicConfig = $ref({
  author: '熊猫哥',
  apiFileName: '',
  dataTime: getCurrentTime()
})
/*前端api接口配置*/
let apiConfig = $ref({
  detailApi: '',
  detailMethod: 'get'
})
const refSearchTableConfig = $ref([])

//生成模板
const generatorSubData = () => {
  basicConfig.apiFileNameFirstCase = changeTheFirstWordToCase(basicConfig.apiFileName)
  const saveArr: Array<any> = []
  return new Promise((resolve) => {
    refSearchTableConfig.forEach((fItem) => {
      const pieItem = fItem.getSearchTableData()
      saveArr.push(pieItem)
    })

    const generatorData = {
      basicConfig,
      apiConfig,
      tableConfigArr: saveArr
    }
    resolve(generatorData)
  })
}

//生成基础模板
const refTemplateConfig = $ref()
const generatorBaseModelTemp = async () => {
  const subData: any = await generatorSubData()
  const { id } = refTemplateConfig.returnData()
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
let saveFileName = $ref('')
const saveName = 'detail'
const saveTmp = async () => {
  const subData: any = await generatorSubData()
  subData.saveFileName = saveFileName
  const reqConfig = {
    url: '/basis-func/configSave/insert',
    method: 'post',
    data: {
      name: `${saveFileName} ${saveName}(${getCurrentTime()})`,
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
let configList = $ref([])
let chooseTmp = $ref(saveName)
const getSaveTmp = () => {
  const reqConfig = {
    url: '/basis-func/configSave/selectPage',
    method: 'get',
    bfLoading: true,
    data: { pageSize: 50, pageNum: 1, name: saveName }
  }
  axiosReq(reqConfig).then(({ data }) => {
    configList = data?.records
    //回显第一个元素
    for (const fItem of configList) {
      if (fItem.name.includes(saveName)) {
        chooseTmp = fItem.name
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

  basicConfig = generatorConfig.basicConfig
  saveFileName = generatorConfig.saveFileName
  apiConfig = generatorConfig.apiConfig || {}

  choosePie = generatorConfig.tableConfigArr.length
  choosePieClick(choosePie)
  //回显table的数据
  nextTick(() => {
    refSearchTableConfig.forEach((fItem, fIndex) => {
      fItem.reshowSearchTableData(generatorConfig.tableConfigArr[fIndex])
    })
  })
}

let choosePie = $ref(1) //1.文字-横向 2.文字-纵向 3.表格
let choosePieArr = $ref([])
const choosePieClick = (value) => {
  choosePieArr = []
  for (let i = 0; i < value; i++) {
    choosePieArr.push({
      direction: '1',
      splitNum: 2,
      cartTitle: '',
      columnArr: [],
      dillColumnArr: []
    })
  }
}
onMounted(() => {
  choosePieClick(choosePie)
})
defineExpose({ generatorSubData })
</script>

<style scoped lang="scss"></style>
