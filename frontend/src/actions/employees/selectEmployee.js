import { SELECT_EMPLOYEE } from '../constants/employeeActionTypes';

export default selected => ({
        type: SELECT_EMPLOYEE,
        payLoad: selected
});