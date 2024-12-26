<template>
  <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      title="字段选择"
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
import {storeToRefs} from "pinia";
import {useLowCodeStore} from "@/store/low-code";
const {chooseTable}=storeToRefs(useLowCodeStore())
const chooseTableArr=chooseTable

// const current
/*获取库和表信息*/

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
  dialogVisible.value = true
}
const confirmBtnClick=()=>{
  dialogVisible.value = false
}
defineExpose({showModal})
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.modal-style {
  width: 1000px !important;
  min-height: 500px;
}
</style>
