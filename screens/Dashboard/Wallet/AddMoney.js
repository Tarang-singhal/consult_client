import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { useNavigation } from '@react-navigation/core';
import { GetTxnToken } from '../../../utils/index';
import { ADD_CASH } from '../../../store/actions/user';
import { AppButton } from '../../../components/UI/button';
import { TouchableOpacity } from 'react-native-web';

const API_URL = Constants.manifest.extra.API_URL

const AddMoney = props => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { userId } = useSelector(state => state.auth);
    const state = useSelector(state => state.user);
    const [isOrderIdUpdated, setOrderIdUpdated] = useState(false);
    useEffect(() => {
        if (!isOrderIdUpdated) {
            generateOrderId();
            setOrderIdUpdated(true);
        }
    });
    const [orderId, setOrderId] = useState('PARCEL15942011933');
    const [amount, setAmount] = useState(0);
    const [txnStarted, setTxnStarted] = useState(false);
    const [isStaging, setIsStaging] = useState(true);
    const [appInvokeRestricted, setIsAppInvokeRestricted] = useState(true);

    const generateOrderId = () => {
        const r = Math.random() * new Date().getMilliseconds();
        setOrderId(
            'PARCEL' +
            (1 + Math.floor(r % 2000) + 10000) +
            'b' +
            (Math.floor(r % 100000) + 10000),
        );
    };

    const startRawTransaction = async () => {
        if (amount <= 0) return;
        setTxnStarted(true)
        let amt = String(amount)
        let tranxToken = await GetTxnToken(orderId, amt, userId)
        AllInOneSDKManager.startTransaction(
            orderId,
            Constants.manifest.extra.mid,
            tranxToken,
            amt,
            `${API_URL}/paytm/callbackURL`,
            isStaging,
            appInvokeRestricted,
        ).then((result) => {
            dispatch({ type: ADD_CASH, amount })
            // console.log("result", result);
            setOrderIdUpdated(false);
            navigation.navigate("Wallet")
        }).catch((err) => {
            console.log(err)
            setOrderIdUpdated(false);
        });
        setTxnStarted(false)
    };

    const onChangedText = (text) => {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                // alert("please enter numbers only");
            }
        }
        setAmount(newText);
    }

    return (
        <View style={styles.screen}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: "#eee", padding: 14 }}>
                <Text style={{ fontSize: 18 }}>Wallet Balance </Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>₹ {state.walletAmount}</Text>
            </View>
            <View style={{ padding: 20 }}>
                <Text>Amount</Text>
                <TextInput
                    style={styles.input}
                    value={String(amount)}

                    keyboardType='numeric'
                    placeholder='30'
                    onChangeText={(e) => onChangedText(e)}
                    maxLength={3}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                <AppButton
                    title={5}
                    onPress={() => { setAmount(5) }}
                    Style={{ paddingLeft: 32, paddingRight: 32 }}
                    disabled={txnStarted}
                />
                <AppButton
                    title={20}
                    onPress={() => { setAmount(20) }}
                    Style={{ paddingLeft: 30, paddingRight: 30 }}
                    disabled={txnStarted}
                />
                <AppButton
                    title={50}
                    onPress={() => { setAmount(50) }}
                    Style={{ paddingLeft: 30, paddingRight: 30 }}
                    disabled={txnStarted}
                />
            </View>
            <View style={{ padding: 20, }}>
                <AppButton
                    title={"ADD MONEY"}
                    TextStyle={{ fontSize: 16 }}
                    onPress={startRawTransaction}
                    disabled={txnStarted}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        marginTop: 10,
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderWidth: 1,
        fontSize: 20,
    },
});

export default AddMoney;
