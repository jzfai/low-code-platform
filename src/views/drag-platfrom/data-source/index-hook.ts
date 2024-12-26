import { ElMessage } from 'element-plus'
import { deleteReq, exportReq } from '@/api/dataSource'
import { downLoadTemp } from '@/hooks/use-common'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const dataSourceList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref()
const refElTable = ref()
const refExport = ref()
export const handleImport = () => {
  refExport.value.showModal()
}
const tableHeadColumns = ref([
  { prop: 'dictName', label: '字典名称', minWidth: 200, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'name', label: '字典描述', minWidth: 200, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'platName', label: '平台名称', minWidth: 200, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'dataSource', label: '数据源', minWidth: 200, isTemplate: false, align: 'center', showColumn: true }
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.id)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}
export const colChange = (heardColsArr) => {
  tableHeadColumns.value = heardColsArr
}

export const handleAdd = () => {
  refAddEditModal.value.showModal({})
}

export const removeEmptyKey = (data) => {
  return Object.keys(data)
    .filter((key) => data[key] !== null && data[key] !== undefined && data[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
}

watch(
  () => tableHeadColumns,
  () => {
    if (refElTable) {
      nextTick(refElTable.value.doLayout)
    }
  },
  { deep: true }
)

export const currentHook = (queryParams, getList) => {
  //导出
  const handleExport = () => {
    exportReq(queryParams).then((res) => {
      downLoadTemp(res)
    })
  }
  const handleDelete = (row) => {
    const dataSourceIds = row.id || ids.value
    elConfirm('确认', `是否确认删除用户编号为"${dataSourceIds}"的数据项`)
      .then(() => {
        return deleteReq(dataSourceIds)
      })
      .then(() => {
        ElMessage({ message: '删除成功', type: 'success' })
        getList()
      })
  }
  return {
    refAddEditModal,
    handleDelete,
    refElTable,
    refExport,
    multiple,
    ids,
    single,
    totalNum,
    loading,
    dataSourceList,
    showSearch,
    tableHeadColumns,
    handleExport
  }
}
