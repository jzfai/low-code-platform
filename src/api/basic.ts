//查询列表页面接口
import request from '@/utils/axios-req'

export const getSaveTmpReq=(data)=> {
//查询列表
  return request({
    url: '/generator/configSave/listPage',
    method: 'get',
    bfLoading: true,
    data:data||{pageIndex:1,pageSize:20}
  })
}


//获取配置列表
export const getConfigSaveReq=(data)=> {
//查询列表
  return request({
    url: '/generator/configSave/listPage',
    method: 'get',
    bfLoading: true,
    data
  })
}

//获取配置详情
export const getConfigSaveDetail=(id)=> {
//查询列表
  return request({
    url: `/generator/configSave/${id}`,
    method: 'get',
    bfLoading: true
  })
}
