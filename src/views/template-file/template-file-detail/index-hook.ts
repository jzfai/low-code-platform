import { ElMessage } from 'element-plus'
import { deleteReq} from '@/api/templateFileDetail'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const templateFileDetailList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref()
const refElTable = ref()
const tableHeadColumns = ref([
  { prop: "id", label: "id", minWidth: 50,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "name", label: "文件名", minWidth: 100,isTemplate:true, align: 'center', showColumn: true  },
  { prop: "remark", label: "备注", minWidth: 100,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "modelType", label: "所属模块", minWidth: 60,isTemplate:true, align: 'center', showColumn: true  },
  { prop: "modelName", label: "模块名", minWidth: 100,isTemplate:false, align: 'center', showColumn: false  },
  { prop: "resourceType", label: "源类型", minWidth: 50,isTemplate:false, align: 'center', showColumn: false  },
  { prop: "fileNamePre", label: "文件名前缀", minWidth: 80,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "status", label: "是否生效", minWidth: 80,isTemplate:true, align: 'center', showColumn: true  },
  { prop: "packageSuffix", label: "目录", minWidth: 50,isTemplate:false, align: 'center', showColumn: false  },
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.id)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}
export const colChange = (heardColsArr) => {
  tableHeadColumns.value = heardColsArr
}

export const handleAdd = ({templateId,modelList}) => {
  refAddEditModal.value.showModal({templateId,modelList})
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
  const handleDelete = (row) => {
    const templateFileDetailIds = row.id || ids.value
    elConfirm('确认',`是否确认删除用户编号为"${templateFileDetailIds}"的数据项`)
      .then(() => {
        return deleteReq(templateFileDetailIds)
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
    multiple,
    ids,
    single,
    totalNum,
    loading,
    templateFileDetailList,
    showSearch,
    tableHeadColumns,
  }
}
