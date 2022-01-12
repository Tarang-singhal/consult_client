import React, { useState } from 'react';
import {
    View,
    Text,
    Switch,
} from 'react-native';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import duration from 'dayjs/plugin/duration'
import { SlotButton } from '../../components/UI/button';
dayjs.extend(duration);

const Days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const CustomSlots = ({ avail, setAvail }) => {
    const [date, setDate] = useState(dayjs());
    const [day, setDay] = useState(0);
    const [isStart, setIsStart] = useState(true);
    const [show, setShow] = useState(false);

    const onChangeActiveDay = (day) => {
        console.log(day);
        const x = { ...avail };
        x[day] = {
            ...avail[day],
            active: !avail[day].active
        }
        setAvail(x);
    }

    const timeChangeHandler = (dayIdx, se, time) => {
        setDay(dayIdx);
        if (se === "start") {
            setIsStart(true);
        } else {
            setIsStart(false);
        }
        setDate(dayjs(time));
        setShow(true);
    }

    const onTimeChange = (e, d) => {
        setShow(false)
        if (!d) return;
        let x = { ...avail };
        if (isStart) {
            x[Days[day]].start = dayjs(d).format("HH:mm")
        } else {

            let s = x[Days[day]].start.split(":");
            let e = dayjs(d).format("HH:mm").split(":");

            if (e[0] < s[0] || (e[0] == s[0] && e[1] <= s[1])) {
                return;
            }

            x[Days[day]].end = dayjs(d).format("HH:mm")
        }

        setDate(dayjs(d));
        setAvail(x);
    }

    return <View style={{ paddingTop: 20 }}>
        {
            Days.map((day, idx) => {

                let s = avail[day].start.split(":");
                // console.log(avail[day]);
                let start = dayjs().set('day', idx).set('hours', s[0]).set('minutes', s[1])

                let e = avail[day].end.split(":");
                let end = dayjs().set('day', idx).set('hours', e[0]).set('minutes', e[1])

                return (
                    <View key={day + idx} style={{ borderBottomWidth: 1, padding: 10, borderColor: "#fff", elevation: 1, marginBottom: 2 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontSize: 15, textTransform: 'capitalize', fontWeight: "bold" }}>{day}</Text>
                            <Switch
                                value={avail[day].active}
                                onChange={() => { onChangeActiveDay(day) }}
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                <Text style={{ fontWeight: "bold" }}>start</Text>
                                <SlotButton
                                    title={start.format('HH:mm')}
                                    onPress={() => { timeChangeHandler(idx, "start", start) }}
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontWeight: "bold" }}>end</Text>
                                <SlotButton
                                    title={end.format('HH:mm')}
                                    onPress={() => { timeChangeHandler(idx, "end", end) }}
                                />
                            </View>
                        </View>
                    </View>
                )
            })
        }
        {show &&
            <DateTimePicker
                testID="dateTimePicker"
                value={date.toDate()}
                mode={"time"}
                is24Hour={false}
                display="default"
                onChange={onTimeChange}
            />
        }
    </View>
};

export default CustomSlots;
