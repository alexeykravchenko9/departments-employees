import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';

// Material UI
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';


const styles = {
    fieldItem: {
        display: 'flex',
        marginBottom: 20
    }
};
const renderTextField = (props) => {
    return <TextField
        label={ props.label }
        type={ (props.input.name === 'password' || props.input.name === 'repeat_password'  ) ? "password" : "text" }
        className={ props.className }
        error={ props.meta.touched && props.meta.invalid }
        helperText={ props.meta.touched && props.meta.error }
        {...props.input} />

};

@withStyles(styles)

class Register extends Component{
    render(){
        const { classes, handleSubmit } = this.props;

        return(
            <section >
                <Typography variant="title" align="center" style={ { marginBottom: 10 }}>Register new account</Typography>
                <form onSubmit={ handleSubmit }>
                    <Grid cointaiter={true}  >

                        <Grid item xs={12} >
                            <Field
                                name="username"
                                props={{ label: "Username *", className: classes.fieldItem }}
                                component={ renderTextField }
                                type="text" />

                        </Grid>

                        <Grid item xs={12} >
                            <Field
                                name="password"
                                props={{ label: "Your Password *", className: classes.fieldItem }}
                                component={ renderTextField }
                            />

                        </Grid>

                        <Grid item xs={12} >
                            <Field
                                name="repeat_password"
                                props={{ label: "Repeat Password *", className: classes.fieldItem }}
                                component={ renderTextField }
                            />

                        </Grid>

                        <Grid item xs={12} style={ { marginTop: 30, textAlign: 'center' }} >
                            <Button variant="raised" color="secondary" className={ classes.button } onClick={ handleSubmit } type="submit">Create Account</Button>
                        </Grid>

                    </Grid>

                </form>

            </section>
        )
    }
}

export default reduxForm({
    form: 'register_form',
    validate
})(Register)