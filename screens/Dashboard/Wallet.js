import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { GetTxnToken } from '../../utils/index';
import { ADD_CASH } from '../../store/actions/user';

const API_URL = Constants.manifest.extra.API_URL

const Wallet = props => {
    const dispatch = useDispatch();
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
    const [amount, setAmount] = useState('100');
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
        let tranxToken = await GetTxnToken(orderId, amount, userId)
        AllInOneSDKManager.startTransaction(
            orderId,
            Constants.manifest.extra.mid,
            tranxToken,
            amount,
            `${API_URL}/paytm/callbackURL`,
            isStaging,
            appInvokeRestricted,
        ).then((result) => {
            dispatch({type: ADD_CASH, amount})
            console.log("result", result);
            setOrderIdUpdated(false);
        }).catch((err) => {
            console.log(err)
            setOrderIdUpdated(false);
        });
    };

    return (
        <View style={styles.screen}>
            <View style={styles.buttonStyle}>
                <Text>{state.walletAmount}</Text>
                <Button
                    title="Start Transaction"
                    onPress={() => startRawTransaction()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    buttonStyle: {
        padding: 8,
        margin: 8,
    }
});

export default Wallet;
