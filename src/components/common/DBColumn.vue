<template>
  <FoldingCard title="数据库信息配置">
    <div class="rowSS">
      <el-select v-model="dataBaseInfo.dbConfigId" filterable placeholder="选择数据库配置" class="wi-200px mr-10px">
        <el-option
            v-for="item in databaseConfigList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click="dataBaseClick(item)"
        />
      </el-select>
      <el-select v-model="dataBaseInfo.dbName" filterable placeholder="选择数据库" class="wi-200px mr-10px">
        <el-option
            v-for="item in schemaList"
            :key="item"
            :label="item"
            :value="item"
            @click="chooseSchema()"
        />
      </el-select>
      <!-- sql解析 -->
      <div v-if="showSqlParse" class="ml-20px">
        <el-button type="primary" @click="sqlParse">sql语句解析</el-button>
      </div>
    </div>
    <div class="rowSS mt-20px">
      <!--      <div class="rowSS">-->
      <!--        <div>用户名：</div>-->
      <!--        <el-input v-model="dataBaseInfo.name" class="wi-150px" placeholder="name"/>-->
      <!--      </div>-->
      <!--      <div class="rowSS ml-20px mr-40px">-->
      <!--        <div>密码：</div>-->
      <!--        <el-input v-model="dataBaseInfo.password" class="wi-150px" placeholder="password"/>-->
      <!--      </div>-->
      <!--      <el-button type="primary" @click="searchDataBase">查询</el-button>-->
    </div>
  </FoldingCard>
  <FoldingCard title="表选取">
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
    <div class="mt-30px mb-20px">文件生成基础信息</div>
    <el-form ref="refForm" label-width="90px" :inline="true" :model="basicConfig">
      <el-form-item
          label-width="60px"
          label="基础名" prop="basicName" :rules="formRules.isNotNull('基础名不能为空')"
          label-position="left">
        <el-input v-model="basicConfig.basicName" class="w-200px" placeholder="基础名"/>
      </el-form-item>
      <el-form-item
          label="基础名注释" prop="basicNameDesc" :rules="formRules.isNotNull('基础名注释不能为空')"
          label-position="left">
        <el-input v-model="basicConfig.basicNameDesc" class="w-200px" placeholder="基础名注释"/>
      </el-form-item>
    </el-form>

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
  <FoldingCard title="字段选取">
    <div class="mb-10px rowSC">
      <div>表字段（点击选择）</div>
      <el-button text class="mr-10px" type="primary" @click="checkAllColumn">全选</el-button>
    </div>
    <div class="mt-1">
      <el-button
          v-for="(item, index) in currentTbColumn"
          :key="index"
          type="success"
          style="margin-left: 0"
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
        <div v-for="(item, index) in checkColumnArr" :key="index" class="rowSC mr-20px ml-10px  mb-15px">
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
import {
  changeDashToCase,
  changeDashToCaseAndFirstWord, changeTheFirstWordToCase,
  removeTbOrT,
  tbTypeMapping
} from "@/components/TableExtra/back-extra-code";
import {copyReactive} from "@/hooks/use-common";

const {formRules} = useElement()
const basicConfig = reactive({
  basicName: '',
  basicNameCase: '',
  basicNameDesc: '',
})
/**********props***********/
const props: any = defineProps({
  dbInfo: {
    require: true,
    type: Object,
  },
  showSqlParse: {
    default: false,
    type: Boolean,
  }
});
/**********ref***********/
const checkColumnArr: any = ref([])
const chooseDbArr: any = ref([])
const dbRadio: any = ref([])
const {chooseTable} = storeToRefs(useLowCodeStore())

//保存当前点击的table信息
const currentTbColumn = ref([])
const useTables = ref<any>([])
const dbData = ref([])

/**********reactive***********/
const dataBaseInfo:any = reactive({
  url: "",
  userName: "",
  password: "",
  dbConfigId:"",
  dbName: "",
  tbName: "",
})

/*获取库和表信息*/
/****watch,computed******/

/**********mounted***********/
onMounted(() => {
  databaseConfigReq()
  // if (dataBaseInfo.url) {
  //   getAllSchema()
  // }
})
//清空数据
const resetData = () => {
  resetBasic()
  dataBaseInfo.dbName = ""
}


/**********methods***********/
const databaseConfigList = ref()
const databaseConfigReq = () => {
  const reqConfig = {
    url: "databaseConfig/listPage",
    method: 'post',
    data:{}
  }
  axiosReq(reqConfig).then(({data}) => {
    databaseConfigList.value = data
  })
}

const dataBaseClick = (item) => {
  dataBaseInfo.url=item.url
  dataBaseInfo.password=item.password
  dataBaseInfo.userName=item.userName
  getAllSchema()
}

const getChooseDbName = () => {
  return dataBaseInfo.dbName
}



//不包含数据库
const resetBasic = () => {
  clearTable()
  clearAllColumn()
  currentTbColumn.value = []
  dbData.value = []
  basicConfig.basicName = ""
  basicConfig.basicNameCase = ""
  basicConfig.basicNameDesc = ""
}
//解析数据
const resetParseData = () => {
  clearAllColumn()
  currentTbColumn.value = []
  basicConfig.basicName = ""
  basicConfig.basicNameCase = ""
  basicConfig.basicNameDesc = ""
  chooseDbArr.value = []
  dbRadio.value = []
}

