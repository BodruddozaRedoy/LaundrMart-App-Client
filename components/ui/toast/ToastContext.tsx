import React, { createContext, useContext, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastType = 'success' | 'error';

type ToastPayload = {
  type: ToastType;
  title: string;
  description?: string;
};

type ToastContextType = {
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastPayload | null>(null);

  const translateY = useRef(new Animated.Value(-80)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const showToast = (data: ToastPayload) => {
    setToast(data);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -80,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start(() => setToast(null));
    }, 3000);
  };

  return (
    <ToastContext.Provider
      value={{
        success: (title, description) =>
          showToast({ type: 'success', title, description }),
        error: (title, description) =>
          showToast({ type: 'error', title, description }),
      }}
    >
      {children}

      {toast && (
        <Animated.View
          style={{
            position: 'absolute',
            top: insets.top + 8,
            left: 16,
            right: 16,
            transform: [{ translateY }],
            opacity,
            zIndex: 1000,
          }}
        >
          <View className="flex-row items-start rounded-lg bg-white px-4 py-3 shadow-md">
            <Ionicons
              name={
                toast.type === 'success'
                  ? 'checkmark-circle'
                  : 'close-circle'
              }
              size={22}
              color={toast.type === 'success' ? '#22c55e' : '#ef4444'}
              style={{ marginTop: 2 }}
            />

            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">
                {toast.title}
              </Text>
              {toast.description && (
                <Text className="text-sm text-gray-500 mt-0.5">
                  {toast.description}
                </Text>
              )}
            </View>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};
