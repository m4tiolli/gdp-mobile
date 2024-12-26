import { View, Text } from 'react-native'
import React from 'react'
import { Button } from './Button'
import { router } from 'expo-router'

const NoProposals = () => {
  return (
    <View className='items-center justify-center gap-4'>
      <Text className='text-center text-xl font-medium'>Sem propostas feitas.</Text>
      <Button label="Criar nova proposta" className='w-64' onPress={() => router.push("/")} />
    </View>
  )
}

export default NoProposals