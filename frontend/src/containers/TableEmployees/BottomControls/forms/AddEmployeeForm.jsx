import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import faker from 'faker';
import { connect } from 'react-redux';
import generateEmployee from '../../../../actions/employees/generateEmployee';

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

class AddEmployeeForm extends Component {

    constructor(props){
        super(props);

    }

    handleFillRandom = (e) => {

        const randomData = {
            firstName: faker.name.firstName(),
            lastName:  faker.name.lastName(),
            age: Math.floor((Math.random() * 30) + 20),
            phone: faker.phone.phoneNumber(),
            fullAddress: `${faker.address.country()}, ${faker.address.state()}, ${faker.address.city()}, ${faker.address.streetAddress()}`
        };

        store.dispatch(generateEmployee(randomData));

    };


    render(){

        const { handleSubmit, classes } = this.props;


        return(
            <section className={ classes.modalParent }>
                <h3>ADD EMPLOYEE</h3>

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

                        <Grid item xs={6} >

                            <Button variant="raised" className={ classes.fillButton }  onClick={ this.handleFillRandom }>FILL RANDOM DATA</Button>

                        </Grid>
                        <Grid item xs={6} >

                            <Field name="DepartmentUuid" component="input" type="hidden" />
                            <Button variant="raised" color="primary" className={ classes.button }  onClick={ handleSubmit } type="submit">ADD EMPLOYEE</Button>

                        </Grid>

                    </Grid>


                </form>
            </section>
        )
    }
}

AddEmployeeForm = reduxForm({
    form: 'add_employee_form',
    enableReinitialize: true,
    validate

})(AddEmployeeForm);

export default connect( state => ({
    initialValues: state.employees.randomEmployee

}))(AddEmployeeForm);
