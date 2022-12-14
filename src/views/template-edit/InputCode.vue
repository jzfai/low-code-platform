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
      @change="log('change', $event)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

export default defineComponent({
  components: {
    Codemirror
  },
  setup() {
    const code = ref(`console.log('Hello, world!')`)
    const extensions = [javascript(), oneDark]

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }

    // Status is available at all times via Codemirror EditorView
    const getCodemirrorStates = () => {
      const state = view.value.state
      const ranges = state.selection.ranges
      const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
      const cursor = ranges[0].anchor
      const length = state.doc.length
      const lines = state.doc.lines
      // more state info ...
      // return ...
    }
    const setCode = (inputCode) => {
      code.value = inputCode
    }

    return {
      code,
      extensions,
      handleReady,
      log: console.log,
      setCode
    }
  }
})
</script>

<style lang="scss" scoped>
.input-code-style {
  //width: 400px;
  width: 50%;
  height: calc(90vh - #{var(--nav-bar-height)} - #{var(--tag-view-height)});
}
</style>
