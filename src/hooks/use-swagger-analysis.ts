//swagger2文档处理函数
/**
 * @data  请求文档的数据
 */
export const dillSwaggerToUse = (data) => {
  const { paths, definitions } = data
  const interObj = {}
  Object.keys(paths).forEach((pathKey) => {
    //inputMethod 如果不填写这默认第一个
    const method = Object.keys(paths[pathKey]).at(-1)
    //@ts-ignore
    const pathElement = paths[pathKey][method]
    const obj = {}
    //方法注释
    obj['summary'] = pathElement.summary
    //请求参数
    if (pathElement.parameters) {
      obj['requestParams'] = dillParameters(pathElement.parameters, definitions)
    } else {
      obj['requestParams'] = dillRequestBody(pathElement.requestBody, definitions)
    }
    //响应参数
    obj['responses'] = dillResponses(pathElement.responses, definitions)
    interObj[pathKey] = obj
  })
  return interObj
}
/**
 *
 * @param path 接口路径
 * @param method 方法
 * @data  请求文档的数据
 */
//@ts-ignore
export const dillSwaggerByParams = (data, path, method) => {
  const { paths, definitions } = data
  const pathElement = paths[path][method] || paths[path].at(-1)
  const obj = {}
  //方法注释
  obj['summary'] = pathElement.summary
  //请求参数
  if (pathElement.parameters) {
    obj['requestParams'] = dillParameters(pathElement.parameters, definitions)
  } else {
    obj['requestParams'] = dillRequestBody(pathElement.requestBody, definitions)
  }
  //响应参数
  obj['responses'] = dillResponses(pathElement.responses, definitions)
  return obj
}

export const dillRequestBody = (requestBody, definitions) => {
  const paramsArr: any = []
  //取schema
  if (requestBody?.content['application/json']?.schema?.$ref) {
    const define = requestBody.content['application/json']?.schema?.$ref?.replace('#/definitions/', '')
    const schemasItem = definitions[define].properties
    const requiredKeys = definitions[define].required
    Object.keys(schemasItem).forEach((key) => {
      paramsArr.push({
        name: key,
        description: schemasItem[key].description,
        required: requiredKeys ? requiredKeys.includes(key) : false
      })
    })
  } else {
    //取key
    paramsArr.push(requestBody)
  }
  return paramsArr
}
export const dillParameters = (parameters, definitions) => {
  const paramsArr: any = []
  parameters?.forEach((paramItem) => {
    //取schema
    if (paramItem.schema?.$ref) {
      const define = paramItem.schema?.$ref?.replace('#/definitions/', '')
      if (!definitions[define]?.properties) {
        return []
      }
      const schemasItem = definitions[define].properties
      const requiredKeys = definitions[define].required
      Object.keys(schemasItem).forEach((key) => {
        paramsArr.push({
          name: key,
          description: schemasItem[key].description,
          required: requiredKeys ? requiredKeys.includes(key) : false
        })
      })
    } else {
      //取key
      paramsArr.push({ name: paramItem.name, description: paramItem.description, required: paramItem.required })
    }
  })
  return paramsArr
}
export const dillResponses = (responses, definitions) => {
  const responsesArr: any = []
  if (responses[200]?.schema?.$ref) {
    const define = responses[200].schema?.$ref?.replace('#/definitions/', '')

    if (!definitions[define]?.properties) {
      return []
    }

    const schemas = definitions[define].properties
    Object.keys(schemas).forEach((key) => {
      if (schemas[key]?.items?.$ref || schemas[key]?.$ref) {
        const define = schemas[key]?.items?.$ref.replace('#/definitions/', '')
        const schemasItem = definitions[define].properties
        const requiredKeys = definitions[define].required
        if (schemasItem) {
          Object.keys(schemasItem).forEach((key) => {
            responsesArr.push({
              name: key,
              description: schemasItem[key].description,
              required: requiredKeys ? requiredKeys.includes(key) : false
            })
          })
        }
      }
    })
  } else {
    //取key
    responsesArr.push(responses[200])
  }
  return responsesArr
}

