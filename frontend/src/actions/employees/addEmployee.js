import {
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_REQUEST,
    FETCH_EMPLOYEE_SUCCESS
} from "../constants/employeeActionTypes";

import { addEmployee, getEmployees } from '../../utils/crudEmployees';

export default (item) => dispatch => {
    dispatch({
        type: ADD_EMPLOYEE_REQUEST
    });

    return addEmployee(item).then( response => {

        if (response.status === 201 ){

            getEmployees(item.DepartmentUuid).then(data => dispatch({
                type: FETCH_EMPLOYEE_SUCCESS,
                payLoad: data.data
            })).then( () => dispatch({
                type: ADD_EMPLOYEE_SUCCESS,
                payLoad: false
            }));

        }

        return response;

    });
}