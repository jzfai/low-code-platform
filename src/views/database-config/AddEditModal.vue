
<template>
  <!-- 添加或修改配置对话框 -->
  <el-dialog :close-on-press-escape="false" :close-on-click-modal="false"
             :destroy-on-close="true" v-model="open" :title="title" width="550px" append-to-body @close="cancel">
    <el-form ref="databaseConfigRef" :model="addEditForm" label-width="120px">
      <el-form-item label="数据库名" prop="name" :rules="formRules.isNotNull('数据库名不能为空')">
        <el-input v-model="addEditForm.name" class="wi-250px" placeholder="数据库名"/>
      </el-form-item>
      <el-form-item label="用户名" prop="userName" :rules="formRules.isNotNull('用户名不能为空')">
        <el-input v-model="addEditForm.userName" class="wi-250px" placeholder="用户名"/>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="formRules.isNotNull('密码不能为空')">
        <el-input v-model="addEditForm.password" class="wi-250px" placeholder="密码"/>
      </el-form-item>
      <el-form-item label="数据库类型" prop="type" :rules="formRules.isNotNull('请选择数据库类型')">
        <el-select v-model="addEditForm.type" placeholder="请选择数据库类型"  class="wi-250px">
          <el-option :key="1"  label="mysql" value="1"/>
          <el-option :key="2"  label="mongo" value="2"/>
          <el-option :key="3"  label="starrocks" value="3"/>
          <el-option :key="4"  label="clickhouse" value="4"/>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="url" :rules="formRules.isNotNull('地址不能为空')">
        <el-input v-model="addEditForm.url" class="wi-250px" placeholder="地址"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :rules="formRules.isNull('备注不能为空')">
        <el-input
            v-model="addEditForm.remark"
            type="textarea"
            maxlength="100"
            show-word-limit="show-word-limit"
            resize="none"
            clearable="clearable"
            class="wi-250px"
            placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import {addDatabaseConfig, getDatabaseConfig, updateDatabaseConfig,
} from '@/api/databaseConfig'
//import { useDict } from '@/hooks/use-dict'
import { resetData,reshowData } from '@/hooks/use-common'

/**********props***********/
// const props = defineProps({
//   name: {
//     require: true,
//     default: "fai",
//     type:String,
//   },
// });

/**********ref***********/
const databaseConfigRef = ref()
const open = ref(false)
const title = ref('新增')

/**********reactive***********/
const addEditForm = reactive({
  id:"",
  name:"",
  userName:"",
  password:"",
  remark:"",
  type:"",
  url:"",
})

/****watch,computed******/

/**********mounted***********/
const emits = defineEmits(["getList"])
// eslint-disable-next-line camelcase
const formRules = useElement().formRules
//保存历史提交数据
const formString = JSON.stringify(addEditForm)
onMounted(() => {

})

/**********methods***********/
const showModal = (row) => {
  if (row.id) {
    getDatabaseConfig(row.id).then(({ data }) => {
      reshowData(addEditForm, data)
      //edit modal
      title.value = '编辑'
    })
  }
  title.value = '新增'
  open.value = true
}
const submitForm = () => {
  databaseConfigRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.id !== '') {
        updateDatabaseConfig(addEditForm).then(() => {
          ElMessage({message: '修改成功', type: 'success'})
          open.value = false
          emits('getList')
        })
      } else {
        addDatabaseConfig(addEditForm).then(() => {
          ElMessage({ message: '新增成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      }
    }
  })
}

/*******request*******/
/*******get,set,reset,clear*******/
//取消按钮
const cancel = () => {
  open.value = false
  resetData(addEditForm, formString)
}
/******defineExpose*******/
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