/*swagger3处理函数*/
/**
 * @data  请求文档的数据
 */
export const dillSwagger3ToUse = (data) => {
  const { paths, components } = data
  const interObj = {}
  Object.keys(paths).forEach((pathKey) => {
    //inputMethod 如果不填写这默认第一个
    const method = Object.keys(paths[pathKey]).at(-1)
    //@ts-ignore
    const pathElement = paths[pathKey][method]
    const obj = {}
    //方法注释
    obj['summary'] = pathElement.summary
    obj['method'] = method
    //请求参数
    if (pathElement.parameters) {
      obj['requestParams'] = dillParameters3(pathElement.parameters, components)
    } else {
      obj['requestParams'] = dillRequestBody3(pathElement.requestBody, components)
    }
    //响应参数
    obj['responses'] = dillResponses3(pathElement.responses, components)
    interObj[pathKey] = obj
  })
  return interObj
}
/**
 *
 * @param path 接口路径
 * @param method 方法
 * @data  请求文档的数据
 */
export const dillSwagger3ByParams = (data, path, method) => {
  const { paths, components } = data
  const pathElement = paths[path][method] || paths[path].at(-1)
  const obj = {}
  //方法注释
  obj['summary'] = pathElement.summary
  //请求参数
  if (pathElement.parameters) {
    obj['requestParams'] = dillParameters3(pathElement.parameters, components)
  } else {
    obj['requestParams'] = dillRequestBody3(pathElement.requestBody, components)
  }
  //响应参数
  obj['responses'] = dillResponses3(pathElement.responses, components)
  return obj
}
export const dillRequestBody3 = (requestBody, components) => {
  const paramsArr: any = []
  //取schema
  if (requestBody?.content['application/json']?.schema?.$ref) {
    const define = requestBody.content['application/json']?.schema?.$ref?.replace('#/components/schemas/', '')
    const schema = components.schemas[define]
    if (!schema?.properties) {
      return []
    }
    const schemasItem = schema.properties
    const requiredKeys = schema.required
    Object.keys(schemasItem).forEach((key) => {
      paramsArr.push({ name: key, description: schemasItem[key].description, required: requiredKeys?.includes(key) })
    })
  } else {
    //取key
    paramsArr.push(requestBody)
  }
  return paramsArr
}
export const dillParameters3 = (parameters, components) => {
  const paramsArr: any = []
  parameters?.forEach((paramItem) => {
    //取schema
    if (paramItem.schema?.$ref) {
      const define = paramItem.schema?.$ref?.replace('#/components/schemas/', '')
      const schemasItem = components.schemas[define].properties
      const requiredKeys = components.schemas[define].required
      Object.keys(schemasItem).forEach((key) => {
        paramsArr.push({ name: key, description: schemasItem[key].description, required: requiredKeys?.includes(key) })
      })
    } else {
      //取key
      paramsArr.push({ name: paramItem.name, description: paramItem.description, required: paramItem.required })
    }
  })
  return paramsArr
}
export const dillResponses3 = (responses, components) => {
  const responsesArr: any = []
  if (responses[200]?.content && responses[200].content['*/*']?.schema?.$ref) {
    const define = responses[200].content['*/*'].schema?.$ref?.replace('#/components/schemas/', '')
    const schemas = components.schemas[define].properties
    Object.keys(schemas).forEach((key) => {
      if (schemas[key]?.items?.$ref || schemas[key]?.$ref) {
        const define = schemas[key]?.items?.$ref.replace('#/components/schemas/', '')
        const schema = components.schemas[define]
        if (!schema?.properties) {
          return []
        }
        const schemasItem = schema.properties
        const requiredKeys = schema.required
        Object.keys(schemasItem).forEach((key) => {
          responsesArr.push({
            name: key,
            description: schemasItem[key].description,
            required: requiredKeys?.includes(key)
          })
        })
      }
    })
  } else {
    //取key
    responsesArr.push(responses[200])
  }
  return responsesArr
}
