import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import BottomTabs from './BottomTabs'
import ProductDetailsScreen from '../screens/Home/ProductDetailsScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name='Main'
        component={BottomTabs}
        options={{ headerShown: false }} />

        <Stack.Screen
         name="ProductDetails"
         component={ProductDetailsScreen}
         options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}