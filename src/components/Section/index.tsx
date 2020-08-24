import React from 'react';
import { View, Text } from '@tarojs/components'
import './index.scss';

interface Props {
  children: React.ReactChild,
  title: string
}

const Section: React.FC<Props> = (props:Props) => {
  const { title, children } = props;
  return (
    <View className='sctionArea'>
      <View className='title'>{title}</View>
      <View className='children'>{children}</View>
    </View>
  )
}

export default Section 