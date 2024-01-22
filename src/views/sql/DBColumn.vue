<template>
  <FoldingCard title="数据库信息配置">
    <div class="rowSS">
      <div class="rowSS">
        <div>数据库链接：</div>
        <el-input v-model="dataBaseInfo.url" class="wi-400px mr-10px" placeholder="dataBaseUrl" />
      </div>
      <div class="rowSS">
        <div>库名字：</div>
        <el-input v-model="dataBaseInfo.dbName" class="wi-150px" placeholder="dbName" />
      </div>
    </div>
    <div class="rowSS mt-20px">
      <div class="rowSS">
        <div>用户名：</div>
        <el-input v-model="dataBaseInfo.name" class="wi-150px" placeholder="name" />
      </div>
      <div class="rowSS ml-20px mr-40px">
        <div>密码：</div>
        <el-input v-model="dataBaseInfo.password" class="wi-150px" placeholder="password" />
      </div>
      <el-button   type="primary" @click="searchDataBase">查询</el-button>
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
      <div>选中的表 </div>
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
          v-for="(item, index) in tbData"
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
          <ElSvgIcon name="CircleClose" :size="14" style="cursor: pointer" @click="deleteColumn(index)" />
        </div>
      </div>

    </div>
  </FoldingCard>
</template>


<script setup lang="ts" injectCode>

import {storeToRefs} from "pinia/dist/pinia";
import {
  changeDashToCase,
  changeDashToCaseAndFirstWord,
  changeTheFirstWordToCase,
  removeTbOrT, tbTypeMapping
} from "@/components/TableExtra/back-extra-code";
import {useLowCodeStore} from "@/store/low-code";

/**********props***********/
// const props = defineProps({
//   name: {
//     require: true,
//     default: "fai",
//     type:String,
//   },
// });

/**********ref***********/
const checkColumnArr:any = ref([])
const chooseDbArr:any = ref([])
const dbRadio:any = ref([])
const {chooseTable}=storeToRefs(useLowCodeStore())
//读取表中字段信息
const multiTableName = ref()
const multiTableDesc = ref()
const multiTableConfig:any = ref([])
//保存当前点击的table信息
const tbData = ref([])
const currentTableInfo:any = ref({})
const dbData = ref([])

/**********reactive***********/
/*获取库和表信息*/
const dataBaseInfo=reactive({
  url:"159.75.144.202:3310",
  name:"root",
  password:"@Root123",
  dbName:"micro-service-single",
  tbName:"",
})
/****watch,computed******/
// watch(() => props.name, (oldValue,newValue) => {
//   },
//   { immediate: true }
// );
// const message = computed(() => {
//   return 'The webmaster said that you can not enter this page...'
// })
/**********mounted***********/
onMounted(()=>{
  if (dataBaseInfo.url) {
    searchDataBase()
  }
})


/**********methods***********/
const clearTable = ()=>{
  dbRadio.value=[]
  chooseDbArr.value=[]
}

const searchDataBase = () => {
  const reqConfig = {
    url:"basis-func/dataBase/getAllDatabase",
    data:dataBaseInfo,
    method: 'post'
  }
  axiosReq(reqConfig).then(({ data }) => {
    dbData.value = data
  })
}
const dbChooseRadioClick = (item) => {
  dataBaseInfo.tbName = item.tableName
  tbData.value = []
  currentTableInfo.value = {
    tableName: changeDashToCase(removeTbOrT(item.tableName)),
    originTableName: item.tableName,
    tableDesc: item.tableComment,
    tableNameCase: changeTheFirstWordToCase(changeDashToCase(removeTbOrT(item.tableName))),
    uniKey: 'id'
  }
  if (dataBaseInfo.url) {
    searchDbTable()
  }
}
const checkAllColumn = () => {
  checkColumnArr.value = JSON.parse(JSON.stringify(tbData.value))
}
const clearAllColumn = () => {
  checkColumnArr.value = []
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
  }
  chooseTable.value=chooseDbArr.value
}

