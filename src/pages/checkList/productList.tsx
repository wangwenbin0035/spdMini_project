/*
 * @Author: wwb 
 * @Date: 2020-08-11 15:53:18 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-20 16:31:30
 */

import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import RemoteScrollView from '@/components/RemoteScrollView';
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtSearchBar, AtTabs, AtTabsPane, AtActionSheet, AtActionSheetItem } from 'taro-ui';
import { connect } from 'react-redux';
import { checkList } from '@/api/checkList';
import ProductCard from './productPageCard';
import { CheckListProductInterface, payloadInterface } from './interfaces';
import _ from 'lodash';


const tabList = [{ title: '待验收' }, { title: '已验收' }];

interface PostDataInterface {

}

interface CheckProductList{
  props: {
    login: any
  },
  state: {
    searchValue: string
    current: number
    supplierCodeList?: string[]
    height: number
    isOpened: boolean
    distributeCode: string
    hisDrugCode: string
    currTouchTarget: CheckListProductInterface
    currTouchIndex: number
    // 收起编辑 展开编辑index
    currCollapseIndex: number
    postData: payloadInterface
    currEditData: {
      realReceiveQuantiry: number
      productBatchNo: string
      dateRealProductTime: string
      dateRealValidEndDate: string
      realAcceptanceTemperature: number
    }
  }
}


@connect(({ login, CheckList }) => ({ login, CheckList }))
class CheckProductList extends Component {

  private PreProductList: any;
  private FinishedProductList: any;

  constructor(props:CheckProductList['props']){
    super(props)
    this.state = {
      searchValue: undefined,
      current: 0,
      supplierCodeList: [],
      height: 0,
      isOpened: false,
      distributeCode: undefined,
      hisDrugCode: undefined,
      currTouchTarget: undefined,
      currTouchIndex: undefined,
      currCollapseIndex: undefined,
      postData: undefined,
      currEditData: undefined
    }
  }

  UNSAFE_componentWillMount () {
    let { distributeCode, hisDrugCode } = getCurrentInstance().router.params;
    this.setState({ distributeCode, hisDrugCode })
  }

  /**
   * @description 具体药品单个Item 点击事件
   * @param item 
   * @param index 
   */
  onItemClick = (item:CheckListProductInterface, index: number) => {
    this.setState({ isOpened: true, currTouchTarget: {...item }, currTouchIndex: index });
  }


  /**
   * 
   * @param flag 展开编辑/收起编辑事件
   */
  onItemCollapseEdit = (flag:boolean) => {
    const { currTouchIndex } = this.state;
    if(flag){
      this.setState({ currTouchTarget: {}, currCollapseIndex: undefined, currTouchIndex: undefined })
    }else{
      this.setState({ currCollapseIndex: currTouchIndex })
    }
    this.setState({ isOpened: false });
  }

  /**
   * 编辑项 变化事件
   */
  onFieldsChange = (e,key:string) => {
    const { currEditData } = this.state;
    if(key === 'realReceiveQuantiry' || key === 'productBatchNo' || key === 'realAcceptanceTemperature'){
      this.setState({ 
        isOpened: false,
        currEditData: {
          ...currEditData,
          [key]: e
        } 
      })
    }else{
      this.setState({ 
        isOpened: false, 
        currEditData: {
          ...currEditData,
          [key]: e.detail.value 
        }
      })
    }
  }

  /**
   * 确认验收
   */
  handleSubmit = () => {
    const { currEditData } = this.state;
    console.log(currEditData,'currEditData');
  }

  moreDetail = () => {
    const { currTouchTarget,currTouchIndex, current } = this.state;
    Taro.navigateTo({
      url: `/pages/CheckList/moreDetail?distributeCode=${currTouchTarget.distributeCode}&status=${current === 0 ? 1: 2}&currentViewIndex=${currTouchIndex}`,
    })
  }

  render() {
    const { searchValue, current, distributeCode, hisDrugCode, isOpened, currCollapseIndex, currTouchIndex, currEditData } = this.state;
    return (
      <View style={{ position: 'fixed', height: '100vh',width: '100%' }}>
        <View style={{ position: 'relative',marginTop: 38 }}>
          <AtSearchBar 
            value={searchValue}
            placeholder={'通用名/商品名/生产厂家'}
            fixed
            onChange={() => console.log('onChange')}
            onFocus={() => console.log('onFocus')}
          />
        </View>
        <AtTabs tabList={tabList} current={current} onClick={current => this.setState({ current, isOpened:false })}>
          <AtTabsPane current={current} index={0}>
            <View className='scrollViewWrapper'>
              <RemoteScrollView 
                url={checkList.checkListDurgList}
                query={{
                  distributeCode,
                  status: 1,
                  hisDrugCode: hisDrugCode ? hisDrugCode: ''
                }}
                style={{ height: `calc(100vh - 70px)` }}
                onRef={(ref) => this.PreProductList = ref}
                renderItem={(item,index:number) => (
                  <ProductCard 
                    item={{...item}} 
                    key={index} 
                    index={index}
                    collapseIndex={currCollapseIndex}
                    currEditData={currEditData}
                    // dateRealProductTime={currEditData && currEditData.dateRealProductTime ? currEditData.dateRealProductTime: undefined}
                    // dateRealValidEndDate={currEditData && currEditData.dateRealValidEndDate ? currEditData.dateRealValidEndDate: undefined}
                    onChange={(e,key) => this.onFieldsChange(e,key)}
                    onClick={() => this.onItemClick(item,index)}
                    resetActionSheet={() => this.setState({ isOpened: false })}
                  />
                  )
                }
              />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='scrollViewWrapper'>
              <RemoteScrollView 
                url={checkList.checkListDurgList}
                query={{
                  distributeCode,
                  status: 2,
                  hisDrugCode: hisDrugCode ? hisDrugCode: ''
                }}
                style={{ height: `calc(100vh - 70px)` }}
                onRef={(ref) => this.FinishedProductList = ref}
                renderItem={(item,index) => <ProductCard item={{...item}} key={index} index={index} onClick={() => this.onItemClick(item,index)}/>}
              />
            </View>
          </AtTabsPane>
        </AtTabs>
        <AtActionSheet isOpened={isOpened} title={current === 0 && currCollapseIndex !== currTouchIndex? '展开编辑将会展开当前选中项编辑内容': current ===0 && currCollapseIndex === currTouchIndex? '收起编辑不会保存您的编辑内容,请注意': ''}>
          {
            current === 0 ? 
            <>
              <AtActionSheetItem onClick={() => this.onItemCollapseEdit(currCollapseIndex === currTouchIndex)}>{currCollapseIndex === currTouchIndex ? '收起编辑': '展开编辑'}</AtActionSheetItem>
              <AtActionSheetItem onClick={this.moreDetail}>更多详情</AtActionSheetItem>
              <AtActionSheetItem><Text className='primaryColor' onClick={this.handleSubmit}>确认验收</Text></AtActionSheetItem>
            </>
            :
            <AtActionSheetItem>更多详情</AtActionSheetItem>
          }
        </AtActionSheet>
      </View>
    )
  }
}

export default CheckProductList;
