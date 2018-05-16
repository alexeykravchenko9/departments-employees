import axios from 'axios';
import { API_EMPLOYEE_URL } from "../actions/constants/apiPath";

export const getEmployees = departmentID =>
    axios.get(`${API_EMPLOYEE_URL}/${departmentID}`)
    .then( response => response.data )
    .catch( err => new Error(err));

export const addEmployee = obj =>
    axios.post(API_EMPLOYEE_URL, obj)
        .then( response => response.data )
        .catch( err => new Error(err));

export const editEmployee = obj =>
    axios.put(API_EMPLOYEE_URL, obj)
        .then( response => response.data )
        .catch( err => new Error(err));

export const removeEmployee = obj =>
    axios.delete(API_EMPLOYEE_URL, { data: obj })
        .then( response => response.data )
        .catch( err => new Error(err));