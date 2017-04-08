/**
 * Created by User on 4/3/2017.
 */
import axios from 'axios';
import {SIGNIN_URL, SIGNUP_URL} from '../api';
import * as KeyChain from 'react-native-keychain';

import {addAlert} from './alertsActions'

export const loginUser = (email, password) => {
    return (dispatch) => {
        return axios.post(SIGNIN_URL, {email, password}).then(({data:{user_id, token}}) => {
                KeyChain.setGenericPassword(user_id, token)
                    .then(() => {
                        dispatch(addAlert(token));
                        dispatch(authUser(user_id));
                    })
            }).catch((error) => {
            console.log(error);
            dispatch(addAlert("Could not login"));
        })
    };
}
export const signupUser = (email, password) => {
    return (dispatch) => {
        return axios.post(SIGNUP_URL, {email, password}).then((response) => {
            KeyChain.setGenericPassword(response.data.user_id, response.data.token)
                .then(() => {
                    dispatch(addAlert(response.data.token));
                    dispatch(authUser(response.data.user_id));
                })
            }).catch((error) => {
                 console.log(error);
                dispatch(addAlert("Could not signup"));
        })
    };
}
export const authUser = (user_id) => {
    return{
        type: 'AUTH_USER',
        user_id
    }
};

export const unauthUser = {
        type: 'UNAUTH_USER'
};