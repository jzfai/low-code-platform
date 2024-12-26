<template>
  <FoldingCard title="保存数据和生成文件">
    <div class="mb-20px">
      <div class="mb-10px ">选择项目</div>
      <el-select v-model="projectId" filterable placeholder="选择项目" class="wi-300px mr-10px">
        <el-option
            v-for="item in templateFileData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click="saveProjectInfo(item)"
        />
      </el-select>
    </div>
    <div class="mb-10px">保存当前配置</div>
    <div class="rowSS ">
      <el-input v-model="saveFileName" class="wi-300px mr-10px" placeholder="保存文件名(可以不填写)" />
      <el-button type="primary" @click="saveTmp">保存</el-button>
    </div>
    <el-button type="primary" class="mt-20px" @click="generatorBaseModelTemp">生成代码</el-button>
  </FoldingCard>
</template>


<script setup injectCode lang="ts">
/**********props***********/
import {useBasicStore} from "@/store/basic";


/**********ref***********/
const saveFileName = ref('')
const projectId = ref('')
const templateFileData = ref([])
/**********reactive***********/

/**********mounted***********/
const route = useRoute();
const pageId:any=route.name
onMounted(()=>{
   templateFileReq()
})

/**********methods***********/
const projectInfo=ref<any>({})
const saveProjectInfo=(item)=>{
  projectInfo.value=item
}
/**********request***********/
const generatorBaseModelTemp = async() => {
  const subData=await useAttr?.getData()
  //填充项目基础信息
  if(!Object.keys(projectInfo.value)){
    elMessage("请选择项目","warning")
    return
  }
  const subFormData = new FormData()
  subFormData.append('modelId', projectId.value)
  subFormData.append('jsonData', JSON.stringify(Object.assign(subData,{projectInfo:projectInfo.value})))
  const reqConfig = {
    url: '/generator/templateFile/createProjectByConfig',
    method: 'post',
    data: subFormData
  }
  //先保存，在生成
  saveTmp();
  downLoadTempByApi(reqConfig)
}
const useAttr:any= useAttrs();

const userInfo=ref<any>()
onMounted(()=>{
  const basicStore = useBasicStore()
  userInfo.value=basicStore.userInfo
})


//清空数据
const resetData=()=>{
  projectId.value=""
  saveFileName.value=""
}
const saveTmp = async () => {
  //填充项目基础信息
  if(!Object.keys(projectInfo?.value||{}).length){
    elMessage("请选择项目","warning")
    return
  }
  const subData= await useAttr?.getData()
  const reqConfig = {
    url: '/generator/configSave',
    method: 'post',
    data: {
      name:`${saveFileName.value}-${pageId}-${projectInfo.value.id}-${userInfo.value.nickName}-${getCurrentTime()}`,
      generatorConfig: JSON.stringify(Object.assign(subData))
    }
  }
  axiosReq(reqConfig).then(() => {
    elMessage('配置保存成功',"success")
    getSaveTmp()
    useAttr.getSaveTmp()
  })
}
//滚动保存最近3次
const getSaveTmp = () => {
  const reqConfig = {
    url: '/generator/configSave/listPage',
    method: 'get',
    bfLoading: false,
    data: {pageSize: 10, pageNum: 1, name: `${saveFileName.value}-${pageId}`}
  }
  axiosReq(reqConfig).then(({data}) => {
    //记录保存最近3条
    data.forEach((f,index)=>{
      if(index>1){
        deleteConfigSave(f.id)
      }
    })
  })
}
const deleteConfigSave = (id) => {
  const reqConfig = {
    url: `/generator/configSave/${id}`,
    bfLoading: false,
    method: 'delete'
  }
  axiosReq(reqConfig)
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
     projectId:projectId.value
   }
}
//项目信息
const getProjectInfo=()=>{
  const projectConfig=JSON.parse(JSON.stringify(projectInfo.value))

  if(projectConfig.originPackage){
    projectConfig.projectDir=projectConfig.originPackage.replace(/com./g, '').replace(/\./g, '-');
  }
  return projectConfig
}
const setData = (data)=>{
  saveFileName.value=data.dateAndFileExport.saveFileName
  projectId.value=data.dateAndFileExport.projectId
  projectInfo.value=data.projectInfo
}
const setSaveFileName = (name)=>{
  saveFileName.value=name
}
/******defineExpose*******/
defineExpose({ resetData,setData,getData,getProjectInfo,setSaveFileName })
</script>


<style scoped lang="scss">

</style>
