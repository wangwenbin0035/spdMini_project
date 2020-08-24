/*
 * @Author: wwb 
 * @Date: 2020-08-05 12:01:02 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-18 16:55:58
 */
import React from 'react';
import Taro from '@tarojs/taro';
import dva from './utils/dva';
import { Provider } from 'react-redux';
import models from './models';

import './styles/app.scss';


const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends React.Component {


  UNSAFE_componentWillMount () {
    // console.log(Taro.getCurrentInstance())
  }

  componentDidMount () {
    // console.log('componentDidMount');
  }

  // 对应 onShow
  componentDidShow () {
    // console.log('componentDidShow')

  }

  // 对应 onHide
  componentDidHide () {
    // console.log('componentDidHide')
  }

  // 对应 onError
  componentDidCatchError () {}

  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}
export default App;