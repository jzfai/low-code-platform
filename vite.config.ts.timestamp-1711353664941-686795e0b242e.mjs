// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/vite@5.1.3_@types+node@17.0.45_sass@1.71.0_terser@5.27.2/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.3_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.1.3_vue@3.4.21/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.1.3/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/vite-plugin-mock@3.0.1_esbuild@0.19.12_mockjs@1.1.0_vite@5.1.3/node_modules/vite-plugin-mock/dist/index.mjs";
import Components from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/unplugin-vue-components@0.22.12_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.mjs";
import UnoCSS from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.35_vite@5.1.3/node_modules/unocss/dist/vite.mjs";
import { presetAttributify, presetIcons, presetUno } from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.35_vite@5.1.3/node_modules/unocss/dist/index.mjs";
import mkcert from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/vite-plugin-mkcert@1.17.3_vite@5.1.3/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import AutoImport from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/unplugin-auto-import@0.11.5_@vueuse+core@8.9.4/node_modules/unplugin-auto-import/dist/vite.js";

// package.json
var package_default = {
  name: "low-code-platform",
  version: "2.2.0",
  license: "MIT",
  author: "kuanghua(869653722@qq.com)",
  packageManager: "pnpm@7.9.0",
  type: "module",
  scripts: {
    dev: "vite --mode serve-dev",
    local: "vite --mode serve-local",
    debug: "vite --mode serve-dev --debug",
    test: "vite --mode serve-test",
    "build:test": "vite build --mode  build-test",
    build: "vite build --mode build",
    "preview:build": "npm run build && vite preview ",
    preview: "vite preview ",
    lint: "eslint --ext .js,.jsx,.vue,.ts,.tsx src --fix",
    prepare: "husky install",
    "tsc-check": "tsc",
    vitest: "vitest --ui",
    coverage: "vitest run --coverage"
  },
  peerDependencies: {
    vue: "^3.4.14"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.0.4",
    axios: "1.6.5",
    codemirror: "^6.0.1",
    echarts: "5.3.2",
    "element-plus": "2.5.3",
    "js-error-collection": "^1.0.7",
    "json-editor-vue3": "^1.0.8",
    mitt: "3.0.0",
    "moment-mini": "2.22.1",
    nprogress: "0.2.0",
    path: "0.12.7",
    "path-browserify": "^1.0.1",
    "path-to-regexp": "^6.2.1",
    pinia: "^2.0.16",
    "pinia-plugin-persistedstate": "2.3.0",
    screenfull: "^6.0.2",
    sortablejs: "^1.15.0",
    vue: "^3.4.21",
    "vue-clipboard3": "^2.0.0",
    "vue-codemirror": "^6.1.1",
    "vue-i18n": "9.1.10",
    "vue-router": "^4.1.5",
    "@codemirror/lang-javascript": "^6.1.0",
    "@codemirror/theme-one-dark": "^6.1.0"
  },
  devDependencies: {
    "@babel/eslint-parser": "7.16.3",
    "@originjs/vite-plugin-commonjs": "^1.0.3",
    "@types/mockjs": "1.0.10",
    "@types/node": "^17.0.35",
    "@types/path-browserify": "^1.0.0",
    "@types/sortablejs": "^1.15.0",
    "@typescript-eslint/eslint-plugin": "5.30.0",
    "@typescript-eslint/parser": "5.30.0",
    "@vitejs/plugin-legacy": "^5.2.0",
    "@vitejs/plugin-vue": "^5.0.3",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    "@vitest/coverage-c8": "^0.33.0",
    "@vitest/ui": "^1.2.0",
    "@vue/cli-plugin-unit-jest": "4.5.17",
    "@vue/cli-service": "5.0.8",
    "@vue/test-utils": "^2.0.2",
    "@vueuse/core": "^8.7.5",
    eslint: "8.18.0",
    "eslint-config-prettier": "8.5.0",
    "eslint-define-config": "1.5.1",
    "eslint-plugin-eslint-comments": "3.2.0",
    "eslint-plugin-import": "2.26.0",
    "eslint-plugin-jsonc": "^2.3.0",
    "eslint-plugin-markdown": "^3.0.0",
    "eslint-plugin-prettier": "4.1.0",
    "eslint-plugin-simple-import-sort": "^10.0.0",
    "eslint-plugin-unicorn": "^43.0.2",
    "eslint-plugin-vue": "9.1.1",
    husky: "7.0.2",
    jsdom: "16.4.0",
    "jsonc-eslint-parser": "^2.1.0",
    majestic: "1.8.1",
    mockjs: "1.1.0",
    prettier: "2.2.1",
    "resize-observer-polyfill": "^1.5.1",
    "rollup-plugin-visualizer": "^5.8.3",
    sass: "^1.52.1",
    "svg-sprite-loader": "6.0.11",
    typescript: "^4.7.2",
    unocss: "^0.58.3",
    "unplugin-auto-import": "^0.11.2",
    "unplugin-vue-components": "^0.22.8",
    "unplugin-vue-define-options": "^0.6.1",
    vite: "^5.0.11",
    "vite-plugin-html": "^3.2.0",
    "vite-plugin-mkcert": "^1.7.2",
    "vite-plugin-mock": "^3.0.1",
    "vite-plugin-style-import": "1.2.1",
    "vite-plugin-svg-icons": "^2.0.1",
    vitest: "^0.22.1",
    "vue-tsc": "^0.34.16"
  },
  pnpm: {
    peerDependencyRules: {
      ignoreMissing: [
        "html-webpack-plugin",
        "vite-plugin-mock",
        "unplugin-auto-import",
        "unplugin-vue-components",
        "vue-template-compiler",
        "unocss",
        "unplugin",
        "vite-plugin-mock",
        "@vitejs/plugin-legacy",
        "@vitejs/plugin-vue",
        "@vitejs/*",
        "@babel/*",
        "vite",
        "vue",
        "@unocss/vite",
        "rollup",
        "vue-jest",
        "@babel/*"
      ]
    }
  },
  browserslist: [
    "> 1%",
    "not ie 11",
    "not op_mini all"
  ],
  engines: {
    node: ">= 16 <20",
    pnpm: ">= 6 <9"
  }
};

