import React from 'react'
import { Image, Text, View } from 'react-native'

const PrimaryButton = ({ text, icon }: any) => {
    return (
        <View className='bg-blue-500 w-full items-center justify-center p-4 rounded-lg'>
            <Text className='text-white text-xl'>{text}</Text>
        </View>
    )
}

export default PrimaryButton