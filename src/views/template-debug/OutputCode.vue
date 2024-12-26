<template>
  <div className="input-code-style">
    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :autofocus="true"
      style="height: 100%"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @change="log('change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'

const code = ref()
const extensions = [javascript()]

// Codemirror EditorView instance ref
const view = shallowRef()

const setCode = (inputCode) => {
  code.value=[]
  code.value = inputCode
}
defineExpose({ setCode })
</script>

<style lang="scss" scoped>
.input-code-style {
  //width: 400px;
  width:  calc(50% - 40px);
  height: calc(90vh - #{var(--nav-bar-height)} - #{var(--tag-view-height)})
}
</style>
