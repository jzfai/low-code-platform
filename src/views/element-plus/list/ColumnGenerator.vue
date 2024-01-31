<template>
  <FoldingCard title="字段生成">
    <el-button type="primary" @click="bySwagger">通过swagger文档生成</el-button>
    <el-button type="primary" @click="byColumn">通过数据库字段生成</el-button>
    <!-- 数据库字段   -->

  </FoldingCard>
  <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="emitCICConfirm"/>
  <DBColumnModal ref="refDBColumnModal" :db-info="dataBaseInfo" @syncQuery="syncQuery" @sync-back="syncBack"/>
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



const bySwagger = ()=>{
  refCustomInputColumn.value.showModal()

}
const byColumn = ()=>{
  refDBColumnModal.value.showModal()
}

const emitCICConfirm = ({requestParams, responseParams}: any) => {
  // refSearchTableConfig.value.setData(requestParams)
  // refListTableConfig.value.setData(responseParams)
}

const syncQuery = (data)=>{
  ctx.$parent.setQueryConfig(data)
}


const syncBack = (data)=>{
  ctx.$parent.setBackConfig(data)
}
/**********request***********/

/*******get,set,reset,clear*******/

/******defineExpose*******/

</script>


<style scoped lang="scss">

</style>
