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
      <el-form-item label="包名" prop="packageName" :rules="formRules.isNotNull('不能为空')" label-position="left">
        <el-input v-model="basicConfig.packageName" class="w-200px" placeholder="包名"/>
      </el-form-item>
      <el-form-item
label="基础api名" prop="packageName" :rules="formRules.isNotNull('基础api名不能为空')"
                    label-position="left">
        <el-input v-model="basicConfig.basicClassName" class="w-200px" placeholder="基础api名"/>
      </el-form-item>

    </el-form>
  </FoldingCard>
</template>


<script setup lang="ts" injectCode>
/*基础配置*/
import {changeTheFirstWordToCase} from "@/views/sql/back-extra-code.js";
const {formRules} = useElement()
/**********ref***********/
const configList: any = ref([])
/**********reactive***********/
const basicConfig = reactive({
  author: '',
  packageName: '',
  basicClassName: '',
  basicClassNameCase: '',
  basicClassDesc: '',
  dateTime: ''
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
  basicConfig.basicClassNameCase = changeTheFirstWordToCase(basicConfig.basicClassName)
  return basicConfig
}

const setData=(generatorConfig)=>{
  copyReactive(basicConfig,generatorConfig.basicConfig)
}

const configChoose=(item)=>{
  ctx.$parent.setData(item)
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
        ctx.$parent.setData(fItem)
        return
      }
    }
  })
}
/******defineExpose*******/
defineExpose({getData,setData})
</script>


<style scoped lang="scss">

</style>
