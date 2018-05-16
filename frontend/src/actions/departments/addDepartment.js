import {
    ADD_DEPARTMENT_REQUEST,
    ADD_DEPARTMENT_SUCCESS,
    ADD_DEPARTMENT_ERROR } from "../constants/departmentActionTypes";

import { createDepartment } from "../../utils/crudDepartments";

export default (item) => dispatch => {

    dispatch({
        type: ADD_DEPARTMENT_REQUEST
    });

    return createDepartment(item).then( response => {

        if (response.status === 201) {

            dispatch({
                type: ADD_DEPARTMENT_SUCCESS,
                payLoad: true
            });

        } else if( response.status === 403 ){
            dispatch({
                type: ADD_DEPARTMENT_ERROR,
                payLoad: 'Error! Department already exist'
            }); 
        }

        return response;

    });

};