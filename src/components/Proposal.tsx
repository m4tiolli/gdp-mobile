import { View, Text } from 'react-native'
import React from 'react'
import { Button } from './Button'
import { AntDesign } from '@expo/vector-icons'

const Proposal = () => {
  return (
    <View className='h-12 rounded-md border border-gray-100 px-2 justify-between items-center flex-row'>
      <Text className='font-bold w-1/2'>ELOEF 0001R24</Text>
      <Button label={<AntDesign name='eyeo' size={20} />} className='w-12' />
      <Button label={<AntDesign name='edit' size={20} />} className='w-12' />
      <Button label={<AntDesign name='delete' size={20} />} className='w-12' variant={"destructive"} />
    </View>
  )
}

export default Proposal