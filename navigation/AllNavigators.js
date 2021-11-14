import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import {
//   createDrawerNavigator,
//   DrawerItemList
// } from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Dashboard from '../screens/Dashboard';

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  };

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AuthStackNavigator.Screen 
            name="Login"
            component={Login}
        />
        <AuthStackNavigator.Screen 
            name="Signup"
            component={Signup}
        />
    </AuthStackNavigator.Navigator>
}

const DashboardStackNavigator = createStackNavigator();

export const DashboardNavigator = () =>{
    return <DashboardStackNavigator.Navigator>
        <DashboardStackNavigator.Screen 
            name="dashboard"
            component={Dashboard}
        />
    </DashboardStackNavigator.Navigator>
}


