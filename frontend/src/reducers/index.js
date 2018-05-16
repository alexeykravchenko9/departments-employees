import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import departments from './departments';
import employees from './employees';
import users from './users';

export default combineReducers({
    departments,
    employees,
    users,
    form: formReducer
});