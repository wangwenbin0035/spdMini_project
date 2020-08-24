/*
 * @File 验收单 首页 card 展示
 * @Author: wwb 
 * @Date: 2020-08-13 23:47:18 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-20 15:27:08
 */
import React, { Component } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Tag from '@/components/Tag';


interface CheckListItem {
  /**
   * 供应商/来源部门
   */
  supplierName?: string
  /**
   * 品相数
   */
  checkAcceptDetailsItemsCount?: number
  /**
   * 配送单号
   */
  distributeCode?: string
  /**
   * 制单时间
   */
  createDate?: string
  /**
   * 状态 待验收 部分验收 已验收
   */
  statusName?: string
  /**
   * 单据类型
   */
  typeName?: string
  id: string
  hisDrugCode?: string
}


interface IProps {
  item: CheckListItem
}

interface IState {

}

class HomePageCard extends React.Component<IProps,IState>{
  constructor(props: IProps){
    super(props);
    this.state = {

    }
  }

  onToDetail = () => {
    const { item } = this.props;
    Taro.navigateTo({
      url: `/pages/CheckList/productList?distributeCode=${item.distributeCode}`,
    })
  }

  render(){
    const { item } = this.props;
    return (
      <View key={item.id} className='homePageCard' onClick={this.onToDetail}>
        <View className='at-row at-row__justify--between cardHeader'>
          <View className='at-col at-col-6 cardTitle'>
            { item.supplierName || '暂无供应商' }
          </View>
          <View className='at-col at-col-4 alignRight'>
            <View className='at-row at-row__justify--end'>
              <Tag text={item.typeName} />
              <Tag text={item.statusName} bgColor={item.statusName === '部分验收'? '#faad14': item.statusName === '已验收'? '#52c41a': ''}/>
            </View>
          </View>
        </View>
        <View className='at-row'>
          <View className='at-row'>
            <View className='at-col at-col-4'>配送单号：</View>
            <View className='at-col at-col-8'>{item.distributeCode}</View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-4'>品相数：</View>
            <View className='at-col at-col-8'>{item.checkAcceptDetailsItemsCount}</View>
          </View>
        </View>
        <View className='at-row'>
          <View className='at-row'>
            <View className='at-col at-col-4'>计划单号：</View>
            <View className='at-col at-col-8'>{item.distributeCode}</View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-4'>制单时间：</View>
            <View className='at-col at-col-8'>{item.createDate}</View>
          </View>
        </View>
      </View>
    )
  }
}

export default HomePageCard;