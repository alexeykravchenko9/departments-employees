import {
    REMOVE_DEPARTMENT_REQUEST,
    REMOVE_DEPARTMENT_SUCCESS,
    REMOVE_DEPARTMENT_ERROR
} from "../constants/departmentActionTypes";


import { removeDepartment } from "../../utils/crudDepartments";

export default (item) => dispatch => {

    dispatch({
        type: REMOVE_DEPARTMENT_REQUEST
    });

    return removeDepartment(item).then( response => {

        if (response.status === 201) {

            dispatch({
                type: REMOVE_DEPARTMENT_SUCCESS
            });

        } else if( response.status === 403 ){
            dispatch({
                type: REMOVE_DEPARTMENT_ERROR,
                payLoad: 'Error! With Editing'
            });
        }

        return response;

    });

};