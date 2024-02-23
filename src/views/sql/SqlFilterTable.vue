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
        <div v-if="row.filterKey==='LEFT JOIN'">
          <el-button v-if="row.leftJoinObj?.filterTableName"  text  type="primary" @click="showDbModal(row,'leftJoinObj')">{{row.leftJoinObj.filterTableName}}</el-button >
          <el-button  v-else  text type="primary" @click="showDbModal(row,'leftJoinObj')">选取</el-button>
        </div>
         <div v-else>
           <el-button v-if="row.leftJoinObj?.filterColumnName"  text  type="primary" @click="showDbColumnModal(row,'leftJoinObj')">{{row.leftJoinObj.filterColumnName}}({{row.leftJoinObj.filterTableName}})</el-button >
           <el-button  v-else  text type="primary" @click="showDbColumnModal(row,'leftJoinObj')">选取</el-button>
         </div>
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
            <el-input v-if="row.filterCondition==='BETWEEN'" v-model="row.value2" class="wi-80px mr-20px" placeholder="值(数值/字段)" />
            <el-button  v-if="row.valueObj?.filterColumnName" text type="primary"  @click="showDbColumnModal(row,'valueObj')">{{row.valueObj.filterColumnName}}({{row.valueObj.filterTableName}})</el-button>
            <el-button  v-if="row.filterCondition!=='BETWEEN'"   text type="primary" @click="showDbColumnModal(row,'valueObj')">选取</el-button>
          </div>
          <div v-if="row.filterKey==='LEFT JOIN'" class="rowSS">
            <div class="rowSS mr-20px" >
              <el-button v-if="row.joinLeftObj?.filterColumnName" text type="primary" @click="showDbColumnModal(row,'joinLeftObj')">{{row.joinLeftObj.filterColumnName}}({{row.joinLeftObj.filterTableName}})</el-button>
              <el-button  v-else  text type="primary" @click="showDbColumnModal(row,'joinLeftObj')">选取</el-button>
            </div>
            <div class="rowSS" >
              <el-button v-if="row.joinRightObj?.filterColumnName" text type="primary" @click="showDbColumnModal(row,'joinRightObj')">{{row.joinRightObj.filterColumnName}}({{row.joinRightObj.filterTableName}})</el-button>
              <el-button  v-else  text type="primary" @click="showDbColumnModal(row,'joinRightObj')">选取</el-button>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="width" align="center" label="操作" width="90">
      <template #default="{ row, $index }">
        <el-button text type="primary" @click="deleteFormItem(row, $index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <ElSvgIcon name="Plus" class="mt-5px" style="cursor: pointer" @click="addTable"/>
  <DbChooseModal ref="refDbChooseModal"/>
  <DbColumnChooseModal  ref="refDbColumnChooseModal"/>
</template>


<script setup lang="ts">
import DbChooseModal from "./DbChooseModal.vue"
import {
  filterConditionMapping, filterConditionWrapperMapping,
  filterKeyMapping,
  setItemDefaultValue
} from './sql-extra-code'
import {getGuid} from "@/hooks/use-common";
import DbColumnChooseModal from "@/views/sql/DbColumnChooseModal.vue";
const dropGetUUid=getGuid()
/**********props***********/
const props = defineProps({
  tableType: {
    type: Number,
    default: 1
  }
})

/**********ref***********/

const refDbChooseModal=ref()

const refDbColumnChooseModal=ref()
const formTableData:any = ref([])
/**********reactive***********/

/**********mounted***********/

onMounted(() => {
  rowDrop(formTableData, `drag-table-class${dropGetUUid}`)
})


/**********methods***********/
const deleteFormItem = (row, index) => {
  formTableData.value.splice(index, 1)
}
const getData = () => {
  return  formTableData.value.map(m=>{
    if(m.filterCondition){
      m.filterConditionWrapper=filterConditionWrapperMapping[m.filterCondition]
    }
    return m
  })
}
const showDbColumnModal=(row,key)=>{
  refDbColumnChooseModal.value.showModal(row,key)
}
const addTable=()=>{
  const extraItem = setItemDefaultValue({})
  formTableData.value.push(extraItem)
}
const showDbModal=(row,key)=>{
  refDbChooseModal.value.showModal(row,key)
}
/*******get,set,reset,clear*******/
const reshowData = (checkColumnArr) => {
  formTableData.value = checkColumnArr
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


/**********request***********/

/******defineExpose*******/
defineExpose({ setData, getData, reshowData,clearData })
</script>

<style scoped lang="scss"></style>