const getTableAs=(tableName)=>{
  if(tableName.includes("_")){
    const  strings = tableName.split("_");
    let asString=""
    strings.forEach(f=>{
      asString=asString+f.charAt(0)
    })
    return asString
  }else{
    return tableName.charAt(0)+tableName.charAt(tableName.length-1)
  }
}
/**********request***********/
const searchDbTable = () => {
  const reqConfig = {
    url:"basis-func/dataBase/getAllTable",
    data:dataBaseInfo,
    method: 'post'
  }
  axiosReq(reqConfig).then(({ data }) => {
    //得到主键key
    const priKeyArr: any = []
    const priKeyItemArr: any = []
    data.forEach((fItem) => {
      if (fItem.columnKey) {
        priKeyArr.push(fItem.columnName)
        priKeyItemArr.push(fItem)
      }
    })
    //插入表信息
    const firstData = data[0] //取出第一个字段信息
    const priKeyArrFirst = priKeyArr[0]
    const priKeyArrLast = priKeyArr[priKeyArr.length - 1]
    const priKeyArrItemFirst = priKeyItemArr[0]
    const priKeyArrItemLast = priKeyItemArr[priKeyItemArr.length - 1]
    if (!findArrObjByKey(multiTableConfig.value, 'originTableName', firstData.tbName)) {
      multiTableName.value = firstData.tbName
      multiTableConfig.value.push({
        ...currentTableInfo.value,
        //存储原始字段信息
        tableFieldArr: data.map((fItem) => {
          fItem.field = changeDashToCase(fItem.columnName)
          fItem.desc = fItem.columnComment
          fItem.fieldCase = changeDashToCaseAndFirstWord(fItem.columnName)
          fItem.originField = fItem.columnName
          fItem.type = tbTypeMapping(fItem.dataType)
          return fItem
        }),
        uniKey: changeDashToCase(priKeyArrFirst),
        orgUniKey: priKeyArrFirst,
        uniKeyType: tbTypeMapping(priKeyArrItemFirst.dataType),
        priKeyArr,
        priKeyItemArr,
        orgAssociationKey: priKeyArrLast,
        associationKey: changeDashToCase(priKeyArrLast),
        associationKeyCase: changeTheFirstWordToCase(changeDashToCase(priKeyArrLast)),
        associationKeyType: tbTypeMapping(priKeyArrItemLast.dataType)
      })
    }
    tbData.value = data
  })
}

//回显数据
const getData=()=>{
  //取multiTableConfig第一项
  const multiTableFistItem:any= multiTableConfig.value[0]
  //设置dbTableConfig
  const dbTableConfig = {
    multiTableName: multiTableName.value,
    multiTableNameCase: changeTheFirstWordToCase( multiTableName.value),
    multiTableDesc:multiTableDesc.value,
    ...multiTableFistItem
  }

  //设置表的别名
  const tableNameAs={}
  chooseDbArr.value.forEach(fItem=>{
    tableNameAs[fItem.tableName]=getTableAs(fItem.tableName)
  })

  const saveData={
    ...dbTableConfig,
    dataBaseInfo,
    tableNameAs,
    tbData:tbData.value,
    dbRadio:dbRadio.value,
    multiTableConfig:multiTableConfig.value,
    checkColumnArr:checkColumnArr.value,
    chooseDbArr:chooseDbArr.value,
    currentTableInfo:currentTableInfo.value
  }
  return saveData
}

const reshowData=(generatorConfig)=>{
  tbData.value = generatorConfig.tbData
  dbRadio.value = generatorConfig.dbRadio
  checkColumnArr.value = generatorConfig.checkColumnArr
  chooseDbArr.value = generatorConfig.chooseDbArr
  copyReactive(dataBaseInfo,generatorConfig.dataBaseInfo)
  multiTableConfig.value = generatorConfig.multiTableConfig
  currentTableInfo.value = generatorConfig.currentTableInfo
  chooseTable.value=chooseDbArr.value
}
/******defineExpose*******/
defineExpose({checkColumnArr,reshowData,getData})
</script>


<style scoped lang="scss">

</style>
