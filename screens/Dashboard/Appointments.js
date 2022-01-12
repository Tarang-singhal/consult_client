import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppButton } from '../../components/UI/button';
import { useNavigation } from '@react-navigation/core';
import * as authActions from '../../store/actions/auth';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { IconButton, Colors } from 'react-native-paper';


dayjs.extend(duration)

const API_URL = Constants.manifest.extra.API_URL;

const Appointments = props => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userId = useSelector(state => state.auth.userId)
    const user = useSelector(state => state.user)
    const [slotAsUser, setSlotAsUser] = useState([]);
    const [slotAsCounsultant, setSlotAsCounsultant] = useState([]);

    async function fetchData() {
        const res = await Axios.get(API_URL + `/user/slotsAsUser/${userId}`);
        setSlotAsUser(res.data.data);

        const res2 = await Axios.get(API_URL + `/user/slotsAsConsultant/${userId}`);
        setSlotAsCounsultant(res2.data.data);

        // console.log(res2.data.data);

    }

    useEffect(() => {
        dispatch(authActions.getUserData(userId))
        fetchData();
    }, [])

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.section1}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>Your Appointments</Text>
                    <IconButton
                        icon="refresh"
                        color={Colors.red500}
                        size={20}
                        onPress={() => fetchData()}
                    />
                </View>
                {
                    slotAsCounsultant.map(booking => {
                        return (
                            <View style={styles.card} key={booking._id}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold" }}>Meeting With: </Text>
                                    <Text>{booking.user_id.name}</Text>

                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold" }}>Time: </Text>
                                    <Text>{dayjs(booking.end_time).format("YY/MM/DD, HH:mm")} - {dayjs(booking.start_time).format("YY/MM/DD, HH:mm")}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold" }}>Link: </Text>
                                    <Text style={{ color: "blue" }}>{booking.meeting_link}</Text>

                                </View>
                            </View>
                        )
                    })
                }
            </View >
            <View style={styles.section2}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Your Bookings</Text>
                {
                    slotAsUser.map(booking => {
                        return (
                            <View style={styles.card} key={booking._id}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold" }}>Meeting With: </Text>
                                    <Text>{booking.consultant_id.name}</Text>

                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold" }}>Time: </Text>
                                    <Text>{dayjs(booking.end_time).format("YY/MM/DD, HH:mm")} - {dayjs(booking.start_time).format("YY/MM/DD, HH:mm")}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold" }}>Link: </Text>
                                    <Text style={{ color: "blue" }}>{booking.meeting_link}</Text>

                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20
    },
    section1: {

    },
    section2: {
        borderTopWidth: 1,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 50
    },
    card: {
        borderWidth: 1,
        borderColor: "#eee",
        padding: 4,
        margin: 5,
        elevation: 1
    }
});

export default Appointments;
