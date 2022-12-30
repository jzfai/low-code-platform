<template>
  <el-select v-model="chooseTmpFile" filterable placeholder="选择模版文件" class="w-200px mr-10px">
    <el-option
      v-for="item in templateFileData"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      @click="chooseTemplateFile(item)"
    />
  </el-select>
</template>

<script setup>
//查询配置模版
import { elMessage } from '@/hooks/use-element.ts'

const chooseTmpFile = $ref('')
let templateFileData = $ref([])
const templateFileReq = () => {
  const reqConfig = {
    url: '/basis-func/templateFile/selectPage',
    method: 'get',
    data: { pageSize: 500, pageNum: 1 }
  }
  axiosReq(reqConfig).then(({ data }) => {
    templateFileData = data?.records
  })
}
defineEmits(['chooseTemplateFile'])
let chooseTemplateItem = $ref(null)
const chooseTemplateFile = (item) => {
  chooseTemplateItem = item
}

const returnData = () => {
  if (!chooseTemplateItem) {
    elMessage('请先选择模板文件')
  }
  return chooseTemplateItem
}
const reshowData = (item) => {
  chooseTemplateItem = item
}
onMounted(() => {
  templateFileReq()
})

defineExpose({ returnData, reshowData })
</script>

<style scoped lang="scss"></style>
