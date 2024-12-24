//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq = (query) => {
  //查询列表
  return request({
    url: '/system/dslConfig/listPage',
    method: 'get',
    data: query
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/dslConfig/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return request({
    url: `/system/dslConfig/${id}`,
    method: 'delete'
  })
}

//导出
export const exportReq = (reqConfig) => {
  return request({
    url: `/system/dslConfig/export`,
    responseType: 'blob',
    method: 'post',
    params: Object.assign(reqConfig, { responseType: 'blob' })
  })
}

/**
 * 新增编辑页面接口
 *DataSource新增
 */
export const addDataSource = (data) => {
  return request({
    url: `/system/dslConfig`,
    data,
    method: 'post'
  })
}

/**
 *DataSource更新
 @param {*} id 详情id
 */
export const updateDataSource = (data) => {
  return request({
    url: `/system/dslConfig`,
    method: 'put',
    data
  })
}

/**
 *DataSource详情
 * @param {*} data json数据
 */
export const getDataSource = (id) => {
  return request({
    url: `/system/dslConfig/${id}`,
    method: 'get'
  })
}
