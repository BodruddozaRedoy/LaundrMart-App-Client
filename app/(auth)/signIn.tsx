import { images } from '@/constants'
import React from 'react'
import { Image, Text, TextInput, View } from 'react-native'

const SignInScreen = () => {
    return (
        <View className='items-center pt-10 p-5'>
            <View className='size-60'>
                <Image
                    source={images.Logo}
                    className='size-full'
                    resizeMode='contain'
                />
            </View>
            <Text className='text-4xl font-bold text-[#475569]'>Welcome Back</Text>
            <Text className='text-[#64748B]'>Login to your account</Text>

            <View className='pt-20 w-full gap-5'>
                <View className='w-full'>
                    <Text className='mb-2 font-semibold text-[#64748B]'>Enter Email / Phone Number</Text>
                    <TextInput placeholder='Type here...' className='py-4 px-5 rounded-lg border border-[#D4D3D3] w-full' />
                </View>
                <View className='w-full'>
                    <Text className='mb-2 font-semibold text-[#64748B]'>Password</Text>
                    <TextInput placeholder='Type here...' className='py-4 px-5 rounded-lg border border-[#D4D3D3] w-full' />
                </View>
            </View>

            
        </View>
    )
}

export default SignInScreen