import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, createGenerateClassName } from 'material-ui/styles';
import { reset } from 'redux-form';

import SelectDepartment from './SelectDepartment.jsx';
import ComposerDepartment from './ComposerDepartment.jsx';
import AddDepartmentForm from './forms/AddDepartmentForm.jsx';
import EditDepartmentForm from './forms/EditDepartmentForm.jsx';
import RemoveDepartmentForm from './forms/RemoveDepartmentForm.jsx';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Action Creators
import fetchEmployees from '../../actions/employees/fetchEmployees';
import selectEmployee from '../../actions/employees/selectEmployee';
import resetEmployee from '../../actions/employees/resetEmployee';
import fetchDepartments from '../../actions/departments/fetchDepartments';
import addDepartment from '../../actions/departments/addDepartment';
import selectDepartment from '../../actions/departments/selectDepartment';
import editDepartment from '../../actions/departments/editDepartment';
import removeDepartment from '../../actions/departments/removeDepartment';
import logoutUser from '../../actions/users/logoutUser';

import { getDepartmentsSoc } from "../../utils/apiSockets";

// Material UI
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = {
    headerTitle: {
        color: '#3f51b5'
    },
    formBlock: {
        padding: 20
    },
    message: {
        textAlign: 'center',
        padding: 7,
        marginTop: 20
    },
    success: {
        color: "#fff",
        backgroundColor: "green"
    },
    failure: {
        color: "#fff",
        backgroundColor: "#ff6a00"
    }
};


const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
});

const mapStateToProps = state => {
    return {
        departments: state.departments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployees: bindActionCreators( fetchEmployees, dispatch ),
        selectEmployee: bindActionCreators( selectEmployee, dispatch ),
        resetEmployee: bindActionCreators( resetEmployee, dispatch ),
        fetchDepartments: bindActionCreators( fetchDepartments, dispatch ),
        selectDepartment: bindActionCreators( selectDepartment, dispatch ),
        addDepartment: bindActionCreators( addDepartment, dispatch ),
        editDepartment: bindActionCreators( editDepartment, dispatch ),
        removeDepartment: bindActionCreators( removeDepartment, dispatch ),
        logoutUser: bindActionCreators( logoutUser, dispatch )

    }
};


@withStyles(styles)
@connect(mapStateToProps, mapDispatchToProps)

export default class TopBar extends Component {
    constructor(props){
        super(props);
        this.handleShowForm = this._handleShowForm.bind(this);
        this.handleSubmitForm = this._handleSubmitForm.bind(this);
        this.handleLogoutLink = this._handleLogoutLink.bind(this);
    }

    state = {
        nameShowedForm: '',
        submitMessage: '',
        failure: false,
        errors: []
    };

    componentWillMount() {
         this.props.fetchDepartments();
    }

    _handleShowForm(name){
        const stateInit = () => this.setState( prevState => ({
            nameShowedForm: (prevState.nameShowedForm === name) ? '' : name,
            submitMessage: '',
            errors: []
        }));

        switch (name) {
            case 'Add':
                return stateInit();
            case 'Edit':
                return stateInit();
            case 'Remove':
                return stateInit();
            default:
                return this.setState({ nameShowedForm: '' })
        }
    }

    _handleLogoutLink(e){
        e.preventDefault();
        this.props.logoutUser();
        document.cookie = `${SERVER_COOKIE_NAME}=; path=/; Max-Age=0`;
    }

    _handleSubmitForm(values, dispatch, props){

        const showMessage = (response, form) => {
            if( response.status === 201 ) {

                // Make emit socket to fetch new departments
                this.props.fetchDepartments();

                (form === 'add') ? dispatch( reset( props.form )) : '';

                return this.setState({ submitMessage: response.message, failure: false }, () => {
                    setTimeout( () => this.setState({ submitMessage: '', nameShowedForm: '' }), 1000);
                });

            } else {

                return this.setState({ errors: response, failure: true });
            }
        };

        if (props.form === 'add_department_form') {

            this.props.addDepartment(values)
                .then( response =>  showMessage(response, 'add') )
                .catch(e => console.log(e,'error'));

        } else if (props.form === 'edit_department_form') {

            this.props.editDepartment(values)
                .then( response => showMessage(response) )
                .catch(e => console.log(e,'error'));
        } else if (props.form === 'remove_department_form') {

            this.props.removeDepartment(values) 
                .then( response => showMessage(response) )
                .catch(e => console.log(e,'error'));
        }
    }

    render(){

        const { classes, departments, selectDepartment, fetchEmployees, resetEmployee, selectEmployee } = this.props;
        const { items, requestError, selectedDepartment } = departments;
        const { nameShowedForm, submitMessage, failure, errors } = this.state;
        const { name:selName, uuid, description} = selectedDepartment;

        const showForm = (name) => {
            switch (name){
                case 'Add':
                    return <AddDepartmentForm onSubmit={ this.handleSubmitForm }/>;
                case 'Edit':
                    return <EditDepartmentForm
                        onSubmit={ this.handleSubmitForm }
                        initialValues={ { name: selName, uuid, description } }
                    />;
                case 'Remove':
                    return <RemoveDepartmentForm
                        onSubmit = { this.handleSubmitForm }
                        initialValues = { { name: selName, uuid } }
                    />;
                default:
                    return '';
            }
        };

        return (
            <JssProvider generateClassName={generateClassName}>

                <section>
                    <Grid container spacing={16} alignItems={"center"} style={ { justifyContent: 'space-between' } }>
                        <Grid item xs={12}>
                            <h2 className={classes.headerTitle}>Departments & Employees</h2>
                            <a href="#" onClick={ this.handleLogoutLink }>Logout</a>
                        </Grid>

                        <SelectDepartment
                            setDepartment = { selectDepartment }
                            departments = { items }
                            fetchEmployees = { fetchEmployees }
                            resetEmployee = { resetEmployee }
                            selectEmployee = { selectEmployee }
                        />

                        <ComposerDepartment getNameShowedForm={ this.handleShowForm } selectedDepartment={ selectedDepartment } />

                        <Grid item xs={12}>

                            {nameShowedForm ?
                                <Paper className={ classes.formBlock }>
                                    {showForm(nameShowedForm)}

                                    {failure && errors.length > 0 &&
                                    errors.map( item => {
                                        return <p className={`${classes.message} ${classes.failure}`}>{item.type && item.type + ': '} {item.message}</p>;

                                    })}

                                    {submitMessage && !failure ? <p className={`${classes.message} ${classes.success}`}>{submitMessage}</p> : '' }

                                    </Paper>
                                : ''}

                            <p>{selectedDepartment.description || ''}</p></Grid>

                    </Grid>

                </section>

            </JssProvider>
        )
    }
}
