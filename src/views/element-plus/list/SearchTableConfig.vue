<template>
  <div class="mb-10px rowSC">
    <el-button type="primary" size="small" @click="showCustomInput">文档字段填写</el-button>
    <el-button type="primary" @click="clearData">清空</el-button>
  </div>
  <el-table
    ref="refSearchTable"
    :data="searchTableData"
    border
    row-key="field"
    @selection-change="handleSearchSelection"
  >
    <el-table-column prop="field" label="字段名" align="center" width="130">
      <template #default="{ row }">
        <el-input v-model="row.field" />
      </template>
    </el-table-column>
    <el-table-column prop="desc" label="字段描述" align="center" width="140">
      <template #default="{ row }">
        <el-input v-model="row.desc" />
      </template>
    </el-table-column>
    <el-table-column prop="componentType" align="center" label="组件类型" width="250">
      <template #default="{ row }">
        <el-select v-model="row.componentType" filterable placeholder="组件类型">
          <el-option
            v-for="(item, index) in searchTableComponentType"
            :key="index"
            :label="`${item.title}(${item.label})`"
            :value="item.label"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="width" align="center" label="宽度" width="80">
      <template #default="{ row }">
        <el-input v-model="row.width" placeholder="控件的宽度" />
      </template>
    </el-table-column>

    <el-table-column align="center" label="select/selectApi额外配置" min-width="170">
      <template #default="{ row }">
        <el-input
          v-if="['selectApi', 'cascaderApi'].includes(row.componentType)"
          v-model="row.api"
          type="textarea"
          rows="3"
          placeholder="请求地址"
        />
        <el-input
          v-if="['selectApi', 'cascaderApi'].includes(row.componentType)"
          v-model="row.method"
          placeholder="请求方法"
        />
        <el-input
          v-if="['selectApi', 'cascaderApi'].includes(row.componentType)"
          v-model="row.labelKey"
          placeholder="label-key"
        />
        <div class="mt-1">
          <el-input
            v-if="['selectApi', 'cascaderApi'].includes(row.componentType)"
            v-model="row.valueKey"
            placeholder="value-key"
          />
        </div>
        <el-input
          v-if="['select', 'radio', 'radio', 'checkbox', 'switch'].includes(row.componentType)"
          v-model="row.optionData"
          type="textarea"
          rows="3"
          placeholder="数据枚举"
        />
      </template>
    </el-table-column>

    <el-table-column prop="width" align="center" label="操作" width="90">
      <template #default="{ row, $index }">
        <el-button text type="danger" @click="deleteSearchItem(row, $index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="emitCICConfirm" />
</template>

<script setup lang="ts">
const searchTableComponentType = searchTableComponentTypeArr

const reshowSearchTableData = (checkColumnArr) => {
  searchTableData = checkColumnArr
}
//set the data
const setSearchTableData = (checkColumnArr) => {
  JSON.parse(JSON.stringify(checkColumnArr)).forEach((fItem) => {
    if (!findArrObjByKey(searchTableData, 'columnName', fItem.columnName)) {
      const extraItem = extraItemGenerator(fItem)
      searchTableData.push(extraItem)
    }
  })
}
//return data
const getSearchTableData = () => {
  return searchTableData
}

let searchTableData = $ref([])
let searchSelection = $ref([])
const handleSearchSelection = (val) => {
  searchSelection = val
}
const clearData = () => {
  searchTableData = []
}
//删除和新增
const deleteSearchItem = (row, index) => {
  searchTableData.splice(index, 1)
}
//拖拽
onMounted(() => {
  rowDrop(searchTableData, 'el-table__body-wrapper')
})
//文档填入部分
const refCustomInputColumn = $ref(null)
const showCustomInput = () => {
  refCustomInputColumn.showModal()
}
const emitCICConfirm = (data) => {
  setSearchTableData([...searchTableData, ...data])
}
defineExpose({ setSearchTableData, searchTableData, getSearchTableData, clearData, reshowSearchTableData })
</script>

<style scoped lang="scss"></style>
