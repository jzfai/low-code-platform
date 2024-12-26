<template>
  <div class="p-10px">
    <el-form v-show="showSearch" :model="queryParams" :inline="true" label-width="65px">
      <el-form-item label="数据库名" prop="name">
        <el-input
            v-model.trim="queryParams.name"
            placeholder="请输入数据库名"
            clearable
            class="wi-300px"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="rowSS mb-15px">
      <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      <el-button type="danger" plain icon="Delete"  @click="handleMultiDelete">删除</el-button>
      <el-button type="warning" plain icon="Download" @click="handleExport">导出</el-button>
      <RightToolBar v-model:showSearch="showSearch" @queryTable="getList"/>
    </div>
    <el-table ref="refElTable" v-loading="loading" border :data="databaseConfigList">
      <el-table-column type="selection" width="50" align="center"/>
      <!--column头字段-->
      <el-table-column align="center" minWidth="60" show-overflow-tooltip  prop="id"   label="id"/>
      <el-table-column align="center" minWidth="120" show-overflow-tooltip  prop="name"   label="数据库名"/>
      <el-table-column align="center" minWidth="120" show-overflow-tooltip  prop="url"   label="地址"/>
      <el-table-column align="center" minWidth="80" show-overflow-tooltip  prop="password"   label="密码"/>
      <el-table-column align="center" show-overflow-tooltip minWidth="80 "  prop="type"   label="数据库类型">
        <template #default="{ row }">
          <span v-if="row.type==1">mysql</span>
          <span v-if="row.type==2">mongo</span>
          <span v-if="row.type==3">starrocks</span>
          <span v-if="row.type==4">clickhouse</span>
        </template>
      </el-table-column>
      <el-table-column align="center" minWidth="60" show-overflow-tooltip  prop="userName"   label="用户名"/>
      <el-table-column align="center" minWidth="120" show-overflow-tooltip  prop="remark"   label="备注"/>
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
        <template #default="{row}">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" size="large" @click="handleUpdate(row)"/>
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
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import { colChange, currentHook, removeEmptyKey } from './index-hook'
import  AddEditModal from "./AddEditModal.vue"

import {deleteReq, listReq, multiDeleteReq} from '@/api/databaseConfig'
//import {useDict} from '@/hooks/use-dict'

///导入当前页面封装方法
import { resetData } from '@/hooks/use-common'

//导入当前页面封装方法
import RightToolBar from '@/components/RightToolBar.vue'
/**********ref和reactive***********/
const totalNum = ref(0);
const loading = ref(false);
const databaseConfigList = ref([]);
const showSearch = ref(true);
const refAddEditModal = ref()
/*查询模块*/
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  name:"",//数据库名
})
//备份数据
const bakQueryParams = JSON.stringify(queryParams)
const dateRange = ref([])

/**********onMounted***********/
onMounted(() => {
  handleQuery()
})

/**********methods***********/
    //查询
const handleQuery = () => {
      queryParams.pageNum = 1
      getList(queryParams)
    }
//重置
const resetQuery = () => {
  resetData(queryParams, bakQueryParams)
  dateRange.value = []
  handleQuery()
}
//新增和编辑
const handleAdd = () => {
  refAddEditModal.value.showModal({})
}

const handleUpdate = ({id}) => {
  refAddEditModal.value.showModal({id})
}

//多个删除
const handleMultiDelete = () => {
  const rows = refElTable.value.getSelectionRows()
  if(rows.length===0){
    ElMessage({ message: '请先勾选要删除项', type: 'warning' })
    return
  }
  const ids=rows.map(m=>m.id)
  elConfirm('确认',`是否确认删除为"${ids}"的数据项`)
      .then(() => {
        multiDeleteReq(ids).then(()=>{
          ElMessage({ message: '删除成功', type: 'success' })
          getList()
        })
      })

}

//单个删除
const handleDelete = ({id}) => {
  elConfirm('确认',`是否确认删除为"${id}"的数据项`)
      .then(() => {
        deleteReq(id).then(()=>{
          ElMessage({ message: '删除成功', type: 'success' })
          getList()
        })
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
    databaseConfigList.value = data
    totalNum.value = total
  })
}

//字典数据
//eslint-disable-next-line camelcase
/*
const {
} = useDict(
)
*/

</script>
