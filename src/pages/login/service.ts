
import request from '@/utils/request';
import { home } from '@/api/home';


export function encryptPassword(options:any){
  return request({
    url: home.encryptPassword,
    data: options
  });
}

export function getUserInfo(options:any){
  return request({
    url: home.login,
    data: options
  });
} 
