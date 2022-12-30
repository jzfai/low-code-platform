<template>
  <div class="project-page-style pb-5">
    <!--项目和作者信息配置-->
    <FoldingCard title="基础信息配置">
      <div class="mb-10px">
        <el-form-item label="选择回显配置" label-position="left">
          <el-select v-model="chooseTmp" filterable placeholder="选择回显配置" class="wi-300px">
            <el-option
              v-for="item in configList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click="reshowData(item)"
            />
          </el-select>
        </el-form-item>
      </div>
      <el-form ref="refForm" label-width="120px" :inline="true" :model="basicConfig" :rules="formRules" class="pr-50px">
        <el-form-item label="作者" prop="author" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="basicConfig.author" placeholder="作者" />
        </el-form-item>
        <el-form-item label="包名" prop="packageName" :rules="formRules.isNotNull()" label-position="left">
          <el-input v-model="basicConfig.packageName" class="w-200px" placeholder="包名" />
        </el-form-item>
      </el-form>
    </FoldingCard>
    <FoldingCard title="库和表选取">
      <div class="rowSS">
        <div>数据库链接：</div>
        <el-input v-model="dataBaseUrl" class="wi-600px mr-10px" placeholder="dataBaseUrl" />
        <el-button type="primary" @click="searchDataBase">查询表</el-button>
      </div>
      <div class="rowSS mt-20px">
        <div>数据表链接：</div>
        <el-input v-model="dbTableUrl" class="wi-600px" placeholder="dbTableUrl" />
      </div>
      <!-- 获取库和表信息 -->
      <div class="mt-20px mb-10px">请选择表(支持多表)</div>
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

      <div v-if="chooseDbArr.length" class="mt-3 mb-1">选中的表</div>
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
          <span>选中的字段处理</span>
          <el-button text type="danger" class="ml-1" @click="clearAllColumn">清空</el-button>
        </div>
        <div class="rowSC flex-wrap">
          <div v-for="(item, index) in checkColumnArr" :key="index" class="rowSC mr-20px mt-10px mb-30px">
            <span style="color: #e6a23c">{{ item.columnName }}({{ item.columnComment }})</span>
            <ElSvgIcon name="CircleClose" :size="14" style="cursor: pointer" @click="deleteColumn(index)" />
          </div>
        </div>
        <div v-if="checkColumnArr.length" class="mt-20px">
          <el-button type="primary" @click="generatorToSearch">同步到查询</el-button>
          <el-button type="primary" @click="generatorToTable">同步到表格</el-button>
          <el-button type="primary" @click="generatorToForm">同步到表单</el-button>
        </div>
      </div>
    </FoldingCard>
    <FoldingCard title="表字段关系配置">
      <div v-for="(item, index) in multiTableConfig" :key="index" class="rowSC">
        <div class="mr-10px">{{ item.originTableName }}：</div>
        <el-radio-group v-model="item.orgAssociationKey">
          <el-radio
            v-for="(pkaItem, pkaIndex) in item.priKeyArr"
            :key="pkaIndex"
            :label="pkaItem"
            @click="pkaRadioClick(item, pkaItem)"
          >
            {{ pkaItem }}
          </el-radio>
        </el-radio-group>
        <ElSvgIcon
          class="ml-10px"
          name="CircleClose"
          :size="14"
          style="cursor: pointer"
          @click="deleteMultiTable(index)"
        />
      </div>
    </FoldingCard>
    <FoldingCard title="字段用途配置">
      <!--  查询配置  -->
      <div class="mt-30px mb-10px">查询字段</div>
      <SearchTableConfig ref="refSearchTableConfig" />
      <!--  表格配置  -->
      <div class="mt-30px mb-10px">表格显示字段</div>
      <ListTableConfig ref="refListTableConfig" />
      <!--  提交from表单配置  -->
      <div class="mt-30px mb-10px">新增和修改字段</div>
      <FormTableConfig ref="refFormTableConfig" />
    </FoldingCard>
    <FoldingCard title="保存和生成模板">
      <div class="mb-10px">保存当前配置</div>
      <div class="rowSS mb-20px">
        <el-input v-model="saveFileName" class="wi-200px mr-10px" placeholder="保存文件名(可以不填写)" />
        <el-button type="primary" @click="saveTmp">保存</el-button>
      </div>

      <div>
        <div class="mb-10px">选择模板文件</div>
        <TemplateConfig ref="refTemplateConfig" />
      </div>

      <el-button type="primary" class="mt-20px" @click="generatorBaseModelTemp">点击生成模板</el-button>
    </FoldingCard>
  </div>
