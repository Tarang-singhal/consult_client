import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet, FlatList, Image, Button, Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { Voximplant } from 'react-native-voximplant';
import Constants from 'expo-constants';

const API_URL = Constants.manifest.extra.API_URL;


const Home = props => {

    const navigation = useNavigation();
    const voximplant = Voximplant.getInstance();
    const [data, setData] = useState([]);
    const userId = useSelector(state => state.auth.userId);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(
                    API_URL + '/user?page=1&limit=10'
                );
                const json = await response.data;
                return json;
            } catch (error) {
                console.error(error);
            }
        };
        getUserData().then((res) => {
            setData(res.data.data);
            console.log(res.data.data);
        });
    }, []);

    useEffect(() => {
        voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
            navigation.navigate('IncomingCall', { call: incomingCallEvent.call });
        });

        return () => {
            voximplant.off(Voximplant.ClientEvents.IncomingCall);
        };
    }, []);



    const callUser = x => {
        let user = {
            name: x._id,
            display_name: x.name
        }
        navigation.navigate('Calling', { user });
        // navigation.navigate();
    };

    const Item = ({ item }) => {
        const btnTitle = `$ ${item.callRate} / min`
        return (
            item._id != userId ?
                <View style={styles.item}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.profileImage} source={{ uri: item.image }} />
                        <Text style={styles.rating}>Rated - {item.rating} / 5</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.setmap}>
                            <Image style={styles.mapImage} source={{ uri: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png' }} />
                            <Text style={styles.location}>{item.location}</Text>
                        </View>
                        <View>
                            <Text style={styles.profession}>Specialities - {item.professionName}</Text>
                        </View>
                        <View style={styles.buttonWidth}>
                            <Button onPress={() => callUser(item)} title={btnTitle} color="#996600" accessibilityLabel="Learn more about this purple button" />
                        </View>
                    </View>

                </View>
                :
                null
        );
    }

    return (
        <View style={styles.screen}>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item item={item} />
                    // <Text>{item.professionName}</Text>
                )}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '100%',
        width: '100%',
        
    },
    item: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        margin: 10,
        flexDirection: 'row'
    },
    profileImage: {
        width: 100,
        height: 75
    },
    imageContainer: {
        margin: 10
    },
    rating: {
        fontWeight: 'bold',
        marginTop: 5
    },
    content: {
        // padding: 2,
        margin: 8
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    mapImage: {
        width: 25,
        height: 25,
    },
    setmap: {
        flexDirection: 'row'
    },
    location: {
        marginTop: 3,
        fontSize: 12,
        color: 'gray'
    },
    profession: {
        marginBottom: 8,
        fontWeight: 'bold'
    },
    buttonWidth: {
        width: 125
    }


});

export default Home;