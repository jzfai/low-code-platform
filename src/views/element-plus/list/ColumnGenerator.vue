<template>
  <FoldingCard title="字段生成">
    <el-button type="primary" @click="bySwagger">通过swagger文档生成</el-button>
    <el-button type="primary" @click="byColumn">通过数据库字段生成</el-button>

    <!-- 数据库字段   -->
    <div class="mt-20px">
      <el-button type="primary" @click="syncQuery">同步到查询</el-button>
      <el-button type="primary" @click="syncBack">同步到返回</el-button>
    </div>
    <!-- 选中的字段-->
    <div class="mt-30px mb-10px rowSC">
      <span>选中的字段</span>
      <el-button text type="danger" class="ml-1" @click="clearAllColumn">清空</el-button>
    </div>
    <div class="rowSC flex-wrap">
      <div v-for="(item, index) in checkColumnArr" :key="index" class="rowSC mr-20px  mb-15px">
        <span style="color: #e6a23c">{{ item.columnName }}({{ item.columnComment }})</span>
        <ElSvgIcon name="CircleClose" :size="14" style="cursor: pointer" @click="deleteColumn(index)" />
      </div>
    </div>

  </FoldingCard>
  <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="emitCICConfirm"/>
  <DBColumnModal ref="refDBColumnModal" :db-info="dataBaseInfo"/>
</template>

<script setup lang="ts">
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
// const props = defineProps({
//   name: {
//     require: true,
//     default: "fai",
//     type:String,
//   },
// });

/**********ref***********/
const refCustomInputColumn = ref()
const refDBColumnModal = ref()

/**********reactive***********/


/**********mounted***********/
onMounted(()=>{})

/**********methods***********/
const deleteColumn = (dIndex) => {
  checkColumnArr.value.splice(dIndex, 1)
}
const syncQuery = ()=>{

}

const syncBack = ()=>{

}

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
/**********request***********/

/*******get,set,reset,clear*******/

/******defineExpose*******/

</script>


<style scoped lang="scss">

</style>
