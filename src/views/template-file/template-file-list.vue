<template>
  <div class="query-page-style scroll-y">
    <!--条件搜索-->
    <el-form ref="refSearchForm" :inline="true" :model="searchForm">
      <el-form-item prop="name" label="项目名">
        <el-input v-model="searchForm.name" class="w-150px" placeholder="项目名" />
      </el-form-item>

      <el-form-item label="项目类型" prop="projectType">
        <el-select v-model="searchForm.projectType" placeholder="请选择项目类型"  class="wi-250px">
          <el-option :key="1"  label="前端项目" :value="1"/>
          <el-option :key="2"  label="基础层" :value="2"/>
          <el-option :key="3"  label="应用层" :value="3"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!--查询按钮-->
        <el-button type="primary" @click="resetPageReq">查询</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="rowES mb-10px">
      <el-button type="primary" @click="addBtnClick">
        <span style="vertical-align: middle">增加</span>
      </el-button>

      <el-button type="primary" @click="handleImport">
        <span style="vertical-align: middle">导入模板</span>
      </el-button>
    </div>
    <!--表格和分页-->
    <el-table
      id="resetElementDialog"
      ref="refuserTable"
      :height="`calc(100vh - 260px)`"
      border
      :data="tableListData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column  align="center" prop="id" label="id" width="60" />
      <el-table-column show-overflow-tooltip align="center" prop="name" label="项目名" min-width="120" />
      <el-table-column align="center" prop="projectType" label="项目类型" width="80">
        <template #default="{ row }">
          <span v-if="row.projectType===1">前端项目</span>
          <span v-if="row.projectType===2">基础层</span>
          <span v-if="row.projectType===3">应用层</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="originPackage" label="基础包名" min-width="120" />

      <el-table-column align="center" prop="modelList" label="模块列表" width="200">
        <template #default="{ row }">
          <span  type="primary"  class="mb-10px">{{row.modelList}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="baseLayerInfo" label="关联基础层" width="120">
        <template #default="{ row }">
          <span v-if="row.baseLayerInfo"  type="primary"  class="mb-10px">{{JSON.parse(row.baseLayerInfo).name}}</span>
          <span v-else   class="mb-10px">-</span>
        </template>
      </el-table-column>


      <el-table-column align="center" prop="fileArr" label="文件列表" width="80">
        <template #default="{ row }">
          <span  type="primary"  class="mb-10px btn-click-style" @click="lookFileList(row)">查看</span>
        </template>
      </el-table-column>


      <el-table-column align="center" prop="createBy" label="创建人" width="120" />
      <el-table-column align="center" prop="updateBy" label="更新人" width="120" />
      <!--点击操作-->
      <el-table-column fixed="right" align="center" label="操作" width="170">
        <template #default="{ row }">
          <div class="table-operation-btn">
            <span @click="tableEditClick(row)">编辑</span>
            <span @click="tableDelClick(row)">删除</span>
            <span @click="copyProject(row)">复制</span>
            <span @click="downLoadTemplateFile(row)">下载</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div v-if="totalPage >= 10" class="rowCC mt-20px">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Import ref="refExport" @getList="selectPageReq" />
  </div>
</template>
<script setup>
import Import from "./Import.vue";
import { useTable } from '@/hooks/use-table'
import { downLoadTempByApi } from '@/hooks/use-common'
import {routerPush} from "@/hooks/use-self-router.ts";
//跳转到列表详情页
const lookFileList = (row) => {
  routerPush("templateFileDetail",row)
}
const searchForm = reactive({
  name: '',
  projectType: ''
})
const selectPageReq = () => {
  const reqConfig = {
    url: '/generator/templateFile/listPage',
    method: 'get'
  }
  tableListReq(reqConfig).then(({ data,total }) => {
    tableListData.value = data
    totalPage.value =total
  })
}

const copyProject=({id})=>{
  axiosReq({
    url: '/generator/templateFile/copyProject',
    params: {modelId:id},
    method: 'post',
    bfLoading: false,
    isUploadFile: true
  }).then((res) => {
    resetPageReq()
  })
}

//导入
const refExport = ref(null)
const handleImport = () => {
  refExport.value.showModal()
}
//重置
const refSearchForm = ref()
const resetForm = () => {
  refSearchForm.value.resetFields()
  dateRangePacking(['', ''])
  resetPageReq()
}

//单个删除
const tableDelClick = (row) => {
  const reqConfig = {
    url: `/generator/templateFile/deleteById/${row.id}`,
    isParams: true,
    method: 'delete',
    bfLoading: true
  }
  tableDelDill(row, reqConfig)
}

const addBtnClick = () => {
  routerPush('TemplateFileAddEdit',{ isEdit: false})
}
const tableEditClick = ({id}) => {
  routerPush('TemplateFileAddEdit', { isEdit: true, id})
}
onMounted(() => {
  selectPageReq()
})

const downLoadTemplateFile = ({ id }) => {
  const reqConfig = {
    url: '/generator/templateFile/downZipByTemplateFileId',
    method: 'post',
    isNotTipErrorMsg: true,
    params: { id }
  }
  downLoadTempByApi(reqConfig)
}

//引入table-query相关的hooks 方法
let {
  pageNum,
  pageSize,
  totalPage,
  tableListData,
  tableListReq,
  dateRangePacking,
  handleSelectionChange,
  handleCurrentChange,
  handleSizeChange,
  resetPageReq,
  multiDelBtnDill,
  tableDelDill
} = useTable(searchForm, selectPageReq)
</script>
