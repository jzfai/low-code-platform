/* 表格拖拽排序 */
import Sortable from 'sortablejs'
export const rowDrop = (tableData, tableClass: string) => {
  // 获取到element-ui封装的表格标签
  const tbody: any = document.querySelector(`.${tableClass} tbody`)
  Sortable.create(tbody, {
    animation: 180,
    delay: 0,
    onEnd({ newIndex, oldIndex }) {
      const currRow = tableData.value.splice(oldIndex, 1)[0]
      tableData.value.splice(newIndex, 0, currRow)
    }
  })
}