//sql解析
const useAttr: any = useAttrs();
const sqlParse = () => {
  if (!dataBaseInfo.dbName) {
    elMessage("请先选择数据库", "warning")
    return
  }
  useAttr.showParseSql()
}

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

//数据库选择
const chooseSchema = () => {
  //重置数据
  resetBasic()
  searchDataBase()
}

//获取数据库
const schemaList = ref([]);
const getAllSchema = () => {
  const reqConfig = {
    url: "basis-func/dataBase/getAllSchema",
    data:dataBaseInfo,
    bfLoading: false,
    method: 'post'
  }
  axiosReq(reqConfig).then(({data}) => {
    schemaList.value = data.filter((f) => {
      return !["information_schema", "performance_schema", "mysql", "sys", "seata"].includes(f)
    })
  })
}

const dbChooseRadioClick = (item) => {
  dataBaseInfo.tbName = item.tableName
  currentTbColumn.value = []
  //clearAllColumn()
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

//设置选中的table
const setCheckTable = (checkTable) => {
  const filterDbTable = dbData.value.filter((f: any) => {
    return checkTable.includes(f.tableName)
  })
  dbRadio.value = checkTable
  filterDbTable.forEach(f => {
    dbRadioClick(f, true)
  })
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
  setBasicInfo()
}

//设置基础名和基础信息
const setBasicInfo = () => {
  if (chooseDbArr.value.length) {
    const dbDataOne: any = chooseDbArr.value[0]
    basicConfig.basicName = changeDashToCase(dbDataOne.tableName)
    basicConfig.basicNameCase = changeTheFirstWordToCase(basicConfig.basicName)
    basicConfig.basicNameDesc = dbDataOne.tableComment
  } else {
    basicConfig.basicName = ""
    basicConfig.basicNameCase = ""
    basicConfig.basicNameDesc = ""
  }
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
    if (!findArrObjByKey(useTables.value, 'originTableName', item.tableName)) {
      //当前表信息
      const dillDbInfo = {
        originTableName: item.tableName,
        tableName: changeDashToCase(removeTbOrT(item.tableName)),
        tableDesc: item.tableComment,
        tableNameCase: changeTheFirstWordToCase(changeDashToCase(removeTbOrT(item.tableName)))
      }
      //当前表字段列表
      const originColumns = data.map(fItem => {
        fItem.field = changeDashToCase(fItem.columnName)
        fItem.desc = fItem.columnComment
        fItem.fieldCase = changeDashToCaseAndFirstWord(fItem.columnName)
        fItem.originField = fItem.columnName
        fItem.type = tbTypeMapping(fItem.dataType)
        return fItem
      })
      useTables.value.push({...dillDbInfo, originColumns})
    }
    currentTbColumn.value = data
  })
}

const multiTableData = ref([])
const queryMultiTable = (tableName) => {
  let item: any = {}
  dbData.value.forEach((f: any) => {
    if (f.tableName === tableName) {
      item = f
    }
  })
  dataBaseInfo.tbName = tableName
  return new Promise(resolve => {
    const reqConfig = {
      url: "basis-func/dataBase/getAllTable",
      data: dataBaseInfo,
      method: 'post'
    }
    axiosReq(reqConfig).then(({data}) => {
      multiTableData.value = multiTableData.value.concat(data)
      resolve(true)
    })
  })
}
//返回多表的column数据
const returnMultiTableColumn = (tableArr) => {
  multiTableData.value = []
  return new Promise(resolve => {
    const reqArr = tableArr.map(m => {
      return queryMultiTable(m)
    })
    Promise.all(reqArr).then(() => {
      resolve(multiTableData.value)
    })
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
    useTables: useTables.value.filter(f => dbRadio.value.includes(f.originTableName))
  }
}
const reshowData = (data, basicConf) => {
  copyReactive(dataBaseInfo, data.dataBaseInfo)
  currentTbColumn.value = data.currentTbColumn
  dbRadio.value = data.dbRadio
  checkColumnArr.value = data.checkColumnArr
  chooseDbArr.value = data.chooseDbArr
  useTables.value = data.useTables || []
  chooseTable.value = chooseDbArr.value

  //回显表和备注信息
  basicConfig.basicName = basicConf.basicName
  basicConfig.basicNameCase = changeTheFirstWordToCase(basicConf.basicName)
  basicConfig.basicNameDesc = basicConf.basicNameDesc


  //查询数据库
  getAllSchema()
  //查询表
  searchDataBase()
  // setBasicInfo()
}


//获取基础信息
const getBasicInfo = () => {
  return basicConfig
}
/******defineExpose*******/
defineExpose({
  getChooseDbName,
  returnMultiTableColumn,
  setCheckTable,
  resetParseData,
  getBasicInfo,
  resetData,
  checkColumnArr,
  reshowData,
  getData,
  getCheckColumn
})
</script>


<style scoped lang="scss">

</style>
