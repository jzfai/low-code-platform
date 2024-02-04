<template>
  <div class="project-page-style">
    <BasicInfo ref="refBasicInfo"/>
    <!--项目和作者信息配置-->
<!--    <FoldingCard title="基础信息配置">-->
<!--      <div class="mb-10px">-->
<!--        <el-form-item label="选择回显配置" label-position="left">-->
<!--          <el-select v-model="chooseTmp" filterable placeholder="选择回显配置" class="wi-300px">-->
<!--            <el-option-->
<!--              v-for="item in configList"-->
<!--              :key="item.id"-->
<!--              :label="item.name"-->
<!--              :value="item.id"-->
<!--              @click="reshowData(item)"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </div>-->
<!--      <el-form ref="refForm" label-width="120px" :inline="true" :model="basicConfig" :rules="formRules" class="pr-50px">-->
<!--        <el-form-item label="作者" prop="author" :rules="formRules.isNotNull()" label-position="left">-->
<!--          <el-input v-model="basicConfig.author" placeholder="作者" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="包名" prop="packageName" :rules="formRules.isNotNull()" label-position="left">-->
<!--          <el-input v-model="basicConfig.packageName" class="w-200px" placeholder="包名" />-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </FoldingCard>-->

    <DBColumn ref="refDBColumn" :db-info="dataBaseInfo"/>
<!--    <FoldingCard title="数据库信息配置">-->
<!--      <div class="rowSS">-->
<!--        <div class="rowSS">-->
<!--          <div>数据库链接：</div>-->
<!--          <el-input v-model="dataBaseInfo.url" class="wi-400px mr-10px" placeholder="dataBaseUrl" />-->
<!--        </div>-->
<!--        <div class="rowSS">-->
<!--          <div>库名字：</div>-->
<!--          <el-input v-model="dataBaseInfo.dbName" class="wi-150px" placeholder="dbName" />-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="rowSS mt-20px">-->
<!--        <div class="rowSS">-->
<!--          <div>用户名：</div>-->
<!--          <el-input v-model="dataBaseInfo.name" class="wi-150px" placeholder="name" />-->
<!--        </div>-->
<!--        <div class="rowSS ml-20px mr-40px">-->
<!--          <div>密码：</div>-->
<!--          <el-input v-model="dataBaseInfo.password" class="wi-150px" placeholder="password" />-->
<!--        </div>-->
<!--        <el-button   type="primary" @click="searchDataBase">查询</el-button>-->
<!--      </div>-->
<!--    </FoldingCard>-->
<!--    <FoldingCard title="库和表选取">-->
<!--      &lt;!&ndash; 获取库和表信息 &ndash;&gt;-->
<!--      <div class="mt-20px mb-10px">请选择表(支持多表)</div>-->
<!--      <el-checkbox-group v-model="dbRadio">-->
<!--        <el-checkbox-->
<!--          v-for="(item, index) in dbData"-->
<!--          :key="index"-->
<!--          :label="item.tableName"-->
<!--          @change="dbRadioClick(item, dbRadio.includes(item.tableName))"-->
<!--        >-->
<!--          {{ item.tableName }}-->
<!--        </el-checkbox>-->
<!--      </el-checkbox-group>-->
<!--      <div class="mt-3 mb-1 rowSC">-->
<!--        <div>选中的表</div>-->
<!--        <el-button text type="danger" class="ml-1" @click="chooseDbArr=[]">清空</el-button></div>-->
<!--      <el-button-->
<!--        v-for="(item, index) in chooseDbArr"-->
<!--        :key="index"-->
<!--        type="primary"-->
<!--        text-->
<!--        @click="dbChooseRadioClick(item)"-->
<!--      >-->
<!--        {{ item.tableName }}({{ item.tableComment }})-->
<!--      </el-button>-->
<!--    </FoldingCard>-->
<!--    <FoldingCard title="表字段关系配置">-->
<!--      <div v-for="(item, index) in multiTableConfig" :key="index" class="rowSC">-->
<!--        <div class="mr-10px">{{ item.originTableName }}：</div>-->
<!--        <el-radio-group v-model="item.orgAssociationKey">-->
<!--          <el-radio-->
<!--              v-for="(pkaItem, pkaIndex) in item.priKeyArr"-->
<!--              :key="pkaIndex"-->
<!--              :label="pkaItem"-->
<!--              @click="pkaRadioClick(item, pkaItem)"-->
<!--          >-->
<!--            {{ pkaItem }}-->
<!--          </el-radio>-->
<!--        </el-radio-group>-->
<!--        <ElSvgIcon-->
<!--            class="ml-10px"-->
<!--            name="CircleClose"-->
<!--            :size="14"-->
<!--            style="cursor: pointer"-->
<!--            @click="deleteMultiTable(index)"-->
<!--        />-->
<!--      </div>-->
<!--    </FoldingCard>-->
<!--    <FoldingCard title="字段配置">-->
<!--      <div class="mb-10px rowSC">-->
<!--        <div>表字段（点击选择）</div>-->
<!--        <el-button text class="mr-10px" type="primary" @click="checkAllColumn">全选</el-button>-->
<!--      </div>-->
<!--      <div class="mt-1">-->
<!--        <el-button-->
<!--          v-for="(item, index) in tbData"-->
<!--          :key="index"-->
<!--          type="success"-->
<!--          text-->
<!--          :label="item"-->
<!--          @click="checkColumnClick(item)"-->
<!--        >-->
<!--          {{ item.columnName }}({{ item.columnComment }})-->
<!--        </el-button>-->

