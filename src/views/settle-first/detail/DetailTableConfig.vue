<template>
  <div class="mb-10px rowSC">
<!--    <el-button type="primary" size="small" @click="showCustomInput">文档字段填写</el-button>-->
<!--    <el-button type="primary" @click="clearData">清空</el-button>-->
    <!--  筛选条件   -->
    <div class="rowSC">
      <span>标题：</span>
      <el-input v-model="pieItem.cartTitle" placeholder="请输入标题" class="mr-10px wi-100px" />
      <el-radio-group v-model="pieItem.direction">
        <el-radio :label="1">横向</el-radio>
        <el-radio :label="2">纵向</el-radio>
        <el-radio :label="3">表格</el-radio>
      </el-radio-group>
      <div v-if="pieItem.direction !== 3" class="rowSC ml-20px">
        <span class="mr20px">几个一组:</span>
        <el-input-number v-model="pieItem.splitNum" class="wi-80px" :min="1" :max="4" />
        <div v-if="pieItem.direction ===1">
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
  <div v-if="pieItem.direction === 3" class="rowSS mt-20px mb-20px">
    <el-radio-group v-model="pieItem.tableDataType" class="mr-20px">
      <el-radio :label="1">详情接口获取</el-radio>
      <el-radio :label="2">请求接口</el-radio>
    </el-radio-group>
    <el-input v-model="pieItem.field" placeholder="字段" class="wi-120px"/>
    <div v-if="pieItem.tableDataType===2">
      <el-input v-model="pieItem.api" placeholder="请求api" class="wi-300px"/>
      <el-input v-model="pieItem.method" placeholder="请求方法" class="wi-100px"/>
    </div>
  </div>
  <FrontLowCodeTable ref="refSearchTable" :table-type="1" />
<!--  <CustomInputColumn ref="refCustomInputColumn" @emitCICConfirm="emitCICConfirm" />-->
</template>

<script setup lang="ts">
import {detailComponentTypeArr, extraItemGenerator } from "@/components/TableExtra/front-extra-code";
import {getGuid} from "@/hooks/use-common";
const props = defineProps({
  item: {
    type: Object
  }
})

const pieItem:any = ref({})
// onBeforeMount(() => {
//   pieItem.value = props.item
// })

const refSearchTable=ref()
const reshowSearchTableData = (item) => {
  pieItem.value = item
  //先清空在复制
  refSearchTable.value.clearData()
  refSearchTable.value.reshowData(item.columnArr);
}
//set table date
// const setSearchTableData = (checkColumnArr) => {
//   JSON.parse(JSON.stringify(checkColumnArr)).forEach((fItem) => {
//     if (!findArrObjByKey(pieItem.value.columnArr, 'columnName', fItem.columnName)) {
//       const extraItem = extraItemGenerator(fItem)
//       pieItem.value.columnArr.push(extraItem)
//     }
//   })
// }
const getSearchTableData = () => {
  pieItem.value.columnArr=refSearchTable.value.getData()
  pieItem.value.dillColumnArr = []
  if (pieItem.value.direction !== 3) {
    let pushIndex = 0
    pieItem.value.dillColumnArr.push([])
    pieItem.value.columnArr.forEach((fItem, fIndex) => {
      if (pieItem.value.direction === 1) {
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

const clearData = () => {
  pieItem.value.columnArr = []
}
//文档填入部分
const refCustomInputColumn = ref()
const showCustomInput = () => {
  refCustomInputColumn.value.showModal(pieItem.value.columnArr)
}
// const emitCICConfirm = (data) => {
//   setSearchTableData([...pieItem.value.columnArr, ...data])
// }

defineExpose({ getSearchTableData, clearData, reshowSearchTableData })
</script>

<style scoped lang="scss"></style>
