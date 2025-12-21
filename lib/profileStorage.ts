import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomerProfile } from "@/types/user.types";

const PROFILE_KEY = "customer_profile";

export const getStoredProfile = async (): Promise<CustomerProfile | null> => {
  const data = await AsyncStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
};

export const storeProfile = async (profile: CustomerProfile) => {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const clearProfile = async () => {
  await AsyncStorage.removeItem(PROFILE_KEY);
};
