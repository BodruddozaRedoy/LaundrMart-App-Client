import React from 'react'
import { Text, View } from 'react-native'

const SecondaryButton = ({text}:any) => {
    return (
        <View className='border w-full flex-row gap-3 items-center justify-center p-3 border-blue-500 rounded-lg'>
            <Text className='text-black text-xl'>{text}</Text>
        </View>
    )
}

export default SecondaryButton