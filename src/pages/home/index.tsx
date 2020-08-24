/*
 * @Author: wwb 
 * @Date: 2020-08-05 16:40:27 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-18 17:33:55
 */

import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import Section from '@/components/Section';
import RemoteScrollView from '@/components/RemoteScrollView';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HomeIcons, HomeTabsTitle } from '@/utils/constant';
import { getWindowHeight } from '@/utils/getWindowHeight';
import { View, Text, Image } from '@tarojs/components'
import { AtActivityIndicator, AtTabs, AtTabsPane, AtListItem, AtBadge } from 'taro-ui';
import { home } from '@/api/home';
import './index.scss';

interface IProps {
  dispatch: Dispatch<any>
  login: any
}

interface IHomeState {
  /**
   * 验收、上架、下架 数量
   */
  countObj: {
    0: number,
    1: number,
    2: number
  },
  loading: boolean,
  current: number,
  lowStockList: any[],
  reFetching: boolean,
  loadMore: boolean,
  scrollViewHeight: number
}

@connect(({ login }) => ({
  login
}))
class HomeIndex extends React.Component<IProps,IHomeState>{

  private LowStockRemindList:any
  private UsefulDataList: any

  constructor(props:IProps){
    super(props)
    this.state = {
      /**
       * 验收、上架、下架 数量
       */
      countObj: {
        0: 0,
        1: 0,
        2: 0
      },
      loading: false,
      current: 0,
      lowStockList: [],
      reFetching: false,
      loadMore: false,
      scrollViewHeight: 0
    }
  }
  componentDidMount(){
    this.getCount();
  }

  /**
   * 获取数量
   */
  getCount = () => {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    dispatch({
      type: 'home/countUnCheck',
      callback: data => {
        this.setState({ loading: false });
        if(data.code == 200){
          this.setState({ countObj: data.data })
        }else{
          Taro.showToast({
            title: '获取数量失败',
            icon: 'none'
          })
        }
      }
    });
  }

  GoToDetail = (item) => {
    console.log(item,'item');
    Taro.navigateTo({
      url: `/pages/home/detail?id=${item.id}`
    })
  }

  onReady(){
    let windowH = getWindowHeight();
    console.log(windowH,'windowH')
    const query = Taro.createSelectorQuery();

    query.select('.myWork').boundingClientRect();
    query.selectAll('.areaTitle').boundingClientRect();
    query.select('.at-tabs__header').boundingClientRect();

    setTimeout(() => {
      query.exec(res => {
        console.log(res,'res');
        let myWorkHeight = res[0].height;
        let sctionTitleHeight = res[1][0].height;
        let atTabsHeight = res[2].height;
        // console.log(myWorkHeight,'myWorkHeight');
        // console.log(sctionTitleHeight,'sctionTitleHeight');
        // console.log(atTabsHeight,'atTabsHeight');
        let scrollViewHeight = windowH - myWorkHeight - sctionTitleHeight - atTabsHeight;
        // console.log(scrollViewHeight,'scrollViewHeight');
        this.setState({ scrollViewHeight });
      })
    },1)
   
  }

  componentDidShow = () => {
    let pages = Taro.getCurrentPages();
    let currPage = pages[0];
    if(currPage.__data__ && currPage.__data__.refresh){
      this.getCount();
      this.LowStockRemindList.onReFresh(true);
    }
    const { currentDept, lastDept } = this.props.login;
    if(currentDept.deptId !== lastDept.deptId){
      this.getCount();
      this.LowStockRemindList.onReFresh(true);
    }
  }

  renderItem = (item: any) => {
    return <AtListItem key={item.id} title={item.meassage} note={item.createDate}/>
  }

  render(){
    const { loading, current, countObj, scrollViewHeight } = this.state;
    return (
      <View style={{ display: 'flex', flexDirection:'column',height: '100vh',backgroundColor: '' }}>
        <View className='myWork' style={{ height: '20vh' }}>
          <View className='areaTitle'>我的工作</View>
          <View className='at-row at-row__justify--between notice'>
            {
              loading ?  <View className='activity'><AtActivityIndicator content='加载中...' mode={'center'} isOpened={loading}/></View>
              :
              HomeIcons && HomeIcons.map((item: {
                title: string,
                icons: any,
                path: string
              }, index: number) => (
                <View
                    key={index}
                    className='at-col'
                    onClick={() => Taro.navigateTo({
                      url:item.path,
                    },
                    )}
                  >
                    <View className='noticeItems'>
                      {
                        index < 3 
                        ? 
                        <AtBadge value={countObj[index+1]} maxValue={999}>
                          <Image src={item.icons} style="width: 48px;height: 48px"/>
                        </AtBadge>
                        : <Image src={item.icons} style="width: 48px;height: 48px"/>
                      }
                      <View>
                        <Text className='cardText'>{item.title}</Text>
                      </View>
                    </View>
                  </View>
                ))
            }
          </View>
        </View>
        <View style={{ flex: '1 1 auto', }}>
          <View className='areaTitle'>提醒消息</View>
          <AtTabs current={current} tabList={HomeTabsTitle} onClick={(val) => this.setState({ current: val })}>
            <AtTabsPane className='AtTabsPane' current={this.state.current} index={0} >
              <View className='scrollViewWrapper'>
                <RemoteScrollView 
                  url={home.findPadRemindListTow}
                  query={{ remindType: 'lowStock' }}
                  onRef={(ref) => this.LowStockRemindList = ref}
                  renderItem={(item) => this.renderItem(item)}
                  style={{ height: `${scrollViewHeight}px` }}
                />
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1} >
              <View className='scrollViewWrapper'>
                <RemoteScrollView 
                  url={home.findPadRemindList}
                  query={{ remindType: 'usefulDate' }}
                  onRef={(ref) => this.UsefulDataList = ref}
                  renderItem={(item) => this.renderItem(item)}
                  style={{ height: `${scrollViewHeight}px` }}
                />
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}

export default HomeIndex