import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// Material UI
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import {withStyles} from "material-ui/styles/index";

const styles = {
    message: {
        display:'flex',
        alignItems: 'center'
    },
    iconColor: {
        color: 'red',
        fontSize: '2rem',
        marginRight: 10
    }
};

@withStyles(styles)

class RemoveDepartmentForm extends Component {
    render(){
        const { classes, handleSubmit } = this.props;
        return (
            <section>

                <h3>REMOVE DEPARTMENT</h3>

                <p className={ classes.message }> <Icon  className={ classes.iconColor } >report_icon</Icon>
                    Be carefull, Employees will also be removed that contains in the Department</p>

                <form onSubmit={ handleSubmit }>

                    <Field name="name" type="hidden" component="input" />
                    <Field name="uuid" type="hidden" component="input" />

                    <Button variant="raised" color="secondary" onClick={ handleSubmit }>REMOVE DEPARTMENT</Button>

                </form>

            </section>

        )
    }
}

export default reduxForm({
    form: 'remove_department_form',
    fields: ['uuid', 'name']

})(RemoveDepartmentForm);