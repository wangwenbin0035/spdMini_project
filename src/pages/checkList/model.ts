/*
 * @Author: wwb 
 * @Date: 2020-08-13 22:58:13 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-20 18:07:07
 */

import { Effect } from 'dva';
import { Reducer } from 'redux';
import * as CheckServices from './services';


export interface StateType {

}

interface CheckListModelType {
  namespace: string;
  state: StateType;
  effects: {
    getCheckDetailHeader: Effect,
    getDrugDetailList: Effect
    // getUserInfo: Effect
  };
  reducers: {
    // saveUserInfo: Reducer<StateType>
  };
}

const CheckList: CheckListModelType = {
  namespace: 'CheckList',
  state: {},
  effects: {
    *getCheckDetailHeader({_, payload, callback }, { call, put, select }) {
      const result = yield call(CheckServices.getCheckDetailHeader, payload);
      if(callback) callback(result)
    },
    *getDrugDetailList({_, payload, callback }, { call, put, select }) {
      const result = yield call(CheckServices.getDrugDetailList, payload);
      if(callback) callback(result)
    },
  },
  reducers: {}
}

export default CheckList;