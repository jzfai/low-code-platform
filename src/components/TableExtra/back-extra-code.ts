/*
 * ‘_’连接转为驼峰
 * */
import { getGuid } from '@/hooks/use-common'

export const changeDashToCase = (str) => {
  if (str.includes('_')) {
    const arr = str.split(`_`)
    const newArr = arr.map((ele, idx) => {
      return idx === 0 ? ele : ele[0].toUpperCase() + ele.slice(1)
    })
    return newArr.join(``)
  } else {
    return str
  }
}

//判断是否是selectType
export const isSelectType = (desc) => {
  if (desc) {
    return desc.includes('=') || desc.includes('1')
  } else {
    return false
  }
}

//首字母转大写和_转驼峰
export const changeDashToCaseAndFirstWord = (str) => {
  if (str) {
    let changeStr = ``
    if (str.includes('_')) {
      const arr = str.split(`_`)
      const newArr = arr.map((ele, idx) => {
        return idx === 0 ? ele : ele[0].toUpperCase() + ele.slice(1)
      })
      changeStr = newArr.join(``)
    }
    changeStr = changeStr || str
    return changeStr.slice(0, 1).toUpperCase() + changeStr.slice(1)
  } else {
    return str
  }
}
//首字母转大写
export const changeTheFirstWordToCase = (str) => {
  if (typeof str === 'string') {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }
  return str
}

//移除tb_,t_
export const removeTbOrT = (tableName) => {
  return tableName.replace(/^tb_/, '').replace(/^t_/, '')
}
//change to case
export const changeWordToCase = (str) => {
  let changeStr = ``
  if (str.includes('-')) {
    const arr = str.split(`-`)
    const newArr = arr.map((ele, idx) => {
      return idx === 0 ? ele : ele[0].toUpperCase() + ele.slice(1)
    })
    changeStr = newArr.join(``).slice(0, 1).toUpperCase() + changeStr.slice(1)
  } else {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }
  return changeStr
}

/**
 * 类型映射
 * @param type 数据库类型
 * @return  java类型
 * @author 邝华
 * @date 2022/6/4 9:54
 */
export const tbTypeMapping = (type) => {
  // varchar,char,text,longText -->String
  // decimal->Double
  // int,bit,tinyint->Integer
  // bigInt->Long
  //datetime,timestamp->Date
  //Date->Object
  if ('varchar,char,text,longText'.includes(type)) {
    return 'String'
  } else if ('decimal'.includes(type)) {
    return 'Double'
  } else if ('int,bit,tinyint'.includes(type)) {
    return 'Integer'
  } else if ('bigint'.includes(type)) {
    return 'Long'
  } else if ('datetime,timestamp'.includes(type)) {
    return 'Date'
  } else if ('Date'.includes(type)) {
    return 'Date'
  } else {
    return `未知类型${type}`
  }
}

/**
 * searchTable组件类型
 * @return
 * @author 邝华
 * @date 2022/6/4 10:44
 */
export const searchTableComponentTypeArr = [
  { label: 'input', title: 'input' },
  { label: 'select', title: 'select' },
  { label: 'selectApi', title: 'selectApi' },
  { label: 'daterange', title: 'daterange' }
]

export const detailComponentTypeArr = [
  { label: 'input', title: 'input' },
  { label: 'image', title: 'image' }
]
/**
 * form组件类型
 * @return
 * @author 邝华
 * @date 2022/6/4 10:44
 */
export const formComponentTypeArr = [
  { label: 'input', title: 'input' },
  { label: 'textarea', title: 'textarea' },
  { label: 'select', title: 'select' },
  { label: 'selectApi', title: 'selectApi' },
  { label: 'radio', title: 'radio' },
  { label: 'checkbox', title: 'checkbox' },
  { label: 'switch', title: 'switch' },
  { label: 'daterange', title: 'daterange' },
  { label: 'uploadFile', title: 'uploadFile' },
  { label: 'uploadImage', title: 'uploadImage' }
]

//校验规则
export const ruleMapping = [
  { key: 'notValid', label: '空规则' },
  // { key: 'isNotNull', label: '必填' },
  { key: 'zeroInt', label: '整数' },
  { key: 'upZeroInt', label: '大于O整数' },
  { key: 'email', label: '邮箱' },
  { key: 'idCard', label: '身份证' },
  { key: 'phone', label: '手机号' }
]

