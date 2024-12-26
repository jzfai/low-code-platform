<template>
  <!--项目和作者信息配置-->
  <FoldingCard title="基础信息配置">
    <div class="mb-10px rowSS">
      <el-form-item label="选择回显配置" label-position="left">
        <el-select
            v-model="chooseTmp"
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
            filterable placeholder="选择回显配置" class="wi-300px">
          <el-option
              v-for="item in configList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click="configChoose(item)"
          />
        </el-select>
      </el-form-item>
      <el-button  type="warning" class="ml-2" @click="clearAllConfig">清空所有配置</el-button>
    </div>
    <el-form ref="refForm" label-width="100px" :inline="true" :model="basicConfig" :rules="formRules">
      <el-form-item label="作者" prop="author"  label-width="50px" :rules="formRules.isNotNull('不能为空')" label-position="left">
        <el-input v-model="basicConfig.author" disabled placeholder="作者"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email"  :rules="formRules.isNotNull('不能为空')" label-position="left">
        <el-input v-model="basicConfig.email" disabled placeholder="邮箱"/>
      </el-form-item>
      <el-form-item v-if="showGeneralProject" label="是否生成项目" prop="isGeneratorProject"  label-position="left">
        <el-switch
            v-model="basicConfig.isGeneratorProject"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
        />
      </el-form-item>
      <div v-if="basicType===1">
<!--        <el-form-item-->
<!--            label="基础名" prop="basicName" :rules="formRules.isNotNull('基础名不能为空')"-->
<!--            label-position="left">-->
<!--          <el-input v-model="basicConfig.basicName" class="w-200px" placeholder="基础名"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item-->
<!--            label="基础名注释" prop="basicNameDesc" :rules="formRules.isNotNull('基础名注释不能为空')"-->
<!--            label-position="left">-->
<!--          <el-input v-model="basicConfig.basicNameDesc" class="w-200px" placeholder="基础名注释"/>-->
<!--        </el-form-item>-->

      </div>
<!--      <div v-if="basicType===2">-->
<!--        &lt;!&ndash;前端 &ndash;&gt;-->
<!--        <el-form-item label="生成的api文件名" prop="apiFileName" :rules="formRules.isNotNull('不能为空')" label-position="left">-->
<!--          <el-input v-model="basicConfig.apiFileName" placeholder="生成的api文件名" class="wi-300px"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="路由父路径" prop="routerParentDir" :rules="formRules.isNotNull('不能为空')" label-position="left">-->
<!--          <el-input v-model="basicConfig.routerParentDir" placeholder="路由父路径" class="wi-300px"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="modalName" prop="modalName"  label-position="left">-->
<!--          <el-input v-model="basicConfig.modalName" placeholder="modalName" class="wi-300px"/>-->
<!--        </el-form-item>-->
<!--      </div>-->
    </el-form>
  </FoldingCard>

</template>

<script setup lang="ts" injectCode>
/*基础配置*/
import {changeDashToCase, changeDashToCaseAndFirstWord} from "@/components/TableExtra/front-extra-code";
import {useBasicStore} from "@/store/basic";
import {getConfigSaveDetail, getSaveTmpReq} from "@/api/basic";
const {formRules} = useElement()
const props = defineProps({
  //类型1 后端，2.前端，3.sql
  basicType: {
    require: true,
    default: 1,
    type:Number,
  },
  showGeneralProject:{
    default: false,
    type:Boolean,
  }
});
/**********ref***********/
const configList: any = ref([])
/**********reactive***********/
const basicConfig = reactive({
  author: '',
  isGeneratorProject: true,
  dateTime: '',
  //前端
  apiFileName: '',
  email: '',
  modalName: '',
  apiFileNameFirstCase: '',
  apiFileNameDash: '',
  routerParentDir: '',
})
/****watch,computed******/
const chooseTmp = ref()
/**********mounted***********/
const route = useRoute();
const pageId:any=route.name

onMounted(()=>{
  //设置时间
  getSaveTmp(pageId)
  setInitUserInfo()
})

const loading = ref(false)
//查询方法
const remoteMethod = (query: string) => {
  if (query) {
    loading.value=true
    getSaveTmp(query)
  }
}

//清空所有配置
const clearAllConfig=()=>{
  useAttr.clearAllData()
}

const setInitUserInfo=()=>{
  //初始化设置用户值
  const {userInfo}:any = useBasicStore()
  basicConfig.author=userInfo.nickName
  basicConfig.email=userInfo.email
}

/**********methods***********/
const getData = ()=>{
  basicConfig.dateTime = getCurrentTime()
  //转换基础配置
  basicConfig.apiFileNameDash = changeDashToCase(basicConfig.apiFileName)
  basicConfig.apiFileNameFirstCase = changeDashToCaseAndFirstWord(basicConfig.apiFileName)
  return basicConfig
}

//清空数据
const resetData=()=>{
  chooseTmp.value="";
}

const setData=(data)=>{
  copyReactive(basicConfig,data)
  setInitUserInfo()
}
const useAttr:any= useAttrs();
const configChoose=(item)=>{
  getConfigSaveDetail(item.id).then(({data})=>{
    useAttr.setData(data)
  })

}

/**********request***********/
const getSaveTmp = (pageId) => {
  getSaveTmpReq({pageSize: 50, pageNum: 1, name: pageId}).then(({data}) => {
    configList.value = data
    loading.value=false
    //回显第一个元素
    for (const fItem of configList.value) {
      if (fItem.name.includes(pageId)) {
        chooseTmp.value=fItem.id;
        getConfigSaveDetail(fItem.id).then(({data})=>{
          useAttr.setData(data)
        })
        return
      }
    }
  })
}


/******defineExpose*******/
defineExpose({getData,setData,getSaveTmp,resetData})
</script>

<style scoped lang="scss">

</style>
