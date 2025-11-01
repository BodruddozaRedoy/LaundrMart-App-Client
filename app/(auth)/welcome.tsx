import PrimaryButton from '@/components/shared/PrimaryButton'
import SecondaryButton from '@/components/shared/SecondaryButton'
import { images } from '@/constants'
import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const WelcomeScreen = () => {
  return (
    <View className='h-full relative'>
      <View className='size-32 absolute z-40 top-10 left-10 h-auto'>
        <Image
          source={images.Logo}
          className='size-full'
          resizeMode='contain'
        />
      </View>
      <View className='h-1/2'>
        <Image
          source={images.AuthWelcome}
          className='size-full'
          resizeMode='stretch'
        />
      </View>
      <View className='p-10 flex items-center justify-center gap-6'>
        <Text className='text-center font-semibold text-[#475569] text-xl pb-5'>Welcome to Laundrmart – Where Laundry Day Is a Thing of the Past!</Text>
        <TouchableOpacity className='w-full' onPress={() => router.push("/(auth)/signUp")}>
          <PrimaryButton text="Sign Up" />
        </TouchableOpacity>
        <TouchableOpacity className='w-full' onPress={() => router.push("/(auth)/signIn")}>
          <SecondaryButton text="Sign In" />
        </TouchableOpacity>

        <View className='border w-full flex-row gap-3 items-center justify-center p-3 border-blue-500 rounded-lg'>
          <Image
            source={{ uri: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" }}
            className='size-8'
          />
          <Text className='text-black text-xl'>Google</Text>
        </View>
        <Text className='font-semibold text-blue-500 text-xl pt-5'>Continue as a guest</Text>

      </View>
    </View>
  )
}

export default WelcomeScreen