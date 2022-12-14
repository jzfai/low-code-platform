<template>
  <div>
    page test TestTableQuery.vue
    <div>
      <el-button @click="jumpPage('TestDetail')">toTestDetail.vue</el-button>
      <el-button @click="jumpPage('TestAddEdit')">TestAddEdit.vue</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const jumpPage = (name) => {
  routerPush(name)
}
</script>

<style scoped lang="scss"></style>
