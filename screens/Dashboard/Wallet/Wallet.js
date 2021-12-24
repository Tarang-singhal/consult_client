import React from 'react';
import Constants from 'expo-constants';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { AppButton } from '../../../components/UI/button';

const Wallet = props => {
    const navigation = useNavigation();
    const state = useSelector(state => state.user);


    return (
        <View style={styles.screen}>
            <View style={styles.section1}>
                <Text style={styles.walletAmount}>
                    ₹ {state.walletAmount}
                </Text>
                <View style={{ marginRight: 16 }}>
                    <AppButton
                        title="Add Money"
                        onPress={() => navigation.navigate("AddWalletAmount")}
                    />

                </ View>
            </View>
            <View style={styles.section2}>
                <Text style={styles.callus}>
                    In case of any issue
                    <Text style={{ color: "red" }}> CALL US</Text>
                </Text>
            </View>
            <View style={styles.section2}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16
    },
    section1: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    section2: {
        height: 20,
        alignItems: "flex-end"
    },
    section3: {
        height: 70
    },
    walletAmount: {
        flex: 1,
        flexDirection: "row",
        fontSize: 30,
        fontWeight: "500"
    },
    callus: {
        fontSize: 11
    }

});

export default Wallet;
