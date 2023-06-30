<template>
  <div class="scroll-y">
    <h2 class="mb-10px">一个能为企业真正提效的低代码平台</h2>
    <div>具备的特点：开发周期短，简单，高效，代码无嵌入性</div>

    <div class="mt-40px mb-10px">
      <a class="btn-click-style font-bold" href="https://gitee.com/jzfai/low-generator-doc.git">
        详细介绍文档
      </a>
    </div>

    <h2 class="mb-10px mt-40px">目前提供了两个平台的模板</h2>
    <div>vue3-admin-plus(vue3-admin系列的都能使用)</div>
    <div>micro-admin-single（单表和多表增删改查生成模板）</div>

    <div class="mt-20px">如何你感兴趣也可以一参与参与<a class="btn-click-style font-bold" href="https://github.jzfai.top/low-code-platform/#/template-file/template-file-list">
      模板开发
    </a></div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import {useConfigStore} from '@/store/config'

const {setTheme, theme, setSize, size, setLanguage} = useConfigStore()
const route = useRoute()
const changeLanguage = (langParam) => {
  setLanguage(langParam, route.meta?.title)
}
const count = ref(0)
const showObj = ref(GLOBAL_VAR)

// 测试swagger文档
// import {dillSwaggerByParams, dillSwaggerToUse} from "@/hooks/use-swagger-analysis"
// 财务接口文档
//const settleApi="/settle-api?group=%E8%B4%A2%E5%8A%A1%E7%BB%93%E7%AE%97%E4%B8%AD%E5%BF%83"
// 运营通文档
// const  operatorApi="/operator-api?group=app%E5%AD%97%E5%85%B8%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3"
// const  operatorApi="/operator-api?group=基础服务模块接口文档"
// const inputPath="/system/role/list"
// const inputMethod:any="get"
// axios.get(operatorApi).then(({data}) => {
//   console.log(dillSwaggerToUse(data));
//   console.log(dillSwaggerByParams(data,"/api/v1.0/vehTaxiCompany/details/{taxiCompanyId}","get"));
// })

</script>
