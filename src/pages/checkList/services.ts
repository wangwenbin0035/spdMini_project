import request from '@/utils/request';
import { checkList } from '@/api/checkList';

// 验收单详情 单据信息
export function getCheckDetailHeader(options:any){
  return request({
    url: checkList.checkList,
    data: options,
    requestType: 'JSON'
  });
}

// 验收单详情列表
export function getDrugDetailList(options:any){
  return request({
    url: checkList.checkListDurgList,
    data: options,
  });
}
