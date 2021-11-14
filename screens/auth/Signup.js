import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';


const Signup = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Text>Signup</Text>
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

export default Signup;
