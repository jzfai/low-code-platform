//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq=(query)=> {
//查询列表
  return request({
    url: '/generator/templateFileDetail/list',
    method: 'post',
    data: query
  })
}

//删除
export const deleteReq=(id)=> {
  return request({
    url: `/generator/templateFileDetail/${id}`,
    method: 'delete',
  })
}

//批量删除
export const multiDeleteReq=(id)=> {
  return request({
    url: `/generator/templateFileDetail/${id}`,
    method: 'delete',
  })
}



//模板下载
export const downloadTemplateReq=()=> {
  return request({
    url: ``,
    method: '${apiConfig.templateDownMethod}'
  })
}


/**
 * 新增编辑页面接口
 *TemplateFileDetail新增
 */
export const addTemplateFileDetail = (data) => {
  return request({
    url:`/generator/templateFileDetail`,
    data,
    method: 'post'
  })
}

/**
 *TemplateFileDetail更新
 @param {*} id 详情id
 */
export const updateTemplateFileDetail = (data) => {
  return request({
    url:`/generator/templateFileDetail`,
    method: 'put',
    data
  })
}

/**
 *TemplateFileDetail详情
 * @param {*} data json数据
 */
export const getTemplateFileDetail = (id) => {
  return request({
    url:`/generator/templateFileDetail/${id}`,
    method: 'get'
  })
}

/**
 *  模板id接口
 * @param {*} params
 */
export const templateIdReq = (data) => {
  return request({
    url:`/generator/templateFile/listPage`,
    data,
    method: 'get'
  })
}




/**
 *  复制文件
 * @param {*} params
 */
export const copyFileByFileId = (data) => {
  return request({
    url:`/generator/templateFile/copyFileByFileId`,
    params:data,
    method: 'post'
  })
}

