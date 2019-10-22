import fetchData from './createApi.js'

const option = { baseURL: '' } // http://200.200.200.230/hetapi/api/mock/27

export const uploadFileToTencent = fetchData('post', `/v4/web/tencentcloud/upload`, option) // 腾讯云上传
