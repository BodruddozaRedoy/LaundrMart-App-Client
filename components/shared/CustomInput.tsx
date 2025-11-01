import React from 'react'
import { Text, TextInput, View } from 'react-native'

const CustomInput = () => {
  return (
    <View className='w-full'>
      <Text className='mb-2 font-semibold'>Label</Text>
      <TextInput placeholder='Type here...' className='py-3 px-5 rounded-lg border w-full'/>
    </View>
  )
}

export default CustomInput