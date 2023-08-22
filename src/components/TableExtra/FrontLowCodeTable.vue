<template>
  <div class="mb-10px rowSC">
    <el-button type="primary" @click="clearData">清空</el-button>
  </div>
  <el-table
      ref="refSearchTable"
      :data="searchTableData"
      :class="`drag-table-class${dropGetUUid}`"
      row-key="id"
      border
      @selection-change="handleSearchSelection"
  >
    <el-table-column class="mb-1 " prop="field" label="字段名" align="center" width="130">
      <template #default="{ row }">
        <el-input v-model="row.field" />
      </template>
    </el-table-column>
    <el-table-column prop="desc" label="字段描述" align="center" width="140">
      <template #default="{ row }">
        <el-input v-model="row.desc" />
      </template>
    </el-table-column>

    <el-table-column v-if="tableType===3" prop="rule" align="center" label="校验规则" width="150">
      <template #default="{ row }">
        <el-select v-model="row.rule" filterable>
          <el-option
              v-for="(item, index) in ruleMapping"
              :key="index"
              :label="`${item.label}(${item.key})`"
              :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column v-if="tableType===2" prop="isTemplate" align="center" label="自定义模板" width="100">
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
    <el-table-column v-if="tableType===3" prop="componentType" align="center" label="组件类型" width="120">
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
    <el-table-column v-if="tableType===1" prop="componentType" align="center" label="组件类型" width="120">
      <template #default="{ row }">
        <el-select v-model="row.componentType" filterable placeholder="组件类型">
          <el-option
              v-for="(item, index) in searchTableComponentTypeArr"
              :key="index"
              :label="`${item.title}(${item.label})`"
              :value="item.label"
          />
        </el-select>
      </template>
    </el-table-column>

    <el-table-column v-if="tableType===2" prop="componentType" align="center" label="组件类型" width="250">
      <template #default="{ row }">
        <el-select v-model="row.componentType" filterable placeholder="组件类型">
          <el-option
              v-for="(item, index) in listTableComponentTypeArr"
              :key="index"
              :label="`${item.title}(${item.label})`"
              :value="item.label"
              @click="typeChooseItem(item, row)"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="width" align="center" label="宽度" width="80">
      <template #default="{ row }">
        <el-input v-model="row.width" placeholder="控件的宽度" />
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
        <!--timeArr-->
        <div v-if="['daterange'].includes(row.componentType)" class="rowSS">
          <el-input v-model="row.beginTimeKey" placeholder="开始字段" />
          <el-input v-model="row.endTimeKey" placeholder="结束字段" />
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="width" align="center" label="操作" width="90">
      <template #default="{ row, $index }">
        <el-button text type="danger" @click="deleteSearchItem(row, $index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <ElSvgIcon name="Plus" class="mt-5px" style="cursor: pointer" @click="addTable"/>
</template>

<script setup lang="ts">
import {
  formComponentTypeArr,
  listTableComponentTypeArr,
  ruleMapping,
  searchTableComponentTypeArr,
  setItemDefaultValue,
  splitTheOptionArr
} from "./front-extra-code";
import ElSvgIcon from "@/components/ElSvgIcon.vue";
import {getGuid} from "@/hooks/use-common";
import {rowDrop} from "@/hooks/use-sort-table";

const dropGetUUid=getGuid()
//1:search 2.tableList 3:addEdit 4:detail
const props = defineProps({
  tableType: {
    type: Number,
    default: 1
  },
  tableId: {
    type: Number,
    default: 1
  },
})

const reshowData = (checkColumnArr) => {
  searchTableData.value = checkColumnArr.map(item=>{
    item.id=getGuid();
    return item
  })
}
//set the data
const setData = (checkColumnArr) => {
  const mapArr = searchTableData.value.map(pItem=>pItem.field);
  checkColumnArr.forEach((fItem) => {
    //判断是否有重复的key
    if (!mapArr?.includes(fItem.field)) {
      const extraItem = setItemDefaultValue(fItem)
      searchTableData.value.push(extraItem)
    }
  })
}
//添加row
const addTable=()=>{
  const extraItem = {id:getGuid()}
  searchTableData.value.push(extraItem)
}
//return data
const getData = () => {
  searchTableData.value.forEach((fItem) => {
    fItem.optionDataArr = splitTheOptionArr(fItem.optionData)
  })
  return searchTableData.value
}
const searchTableData:any = ref([])
const searchSelection = ref([])
const handleSearchSelection = (val) => {
  searchSelection.value = val
}
const clearData = () => {
  searchTableData.value = []
}
//删除和新增
const deleteSearchItem = (row, index) => {
  searchTableData.value.splice(index, 1)
}
//拖拽
onMounted(() => {
 nextTick(()=>{
   rowDrop(searchTableData, `drag-table-class${dropGetUUid}`)
 })
})

//type=2
const typeChooseItem = (item, row) => {
  if (item.label === 'select') {
    row.isTemplate = true
  }
}
defineExpose({ setData, searchTableData, getData, clearData, reshowData })
</script>

<style scoped lang="scss">

</style>
