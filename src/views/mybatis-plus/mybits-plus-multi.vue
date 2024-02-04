<template>
  <div class="project-page-style scroll-y">
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


      <div class="mt-3 mb-1 rowSC">
        <div>选中的表 </div>
        <el-button text type="danger" class="ml-1" @click="chooseDbArr=[]">清空</el-button>
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
    <FoldingCard title="表字段关系配置">
      <div class="mt-20px mb-10px">
        <div class="mb-6px">关联关系配置</div>
        <el-radio-group v-model="associationType">
          <el-radio key="0" label="一对一">一对一</el-radio>
          <!--          <el-radio key="1" label="一对多">一对多</el-radio>-->
          <!--          <el-radio key="2" label="多对多">多对多</el-radio>-->
        </el-radio-group>
      </div>
      <div class="mb-20px rowSS">
        <el-input v-model="multiTableName" placeholder="多表实体类名" class="wi-150px mr-2" />
        <el-input v-model="multiTableDesc" placeholder="多表相关注释" class="wi-150px" />
      </div>
      <div v-for="(item, index) in multiTableConfig" :key="index" class="rowSS mt-20px">
        <div class="mr-10px">{{ item.originTableName }}：</div>
        <el-checkbox-group v-model="item.orgAssociationKey">
          <el-checkbox
              v-for="(pkaItem, pkaIndex) in item.tableFieldArr"
              :key="pkaIndex"
              :label="pkaItem.field"
              @click="pkaRadioClick(item, pkaItem.field)"
          >
            {{ pkaItem.field }}
          </el-checkbox>
        </el-checkbox-group>
        <ElSvgIcon
            class="ml-10px mt-4px"
            name="CircleClose"
            :size="14"
            style="cursor: pointer"
            @click="deleteMultiTable(index)"
        />
      </div>
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
          <div v-for="(item, index) in checkColumnArr" :key="index" class="rowSC mr-20px  mb-15px">
            <span style="color: #e6a23c">{{ item.columnName }}({{ item.columnComment }})</span>
            <ElSvgIcon name="CircleClose" :size="14" style="cursor: pointer" @click="deleteColumn(index)" />
          </div>
        </div>
        <div v-if="checkColumnArr.length" class="mt-20px">
          <el-button type="primary" @click="generatorToSearch">同步到查询</el-button>
          <el-button type="primary" @click="generatorToTable">同步到表格</el-button>
          <el-button type="primary" @click="generatorToForm">同步到提交表单</el-button>
        </div>
      </div>
    </FoldingCard>
    <FoldingCard title="字段用途配置">
      <!--  查询配置  -->
      <div class="mt-30px mb-10px">查询字段</div>
      <BackLowCodeTable ref="refSearchTableConfig" :table-type="1" />
      <!--  表格配置  -->
      <div class="mt-30px mb-10px">表格字段</div>
      <BackLowCodeTable ref="refListTableConfig" :table-type="2" />
      <!--  提交from表单配置  -->
      <div class="mt-30px mb-10px">新增和修改字段</div>
      <BackLowCodeTable ref="refFormTableConfig" :table-type="3" />
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
import {
  changeDashToCase,
  changeDashToCaseAndFirstWord,
  changeTheFirstWordToCase,
  removeTbOrT,
  tbTypeMapping
} from "@/components/TableExtra/back-extra-code"
const { formRules } = useElement()
const basicConfig = reactive({
  author: '',
  packageName: '',
  isMultiTable: true,
  basicName: '',
  basicDesc: '',
  dataTime: ''
})
basicConfig.dataTime = getCurrentTime()

/*获取库和表信息*/
const dataBaseInfo=reactive({
  url:"159.75.144.202:3310",
  name:"root",
  password:"@Root123",
  dbName:"micro-service-single",
  tbName:"",
})
onBeforeMount(() => {
  if (dataBaseInfo.url) {
    searchDataBase()
  }
})
const dbRadio:any = ref([])
const chooseDbArr:any = ref([])
const chooseDbRadio:any = ref()
const dbData:any = ref([])
const dbRadioClick = (item, check) => {
  if (check) {
    if (!findArrObjByKey(chooseDbArr.value, 'tableName', item.tableName)) {
      item.id = getGuid()
      chooseDbArr.value.push(item)
    }
  } else {
    deleteArrObjByKey(chooseDbArr.value, 'tableName', item.tableName)
  }
}

