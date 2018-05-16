import React, { Component } from 'react';
import { Field, reduxForm, formValues } from 'redux-form';
import PropTypes from 'prop-types';
import validate from './validate';

// Material UI
import { withStyles } from 'material-ui';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = {
    formParent: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    formItem: {
        flex: '1',
        marginRight: '5%'
    },
    hidden: {
        display: 'none'
    }
};

const renderTextField = (props) => {
    return <TextField
        className={ props.className}
        label="Department Name"
        error={props.meta.touched && props.meta.invalid}
        helperText={props.meta.touched && props.meta.error}
        {...props.input} />
};

const renderTextAreaField = (props) => {
    return <TextField
        className={ props.className}
        label="Description of Department"
        error={props.meta.touched && props.meta.invalid}
        helperText={props.meta.touched && props.meta.error}
        multiline={true}
        {...props.input} />
};

@withStyles(styles)
class EditDepartmentForm extends Component {

    render(){
        const { handleSubmit, classes } = this.props;

        return (
            <section>

            <h3>EDIT DEPARTMENT</h3>

            <form onSubmit={ handleSubmit } className={ classes.formParent }>

                <Field name="name" props={{ className: classes.formItem  }} component={ renderTextField } type="text"/>

                <Field name="description" props={{ className: classes.formItem }} component={ renderTextAreaField } type="text" />

                <Field name="uuid" type="hidden" component="input" />

                <Button variant="raised" color="secondary" onClick={ handleSubmit }>EDIT DEPARTMENT</Button>

            </form>

            </section>
        )
    }
}

export default reduxForm({
    form: 'edit_department_form',
    fields: ['uuid', 'name', 'description'],
    validate

})(EditDepartmentForm);