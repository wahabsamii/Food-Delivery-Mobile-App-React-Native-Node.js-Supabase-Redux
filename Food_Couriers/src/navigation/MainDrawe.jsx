import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TabNav from './TabNav';
import Profile from '../screens/Profile';
import Orders from '../screens/Orders';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator();

const PRIMARY = '#FFC107';

const MainDrawe = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          width: 285,
          backgroundColor: '#fff',
        },

        drawerActiveBackgroundColor: PRIMARY,
        drawerActiveTintColor: '#111827',
        drawerInactiveTintColor: '#6B7280',

        drawerLabelStyle: {
          fontFamily: 'Outfit-SemiBold',
          fontSize: 14,
          marginLeft: -5,
        },

        drawerItemStyle: {
          borderRadius: 12,
          marginHorizontal: 10,
          marginVertical: 3,
          paddingHorizontal: 5,
        },

        drawerIconStyle: {
          marginRight: 0,
        },
      }}
    >

      {/* Home */}
      <Drawer.Screen
        name="HomeTabs"
        component={TabNav}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Profile */}
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My Profile',
          drawerIcon: ({ color, size }) => (
            <Icon
              name="account-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Orders */}
      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{
          title: 'My Orders',
          drawerIcon: ({ color, size }) => (
            <Icon
              name="clipboard-text-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Settings */}
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Icon
              name="cog-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
};

export default MainDrawe;
