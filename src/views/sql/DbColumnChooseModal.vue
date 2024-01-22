<template>
  <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      title="库和字段选择"
      width="500px"
      append-to-body
      :before-close="handleClose"
  >
    <div class="mb-30px">
      <el-select v-model="currentRow.filterTableName" filter filterable placeholder="表">
        <el-option
            v-for="(item, index) in chooseTableArr"
            :key="index"
            :label="`${item.tableName}`"
            :value="item.tableName"
            @click="searchDbTable(item.tableName)"
        />
      </el-select>
    </div>
    <div>
      <el-select v-model="currentRow.filterColumnName" filter filterable placeholder="字段">
        <el-option
            v-for="(item, index) in currenTableArr"
            :key="index"
            :label="`${item.columnName}(${item.columnComment})`"
            :value="item.columnName"
            @click="chooseOption(item.columnName)"
        />
      </el-select>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmBtnClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">


import {ElMessage} from 'element-plus'
import {storeToRefs} from "pinia";

import {useLowCodeStore} from "@/store/low-code";
import {changeDashToCaseAndFirstWord} from "@/views/sql/sql-extra-code";
const {chooseTable}=storeToRefs(useLowCodeStore())

const chooseTableArr=chooseTable

// const current
/*获取库和表信息*/
const dataBaseInfo=reactive({
  url:"159.75.144.202:3310",
  name:"root",
  password:"@Root123",
  dbName:"micro-service-single",
  tbName:"",
})

const currenTableArr=ref();
const searchDbTable = (tableName) => {
  dataBaseInfo.tbName=tableName
  const reqConfig = {
    url:"basis-func/dataBase/getAllTable",
    data:dataBaseInfo,
    method: 'post'
  }
  axiosReq(reqConfig).then(({ data }) => {
    currenTableArr.value=data
    currentRow.value.filterColumnName=""
  })
}
const dialogVisible = ref(false)
const handleClose = () => {
  dialogVisible.value = false
}
const currentRow=ref()
const showModal = (row,key) => {
  if(key){
    currentRow.value=row[key]
  }else{
    currentRow.value=row
  }
  if(currentRow.value.filterTableName){
    searchDbTable(currentRow.value.filterTableName)
  }
  dialogVisible.value = true
}
const chooseOption=(name)=>{
  currentRow.value.filterColumnNameCase=changeDashToCaseAndFirstWord(name)
}
const confirmBtnClick=()=>{
  if(!currentRow.value.filterColumnName){
    return ElMessage({message:"字段选取不能为空",type:"warning"})
  }
  dialogVisible.value = false
  //currentRow.value={}
}
defineExpose({showModal})
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.modal-style {

  min-height: 500px;
}
</style>
