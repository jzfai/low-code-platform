<template>
  <div class="mb-10px rowSC">
   <!--<el-button type="primary" @click="copyJson">复制json数据</el-button>-->
    <el-button type="primary" @click="clearData">清空</el-button>
  </div>
  <el-table
      ref="refFormTable"
      row-key="id"
      :class="`drag-table-class${dropGetUUid}`"
      :data="formTableData"
      border
  >
    <el-table-column prop="filterKey" label="过滤关键字" align="center" width="120">
      <template #default="{ row }">
        <el-select v-model="row.filterKey" filterable placeholder="组件类型">
          <el-option
              v-for="(item, index) in filterKeyMapping"
              :key="index"
              :label="`${item.label}`"
              :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="field" label="左选表和字段" align="center" width="180">
      <template #default="{ row }">
        <el-button v-if="row.leftJoinObj?.filterColumnName"  text  type="primary" @click="showDbModal(row,'leftJoinObj')">{{row.leftJoinObj.filterColumnName}}({{row.leftJoinObj.filterTableName}})</el-button >
        <el-button  v-else  text type="primary" @click="showDbModal(row,'leftJoinObj')">选取</el-button>
      </template>
    </el-table-column>
    <el-table-column label="过滤条件" align="center" width="120">
      <template #default="{ row }">
        <el-select v-if="row.filterKey==='WHERE'" v-model="row.filterCondition" filterable placeholder="过滤条件">
          <el-option
              v-for="(item, index) in filterConditionMapping"
              :key="index"
              :label="`${item.label}(${item.key})`"
              :value="item.key"
          />
        </el-select>
        <span v-if="row.filterKey==='LEFT JOIN'">ON</span>
      </template>
    </el-table-column>
    <el-table-column prop="value" label="右(值/条件配置)" align="center" min-width="120">
      <template #default="{ row }">
        <div class="columnCC">
          <div v-if="row.filterKey==='WHERE'" class="rowSS">
            <el-input v-model="row.value" class="wi-80px mr-20px" placeholder="值(数值/字段)" />
            <el-input v-model="row.value2" v-if="row.filterCondition==='BETWEEN'" class="wi-80px mr-20px" placeholder="值(数值/字段)" />
            <el-button  v-if="row.valueObj?.filterColumnName" text type="primary"  @click="showDbModal(row,'valueObj')">{{row.valueObj.filterColumnName}}({{row.valueObj.filterTableName}})</el-button>
            <el-button  v-if="row.filterCondition!=='BETWEEN'"   text type="primary" @click="showDbModal(row,'valueObj')">选取</el-button>
          </div>
          <div v-if="row.filterKey==='LEFT JOIN'" class="rowSS">
            <div class="rowSS mr-20px" >
              <el-button v-if="row.joinLeftObj?.filterColumnName" text type="primary" @click="showDbModal(row,'joinLeftObj')">{{row.joinLeftObj.filterColumnName}}({{row.joinLeftObj.filterTableName}})</el-button>
              <el-button  v-else  text type="primary" @click="showDbModal(row,'joinLeftObj')">选取</el-button>
            </div>
            <div class="rowSS" >
              <el-button v-if="row.joinRightObj?.filterColumnName" text type="primary" @click="showDbModal(row,'joinRightObj')">{{row.joinRightObj.filterColumnName}}({{row.joinRightObj.filterTableName}})</el-button>
              <el-button  v-else  text type="primary" @click="showDbModal(row,'joinRightObj')">选取</el-button>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
<!--    <el-table-column prop="desc" label="字段描述" min-width="120">-->
<!--      <template #default="{ row }">-->
<!--        <el-input v-model="row.desc" placeholder="字段描述" />-->
<!--      </template>-->
<!--    </el-table-column>-->
    <el-table-column prop="width" align="center" label="操作" width="90">
      <template #default="{ row, $index }">
        <el-button text type="primary" @click="deleteFormItem(row, $index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <ElSvgIcon name="Plus" class="mt-5px" style="cursor: pointer" @click="addTable"/>
  <DbChooseModal ref="refDbChooseModal"/>
</template>


<script setup lang="ts">
import  DbChooseModal from "./DbChooseModal.vue"
import {
  filterConditionMapping, filterConditionWrapperMapping,
  filterKeyMapping,
  setItemDefaultValue
} from './sql-extra-code'
import {getGuid} from "@/hooks/use-common";
//以下数据从reshowData来
//添加row
const addTable=()=>{
  const extraItem = setItemDefaultValue({})
  formTableData.value.push(extraItem)
}

const refDbChooseModal=ref()
const showDbModal=(row,key)=>{
  refDbChooseModal.value.showModal(row,key)
}
//1:search 2.tableList 3:addEdit 4:detail
const props = defineProps({
  tableType: {
    type: Number,
    default: 1
  }
})
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
/*查询配置*/
let formTableData:any = ref([])
//删除和新增
const deleteFormItem = (row, index) => {
  formTableData.value.splice(index, 1)
}
const dropGetUUid=getGuid()
onMounted(() => {
  rowDrop(formTableData, `drag-table-class${dropGetUUid}`)
})

const getData = () => {
  return  formTableData.value.map(m=>{
    if(m.filterCondition){
      m.filterConditionWrapper=filterConditionWrapperMapping[m.filterCondition]
    }
     return m
  })
}

const reshowData = (checkColumnArr) => {
  formTableData.value = checkColumnArr
}
const clearData = () => {
  formTableData.value = []
}
defineExpose({ setData, getData, reshowData,clearData })
</script>

<style scoped lang="scss"></style>
