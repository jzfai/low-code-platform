<template>
  <FoldingCard title="数据库信息配置">
    <div class="rowSS">
      <div class="rowSS">
        <div>数据库链接：</div>
        <el-input v-model="dataBaseInfo.url" class="wi-400px mr-10px" placeholder="dataBaseUrl"/>
      </div>
      <div class="rowSS">
        <div>库名字：</div>
        <el-input v-model="dataBaseInfo.dbName" class="wi-150px" placeholder="dbName"/>
      </div>
    </div>
    <div class="rowSS mt-20px">
      <div class="rowSS">
        <div>用户名：</div>
        <el-input v-model="dataBaseInfo.name" class="wi-150px" placeholder="name"/>
      </div>
      <div class="rowSS ml-20px mr-40px">
        <div>密码：</div>
        <el-input v-model="dataBaseInfo.password" class="wi-150px" placeholder="password"/>
      </div>
      <el-button type="primary" @click="searchDataBase">查询</el-button>
    </div>
  </FoldingCard>
  <FoldingCard title="库和表选取">
    <!-- 获取库和表信息 -->
    <div class="mt-3 mb-1 rowSC">
      <div>请选择表(支持多表)</div>
      <el-button text type="danger" class="ml-1" @click="clearTable">清空</el-button>
    </div>
    <el-checkbox-group v-model="dbRadio">
      <el-checkbox
          v-for="(item, index) in dbData"
          :key="index"
          :label="item.tableName"
          @change="dbRadioClick(item, dbRadio.includes(item.tableName))"
      >
        {{ item.tableName }}
      </el-checkbox>
    </el-checkbox-group>

    <div class="mt-3 mb-1 rowSC">
      <div>选中的表</div>
    </div>
    <el-button
        v-for="(item, index) in chooseDbArr"
        :key="index"
        type="primary"
        text
        @click="dbChooseRadioClick(item)"
    >
      {{ item.tableName }}({{ item.tableComment }})
    </el-button>
  </FoldingCard>
  <FoldingCard title="字段配置">
    <div class="mb-10px rowSC">
      <div>表字段（点击选择）</div>
      <el-button text class="mr-10px" type="primary" @click="checkAllColumn">全选</el-button>
    </div>
    <div class="mt-1">
      <el-button
          v-for="(item, index) in currentTbColumn"
          :key="index"
          type="success"
          text
          :label="item"
          @click="checkColumnClick(item)"
      >
        {{ item.columnName }}({{ item.columnComment }})
      </el-button>

      <!-- 选中的字段-->
      <div class="mt-30px mb-10px rowSC">
        <span>选中的字段</span>
        <el-button text type="danger" class="ml-1" @click="clearAllColumn">清空</el-button>
      </div>
      <div class="rowSC flex-wrap">
        <div v-for="(item, index) in checkColumnArr" :key="index" class="rowSC mr-20px  mb-15px">
          <span style="color: #e6a23c">{{ item.columnName }}({{ item.columnComment }})</span>
          <ElSvgIcon name="CircleClose" :size="14" style="cursor: pointer" @click="deleteColumn(index)"/>
        </div>
      </div>

    </div>
  </FoldingCard>
</template>


<script setup lang="ts" injectCode>
import {storeToRefs} from "pinia/dist/pinia";
import {useLowCodeStore} from "@/store/low-code";
import {copyRefAndReactive} from "@/hooks/use-vue-proxy";
import {
  changeDashToCase,
  changeDashToCaseAndFirstWord, changeTheFirstWordToCase,
  removeTbOrT,
  tbTypeMapping
} from "@/components/TableExtra/back-extra-code";
import {copyReactive} from "@/hooks/use-common";

/**********props***********/
const props: any = defineProps({
  dbInfo: {
    require: true,
    type: Object,
  },
});
/**********ref***********/
const dataBaseInfo = reactive(props.dbInfo)
const checkColumnArr: any = ref([])
const chooseDbArr: any = ref([])
const dbRadio: any = ref([])
const {chooseTable} = storeToRefs(useLowCodeStore())

//保存当前点击的table信息
const currentTbColumn = ref([])
const useTables = ref<any>([])
const dbData = ref([])

/**********reactive***********/
/*获取库和表信息*/



/****watch,computed******/

/**********mounted***********/
onMounted(() => {
  if (dataBaseInfo.url) {
    searchDataBase()
  }
})


/**********methods***********/
const clearTable = () => {
  dbRadio.value = []
  chooseDbArr.value = []
}

