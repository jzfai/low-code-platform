<template>
  <div class="input-code-style">
    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :autofocus="true"
      style="height: 100%"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
    />
  </div>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

const code = ref(`欢迎来到低代码调试平台，请选择相应的文件进行调试`)
const extensions = [javascript(), oneDark]
// Codemirror EditorView instance ref
const view = shallowRef()
const setCode = (inputCode) => {
  code.value=[]
  code.value = inputCode
}
defineExpose({setCode,code})
</script>

<style lang="scss" scoped>
.input-code-style {
  //width: 400px;
  width:  calc(50% - 40px);
  height: calc(90vh - #{var(--nav-bar-height)} - #{var(--tag-view-height)});
}
</style>
