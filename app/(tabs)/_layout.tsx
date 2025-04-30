import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { House as Home, Users, CirclePlus as PlusCircle, Wallet } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="pay"
        options={{
          title: 'Pay',
          tabBarButton: (props) => (
            <TouchableOpacity
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...props as any}
              style={styles.payButton}
              onPress={() => {
                router.push('/friends?action=pay');
              }}
            >
              <View style={styles.payButtonInner}>
                <PlusCircle size={32} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => <Wallet color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    height: 60,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  payButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});