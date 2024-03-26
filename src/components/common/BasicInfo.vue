<template>
  <!--项目和作者信息配置-->
  <FoldingCard title="基础信息配置">
    <div class="mb-10px">
      <el-form-item label="选择回显配置" label-position="left">
        <el-select v-model="chooseTmp" filterable placeholder="选择回显配置" class="wi-300px">
          <el-option
              v-for="item in configList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click="configChoose(item)"
          />
        </el-select>
      </el-form-item>
    </div>
    <el-form ref="refForm" label-width="120px" :inline="true" :model="basicConfig" :rules="formRules" class="pr-50px">

      <el-form-item label="作者" prop="author" :rules="formRules.isNotNull('不能为空')" label-position="left">
        <el-input v-model="basicConfig.author" placeholder="作者"/>
      </el-form-item>
      <div v-if="basicType===1">
        <el-form-item label="包名" prop="packageName" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="basicConfig.packageName" class="w-200px" placeholder="包名"/>
        </el-form-item>
        <el-form-item
            label="基础名" prop="basicName" :rules="formRules.isNotNull('基础名不能为空')"
            label-position="left">
          <el-input v-model="basicConfig.basicName" class="w-200px" placeholder="基础名"/>
        </el-form-item>

        <el-form-item
            label="基础名注释" prop="packageName" :rules="formRules.isNotNull('基础名注释不能为空')"
            label-position="left">
          <el-input v-model="basicConfig.basicNameDesc" class="w-200px" placeholder="基础名注释"/>
        </el-form-item>
      </div>


      <div v-if="basicType===2">
        <!--前端 -->
        <el-form-item label="生成的api文件名" prop="apiFileName" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="basicConfig.apiFileName" placeholder="生成的api文件名" class="wi-300px"/>
        </el-form-item>
        <el-form-item label="路由父路径" prop="routerParentDir" :rules="formRules.isNotNull('不能为空')" label-position="left">
          <el-input v-model="basicConfig.routerParentDir" placeholder="路由父路径" class="wi-300px"/>
        </el-form-item>
        <el-form-item label="modalName" prop="modalName"  label-position="left">
          <el-input v-model="basicConfig.modalName" placeholder="modalName" class="wi-300px"/>
        </el-form-item>
      </div>
    </el-form>
  </FoldingCard>
</template>


<script setup lang="ts" injectCode>

/*基础配置*/
import {changeTheFirstWordToCase} from "./back-extra-code.js";
import {changeDashToCase, changeDashToCaseAndFirstWord} from "@/components/TableExtra/front-extra-code";
const {formRules} = useElement()

const props = defineProps({
  //类型1 后端，2.前端，3.sql
  basicType: {
    require: true,
    default: 1,
    type:Number,
  },
});

/**********ref***********/
const configList: any = ref([])
/**********reactive***********/
const basicConfig = reactive({
  author: '',
  packageName: '',
  basicName: '',
  basicNameCase: '',
  basicNameDesc: '',
  dateTime: '',
  //前端
  apiFileName: '',
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
  getSaveTmp()
})

/**********methods***********/
const getData = ()=>{
  basicConfig.dateTime = getCurrentTime()

  //转换基础配置
  basicConfig.apiFileNameDash = changeDashToCase(basicConfig.apiFileName)
  basicConfig.apiFileNameFirstCase = changeDashToCaseAndFirstWord(basicConfig.apiFileName)
  basicConfig.basicNameCase = changeTheFirstWordToCase(basicConfig.basicName)
  return basicConfig
}

const setData=(data)=>{
  copyReactive(basicConfig,data)
}
const useAttr:any= useAttrs();
const configChoose=(item)=>{
  useAttr.setData(item)
}

/**********request***********/
const getSaveTmp = () => {
  const reqConfig = {
    url: '/generator/configSave/listPage',
    method: 'get',
    bfLoading: true,
    data: {pageSize: 50, pageNum: 1, name: pageId}
  }
  axiosReq(reqConfig).then(({data}) => {
    configList.value = data
    //回显第一个元素
    for (const fItem of configList.value) {
      if (fItem.name.includes(pageId)) {
        chooseTmp.value=fItem.id;
        useAttr.setData(fItem)
        return
      }
    }
  })
}
/******defineExpose*******/
defineExpose({getData,setData,getSaveTmp})
</script>

<style scoped lang="scss">

</style>
