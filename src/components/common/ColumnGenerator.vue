<template>
  <FoldingCard title="字段生成">
    <el-button type="primary" @click="bySwagger">通过swagger文档生成</el-button>
    <el-button type="primary" @click="byColumn">通过数据库字段生成</el-button>
    <!-- 数据库字段   -->

  </FoldingCard>
  <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="BySwagger"/>
  <DBColumnModal ref="refDBColumnModal" :db-info="dataBaseInfo" @sync-req="syncReq" @sync-res="syncRes"/>
</template>

<script setup lang="ts" injectCode>
import DBColumnModal from "./DBColumnModal.vue";
import CustomInputColumn from "@/components/CustomInputColumn/CustomInputColumn.vue";
/*初始数据设置*/
const dataBaseInfo = reactive({
  url: "159.75.144.202:3310",
  name: "root",
  password: "@Root123",
  dbName: "micro-service-single",
  tbName: "",
})
const checkColumnArr:any = ref([])
/**********props***********/

/**********ref***********/
const refCustomInputColumn = ref()
const refDBColumnModal = ref()

/**********reactive***********/


/**********mounted***********/
onMounted(()=>{})


/**********methods***********/
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
