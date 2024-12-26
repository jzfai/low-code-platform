<template>
  <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      title="sql解析"
      class="sqlParseModal"
      width="800px"
      append-to-body
      :before-close="handleClose"
  >
    <div class="h-500px">
      <el-input   v-model="sqlValue" type="textarea"/>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirmBtnClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import axiosReq from "@/utils/axios-req";

const jsonData = ref()

const  emits=defineEmits(["sqlParseInfo"])


const dialogVisible = ref(false)
const handleClose = () => {
  resetData()
  dialogVisible.value = false
}
const sqlValue=ref()
const showModal = () => {
  dialogVisible.value = true
}
const parseSql = () => {
  const reqConfig = {
    url:"/sqlParse/parseSql",
    params:{sql:sqlValue.value},
    method: 'post'
  }
  axiosReq(reqConfig).then(({ data }) => {
    if(data.fromItem.alias){
      multiSelectDill(data)
    }else{
      singleSelectDill(data)
    }
  })
}
//单表处理（包含别名）
const singleSelectDill=(data)=>{
  /*获取表和别名*/
  const tableAndAlias={}

  const tableName=data.fromItem.name;
  //fromItem
  // data.fromItem.alias.name
  // data.fromItem.name
  //单表

  tableAndAlias[""]=tableName


  /*查询字段*/
  //where 查询字段
  const  whereColumn=extractValuesSingle(data.where,tableName)

  /*返回字段*/
  //selectItem项
  const columnNameArr=data.selectItems.map(f=>{
    return {columnName:f.expression.columnName,tableName}
  })
  emits("sqlParseInfo",{tableAndAlias,whereColumn,columnNameArr})
}
//多表处理（包含别名）
const multiSelectDill=(data)=>{
  /*获取表和别名*/
  const tableAndAlias={}

  //fromItem
  // data.fromItem.alias.name
  // data.fromItem.name
  //单表

  //多表
  tableAndAlias[data.fromItem.alias.name]=data.fromItem.name
  //joins
  data.joins.forEach(f=>{
    tableAndAlias[f.rightItem.alias.name]=f.rightItem.name
  })


  /*查询字段*/
  //where 查询字段
  const  whereColumn=extractValues(data.where,tableAndAlias)


  /*返回字段*/
  //selectItem项
  const columnNameArr=data.selectItems.map(f=>{
    return {columnName:f.expression.columnName,tableName:tableAndAlias[f.expression?.table?.name]}
  })
  emits("sqlParseInfo",{tableAndAlias,whereColumn,columnNameArr})
}
//抽取值
const  extractValues=(obj,tableAliasMapping) =>{
  let values:any = []
  if (obj?.columnName) {
    values.push({columnName:obj.columnName,tableName:tableAliasMapping[obj.table.name]})
  } else if (obj.leftExpression) {
    values = values.concat(extractValues(obj.leftExpression,tableAliasMapping))
  }
  if (obj.rightExpression) {
    values = values.concat(extractValues(obj.rightExpression,tableAliasMapping))
  }
  return values
}

const  extractValuesSingle=(obj,tableName) =>{
  let values:any = []
  if (obj?.columnName) {
    values.push({columnName:obj.columnName,tableName})
  } else if (obj.leftExpression) {
    values = values.concat(extractValuesSingle(obj.leftExpression,tableName))
  }
  if (obj.rightExpression) {
    values = values.concat(extractValuesSingle(obj.rightExpression,tableName))
  }
  return values
}

const confirmBtnClick = () => {
  parseSql()
  dialogVisible.value = false
}
const resetData=()=>{
  jsonData.value = {}
}

defineExpose({showModal})
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.modal-style {
  width: 1000px !important;
  height: 400px;
}
</style>

<style lang="scss" >
 .sqlParseModal{
   .el-textarea__inner{
     min-height: 500px!important;
   }
 }
</style>
