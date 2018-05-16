import { REGISTER_USER, INIT_TOKEN, LOGIN_USER, LOGOUT_USER } from "../actions/constants/userActionTypes";

const initialState = {
  isLogged: false,
  token: ''
};

export default (state = initialState, action) => {
    switch (action.type){
        case 'REGISTER_USER':
            return {...state, isLogged: true };
        case 'LOGIN_USER':
            return {...state, isLogged: true };
        case 'LOGOUT_USER':
            return {...state, isLogged: false, token: '' };
        case 'INIT_TOKEN':
            return {...state, token: action.payLoad.token, isLogged: action.payLoad.logged };
        default:
            return state;
    }
}