//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq=(query)=> {
//查询列表
  return request({
    url: 'databaseConfig/listPage',
    method: 'post',
    data: query
  })
}

//删除
export const deleteReq=(id)=> {
  return request({
    url: `databaseConfig/deleteById`,
    params:{id},
    method: 'delete',
  })
}

//批量删除
export const multiDeleteReq=(ids)=> {
  return request({
    url: `databaseConfig/deleteByIds`,
    data:ids,
    method: 'delete',
  })
}



/**
 * 新增编辑页面接口
 *DatabaseConfig新增
 */
export const addDatabaseConfig = (data) => {
  return request({
    url:`databaseConfig`,
    data,
    method: 'post'
  })
}

/**
 *DatabaseConfig更新
 @param {*} data
 */
export const updateDatabaseConfig = (data) => {
  return request({
    url:`databaseConfig`,
    method: 'put',
    data
  })
}

export const flushDatabaseConfig = (data) => {
  return request({
    url:`basis-func/dataBase/flushAllSchema`,
    method: 'post',
    data
  })
}

/**
 *DatabaseConfig详情
 * @param {*} data json数据
 */
export const getDatabaseConfig = (id) => {
  return request({
    url:`databaseConfig/${id}`,
    method: 'get'
  })
}










