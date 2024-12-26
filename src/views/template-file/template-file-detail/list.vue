<template>
  <div class="p-10px">
    <el-form v-show="showSearch" :model="queryParams" :inline="true" label-width="100px">
      <el-form-item label="模板文件名" prop="name" label-width="80px">
        <el-input
            v-model.trim="queryParams.name"
            placeholder="请输入模板文件名"
            clearable
            class="wi-150px"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模块名" prop="modelName" >
        <el-input
            v-model.trim="queryParams.modelName"
            placeholder="请输入模块名"
            clearable
            class="wi-150px"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目名" prop="templateName">
        <el-input
            v-model.trim="queryParams.templateName"
            disabled
            placeholder="项目名"
            clearable
            class="wi-150px"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8 ">
      <el-button type="primary" class="ml2"  plain icon="Plus" @click="handleAdd(queryParams)">新增</el-button>
      <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete">删除</el-button>
      <RightToolBar v-model:showSearch="showSearch" @queryTable="getList"/>
      <ColumnFilter
          v-if="templateFileDetailList.length" :is-operation="true" :cols="tableHeadColumns"
          @colChange="colChange"/>
    </el-row>
    <el-table
        ref="refElTable" v-loading="loading" border :data="templateFileDetailList"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"/>
      <!--column头字段-->
      <template v-for="item in tableHeadColumns">
        <el-table-column
            v-if="!item.isTemplate && item.showColumn"
            :key="item.prop"
            show-overflow-tooltip
            v-bind="item"
            :align="item.align || 'center'"
            :prop="item.prop"
            :label="item.label"
        />
        <!--文件名-->
        <el-table-column
            v-if="item.prop === 'name'&&!item.isNotShowCol" :key="item.prop" v-bind="item" align="center"
            :prop="item.prop"
            :label="item.label">
          <template #default="{ row }">
            <el-button @click="changeFileFunc(row)">{{ row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
            v-if="item.prop === 'modelType'&&!item.isNotShowCol" :key="item.prop" v-bind="item" align="center"
            :prop="item.prop"
            :label="item.label">
          <template #default="{ row }">
             <span v-if="row.modelType===1">项目</span>
             <span v-if="row.modelType===2">模块</span>
             <span v-if="row.modelType===3">包</span>
             <span v-if="row.modelType===4">配置文件</span>
             <span v-if="row.modelType===5">通用文件</span>
          </template>
        </el-table-column>
        <el-table-column
            v-if="item.prop === 'status'&&!item.isNotShowCol" :key="item.prop" v-bind="item" align="center"
            :prop="item.prop"
            :label="item.label">
          <template #default="{ row }">
            <span v-if="row.status===1" style="color: green">生效</span>
            <span v-if="row.status===0">未生效</span>
          </template>
        </el-table-column>
        <el-table-column
            v-if="item.prop === 'modelName'&&!item.isNotShowCol" :key="item.prop" v-bind="item" align="center"
            :prop="item.prop"
            :label="item.label">
          <template #default="{ row }">
            <span>{{ ![1,5].includes(row.modelType)?row.modelName:'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            v-if="item.prop === 'resourceType'&&!item.isNotShowCol" :key="item.prop" v-bind="item" align="center"
            :prop="item.prop"
            :label="item.label">
          <template #default="{ row }">
            <div v-if="[3,4].includes(row.modelType)">
              <span v-if="row.resourceType===1">main</span>
              <span v-if="row.resourceType===2">test</span>
              <span v-if="row.resourceType===3">resource</span>
            </div>
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column
            v-if="item.prop === 'packageSuffix'&&!item.isNotShowCol" :key="item.prop" v-bind="item" align="center"
            :prop="item.prop"
            :label="item.label">
          <template #default="{ row }">
            <span >{{ [3,4].includes(row.modelType)?row.packageSuffix:'-' }}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template #default="{row}">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" size="large" @click="handleUpdate(row)"/>
          </el-tooltip>
          <el-tooltip content="复制" placement="top">
            <el-button link type="primary" icon="CopyDocument" size="large" @click="handleCopy(row)"/>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" size="large" @click="handleDelete(row)"/>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="columnSE">
      <Pagination
          v-show="totalNum > 10"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          :total="totalNum"
          @pagination="getList"
      />
    </div>
    <AddEditModal ref="refAddEditModal" @getList="getList"/>
    <TemplateEdit ref="refTemplateEdit" @getList="getList" />
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue"
import TemplateEdit from './TemplateEdit.vue'
import AddEditModal from "./AddEditModal.vue"
import {colChange, currentHook, handleAdd, handleSelectionChange, removeEmptyKey} from './index-hook'
import {copyFileByFileId, listReq} from '@/api/templateFileDetail'
//导入当前页面封装方法
import RightToolBar from '@/components/RightToolBar.vue'
import ColumnFilter from '@/components/ColumnFilter.vue'
///导入当前页面封装方法
import {resetData} from '@/hooks/use-common'
import {getQueryParam} from "@/hooks/use-self-router.ts";
/*查询模块*/
const queryParams = reactive({
  pageNum: 1,
  pageSize: 50,
  name: "",//模板文件名
  modelType: "",//文件类型
  modelName: "",//模块名或包名
  templateId: 55,//项目id
  templateName: "",//项目名
})
//备份数据
const bakQueryParams = JSON.stringify(queryParams)
const dateRange = ref([])
//查询
const handleQuery = () => {
  queryParams.pageNum = 1
  getList(queryParams)
}

const refTemplateEdit = ref();
const changeFileFunc = (row) => {
  const paramsData=Object.assign(row,{modelId: queryParams.templateId,fileName:row.name,fileId:row.id})
  refTemplateEdit.value.showModal(JSON.parse(JSON.stringify(paramsData)))
}

//重置
const resetQuery = () => {
  resetData(queryParams, bakQueryParams)
  dateRange.value = []
  handleQuery()
}
const handleUpdate = (row) => {
  const id = row.id || ids.value[0]
  refAddEditModal.value.showModal({id,...queryParams})
}
//复制文件
const handleCopy=(row)=>{
  copyFileByFileId({id:row.id}).then(()=>{
    handleQuery()
  })
}

const getList = () => {
  loading.value = true
  if (dateRange.value?.length) {
    queryParams.beginTime = dateRange.value.at(-2)
    queryParams.endTime = dateRange.value.at(-1)
  } else {
    queryParams.beginTime = ""
    queryParams.endTime = ""
  }
  listReq(removeEmptyKey(queryParams)).then(({data, total}) => {
    loading.value = false
    templateFileDetailList.value = data
    totalNum.value = total
  })
}
onMounted(() => {
  //取项目id
  const {id,modelList,name} = getQueryParam()
  if (id) {
    queryParams.templateId = id
    queryParams.templateName = name
    queryParams.modelList = modelList
  }
  handleQuery()
})

//字典数据
// eslint-disable-next-line camelcase

const {
  refAddEditModal,
  refElTable,
  single,
  multiple,
  ids,
  totalNum,
  loading,
  templateFileDetailList,
  showSearch,
  tableHeadColumns,
  handleDelete
} = currentHook(queryParams, getList)

</script>
