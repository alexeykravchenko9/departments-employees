import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// Material UI
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
    modalParent:{
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    title:{
        marginBottom:30
    }
};

@withStyles(styles)
class RemoveEmployeeForm extends Component {
    render(){
        const { handleSubmit, classes } = this.props;

        return (
            <section className={ classes.modalParent }>
                <h3>REMOVE EMPLOYEE</h3>
                <form onSubmit={ handleSubmit }>
                    <Typography align="center" gutterBottom="true" className={ classes.title } variant="title">Are you sure to remove selected employee?</Typography>

                    <Field type="hidden" name="uuid" component="input" />

                    <Typography align="center">
                        <Button variant="raised" color="secondary" onClick={ handleSubmit }>REMOVE EMPLOYEE</Button>
                    </Typography>


                </form>
            </section>
        )
    }
}

export default reduxForm({
    form: 'remove_employee_form',
    fields: ['uuid']
})(RemoveEmployeeForm);