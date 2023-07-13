// // swagger2文档处理函数
// /**
//  * @data  请求文档的数据
//  */
// export const dillSwaggerToUse = (data: any) => {
//   const { paths, definitions } = data;
//   const interObj: any = {};
//   Object.keys(paths).forEach((pathKey) => {
//     // inputMethod 如果不填写这默认第一个
//     const method = Object.keys(paths[pathKey]).at(-1);
//     // @ts-ignore
//     const pathElement = paths[pathKey][method];
//     const obj: any = {};
//     // 方法注释
//     obj.summary = pathElement.summary;
//     obj.description = pathElement.description;
//     obj.tags = pathElement.tags;
//     obj.path = pathKey;
//     obj.method = method;
//     obj.group = pathElement.tags[0];
//     // 请求唯一id
//     obj.operationId = pathElement.operationId;
//     // 请求参数
//     if (pathElement.parameters) {
//       obj.requestParams = dillParameters(pathElement.parameters, definitions);
//     } else {
//       obj.requestBody = dillRequestBody(pathElement.requestBody, definitions);
//     }
//     // 响应参数
//     obj.responses = dillResponses(pathElement.responses, definitions);
//     interObj[pathKey] = obj;
//   });
//
//   //分组
//   return getArrayGroupByKey(Object.values(interObj), "group");
// };
//
// const getArrayGroupByKey=(originalArr, field)=> {
//   const tempArr:any = [];
//   const endData:any = [];
//   for (const element of originalArr) {
//     if (!tempArr.includes(element[field])) {
//       endData.push({
//         [field]: element[field],
//         data: [element]
//       });
//       tempArr.push(element[field]);
//     } else {
//       for (const endDatum of endData) {
//         if (endDatum[field] == element[field]) {
//           endDatum.data.push(element);
//           break;
//         }
//       }
//     }
//   }
//   return endData // 最终输出
// }
//
// /**
//  *
//  * @param path 接口路径
//  * @param method 方法
//  * @data  请求文档的数据
//  */
// // @ts-ignore
// export const dillSwaggerByParams = (data, path, method) => {
//   const { paths, definitions } = data;
//   const pathElement = paths[path][method] || paths[path].at(-1);
//   const obj: any = {};
//   // 方法注释
//   obj.summary = pathElement.summary;
//   // 请求唯一id
//   obj.operationId = pathElement.operationId;
//   // 请求参数
//   if (pathElement.parameters) {
//     obj.requestParams = dillParameters(pathElement.parameters, definitions);
//   } else {
//     obj.requestBody = dillRequestBody(pathElement.requestBody, definitions);
//   }
//   // 响应参数
//   obj.responses = dillResponses(pathElement.responses, definitions);
//   return obj;
// };
//
// export const dillRequestBody = (requestBody: any, definitions: any) => {
//   const paramsArr:any  = [];
//   // 取schema
//   if (requestBody?.content['application/json']?.schema?.$ref) {
//     const define = requestBody.content['application/json']?.schema?.$ref?.replace('#/definitions/', '');
//     const schemasItem = definitions[define].properties;
//     const requiredKeys = definitions[define].required;
//     Object.keys(schemasItem).forEach((key) => {
//       paramsArr.push({
//         name: key,
//         description: schemasItem[key].description,
//         required: requiredKeys ? requiredKeys.includes(key) : false,
//       });
//     });
//   } else {
//     // 取key
//     paramsArr.push(requestBody);
//   }
//   return paramsArr;
// };
// export const dillParameters = (parameters: any, definitions: any) => {
//   const paramsArr: any = [];
//   parameters?.forEach((paramItem: any) => {
//     // 取schema
//     if (paramItem.schema?.$ref) {
//       const define = paramItem.schema?.$ref?.replace('#/definitions/', '');
//       const schemasItem = definitions[define].properties;
//       const requiredKeys = definitions[define].required;
//       Object.keys(schemasItem).forEach((key) => {
//         paramsArr.push({
//           name: key,
//           description: schemasItem[key].description,
//           required: requiredKeys ? requiredKeys.includes(key) : false,
//         });
//       });
//     } else {
//       // 取key
//       paramsArr.push({ name: paramItem.name, description: paramItem.description, required: paramItem.required });
//     }
//   });
//   return paramsArr;
// };
// export const dillResponses = (responses: any, definitions: any) => {
//   let responsesArr:any  = [];
//   if (responses[200]?.schema?.$ref) {
//     const define = responses[200].schema?.$ref?.replace('#/definitions/', '');
//     const schemas = definitions[define];
//     responsesArr = getResponseObj(schemas, definitions, []);
//   } else {
//     // 取key
//     responsesArr.push(responses[200]);
//   }
//   return responsesArr;
// };
//
// /* swagger3处理函数*/
// /**
//  * @data  请求文档的数据
//  */
// export const dillSwagger3ToUse = (data: any) => {
//   const { paths, components } = data;
//   const interObj: any = {};
//   Object.keys(paths).forEach((pathKey) => {
//     // inputMethod 如果不填写这默认第一个
//     const method = Object.keys(paths[pathKey]).at(-1);
//     // @ts-ignore
//     const pathElement = paths[pathKey][method];
//     const obj: any = {};
//     // 方法注释
//     obj.summary = pathElement.summary;
//     // 请求唯一id
//     obj.operationId = pathElement.operationId;
//     // 请求参数
//     if (pathElement.parameters) {
//       obj.requestParams = dillParameters3(pathElement.parameters, components);
//     } else {
//       obj.requestBody = dillRequestBody3(pathElement.requestBody, components);
//     }
//     // 响应参数
//     obj.responses = dillResponses3(pathElement.responses, components);
//     interObj[pathKey] = obj;
//   });
//   return interObj;
// };
// /**
//  *
//  * @param path 接口路径
//  * @param method 方法
//  * @data  请求文档的数据
//  */
// export const dillSwagger3ByParams = (data: any, path: any, method: any) => {
//   const { paths, components } = data;
//   const pathElement = paths[path][method] || paths[path].at(-1);
//   const obj: any = {};
//   // 方法注释
//   obj.summary = pathElement.summary;
//   // 请求唯一id
//   obj.operationId = pathElement.operationId;
//   // 请求参数
//   if (pathElement.parameters) {
//     obj.requestBody = dillParameters3(pathElement.parameters, components);
//   } else {
//     obj.requestBody = dillRequestBody3(pathElement.requestBody, components);
//   }
//   // 响应参数
//   obj.responses = dillResponses3(pathElement.responses, components);
//   return obj;
// };
// export const dillRequestBody3 = (requestBody: any, components: any) => {
//   const paramsArr:any = [];
//   // 取schema
//   if (requestBody?.content['application/json']?.schema?.$ref) {
//     const define = requestBody.content['application/json']?.schema?.$ref?.replace('#/components/schemas/', '');
//     const schemasItem = components.schemas[define].properties;
//     const requiredKeys = components.schemas[define].required;
//     Object.keys(schemasItem).forEach((key) => {
//       paramsArr.push({ name: key, description: schemasItem[key].description, required: requiredKeys?.includes(key) });
//     });
//   } else {
//     // 取key
//     paramsArr.push(requestBody);
//   }
//   return paramsArr;
// };
// export const dillParameters3 = (parameters: any, components: any) => {
//   const paramsArr: any = [];
//   parameters?.forEach((paramItem: any) => {
//     // 取schema
//     if (paramItem.schema?.$ref) {
//       const define = paramItem.schema?.$ref?.replace('#/components/schemas/', '');
//       const schemasItem = components.schemas[define].properties;
//       const requiredKeys = components.schemas[define].required;
//       Object.keys(schemasItem).forEach((key) => {
//         paramsArr.push({ name: key, description: schemasItem[key].description, required: requiredKeys?.includes(key) });
//       });
//     } else {
//       // 取key
//       paramsArr.push({ name: paramItem.name, description: paramItem.description, required: paramItem.required });
//     }
//   });
//   return paramsArr;
// };
// export const dillResponses3 = (responses: any, components: any) => {
//   const responsesArr:any  = [];
//   if (responses[200]?.content && responses[200].content['*/*']?.schema?.$ref) {
//     const define = responses[200].content['*/*'].schema?.$ref?.replace('#/components/schemas/', '');
//     const schemas = components.schemas[define].properties;
//     Object.keys(schemas).forEach((key) => {
//       if (schemas[key]?.items?.$ref) {
//         const define = schemas[key]?.items?.$ref.replace('#/components/schemas/', '');
//         const schemasItem = components.schemas[define].properties;
//         const requiredKeys = components.schemas[define].required;
//         Object.keys(schemasItem).forEach((key) => {
//           responsesArr.push({
//             name: key,
//             description: schemasItem[key].description,
//             required: requiredKeys?.includes(key),
//           });
//         });
//       }
//     });
//   } else {
//     // 取key
//     responsesArr.push(responses[200]);
//   }
//   return responsesArr;
// };
//
// interface IResult {
//   name: String;
//   description: String;
//   childItem?: IResult[];
// }
//
// /**
//  *  递归解析swagger的response
//  * @param responseData 要被解析的数据源
//  * @param definitions  全量类
//  * @param originData   结果
//  * @returns
//  */
// const getResponseObj = (responseData: any, definitions: any, originData: IResult[] = []) => {
//   const { properties } = responseData;
//   const result: IResult[] = originData;
//   if (properties && !properties.data) {
//     Object.keys(properties).forEach((item) => {
//       const itemObj = properties[item];
//       // swagger返回数据格式多样： 有items层和没有
//       if (itemObj.originalRef || (!!itemObj.items && itemObj.items.originalRef)) {
//         const { originalRef } = itemObj.items || itemObj;
//         result.push({
//           name: item,
//           description: properties[item].description,
//           // 子类用childItem
//           childItem: getResponseObj(definitions[originalRef], definitions, []),
//         });
//       } else {
//         result.push({
//           name: item,
//           description: properties[item].description,
//         });
//       }
//     });
//   } else {
//     const { originalRef } = properties.data.items || properties.data;
//     // allDict字典格式特殊
//     if (properties.data && !originalRef) {
//       // 专门针对allDict
//       Object.keys(properties.data).forEach((item) => {
//         const itemObj = properties.data[item];
//         if (!itemObj.items && !itemObj.originalRef) return;
//         const ref = itemObj.items.originalRef;
//         getResponseObj(definitions[ref], definitions, result);
//       });
//     } else {
//       getResponseObj(definitions[originalRef], definitions, result);
//     }
//   }
//   return result;
// };
