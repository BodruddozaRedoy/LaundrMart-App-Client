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
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Errors = {
    identifier?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
};

const SignUpScreen = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    const { register, registerState } = useUser();
    const { success, error } = useToast();

    /* -------------------- VALIDATION -------------------- */
    const validate = () => {
        const e: Errors = {};

        if (!identifier) e.identifier = 'Email or phone is required';
        if (!password) e.password = 'Password is required';
        else if (password.length < 8)
            e.password = 'Password must be at least 8 characters';

        if (!confirmPassword) e.confirmPassword = 'Confirm your password';
        else if (password !== confirmPassword)
            e.confirmPassword = 'Passwords do not match';

        if (!agreeTerms) e.terms = 'You must accept terms & conditions';

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    /* -------------------- HANDLER -------------------- */
    const handleRegister = async () => {
        if (!validate()) return;

        const payload = {
            role: 'Customer' as const,
            password,
            ...(identifier.includes('@')
                ? { email: identifier }
                : { phone_number: identifier }),
        };
        console.log(payload)

        try {
            const res = await register(payload);
            success('Account Created', res.message);
            router.replace({ pathname: '/(auth)/verify', params: { email: identifier } });
        } catch (err: any) {
            console.log(err)
            error(
                'Signup Failed',
                err?.response?.data?.message || 'Something went wrong'
            );
        }
    };

    /* -------------------- UI -------------------- */
    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                // FIX: 'padding' is standard for iOS, Android usually handles 'height' or nothing better
                behavior={'padding'}
                // className="flex-1 bg-white"
                // FIX: Offset accounts for the status bar/header height so the keyboard doesn't cover the input
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 70}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{
                            alignItems: 'center',
                            padding: 20,
                            flexGrow: 1
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
                            <Image source={images.Logo} className="w-full h-full" resizeMode="contain" />
                        </View>

                        {/* Titles */}
                        <Text className="text-3xl font-bold text-[#475569] mt-5">Welcome</Text>
                        <Text className="text-[#64748B] mt-1 mb-10">Create an account</Text>

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
                                    // FIX: Added placeholderTextColor to ensure visibility
                                    placeholderTextColor="#94A3B8"
                                    className="py-4 px-5 rounded-lg border text-black border-[#D4D3D3]"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                                {errors.identifier && (
                                    <Text className="text-red-500 text-sm mt-1">{errors.identifier}</Text>
                                )}
                            </View>

                            {/* Password */}
                            <View>
                                <Text className="mb-2 font-semibold text-[#64748B]">Password</Text>
                                <View className="flex-row items-center border border-[#D4D3D3] rounded-lg px-4">
                                    <Ionicons name="lock-closed-outline" size={22} color="#94A3B8" />
                                    <TextInput
                                        value={password}
                                        onChangeText={(v) => {
                                            setPassword(v);
                                            setErrors((e) => ({ ...e, password: undefined }));
                                        }}
                                        // FIX: Added missing placeholder and color
                                        placeholder="Enter your password"
                                        placeholderTextColor="#94A3B8"
                                        secureTextEntry={!showPassword}
                                        className="flex-1 py-4 px-2 text-black"
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                        <Ionicons
                                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                            size={22}
                                            color="#94A3B8"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && (
                                    <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
                                )}
                            </View>

                            {/* Confirm Password */}
                            <View>
                                <Text className="mb-2 font-semibold text-[#64748B]">
                                    Confirm Password
                                </Text>
                                <View className="flex-row items-center border border-[#D4D3D3] rounded-lg px-4">
                                    <Ionicons name="lock-closed-outline" size={22} color="#94A3B8" />
                                    <TextInput
                                        value={confirmPassword}
                                        onChangeText={(v) => {
                                            setConfirmPassword(v);
                                            setErrors((e) => ({ ...e, confirmPassword: undefined }));
                                        }}
                                        // FIX: Added missing placeholder and color
                                        placeholder="Confirm your password"
                                        placeholderTextColor="#94A3B8"
                                        secureTextEntry={!showConfirmPassword}
                                        className="flex-1 py-4 px-2 text-black"
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <Ionicons
                                            name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                                            size={22}
                                            color="#94A3B8"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {errors.confirmPassword && (
                                    <Text className="text-red-500 text-sm mt-1">
                                        {errors.confirmPassword}
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* Terms */}
                        <View className="flex-row items-start w-full mt-4">
                            <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)}>
                                <Ionicons
                                    name={agreeTerms ? 'checkbox-outline' : 'square-outline'}
                                    size={22}
                                    color={agreeTerms ? '#2563EB' : '#94A3B8'}
                                />
                            </TouchableOpacity>
                            <Text className="ml-2 text-[#64748B] flex-1">
                                I agree to the Terms & Conditions and Privacy Policy.
                            </Text>
                        </View>
                        {errors.terms && (
                            <Text className="text-red-500 text-sm w-full mt-1">{errors.terms}</Text>
                        )}

                        {/* Submit */}
                        <TouchableOpacity
                            onPress={handleRegister}
                            disabled={registerState.isPending}
                            className="w-full p-4 rounded-lg mt-10 bg-primary"
                        >
                            <Text className="text-white text-center text-lg font-semibold">
                                {registerState.isPending ? 'Creating Account...' : 'Sign Up'}
                            </Text>
                        </TouchableOpacity>

                        {/* Extra space at bottom to ensure scrolling works when keyboard is open */}
                        <View className="h-20" />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUpScreen;