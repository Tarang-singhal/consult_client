import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export const AppButton = ({ onPress, title, Style = {}, TextStyle = {}, disabled = false }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => { !disabled && onPress() }} style={{ ...styles.appButtonContainer, ...Style, borderColor: disabled ? "#ccc" : "red" }}>
        <Text style={{ ...styles.appButtonText, ...TextStyle, color: disabled ? "#ccc" : "red" }}>{title}</Text>
    </TouchableOpacity>
);

export const SlotButton = ({ onPress, title, Style = {}, TextStyle = {} }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ ...styles.slotButtonContainer, ...Style }}>
        <Text style={{ ...styles.slotButtonText, ...TextStyle }}>{title}</Text>
    </TouchableOpacity>
)

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
    },
    slotButtonContainer: {
        elevation: 8,
        backgroundColor: "#fff",
        borderColor: "red",
        borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    slotButtonText: {
        fontSize: 15,
        color: "red",
        fontWeight: "bold",
        alignSelf: "center",
    },
});