import { EDIT_EMPLOYEE_REQUEST, EDIT_EMPLOYEE_SUCCESS } from "../constants/employeeActionTypes";
import { editEmployee, getEmployees } from '../../utils/crudEmployees';
import { FETCH_EMPLOYEE_SUCCESS } from "../constants/employeeActionTypes";

export default (item) => dispatch => {

    dispatch({
        type:EDIT_EMPLOYEE_REQUEST,
        payLoad: true
    });

    return editEmployee(item).then(response => {

        if (response.status === 201 ) {

            getEmployees(item.DepartmentUuid)
                .then( data => dispatch({
                    type: FETCH_EMPLOYEE_SUCCESS,
                    payLoad: data.data
                }))
                .then( () => dispatch({
                    type: EDIT_EMPLOYEE_SUCCESS,
                    payLoad: false
                }))
        }

        return response;

    })
}