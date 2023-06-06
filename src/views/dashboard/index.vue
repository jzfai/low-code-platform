<template>
  <div class="scroll-y">
    <h2 class="mb-10px">一个能为企业真正提效的低代码平台</h2>
    <div>具备的特点：开发周期短，简单，高效，代码无嵌入性</div>

    <div class="mt-40px mb-10px">
      <a class="btn-click-style font-bold" href="https://github.com/jzfai/micro-service-single.git">
        详细介绍文档
      </a>
    </div>

    <h2 class="mb-10px mt-40px">目前提供了两个平台的模板</h2>
    <div>vue3-admin-plus(vue3-admin系列的都能使用)</div>
    <div>micro-admin-single（单表和多表增删改查生成模板）</div>

    <div class="mt-20px">如何你感兴趣也可以一参与参与<a class="btn-click-style font-bold" href="https://github.com/jzfai/micro-service-single.git">
      模板开发
    </a></div>
  </div>
</template>
<script setup lang="ts">
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

</script>
