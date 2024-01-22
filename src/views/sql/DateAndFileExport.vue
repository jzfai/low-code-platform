<template>
  <FoldingCard title="保存数据和生成文件">
    <div class="mb-10px">保存当前配置</div>
    <div class="rowSS mb-20px">
      <el-input v-model="saveFileName" class="wi-200px mr-10px" placeholder="保存文件名(可以不填写)" />
      <el-button type="primary" @click="saveTmp">保存</el-button>
    </div>
    <div>
      <div class="mb-10px">选择模板文件</div>
      <el-select v-model="chooseTmpFile" filterable placeholder="选择模版文件" class="w-200px mr-10px">
        <el-option
            v-for="item in templateFileData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>
    </div>
    <el-button type="primary" class="mt-20px" @click="generatorBaseModelTemp">生成代码</el-button>
  </FoldingCard>
</template>


<script setup injectCode lang="ts">
/**********props***********/
// const props = defineProps({
//   name: {
//     require: true,
//     default: "fai",
//     type:String,
//   },
// });

/**********ref***********/
const saveFileName = ref('')
const configList:any = ref([])
const chooseTmp = ref('mysql-select')
const chooseTmpFile = ref('')
const templateFileData = ref([])
/**********reactive***********/


/****watch,computed******/
// watch(() => props.name, (oldValue,newValue) => {
//   },
//   { immediate: true }
// );
// const message = computed(() => {
//   return 'The webmaster said that you can not enter this page...'
// })


/**********mounted***********/
onMounted(()=>{
   templateFileReq()
})

/**********methods***********/

/**********request***********/
const generatorBaseModelTemp = async() => {
  const subData=await ctx.$parent.generatorSubData()
  const subFormData = new FormData()
  subFormData.append('id', chooseTmpFile.value)
  subFormData.append('fileNamePre', subData.basicConfig.basicClassName)
  subFormData.append('jsonData', JSON.stringify(subData))
  const reqConfig = {
    url: '/generator/templateFile/generatorTemplateFileByConfig',
    method: 'post',
    data: subFormData
  }
  downLoadTempByApi(reqConfig)
}

const saveTmp = async () => {
  const subData= await ctx.$parent.generatorSubData()
  subData.saveFileName=saveFileName.value
  subData.chooseTmpFile=chooseTmpFile.value
  const reqConfig = {
    url: '/generator/configSave',
    method: 'post',
    data: {
      name:`${saveFileName.value} ${ctx.$parent.pageName}(${getCurrentTime()})`,
      generatorConfig: JSON.stringify(subData)
    }
  }
  axiosReq(reqConfig).then(() => {
    elMessage('配置保存成功')
    ctx.$parent.getSaveTmp()
  })
}

const templateFileReq = () => {
  const reqConfig = {
    url: '/generator/templateFile/listPage',
    method: 'get',
    data: { pageSize: 500, pageNum: 1 }
  }
  axiosReq(reqConfig).then(({ data }) => {
    templateFileData.value = data
  })
}

const reshowData = (generatorConfig)=>{
  saveFileName.value=generatorConfig.saveFileName
  chooseTmpFile.value=generatorConfig.chooseTmpFile
}
/******defineExpose*******/
defineExpose({ reshowData })
</script>


<style scoped lang="scss">

</style>
