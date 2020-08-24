/*
 * @File 验收 更多详情
 * @Author: wwb 
 * @Date: 2020-08-20 15:38:23 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-20 18:12:16
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtList, AtListItem, AtAccordion, AtInput } from 'taro-ui';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CheckListProductInterface } from './interfaces'
import _ from 'lodash';

interface MoreDetail {
  props: {
    login: any
    CheckList: any
    dispatch: Dispatch<any>
  }
  state: {
    orderInfo: any
    distributeCode: string
    open: boolean
    status: number
    currentViewIndex: number
    dataSource: CheckListProductInterface[]
    currentRecord: CheckListProductInterface
  }
}

@connect(({ login, CheckList }) => ({ login, CheckList }))
class MoreDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      orderInfo: {},
      distributeCode: '',
      open: false,
      dataSource: [],
      status: undefined,
      currentViewIndex: undefined,
      currentRecord: undefined
    }
  }

  UNSAFE_componentWillMount () {
    let { distributeCode, status, currentViewIndex } = getCurrentInstance().router.params;
    this.setState({ distributeCode, status, currentViewIndex });
  }

  componentDidMount(){

    this._getCheckInfo();
    this._getCheckDetailList();
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

  // 单据信息
  _getCheckInfo = () => {
    let payload = {
      distributeCode: this.state.distributeCode,
      checkType: this.getCurrType(),
    }
    this.props.dispatch({
      type: 'CheckList/getCheckDetailHeader',
      payload,
      callback: data => {
        if(data.code === 200){
          this.setState({ orderInfo: data.data.list[0] })
        }else{
          Taro.showToast({
            title: '获取单据详情失败',
            icon: 'none'
          })
        }
      }
    })
  }

  //产品信息
  _getCheckDetailList = (callback?:() => void) => {
    const { distributeCode, status, currentViewIndex } = this.state;
    console.log(currentViewIndex,'currentViewIndex')
    this.props.dispatch({
      type: 'CheckList/getDrugDetailList',
      payload: { 
        distributeCode,
        status: status || 1
      },
      callback: data => {
        if(data.code === 200){
          let dataSource = data.data.list;
          this.setState({ 
            dataSource,
            idKeys: dataSource.map((item: any) => item.id),
            currentRecord: dataSource[currentViewIndex] || dataSource[0]
          })
        }
      }
    })
  }

  render() {
    const { orderInfo, open, dataSource, currentRecord } = this.state;
    console.log(dataSource,'dataSource');
    console.log(currentRecord,'currentRecord')
    return (
      <View className='homePageCard'>
        <AtAccordion
          title={'单据信息'}
          open={open}
          isAnimation={false}
          onClick={() => this.setState({ open: !open })}
        >
          {
            // 药库
            orderInfo.checkType === 1 ? 
            <AtList>
              <AtListItem title={'配送单号'} extraText={orderInfo.distributeCode}/>
              <AtListItem title={'计划单号'} extraText={orderInfo.orderCode}/>
              <AtListItem title={'状态'} extraText={orderInfo.statusName}/>
              <AtListItem title={'类型'} extraText={orderInfo.typeName}/>
              <AtListItem title={'供应商'} extraText={orderInfo.supplierName}/>
              <AtListItem title={'收货地址'} extraText={orderInfo.deptAddress}/>
            </AtList>
            :
            orderInfo.checkType === 2 ?
            <AtList>
              <AtListItem title={'出库单'} extraText={orderInfo.distributeCode}/>
              <AtListItem title={'状态'} extraText={orderInfo.statusName}/>
              <AtListItem title={'类型'} extraText={orderInfo.typeName}/>
            </AtList>
            :
            null
          }
        </AtAccordion>
        <View className='atList'>
          <View className='atListTitle'>产品信息</View>
          <AtList>
            <AtListItem title={'通用名'} extraText={currentRecord && currentRecord.ctmmGenericName}/>
            <AtListItem title={'商品名'} extraText={currentRecord && currentRecord.ctmmTradeName}/>
            <AtListItem title={'规格'} extraText={currentRecord && currentRecord.ctmmSpecification}/>
            <AtListItem title={'剂型'} extraText={currentRecord && currentRecord.ctmmDosageFormDesc}/>
            <AtListItem title={'生产厂家'} extraText={currentRecord && currentRecord.ctmmManufacturerName}/>
            {
              currentRecord && currentRecord.status === 1 ? 
              <AtInput 
                name={'approvalNo'}
                value={currentRecord && currentRecord.approvalNo ? currentRecord.approvalNo: ''}
                title='批准文号'
                placeholder='请输入批准文号'
                onChange={val => console.log(val,'val')}
                // onChange={val => this.props.onChange(val,'approvalNo')}
                // onFocus={this.props.resetActionSheet}
              />
              :
              <AtListItem title={'批准文号'} extraText={currentRecord && currentRecord.approvalNo}/>
            }
            <AtListItem title={'包装规格'} extraText={ currentRecord && currentRecord.packageSpecification}/>
            <AtListItem title={'单位'} extraText={ currentRecord && currentRecord.unit}/>
            <AtListItem title={'生产批号'} extraText={ currentRecord && currentRecord.productBatchNo}/>
            <AtListItem title={'生产日期'} extraText={ currentRecord && currentRecord.realProductTime}/>
            <AtListItem title={'有效期至'} extraText={ currentRecord && currentRecord.realValidEndDate}/>
            {
              orderInfo.isShowTemprature === 1 ?
              <AtListItem title={'验收温度(℃)'} extraText={currentRecord && currentRecord.realAcceptanceTemperature}/>
              : null
            }
            <AtListItem title={'配送数量'} extraText={currentRecord && currentRecord.realDeliveryQuantiry+''}/>
            <AtInput 
              name={'approvalNo'}
              value={currentRecord && currentRecord.id ? currentRecord.realReceiveQuantiry+'': undefined}
              title='实到数量'
              placeholder='请输入实到数量'
              onChange={val => console.log(val,'val')}
              // onChange={val => this.props.onChange(val,'approvalNo')}
              // onFocus={this.props.resetActionSheet}
            />
            <AtListItem title={'供应商'} extraText={currentRecord && currentRecord.supplierName}/>
          </AtList>
        </View>
      </View>
    )
  }
}

export default MoreDetail;