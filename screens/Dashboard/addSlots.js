import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Switch,
    Button
} from 'react-native';
import Constants from 'expo-constants'
import { useSelector, useDispatch } from 'react-redux';
import { SET_AVAILABLITY } from '../../store/actions/user';
import AllDaySlots from './allDaySlots';
import CustomSlots from './customSlots';
import { AppButton } from '../../components/UI/button'
import { useNavigation } from '@react-navigation/core';
const API_URL = Constants.manifest.extra.API_URL;

const AddSlots = props => {
    const { availablity } = useSelector(state => state.user)
    const { userId } = useSelector(state => state.auth)
    const [avail, setAvail] = useState({ ...availablity });
    const [avail2, setAvail2] = useState({ ...availablity })
    const dispatch = useDispatch();
    const [allDays, setAllDays] = useState(true);
    const navigation = useNavigation();


    useEffect(() => {
        let allDay = true;
        Object.keys(availablity).forEach(day => {
            allDay = allDay && availablity[day].active
        })
        setAllDays(allDay);
    }, [availablity])

    const onChangeDays = () => {
        setAllDays(!allDays)
        if (allDays) {

        } else {
            dispatch({ type: SET_AVAILABLITY, availablity })
        }
    }

    const saveAvailablity = async () => {
        if (allDays) {
            dispatch({ type: SET_AVAILABLITY, availablity: avail2 })
            await axios.patch(API_URL + `/user/saveAvailablity/${userId}`, {
                availablity: avail2
            })
        } else {
            dispatch({ type: SET_AVAILABLITY, availablity: avail })
            await axios.patch(API_URL + `/user/saveAvailablity/${userId}`, {
                availablity: avail
            })
        }
        navigation.navigate("Profile")
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.allDays}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.header}>Online All Days</Text>
                    <Switch
                        value={allDays}
                        onChange={() => { onChangeDays() }}
                    />
                </View>
                <View>
                    <Text>You can set a time or online and offline for all day</Text>
                    {
                        allDays &&
                        <AllDaySlots
                            avail={avail2}
                            setAvail={setAvail2}
                        />
                    }
                </View>

            </View>
            <View style={styles.customDays}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.header}>Customise All Days</Text>
                    <Switch
                        value={!allDays}
                        onChange={() => { onChangeDays() }}
                    />
                </View>
                <View>
                    <Text>You can set different time or online and offline for everyday</Text>
                    {
                        !allDays &&
                        <CustomSlots
                            avail={avail}
                            setAvail={setAvail}
                        />
                    }
                </View>
                <AppButton
                    title={"Save"}
                    onPress={() => { saveAvailablity() }}
                    Style={{ marginTop: 20 }}
                />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        borderTopWidth: 1,
        borderTopColor: "#bbb",
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    allDays: {
        paddingBottom: 15
    },
    customDays: {
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 10,
        paddingBottom: 50,
    },
    header: {
        fontSize: 18,
    }
});

export default AddSlots;
