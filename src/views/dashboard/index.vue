<template>
  <div class="scroll-y pt-20px pl-20px">
    <h2 class="mb-10px">一个能为企业真正提效的低代码平台</h2>
    <div>具备的特点：开发周期短，简单，高效，代码无嵌入性</div>

    <div class="mt-40px mb-10px">
      <a class="btn-click-style font-bold" href="https://gitee.com/jzfai/low-generator-doc.git">详细介绍文档</a>
    </div>

    <h2 class="mb-10px mt-40px">目前提供了两个平台的模板</h2>
    <div>vue3-admin-plus(vue3-admin系列的都能使用)</div>
    <div>micro-admin-single（单表和多表增删改查生成模板）</div>

    <div class="mt-20px">
      如何你感兴趣也可以一参与参与
      <a
        class="btn-click-style font-bold"
        href="https://github.jzfai.top/low-code-platform/#/template-file/template-file-list"
      >
        模板开发
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useConfigStore } from '@/store/config'
import { dillSwagger3ByParams, dillSwagger3ToUse } from '@/hooks/use-swagger-analysis'

const { theme, size } = useConfigStore()
const route = useRoute()

onMounted(() => {
  const swaggerApi = ref('https://github.jzfai.top/v3/api-docs/common')
  let swaggerData
  axios.get(swaggerApi.value).then(({ data }) => {
    if (swaggerApi.value.includes('v3/api-docs')) {
      swaggerData = dillSwagger3ToUse(data)
      console.log(swaggerData)
    } else {
      //swaggerData = dillSwaggerByParams(data)
    }
    // const { requestBody, responses } = swaggerData
  })
})

const getTableAs = (tableName) => {
  if (!tableName.startsWith('t') || !tableName.startsWith('sys')) {
    return
  }
  const replaceString = tableName.replace(/^tb_/, '').replace(/^t_/, '').replace('sys_', '')
  if (replaceString.includes('_')) {
    const strings = replaceString.split('_')
    return strings[0].charAt(0) + strings[1].charAt(0)
  } else {
    return replaceString.charAt(0) + replaceString.charAt(replaceString.length - 1)
  }
}
</script>
