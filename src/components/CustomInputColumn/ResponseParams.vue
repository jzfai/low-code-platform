<template>
  <div class="mt-20px mb-10px">响应字段</div>
  <el-table class="request-column-table" row-key="id" :data="tableData" stripe style="width: 100%" height="150px" border>
    <el-table-column prop="field" label="字段" width="200">
      <template #default="{ row }">
        <el-input v-model="row.field" placeholder="字段名称" />
      </template>
    </el-table-column>
    <el-table-column prop="desc" label="描述" min-width="300">
      <template #default="{ row }">
        <el-input v-model="row.desc" placeholder="描述 " />
      </template>
    </el-table-column>

    <el-table-column  label="删除" width="90">
      <template #default="{ $index }">
        <el-button text type="danger" @click="deleteItem($index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="mt-15px">
    <el-button type="primary" @click="addTableColumn">新增</el-button>
  </div>
</template>


<script setup>
const tableData = ref([])
nextTick(() => {
  rowDrop(tableData, 'request-column-table')
})
const addTableColumn = () => {
  tableData.value.push({
    columnName: '',
    columnComment: '',
    id: getGuid()
  })
}
const deleteItem = (index) => {
  tableData.value.splice(index, 1)
}
const setData=(arrData)=>{
  const arrFieldKey=tableData.value.map(mItem=>{
    return mItem.field
  })
  arrData.forEach(item=>{
    if(!arrFieldKey.includes(item.name)){
      tableData.value.push({ id: getGuid(),field:item.name,desc:item.description})
    }
  })
}
const getData=()=>{
  return tableData.value
}
defineExpose({setData,getData})
</script>


<style scoped lang="scss">

</style>
