/*
 * @Author: wwb 
 * @Date: 2020-08-05 23:02:44 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-10 11:49:22
 */

import Taro from "@tarojs/taro";
import { _local } from '@/api/_local';

type RequestType = 'JSON' | 'formData';
type Icredentials = "include" | "omit" | "same-origin" | undefined;

interface IOptionsProps {
  url: string
  method?: "POST" | "GET" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
  requestType?: RequestType
  data?: {},
  credentials?: Icredentials
}

function checkStatus(response:any) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  throw error;
}


export default (options: IOptionsProps) => {

  let defaultProps = {
    method: 'POST',
    requestType: 'formData'
  } as IOptionsProps;

  let newOptions = { ...defaultProps,...options }
  
  let cookie = Taro.getStorageSync('Cookies');
  let header = {};
  if(newOptions.requestType === 'formData'){
    header = {
      Accept: 'text/plain, text/html,application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Cookie': cookie
    }
  }else{
    header = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Cookie': cookie
    }
  }

  return Promise.race([
    new Promise((resolve,reject) => {
			setTimeout(() => reject({ code: 504, name: '请求超时', message: '请求超时,请重试' }),60000)
    }),
    Taro.request({
      url: newOptions.url,
      data: newOptions.data,
      method: newOptions.method,
      header: header
    })
  ])
  .then(checkStatus)
  .then(response => {
    if(response.statusCode === 200){
			return response.data;
		}else{
			// 错误处理
			return response
		}
  })
  .catch((error) =>{
		Taro.showToast({ 
      title: '请求错误',
      icon: 'none'
    })
		if(error.code){
		}
		throw new Error(error);
	})
};