//保存tb的信息
const currentTableInfo:any = ref({})
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
//表
const dbTableUrl = ref(dataBaseInfo.url)
const tbName = ref('')
const tbData = ref([])
const multiTableConfig:any = ref([])
const deleteMultiTable = (index) => {
  multiTableConfig.value.splice(index, 1)
}
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
    const firstData = data[0]
    const priKeyArrFirst = priKeyArr[0]
    const priKeyArrLast = priKeyArr[priKeyArr.length - 1]
    const priKeyArrItemFirst = priKeyItemArr[0]
    const priKeyArrItemLast = priKeyItemArr[priKeyItemArr.length - 1]

    //给请求回来的data添加field和desc等属性
    data.forEach((fItem) => {
      fItem.field = changeDashToCase(fItem.columnName) //_转驼峰
      fItem.desc = fItem.columnComment
      fItem.fieldCase = changeDashToCaseAndFirstWord(fItem.columnName) //_转驼峰
      fItem.originField = fItem.columnName
      // fItem.tbName = fItem.columnName
      fItem.type = tbTypeMapping(fItem.dataType)
    })

    if (!findArrObjByKey(multiTableConfig.value, 'originTableName', firstData.tableName)) {
      multiTableConfig.value.push({
        ...currentTableInfo.value,
        tableFieldArr: data,
        uniKey: changeDashToCase(priKeyArrFirst),
        orgUniKey: priKeyArrFirst,
        uniKeyType: tbTypeMapping(priKeyArrItemFirst.dataType),
        priKeyArr,
        priKeyItemArr,
        orgAssociationKey: [priKeyArrLast],
        associationKey: changeDashToCase(priKeyArrLast),
        associationKeyCase: changeTheFirstWordToCase(changeDashToCase(priKeyArrLast)),
        associationKeyType: tbTypeMapping(priKeyArrItemLast.dataType)
      })
    }
    tbData.value = data
  })
}
//多表关系配置
const multiTableName = ref(null)
//表联合类型
const associationType = ref('一对一')
const multiTableDesc = ref('')
const pkaRadioClick = (item, pkaItem) => {
  item.associationKey = changeDashToCase(pkaItem)
}
//全选
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
const checkColumnArr:any = ref([])
const refSearchTableConfig = ref()
const generatorToSearch = () => {
  refSearchTableConfig.value.setData(checkColumnArr.value)
}
const refListTableConfig = ref()
const generatorToTable = () => {
  refListTableConfig.value.setData(checkColumnArr.value)
}
const refFormTableConfig = ref()
const generatorToForm = () => {
  refFormTableConfig.value.setData(checkColumnArr.value)
}

//生成模板
const generatorSubData = () => {
  return new Promise((resolve) => {
    const searchTableConfig = refSearchTableConfig.value.getData()
    const searchTableGroup = arrGroupByKey(searchTableConfig, 'tableName')
    const listTableConfig = refListTableConfig.value.getData()
    const listTableGroup = arrGroupByKey(listTableConfig, 'tableName')
    const formTableConfig = refFormTableConfig.value.getData()
    const formTableGroup = arrGroupByKey(formTableConfig, 'tableName')

    //多表数据处理
    multiTableConfig.value.forEach((fItem) => {
      fItem.tableQueryArr = searchTableGroup[fItem.originTableName]
      fItem.tableShowArr = listTableGroup[fItem.originTableName]
      fItem.tableFormArr = formTableGroup[fItem.originTableName]
    })
    if (multiTableConfig.value.length > 1) {
      basicConfig.isMultiTable = true
    }

    //取multiTableConfig第一项
    const multiTableFistItem = multiTableConfig.value[0]
    //设置dbTableConfig
    const dbTableConfig = {
      multiTableName:multiTableName.value,
      multiTableNameCase: changeTheFirstWordToCase(multiTableName.value),
      multiTableDesc:multiTableDesc.value,
      associationType:associationType.value,
      ...multiTableFistItem
    }
    const generatorData = {
      basicConfig,
      multiTableConfig:multiTableConfig.value,
      dbTableConfig,
      queryConfig: searchTableConfig,
      tableConfig: listTableConfig,
      formConfig: formTableConfig,

      //此处保存的数据主要用于回显
      dataBaseInfo,
      saveFileName:saveFileName.value,
      dbRadio:dbRadio.value,
      chooseDbRadio:chooseDbRadio.value,
      dbTableUrl:dbTableUrl.value,
      tbName:dataBaseInfo.tbName,
      checkColumnArr:checkColumnArr.value,
      chooseDbArr:chooseDbArr.value,
      tbData:tbData.value
    }
    resolve(generatorData)
  })
}

