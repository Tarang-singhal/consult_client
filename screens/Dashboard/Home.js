import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const data = [
    {
        userId:1,
        image:'jfkdsjfkl',
        callRate:5,
        userName:"Dhruv",
        professionName:'teacher',
        location:'Delhi'
    },
    {
        userId:2,
        image:'jfkdsjfkl',
        callRate:5,
        userName:"Dhruv",
        professionName:'teacher',
        location:'Delhi'
    },
    {
        userId:3,
        image:'jfkdsjfkl',
        callRate:5,
        userName:"Dhruv",
        professionName:'teacher',
        location:'Delhi'
    },
    {
        userId:4,
        image:'jfkdsjfkl',
        callRate:5,
        userName:"Dhruv",
        professionName:'teacher',
        location:'Delhi'
    },
    {
        userId:5,
        image:'jfkdsjfkl',
        callRate:5,
        userName:"Dhruv",
        professionName:'teacher',
        location:'Delhi'
    },
    {
        userId:6,
        image:'jfkdsjfkl',
        callRate:5,
        userName:"Dhruv",
        professionName:'teacher',
        location:'Delhi'
    },
    {
        userId:7,
        image:'jfkdsjfkl',
        callRate:5,
        userName:"Dhruv",
        professionName:'teacher',
        location:'Delhi'
    }
]
const Home = props => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);
    
    return (
        <View style={styles.screen}>
            <Text>Home</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Home;
