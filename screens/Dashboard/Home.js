import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet, FlatList, Image,Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.API_URL;

const data = [
    {
        _id: 1,
        image: 'https://i.graphicmama.com/uploads/2020/5/5eb55b4360dab-young-male-teacher-cartoon-character.png',
        callRate: 5,
        name: "Dhruv",
        professionName: 'teacher',
        location: 'Delhi',
        rating: '4.1'
    },
    {
        _id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUWgep6kkkXwGZJPBx1JgbT4aQQsl_iXfoy4GTMCTKdQUdYYbupEQSgJ8JcfpW0cdw700&usqp=CAU',
        callRate: 6,
        name: "Tarang",
        professionName: 'Doctor',
        location: 'Mumbai',
        rating: '4.2'
    },
    {
        _id: 3,
        image: 'https://www.nicepng.com/png/detail/73-734688_guy-vector-minimalist-character-cartoon-characters-man-png.png',
        callRate: 7,
        name: "Atishey",
        professionName: 'Fitness Trainer',
        location: 'Karnal',
        rating: '4.5'
    },
    {
        _id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTSsZWeTIT-J5P9zOmLSxp6mPKU1DPbVvh1K97cXC-457kes061d5hPyQ5I_DxiUaIim0&usqp=CAU',
        callRate: 5,
        name: "Prakhar",
        professionName: 'Doctor',
        location: 'Delhi',
        rating: '3.8'
    },
    {
        _id: 5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGo9CcLElItVkWqy5KY2o3oU5YzFlwkUCCxV03_mnBTUE_tdc-C2UgnQ26qFosd-syvYk&usqp=CAU',
        callRate: 4,
        name: "Arya",
        professionName: 'Astrologer',
        location: 'Delhi',
        rating: '4.0'
    },
    {
        _id: 6,
        image: 'https://i.graphicmama.com/uploads/2016/2/Sam-the-Workaholic-56cc65308f664.png',
        callRate: 5,
        name: "Garvit",
        professionName: 'teacher',
        location: 'Chennai',
        rating: '4.2'
    },
    {
        _id: 7,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVxFToRstXsB_aEoK8sWmebksxO0U6ppqZh8LXMLSJSQX7nHxF2PyPsBQCTai6FVrgeoI&usqp=CAU',
        callRate: 5,
        name: "Harsh",
        professionName: 'Health Expert',
        location: 'Delhi',
        rating: '4.2'
    }
]
// const getUserData = async () => {
//     try {
//       const response = await axios.get(
//         API_URL+'/user?page=2&limit=10'
//       );
//       const json = await response.data;
//       return json;
//     } catch (error) {
//       console.error(error);
//     }
//   };
// getUserData().then((res)=>{
//     console.log(res.data.data);
// });
// console.log(datatat);
const Item = ({ item }) => {
    const btnTitle=`$ ${item.callRate} / min`
    return(
    <View style={styles.item}>
        <View style={styles.imageContainer}>
            <Image style={styles.profileImage} source={{uri: item.image}}/>
            <Text style={styles.rating}>Rated - {item.rating} / 5</Text>    
        </View>
        <View style={styles.content}>
            <Text style={styles.name}>{item.name}</Text>    
            <View style={styles.setmap}>
                <Image style={styles.mapImage} source={{uri: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png'}}/>
                <Text style={styles.location}>{item.location}</Text>
            </View>
            <View>
                <Text style={styles.profession}>Specialities - {item.professionName}</Text>
            </View>
            <View style={styles.buttonWidth}>
                <Button onPress={() => Alert.alert('button pressed')} title={btnTitle} color="#996600" accessibilityLabel="Learn more about this purple button"/>
            </View>
        </View>
        
    </View>
);
}
const Home = props => {
    const dispatch = useDispatch();
    const _id = useSelector(state => state.auth._id);
    const token = useSelector(state => state.auth.token);

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
    },
    buttonWidth:{
        width: 125
    }

    
});

export default Home;