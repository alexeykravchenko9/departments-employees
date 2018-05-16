import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';

// Material UI
import { withStyles } from 'material-ui/styles';
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
    }
};

const renderTextField = ( props ) => {

    return <TextField
        className={props.className}
        label="Department Name"
        error={props.meta.touched && props.meta.invalid}
        helperText={props.meta.touched && props.meta.error}
        {...props.input} />
};

const renderTextAreaField = ( props ) => (
    <TextField
        label="Description of Department"
        className={props.className}
        error={props.meta.touched && props.meta.invalid}
        helperText={props.meta.touched && props.meta.error}
        multiline={true}
        {...props.input} />
);

@withStyles(styles)
class AddDepartmentForm extends Component {

    render(){
        const { handleSubmit, classes } = this.props;

        return (
            <section>
                <h3>ADD DEPARTMENT</h3>
                <form onSubmit={ handleSubmit } className={ classes.formParent }>

                    <Field name="name" component={renderTextField}  props={{ className: classes.formItem }} type="text" />

                    <Field name="description" component={renderTextAreaField} props={{ className: classes.formItem }} type="text" />

                    <Button variant="raised" color="primary"  onClick={ handleSubmit }>ADD DEPARTMENT</Button>

                </form>

            </section>
        )
    }
}

export default reduxForm({
    form: 'add_department_form',
    validate

})(AddDepartmentForm);