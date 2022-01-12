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

const AllDaySlots = ({ avail, setAvail }) => {
    const [date, setDate] = useState(dayjs());
    const [isStart, setIsStart] = useState(true);
    const [show, setShow] = useState(false);
    const [start, setStart] = useState(dayjs().set('hours', avail[Days[0]].start.split(":")[0]).set('minutes', avail[Days[0]].start.split(":")[1]))
    const [end, setEnd] = useState(dayjs().set('hours', avail[Days[0]].end.split(":")[0]).set('minutes', avail[Days[0]].end.split(":")[1]))

    const onChangeActiveDay = (day) => {
        const x = { ...avail };
        x[day] = {
            ...avail[day],
            active: !avail[day].active
        }
        setAvail(x);
    }

    const timeChangeHandler = (se, time) => {
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
        for (let day = 0; day < 7; day++) {

            x[Days[day]].active = true;

            if (isStart) {
                x[Days[day]].start = dayjs(d).format("HH:mm")
                setStart(dayjs(d))
            } else {

                let s = x[Days[day]].start.split(":");
                let e = dayjs(d).format("HH:mm").split(":");

                if (e[0] < s[0] || (e[0] == s[0] && e[1] <= s[1])) {
                    return;
                }
                x[Days[day]].end = dayjs(d).format("HH:mm")
                setEnd(dayjs(d))
            }
        }

        setDate(dayjs(d));
        setAvail(x);
    }

    return <View style={{ paddingTop: 20 }}>
        <View style={{ borderBottomWidth: 1, padding: 10, borderColor: "#fff", elevation: 1, marginBottom: 2 }}>
            <View style={{ flexDirection: "row" }}>
                <View>
                    <Text style={{ fontWeight: "bold" }}>start</Text>
                    <SlotButton
                        title={start.format('HH:mm')}
                        onPress={() => { timeChangeHandler("start", start) }}
                    />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>end</Text>
                    <SlotButton
                        title={end.format('HH:mm')}
                        onPress={() => { timeChangeHandler("end", end) }}
                    />
                </View>
            </View>
        </View>
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

export default AllDaySlots;
