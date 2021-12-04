import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet, FlatList, Image,Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const data = [
    {
        userId: 1,
        image: 'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
        callRate: 5,
        userName: "Dhruv",
        professionName: 'teacher',
        location: 'Delhi',
        rating: '4.2'
    },
    {
        userId: 2,
        image: 'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
        callRate: 5,
        userName: "Dhruv",
        professionName: 'teacher',
        location: 'Delhi',
        rating: '4.2'
    },
    {
        userId: 3,
        image: 'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
        callRate: 5,
        userName: "Dhruv",
        professionName: 'teacher',
        location: 'Delhi',
        rating: '4.2'
    },
    {
        userId: 4,
        image: 'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
        callRate: 5,
        userName: "Dhruv",
        professionName: 'teacher',
        location: 'Delhi',
        rating: '4.2'
    },
    {
        userId: 5,
        image: 'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
        callRate: 5,
        userName: "Dhruv",
        professionName: 'teacher',
        location: 'Delhi',
        rating: '4.2'
    },
    {
        userId: 6,
        image: 'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
        callRate: 5,
        userName: "Dhruv",
        professionName: 'teacher',
        location: 'Delhi',
        rating: '4.2'
    },
    {
        userId: 7,
        image: 'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
        callRate: 5,
        userName: "Dhruv",
        professionName: 'teacher',
        location: 'Delhi',
        rating: '4.2'
    }
]
const Item = ({ item }) => {
    const btnTitle=`$ ${item.callRate} / min`
    return(
    <View style={styles.item}>
        <View style={styles.imageContainer}>
            <Image style={styles.profileImage} source={{uri: item.image}}/>
            <Text style={styles.rating}>Rated - {item.rating} / 5</Text>    
        </View>
        <View style={styles.content}>
            <Text style={styles.name}>{item.userName}</Text>    
            <View style={styles.setmap}>
                <Image style={styles.mapImage} source={{uri: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png'}}/>
                <Text style={styles.location}>{item.location}</Text>
            </View>
            
            <Text style={styles.profession}>Specialities - {item.professionName}</Text>
            <Button onPress={() => Alert.alert('button pressed')} title={btnTitle} color="#996600" accessibilityLabel="Learn more about this purple button"/>
        </View>
        
    </View>
);
}
const Home = props => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);

    return (
        <View style={styles.screen}>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item item={item} />
                    // <Text>{item.professionName}</Text>
                )}
                keyExtractor={(item) => item.userId}
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
        width: '100%'
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
    content:{
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
    location:{
        marginTop:3,
        fontSize: 12,
        color: 'gray'
    },
    profession: {
        marginBottom: 8,
        fontWeight: 'bold'
    }
    
});

export default Home;
