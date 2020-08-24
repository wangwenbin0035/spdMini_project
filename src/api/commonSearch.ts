/*
 * @File: 公用搜索 中 涉及到接口
 * @Author: wwb
 * @Date: 2020-07-02 00:52:54
 * @Last Modified By: wwb
 * @Last Modified time: 
 */ 

import { _local } from './_local';
export const CommonSearch = {

  // 验收主列表供应商搜索
  getAllSupplier: `${_local}/a/depot/supplier/all`,

  // 上架 主列表查询
  getShelfListNoPage: `${_local}/a/checkaccept/shelfListNoPage`,

  // 拣货下架主列表 查询
  getJdCodeList: `${_local}/a/common/pickingorder/JdCodeList`,

  // 验收、上架、下架 二级页面搜索  搜索 通用名、商品名、生产厂家等
  commonInfoSearch: `${_local}/a/commonCheckQuery/commonInfoSearch`,

  // 库存查询搜索
  queryDrugByList: `${_local}/a/common/queryDrugByList`,

}