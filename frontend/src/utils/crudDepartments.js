import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie(SERVER_COOKIE_NAME);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

import getCookie from './getCookie';

import { API_DEPARTMENT_URL } from '../actions/constants/apiPath';


// export const getDepartments = () =>
//     axios.get(API_DEPARTMENT_URL)
//          .then( response => response.data )
//          .catch( err => new Error(err));

export const createDepartment = obj =>
    axios.post(API_DEPARTMENT_URL, obj)
        .then( response => response.data )
        .catch( err => new Error(err));

export const editDepartment = obj =>
    axios.put(API_DEPARTMENT_URL, obj)
        .then( response => response.data )
        .catch( err => new Error(err));

export const removeDepartment = obj =>
    axios.delete(API_DEPARTMENT_URL, { data: obj })
        .then( response => response.data )
        .catch( err => new Error(err));