<!--        &lt;!&ndash; 选中的字段&ndash;&gt;-->
<!--        <div class="mt-30px mb-10px rowSC">-->
<!--          <span>选中的字段处理</span>-->
<!--          <el-button text type="danger" class="ml-1" @click="clearAllColumn">清空</el-button>-->
<!--        </div>-->
<!--        <div class="rowSC flex-wrap">-->
<!--          <div v-for="(item, index) in checkColumnArr" :key="index" class="rowSC mr-20px mt-10px mb-30px">-->
<!--            <span style="color: #e6a23c">{{ item.columnName }}({{ item.columnComment }})</span>-->
<!--            <ElSvgIcon name="CircleClose" :size="14" style="cursor: pointer" @click="deleteColumn(index)" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-if="checkColumnArr.length" class="mt-20px">-->
<!--          <el-button type="primary" @click="generatorToSearch">同步到查询</el-button>-->
<!--          <el-button type="primary" @click="generatorToTable">同步到表格</el-button>-->
<!--          <el-button type="primary" @click="generatorToForm">同步到表单</el-button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </FoldingCard>-->
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


    <DateAndFileExport ref="refDateAndFileExport"/>
<!--    <FoldingCard title="保存和生成模板">-->
<!--      <div class="mb-10px">保存当前配置</div>-->
<!--      <div class="rowSS mb-20px">-->
<!--        <el-input v-model="saveFileName" class="wi-200px mr-10px" placeholder="保存文件名(可以不填写)" />-->
<!--        <el-button type="primary" @click="saveTmp">保存</el-button>-->
<!--      </div>-->
<!--      <div>-->
<!--        <div class="mb-10px">选择模板文件</div>-->
<!--        <TemplateConfig ref="refTemplateConfig" />-->
<!--      </div>-->
<!--      <el-button type="primary" class="mt-20px" @click="generatorBaseModelTemp">生成文件</el-button>-->
<!--    </FoldingCard>-->
  </div>
</template>

<script setup lang="ts">
import {copyReactive} from "@/hooks/use-common";
import {
  changeDashToCase,
  changeDashToCaseAndFirstWord,
  changeTheFirstWordToCase,
  removeTbOrT,
  tbTypeMapping
} from "@/components/TableExtra/back-extra-code"
import DateAndFileExport from "@/components/common/DateAndFileExport.vue";
import BasicInfo from "@/components/common/BasicInfo.vue";
import DBColumn from "@/components/common/DBColumn.vue";
const { formRules } = useElement()
/*基础配置*/
const basicConfig = reactive({
  author: '',
  packageName: '',
  basicName: '',
  basicDesc: '',
  dateTime: ''
})
/*获取库和表信息*/
const dataBaseInfo=reactive({
  url:"159.75.144.202:3310",
  name:"root",
  password:"@Root123",
  dbName:"micro-service-single",
  tbName:"",
})
const dbData = ref([])
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

const chooseDbArr:any = ref([])
const chooseDbRadio = ref()
const dbRadio:any = ref([])
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
//保存当前点击的table信息
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