const searchDataBase = () => {
  const reqConfig = {
    url: "basis-func/dataBase/getAllDatabase",
    data: dataBaseInfo,
    method: 'post'
  }
  axiosReq(reqConfig).then(({data}) => {
    dbData.value = data
  })
}
const dbChooseRadioClick = (item) => {
  dataBaseInfo.tbName = item.tableName
  currentTbColumn.value = []
  if (dataBaseInfo.url) {
    searchDbTable(item)
  }
}
const checkAllColumn = () => {
  checkColumnArr.value = JSON.parse(JSON.stringify(currentTbColumn.value))
}
const clearAllColumn = () => {
  checkColumnArr.value = []
}
const getCheckColumn = () => {

  return checkColumnArr.value.map(fItem => {
    fItem.field = changeDashToCase(fItem.columnName) //_转驼峰
    fItem.desc = fItem.columnComment
    fItem.fieldCase = changeDashToCaseAndFirstWord(fItem.columnName) //_转驼峰
    fItem.originField = fItem.columnName
    fItem.type = tbTypeMapping(fItem.dataType)
    return fItem;
  })
}
const checkColumnClick = (cItem) => {
  if (!findArrObjByKey(checkColumnArr.value, 'columnName', cItem.columnName)) {
    checkColumnArr.value.push(cItem)
  }
}
const deleteColumn = (dIndex) => {
  checkColumnArr.value.splice(dIndex, 1)
}
const dbRadioClick = (item, check) => {
  if (check) {
    if (!findArrObjByKey(chooseDbArr.value, 'tableName', item.tableName)) {
      //设置表的别名
      item.id = getGuid()
      chooseDbArr.value.push(item)
    }
  } else {
    deleteArrObjByKey(chooseDbArr.value, 'tableName', item.tableName)
    deleteArrObjByKey(useTables.value, 'tableName', item.tableName)

  }
  chooseTable.value = chooseDbArr.value
}
const getTableAs = (tableName) => {
  if (tableName.includes("_")) {
    const strings = tableName.split("_");
    let asString = ""
    strings.forEach(f => {
      asString = asString + f.charAt(0)
    })
    return asString
  } else {
    return tableName.charAt(0) + tableName.charAt(tableName.length - 1)
  }
}
/**********request***********/
const searchDbTable = (item) => {
  const reqConfig = {
    url: "basis-func/dataBase/getAllTable",
    data: dataBaseInfo,
    method: 'post'
  }
  axiosReq(reqConfig).then(({data}) => {
    if (!findArrObjByKey(useTables.value, 'tableName', item.tableName)) {
      //当前表信息
      const dillDbInfo = {
        originTableName: item.tableName,
        tableName: changeDashToCase(removeTbOrT(item.tableName)),
        tableDesc: item.tableComment,
        tableNameCase: changeTheFirstWordToCase(changeDashToCase(removeTbOrT(item.tableName)))
      }
      //当前表字段列表
     const originColumns= data.map(fItem => {
        fItem.field = changeDashToCase(fItem.columnName)
        fItem.desc = fItem.columnComment
        fItem.fieldCase = changeDashToCaseAndFirstWord(fItem.columnName)
        fItem.originField = fItem.columnName
        fItem.tableName = fItem.columnName
        fItem.type = tbTypeMapping(fItem.dataType)
        return fItem
      })
      useTables.value.push({...dillDbInfo, originColumns})
    }
    currentTbColumn.value = data
  })
}
//回显数据
const getData = () => {
  //设置表的别名
  const tableNameAs = {}
  chooseDbArr.value.forEach(fItem => {
    tableNameAs[fItem.tableName] = getTableAs(fItem.tableName)
  })
  return {
    dataBaseInfo,
    tableNameAs,
    currentTbColumn: currentTbColumn.value,
    dbRadio: dbRadio.value,
    checkColumnArr: checkColumnArr.value,
    chooseDbArr: chooseDbArr.value,
    useTables: useTables.value
  }
}
const reshowData = (data) => {
  copyReactive(dataBaseInfo,data.dataBaseInfo)
  currentTbColumn.value=data.currentTbColumn
  dbRadio.value=data.dbRadio
  checkColumnArr.value=data.checkColumnArr
  chooseDbArr.value=data.chooseDbArr
  useTables.value=data.useTables
  chooseTable.value = chooseDbArr.value
}
/******defineExpose*******/
defineExpose({checkColumnArr, reshowData, getData, getCheckColumn})
</script>


<style scoped lang="scss">

</style>
