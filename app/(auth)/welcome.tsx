import { images } from '@/constants'
import React from 'react'
import { Image, Text, View } from 'react-native'

const WelcomeScreen = () => {
  return (
    <View className='h-full'>
      <View className='h-1/2'>
        <Image
          source={images.AuthWelcome}
          className='size-full'
          resizeMode='stretch'
        />
      </View>
      <Text>Welcome to Laundrmart – Where Laundry Day Is a Thing of the Past!</Text>
    </View>
  )
}

export default WelcomeScreen