//保存模板
const saveFileName = ref('')
const pageName = 'mybatis-plus-multi'
const saveTmp = async () => {
  const subData = await generatorSubData()
  const reqConfig = {
    url: '/generator/configSave',
    method: 'post',
    data: {
      name: `${saveFileName.value} ${pageName}(${getCurrentTime()})`,
      generatorConfig: JSON.stringify(subData)
    }
  }
  axiosReq(reqConfig).then((res) => {
    elMessage('配置保存成功')
    getSaveTmp()
  })
}

//查询模板
onMounted(() => {
  getSaveTmp()
})
const configList:any = ref([])
const chooseTmp = ref(pageName)
const getSaveTmp = () => {
  const reqConfig = {
    url: '/generator/configSave/listPage',
    method: 'get',
    bfLoading: true,
    data: { pageSize: 50, pageNum: 1, name: pageName }
  }
  axiosReq(reqConfig).then(({ data }) => {
    configList.value = data
    //回显第一个元素
    for (const fItem of configList.value) {
      if (fItem.name.includes(pageName)) {
        chooseTmp.value = fItem.name
        reshowData(fItem)
        return
      }
    }
  })
}
const reshowData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  refSearchTableConfig.value.reshowData(generatorConfig.queryConfig)
  refListTableConfig.value.reshowData(generatorConfig.tableConfig)
  refFormTableConfig.value.reshowData(generatorConfig.formConfig)
  dbRadio.value = generatorConfig.dbRadio
  chooseDbRadio.value = generatorConfig.chooseDbRadio
  dbTableUrl.value= generatorConfig.dbTableUrl
  checkColumnArr.value = generatorConfig.checkColumnArr
  chooseDbArr.value = generatorConfig.chooseDbArr
  tbData.value = generatorConfig.tbData
  saveFileName.value = generatorConfig.saveFileName
  copyReactive(basicConfig,generatorConfig.basicConfig)
  copyReactive(dataBaseInfo,generatorConfig.dataBaseInfo)
  multiTableConfig.value = generatorConfig.multiTableConfig
  multiTableName.value = generatorConfig.dbTableConfig.multiTableName
  multiTableDesc.value = generatorConfig.dbTableConfig.multiTableDesc
  associationType.value = generatorConfig.dbTableConfig.associationType
}

/**
 * 生成前端模版
 * @return
 * @author 熊猫哥
 * @date 2022/6/26 14:40
 */
//生成基础模板
const refTemplateConfig = ref()
const generatorBaseModelTemp = async () => {
  const subData: any = await generatorSubData()
  const { id } = refTemplateConfig.value.returnData()
  const subFormData = new FormData()
  //获取edit里的数据
  subFormData.append('id', id)
  subFormData.append('jsonData', JSON.stringify(subData))
  subFormData.append('fileNamePre', currentTableInfo.value.tableNameCase)
  const reqConfig = {
    url: '/generator/templateFile/generatorTemplateFileByConfig',
    method: 'post',
    data: subFormData
  }
  downLoadTempByApi(reqConfig)
}

defineExpose({ generatorSubData })
</script>

<style scoped lang="scss"></style>
