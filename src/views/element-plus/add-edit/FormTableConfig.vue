<template>
  <div class="mb-10px rowSC">
    <el-button type="primary" size="small" @click="showCustomInput">文档字段填写</el-button>
    <el-button type="primary" @click="clearData">清空</el-button>
  </div>
  <el-table ref="refFormTable" :data="formTableData" border row-key="field" @selection-change="handleSearchSelection">
    <el-table-column prop="field" label="字段名" align="center" width="120" />
    <el-table-column prop="desc" label="字段描述" align="center" min-width="140">
      <template #default="{ row }">
        <el-input v-model="row.desc" />
      </template>
    </el-table-column>
    <el-table-column prop="componentType" align="center" label="组件类型" width="250">
      <template #default="{ row }">
        <el-select v-model="row.componentType" filterable placeholder="组件类型">
          <el-option
            v-for="(item, index) in formComponentTypeArr"
            :key="index"
            :label="`${item.title}(${item.label})`"
            :value="item.label"
            @click="typeChooseItem(item, row)"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column align="center" label="宽度" width="80">
      <template #default="{ row }">
        <el-input
          v-if="!['uploadImage', 'switch', 'checkbox', 'radio', 'table'].includes(row.componentType)"
          v-model="row.width"
          placeholder="控件的宽度"
        />
      </template>
    </el-table-column>
    <el-table-column prop="rule" align="center" label="校验规则" width="250">
      <template #default="{ row }">
        <el-select v-model="row.rule" filterable placeholder="组件类型">
          <el-option
            v-for="(item, index) in ruleMapping"
            :key="index"
            :label="`${item.label}(${item.key})`"
            :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column align="center" label="额外配置" min-width="170">
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
          v-if="['select', 'radio', 'checkbox', 'switch'].includes(row.componentType)"
          v-model="row.optionData"
          type="textarea"
          rows="3"
          placeholder="数据枚举"
        />
        <!--表格-->
        <el-button v-if="['table'].includes(row.componentType)" text type="primary" @click="tableSetting(row)">
          设置
        </el-button>
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
import { formComponentTypeArr } from '@/hooks/code-generator/use-generator-code'
const reshowFormTableData = (checkColumnArr) => {
  formTableData = checkColumnArr
}
const setFormTableData = (checkColumnArr) => {
  JSON.parse(JSON.stringify(checkColumnArr)).forEach((fItem) => {
    if (!findArrObjByKey(formTableData, 'columnName', fItem.columnName)) {
      const extraItem = extraItemGenerator(fItem)
      formTableData.push(extraItem)
    }
  })
}
const getFormTableData = () => {
  return formTableData
}

let formTableData = $ref([])
let searchSelection = $ref([])
const handleSearchSelection = (val) => {
  searchSelection = val
}
//删除和新增
const deleteSearchItem = (row, index) => {
  formTableData.splice(index, 1)
}

onMounted(() => {
  rowDrop(formTableData, 'el-table__body-wrapper')
})
const clearData = () => {
  formTableData = []
}

//文档填入部分
const refCustomInputColumn = $ref(null)
const showCustomInput = () => {
  refCustomInputColumn.showModal(formTableData)
}
const emitCICConfirm = (data) => {
  setFormTableData([...formTableData, ...data])
}

//类型选择后触发
const typeChooseItem = (item, row) => {
  if (item.label === 'select') {
    row.isTemplate = 'true'
  }
}

//table设置
let tmpSaveTableRow = {
  tableListConfig: []
}
const refCustomTableColumn = $ref(null)
const tableSetting = (row) => {
  tmpSaveTableRow = row
  refCustomTableColumn.showModal(row.tableListConfig)
}
const emitTableConfirm = (data) => {
  tmpSaveTableRow.tableListConfig = data
}
defineExpose({ setFormTableData, formTableData, getFormTableData, clearData, reshowFormTableData })
</script>

<style scoped lang="scss"></style>
