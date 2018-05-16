import { getEmployees } from '../../utils/crudEmployees';
import { FETCH_EMPLOYEE_REQUEST, FETCH_EMPLOYEE_SUCCESS } from "../constants/employeeActionTypes";

export default (departmentID) => dispatch => {

    dispatch({
        type: FETCH_EMPLOYEE_REQUEST,
        payLoad: true
    });

    return getEmployees(departmentID).then( data => dispatch({
                type: FETCH_EMPLOYEE_SUCCESS,
                payLoad: data.data
    }));
};