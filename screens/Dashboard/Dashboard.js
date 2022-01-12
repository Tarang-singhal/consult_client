import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppButton } from '../../components/UI/button';
import { useNavigation } from '@react-navigation/core';
import * as authActions from '../../store/actions/auth';


const Profile = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector(state => state.auth.userId)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(authActions.getUserData(userId))
  }, [])

  return (
    <View style={styles.screen}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 0.7 }}>
          <Image style={styles.mapImage} source={{ uri: user.image || 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png' }} />
        </View>
        <View style={{ flex: 1, paddingBottom: 40 }}>
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>{user.name}</Text>
          <Text>{user.email}</Text>
          <View style={{ elevation: 3, width: 100, borderWidth: 1, borderColor: "#fff", justifyContent: "center", alignItems: "center", padding: 4 }}>
            <Text>{user.professionName}</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <AppButton
          title={"Set Availability"}
          TextStyle={{ fontSize: 15, textTransform: "uppercase" }}
          onPress={() => { navigation.navigate("Set Your Online Hours") }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20
  },
  mapImage: {
    width: 120,
    height: 120,
    borderRadius: 70
  },
});

export default Profile;
