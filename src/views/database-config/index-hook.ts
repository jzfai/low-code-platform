
const totalNum = ref(0)
const loading = ref(false)
const databaseConfigList = ref([])
const showSearch = ref(true)
const refElTable = ref()


const tableHeadColumns = ref([
  { prop: "name", label: "数据库名", minWidth: 100,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "userName", label: "用户名", minWidth: 80,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "type", label: "数据库类型", minWidth: 80,isTemplate:true, align: 'center', showColumn: true  },
  { prop: "url", label: "地址", minWidth: 100,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "remark", label: "备注", minWidth: 100,isTemplate:false, align: 'center', showColumn: true  },
])


export const colChange = (heardColsArr) => {
  tableHeadColumns.value = heardColsArr
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
//queryParams, getList
export const currentHook = () => {
  return {
    refElTable,
    totalNum,
    loading,
    databaseConfigList,
    showSearch,
    tableHeadColumns,
  }
}
