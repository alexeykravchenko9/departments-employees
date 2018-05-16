import { GENERATE_EMPLOYEE } from "../constants/employeeActionTypes";

export default (data) => ({
    type: GENERATE_EMPLOYEE,
    payLoad: data
});