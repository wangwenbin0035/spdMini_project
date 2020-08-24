/*
 * @Author: wwb 
 * @Date: 2020-08-05 16:40:27 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-10 11:48:29
 */

import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CurrentDept } from './model';
import { home } from '@/api/home';
import './index.less';

interface Iprops {
  dispatch: Dispatch<any>
}


@connect(({ login, home }) => ({
  login,
  home
}))
class Login extends React.Component<Iprops>{

  componentDidMount(){
    // 登录
    this.login();
  }

  login = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/encryptPassword',
      payload: { password: '888888' },
      callback: data => {
        if(data.code === 200){
          let password = data.data.password;
          Taro.request({
            url: home.login,
            method: 'POST',
            data: { username: 'admin', password },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => {
            let cookies = response.header['Set-Cookie'].replace(/,/g, ';');
            console.log(cookies,'cookies');
            Taro.setStorageSync('Cookies', cookies);
            return response
          })
          .then(response => {
            console.log(response,'response');
            if(response.statusCode === 200){
              let result = response.data;
              if(result.code === 200){
                this.saveUserInfo(result.data);
                Taro.showToast({
                  title: '登录成功',
                  duration: 1000,
                  success: () => {
                    Taro.switchTab({
                      url: '/pages/home/index'
                    })
                  }
                })
              }else{
                Taro.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
              }
            }else{
              Taro.showToast({
                title: `${response.errMsg}`,
                icon: 'none',
              })
            }
          })
        }else{
          Taro.showToast({
            title: '密码机密失败',
            icon: 'none',
          })
        }
      }
    })
  }

  saveUserInfo = (data: any) => {
    const { deptInfo, ...userInfo } = data;
    let saveDeptInfo = deptInfo.filter((item:any) => item.deptType !=='1' && item.deptType !=='2');
    let currentDept: CurrentDept = deptInfo.filter((item: any) => item.lastSelect);
    Taro.setStorageSync('lastSelectDept', currentDept.deptId);
    const { menuList, ...curDeptInfo } = currentDept[0];
    this.props.dispatch({
      type: 'login/saveUserInfo',
      payload: {
        userInfo,
        currentDept: curDeptInfo,
        deptInfo: saveDeptInfo
      }
    });
    this.props.dispatch({
      type: 'login/updateLastDept',
      payload: {
        deptId: curDeptInfo.deptId,
        deptName: curDeptInfo.deptName
      }
    });
  }


  render(){
    return (
      <View className='LoginView'>
        <AtActivityIndicator mode='center' size={40} isOpened={true} content='加载中...'></AtActivityIndicator>
      </View>
    )
  }
}

export default Login