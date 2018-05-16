import { REGISTER_USER } from "../constants/userActionTypes";
import { registerUser } from '../../utils/authRequests';

export default (user) => dispatch => {

    return registerUser(user).then( response => {

        if (response.status === 201){
            const { data, token } = response;
            dispatch({
                type: REGISTER_USER,
                payLoad: token
            });

        }

        return response;

    });
    
} 
     