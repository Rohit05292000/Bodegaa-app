import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home/HomeScreen';
import CategoryScreen from '../screens/Product/CategoryScreen';
import CartScreen from '../screens/Product/CartScreen'
import OrdersScreen from '../screens/Home/OrdersScreen';
import FavoriteScreen from '../screens/Home/FavoriteScreen'
import ProfileScreen from '../screens/Home/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60, paddingBottom: 5, backgroundColor: '#fff' },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Category':
              iconName = 'grid-outline';
              break;
            case 'Cart':
              iconName = 'cart-outline';
              break;
            case 'Orders':
              iconName = 'bag-outline';
              break;
            case 'Fav':
              iconName = 'heart-outline';
              break;
               case 'Profile':
              iconName = 'person-circle-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Unique screen names prevent duplicate name warnings */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name = "Fav" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}