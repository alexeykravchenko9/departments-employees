import {
    ADD_DEPARTMENT_REQUEST,
    ADD_DEPARTMENT_SUCCESS,
    ADD_DEPARTMENT_ERROR,
    EDIT_DEPARTMENT_REQUEST,
    EDIT_DEPARTMENT_SUCCESS,
    EDIT_DEPARTMENT_ERROR,
    REMOVE_DEPARTMENT_REQUEST,
    REMOVE_DEPARTMENT_SUCCESS,
    REMOVE_DEPARTMENT_ERROR,
    SELECT_DEPARTMENT,
    FETCH_DEPARTMENTS_IO
} from '../actions/constants/departmentActionTypes';

const initialState = {
    selectedDepartment: {},
    isLoading: false,
    requestError: null,
    items: []
};

export default (state = initialState, action) => {

    switch (action.type) {

        case FETCH_DEPARTMENTS_IO:
            return { ...state, isLoading: false, items: action.payLoad };

        case SELECT_DEPARTMENT:
            return { ...state, selectedDepartment: state.items.filter( item => item.uuid === action.payLoad)[0] || {} };

        case ADD_DEPARTMENT_REQUEST:
            return { ...state, isLoading: true };
        case ADD_DEPARTMENT_SUCCESS:
            return { ...state, isLoading: false };
        case ADD_DEPARTMENT_ERROR:
            return { ...state, isLoading: false, requestError: action.payLoad };

        case EDIT_DEPARTMENT_REQUEST:
            return { ...state, isLoading: true };
        case EDIT_DEPARTMENT_SUCCESS:
            return { ...state, isLoading: false, selectedDepartment: state.items.filter( item => item.uuid === action.payLoad)[0] || {} };
        case EDIT_DEPARTMENT_ERROR:
            return { ...state, isLoading: false, requestError: action.payLoad };

        case REMOVE_DEPARTMENT_REQUEST:
            return { ...state, isLoading: true };
        case REMOVE_DEPARTMENT_SUCCESS:
            return { ...state, isLoading: false, selectedDepartment: {} };
        case REMOVE_DEPARTMENT_ERROR:
            return { ...state, isLoading: false, requestError: action.payLoad };

        default:
            return state
    }
}