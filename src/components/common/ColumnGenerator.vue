<template>
  <FoldingCard title="数据来源">
    <el-button type="primary" @click="bySwagger">通过swagger文档生成</el-button>
<!--    <el-button type="primary" @click="byColumn">通过数据库字段生成</el-button>-->
    <!-- 数据库字段   -->
    <el-select  v-model="chooseTmp" filterable placeholder="通过后端数据回显" class="wi-300px ml-20px">
      <el-option
          v-for="item in configList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          @click="configChoose(item)"
      />
    </el-select>
  </FoldingCard>
  <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="BySwagger"/>
<!--<DBColumnModal ref="refDBColumnModal" :db-info="dataBaseInfo" @sync-req="syncReq" @sync-res="syncRes"/>-->
</template>

<script setup lang="ts" injectCode>
import CustomInputColumn from "@/components/CustomInputColumn/CustomInputColumn.vue";
import {getConfigSaveDetail, getSaveTmpReq} from "@/api/basic";
const useAttr:any= useAttrs();
/*初始数据设置*/
const checkColumnArr:any = ref([])
/**********props***********/

/**********ref***********/
const refCustomInputColumn = ref()
const refDBColumnModal = ref()
const configList: any = ref([])

const chooseTmp=ref([])
/**********reactive***********/

/**********mounted***********/
onMounted(()=>{
  getSaveTmp()
})

/**********methods***********/
const getSaveTmp = () => {
  getSaveTmpReq({pageSize: 50, pageNum: 1,name:"Back"}).then(({data}) => {
    configList.value = data
  })
}

//选择模板后处理逻辑
const configChoose=({id})=>{
  getConfigSaveDetail(id).then(({data})=>{
    useAttr.setByBackData(JSON.parse(data.generatorConfig))
  })
}

const bySwagger = ()=>{
  refCustomInputColumn.value.showModal()

}
const byColumn = ()=>{
  refDBColumnModal.value.showModal()
}


const emits = defineEmits(['setReq','setRes'])
const BySwagger = ({requestParams, responseParams}: any) => {
  emits("setReq",requestParams)
  emits("setRes",responseParams)
}




const syncReq = (data)=>{
  emits("setReq",data)
}


const syncRes = (data)=>{
  emits("setRes",data)
}

/*******get,set,reset,clear*******/

/******defineExpose*******/


</script>


<style scoped lang="scss">

</style>
