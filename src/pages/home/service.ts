
import request from '@/utils/request';
import { home } from '@/api/home';

/**
 * @description 获取首页 验收、上架、下架数量
 * @param options 
 */
export function countUnCheck(options:any){
  return request({
    url: home.countUnCheck,
    data: options
  });
} 

/**
 * 获取首页低库存、近效期列表
 */
export function findPadRemindListTow(options:any){
  return request({
    url: home.findPadRemindListTow,
    data: options
  });
} 


export function setCurrentDept(options:any){
  return request({
    method: 'GET',
    url: `${home.cacheCurrentDept}/${options.id}`,
    data: options,
    credentials: 'include',
  });
}