/**
 * 组件类型映射
 */
export const componentTypeMapping = (columnName, desc) => {
  //select
  if (isSelectType(desc)) {
    return 'select'
  }
  //datetime
  if (desc?.includes('时间') || columnName?.includes('time') || columnName?.includes('date')) {
    return 'daterange'
  }
  //default input
  return 'input'
}

//split the comment  to enum  ,  the stander for comment is 标准格式:1=大于短信,2=阿里短信
export const splitTheOptionArr = (string) => {
  if (isSelectType(string)) {
    let tsArr = string.split(',')
    tsArr = tsArr.map((mfItem) => {
      return mfItem.replace(/[\r\n]/g, '').replace(/\\ +/g, '')
    })
    return tsArr.map((mItem) => {
      const splitArr = mItem.split('=')
      return {
        value: splitArr[0],
        label: splitArr[1]
      }
    })
  } else {
    return []
  }
}

/*
 * search-table
 * extraItemGenerator 生成额外字段
 * */
export const setItemDefaultValue = (fItem) => {
  //base converse
  fItem.fieldFirstWordCase = changeTheFirstWordToCase(changeDashToCase(fItem.field))
  fItem.componentType = componentTypeMapping(fItem.field, fItem.desc)
  fItem.width = 150
  fItem.rule = 'notValid'
  //select
  if (isSelectType(fItem.desc)) {
    const descArr = fItem.desc.split(':')
    fItem.optionDataArr = splitTheOptionArr(descArr[1])
    fItem.desc = descArr[0]
    fItem.api = ''
    fItem.method = 'get'
    fItem.labelKey = 'name'
    fItem.valueKey = 'id'
  }
  //switch设置
  if (fItem.componentType === 'switch') {
    const keyArr = fItem.optionData.split(':')
    keyArr.forEach((fsItem) => {
      const keyArrObjArr = fsItem.split('=')
      fItem.activeValue = keyArrObjArr[0]
      fItem.inactiveValue = keyArrObjArr[1]
    })
  } else {
    fItem.optionDataArr = splitTheOptionArr(fItem.optionData)
  }
  //设置唯一的id用于拖拽排序等
  fItem.id = getGuid()
  return fItem
}

/*
 * search-table
 * extraItemGenerator 生成额外字段
 * */
export const extraItemGeneratorForMybitsPlus = (fItem) => {
  fItem.field = changeDashToCase(fItem.columnName) //_转驼峰
  fItem.fieldCase = changeDashToCaseAndFirstWord(fItem.columnName) //_转驼峰
  fItem.desc = fItem.columnComment
  // fItem.originField = fItem.columnName
  fItem.type = tbTypeMapping(fItem.dataType) //数据库和java中的类型做映射
  fItem.componentType = componentTypeMapping(fItem.field, fItem.columnComment) //数据库和前端控件中的类型做映射
  fItem.value = 'value'
  fItem.label = 'label'
  fItem.children = 'children'
  fItem.isNotShowSwagger = 'false'
  fItem.isNeedInput = 'false'
  //api
  fItem.api = ''
  fItem.method = 'get'
  fItem.labelKey = 'name'
  fItem.valueKey = 'id'
  //select
  if (isSelectType(fItem.desc)) {
    const descArr = fItem.desc.split(':')
    fItem.optionDataArr = splitTheOptionArr(descArr[1])
    fItem.desc = descArr[0]
    fItem.api = ''
    fItem.method = 'get'
    fItem.labelKey = 'name'
    fItem.valueKey = 'id'
  }
  //switch设置
  if (fItem.componentType === 'switch') {
    const keyArr = fItem.optionData.split(':')
    keyArr.forEach((fsItem) => {
      const keyArrObjArr = fsItem.split('=')
      fItem.activeValue = keyArrObjArr[0]
      fItem.inactiveValue = keyArrObjArr[1]
    })
  } else {
    fItem.optionDataArr = splitTheOptionArr(fItem.optionData)
  }
  return fItem
}
