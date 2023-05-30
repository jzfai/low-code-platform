<template>
  <div class="scroll-y">
    <div v-lang class="mt-10px mb-10px font-bold">switch theme</div>
    <el-button @click="setTheme('base-theme')">base-theme(default)</el-button>
    <el-button @click="setTheme('lighting-theme')">lighting-theme</el-button>
    <el-button @click="setTheme('china-red')">china-red(default)</el-button>
    <el-button @click="setTheme('dark')">dark-theme</el-button>

    <div v-lang class="mt-10px mb-10px font-bold">switch size</div>
    <el-button @click="setSize('large')">large</el-button>
    <el-button @click="setSize('default')">default</el-button>
    <el-button @click="setSize('small')">small</el-button>

    <div v-lang class="mt-10px mb-10px font-bold">switch language</div>
    <el-button @click="changeLanguage('en')">en</el-button>
    <el-button @click="changeLanguage('zh')">zh</el-button>

    <!--example definitions -->
    <div v-lang class="mb-10px font-bold mt-20px">Button Group</div>
    <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
    <el-button type="success" @click="count++">count is: {{ count }}</el-button>
    <el-button type="warning" @click="count++">count is: {{ count }}</el-button>
    <el-button type="danger" @click="count++">count is: {{ count }}</el-button>
    <el-button type="info" @click="count++">count is: {{ count }}</el-button>

    <div v-lang class="mt-30px font-bold mb-10px">unocss using</div>
    <div class="mb-40px w-900px h-10px text-16px">
      <div>
        you can look
        <el-link class="text-red" href="https://uno.antfu.me/" target="_blank">https://uno.antfu.me/</el-link>
        to search you need such as "margin-left:10px" and then get the sortcut(ml-10px)
      </div>
    </div>

    <div v-lang class="mt-30px font-bold mb-10px">global var</div>
    {{ showObj }}
  </div>
</template>
<script setup lang="ts">
import {dillSwagger3ToUse, dillSwaggerToUse} from "@/hooks/use-swagger-analysis";
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


import axios from "axios";
axios.get(" https://github.jzfai.top/v3/api-docs/system").then(({data})=>{
  console.log(dillSwagger3ToUse(data));
})
//财务接口文档
const settleApi="/settle-api?group=%E8%B4%A2%E5%8A%A1%E7%BB%93%E7%AE%97%E4%B8%AD%E5%BF%83"
//运营通文档
//const  operatorApi="/operator-api?group=app%E5%AD%97%E5%85%B8%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3"
const  operatorApi="/operator-api?group=基础服务模块接口文档"

let inputPath="/system/role/list"
let inputMethod:any="get"

axios.get(operatorApi).then(({data}) => {
  console.log(dillSwaggerToUse(data));
})


//获取schema

</script>
