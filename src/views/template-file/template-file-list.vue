<template>
  <div class="mt-10px query-page-style">
    <!--条件搜索-->
    <el-form ref="refSearchForm" :inline="true" :model="searchForm">
      <el-form-item prop="name">
        <el-input v-model="searchForm.name" class="w-150px" placeholder="文件存储名" />
      </el-form-item>
      <el-form-item>
        <!--查询按钮-->
        <el-button type="primary" @click="resetPageReq">查询</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="rowES mb-10px">
      <el-button type="primary" @click="addBtnClick">
        <el-icon style="vertical-align: middle">
          <FolderAdd />
        </el-icon>
        <span style="vertical-align: middle">增加</span>
      </el-button>
      <el-button type="primary" @click="multiDelBtnClick">
        <span style="vertical-align: middle">批量删除</span>
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
      <el-table-column type="selection" align="center" width="50" />
      <el-table-column show-overflow-tooltip align="center" prop="name" label="文件存储名" min-width="100" />
      <el-table-column show-overflow-tooltip align="center" prop="fileArr" label="文件数组" min-width="100" />
      <!--点击操作-->
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template #default="{ row }">
          <div class="table-operation-btn">
            <span @click="tableEditClick(row)">编辑</span>
            <!--            <span @click="tableDelClick(row)">删除</span>-->
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
  </div>
</template>
<script setup lang="ts">
import { Delete, FolderAdd } from '@element-plus/icons-vue'
import { useTable } from '@/hooks/use-table'
import { downLoadTempByApi } from '@/hooks/use-common'

const searchForm = reactive({
  name: ''
})
const selectPageReq = () => {
  const reqConfig = {
    url: '/basis-func/templateFile/selectPage',
    method: 'get'
  }
  tableListReq(reqConfig).then(({ data }) => {
    tableListData.value = data.records
    totalPage.value = data.total
  })
}
//重置
const refSearchForm = $ref(null)
const resetForm = () => {
  refSearchForm.resetFields()
  dateRangePacking(['', ''])
  resetPageReq()
}

//批量删除
const multiDelBtnClick = () => {
  const reqConfig = {
    url: '/basis-func/templateFile/deleteBatchIds',
    method: 'delete',
    bfLoading: true
  }
  multiDelBtnDill(reqConfig)
}

//单个删除
const tableDelClick = (row) => {
  const reqConfig = {
    url: '/basis-func/templateFile/deleteById',
    data: { id: row.id },
    isParams: true,
    method: 'delete',
    bfLoading: true
  }
  tableDelDill(row, reqConfig)
}

const addBtnClick = () => {
  routerPush('TemplateFileAddEdit')
}
const tableEditClick = (row) => {
  routerPush('TemplateFileAddEdit', { isEdit: true, row })
}
const tableDetailClick = (row) => {
  routerPush('TemplateFileDetail', { isDetail: true, row })
}
onMounted(() => {
  selectPageReq()
})

const downLoadTemplateFile = ({ id }) => {
  const reqConfig = {
    url: '/basis-func/templateFile/downZipByTemplateFileId',
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
