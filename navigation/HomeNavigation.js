import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

import Home from '../screens/Dashboard/Home';

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

const HomeNavigator = createStackNavigator();

export const Navigator = () => {
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

const BottomTabNavigator = createBottomTabNavigator();

export const BottomNavigator = () => {
  const dispatch = useDispatch();

  return <BottomTabNavigator.Navigator
    screenOptions={({ route }) => ({
      headerRight: (props) => {
        return <View style={{paddingRight: 10 }}>
          <SafeAreaView>
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Appointments') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === "Wallet") {
          iconName = focused ? 'wallet' : 'wallet-outline'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <BottomTabNavigator.Screen
      name="Home"
      component={Home}
    />
    <BottomTabNavigator.Screen
      name="Appointments"
      component={Dashboard}
    />
    <BottomTabNavigator.Screen
      name="Wallet"
      component={Wallet}
    />
    <BottomTabNavigator.Screen
      name="Profile"
      component={Dashboard}
    />
  </BottomTabNavigator.Navigator >
}



