<template>
  <div class="mb-10px rowSC">
    <el-button type="primary" @click="copyJson">复制json数据</el-button>
    <el-button type="primary" @click="clearData">清空</el-button>
  </div>
  <el-table
    ref="refFormTable"
    row-key="originField"
    class="form-table-config"
    :data="formTableData"
    border
    @selection-change="handleFormSelection"
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
    <el-table-column prop="isNeedInput" align="center" label="是否必填" width="100">
      <template #default="{ row }">
        <el-switch
          v-model="row.isNeedInput"
          inline-prompt
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="true"
          inactive-value="false"
        />
      </template>
    </el-table-column>
    <el-table-column prop="rule" align="center" label="校验规则" min-width="100">
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

    <el-table-column prop="width" align="center" label="操作" width="90">
      <template #default="{ row, $index }">
        <el-button text type="primary" @click="deleteFormItem(row, $index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { extraItemGeneratorForMybitsPlus, ruleMapping } from '@/hooks/code-generator/use-generator-code'
import { copyValueToClipboard } from '@/hooks/use-common'
const setFormTableData = (checkColumnArr) => {
  checkColumnArr.forEach((fItem) => {
    if (!findArrObjByKey(formTableData, 'columnName', fItem.columnName)) {
      const extraItem = extraItemGeneratorForMybitsPlus(fItem)
      formTableData.push(extraItem)
    }
  })
}
/*查询配置*/
let formTableData = $ref([])
let formSelection = $ref([])
const handleFormSelection = (val) => {
  formSelection = val
}
//删除和新增
const deleteFormItem = (row, index) => {
  formTableData.splice(index, 1)
}
onMounted(() => {
  rowDrop(formTableData, 'form-table-config')
})

const getFormTableData = () => {
  formTableData.forEach((fItem) => {
    fItem.optionDataArr = splitTheOptionArr(fItem.optionData)
  })
  return formTableData
}

const reshowFormTableData = (checkColumnArr) => {
  formTableData = checkColumnArr
}
const clearData = () => {
  formTableData = []
}
const copyJson = () => {
  const collectionObj = {}
  formTableData.forEach((fItem) => {
    collectionObj[fItem.field] = fItem.desc
  })
  copyValueToClipboard(collectionObj)
}
defineExpose({ setFormTableData, getFormTableData, reshowFormTableData })
</script>

<style scoped lang="scss"></style>
