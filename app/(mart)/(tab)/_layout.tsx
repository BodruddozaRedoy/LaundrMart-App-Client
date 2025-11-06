import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabsLayout() {
  const renderIcon = (
    focused: boolean,
    iconComponent: React.ReactNode
  ): React.ReactNode => (
    <View
      className={`items-center justify-center rounded-full mb-3 ${focused ? "bg-primary" : "bg-transparent"
        }`}
      style={{
        width: 50,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {iconComponent}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 110,
          borderTopWidth: 0,
          backgroundColor: "#fff",
          elevation: 8,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 4,
          paddingTop: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 5,
        },
        tabBarActiveTintColor: "#017FC6",
        tabBarInactiveTintColor: "#94A3B8",
      }}
    >
      {/* 🏠 Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              <MaterialCommunityIcons
                name={focused ? "view-dashboard-outline" : "view-dashboard-outline"}
                size={24}
                color={focused ? "#fff" : "#94A3B8"}
              />
            ),
        }}
      />

      {/* 🚚 Orders Tab */}
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              <FontAwesome6
                name="box-open"
                size={22}
                color={focused ? "#fff" : "#94A3B8"}
              />
            ),
        }}
      />

      {/* ☰ Chat Tab */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              <Ionicons
                name={focused ? "chatbubble-ellipses-outline" : "chatbubble-ellipses-outline"}
                size={26}
                color={focused ? "#fff" : "#94A3B8"}
              />
            ),
        }}
      />
      {/* ☰ More Tab */}
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              <Ionicons
                name={focused ? "menu" : "menu-outline"}
                size={26}
                color={focused ? "#fff" : "#94A3B8"}
              />
            ),
        }}
      />
    </Tabs>
  );
}