//表
const tbData = ref([])
const multiTableConfig:any = ref([])
const deleteMultiTable = (index) => {
  multiTableConfig.value.splice(index, 1)
}

//读取表中字段信息
const multiTableName = ref()
const multiTableDesc = ref()
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
          fItem.tableName = fItem.columnName
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
//多表关系配置
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
let checkColumnArr:any = ref([])
const refSearchTableConfig = ref()
const generatorToSearch = () => {
  refSearchTableConfig.value.setData(JSON.parse(JSON.stringify(checkColumnArr.value)))
}
const refListTableConfig = ref()
const generatorToTable = () => {
  refListTableConfig.value.setData(JSON.parse(JSON.stringify(checkColumnArr.value)))
}
const refFormTableConfig = ref()
const generatorToForm = () => {
  refFormTableConfig.value.setData(JSON.parse(JSON.stringify(checkColumnArr.value)))
}

//生成模板
const generatorSubData = () => {
  return new Promise((resolve) => {
    const searchTableConfig = refSearchTableConfig.value.getData()
    // const searchTableGroup = arrGroupByKey(searchTableConfig, 'tableName')
    const listTableConfig = refListTableConfig.value.getData()
    // const listTableGroup = arrGroupByKey(searchTableConfig, 'tableName')
    const formTableConfig = refFormTableConfig.value.getData()
    //取multiTableConfig第一项
    const multiTableFistItem:any= multiTableConfig.value[0]
    //设置dbTableConfig
    const dbTableConfig = {
      multiTableName: multiTableName.value,
      multiTableNameCase: changeTheFirstWordToCase( multiTableName.value),
      multiTableDesc:multiTableDesc.value,
      ...multiTableFistItem
    }
    //设置时间
    basicConfig.dateTime = getCurrentTime()
    const generatorData = {
      basicConfig,
      multiTableConfig:multiTableConfig.value,
      dbTableConfig,
      queryConfig: searchTableConfig,
      tableConfig: listTableConfig,
      formConfig: formTableConfig,

      //此处保存的数据主要用于回显
      dataBaseInfo,
      tbData:tbData.value,
      dbRadio:dbRadio.value,
      saveFileName:saveFileName.value,
      chooseDbRadio:chooseDbRadio.value,
      checkColumnArr:checkColumnArr.value,
      chooseDbArr:chooseDbArr.value,
      currentTableInfo:currentTableInfo.value,
      chooseTemplate: refTemplateConfig.value.returnData(),
    }
    resolve(generatorData)
  })
}

//保存模板
const saveFileName = ref('')
const pageName = 'mybatis-plus-basic'
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
  axiosReq(reqConfig).then(() => {
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

//回显数据
const reshowData = (fItem) => {
  const generatorConfig = JSON.parse(fItem.generatorConfig)
  refSearchTableConfig.value.reshowData(generatorConfig.queryConfig)
  refListTableConfig.value.reshowData(generatorConfig.tableConfig)
  refFormTableConfig.value.reshowData(generatorConfig.formConfig)
  dbRadio.value = generatorConfig.dbRadio
  chooseDbRadio.value = generatorConfig.chooseDbRadio
  checkColumnArr.value = generatorConfig.checkColumnArr
  chooseDbArr.value = generatorConfig.chooseDbArr
  saveFileName.value = generatorConfig.saveFileName
  tbData.value = generatorConfig.tbData
  copyReactive(basicConfig,generatorConfig.basicConfig)
  copyReactive(dataBaseInfo,generatorConfig.dataBaseInfo)
  multiTableConfig.value = generatorConfig.multiTableConfig
  currentTableInfo.value = generatorConfig.currentTableInfo

  //回显模板
  refTemplateConfig.value.reshowData(generatorConfig.chooseTemplate)

  //查询数据库数据
  if (dataBaseInfo.url) {
    searchDataBase()
  }
}

//生成基础模板
const refTemplateConfig = ref()
const generatorBaseModelTemp = async () => {
  const subData: any = await generatorSubData()
  const { id } = refTemplateConfig.value.returnData()
  const subFormData = new FormData()
  //获取edit里的数据
  subFormData.append('id', id)
  subFormData.append('jsonData', JSON.stringify(subData))
  subFormData.append('fileNamePre',  currentTableInfo.value.tableNameCase)
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
