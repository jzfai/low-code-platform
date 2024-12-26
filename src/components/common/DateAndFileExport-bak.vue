<template>
  <FoldingCard title="保存数据和生成文件">
    <div class="mb-10px">保存当前配置</div>
    <div class="rowSS mb-20px">
      <el-input v-model="saveFileName" class="wi-300px mr-10px" placeholder="保存文件名(可以不填写)" />
      <el-button type="primary" @click="saveTmp">保存</el-button>
    </div>
    <div>
      <div class="mb-10px">选择模板文件</div>
      <el-select v-model="chooseTmpFile" filterable placeholder="选择模版文件" class="wi-300px mr-10px">
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


/**********ref***********/
const saveFileName = ref('')
const configList:any = ref([])
const chooseTmp = ref('mysql-select')
const chooseTmpFile = ref('')
const templateFileData = ref([])
/**********reactive***********/



/**********mounted***********/
const route = useRoute();
const pageId:any=route.name
onMounted(()=>{
   templateFileReq()

})

/**********methods***********/

/**********request***********/
const generatorBaseModelTemp = async() => {

  console.log(useAttr);
  const subData=await useAttr?.getData()
  const subFormData = new FormData()
  subFormData.append('id', chooseTmpFile.value)
  subFormData.append('fileNamePre', subData.basicConfig.basicNameCase)
  subFormData.append('jsonData', JSON.stringify(subData))
  const reqConfig = {
    url: '/generator/templateFile/generatorTemplateFileByConfig',
    method: 'post',
    data: subFormData
  }
  //先保存，在生成
  saveTmp();
  downLoadTempByApi(reqConfig)
}
const useAttr:any= useAttrs();
const saveTmp = async () => {
  const subData= await useAttr?.getData()
  const reqConfig = {
    url: '/generator/configSave',
    method: 'post',
    data: {
      name:`${saveFileName.value}-${pageId}-${getCurrentTime()}`,
      generatorConfig: JSON.stringify(subData)
    }
  }
  axiosReq(reqConfig).then(() => {
    elMessage('配置保存成功',"success")
    useAttr.getSaveTmp()
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
const getData = ()=>{
   return{
     saveFileName: saveFileName.value,
     chooseTmpFile:chooseTmpFile.value
   }
}
const setData = (dateAndFileExport)=>{
  saveFileName.value=dateAndFileExport.saveFileName
  chooseTmpFile.value=dateAndFileExport.chooseTmpFile
}
/******defineExpose*******/
defineExpose({ setData,getData })
</script>


<style scoped lang="scss">

</style>
