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

const chooseTmpFile = ref('')
const templateFileData = ref([])
const templateFileReq = () => {
  const reqConfig = {
    url: '/basis-func/templateFile/selectPage',
    method: 'get',
    data: { pageSize: 500, pageNum: 1 }
  }
  axiosReq(reqConfig).then(({ data }) => {
    templateFileData.value = data?.records
  })
}
defineEmits(['chooseTemplateFile'])
const chooseTemplateItem = ref()
const chooseTemplateFile = (item) => {
  chooseTemplateItem.value = item
}

const returnData = () => {
  if (!chooseTemplateItem.value) {
    elMessage('请先选择模板文件',"warning")
  }
  return chooseTemplateItem.value
}
const reshowData = (item) => {
  chooseTemplateItem.value = item
  reshowChooseTmpFile(item.id)
}

const reshowChooseTmpFile = (item) => {
  chooseTmpFile.value = item
}
onMounted(() => {
  templateFileReq()
})

defineExpose({ returnData, reshowData,reshowChooseTmpFile })
</script>

<style scoped lang="scss"></style>
