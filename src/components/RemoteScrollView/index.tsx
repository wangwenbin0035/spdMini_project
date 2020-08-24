/*
 * @Author: wwb 
 * @Date: 2020-08-10 16:38:38 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-19 16:52:17
 */
import React, { PureComponent } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { AtDivider } from 'taro-ui';
import request from '@/utils/request';
import refreshIcon from '@/assets/images/refresh.png'
import loadingIcon from '@/assets/images/loading.png'
import doneIcon from '@/assets/images/done.png'

import './index.scss';

enum refreshStatus {
  INIT,
  PULL_DOWN,
  READY_REFRESH,
  LOADING,
  DONE
}

interface IProps {
  upperThreshold?: number
  lowerThreshold?: number
  style?: React.CSSProperties
  onRef?: (ref: any) => void
  query?: {}
  url: string
  method?: 'POST' | 'GET',
  requestType?: 'JSON' | 'formData',
  callback?: () => void
  renderItem: (item: any,index?: number) => void
}

interface IState {
  dataSource: Array<any>
  loadMore: boolean
  query: {}
  totalPage: number
  count: number
  pagination: {
    pageNo: number,
    pageSize: number
  }
  refreshStatu: refreshStatus
  refreshHeight: number
  refreshing: boolean
  loading: boolean
}


class RemoteScrollView extends PureComponent<IProps,IState>{

  public pageSize = 15;
  public pageNo = 1;
  private scrollView: any
  private lastTouchY = 0
  private isUpper = true
  private maxHeight = 50
  private validHeight = 30

  constructor(props: IProps){
    super(props)
    this.state = {
      dataSource: [],
      loadMore: false,
      query: {},
      pagination: {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      },
      totalPage: 0,
      count: 0,
      refreshHeight: 0,
      refreshing: false,
      loading: false,
      refreshStatu: refreshStatus.INIT
    }
    this.onReFresh = this.onReFresh.bind(this);
  }

  componentDidMount = () => {
    if(this.props.onRef){
      this.props.onRef(this);
    }
    this.onReFresh(true);
  }


  onReFresh(refresh: boolean){
    const { pagination } = this.state;
    this.setState({
      refreshStatu: refreshStatus.LOADING,
      refreshHeight: this.maxHeight
    })
    let { url, query, method = 'POST', requestType = 'formData', callback } = this.props;
    let newQuery = refresh ? { pageNo: this.pageNo, pageSize: this.pageSize, ...query }: { ...pagination, ...query }
    request({
      url,
      method,
      requestType,
      data: newQuery,
    })
    .then(({ code, data, msg }:{ code: number, data: any, msg: string }) => {
      if(code === 200){
        const { list, pageSize, pageNo, totalPage, count } = data;
        let dataSource = [...this.state.dataSource];
        dataSource = pageNo === 1 ? list: dataSource.concat(list);
        if(dataSource.length === 0) callback && callback();
        this.setState({
          dataSource,
          query: newQuery,
          totalPage,
          count,
          loadMore: false,
          refreshStatu: refreshStatus.DONE,
          refreshHeight: 0,
          pagination: { pageNo, pageSize }
        })
      }
    })
  }


  handleScrollToLower() {
    if(!this.isEmptyList() && !this.isLastPage() && this.state.refreshStatu !== refreshStatus.LOADING){
      let { pagination } = this.state;
      this.setState({
        loadMore: true,
        pagination: {
          pageNo: ++pagination.pageNo,
          pageSize: pagination.pageSize,
        }
      },() => {
        this.onReFresh(false);
      })
    }
  }

  /**
   * @description 触摸开始事件
   * @param e 
   */
  handleTouchStart(e) {
    const curTouch = e.touches[0]
    this.lastTouchY = curTouch.pageY
  }

