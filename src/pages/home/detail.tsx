/*
 * @Author: wwb 
 * @Date: 2020-08-09 23:48:26 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-10 16:34:05
 */
import React, { Component } from 'react'
import { View } from '@tarojs/components';
 class HomeDetail extends React.Component{

  componentDidMount(){
    let pages = Taro.getCurrentPages();
    let prevPage = pages[pages.length - 2]; //上一个页面
    console.log(prevPage,'prevPage');
  }

   render(){
     return (
      <View>
        11111
      </View>
     )
   }
 }
 export default HomeDetail;