/*
 * ‘_’连接转为驼峰
 * */

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
  return tableName.replace('tb_', '').replace('t_', '')
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






/*
 * search-table
 * extraItemGenerator 生成额外字段
 * */
export const setItemDefaultValue = (fItem) => {
  console.log(fItem);
  //base converse
  fItem.fieldAndCase = changeTheFirstWordToCase(changeDashToCase(fItem.field))
  fItem.fieldAs = fItem.field
  //设置唯一的id用于拖拽排序等
  fItem.id=getGuid()
  return fItem
}
