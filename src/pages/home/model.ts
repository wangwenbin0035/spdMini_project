
import { Effect } from 'dva';
import { Reducer } from 'redux';
import * as HomeService from './service';
// import { createEffects } from '../../utils/util';

export interface StateType {
  currentDept: { deptId: string, deptName: string, deptType: string }
}
interface HomeModelType {
  namespace: string;
  state: StateType;
  effects: {
    countUnCheck: Effect,
    findPadRemindListTow: Effect,
    setCurrentDept: Effect
  };
  reducers: {
  };
}

const Home: HomeModelType = {
  namespace: 'home',
  state: {
    currentDept: {
      deptId: '', 
      deptName: '', 
      deptType: ''
    },
  },
  effects: {
    *countUnCheck({_, payload, callback }, { call, put, select }) {
      const result = yield call(HomeService.countUnCheck, payload);
      if(callback) callback(result)
    },

    *findPadRemindListTow({_, payload, callback }, { call, put, select }) {
      const result = yield call(HomeService.findPadRemindListTow, payload);
      if(callback) callback(result)
    },

    /**
     * 设置当前选中部门
     */
    *setCurrentDept({_, payload, callback }, { call, put, select }) {
      const result = yield call(HomeService.setCurrentDept, payload);
      if(callback) callback(result)
    },


    // getUserInfo: createEffects(LoginService.getUserInfo)
  },
  reducers: {
    // saveUserInfo(state,{ payload }){
    //   return {
    //     ...state,
    //     ...payload
    //   }
    // }
    
  }
};
export default Home;