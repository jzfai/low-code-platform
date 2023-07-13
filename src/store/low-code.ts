import { defineStore } from 'pinia'
import { langTitle } from '@/hooks/use-common'
import settings from '@/settings'
import { toggleHtmlClass } from '@/theme/utils'
import { i18n } from '@/lang'
export const useLowCodeStore = defineStore('LowCode', {
  state: () => {
    return {
      chooseTable:[]
    }
  },
  persist: {
    storage: localStorage,
    paths: []
  },
  actions: {

  }
})
