/*
 * @Author: wwb 
 * @Date: 2020-08-11 15:53:18 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-18 17:40:35
 */

import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import RemoteScrollView from '@/components/RemoteScrollView';
import { getWindowHeight } from '@/utils/getWindowHeight';
import { AtSearchBar, AtTabs, AtTabsPane, AtListItem } from 'taro-ui';
import { connect } from 'react-redux';
import { checkList } from '@/api/checkList';
import HomePageCard from './homePageCard';
import _ from 'lodash';


const tabList = [{ title: '待验收' }, { title: '部分验收' }, { title: '已验收' }]

interface CheckList{
  props: {
    login: any
  },
  state: {
    searchValue: string
    current: number
    supplierCodeList?: string[]
    height: number
  }

}


@connect(({ login, CheckList }) => ({ login, CheckList }))
class CheckList extends Component {

  private PreCheckList: any;
  private HalfCheckList: any;
  private FinishedCheckList: any;

  constructor(props:CheckList['props']){
    super(props)
    this.state = {
      searchValue: undefined,
      current: 0,
      supplierCodeList: [],
      height: 0
    }
  }

  componentDidMount(){
    // let pages = Taro.getCurrentPages();
    // let prevPage = pages[pages.length -2];
    // prevPage.setData({ refresh: true });
  }

  onReady(){

  }

  getCurrType = (): number => {
    const { deptType } = this.props.login.currentDept;
    switch (deptType) {
      case '3'://药库
        return 1;
      case '4':// 药房
        return 2;
      case '5': // 基数药
        return 3;
      default:
        return 0;
    }
  }



  render() {
    const { searchValue, current, supplierCodeList } = this.state;
    const checkType = this.getCurrType();
    return (
      <View style={{ position: 'fixed', height: '100vh',width: '100%' }}>
        <View style={{ position: 'relative',marginTop: 38 }}>
          <AtSearchBar 
            value={searchValue}
            placeholder={'供应商/部门名称'}
            fixed
            onChange={() => console.log('onChange')}
            onFocus={() => console.log('onFocus')}
            // onFocus={() => Taro.navigateTo({ url: '/pages/commomSearch/index' })}
          />
        </View>
        <AtTabs tabList={tabList} current={current} onClick={current => this.setState({ current })}>
          <AtTabsPane current={current} index={0}>
            <View className='scrollViewWrapper' style={{ height: `calc(100vh - 70px)`,overflow: 'scroll' }}>
              <RemoteScrollView 
                url={checkList.checkList}
                key={'0'}
                requestType={'JSON'}
                query={{
                  checkType,
                  acceptanceType: "0",
                  supplierCodeList
                }}
                style={{ height: `100%` }}
                onRef={(ref) => this.PreCheckList = ref}
                renderItem={(item,index:number) => <HomePageCard key={index} item={{...item}}/>}
              />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='scrollViewWrapper' style={{ height: `calc(100vh - 70px)`,overflow: 'scroll' }}>
              <RemoteScrollView 
                key={'1'}
                url={checkList.checkList}
                requestType={'JSON'}
                query={{
                  checkType,
                  acceptanceType: "1",
                  supplierCodeList
                }}
                style={{ height: `100%` }}
                onRef={(ref) => this.HalfCheckList = ref}
                renderItem={(item,index:number) => <HomePageCard key={index} item={{...item}}/>}
              />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View className='scrollViewWrapper' style={{ height: `calc(100vh - 70px)`,overflow: 'scroll' }}>
              <RemoteScrollView 
                url={checkList.checkList}
                requestType={'JSON'}
                key={'2'}
                query={{
                  checkType,
                  acceptanceType: "2",
                  supplierCodeList
                }}
                style={{ height: `100%` }}
                onRef={(ref) => this.FinishedCheckList = ref}
                renderItem={(item,index: number) => <HomePageCard key={index} item={{...item}}/>}
              />
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default CheckList;
