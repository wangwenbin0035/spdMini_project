
import { Effect } from 'dva';
import { Reducer } from 'redux';
import * as LoginService from './service';
// import { createEffects } from '../../utils/util';


export interface CurrentDept{
  deptId?: string
  deptName?: string
  deptType?: string
  lastSelect?: boolean
}

interface LastDept {
  deptId?: string
  deptName?: string
}

export interface StateType {
  userInfo: {},
  currentDept: CurrentDept,
  lastDept: LastDept
  deptInfo: []
}
interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    encryptPassword: Effect,
    getUserInfo: Effect
  };
  reducers: {
    saveUserInfo: Reducer<StateType>
    updateCurrentDept: Reducer<StateType>
    updateLastDept: Reducer<StateType>
  };
}

const Login: LoginModelType = {
  namespace: 'login',
  state: {
    userInfo: {},
    currentDept: {},
    lastDept: { },
    deptInfo: []
  },
  effects: {

    *encryptPassword({_, payload, callback }, { call, put, select }) {
      const result = yield call(LoginService.encryptPassword, payload);
      if(callback) callback(result)
    },

    *getUserInfo({_, payload, callback }, { call, put, select }) {
      const result = yield call(LoginService.getUserInfo, payload);
      if(callback) callback(result)
    },

    // getUserInfo: createEffects(LoginService.getUserInfo)
  },
  reducers: {
    saveUserInfo(state,{ payload }){
      return {
        ...state,
        ...payload
      }
    },
    updateCurrentDept(state,{ payload }){
      return {
        ...state,
        currentDept: { ...payload }
      }
    },
    updateLastDept(state,{ payload }){
      return {
        ...state,
        lastDept: { ... payload }
      }
    }
  }
};
export default Login;