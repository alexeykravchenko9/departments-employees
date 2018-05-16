import {
    FETCH_EMPLOYEE_REQUEST,
    FETCH_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    REMOVE_EMPLOYEE_SUCCESS,
    REMOVE_EMPLOYEE_REQUEST,
    SELECT_EMPLOYEE,
    GENERATE_EMPLOYEE,
    RESET_EMPLOYEE,
    EDIT_EMPLOYEE_SUCCESS,
    EDIT_EMPLOYEE_REQUEST
} from '../actions/constants/employeeActionTypes';

const initialState = {
    items: [],
    isLoading: false,
    selectedEmployee: {},
    updated: false,
    randomEmployee: {}
};

export default (state = initialState, action) => {

    switch (action.type){
        case SELECT_EMPLOYEE:
            return { ...state, selectedEmployee: (state.selectedEmployee === action.payLoad ) ? {} : action.payLoad  };

        case GENERATE_EMPLOYEE:
            return { ...state, randomEmployee: action.payLoad };

        case FETCH_EMPLOYEE_REQUEST:
            return { ...state, isLoading: true };
        case FETCH_EMPLOYEE_SUCCESS:
            return { ...state, isLoading: false, items: action.payLoad, selectedEmployee: (state.items.length > 0) ? state.selectedEmployee : {}, updated: true };

        case ADD_EMPLOYEE_REQUEST:
            return { ...state, isLoading: true };
        case ADD_EMPLOYEE_SUCCESS:
            return {...state, isLoading: false, updated: action.payLoad, randomEmployee: {} };

        case EDIT_EMPLOYEE_REQUEST:
            return { ...state, isLoading: true };
        case EDIT_EMPLOYEE_SUCCESS:
            return {...state, isLoading: false, updated: false, selectedEmployee: {} };

        case REMOVE_EMPLOYEE_REQUEST:
            return { ...state, isLoading: true };
        case REMOVE_EMPLOYEE_SUCCESS:
            return {...state, isLoading: false, updated: action.payLoad, selectedEmployee: {} };

        case RESET_EMPLOYEE:
            return { ...state, items: []  };

        default:
            return state;
    }
}