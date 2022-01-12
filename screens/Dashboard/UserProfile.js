import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet, FlatList, ImageBackground, Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import Constants from 'expo-constants';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import SelectDropdown from 'react-native-select-dropdown'
import * as authActions from '../../store/actions/auth';
import { AppButton } from '../../components/UI/button';

dayjs.extend(duration)

const API_URL = Constants.manifest.extra.API_URL;

const Days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const UserProfile = props => {

    const [days, setDays] = useState([]);
    const navigation = useNavigation();
    const userId = useSelector(state => state.auth.userId);
    const data = props.route.params;
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedStart, setSelectedStart] = useState(dayjs());
    const [selectedEnd, setSelectedEnd] = useState(dayjs());
    const [defaultText, setDefaultText] = useState('');
    const [booking, setBooking] = useState(false);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        let x = [];
        // console.log(data.availablity);
        for (let i = 0; i < 7; i++) {
            const dIdx = (dayjs().day() + i) % 7;
            // console.log(data.availablity[Days[dIdx]].active)
            // console.log(dIdx)
            if (data && data.availablity && data.availablity[Days[dIdx]]?.active) {
                x.push(dIdx)
            }
        }

        setDays(x);
        setSelectedDate(dayjs());
    }, [data])


    const BookSlot = async () => {
        setBooking(true);
        try {
            // console.log(data);
            await Axios.post(API_URL + `/slot/bookSlot`, {
                userId,
                consultantId: data._id,
                startTime: selectedStart.toDate(),
                endTime: selectedEnd.toDate(),
                callRate: data.callRate
            })
            dispatch(authActions.getUserData(userId))
            navigation.navigate("Home")
        } catch (e) {
            console.log(e)
            Alert.alert("Error", "Not enough Credit", [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ])
        }
        setBooking(false);
    }

    const Slots = (start, end, slotSize, breakSize) => {
        let s = dayjs(start);
        let e = dayjs(end);

        const slots = [];
        while (s.isBefore(e) && s.isAfter(dayjs())) {
            slots.push(
                { start: s.toISOString(), end: s.add(slotSize, 'minutes').clone().toISOString() }
            )
            s = s.add(slotSize + breakSize, 'minutes')
        }
        return slots;
    }

    const Item = ({ item }) => {
        const day = Days[item]
        const s = data.availablity[day].start.split(":");
        const start = dayjs(selectedDate).clone().set('hours', s[0]).set('minutes', s[1]);
        const e = data.availablity[day].end.split(":");
        const end = dayjs(selectedDate).clone().set('hours', e[0]).set('minutes', e[1]);
        const slotSize = data.availablity[day].slotSize;
        const breakSize = data.availablity[day].breakSize;
        const slots = Slots(start, end, slotSize, breakSize);
        // console.log(selectedDate.toISOString(), slots)

        if (slots.length < 1) return <Text>No Slot Available</Text>

        return (
            <View>
                <SelectDropdown
                    key={"sadasd"}
                    data={slots}
                    buttonStyle={{ borderWidth: 1, borderRadius: 5, width: '100%' }}
                    defaultButtonText={`${defaultText}`}
                    rowTextForSelection={(item, index) => {
                        return `${dayjs(item.start).format("hh:mm a")} - ${dayjs(item.end).format("hh:mm a")}`
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `${dayjs(item.start).format("hh:mm a")} - ${dayjs(item.end).format("hh:mm a")}`
                    }}
                    onSelect={(item) => {
                        setSelectedStart(dayjs(item.start));
                        setSelectedEnd(dayjs(item.end));
                        setDefaultText(`${dayjs(item.start).format("hh:mm a")} - ${dayjs(item.end).format("hh:mm a")}`)
                        setShow(true)
                    }}
                />
            </View>
        )
    }



    return (
        <View style={styles.screen}>
            <ImageBackground source={{ uri: data.image }} resizeMode="cover" style={styles.profileImage}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={{ color: "#fff" }}>{data.email}</Text>
                </View>
            </ImageBackground>
            <View style={{ padding: 10, backgroundColor: "#ccc" }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Book A Slot</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 18, paddingBottom: 5, fontWeight: "bold" }}>Choose Day & Date: </Text>
                <SelectDropdown
                    key={"sadasdsdas"}
                    data={days}
                    buttonStyle={{ borderWidth: 1, borderRadius: 5, width: '100%' }}
                    defaultButtonText={selectedDate.format('dddd - DD/MMM/YYYY')}
                    rowTextForSelection={(item, index) => {
                        const dIdx = (dayjs().day() + item);
                        const d = dayjs().day(dIdx);
                        return (
                            <Text key={index} style={{ textTransform: "capitalize" }}>{Days[dIdx % 7]} - {d.format('DD/MMM/YYYY')}</Text>
                        )
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        const dIdx = (dayjs().day() + item);
                        const d = dayjs().day(dIdx);
                        return (
                            <Text key={index} style={{ textTransform: "capitalize" }}>{Days[dIdx % 7]} - {d.format('DD/MMM/YYYY')}</Text>
                        )
                    }}
                    onSelect={(item) => {
                        const dIdx = (dayjs().day() + item);
                        const d = dayjs().day(dIdx);
                        setSelectedDate(d)
                    }}
                />

            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 18, paddingBottom: 5, fontWeight: "bold" }}>Choose Time: </Text>
                <Item item={selectedDate.day()} />
                {show &&
                    <AppButton
                        title={`Book by Paying ₹${data.callRate}`}
                        Style={{ marginTop: 20 }}
                        TextStyle={{ fontSize: 18 }}
                        onPress={() => { BookSlot() }}
                        disabled={booking}
                    />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
        width: '100%',

    },
    profileImage: {
        width: '100%',
        height: 300
    },
    name: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        fontSize: 30

    }

});

export default UserProfile;