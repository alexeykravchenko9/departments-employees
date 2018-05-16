import { INIT_TOKEN } from "../constants/userActionTypes";
import getCookie from "../../utils/getCookie";


export default () => {

    const user = {
        token: '',
        logged: false
    };

    let getToken = getCookie('authTok');

    if (getToken && getToken !== 0){

        user.token = getToken;
        user.logged = true;

        return ({
            type: INIT_TOKEN,
            payLoad: user
        })

    }

    return ({
        type: INIT_TOKEN,
        payLoad: user
    })

}