// src/settings.ts
var settings = {
  title: package_default.name,
  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the title in Navbar
   */
  showNavbarTitle: false,
  /**
   * @type {boolean} true | false
   * @description Whether show the drop-down
   */
  ShowDropDown: true,
  /**
   * @type {boolean} true | false
   * @description Whether show Hamburger
   */
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showLeftMenu: true,
  /**
   * @type {boolean} true | false
   * @description Whether show TagsView
   */
  showTagsView: false,
  /**
   * @description TagsView show number
   */
  tagsViewNum: 6,
  /**
   * @type {boolean} true | false
   * @description Whether show the top Navbar
   */
  showTopNavbar: true,
  /* page  animation related*/
  /**
   * @type {boolean} true | false
   * @description Whether need animation of main area
   */
  mainNeedAnimation: false,
  /**
   * @type {boolean} true | false
   * @description Whether need nprogress
   */
  isNeedNprogress: true,
  /*page login or other*/
  /**
   * @type {boolean} true | false
   * @description Whether need login
   */
  isNeedLogin: true,
  /**
   * @type {string} 'rbac'| 'roles' | 'code'
   */
  permissionMode: "roles",
  /**
   * @type {boolean} true | false
   * @description Whether  open prod mock
   */
  openProdMock: true,
  /**
   * @type {string | array} 'dev' | ['prod','test','dev'] according to the .env file props of VITE_APP_ENV
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['dev', 'test']
   */
  errorLog: ["prod"],
  /*
   * table height(100vh-delWindowHeight)
   * */
  delWindowHeight: "210px",
  /*
   * setting dev token when  isNeedLogin is setting false
   * */
  tmpToken: "tmp_token",
  /*
   * vite.config.js base config
   * */
  viteBasePath: "./",
  /*
   * i18n setting default language
   * en/zh
   * */
  defaultLanguage: "en",
  /*
   *  default theme
   * base-theme/lighting-theme/dark-theme
   * */
  defaultTheme: "base-theme",
  /*
   * setting default defaultSize
   * large / default /small
   * */
  defaultSize: "small",
  /*
   * vite.config.js base config
   * such as
   * */
  platformId: 2,
  //login info
  rememberMe: true,
  username: "admin",
  password: "666666"
};
var settings_default = settings;

