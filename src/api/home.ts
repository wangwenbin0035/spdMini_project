import { _local } from './_local';

export const home = {
  encryptPassword: `${_local}/a/entryPass/entryptPassword`,
  login:`${_local}/a/login`,//  登录
  logout:`${_local}/a/logout`,// 登出
  cacheCurrentDept:`${_local}/a/cacheCurrentDept`,//切换子系统
  countUnCheck:`${_local}/a/pad/countUnCheck`,// 获取消息提醒数字
  findPadRemindListTow:`${_local}/a/pad/drugremind/findPadRemindListTow`,// 低库存提醒
  findPadRemindList:`${_local}/a/pad/drugremind/findPadRemindList`,//近效期提醒
  findDrugRemindDetail:`${_local}/a/pad/drugreminddetail/findDrugRemindDetail`,// 获取详情信息
  checkList:`${_local}/a/exam/list`,// 入库验收列表
}