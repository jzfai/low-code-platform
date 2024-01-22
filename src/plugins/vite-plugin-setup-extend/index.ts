import { parse } from '@vue/compiler-sfc'
import { render } from 'ejs'
import type { Plugin } from 'vite'
export default ({ inject }): Plugin => {
  // let viteConfig
  return {
    name: 'vite-plugin-setup-extend',
    enforce: 'pre',
    // configResolved(resolvedConfig) {
    //   viteConfig = resolvedConfig
    // },
    async transformIndexHtml(html) {
      return  render(html, { ...inject })
    },
    transform(code, id) {
      if (/\.vue$/.test(id)) {
        const { descriptor } = parse(code)
        if (!descriptor?.scriptSetup?.setup) {
          return null
        }
        const attrs=descriptor.scriptSetup?.attrs
        //（setup）注入代码
        if (Object.keys(attrs).includes("injectCode")) {
          const lastIndex=code.lastIndexOf("</script>")
          code =code.slice(0, lastIndex)+insertHeadSetupCode()+code.slice(lastIndex)
        }
        const { lang, name } = descriptor.scriptSetup?.attrs || {}
        const dillStr = headString(lang, name)
        code += dillStr
        return code
      }
    }
  }
}

const headString = (lang, name) => {
  return `<script ${lang ? `lang="${lang}"` : ''}>
import { defineComponent } from 'vue'
export default defineComponent({
  ${name ? `name: "${name}",` : ''}
})
</script>\n`
}

const insertHeadSetupCode=()=>{
  return`
    const instance=getCurrentInstance()
    let that=null
    let ctx=null
    onBeforeMount(()=>{
      ctx=instance.ctx 
      that=instance.ctx.$.setupState
    })
  `
}
