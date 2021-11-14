import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';


const Login = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Text>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Login;
