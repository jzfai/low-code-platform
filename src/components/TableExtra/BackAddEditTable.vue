<template>
  <div class="mb-10px rowSC">
   <!--<el-button type="primary" @click="copyJson">复制json数据</el-button>-->
    <el-button type="primary" @click="clearData">清空</el-button>
  </div>
  <el-table
      ref="refFormTable"
      row-key="id"
      :class="`drag-table-class${props.tableType}`"
      :data="formTableData"
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
    <el-table-column prop="hiddenSwagger" align="center" label="文档隐藏" width="100">
      <template #default="{ row }">
        <el-switch
            v-model="row.hiddenSwagger"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
        />
      </template>
    </el-table-column>
    <el-table-column v-if="tableType!==2"  prop="isNeedInput" align="center" label="是否必填" width="100">
      <template #default="{ row }">
        <el-switch
            v-model="row.isNeedInput"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
        />
      </template>
    </el-table-column>
    <el-table-column v-if="tableType!==2" prop="rule" align="center" label="校验规则" min-width="100">
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

    <el-table-column prop="field" label="对应关系" align="center" width="120">
      <template #default="{ row }">
        <el-select v-model="row.mappingType" filterable placeholder="组件类型">
          <el-option key="index" label="一对一" :value="1"/>
          <el-option key="index" label="一对多" :value="2"/>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column prop="field" label="对应表和字段" align="center" width="120">
      <template #default="{ row }">
        <el-input v-model="row.mappingTable" placeholder="对应表" />
      </template>
    </el-table-column>

    <el-table-column prop="width" align="center" label="操作" width="90">
      <template #default="{ row, $index }">
        <el-button text type="primary" @click="deleteFormItem(row, $index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <ElSvgIcon name="Plus" class="mt-5px" style="cursor: pointer" @click="addTable"/>
  <DbColumnChooseModal ref="refDbColumnChooseModal"/>
</template>

<script setup lang="ts">

/**********props***********/
// const props = defineProps({
//   name: {
//     require: true,
//     default: "fai",
//     type:String,
//   },
// });

/**********ref***********/
/**********request***********/

/*******get,set,reset,clear*******/

/******defineExpose*******/

//添加row
import {
  ruleMapping,
  setItemDefaultValue ,
  splitTheOptionArr
} from './back-extra-code'
import {getGuid} from '@/hooks/use-common'
import DbColumnChooseModal from "@/views/sql/DbColumnChooseModal.vue";
const refDbColumnChooseModal=ref()

/**********reactive***********/

/****watch,computed******/
// watch(() => props.name, (oldValue,newValue) => {
//   },
//   { immediate: true }
// );
// const message = computed(() => {
//   return 'The webmaster said that you can not enter this page...'
// })


/**********mounted***********/
onMounted(()=>{})


/**********methods***********/

const addTable=()=>{
  const extraItem = {id:getGuid()}
  formTableData.value.push(extraItem)
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
  JSON.parse(JSON.stringify(checkColumnArr)).forEach((fItem) => {
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
onMounted(() => {
  rowDrop(formTableData, `drag-table-class${props.tableType}`)
})

const getData = () => {
  formTableData.value.forEach((fItem:any) => {
    fItem.optionDataArr = splitTheOptionArr(fItem.optionData)
  })
  return formTableData.value
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
