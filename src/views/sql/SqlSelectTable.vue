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
    <el-table-column label="过滤条件" align="center" width="120">
      <template #default="{ row }">
        <el-select v-model="row.filterCondition" filterable placeholder="过滤条件">
          <el-option
              v-for="(item, index) in filterConditionMapping"
              :key="index"
              :label="`${item.label}(${item.key})`"
              :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>

    <el-table-column prop="originField" label="原始字段名" align="center" width="300">
      <template #default="{ row }">
        <el-input v-model="row.originField" placeholder="原始字段名" />
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

import {setItemDefaultValue} from './back-extra-code'
import {getGuid} from '@/hooks/use-common'
import {filterConditionMapping, filterConditionWrapperMapping} from "@/views/sql/sql-extra-code";

/**********props***********/
const props = defineProps({
  tableType: {
    type: Number,
    default: 1
  }
})
/**********ref***********/
const formTableData:any = ref([])


/**********mounted***********/

onMounted(() => {
  rowDrop(formTableData, `drag-table-class${props.tableType}`)
})


/**********methods***********/
const reshowData = (checkColumnArr) => {
  formTableData.value = checkColumnArr
}

const addTable=()=>{
  const extraItem = setItemDefaultValue({id:getGuid()})
  formTableData.value.push(extraItem)
}
const deleteFormItem = (row, index) => {
  formTableData.value.splice(index, 1)
}
/**********request***********/


/*******get,set,reset,clear*******/
const getData = () => {
  return  formTableData.value.map(m=>{
    if(m.filterCondition){
      m.filterConditionWrapper=filterConditionWrapperMapping[m.filterCondition]
    }
    return m
  })
}
const setData = (checkColumnArr) => {
  const mapArr = formTableData.value.map(pItem=>pItem.field);
  checkColumnArr.forEach((fItem) => {
    //判断是否有重复的key
    if (!mapArr?.includes(fItem.field)) {
      const extraItem = setItemDefaultValue(fItem)
      formTableData.value.push(extraItem)
    }
  })
}
const clearData = () => {
  formTableData.value = []
}
/******defineExpose*******/
defineExpose({ setData, getData, reshowData,clearData })


</script>

<style scoped lang="scss"></style>
