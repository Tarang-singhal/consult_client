import Axios from 'axios';
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
};

const API_URL = Constants.manifest.extra.API_URL;
// const API_URL = 'http://10.0.2.2:5000'


export const authenticate = (userId, token) => {
    return dispatch => {
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const response = await Axios.post(
                API_URL + '/auth/signup',
                {
                    email: email,
                    password: password,
                    passwordConfirm: password
                },
                {
                    "Content-Type": "application/json",
                    "Cookie": "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTE0ODQxMDVkOTliNmIzZjQyZDJjNCIsImlhdCI6MTYzNjkxMTE2OSwiZXhwIjoxNjQ0Njg3MTY5fQ.ZeYgUHU78xN5tHez1Lg5RhBvywnE4AUP5h24awbkqRI"
                }
            );
            const resData = response.data;
            const token = resData.token;
            const userId = resData.user._id;
            dispatch(
                authenticate(
                    userId,
                    token,
                )
            );
            saveDataToStorage(userId, token);
        } catch (error) {
            console.log(error)
            throw new Error("Something Went wrong!")
        }

    }
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            let response = await Axios.post(
                API_URL + '/auth/login',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                },
                {
                    "Content-Type": "application/json",
                    "Cookie": "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTE0ODQxMDVkOTliNmIzZjQyZDJjNCIsImlhdCI6MTYzNjkxMTE2OSwiZXhwIjoxNjQ0Njg3MTY5fQ.ZeYgUHU78xN5tHez1Lg5RhBvywnE4AUP5h24awbkqRI"
                }
            )

            const resData = response.data;
            const token = resData.token;
            const userId = resData.user._id;
            console.log(resData);
            dispatch(
                authenticate(
                    userId,
                    token,
                )
            );
            saveDataToStorage(userId, token);

        } catch (error) {
            console.log(error)
            throw new Error("Incorrect Email/Password")
        }

    };
};

export const logout = () => {
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

const saveDataToStorage = (userId, token) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            userId: userId,
            token: token,
        })
    );
};