<template>
  <div class="project-page-style">
    <!-- 导入文件部分   -->
    <FoldingCard title="基础模板和数据配置">
      <div class="rowSS mb-10px">
        <el-select v-model="chooseTmp" filterable placeholder="选择回显配置" class="w-300px">
          <el-option
            v-for="item in configList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click="reshowConfig(item)"
          />
        </el-select>
        <el-button class="ml-20px" type="primary" @click="copyJson">复制json数据</el-button>
        <el-button
          class="ml-20px"
          type="primary"
          @click="downLoadTempByUrl('https://github.jzfai.top/file/velocity-template/element-plus.zip')"
        >
          下载element-plus模板
        </el-button>
        <el-button
          class="ml-20px"
          type="primary"
          @click="downLoadTempByUrl('https://github.jzfai.top/file/velocity-template/mybatis-plus.zip')"
        >
          下载mybatis-plus基础模板
        </el-button>
        <el-button
          class="ml-20px"
          type="primary"
          @click="downLoadTempByUrl('https://github.jzfai.top/file/velocity-template/mybatis-plus-multi.zip')"
        >
          下载mybatis-plus多表模板
        </el-button>
      </div>
      <CustomUploadVms ref="refCustomUploadVms" />
    </FoldingCard>
    <div class="rowSC mt-20px">
      <InputCode ref="refInputCode" />
      <el-button class="ml-4px mr-4px" @click="generatorOutputCode">生成</el-button>
      <OutputCode ref="refOutPutCode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputCode from './InputCode.vue'
import OutputCode from './OutputCode.vue'
import CustomUploadVms from './CustomUploadVms.vue'
import { AxiosReqTy } from '~/common'
const { downLoadTempByUrl } = useCommon()
//获取模板
onMounted(() => {
  getSaveTmp()
})

let tmpJsonData = $ref({})
const reshowConfig = (item) => {
  tmpJsonData = JSON.parse(item.generatorConfig)
}
//查询模板
let configList = $ref([])
let chooseTmp = $ref('')
const getSaveTmp = () => {
  let reqConfig: AxiosReqTy = {
    url: '/basis-func/generatorConfigSave/selectPage',
    method: 'get',
    bfLoading: true,
    data: { pageSize: 50, pageNum: 1 }
  }
  axiosReq(reqConfig).then(({ data }) => {
    configList = data?.records
  })
}

//生成低代码演示
const refCustomUploadVms = $ref(null)
const refInputCode = $ref(null)
const refOutPutCode = $ref(null)
const generatorOutputCode = async () => {
  //获取基础模板文件
  let subFormData = await refCustomUploadVms.returnData(tmpJsonData)
  //获取edit里的数据
  let inputCode = refInputCode.code
  subFormData.append('code', inputCode)
  //回显返回的字符串
  let data = await fileUploadSave(subFormData)
  refOutPutCode.setCode(data)
}

const fileUploadSave = (formData) => {
  return new Promise((resolve) => {
    axiosReq({
      url: '/basis-func/mybatis-plus/test-tmp-generator',
      data: formData,
      method: 'post',
      bfLoading: false,
      isUploadFile: true
    }).then(({ data }) => {
      resolve(data)
    })
  })
}
const { formRules, elMessage } = useElement()
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
const copyJson = async () => {
  toClipboard(JSON.stringify(tmpJsonData))
  elMessage('复制成功')
}
</script>

<style scoped lang="scss"></style>
