/*
 * @Author: wwb 
 * @Date: 2020-08-14 15:16:59 
 * @Last Modified by: wwb
 * @Last Modified time: 2020-08-20 15:24:40
 */

import React from 'react';
import { Text, View } from '@tarojs/components';
import './index.scss';

interface IProps {
  text: string,
  bgColor?: string
}

const Tag: React.FC<IProps> = ({ text, bgColor }: IProps) => {
  return (
    <View className='tag-container' style={{ color: bgColor ? bgColor: '#238962' }}>
      <Text className='text'>{text}</Text>
    </View>
  )
}

export default Tag;