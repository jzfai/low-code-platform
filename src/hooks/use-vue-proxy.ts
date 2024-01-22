
//提供类似vue2this对象
export const copyRefAndReactive = (that,originData)=>{
  const currentKeyArr=Object.keys(that)
  Object.keys(originData).forEach(f=>{
    if (currentKeyArr.includes(f)) {
      that[f]=originData[f]
    }
  })
}