</template>

<script setup lang="ts">
import FormTableConfig from './FormTableConfig.vue'
import SearchTableConfig from './SearchTableConfig.vue'
import ListTableConfig from './ListTableConfig.vue'

const { formRules } = useElement()
/*基础配置*/
let basicConfig = $ref({
  author: '',
  packageName: '',
  basicClassName: '',
  basicClassDesc: '',
  dataTime: ''
})
basicConfig.dataTime = getCurrentTime()

/*获取库和表信息*/
let dataBaseUrl = $ref(
  'https://github.jzfai.top/micro-service-api/basis-func/dataBase/getAllDatabaseOrTable/micro-service-plus'
)
onBeforeMount(() => {
  if (dataBaseUrl) {
    searchDataBase()
  }
})
let dbData = $ref([])
const searchDataBase = () => {
  const reqConfig = {
    baseURL: dataBaseUrl,
    method: 'get'
  }
  axiosReq(reqConfig).then(({ data }) => {
    dbData = data
  })
}

let chooseDbArr = $ref([])
let chooseDbRadio = $ref(null)
let dbRadio = $ref([])
const dbRadioClick = (item, check) => {
  if (check) {
    if (!findArrObjByKey(chooseDbArr, 'tableName', item.tableName)) {
      item.id = getGuid()
      chooseDbArr.push(item)
    }
  } else {
    deleteArrObjByKey(chooseDbArr, 'tableName', item.tableName)
  }
}
//保存当前点击的table信息
let currentTableInfo = $ref({})
const dbChooseRadioClick = (item) => {
  tbName = item.tableName
  tbData = []
  currentTableInfo = {
    tableName: changeDashToCase(removeTbOrT(item.tableName)),
    originTableName: item.tableName,
    tableDesc: item.tableComment,
    tableNameCase: changeTheFirstWordToCase(changeDashToCase(removeTbOrT(item.tableName))),
    uniKey: 'id'
  }
  if (dataBaseUrl) {
    searchDbTable()
  }
}

//表
let dbTableUrl = $ref(dataBaseUrl)
let tbName = $ref('')
let tbData = $ref([])
let multiTableConfig = $ref([])
const deleteMultiTable = (index) => {
  multiTableConfig.splice(index, 1)
}

