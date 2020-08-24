/*
 * @File: 
 * @Author: wwb
 * @Date: 2019-12-02 19:25:08
 * @Last Modified By: wwb
 * @Last Modified time: 
 */ 
import { _local } from './_local';

export const QueryStockApi = {
  //库存列表
  queryDrugByDept: `${_local}/a/StoreDetail/queryDrugByDeptAll`,      
  // 基础信息
  getRoomRepertoryDetail: `${_local}/a/StoreDetail/getRoomRepertoryDetail`, 
  // 详情列表
  getRoomRepertoryDetailList: `${_local}/a/StoreDetail/getRoomRepertoryListAll`, 

}