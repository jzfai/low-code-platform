<template>
  <div id="CustomUploadVms">
    <div class="imgUpContainer rowSS">
      <!--图片列表-->
      <div class="imgShowList rowSS">
        <div v-for="(item, index) in uploadFileList" :key="index" class="imgItem">
          <!--右上角删除按钮-->
          <el-icon class="imgStyle"><Document class="imgStyle" /></el-icon>
          <el-icon class="rightDel" @click="deleteFile(index)"><CloseBold /></el-icon>
          <div class="imageName">{{ item.name }}</div>
        </div>
      </div>
      <!--图片上传-->
      <div class="rowSE">
        <div class="packingImageContainer columnCC">
          <el-icon class="packingIconStyle"><Plus /></el-icon>
          <input
            ref="refSettingFile"
            type="file"
            class="inputStyle"
            accept=".vm, .vue, .java, .py, .js, .ts"
            multiple
            @change="fileOnChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloseBold, Document, Plus } from '@element-plus/icons-vue'
const uploadFileList:any = ref([])

const fileOnChange = () => {
  const fileObj = refSettingFile.value.files
  Object.values(fileObj).forEach((fItem: any) => {
    if (!findArrObjByKey(uploadFileList.value, 'name', fItem.name)) {
      uploadFileList.value.push(fItem)
    }
  })
  refSettingFile.value.value = ''
}
//返回数据给父元素
const returnData = () => {
  return uploadFileList.value
}

const deleteFile = (index) => {
  uploadFileList.value.splice(index, 1)
}
const refSettingFile:any = ref()
defineExpose({ returnData })
</script>

<style scoped lang="scss">
$packingWidth: 100px;
$borderRadius: 6px;
.imgUpContainer {
}
.imgShowList {
  .imgItem {
    margin-right: 6px;
    position: relative;
    .imgStyle {
      border-radius: $borderRadius;
      width: $packingWidth;
      height: $packingWidth;
    }
    .imageName {
      width: $packingWidth;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .rightDel {
      background-color: #eee;
      border-radius: 14px;
      position: absolute;
      font-size: 16px;
      top: 1px;
      right: 1px;
      cursor: pointer;
    }
    .rightDel:hover {
      background-color: #999;
    }
  }
}
//图片上传
.packingImageContainer {
  position: relative;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: $borderRadius;
  box-sizing: border-box;
  width: $packingWidth;
  height: $packingWidth;
  cursor: pointer;

  .packingIconStyle {
    font-size: 30px;
  }
  .inputStyle {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: $packingWidth;
    height: $packingWidth;
  }
}
</style>
