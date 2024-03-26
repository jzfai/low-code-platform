<template>
  <div class="scroll-y pt-20px pl-20px">
    <Test ref="refTest" :parent-arr="arr"/>
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
import  Test from "./Test.vue"
import { useConfigStore } from '@/store/config'
import { dillSwagger3ByParams, dillSwagger3ToUse } from '@/hooks/use-swagger-analysis'

const { theme, size } = useConfigStore()
const route = useRoute()


const arr = [{name: "123", age : 123}, {name:"1234432", age : 1234324}, {name:"1234432", age : 1234324}]

const filterObj={}
arr.forEach(f=>{
  if(!filterObj[f.name]){
    filterObj[f.name]=f.name
  }else{
    console.log(`${filterObj[f.name]}重复了`)
  }
})

const testFunc=()=>{
  console.log("我是父元素函数")
}

defineExpose({ arr,testFunc });
</script>
