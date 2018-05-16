import {
    EDIT_DEPARTMENT_REQUEST,
    EDIT_DEPARTMENT_SUCCESS,
    EDIT_DEPARTMENT_ERROR,
    SERVER_FETCH_DEPARTMENTS_IO
} from "../constants/departmentActionTypes";


import { editDepartment } from "../../utils/crudDepartments";

export default (item) => dispatch => {

    dispatch({
        type: EDIT_DEPARTMENT_REQUEST
    });

    return editDepartment(item).then( response => {

        if (response.status === 201) {

            dispatch({
                type: SERVER_FETCH_DEPARTMENTS_IO
            });

            dispatch({
                type: EDIT_DEPARTMENT_SUCCESS,
                payLoad: item.uuid,
            })

        } else if( response.status === 403 ){
            dispatch({
                type: EDIT_DEPARTMENT_ERROR,
                payLoad: 'Error! With Editing'
            });
        }

        return response;

    });

};