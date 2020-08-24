/*
 * @Author: wwb 
 * @Date: 2020-08-12 00:15:33 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-18 11:59:18
 */

import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getWindowHeight } from '@/utils/getWindowHeight';
import { View, Text, Image, ScrollView, TaroEvent } from '@tarojs/components'
// import { CurrentDept } from '../login/model';
import { AtActivityIndicator, AtList, AtListItem, AtRadio, AtButton } from 'taro-ui';

interface IProps{
  login: any,
  dispatch: Dispatch<any>
}

interface IState {
  checked: string
  height: number
}


@connect(({ login }) => ({
  login
}))
class MyInfo extends Component<IProps,IState> {

  constructor(props: IProps){
    super(props)
    this.state = {
      checked: '',
      height: 0
    }
  }

  componentDidMount(){
    let pages = Taro.getCurrentPages();
    console.log(pages,'pages')
    const { login : { currentDept, lastDept } } = this.props;
    this.setState({
      checked: currentDept.deptId
    });
    console.log(lastDept,'lastDept')
    console.log(currentDept,'currentDept')


  }

  onReady(){
    let windowH = getWindowHeight();
    console.log(windowH)
    const query = Taro.createSelectorQuery();
    let versionHeight: number;
    query.select('.version').boundingClientRect( rec => {
      versionHeight = rec.height;
      let height = windowH - versionHeight;
      this.setState({ height });
    }).exec();
    
  }

  changeSystem = (val:string) => {
    console.log(val,'val')
    let { deptInfo, currentDept, lastDept } = this.props.login;
    let currSelectDept = deptInfo.find(item => item.deptId === val);
    console.log(currentDept,'currentDept')
    const { dispatch } = this.props;
    console.log(lastDept,'lastDept')
    Taro.showLoading();
    const { menuList, ...currDept } = currSelectDept;
    console.log(currDept,'currDept')
    dispatch({
      type: 'home/setCurrentDept',
      payload: { 
        id: currDept.deptId,
        deptName: currDept.deptName
      },
      callback: ({ data, code, msg }) => {
        Taro.hideLoading();
        if(code === 200){
          Taro.showToast({
            title: '切换系统成功',
            icon: 'success'
          });
          dispatch({
            type: 'login/updateLastDept',
            payload: { 
              deptId: currentDept.deptId,
              deptName: currentDept.deptName
            }
          })
          this.setState({ checked: currDept.deptId });
          dispatch({
            type: 'login/updateCurrentDept',
            payload: { ...currDept }
          });
        }else{
          Taro.showToast({
            title: '切换系统失败',
            icon: 'none'
          })
        }
      }
    })
  }

  render() {
    let { deptInfo } = this.props.login;
    const { checked, height } = this.state;
    deptInfo = deptInfo.filter((item:any) => item.deptType !=='1' && item.deptType !=='2');
    let radioOption = deptInfo.map((item: { deptId: number, deptName: string, lastSelect: boolean }) => {
      return {
        label: item.deptName,
        value: item.deptId
      }
    });
    return (
      <View style={{ position: 'fixed',width: '100vw' }}>
        <AtList className='version'>
          <AtListItem title={'账号信息'} extraText={'版本V1.0.0'}/>
        </AtList>
        <View style={{ height: `${height}px`,overflow: 'scroll' }}>
          <AtRadio 
            options={radioOption}
            value={checked}
            onClick={(val,e) => this.changeSystem(val)}
          />
          <AtButton type='primary' full customStyle={{ backgroundColor: '#238962',borderColor: '#238962' }}>退 出</AtButton>
        </View>
      </View>
    )
  }
}


export default MyInfo;