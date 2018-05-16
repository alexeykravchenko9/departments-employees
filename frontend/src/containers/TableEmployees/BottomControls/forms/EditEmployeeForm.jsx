import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';

// Material UI
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const styles = {
    modalParent:{
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    gridParent: {
        display: 'flex',
        marginBottom: 20
    },
    formStyles: {
        display: 'flex',
        flexDirection: 'column'
    },
    formItem: {
        width: '90%'
    },
    formItemTextarea: {
        width: '95%'
    },
    button:{
        marginTop:20,
        float:'right'
    },
    fillButton:{
        marginTop:20,
        float:'left'
    }
};

const renderTextField = (props) => {

    return <TextField
        label={ props.label }
        className={ props.className }
        error={ props.meta.touched && props.meta.invalid }
        helperText={ props.meta.touched && props.meta.error }
        multiline={props.multiLine}
        {...props.input} />

};

@withStyles(styles)
class EditEmployeeForm extends Component {

    constructor(props){
        super(props);

    }

    render(){

        const { handleSubmit, classes } = this.props;

        return(
            <section className={ classes.modalParent }>
                <h3>EDIT EMPLOYEE</h3>

                <form onSubmit={ handleSubmit } className={ classes.formStyles }>
                    <Grid cointaiter={true} className={ classes.gridParent } >

                        <Grid item xs={6} >
                            <Field
                                name="firstName"
                                props={{ label: "First Name", className: classes.formItem }}
                                component={ renderTextField }
                                type="text" />

                        </Grid>

                        <Grid item xs={6} >
                            <Field
                                name="lastName"
                                props={{ label: "Last Name", className: classes.formItem }}
                                component={ renderTextField }
                                type="text" />
                        </Grid>

                    </Grid>

                    <Grid cointaiter={true} className={ classes.gridParent } >

                        <Grid item xs={6}>
                            <Field
                                name="age"
                                props={{  label: "Age", className: classes.formItem }}
                                component={ renderTextField }
                                type="number" />

                        </Grid>

                        <Grid item xs={6}>
                            <Field
                                name="phone"
                                props={{ label: "Phone", className: classes.formItem }}
                                component={ renderTextField }
                                type="text" />
                        </Grid>

                    </Grid>

                    <Grid cointaiter={true} className={ classes.gridParent } >

                        <Grid item xs={12}>
                            <Field
                                name="fullAddress"
                                props={{ label: "Full Address", multiLine: true, className: classes.formItemTextarea  }}
                                component={ renderTextField }
                                type="text" />

                        </Grid>

                    </Grid>

                    <Grid cointaiter={true} className={ classes.gridParent } >

                        <Grid item xs={12} >

                            <Field name="DepartmentUuid" component="input" type="hidden" />
                            <Field name="uuid" component="input" type="hidden" />
                            <Button variant="raised" color="primary" className={ classes.button }  onClick={ handleSubmit } type="submit">EDIT EMPLOYEE</Button>

                        </Grid>

                    </Grid>

                </form>
            </section>
        )
    }
}

export default reduxForm({
    form: 'edit_employee_form',
    fields: ['uuid', 'firstName', 'lastName', 'age', 'phone', 'fullAddress'],
    validate

})(EditEmployeeForm);