  /**
   * @description 触摸事件 滑动
   * @param e 
   */
  handleTouchMove(e) {
    const curTouch = e.touches[0]
    const moveY = (curTouch.pageY - this.lastTouchY) * .3;
    if(
      !this.isUpper ||
      moveY < 0 || 
      moveY > 2 * this.maxHeight ||
      this.state.refreshStatu === refreshStatus.LOADING
    ) {
      return
    }
    if(moveY < this.validHeight) {
      console.log('PULL_DOWN')
      this.setState({
        refreshHeight: moveY,
        refreshStatu: refreshStatus.PULL_DOWN
      })
    } else {
      // console.log('READY_REFRESH')
      this.setState({
        refreshHeight: moveY,
        refreshStatu: refreshStatus.READY_REFRESH
      })
    }
  }

  /**
   * @description 触摸离开事件
   */
  handleTouchEnd() {
    this.lastTouchY = 0
    if(this.state.refreshStatu === refreshStatus.READY_REFRESH) {
      this.setState({
        refreshStatu: refreshStatus.LOADING,
        refreshHeight: this.maxHeight
      })
      console.log('handleTouchEnd 刷新 ');
      this.onReFresh(true);
    } else {
      this.setState({
        refreshHeight: 0
      })
    }
  }
  handleScrollToUpeper() {
    this.isUpper = true
  }
  handleScroll() {
    this.isUpper = false
  }

  // 当前页面为最后一页
  isLastPage = () => {
    const { pagination: { pageNo }, totalPage } = this.state;
    return  pageNo === totalPage
  }

  // 当前数据为空数据
  isEmptyList = () => {
    const { count } = this.state;
    return count === 0
  }

  // renderBottom = () => {
  //   if(this.isEmptyList()){
  //     return (
  //       <View style={{ flex: 1, flexDirection: 'column', paddingBottom: 24, alignItems:'center', borderBottomWidth:0,textAlign: 'center',backgroundColor: '#fff' }}>
  //         <View>
  //           <Image src={searchWaiting} style={{ width: 300, height: 150 }}/>
  //         </View>
  //         <Text>暂无数据</Text>
  //       </View>
  //     )
  //   }else if(this.isLastPage()){
  //     return (
  //       <View style={{ padding: '20px 0', textAlign: 'center' }}>
  //         <Text>暂无更多数据</Text>
  //       </View>
  //     )
  //   }else{
  //     return <AtActivityIndicator mode='center' size={40} isOpened={true} content='加载中...'></AtActivityIndicator>
  //   }
  // }

  render(){
    const { dataSource, loadMore, refreshStatu, refreshHeight } = this.state;
    const { style, renderItem } = this.props;
    return (
      <ScrollView
        ref={(view) => this.scrollView = view}
        scrollY
        scrollWithAnimation
        scrollTop={0}
        style={{ height: 300, ...style }}
        lowerThreshold={30}
        onScrollToUpper={this.handleScrollToUpeper.bind(this)}
        onScroll={this.handleScroll.bind(this)}
        onScrollToLower={this.handleScrollToLower.bind(this)}
        >
        <View className={`refresh-icon-view ${refreshStatu === refreshStatus.LOADING ? 'loading' : ''}`} style={{ height: refreshHeight + 'px' }}>
          <Image className={`refresh-icon ${refreshStatu === refreshStatus.LOADING ? 'loading' : ''}`} src={refreshIcon} style={{ transform: `rotate(${(refreshHeight / this.maxHeight) * 360}deg)` }}></Image>
        </View>
        <View
          className="refresh-body-view"
          onTouchMove={this.handleTouchMove.bind(this)}
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
        >
          {
            dataSource.map((item:any,index: number) => renderItem(item,index))
          }
        </View>
        <View className="load-more-view">
          {
            // this.isEmptyList() ? 
            // <AtDivider content='没有更多了' fontColor='#2d8cf0' lineColor='#2d8cf0' />
            // :
            loadMore ? (
              <Image className="load-more-icon loading" src={loadingIcon}></Image>
            ) : (
              refreshStatu === refreshStatus.LOADING 
              ? null
              : <AtDivider content='没有更多了' />
            )
          }
        </View>
      </ScrollView>
    )
  }
}

export default RemoteScrollView;