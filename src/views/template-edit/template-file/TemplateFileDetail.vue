<template>
  <div class="project-page-style">
    <FoldingCard ref="baseInfo" title="详情" class="mb12">
      <div class="mt-24px">
        <div class="detail-item">
          <span class="w-100px">文件存储名:</span>
          <output>{{ detailData.name }}</output>
        </div>
        <div class="detail-item">
          <span class="w-100px">文件数组:</span>
          <output>{{ detailData.fileArr }}</output>
        </div>
      </div>
      <div class="mt-24px"></div>
    </FoldingCard>
  </div>
</template>

<script setup lang="ts">
const { getQueryParam, routerBack } = useVueRouter()
/*回显数据*/
let tableData = $ref([])
let detailData = $ref({})
const { isDetail, row } = getQueryParam()
if (isDetail) {
  onBeforeMount(async () => {
    const { data } = await getDetailByIdReq(row.id)
    detailData = data
  })
}
const getDetailByIdReq = (id) => {
  return axiosReq({
    url: '/basis-func/templateFile/selectById',
    data: { id },
    method: 'get'
  })
}
</script>

<style lang="scss" scoped>
.detail-row-container:not(:last-child) {
  margin-right: 76px;
}

.detail-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 18px;
  color: #595959;
}

.detail-item > span {
  display: inline-block;
}
</style>
