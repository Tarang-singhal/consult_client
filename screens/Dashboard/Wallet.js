import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import { useDispatch } from 'react-redux';
import AllInOneSDKManager from 'paytm_allinone_react-native';


const Wallet = props => {
    const dispatch = useDispatch();
    const [isOrderIdUpdated, setOrderIdUpdated] = useState(false);
    useEffect(() => {
        if (!isOrderIdUpdated) {
            generateOrderId();
            setOrderIdUpdated(true);
        }
    });
    const [mid, setMid] = useState('vvDrhO48383680943249');
    const [orderId, setOrderId] = useState('PARCEL15942011933');
    const [amount, setAmount] = useState('100');
    const [urlScheme, setURLScheme] = useState('');
    const [tranxToken, setTranxToken] = useState('b9097bda72af4db0a9aa2d00e58a7d451594201196818');
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
        await AllInOneSDKManager.startTransaction(
            orderId,
            mid,
            tranxToken,
            amount,
            "https://<callback URL to be used by merchant>",
            isStaging,
            appInvokeRestricted,
            urlScheme
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
    }


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
