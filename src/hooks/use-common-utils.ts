export const getWeek = () => {
  return `星期${'日一二三四五六'.charAt(new Date().getDay())}`
  // this.showDate=this.$momentMini(new Date()).format('YYYY年MM月DD日，')+str
}
/* 表单验证*/
// 匹配手机
export const mobilePhone = (str) => {
  const reg = /^0?1[0-9]{10}$/
  return reg.test(str)
}
/*
 * 传入一串num四个 一个空格
 * */
export const toSplitNumFor = (num) => {
  return num.replace(/(.{4})/g, '$1 ')
}


/*
 * 数组根据某个key进行分组
 * */
export  const arrGroupByKey=(arr, groupKey)=> {
  const map = {}
  for (const ai of arr) {
    // 将需要筛选的属性的值作为新对象的键，并且判断是否已经存在
    if (!map[ai[groupKey]]) {
      // 不存在的话就在map对象中创建一个属性的值作为键名，键值为空数组的新对象，并且把arr[i]放入
      map[ai[groupKey]] = [ai]
    } else {
      // 如果已经存在就直接把arr[i]放入
      map[ai[groupKey]].push(ai)
    }
  }
  return map
}

/* 常用数组操作*/
/*
 * 删除数组中的指定元素
 * arrItem 数组的index下标
 * return 删除后的数组
 * */

/*
 *  数组去重
 *  arr：要去重的数组
 *  return 去重后的数组
 * */
export const arrToRepeat = (arr) => {
  return arr.filter((ele, index, thisArr) => {
    // 因为indexOf返回元素出现的第一个index位置,如果有重复的话那么他的位置永远是第一次出现的index,这就与他本身的index不相符,则删掉.
    return thisArr.indexOf(ele) === index
  })
}
/*
 * 删除arrObj某一项 根据objKey中的key的值等于value的值
 * arrObj: 数组对象
 * objKey：arrObj中对象的某一个key名称
 * return: arrObj删除过后的数组
 * */
export const deleteArrObjByKey = (arrObj, objKey, value) => {
  //foreach splice
  //for substring  slice 不改变原数组
  arrObj.splice(
    arrObj.findIndex((item) => item[objKey] === value),
    1
  )
  return arrObj
}
/*
 * 查找arrObj某一项 根据objKey中的值
 * arrObj: 数组对象
 * objKey：arrObj中对象的某一个key名称
 * return: arrObj查找 过后的数组
 * */
export const findArrObjByKey = (arrObj, objKey, value) => {
  return arrObj[arrObj.findIndex((item) => item[objKey] == value)]
}
