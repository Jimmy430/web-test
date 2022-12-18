import React from 'react'
// import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen'
import ForgetPWScreen from './ForgotPasswordScreen'
import PostcodeCheckScreen from './PostcodeCheckScreen'
import PostcodeAvailableScreen from './PostcodeAvailableScreen'
import PostcodeUnavailableScreen from './PostcodeUnavailableScreen'

import DeliveryListScreen from './DeliveryListScreen';
import MiniBuffetSearchScreen from './MiniBuffetSearchScreen'
import MiniBuffetMenuScreen from './MiniBuffetMenuScreen';
import MiniBuffetProductScreen from './MiniBuffetProductScreen'
import MiniBuffetCartScreen from './MiniBuffetCartScreen';

import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator()
export const RootStack = () => (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false,
            // ...TransitionPresets.SlideFromRightIOS
        }}
    >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgetPW" component={ForgetPWScreen} />
        <Stack.Screen name="postCheck" component={PostcodeCheckScreen} />
        <Stack.Screen name="postUnavailable" component={PostcodeUnavailableScreen} />
        <Stack.Screen name="postAvailable" component={PostcodeAvailableScreen} />

        <Stack.Screen name="DeliveryList" component={DeliveryListScreen} />

        <Stack.Screen name="MiniBuffetSearch" component={MiniBuffetSearchScreen} />
        <Stack.Screen name="MiniBuffetMenu" component={MiniBuffetMenuScreen} />
        <Stack.Screen name="MiniBuffetProduct" component={MiniBuffetProductScreen} />
        <Stack.Screen name="MiniBuffetCart" component={MiniBuffetCartScreen} />
        
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
)