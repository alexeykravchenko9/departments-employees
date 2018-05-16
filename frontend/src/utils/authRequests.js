import axios from 'axios';
import { API_LOGIN_URL, API_REGISTER_URL } from "../actions/constants/apiPath";


export const registerUser = obj => axios.post(API_REGISTER_URL, obj, { withCredentials: true})
        .then( response => response.data )
        .catch( e => new Error(e));

export const loginUser = obj =>  axios.post(API_LOGIN_URL, obj, { withCredentials: true})
        .then( response => response.data )
        .catch( e => new Error(e));