import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator, HomeNavigator, BottomNavigator } from './AllNavigators';
import StartupScreen from '../screens/main';

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <HomeNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