// src/plugins/vite-plugin-setup-extend/index.ts
import { parse } from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/@vue+compiler-sfc@3.4.19/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js";
import { render } from "file:///D:/gitcode/github/low-code-platform/node_modules/.pnpm/ejs@3.1.9/node_modules/ejs/lib/ejs.js";
var vite_plugin_setup_extend_default = ({ inject }) => {
  return {
    name: "vite-plugin-setup-extend",
    enforce: "pre",
    // configResolved(resolvedConfig) {
    //   viteConfig = resolvedConfig
    // },
    async transformIndexHtml(html) {
      return render(html, { ...inject });
    },
    transform(code, id) {
      if (/\.vue$/.test(id)) {
        const { descriptor } = parse(code);
        if (!descriptor?.scriptSetup?.setup) {
          return null;
        }
        const attrs = descriptor.scriptSetup?.attrs;
        if (Object.keys(attrs).includes("injectCode")) {
          const lastIndex = code.lastIndexOf("</script>");
          code = code.slice(0, lastIndex) + insertHeadSetupCode() + code.slice(lastIndex);
        }
        const { lang, name } = descriptor.scriptSetup?.attrs || {};
        const dillStr = headString(lang, name);
        code += dillStr;
        return code;
      }
    }
  };
};
var headString = (lang, name) => {
  return `<script ${lang ? `lang="${lang}"` : ""}>
import { defineComponent } from 'vue'
export default defineComponent({
  ${name ? `name: "${name}",` : ""}
})
</script>
`;
};
var insertHeadSetupCode = () => {
  return `
    const instance=getCurrentInstance()
    let that=null
    let ctx=null
    onBeforeMount(()=>{
      ctx=instance.ctx 
      that=instance.ctx.$.setupState
    })
  `;
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\gitcode\\github\\low-code-platform";
var prodMock = settings_default.openProdMock;
var pathSrc = resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    base: settings_default.viteBasePath,
    define: {
      //define global var
      GLOBAL_STRING: JSON.stringify("i am global var from vite.config.js define"),
      GLOBAL_VAR: { test: "i am global var from vite.config.js define" }
    },
    clearScreen: false,
    //设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    server: {
      hmr: { overlay: false },
      //设置 server.hmr.overlay 为 false 可以禁用开发服务器错误的屏蔽。方便错误查看
      port: 5003,
      // 类型： number 指定服务器端口;
      open: false,
      // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      host: true,
      https: false
    },
    preview: {
      port: 5006,
      host: true,
      strictPort: true
    },
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS({
        presets: [presetUno(), presetAttributify(), presetIcons()],
        rules: [
          // 在这个可以增加预设规则, 也可以使用正则表达式
          [
            "p-c",
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`
            }
          ],
          [/^wi-(\d+)px$/, ([, d]) => ({ width: `${d}px!important` })],
          [/^hi-(\d+)px$/, ([, d]) => ({ height: `${d}px!important` })]
        ]
      }),
      mkcert(),
      //compatible with old browsers
      // legacy({
      //   targets: ['chrome 52'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      // }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/icons/common"), resolve(process.cwd(), "src/icons/nav-bar")],
        symbolId: "icon-[dir]-[name]"
      }),
      //https://github.com/anncwb/vite-plugin-mock/blob/HEAD/README.zh_CN.md
      viteMockServe({
        mockPath: "mock",
        enable: true,
        // injectCode: `
        //   import { setupProdMockServer } from './mock-prod-server';
        //   setupProdMockServer();
        // `,
        logger: true
      }),
      // VueSetupExtend(),using  DefineOptions instant of it
      //https://github.com/antfu/unplugin-auto-import/blob/HEAD/src/types.ts
      Components({
        dirs: ["src/components", "src/icons"],
        extensions: ["vue"],
        deep: true,
        dts: "./typings/components.d.ts"
      }),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          {
            "pinia/dist/pinia": ["storeToRefs"]
          }
        ],
        //配置后会自动扫描目录下的文件
        dirs: ["src/utils/**", "src/hooks/**", "src/store/**", "src/directives/**"],
        eslintrc: {
          enabled: true,
          // Default `false`
          filepath: "./eslintrc/.eslintrc-auto-import.json",
          // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true
          // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: "./typings/auto-imports.d.ts"
      }),
      // auto config of index.html title
      //依赖分析插件
      // visualizer({
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true
      // })
      vite_plugin_setup_extend_default({ inject: { title: settings_default.title } })
    ],
    build: {
      chunkSizeWarningLimit: 1e4,
      //消除触发警告的 chunk, 默认500k
      assetsDir: "static/assets",
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    resolve: {
      alias: {
        "@/": `${pathSrc}/`,
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
        //remove i18n waring
      }
    },
    optimizeDeps: {
      //include: [...optimizeDependencies,...optimizeElementPlus] //on-demand element-plus use this
      include: ["moment-mini", "sortablejs"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInNyYy9zZXR0aW5ncy50cyIsICJzcmMvcGx1Z2lucy92aXRlLXBsdWdpbi1zZXR1cC1leHRlbmQvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRjb2RlXFxcXGdpdGh1YlxcXFxsb3ctY29kZS1wbGF0Zm9ybVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0Y29kZVxcXFxnaXRodWJcXFxcbG93LWNvZGUtcGxhdGZvcm1cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdGNvZGUvZ2l0aHViL2xvdy1jb2RlLXBsYXRmb3JtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHsgcHJlc2V0QXR0cmlidXRpZnksIHByZXNldEljb25zLCBwcmVzZXRVbm8gfSBmcm9tICd1bm9jc3MnXHJcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0J1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgc2V0dGluZyBmcm9tICcuL3NyYy9zZXR0aW5ncydcclxuaW1wb3J0IHZpdGVQbHVnaW5TZXR1cEV4dGVuZCBmcm9tICcuL3NyYy9wbHVnaW5zL3ZpdGUtcGx1Z2luLXNldHVwLWV4dGVuZCdcclxuY29uc3QgcHJvZE1vY2sgPSBzZXR0aW5nLm9wZW5Qcm9kTW9ja1xyXG5jb25zdCBwYXRoU3JjID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxyXG4vLyBAdHMtaWdub3JlXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcclxuICAvL2NvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpIC8vXHU4M0I3XHU1M0Q2XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHJcbiAgcmV0dXJuIHtcclxuICAgIGJhc2U6IHNldHRpbmcudml0ZUJhc2VQYXRoLFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIC8vZGVmaW5lIGdsb2JhbCB2YXJcclxuICAgICAgR0xPQkFMX1NUUklORzogSlNPTi5zdHJpbmdpZnkoJ2kgYW0gZ2xvYmFsIHZhciBmcm9tIHZpdGUuY29uZmlnLmpzIGRlZmluZScpLFxyXG4gICAgICBHTE9CQUxfVkFSOiB7IHRlc3Q6ICdpIGFtIGdsb2JhbCB2YXIgZnJvbSB2aXRlLmNvbmZpZy5qcyBkZWZpbmUnIH1cclxuICAgIH0sXHJcbiAgICBjbGVhclNjcmVlbjogZmFsc2UsIC8vXHU4QkJFXHU0RTNBIGZhbHNlIFx1NTNFRlx1NEVFNVx1OTA3Rlx1NTE0RCBWaXRlIFx1NkUwNVx1NUM0Rlx1ODAwQ1x1OTUxOVx1OEZDN1x1NTcyOFx1N0VDOFx1N0FFRlx1NEUyRFx1NjI1M1x1NTM3MFx1NjdEMFx1NEU5Qlx1NTE3M1x1OTUyRVx1NEZFMVx1NjA2RlxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhtcjogeyBvdmVybGF5OiBmYWxzZSB9LCAvL1x1OEJCRVx1N0Y2RSBzZXJ2ZXIuaG1yLm92ZXJsYXkgXHU0RTNBIGZhbHNlIFx1NTNFRlx1NEVFNVx1Nzk4MVx1NzUyOFx1NUYwMFx1NTNEMVx1NjcwRFx1NTJBMVx1NTY2OFx1OTUxOVx1OEJFRlx1NzY4NFx1NUM0Rlx1ODUzRFx1MzAwMlx1NjVCOVx1NEZCRlx1OTUxOVx1OEJFRlx1NjdFNVx1NzcwQlxyXG4gICAgICBwb3J0OiA1MDAzLCAvLyBcdTdDN0JcdTU3OEJcdUZGMUEgbnVtYmVyIFx1NjMwN1x1NUI5QVx1NjcwRFx1NTJBMVx1NTY2OFx1N0FFRlx1NTNFMztcclxuICAgICAgb3BlbjogZmFsc2UsIC8vIFx1N0M3Qlx1NTc4Qlx1RkYxQSBib29sZWFuIHwgc3RyaW5nXHU1NzI4XHU2NzBEXHU1MkExXHU1NjY4XHU1NDJGXHU1MkE4XHU2NUY2XHU4MUVBXHU1MkE4XHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU0RTJEXHU2MjUzXHU1RjAwXHU1RTk0XHU3NTI4XHU3QTBCXHU1RThGXHVGRjFCXHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIGh0dHBzOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgcG9ydDogNTAwNixcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgc3RyaWN0UG9ydDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICBVbm9DU1Moe1xyXG4gICAgICAgIHByZXNldHM6IFtwcmVzZXRVbm8oKSwgcHJlc2V0QXR0cmlidXRpZnkoKSwgcHJlc2V0SWNvbnMoKV0sXHJcbiAgICAgICAgcnVsZXM6IFtcclxuICAgICAgICAgIC8vIFx1NTcyOFx1OEZEOVx1NEUyQVx1NTNFRlx1NEVFNVx1NTg5RVx1NTJBMFx1OTg4NFx1OEJCRVx1ODlDNFx1NTIxOSwgXHU0RTVGXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4XHU2QjYzXHU1MjE5XHU4ODY4XHU4RkJFXHU1RjBGXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgICdwLWMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgdG9wOiAnNTAlJyxcclxuICAgICAgICAgICAgICBsZWZ0OiAnNTAlJyxcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoLTUwJSwgLTUwJSlgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBbL153aS0oXFxkKylweCQvLCAoWywgZF0pID0+ICh7IHdpZHRoOiBgJHtkfXB4IWltcG9ydGFudGAgfSldLFxyXG4gICAgICAgICAgWy9eaGktKFxcZCspcHgkLywgKFssIGRdKSA9PiAoeyBoZWlnaHQ6IGAke2R9cHghaW1wb3J0YW50YCB9KV1cclxuICAgICAgICBdXHJcbiAgICAgIH0pLFxyXG4gICAgICBta2NlcnQoKSxcclxuICAgICAgLy9jb21wYXRpYmxlIHdpdGggb2xkIGJyb3dzZXJzXHJcbiAgICAgIC8vIGxlZ2FjeSh7XHJcbiAgICAgIC8vICAgdGFyZ2V0czogWydjaHJvbWUgNTInXSxcclxuICAgICAgLy8gICBhZGRpdGlvbmFsTGVnYWN5UG9seWZpbGxzOiBbJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZSddXHJcbiAgICAgIC8vIH0pLFxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgaWNvbkRpcnM6IFtyZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvaWNvbnMvY29tbW9uJyksIHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9pY29ucy9uYXYtYmFyJyldLFxyXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nXHJcbiAgICAgIH0pLFxyXG4gICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4tbW9jay9ibG9iL0hFQUQvUkVBRE1FLnpoX0NOLm1kXHJcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xyXG4gICAgICAgIG1vY2tQYXRoOiAnbW9jaycsXHJcbiAgICAgICAgZW5hYmxlOiB0cnVlLFxyXG4gICAgICAgIC8vIGluamVjdENvZGU6IGBcclxuICAgICAgICAvLyAgIGltcG9ydCB7IHNldHVwUHJvZE1vY2tTZXJ2ZXIgfSBmcm9tICcuL21vY2stcHJvZC1zZXJ2ZXInO1xyXG4gICAgICAgIC8vICAgc2V0dXBQcm9kTW9ja1NlcnZlcigpO1xyXG4gICAgICAgIC8vIGAsXHJcbiAgICAgICAgbG9nZ2VyOiB0cnVlXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLyBWdWVTZXR1cEV4dGVuZCgpLHVzaW5nICBEZWZpbmVPcHRpb25zIGluc3RhbnQgb2YgaXRcclxuICAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnQvYmxvYi9IRUFEL3NyYy90eXBlcy50c1xyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJywgJ3NyYy9pY29ucyddLFxyXG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXHJcbiAgICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgICBkdHM6ICcuL3R5cGluZ3MvY29tcG9uZW50cy5kLnRzJ1xyXG4gICAgICB9KSxcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICdwaW5pYS9kaXN0L3BpbmlhJzogWydzdG9yZVRvUmVmcyddXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICAvL1x1OTE0RFx1N0Y2RVx1NTQwRVx1NEYxQVx1ODFFQVx1NTJBOFx1NjI2Qlx1NjNDRlx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NFx1NjU4N1x1NEVGNlxyXG4gICAgICAgIGRpcnM6IFsnc3JjL3V0aWxzLyoqJywnc3JjL2hvb2tzLyoqJywnc3JjL3N0b3JlLyoqJywgJ3NyYy9kaXJlY3RpdmVzLyoqJ10sXHJcbiAgICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIERlZmF1bHQgYGZhbHNlYFxyXG4gICAgICAgICAgZmlsZXBhdGg6ICcuL2VzbGludHJjLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJywgLy8gRGVmYXVsdCBgLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbmBcclxuICAgICAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWUgLy8gRGVmYXVsdCBgdHJ1ZWAsICh0cnVlIHwgZmFsc2UgfCAncmVhZG9ubHknIHwgJ3JlYWRhYmxlJyB8ICd3cml0YWJsZScgfCAnd3JpdGVhYmxlJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGR0czogJy4vdHlwaW5ncy9hdXRvLWltcG9ydHMuZC50cydcclxuICAgICAgfSksXHJcbiAgICAgIC8vIGF1dG8gY29uZmlnIG9mIGluZGV4Lmh0bWwgdGl0bGVcclxuICAgICAgLy9cdTRGOURcdThENTZcdTUyMDZcdTY3OTBcdTYzRDJcdTRFRjZcclxuICAgICAgLy8gdmlzdWFsaXplcih7XHJcbiAgICAgIC8vICAgb3BlbjogdHJ1ZSxcclxuICAgICAgLy8gICBnemlwU2l6ZTogdHJ1ZSxcclxuICAgICAgLy8gICBicm90bGlTaXplOiB0cnVlXHJcbiAgICAgIC8vIH0pXHJcbiAgICAgIHZpdGVQbHVnaW5TZXR1cEV4dGVuZCh7IGluamVjdDogeyB0aXRsZTogc2V0dGluZy50aXRsZSB9IH0pXHJcbiAgICBdLFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwMCwgLy9cdTZEODhcdTk2NjRcdTg5RTZcdTUzRDFcdThCNjZcdTU0NEFcdTc2ODQgY2h1bmssIFx1OUVEOFx1OEJBNDUwMGtcclxuICAgICAgYXNzZXRzRGlyOiAnc3RhdGljL2Fzc2V0cycsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnc3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ3N0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQC8nOiBgJHtwYXRoU3JjfS9gLFxyXG4gICAgICAgICd2dWUtaTE4bic6ICd2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qcycgLy9yZW1vdmUgaTE4biB3YXJpbmdcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICAvL2luY2x1ZGU6IFsuLi5vcHRpbWl6ZURlcGVuZGVuY2llcywuLi5vcHRpbWl6ZUVsZW1lbnRQbHVzXSAvL29uLWRlbWFuZCBlbGVtZW50LXBsdXMgdXNlIHRoaXNcclxuICAgICAgaW5jbHVkZTogWydtb21lbnQtbWluaScsICdzb3J0YWJsZWpzJ11cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiIsICJ7XHJcbiAgICBcIm5hbWVcIjogXCJsb3ctY29kZS1wbGF0Zm9ybVwiLFxyXG4gICAgXCJ2ZXJzaW9uXCI6IFwiMi4yLjBcIixcclxuICAgIFwibGljZW5zZVwiOiBcIk1JVFwiLFxyXG4gICAgXCJhdXRob3JcIjogXCJrdWFuZ2h1YSg4Njk2NTM3MjJAcXEuY29tKVwiLFxyXG4gICAgXCJwYWNrYWdlTWFuYWdlclwiOiBcInBucG1ANy45LjBcIixcclxuICAgIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gICAgXCJzY3JpcHRzXCI6IHtcclxuICAgICAgICBcImRldlwiOiBcInZpdGUgLS1tb2RlIHNlcnZlLWRldlwiLFxyXG4gICAgICAgIFwibG9jYWxcIjogXCJ2aXRlIC0tbW9kZSBzZXJ2ZS1sb2NhbFwiLFxyXG4gICAgICAgIFwiZGVidWdcIjogXCJ2aXRlIC0tbW9kZSBzZXJ2ZS1kZXYgLS1kZWJ1Z1wiLFxyXG4gICAgICAgIFwidGVzdFwiOiBcInZpdGUgLS1tb2RlIHNlcnZlLXRlc3RcIixcclxuICAgICAgICBcImJ1aWxkOnRlc3RcIjogXCJ2aXRlIGJ1aWxkIC0tbW9kZSAgYnVpbGQtdGVzdFwiLFxyXG4gICAgICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkIC0tbW9kZSBidWlsZFwiLFxyXG4gICAgICAgIFwicHJldmlldzpidWlsZFwiOiBcIm5wbSBydW4gYnVpbGQgJiYgdml0ZSBwcmV2aWV3IFwiLFxyXG4gICAgICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlldyBcIixcclxuICAgICAgICBcImxpbnRcIjogXCJlc2xpbnQgLS1leHQgLmpzLC5qc3gsLnZ1ZSwudHMsLnRzeCBzcmMgLS1maXhcIixcclxuICAgICAgICBcInByZXBhcmVcIjogXCJodXNreSBpbnN0YWxsXCIsXHJcbiAgICAgICAgXCJ0c2MtY2hlY2tcIjogXCJ0c2NcIixcclxuICAgICAgICBcInZpdGVzdFwiOiBcInZpdGVzdCAtLXVpXCIsXHJcbiAgICAgICAgXCJjb3ZlcmFnZVwiOiBcInZpdGVzdCBydW4gLS1jb3ZlcmFnZVwiXHJcbiAgICB9LFxyXG4gICAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcclxuICAgICAgICBcInZ1ZVwiOiBcIl4zLjQuMTRcIlxyXG4gICAgfSxcclxuICAgIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgICAgICBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCI6IFwiXjIuMC40XCIsXHJcbiAgICAgICAgXCJheGlvc1wiOiBcIjEuNi41XCIsXHJcbiAgICAgICAgXCJjb2RlbWlycm9yXCI6IFwiXjYuMC4xXCIsXHJcbiAgICAgICAgXCJlY2hhcnRzXCI6IFwiNS4zLjJcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1c1wiOiBcIjIuNS4zXCIsXHJcbiAgICAgICAgXCJqcy1lcnJvci1jb2xsZWN0aW9uXCI6IFwiXjEuMC43XCIsXHJcbiAgICAgICAgXCJqc29uLWVkaXRvci12dWUzXCI6IFwiXjEuMC44XCIsXHJcbiAgICAgICAgXCJtaXR0XCI6IFwiMy4wLjBcIixcclxuICAgICAgICBcIm1vbWVudC1taW5pXCI6IFwiMi4yMi4xXCIsXHJcbiAgICAgICAgXCJucHJvZ3Jlc3NcIjogXCIwLjIuMFwiLFxyXG4gICAgICAgIFwicGF0aFwiOiBcIjAuMTIuN1wiLFxyXG4gICAgICAgIFwicGF0aC1icm93c2VyaWZ5XCI6IFwiXjEuMC4xXCIsXHJcbiAgICAgICAgXCJwYXRoLXRvLXJlZ2V4cFwiOiBcIl42LjIuMVwiLFxyXG4gICAgICAgIFwicGluaWFcIjogXCJeMi4wLjE2XCIsXHJcbiAgICAgICAgXCJwaW5pYS1wbHVnaW4tcGVyc2lzdGVkc3RhdGVcIjogXCIyLjMuMFwiLFxyXG4gICAgICAgIFwic2NyZWVuZnVsbFwiOiBcIl42LjAuMlwiLFxyXG4gICAgICAgIFwic29ydGFibGVqc1wiOiBcIl4xLjE1LjBcIixcclxuICAgICAgICBcInZ1ZVwiOiBcIl4zLjQuMjFcIixcclxuICAgICAgICBcInZ1ZS1jbGlwYm9hcmQzXCI6IFwiXjIuMC4wXCIsXHJcbiAgICAgICAgXCJ2dWUtY29kZW1pcnJvclwiOiBcIl42LjEuMVwiLFxyXG4gICAgICAgIFwidnVlLWkxOG5cIjogXCI5LjEuMTBcIixcclxuICAgICAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4xLjVcIixcclxuICAgICAgICBcIkBjb2RlbWlycm9yL2xhbmctamF2YXNjcmlwdFwiOiBcIl42LjEuMFwiLFxyXG4gICAgICAgIFwiQGNvZGVtaXJyb3IvdGhlbWUtb25lLWRhcmtcIjogXCJeNi4xLjBcIlxyXG4gICAgfSxcclxuICAgIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgICAgICBcIkBiYWJlbC9lc2xpbnQtcGFyc2VyXCI6IFwiNy4xNi4zXCIsXHJcbiAgICAgICAgXCJAb3JpZ2luanMvdml0ZS1wbHVnaW4tY29tbW9uanNcIjogXCJeMS4wLjNcIixcclxuICAgICAgICBcIkB0eXBlcy9tb2NranNcIjogXCIxLjAuMTBcIixcclxuICAgICAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE3LjAuMzVcIixcclxuICAgICAgICBcIkB0eXBlcy9wYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjBcIixcclxuICAgICAgICBcIkB0eXBlcy9zb3J0YWJsZWpzXCI6IFwiXjEuMTUuMFwiLFxyXG4gICAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCI1LjMwLjBcIixcclxuICAgICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCI1LjMwLjBcIixcclxuICAgICAgICBcIkB2aXRlanMvcGx1Z2luLWxlZ2FjeVwiOiBcIl41LjIuMFwiLFxyXG4gICAgICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMC4zXCIsXHJcbiAgICAgICAgXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjMuMS4wXCIsXHJcbiAgICAgICAgXCJAdml0ZXN0L2NvdmVyYWdlLWM4XCI6IFwiXjAuMzMuMFwiLFxyXG4gICAgICAgIFwiQHZpdGVzdC91aVwiOiBcIl4xLjIuMFwiLFxyXG4gICAgICAgIFwiQHZ1ZS9jbGktcGx1Z2luLXVuaXQtamVzdFwiOiBcIjQuNS4xN1wiLFxyXG4gICAgICAgIFwiQHZ1ZS9jbGktc2VydmljZVwiOiBcIjUuMC44XCIsXHJcbiAgICAgICAgXCJAdnVlL3Rlc3QtdXRpbHNcIjogXCJeMi4wLjJcIixcclxuICAgICAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl44LjcuNVwiLFxyXG4gICAgICAgIFwiZXNsaW50XCI6IFwiOC4xOC4wXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiOC41LjBcIixcclxuICAgICAgICBcImVzbGludC1kZWZpbmUtY29uZmlnXCI6IFwiMS41LjFcIixcclxuICAgICAgICBcImVzbGludC1wbHVnaW4tZXNsaW50LWNvbW1lbnRzXCI6IFwiMy4yLjBcIixcclxuICAgICAgICBcImVzbGludC1wbHVnaW4taW1wb3J0XCI6IFwiMi4yNi4wXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLWpzb25jXCI6IFwiXjIuMy4wXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLW1hcmtkb3duXCI6IFwiXjMuMC4wXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiNC4xLjBcIixcclxuICAgICAgICBcImVzbGludC1wbHVnaW4tc2ltcGxlLWltcG9ydC1zb3J0XCI6IFwiXjEwLjAuMFwiLFxyXG4gICAgICAgIFwiZXNsaW50LXBsdWdpbi11bmljb3JuXCI6IFwiXjQzLjAuMlwiLFxyXG4gICAgICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCI5LjEuMVwiLFxyXG4gICAgICAgIFwiaHVza3lcIjogXCI3LjAuMlwiLFxyXG4gICAgICAgIFwianNkb21cIjogXCIxNi40LjBcIixcclxuICAgICAgICBcImpzb25jLWVzbGludC1wYXJzZXJcIjogXCJeMi4xLjBcIixcclxuICAgICAgICBcIm1hamVzdGljXCI6IFwiMS44LjFcIixcclxuICAgICAgICBcIm1vY2tqc1wiOiBcIjEuMS4wXCIsXHJcbiAgICAgICAgXCJwcmV0dGllclwiOiBcIjIuMi4xXCIsXHJcbiAgICAgICAgXCJyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGxcIjogXCJeMS41LjFcIixcclxuICAgICAgICBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl41LjguM1wiLFxyXG4gICAgICAgIFwic2Fzc1wiOiBcIl4xLjUyLjFcIixcclxuICAgICAgICBcInN2Zy1zcHJpdGUtbG9hZGVyXCI6IFwiNi4wLjExXCIsXHJcbiAgICAgICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjQuNy4yXCIsXHJcbiAgICAgICAgXCJ1bm9jc3NcIjogXCJeMC41OC4zXCIsXHJcbiAgICAgICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjExLjJcIixcclxuICAgICAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjIuOFwiLFxyXG4gICAgICAgIFwidW5wbHVnaW4tdnVlLWRlZmluZS1vcHRpb25zXCI6IFwiXjAuNi4xXCIsXHJcbiAgICAgICAgXCJ2aXRlXCI6IFwiXjUuMC4xMVwiLFxyXG4gICAgICAgIFwidml0ZS1wbHVnaW4taHRtbFwiOiBcIl4zLjIuMFwiLFxyXG4gICAgICAgIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCI6IFwiXjEuNy4yXCIsXHJcbiAgICAgICAgXCJ2aXRlLXBsdWdpbi1tb2NrXCI6IFwiXjMuMC4xXCIsXHJcbiAgICAgICAgXCJ2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnRcIjogXCIxLjIuMVwiLFxyXG4gICAgICAgIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCIsXHJcbiAgICAgICAgXCJ2aXRlc3RcIjogXCJeMC4yMi4xXCIsXHJcbiAgICAgICAgXCJ2dWUtdHNjXCI6IFwiXjAuMzQuMTZcIlxyXG4gICAgfSxcclxuICAgIFwicG5wbVwiOiB7XHJcbiAgICAgICAgXCJwZWVyRGVwZW5kZW5jeVJ1bGVzXCI6IHtcclxuICAgICAgICAgICAgXCJpZ25vcmVNaXNzaW5nXCI6IFtcclxuICAgICAgICAgICAgICAgIFwiaHRtbC13ZWJwYWNrLXBsdWdpblwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2aXRlLXBsdWdpbi1tb2NrXCIsXHJcbiAgICAgICAgICAgICAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCIsXHJcbiAgICAgICAgICAgICAgICBcInZ1ZS10ZW1wbGF0ZS1jb21waWxlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bm9jc3NcIixcclxuICAgICAgICAgICAgICAgIFwidW5wbHVnaW5cIixcclxuICAgICAgICAgICAgICAgIFwidml0ZS1wbHVnaW4tbW9ja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJAdml0ZWpzL3BsdWdpbi1sZWdhY3lcIixcclxuICAgICAgICAgICAgICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCIsXHJcbiAgICAgICAgICAgICAgICBcIkB2aXRlanMvKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJAYmFiZWwvKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2aXRlXCIsXHJcbiAgICAgICAgICAgICAgICBcInZ1ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJAdW5vY3NzL3ZpdGVcIixcclxuICAgICAgICAgICAgICAgIFwicm9sbHVwXCIsXHJcbiAgICAgICAgICAgICAgICBcInZ1ZS1qZXN0XCIsXHJcbiAgICAgICAgICAgICAgICBcIkBiYWJlbC8qXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImJyb3dzZXJzbGlzdFwiOiBbXHJcbiAgICAgICAgXCI+IDElXCIsXHJcbiAgICAgICAgXCJub3QgaWUgMTFcIixcclxuICAgICAgICBcIm5vdCBvcF9taW5pIGFsbFwiXHJcbiAgICBdLFxyXG4gICAgXCJlbmdpbmVzXCI6IHtcclxuICAgICAgICBcIm5vZGVcIjogXCI+PSAxNiA8MjBcIixcclxuICAgICAgICBcInBucG1cIjogXCI+PSA2IDw5XCJcclxuICAgIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGdpdGNvZGVcXFxcZ2l0aHViXFxcXGxvdy1jb2RlLXBsYXRmb3JtXFxcXHNyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0Y29kZVxcXFxnaXRodWJcXFxcbG93LWNvZGUtcGxhdGZvcm1cXFxcc3JjXFxcXHNldHRpbmdzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9naXRjb2RlL2dpdGh1Yi9sb3ctY29kZS1wbGF0Zm9ybS9zcmMvc2V0dGluZ3MudHNcIjtpbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi4vcGFja2FnZS5qc29uJ1xyXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzQ29uZmlnIH0gZnJvbSAnfi9iYXNpYydcclxuZXhwb3J0IGNvbnN0IHNldHRpbmdzOiBTZXR0aW5nc0NvbmZpZyA9IHtcclxuICB0aXRsZTogcGFja2FnZUpzb24ubmFtZSxcclxuICAvKipcclxuICAgKiBAdHlwZSB7Ym9vbGVhbn0gdHJ1ZSB8IGZhbHNlXHJcbiAgICogQGRlc2NyaXB0aW9uIFdoZXRoZXIgc2hvdyB0aGUgbG9nbyBpbiBzaWRlYmFyXHJcbiAgICovXHJcbiAgc2lkZWJhckxvZ286IHRydWUsXHJcbiAgLyoqXHJcbiAgICogQHR5cGUge2Jvb2xlYW59IHRydWUgfCBmYWxzZVxyXG4gICAqIEBkZXNjcmlwdGlvbiBXaGV0aGVyIHNob3cgdGhlIHRpdGxlIGluIE5hdmJhclxyXG4gICAqL1xyXG4gIHNob3dOYXZiYXJUaXRsZTogZmFsc2UsXHJcbiAgLyoqXHJcbiAgICogQHR5cGUge2Jvb2xlYW59IHRydWUgfCBmYWxzZVxyXG4gICAqIEBkZXNjcmlwdGlvbiBXaGV0aGVyIHNob3cgdGhlIGRyb3AtZG93blxyXG4gICAqL1xyXG4gIFNob3dEcm9wRG93bjogdHJ1ZSxcclxuICAvKipcclxuICAgKiBAdHlwZSB7Ym9vbGVhbn0gdHJ1ZSB8IGZhbHNlXHJcbiAgICogQGRlc2NyaXB0aW9uIFdoZXRoZXIgc2hvdyBIYW1idXJnZXJcclxuICAgKi9cclxuICBzaG93SGFtYnVyZ2VyOiB0cnVlLFxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtib29sZWFufSB0cnVlIHwgZmFsc2VcclxuICAgKiBAZGVzY3JpcHRpb24gV2hldGhlciBzaG93IHRoZSBzZXR0aW5ncyByaWdodC1wYW5lbFxyXG4gICAqL1xyXG4gIHNob3dMZWZ0TWVudTogdHJ1ZSxcclxuICAvKipcclxuICAgKiBAdHlwZSB7Ym9vbGVhbn0gdHJ1ZSB8IGZhbHNlXHJcbiAgICogQGRlc2NyaXB0aW9uIFdoZXRoZXIgc2hvdyBUYWdzVmlld1xyXG4gICAqL1xyXG4gIHNob3dUYWdzVmlldzogZmFsc2UsXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFRhZ3NWaWV3IHNob3cgbnVtYmVyXHJcbiAgICovXHJcbiAgdGFnc1ZpZXdOdW06IDYsXHJcbiAgLyoqXHJcbiAgICogQHR5cGUge2Jvb2xlYW59IHRydWUgfCBmYWxzZVxyXG4gICAqIEBkZXNjcmlwdGlvbiBXaGV0aGVyIHNob3cgdGhlIHRvcCBOYXZiYXJcclxuICAgKi9cclxuICBzaG93VG9wTmF2YmFyOiB0cnVlLFxyXG4gIC8qIHBhZ2UgIGFuaW1hdGlvbiByZWxhdGVkKi9cclxuICAvKipcclxuICAgKiBAdHlwZSB7Ym9vbGVhbn0gdHJ1ZSB8IGZhbHNlXHJcbiAgICogQGRlc2NyaXB0aW9uIFdoZXRoZXIgbmVlZCBhbmltYXRpb24gb2YgbWFpbiBhcmVhXHJcbiAgICovXHJcbiAgbWFpbk5lZWRBbmltYXRpb246IGZhbHNlLFxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtib29sZWFufSB0cnVlIHwgZmFsc2VcclxuICAgKiBAZGVzY3JpcHRpb24gV2hldGhlciBuZWVkIG5wcm9ncmVzc1xyXG4gICAqL1xyXG4gIGlzTmVlZE5wcm9ncmVzczogdHJ1ZSxcclxuXHJcbiAgLypwYWdlIGxvZ2luIG9yIG90aGVyKi9cclxuICAvKipcclxuICAgKiBAdHlwZSB7Ym9vbGVhbn0gdHJ1ZSB8IGZhbHNlXHJcbiAgICogQGRlc2NyaXB0aW9uIFdoZXRoZXIgbmVlZCBsb2dpblxyXG4gICAqL1xyXG4gIGlzTmVlZExvZ2luOiB0cnVlLFxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtzdHJpbmd9ICdyYmFjJ3wgJ3JvbGVzJyB8ICdjb2RlJ1xyXG4gICAqL1xyXG4gIHBlcm1pc3Npb25Nb2RlOiAncm9sZXMnLFxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtib29sZWFufSB0cnVlIHwgZmFsc2VcclxuICAgKiBAZGVzY3JpcHRpb24gV2hldGhlciAgb3BlbiBwcm9kIG1vY2tcclxuICAgKi9cclxuICBvcGVuUHJvZE1vY2s6IHRydWUsXHJcbiAgLyoqXHJcbiAgICogQHR5cGUge3N0cmluZyB8IGFycmF5fSAnZGV2JyB8IFsncHJvZCcsJ3Rlc3QnLCdkZXYnXSBhY2NvcmRpbmcgdG8gdGhlIC5lbnYgZmlsZSBwcm9wcyBvZiBWSVRFX0FQUF9FTlZcclxuICAgKiBAZGVzY3JpcHRpb24gTmVlZCBzaG93IGVyciBsb2dzIGNvbXBvbmVudC5cclxuICAgKiBUaGUgZGVmYXVsdCBpcyBvbmx5IHVzZWQgaW4gdGhlIHByb2R1Y3Rpb24gZW52XHJcbiAgICogSWYgeW91IHdhbnQgdG8gYWxzbyB1c2UgaXQgaW4gZGV2LCB5b3UgY2FuIHBhc3MgWydkZXYnLCAndGVzdCddXHJcbiAgICovXHJcbiAgZXJyb3JMb2c6IFsncHJvZCddLFxyXG4gIC8qXHJcbiAgICogdGFibGUgaGVpZ2h0KDEwMHZoLWRlbFdpbmRvd0hlaWdodClcclxuICAgKiAqL1xyXG4gIGRlbFdpbmRvd0hlaWdodDogJzIxMHB4JyxcclxuICAvKlxyXG4gICAqIHNldHRpbmcgZGV2IHRva2VuIHdoZW4gIGlzTmVlZExvZ2luIGlzIHNldHRpbmcgZmFsc2VcclxuICAgKiAqL1xyXG4gIHRtcFRva2VuOiAndG1wX3Rva2VuJyxcclxuXHJcbiAgLypcclxuICAgKiB2aXRlLmNvbmZpZy5qcyBiYXNlIGNvbmZpZ1xyXG4gICAqICovXHJcbiAgdml0ZUJhc2VQYXRoOiAnLi8nLFxyXG5cclxuICAvKlxyXG4gICAqIGkxOG4gc2V0dGluZyBkZWZhdWx0IGxhbmd1YWdlXHJcbiAgICogZW4vemhcclxuICAgKiAqL1xyXG4gIGRlZmF1bHRMYW5ndWFnZTogJ2VuJyxcclxuICAvKlxyXG4gICAqICBkZWZhdWx0IHRoZW1lXHJcbiAgICogYmFzZS10aGVtZS9saWdodGluZy10aGVtZS9kYXJrLXRoZW1lXHJcbiAgICogKi9cclxuICBkZWZhdWx0VGhlbWU6ICdiYXNlLXRoZW1lJyxcclxuICAvKlxyXG4gICAqIHNldHRpbmcgZGVmYXVsdCBkZWZhdWx0U2l6ZVxyXG4gICAqIGxhcmdlIC8gZGVmYXVsdCAvc21hbGxcclxuICAgKiAqL1xyXG4gIGRlZmF1bHRTaXplOiAnc21hbGwnLFxyXG4gIC8qXHJcbiAgICogdml0ZS5jb25maWcuanMgYmFzZSBjb25maWdcclxuICAgKiBzdWNoIGFzXHJcbiAgICogKi9cclxuICBwbGF0Zm9ybUlkOiAyLFxyXG5cclxuICAvL2xvZ2luIGluZm9cclxuICByZW1lbWJlck1lOiB0cnVlLFxyXG5cclxuICB1c2VybmFtZTogJ2FkbWluJyxcclxuXHJcbiAgcGFzc3dvcmQ6ICc2NjY2NjYnXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZ2l0Y29kZVxcXFxnaXRodWJcXFxcbG93LWNvZGUtcGxhdGZvcm1cXFxcc3JjXFxcXHBsdWdpbnNcXFxcdml0ZS1wbHVnaW4tc2V0dXAtZXh0ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnaXRjb2RlXFxcXGdpdGh1YlxcXFxsb3ctY29kZS1wbGF0Zm9ybVxcXFxzcmNcXFxccGx1Z2luc1xcXFx2aXRlLXBsdWdpbi1zZXR1cC1leHRlbmRcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdGNvZGUvZ2l0aHViL2xvdy1jb2RlLXBsYXRmb3JtL3NyYy9wbHVnaW5zL3ZpdGUtcGx1Z2luLXNldHVwLWV4dGVuZC9pbmRleC50c1wiO2ltcG9ydCB7IHBhcnNlIH0gZnJvbSAnQHZ1ZS9jb21waWxlci1zZmMnXHJcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ2VqcydcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5leHBvcnQgZGVmYXVsdCAoeyBpbmplY3QgfSk6IFBsdWdpbiA9PiB7XHJcbiAgLy8gbGV0IHZpdGVDb25maWdcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3ZpdGUtcGx1Z2luLXNldHVwLWV4dGVuZCcsXHJcbiAgICBlbmZvcmNlOiAncHJlJyxcclxuICAgIC8vIGNvbmZpZ1Jlc29sdmVkKHJlc29sdmVkQ29uZmlnKSB7XHJcbiAgICAvLyAgIHZpdGVDb25maWcgPSByZXNvbHZlZENvbmZpZ1xyXG4gICAgLy8gfSxcclxuICAgIGFzeW5jIHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XHJcbiAgICAgIHJldHVybiAgcmVuZGVyKGh0bWwsIHsgLi4uaW5qZWN0IH0pXHJcbiAgICB9LFxyXG4gICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XHJcbiAgICAgIGlmICgvXFwudnVlJC8udGVzdChpZCkpIHtcclxuICAgICAgICBjb25zdCB7IGRlc2NyaXB0b3IgfSA9IHBhcnNlKGNvZGUpXHJcbiAgICAgICAgaWYgKCFkZXNjcmlwdG9yPy5zY3JpcHRTZXR1cD8uc2V0dXApIHtcclxuICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGF0dHJzPWRlc2NyaXB0b3Iuc2NyaXB0U2V0dXA/LmF0dHJzXHJcbiAgICAgICAgLy9cdUZGMDhzZXR1cFx1RkYwOVx1NkNFOFx1NTE2NVx1NEVFM1x1NzgwMVxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhhdHRycykuaW5jbHVkZXMoXCJpbmplY3RDb2RlXCIpKSB7XHJcbiAgICAgICAgICBjb25zdCBsYXN0SW5kZXg9Y29kZS5sYXN0SW5kZXhPZihcIjwvc2NyaXB0PlwiKVxyXG4gICAgICAgICAgY29kZSA9Y29kZS5zbGljZSgwLCBsYXN0SW5kZXgpK2luc2VydEhlYWRTZXR1cENvZGUoKStjb2RlLnNsaWNlKGxhc3RJbmRleClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgeyBsYW5nLCBuYW1lIH0gPSBkZXNjcmlwdG9yLnNjcmlwdFNldHVwPy5hdHRycyB8fCB7fVxyXG4gICAgICAgIGNvbnN0IGRpbGxTdHIgPSBoZWFkU3RyaW5nKGxhbmcsIG5hbWUpXHJcbiAgICAgICAgY29kZSArPSBkaWxsU3RyXHJcbiAgICAgICAgcmV0dXJuIGNvZGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaGVhZFN0cmluZyA9IChsYW5nLCBuYW1lKSA9PiB7XHJcbiAgcmV0dXJuIGA8c2NyaXB0ICR7bGFuZyA/IGBsYW5nPVwiJHtsYW5nfVwiYCA6ICcnfT5cclxuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50IH0gZnJvbSAndnVlJ1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xyXG4gICR7bmFtZSA/IGBuYW1lOiBcIiR7bmFtZX1cIixgIDogJyd9XHJcbn0pXHJcbjwvc2NyaXB0PlxcbmBcclxufVxyXG5cclxuY29uc3QgaW5zZXJ0SGVhZFNldHVwQ29kZT0oKT0+e1xyXG4gIHJldHVybmBcclxuICAgIGNvbnN0IGluc3RhbmNlPWdldEN1cnJlbnRJbnN0YW5jZSgpXHJcbiAgICBsZXQgdGhhdD1udWxsXHJcbiAgICBsZXQgY3R4PW51bGxcclxuICAgIG9uQmVmb3JlTW91bnQoKCk9PntcclxuICAgICAgY3R4PWluc3RhbmNlLmN0eCBcclxuICAgICAgdGhhdD1pbnN0YW5jZS5jdHguJC5zZXR1cFN0YXRlXHJcbiAgICB9KVxyXG4gIGBcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1TLFNBQVMsZUFBZTtBQUMzVCxTQUFTLG9CQUE2QjtBQUN0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
