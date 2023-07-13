<template>
  <div class="mb-10px rowSC">
   <!--<el-button type="primary" @click="copyJson">复制json数据</el-button>-->
    <el-button type="primary" @click="clearData">清空</el-button>
  </div>
  <el-table
      ref="refFormTable"
      row-key="id"
      :class="`drag-table-class${props.tableType}`"
      :data="formTableData"
      border
  >
    <el-table-column prop="tableName" label="表名" align="center" width="120">
      <template #default="{ row }">
        <el-input v-model="row.tableName" placeholder="tableName" />
      </template>
    </el-table-column>
    <el-table-column prop="originField" label="字段名" align="center" width="120"/>
    <el-table-column prop="fieldAs" label="别名" align="center" width="120">
      <template #default="{ row }">
        <el-input v-model="row.fieldAs" placeholder="字段名" />
      </template>
    </el-table-column>
    <el-table-column prop="desc" label="字段描述" min-width="120">
      <template #default="{ row }">
        <el-input v-model="row.desc" placeholder="字段描述" />
      </template>
    </el-table-column>

    <el-table-column prop="width" align="center" label="操作" width="90">
      <template #default="{ row, $index }">
        <el-button text type="primary" @click="deleteFormItem(row, $index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <ElSvgIcon name="Plus" class="mt-5px" style="cursor: pointer" @click="addTable"/>
</template>

<script setup lang="ts">

//1:search 2.tableList 3:addEdit 4:detail
const props = defineProps({
  tableType: {
    type: Number,
    default: 1
  }
})

import {
  setItemDefaultValue ,
} from './back-extra-code'
import {getGuid} from '@/hooks/use-common'
const setData = (checkColumnArr) => {
  const mapArr = formTableData.value.map(pItem=>pItem.c);
  checkColumnArr.forEach((fItem) => {
    //判断是否有重复的key
    if (!mapArr?.includes(fItem.field)) {
      const extraItem = setItemDefaultValue(fItem)
      formTableData.value.push(extraItem)
    }
  })
}
/*查询配置*/
let formTableData:any = ref([])
//删除和新增
const deleteFormItem = (row, index) => {
  formTableData.value.splice(index, 1)
}
onMounted(() => {
  rowDrop(formTableData, `drag-table-class${props.tableType}`)
})

const getData = () => {
  return formTableData.value
}

const reshowData = (checkColumnArr) => {
  formTableData.value = checkColumnArr
}
//添加row
const addTable=()=>{
  const extraItem = {id:getGuid()}
  formTableData.value.push(extraItem)
}
const clearData = () => {
  formTableData.value = []
}
defineExpose({ setData, getData, reshowData,clearData })
</script>

<style scoped lang="scss"></style>
