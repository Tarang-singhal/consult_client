import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
};

const API_URL = "https://consult-api.herokuapp.com"


export const authenticate = (userId, token) => {
    return dispatch => {
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

export const signup = (email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTE0ODQxMDVkOTliNmIzZjQyZDJjNCIsImlhdCI6MTYzNjkxMTE2OSwiZXhwIjoxNjQ0Njg3MTY5fQ.ZeYgUHU78xN5tHez1Lg5RhBvywnE4AUP5h24awbkqRI");
    return async dispatch => {
        const response = await fetch(
            API_URL + '/auth/signup',
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    email: email,
                    password: password,
                    passwordConfirm: password
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch(
            authenticate(
                resData.user._id,
                resData.token,
            )
        );
        saveDataToStorage(resData.user._id, resData.token);
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://consult-api/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch(
            authenticate(
                resData.userId,
                resData.token,
            )
        );
        saveDataToStorage(resData.userId, resData.token);
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