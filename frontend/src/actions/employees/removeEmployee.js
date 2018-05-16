import {FETCH_EMPLOYEE_SUCCESS, REMOVE_EMPLOYEE_REQUEST, REMOVE_EMPLOYEE_SUCCESS} from "../constants/employeeActionTypes";
import { removeEmployee, getEmployees } from '../../utils/crudEmployees';

export default (item) => dispatch => {

    dispatch({
        type: REMOVE_EMPLOYEE_REQUEST
    });

    return removeEmployee(item).then( response => {

        if (response.status === 201) {

             getEmployees(item.DepartmentUuid).then( data => dispatch({
                   type: FETCH_EMPLOYEE_SUCCESS,
                   payLoad: data.data
             })).then( () => dispatch({
                type: REMOVE_EMPLOYEE_SUCCESS,
                payLoad: false
            }));
        }

        return response;


    });
}