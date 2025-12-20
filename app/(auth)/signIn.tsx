import HeaderBackButton from '@/components/common/HeaderBackButton';
import { useToast } from '@/components/ui/toast/ToastContext';
import { images } from '@/constants';
import { useUser } from '@/hooks/useUser';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Errors = {
    identifier?: string;
    password?: string;
};

const SignInScreen = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    const { login, loginState } = useUser();
    const { success, error } = useToast();

    /* -------------------- VALIDATION -------------------- */
    const validate = () => {
        const e: Errors = {};

        if (!identifier) e.identifier = 'Email or phone is required';
        if (!password) e.password = 'Password is required';

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    /* -------------------- HANDLER -------------------- */
    const handleLogin = async () => {
        if (!validate()) return;

        try {
            const res = await login({
                email_or_phone: identifier,
                password,
            });

            success('Welcome back', res.message);
            router.replace('/(customer)/(tab)');
        } catch (err: any) {
            error(
                'Login Failed',
                err?.response?.data?.message || 'Invalid credentials'
            );
        }
    };

    /* -------------------- UI -------------------- */
    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior="padding"
            // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{
                            alignItems: 'center',
                            padding: 20,
                            flexGrow: 1,
                        }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Header */}
                        <View className="flex-row justify-between items-center w-full">
                            <HeaderBackButton onPress={() => router.back()} />
                            <View />
            </View>

            {/* Logo */}
                        <View className="mt-10 w-60 h-20">
                            <Image
                                source={images.Logo}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
            </View>

                        {/* Titles */}
            <Text className="text-3xl font-bold text-[#475569] mt-5">
                            Welcome Back
            </Text>
                        <Text className="text-[#64748B] mt-1 mb-10">
                            Login to your account
                        </Text>

            {/* Inputs */}
                        <View className="w-full gap-5">
                            {/* Email / Phone */}
                            <View>
                                <Text className="mb-2 font-semibold text-[#64748B]">
                                    Enter Email / Phone Number
                                </Text>
                                <TextInput
                                    value={identifier}
                                    onChangeText={(v) => {
                                        setIdentifier(v);
                                        setErrors((e) => ({ ...e, identifier: undefined }));
                                    }}
                                    placeholder="example@email.com or 017XXXXXXXX"
                                    placeholderTextColor="#94A3B8"
                                    className="py-4 px-5 rounded-lg border text-black border-[#D4D3D3]"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                                {errors.identifier && (
                                    <Text className="text-red-500 text-sm mt-1">
                                        {errors.identifier}
                                    </Text>
                                )}
                            </View>

                            {/* Password */}
                            <View>
                                <Text className="mb-2 font-semibold text-[#64748B]">
                                    Password
                                </Text>
                                <View className="flex-row items-center border border-[#D4D3D3] rounded-lg px-4">
                                    <Ionicons
                                        name="lock-closed-outline"
                                        size={22}
                                        color="#94A3B8"
                                    />
                                    <TextInput
                                        value={password}
                                        onChangeText={(v) => {
                                            setPassword(v);
                                            setErrors((e) => ({ ...e, password: undefined }));
                                        }}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#94A3B8"
                                        secureTextEntry={!showPassword}
                                        className="flex-1 py-4 px-2 text-black"
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Ionicons
                                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                            size={22}
                                            color="#94A3B8"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && (
                                    <Text className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </Text>
                                )}
                            </View>
            </View>

                        {/* Forgot password */}
                        <View className="w-full items-end mt-3">
                            <TouchableOpacity
                                onPress={() => router.push('/(auth)/forgetPassword')}
                            >
                                <Text className="text-primary font-medium">
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
            </View>

                        {/* Submit */}
                        <TouchableOpacity
                            onPress={handleLogin}
                            disabled={loginState.isPending}
                            className="w-full p-4 rounded-lg mt-10 bg-primary"
                        >
                            <Text className="text-white text-center text-lg font-semibold">
                                {loginState.isPending ? 'Signing In...' : 'Sign In'}
                            </Text>
            </TouchableOpacity>

                        {/* Signup */}
            <View className="flex-row mt-4">
                            <Text className="text-[#475569]">
                                Don’t have an account?
                            </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/signUp')}>
                                <Text className="text-primary font-semibold ml-1">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
            </View>

                        {/* Extra spacing for keyboard */}
                        <View className="h-20" />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignInScreen;
