import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import AddEmployeeForm from './forms/AddEmployeeForm.jsx';
import EditEmployeeForm from './forms/EditEmployeeForm.jsx';
import RemoveEmployeeForm from './forms/RemoveEmployeeForm.jsx';

//Action Creators
import addEmployee from '../../../actions/employees/addEmployee';
import editEmployee from '../../../actions/employees/editEmployee';
import removeEmployee from '../../../actions/employees/removeEmployee';
import fetchEmployees from '../../../actions/employees/fetchEmployees';

// Material UI
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';

const styles = {
    editButton: {
        marginRight: 20
    },
    bottomControls: {
        marginTop: 20
    },
    modalParent: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '10%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 550
    },
    message: {
        textAlign: 'center',
        padding: 7,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%'
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

const mapStateToProps = state => {
    return {
        employees: state.employees,
        departments: state.departments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addEmployee: bindActionCreators(addEmployee, dispatch),
        editEmployee: bindActionCreators(editEmployee, dispatch),
        removeEmployee: bindActionCreators(removeEmployee, dispatch),
        fetchEmployees: bindActionCreators(fetchEmployees, dispatch)
    }

};

@withStyles(styles)
@connect(mapStateToProps, mapDispatchToProps)

export default class BottomControls extends Component {
    constructor(props){
        super(props);
        this.handleShowForm = this._handleShowForm.bind(this);
        this.handleOpen = this._handleOpen.bind(this);
        this.handleClose = this._handleClose.bind(this);
        this.handleSubmitForm = this._handleSubmitForm.bind(this);
    }

    state = {
        selectedForm: '',
        openModal: false,
        submitMessage: '',
        failure: false,
        errors: []
    };

    _handleOpen(){
        this.setState({
            openModal: true,
            errors: []
        })
    }

    _handleClose(){
        this.setState({
            openModal: false,
            submitMessage: ''
        })
    }

    _handleShowForm(e){

        let formId = e.currentTarget.getAttribute('data-form-id');

        const stateInit = () => this.setState({
            selectedForm: formId
        });

        switch (formId) {
            case 'Add':
                this.handleOpen();
                return stateInit();
            case 'Edit':
                this.handleOpen();
                return stateInit();
            case 'Remove':
                this.handleOpen();
                return stateInit();
            default:
                return this.setState({ selectedForm: '' })
        }
    }

    _handleSubmitForm(values, dispatch, props){
        const { uuid } = this.props.departments.selectedDepartment;

        const showMessage = (response, form) => {
            if( response.status === 201 ) {

                (form === 'add') ? dispatch( reset( props.form )) : '';

                return this.setState({ submitMessage: response.message, failure: false }, () => {
                    setTimeout( () => this.setState({ submitMessage: '', selectedForm: '', openModal: false }), 1000);
                });

            } else {
                return this.setState({  failure: true, errors: response });
            }
        };
 
        if (props.form === 'add_employee_form') {

            this.props.addEmployee({...values, DepartmentUuid: uuid })
                .then( response => showMessage(response, 'add'))
                .catch( e => console.error(e))

        } else if (props.form === 'edit_employee_form') {

            this.props.editEmployee({...values, DepartmentUuid: uuid })
                .then( response => showMessage(response, 'edit') )
                .catch( e => console.error(e))

        } else if ( props.form === 'remove_employee_form') {

            this.props.removeEmployee({ ...values, DepartmentUuid: uuid })
                .then( response => showMessage(response, 'remove'))
                .catch( e => console.error(e))
        }
    }

    render(){

        const { classes, employees, departments } = this.props;
        const { selectedDepartment } = departments;
        const { selectedForm, openModal, submitMessage, failure, errors } = this.state;


        const printEmployeeForm = (name) => {
            switch (name){
                case 'Add':
                    return <AddEmployeeForm onSubmit={ this.handleSubmitForm } />;
                case 'Edit':
                    return <EditEmployeeForm onSubmit={ this.handleSubmitForm } initialValues={ { ...employees.selectedEmployee } } />;
                case 'Remove':
                    return <RemoveEmployeeForm onSubmit={ this.handleSubmitForm } initialValues={ { uuid: employees.selectedEmployee.uuid } }  />;
                default:
                    return '';
            }
        };

        return (
            <section>

                <Grid container xs={12} className={classes.bottomControls}>

                        <Grid item xs={6}>
                            { Object.entries(employees.selectedEmployee).length > 0 && Object.getOwnPropertyNames(selectedDepartment).length > 0 &&
                                <span>
                                    <Button variant="raised" data-form-id="Edit" onClick={ this.handleShowForm } className={classes.editButton}>Edit</Button>
                                    <Button variant="raised" data-form-id="Remove" onClick={ this.handleShowForm } color="secondary">Remove</Button>
                                </span>
                            }
                        </Grid>

                    <Grid item xs={6} align="right">
                        {
                            (Object.keys(selectedDepartment).length < 1) ? ''
                            : <Button variant="raised" color="primary" data-form-id="Add" onClick={ this.handleShowForm } >Add new Employee</Button>
                        }


                    </Grid>
                </Grid>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={ openModal }
                    onClose={ this.handleClose } >
                    <Paper className = { classes.modalParent }>

                        {printEmployeeForm(selectedForm)}

                        {failure && errors.length > 0 &&
                            errors.map( item => {
                                return <p className={`${classes.message} ${classes.failure}`}>{item.type && item.type + ': '} {item.message}</p>;

                        })}

                        {submitMessage && !failure ? <p className={`${classes.message} ${classes.success}`}>{submitMessage}</p> : '' }

                    </Paper>

                </Modal>

            </section>

        )
    }
}
