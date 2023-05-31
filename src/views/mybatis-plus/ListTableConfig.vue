<template>
  <div class="mb-10px rowSC">
    <el-button type="primary" @click="copyJson">复制json数据</el-button>
    <el-button type="primary" @click="clearData">清空</el-button>
  </div>
  <el-table
    ref="refListTable"
    row-key="originField"
    class="list-table-config"
    :data="listTableData"
    border
  >
    <el-table-column prop="tableName" label="表名" align="center" width="120">
      <template #default="{ row }">
        <el-input v-model="row.tableName" placeholder="tableName" />
      </template>
    </el-table-column>
    <el-table-column prop="field" label="字段名" align="center" width="120">
      <template #default="{ row }">
        <el-input v-model="row.field" placeholder="字段名" />
      </template>
    </el-table-column>
    <el-table-column prop="desc" label="字段描述" min-width="120">
      <template #default="{ row }">
        <el-input v-model="row.desc" placeholder="字段描述" />
      </template>
    </el-table-column>
    <el-table-column prop="isNotShowSwagger" align="center" label="文档中显示" width="100">
      <template #default="{ row }">
        <el-switch
          v-model="row.isNotShowSwagger"
          inline-prompt
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="false"
          inactive-value="true"
        />
      </template>
    </el-table-column>
    <el-table-column prop="width" align="center" label="操作" width="90">
      <template #default="{ row, $index }">
        <el-button text type="primary" @click="deleteListItem(row, $index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {extraItemGenerator} from "@/components/TableExtra/use-generator-code";
const setListTableData = (checkColumnArr) => {
  checkColumnArr.forEach((fItem) => {
    if (!findArrObjByKey(listTableData.value, 'columnName', fItem.columnName)) {
      const extraItem = extraItemGenerator(fItem)
      listTableData.value.push(extraItem)
    }
  })
}
let listTableData:any = ref([])

//删除和新增
const deleteListItem = (row, index) => {
  listTableData.value.splice(index, 1)
}
//实现表格拖拽排序
//拖拽
onMounted(() => {
  rowDrop(listTableData.value, 'list-table-config')
})

const getListTableData = () => {
  listTableData.value.forEach((fItem) => {
    fItem.optionDataArr = splitTheOptionArr(fItem.optionData)
  })
  return listTableData.value
}

const reshowListTableData = (checkColumnArr) => {
  listTableData.value = checkColumnArr
}

const clearData = () => {
  listTableData.value = []
}
const copyJson = () => {
  const collectionObj = {}
  listTableData.value.forEach((fItem) => {
    collectionObj[fItem.field] = fItem.desc
  })
  copyValueToClipboard(collectionObj)
}

defineExpose({ setListTableData, getListTableData, reshowListTableData })
</script>

<style scoped lang="scss"></style>
