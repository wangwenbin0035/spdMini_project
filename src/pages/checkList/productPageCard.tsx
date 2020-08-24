/*
 * @File 验收单 首页 card 展示
 * @Author: wwb 
 * @Date: 2020-08-13 23:47:18 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-20 15:34:04
 */
import React, { Component } from 'react';
import { View, Text, Button, Form, Picker } from '@tarojs/components';
import Tag from '@/components/Tag';
import { AtButton, AtInput, AtList, AtListItem } from 'taro-ui';
import { CheckListProductInterface } from './interfaces';


interface IProps {
  item: CheckListProductInterface
  index: number
  collapseIndex?: number
  onClick: (item: CheckListProductInterface) => void
  onChange?: (e, key:string) => void
  currEditData?: {
    dateRealProductTime?: string
    dateRealValidEndDate?: string
    realReceiveQuantiry?: number
    productBatchNo?: string
    realAcceptanceTemperature?: number
  }
  resetActionSheet?: () => void

}

interface IState {

}

class ProductPageCard extends React.Component<IProps,IState>{
  constructor(props: IProps){
    super(props);
    this.state = {

    }
  }
  render(){
    const { item, collapseIndex, index, currEditData } = this.props;
    return (
      <View key={item.id} className='homePageCard' onClick={() => this.props.onClick(item)}>
        <View className='at-row at-row__justify--between cardHeader'>
          <View className='at-col at-col-6 cardTitle'>
            { item.ctmmGenericName || '暂无供应商' }
          </View>
          <View className='at-col at-col-4'>
            <View className='at-row at-row__justify--end'>
              <Tag text={item.status === 1 ? '待验收': '已验收'} bgColor={item.status === 1 ? '': '#52c41a' }/>
            </View>
          </View>
        </View>
        <View className='at-row'>
          <View className='at-row'>
            <View className='at-col at-col-4'>单位：</View>
            <View className='at-col at-col-8'>{item.unit}</View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-4'>数量：</View>
            <View className='at-col at-col-8'>{item.realDeliveryQuantiry || 0}</View>
          </View>
        </View>
        <View className='at-row'>
          <View className='at-row'>
            <View className='at-col at-col-4'>规格：</View>
            <View className='at-col at-col-8'>{item.ctmmSpecification}</View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-4'>生产厂家：</View>
            <View className='at-col at-col-8'>{item.ctmmManufacturerName}</View>
          </View>
        </View>
        <View>
          {
            collapseIndex === index ? 
            <View>
              {/* <Form> */}
                <AtInput 
                  name={'realReceiveQuantiry'}
                  type='number'
                  value={currEditData && currEditData.realReceiveQuantiry ? currEditData.realReceiveQuantiry.toString(): item.realReceiveQuantiry.toString()}
                  title='实到数量'
                  placeholder='实到数量'
                  onChange={val => this.props.onChange(val,'realReceiveQuantiry')}
                  onFocus={this.props.resetActionSheet}
                />
                <AtInput 
                  name={'productBatchNo'}
                  value={currEditData && currEditData.productBatchNo ? currEditData.productBatchNo: item.productBatchNo}
                  title='生产批号'
                  placeholder='生产批号'
                  onChange={val => this.props.onChange(val,'productBatchNo')}
                  onFocus={this.props.resetActionSheet}
                />
                <Picker 
                  mode='date' 
                  value={currEditData && currEditData.dateRealProductTime ? currEditData.dateRealProductTime: item.realProductTime} 
                  onChange={(e) => this.props.onChange(e,'dateRealProductTime')}
                  // onFocus={this.props.resetActionSheet}
                >
                  <AtList>
                    <AtListItem title='生产日期' extraText={currEditData && currEditData.dateRealProductTime ? currEditData.dateRealProductTime: item.realProductTime} />
                  </AtList>
                </Picker>
                <Picker 
                  mode='date' 
                  value={currEditData && currEditData.dateRealValidEndDate ? currEditData.dateRealValidEndDate: item.realValidEndDate} 
                  onChange={(e) => this.props.onChange(e,'dateRealValidEndDate')}
                >
                  <AtList>
                    <AtListItem title='有效期至' extraText={currEditData && currEditData.dateRealValidEndDate ? currEditData.dateRealValidEndDate: item.realValidEndDate} />
                  </AtList>
                </Picker>
                {
                  item.isShowTemprature === 1 ? 
                  <AtInput 
                    name={'realAcceptanceTemperature'}
                    type='number'
                    value={ currEditData && currEditData.realAcceptanceTemperature ? currEditData.realAcceptanceTemperature.toString(): item.realAcceptanceTemperature.toString()}
                    title='验收温度'
                    placeholder='验收温度'
                    onChange={val => this.props.onChange(val,'realAcceptanceTemperature')}
                    onFocus={this.props.resetActionSheet}
                  />
                  :null
                }
              {/* </Form> */}
            </View>
            :
            null
          }
        </View>
      </View>
    )
  }
}

export default ProductPageCard;