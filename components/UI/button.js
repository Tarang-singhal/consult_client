import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#fff",
        borderColor: "red",
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    appButtonText: {
        fontSize: 13,
        color: "red",
        fontWeight: "bold",
        alignSelf: "center",
        // textTransform: "uppercase"
    }
});