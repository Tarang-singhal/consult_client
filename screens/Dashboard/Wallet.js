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

const API_URL = Constants.manifest.extra.API_URL

const Wallet = props => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId) || 'sdasdas';
    const [isOrderIdUpdated, setOrderIdUpdated] = useState(false);
    useEffect(() => {
        if (!isOrderIdUpdated) {
            generateOrderId();
            setOrderIdUpdated(true);
        }
    });
    const [orderId, setOrderId] = useState('PARCEL15942011933');
    const [amount, setAmount] = useState('100');
    const [urlScheme, setURLScheme] = useState('');
    const [showToast, setShowToast] = useState('');
    const [isStaging, setIsStaging] = useState(true);
    const [appInvokeRestricted, setIsAppInvokeRestricted] = useState(true);
    const [result, setResult] = useState('');

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
        setShowToast('');
        setResult('');
        let tranxToken = await GetTxnToken(orderId, amount, userId)
        AllInOneSDKManager.startTransaction(
            orderId,
            Constants.manifest.extra.mid,
            tranxToken,
            amount,
            `${API_URL}/paytm/callbackURL`,
            isStaging,
            appInvokeRestricted,
            // urlScheme
        ).then((result) => {
            console.log("result", result);
            setShowToast(JSON.stringify(result));
            setOrderIdUpdated(false);
        }).catch((err) => {
            console.log(err)
            setResult(err);
            setShowToast("Error: " + err);
            setOrderIdUpdated(false);
        });
    };


    return (
        <View style={styles.screen}>
            <Text>Wallet</Text>
            <View style={styles.buttonStyle}>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        padding: 8,
        margin: 8,
    }
});

export default Wallet;
