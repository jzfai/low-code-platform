<template>
  <div class="mb-10px rowSC">
    <el-button type="primary" size="small" @click="showCustomInput">文档字段填写</el-button>
    <el-button type="primary" @click="clearData">清空</el-button>
    <!--  筛选条件   -->
    <div class="rowSS ml-20px">
      <el-input v-model="pieItem.cartTitle" placeholder="请输入标题" class="mr-10px wi-100px" />
      <el-radio-group v-model="pieItem.direction">
        <el-radio label="1">横向</el-radio>
        <el-radio label="2">纵向</el-radio>
        <el-radio label="3">表格</el-radio>
      </el-radio-group>
      <div v-if="pieItem.direction !== '3'" class="rowSC ml-20px">
        <span class="mr20px">几个一组:</span>
        <el-input-number v-model="pieItem.splitNum" class="wi-80px" :min="1" :max="4" />
        <div v-if="pieItem.direction === '1'">
          <el-input
            v-for="item in Math.ceil(pieItem.columnArr.length / pieItem.splitNum)"
            :key="item"
            v-model="pieItem[`leftWidth${item}`]"
            :placeholder="`宽度${item}`"
            class="wi-50px ml-6px"
          />
        </div>
        <div v-else>
          <el-input v-model="pieItem.leftWidth" placeholder="宽度" class="wi-60px ml-20px" />
        </div>
      </div>
    </div>
  </div>
  <el-table
    ref="refSearchTable"
    :data="pieItem.columnArr"
    border
    row-key="originField"
    @selection-change="handleSearchSelection"
  >
    <el-table-column prop="field" label="字段名" align="center" min-width="100">
      <template #default="{ row }">
        <el-input v-model="row.field" />
      </template>
    </el-table-column>
    <el-table-column prop="desc" label="字段描述" align="center" min-width="140">
      <template #default="{ row }">
        <el-input v-model="row.desc" />
      </template>
    </el-table-column>
    <el-table-column prop="componentType" align="center" label="组件类型" width="250">
      <template #default="{ row }">
        <el-select v-model="row.componentType" filterable placeholder="组件类型">
          <el-option
            v-for="(item, index) in detailComponentTypeArr"
            :key="index"
            :label="`${item.title}(${item.label})`"
            :value="item.label"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column v-if="pieItem.direction === '3'" prop="width" align="center" label="宽度" width="140">
      <template #default="{ row }">
        <el-input v-model="row.width" placeholder="控件的宽度" />
      </template>
    </el-table-column>
    <el-table-column
      v-if="pieItem.direction === '3'"
      prop="isTemplate"
      align="center"
      label="是否自定义模板"
      width="110"
    >
      <template #default="{ row }">
        <el-switch
          v-model="row.isTemplate"
          inline-prompt
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="true"
          :inactive-value="false"
        />
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
import {detailComponentTypeArr, extraItemGenerator } from "@/components/TableExtra/front-extra-code";

const props = defineProps({
  item: {
    type: Object
  }
})

const pieItem:any = ref({})
onBeforeMount(() => {
  pieItem.value = props.item
})

const reshowSearchTableData = (item) => {
  pieItem.value = item
}
//set table date
const setSearchTableData = (checkColumnArr) => {
  JSON.parse(JSON.stringify(checkColumnArr)).forEach((fItem) => {
    if (!findArrObjByKey(pieItem.value.columnArr, 'columnName', fItem.columnName)) {
      const extraItem = extraItemGenerator(fItem)
      pieItem.value.columnArr.push(extraItem)
    }
  })
}
const getSearchTableData = () => {
  pieItem.value.dillColumnArr = []
  if (pieItem.value.direction !== '3') {
    let pushIndex = 0
    pieItem.value.dillColumnArr.push([])
    pieItem.value.columnArr.forEach((fItem, fIndex) => {
      if (pieItem.value.direction === '1') {
        fItem.width = pieItem.value[`leftWidth${pushIndex + 1}`]
      } else {
        fItem.width = pieItem.value[`leftWidth`]
      }
      pieItem.value.dillColumnArr[pushIndex].push(fItem)
      if ((fIndex + 1) % pieItem.value.splitNum === 0) {
        pushIndex += 1
        pieItem.value.dillColumnArr.push([])
      }
    })
  } else {
    pieItem.value.dillColumnArr = pieItem.value.columnArr
  }

  return pieItem.value
}

const searchSelection = ref([])
const handleSearchSelection = (val) => {
  searchSelection.value = val
}
//删除和新增
const deleteSearchItem = (row, index) => {
  pieItem.value.columnArr.splice(index, 1)
}
//拖拽
onMounted(() => {
  rowDrop(pieItem.value.columnArr, 'el-table__body-wrapper')
})
const clearData = () => {
  pieItem.value.columnArr = []
}
//文档填入部分
const refCustomInputColumn = ref()
const showCustomInput = () => {
  refCustomInputColumn.value.showModal(pieItem.value.columnArr)
}
const emitCICConfirm = (data) => {
  setSearchTableData([...pieItem.value.columnArr, ...data])
}

defineExpose({ setSearchTableData, getSearchTableData, clearData, reshowSearchTableData })
</script>

<style scoped lang="scss"></style>
