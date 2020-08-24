/*
 * @File: 
 * @Author: wwb
 * @Date: 2019-12-02 19:25:08
 * @Last Modified By: wwb
 * @Last Modified time: 
 */ 
import { _local } from './_local';

export const Inventory = {
  inventoryList: `${_local}/a/checkbill/list`,   //盘点列表
  queryDeptLocationInfo: `${_local}/a/dept/queryDeptLocationInfo`,   //货位搜索
  createCheckBill: `${_local}/a/checkbill/create`, // 新建盘点 
  beginCheckBill: `${_local}/a/checkbill/beginCheck`, // 开始盘点 
  submitCheck: `${_local}//a/checkbill/submitCheck`, // 提交

  getListByBillNo: `${_local}/a/checkbilldetail/getListByBillNo`
}