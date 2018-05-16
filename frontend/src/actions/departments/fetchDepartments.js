import { SERVER_FETCH_DEPARTMENTS_IO } from "../constants/departmentActionTypes";

export default () => dispatch => {

    return dispatch({
        type: SERVER_FETCH_DEPARTMENTS_IO
    });

};
