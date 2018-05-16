import { LOGIN_USER } from "../constants/userActionTypes";
import { loginUser } from '../../utils/authRequests';

export default (user) => dispatch => {
    return loginUser(user).then( response => {

        if (response.status === 200){
            const { data } = response;
            dispatch({
                type: LOGIN_USER,
                payLoad: data
            });

        }

        return response;

    });
}