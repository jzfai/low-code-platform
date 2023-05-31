<template>
  <div class="mt-20px mb-10px">请求字段</div>
  <el-table class="request-column-table" row-key="id" :data="tableData" stripe style="width: 100%" border>
    <el-table-column prop="field" label="字段" width="200">
      <template #default="{ row }">
        <el-input v-model="row.field" placeholder="字段名称"/>
      </template>
    </el-table-column>
    <el-table-column prop="desc" label="描述" min-width="300">
      <template #default="{ row }">
        <el-input v-model="row.desc" placeholder="描述 "/>
      </template>
    </el-table-column>

    <el-table-column prop="required" label="是否必填" min-width="80">
      <template #default="{ row }">
        <el-switch
            v-model="row.required"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
        />
      </template>
    </el-table-column>
    <el-table-column label="删除" width="90">
      <template #default="{ $index }">
        <el-button text type="danger" @click="deleteItem($index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <ElSvgIcon name="Plus" class="mt-5px" style="cursor: pointer" @click="addTableColumn"/>
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
//过滤字段
const fileParams = ["pageSize", "pageNum", "page", "size", "id"]
const setData = (arrData) => {
  const arrFieldKey = tableData.value.map(mItem => {
    return mItem.field
  })
  arrData.forEach(item => {
    if (!arrFieldKey.includes(item.name) && !fileParams.includes(item.name)) {
      tableData.value.push({
        id: getGuid(),
        field: item.name,
        desc: item.description,
        required: item.required,
        rule: item.required ? 'isNotNull' : 'notValid'
      })
    }
  })
}
const getData = () => {
  return tableData.value
}
defineExpose({setData, getData})
</script>


<style scoped lang="scss">

</style>
