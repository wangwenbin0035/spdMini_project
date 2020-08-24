/**
 * 产品明细列表
 */
export interface CheckListProductInterface {
  /**
   * 产品名称
   */
  ctmmGenericName?: string
  /**
   * 商品名
   */
  ctmmTradeName?: string
  /**
   * 剂型
   */
  ctmmDosageFormDesc?: string
  /**
   * 包装规格
   */
  packageSpecification?: string
  /**
   * 品相数
   */
  checkAcceptDetailsItemsCount?: number
  /**
   * 配送单号
   */
  distributeCode?: string
  /**
   * 制单时间
   */
  createDate?: string
  /**
   * 状态 待验收 部分验收 已验收
   */
  statusName?: string
  /**
   * 单据类型
   */
  typeName?: string
  //判断 是否展开或收起编辑
  spread?: boolean
  id: string
  hisDrugCode: string
  status: number
  unit?: string
  realDeliveryQuantiry? : number
  ctmmSpecification?: string
  approvalNo?: string
  ctmmManufacturerName?: string
  supplierName?: string
  /**
   * 实到数量
   */
  realReceiveQuantiry?: number
  productBatchNo?: string
  realProductTime?: string
  realValidEndDate?: string
  realAcceptanceTemperature?: string
  isShowTemprature?: number
}

/**
 * 提交数据
 */

export interface payloadList {
  drugCode: string
  id: string
  isUsual: string
  parentId: string
  productBatchNo: string
  realProductTime: string
  realReceiveQuantiry: string
  realValidEndDate: string
}

export interface payloadInterface {
  checkType: number
  distributeCode: string
  detailList: payloadList[]
}