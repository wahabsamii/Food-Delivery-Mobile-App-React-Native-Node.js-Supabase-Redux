import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home';
import Products from '../screens/Products';
import Cart from '../screens/Cart';
import Fav from '../screens/Fav';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const TabNav = () => {
    const PRIMARY = '#FFC107'; // Yellow (food app style)
    const DARK = '#1F2937';
    const GRAY = '#9CA3AF';

     const { cartItems } = useSelector((state) => state.cart);
     const { likeProducts } = useSelector((state) => state.like);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle:{
           fontFamily: 'Outfit-SemiBold',
        },
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 10,
        },

        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: GRAY,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home-variant';
          if (route.name === 'All Products') iconName = 'food';
          if (route.name === 'Cart') iconName = 'cart';
          if (route.name === 'Fav') iconName = 'heart';

          return (
            <Icon
              name={iconName}
              size={focused ? 28 : 24}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="All Products" component={Products} />
      <Tab.Screen name="Cart" component={Cart} options={{
        tabBarBadge: cartItems.length > 0 ? cartItems.length : undefined
      }}/>
      <Tab.Screen name="Fav" component={Fav} options={{
        tabBarBadge: likeProducts.length > 0 ? likeProducts.length : undefined
      }}/>
    </Tab.Navigator>
  );
};

export default TabNav;