//读取表中字段信息
let multiTableName = $ref(null)
const multiTableDesc = $ref('')
const searchDbTable = () => {
  const reqConfig = {
    baseURL: `${dataBaseUrl}/${tbName}`,
    method: 'get'
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
    if (!findArrObjByKey(multiTableConfig, 'originTableName', firstData.tableName)) {
      multiTableName = firstData.tableName
      multiTableConfig.push({
        ...currentTableInfo,
        //存储原始字段信息
        tableFieldArr: data.map((fItem) => {
          fItem.field = changeDashToCase(fItem.columnName)
          fItem.desc = fItem.columnComment
          fItem.fieldCase = changeDashToCaseAndFirstWord(fItem.columnName)
          fItem.originField = fItem.columnName
          fItem.tbName = fItem.columnName
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
    tbData = data
  })
}
//多表关系配置
const pkaRadioClick = (item, pkaItem) => {
  item.associationKey = changeDashToCase(pkaItem)
}
//全选
const checkAllColumn = () => {
  checkColumnArr = JSON.parse(JSON.stringify(tbData))
}
const clearAllColumn = () => {
  checkColumnArr = []
}

const checkColumnClick = (cItem) => {
  if (!findArrObjByKey(checkColumnArr, 'columnName', cItem.columnName)) {
    checkColumnArr.push(cItem)
  }
}
const deleteColumn = (dIndex) => {
  checkColumnArr.splice(dIndex, 1)
}
let checkColumnArr = $ref([])
const refSearchTableConfig = $ref(null)
const generatorToSearch = () => {
  refSearchTableConfig.setSearchTableData(JSON.parse(JSON.stringify(checkColumnArr)))
}
const refListTableConfig = $ref(null)
const generatorToTable = () => {
  refListTableConfig.setListTableData(JSON.parse(JSON.stringify(checkColumnArr)))
}
const refFormTableConfig = $ref(null)
const generatorToForm = () => {
  refFormTableConfig.setFormTableData(JSON.parse(JSON.stringify(checkColumnArr)))
}

//生成模板
const generatorSubData = () => {
  return new Promise((resolve) => {
    const searchTableConfig = refSearchTableConfig.getSearchTableData()
    // const searchTableGroup = arrGroupByKey(searchTableConfig, 'tableName')
    const listTableConfig = refListTableConfig.getListTableData()
    // const listTableGroup = arrGroupByKey(searchTableConfig, 'tableName')
    const formTableConfig = refFormTableConfig.getFormTableData()
    //取multiTableConfig第一项
    const multiTableFistItem = multiTableConfig[0]
    //设置dbTableConfig
    const dbTableConfig = {
      multiTableName,
      multiTableNameCase: changeTheFirstWordToCase(multiTableName),
      multiTableDesc,
      ...multiTableFistItem
    }
    const generatorData = {
      basicConfig,
      multiTableConfig,
      dbTableConfig,
      queryConfig: searchTableConfig,
      tableConfig: listTableConfig,
      formConfig: formTableConfig,

      //此处保存的数据主要用于回显
      dataBaseUrl,
      dbRadio,
      saveFileName,
      chooseDbRadio,
      dbTableUrl,
      tbName,
      checkColumnArr,
      chooseDbArr,
      tbData,
      currentTableInfo
    }
    resolve(generatorData)
  })
}

//保存模板
let saveFileName = $ref('')
const saveName = 'mybatis-plus-basic'
const saveTmp = async () => {
  const subData = await generatorSubData()
  const reqConfig = {
    url: '/basis-func/configSave/insert',
    method: 'post',
    data: {
      name: `${saveFileName} ${saveName}(${getCurrentTime()})`,
      generatorConfig: JSON.stringify(subData)
    }
  }
  axiosReq(reqConfig).then(() => {
    elMessage('配置保存成功')
    getSaveTmp()
  })
}

//查询模板
onMounted(() => {
  getSaveTmp()
})
let configList = $ref([])
let chooseTmp = $ref(saveName)
const getSaveTmp = () => {
  const reqConfig = {
    url: '/basis-func/configSave/selectPage',
    method: 'get',
    bfLoading: true,
    data: { pageSize: 50, pageNum: 1, name: saveName }
  }
  axiosReq(reqConfig).then(({ data }) => {
    configList = data?.records
    //回显第一个元素
    for (const fItem of configList) {
      if (fItem.name.includes(saveName)) {
        chooseTmp = fItem.name
        reshowData(fItem)
        return
      }
    }
  })
}

//回显数据
const reshowData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  refSearchTableConfig.reshowSearchTableData(generatorConfig.queryConfig)
  refListTableConfig.reshowListTableData(generatorConfig.tableConfig)
  refFormTableConfig.reshowFormTableData(generatorConfig.formConfig)
  dataBaseUrl = generatorConfig.dataBaseUrl
  dbRadio = generatorConfig.dbRadio
  chooseDbRadio = generatorConfig.chooseDbRadio
  dbTableUrl = generatorConfig.dbTableUrl
  tbName = generatorConfig.tbName
  checkColumnArr = generatorConfig.checkColumnArr
  chooseDbArr = generatorConfig.chooseDbArr
  saveFileName = generatorConfig.saveFileName
  tbData = generatorConfig.tbData
  basicConfig = generatorConfig.basicConfig
  multiTableConfig = generatorConfig.multiTableConfig
  currentTableInfo = generatorConfig.currentTableInfo
}

//生成基础模板
const refTemplateConfig = $ref()
const generatorBaseModelTemp = async () => {
  const subData: any = await generatorSubData()
  const { id } = refTemplateConfig.returnData()
  const subFormData = new FormData()
  //获取edit里的数据
  subFormData.append('id', id)
  subFormData.append('jsonData', JSON.stringify(subData))
  subFormData.append('fileNamePre', currentTableInfo.tableNameCase)
  const reqConfig = {
    url: '/basis-func/templateFile/generatorTemplateFileByConfig',
    method: 'post',
    data: subFormData
  }
  downLoadTempByApi(reqConfig)
}

defineExpose({ generatorSubData })
</script>

<style scoped lang="scss"></style>
