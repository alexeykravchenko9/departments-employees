import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';

// Material UI
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const styles = {
    fieldItem: {
        display: 'flex',
        marginBottom: 20
    }
};
const renderTextField = (props) => {
    return <TextField
        label={ props.label }
        type={ (props.input.name === 'password' ) ? "password" : "text" }
        className={ props.className }
        error={ props.meta.touched && props.meta.invalid }
        helperText={ props.meta.touched && props.meta.error }
        {...props.input} />

};

@withStyles(styles)
class Login extends Component{
    render(){
        const { classes, handleSubmit } = this.props;
        return(
            <section >

                    <form onSubmit={ handleSubmit }>
                        <Grid cointaiter={true}  >

                            <Grid item xs={12} >
                                <Field
                                    name="username"
                                    props={{ label: "Username", className: classes.fieldItem }}
                                    component={ renderTextField }
                                    type="text" />

                            </Grid>

                            <Grid item xs={12} >
                                <Field
                                    name="password"
                                    props={{ label: "Password", className: classes.fieldItem }}
                                    component={ renderTextField }
                                />

                            </Grid>

                            <Grid item xs={12} style={ { marginTop: 30, textAlign: 'center' }} >
                                <Button variant="raised" color="primary" className={ classes.button } onClick={ handleSubmit } type="submit">SIGN IN</Button>
                            </Grid>

                        </Grid>

                    </form>

            </section>
        )
    }
}

export default reduxForm({
    form: 'login_form',
    validate
})(Login)