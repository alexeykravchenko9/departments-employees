import React, { Component } from 'react';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from './forms/LoginForm.jsx';
import RegisterForm from './forms/RegisterForm.jsx';

// Material UI
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

//Action Creators
import registerUser from "../../actions/users/registerUser";
import loginUser from "../../actions/users/loginUser";


const styles = {
    loginWrap: {
        padding: 30,
        marginTop: 20,
        maxWidth: 300,
        margin: '30px auto 0',
        fontSize: 14
    },
    bottomText: {
        marginTop: 40,
        color: '#4c4b4b'
    },
    fieldItem: {
        display: 'flex',
        marginBottom: 20
    },
    formParent: {
        marginTop: 70
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
        users: state.users
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registerUser: bindActionCreators(registerUser, dispatch),
        loginUser: bindActionCreators(loginUser, dispatch)
    }
};

@withStyles(styles)
@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component{

    constructor(props){
        super(props);
        this.handleSignUp = this._handleSignUp.bind(this);
        this.handleAuthForm = this._handleAuthForm.bind(this);

    }

    state = {
        registerShow: false,
        loginQuestion: '',
        formMessage: '',
        formError: false,
        errors: []

    };

    _handleSignUp(e){
        e.preventDefault();

        this.setState((prevState) => ({
            registerShow: (!prevState.registerShow),
            formMessage: '',
            errors: [],
            formError: false
        }));
    }

    _handleAuthForm(values, dispatch, props) {
        const showLoginMessage = (response) => {

            if (response.status === 201 || response.status === 200){
                this.setState({ formMessage: response.data, errors: [] }, () => {
                    setTimeout( this.setState({ formMessge: ''}), 1000);
                });
                dispatch( reset( props.form ) );

            } else if( response.customError ) {
                const err = {
                    type: "Validation Error",
                    message: response.data
                };

                this.setState({ formMessage: response.data, formError: true, errors: [err] })

            } else {

                this.setState({ formMessage: response.data, formError: true, errors: response })

            }
        };

        if (props.form === 'login_form') {
            this.props.loginUser(values)
                .then( response => showLoginMessage(response) )
                .catch(e => console.error(e));
        }

        if (props.form === 'register_form') {
            this.props.registerUser(values)
                .then( response => showLoginMessage(response))
                .catch(e => console.error(e));
        }
    }


    render(){
        const { classes, users } = this.props;

        const { registerShow, formError, formMessage, errors } = this.state;

        return(
            <section className={ classes.formParent }>
                <Typography variant="display1" styles={{ marginBottom: 40 }} align="center">Login to the Department App</Typography>

                <Paper evaluation={5} className={ classes.loginWrap }>

                    {registerShow ? <RegisterForm onSubmit={ this.handleAuthForm } /> : <LoginForm onSubmit={ this.handleAuthForm } /> }


                    {!formError && formMessage && <p className={`${classes.message} ${classes.success}`}>{formMessage}</p>}

                    {formError && errors.length > 0 &&
                    errors.map( item => {
                        return <p className={`${classes.message} ${classes.failure}`}>{item.type && item.type + ': '} {item.message}</p>;

                    })}


                    <Typography variant="text" className={ classes.bottomText } gutterBottom="70" align="center">

                        { registerShow ? 'Already registered?' : 'Don\'t have an account?' } <a href="#" onClick={ this.handleSignUp }>{ registerShow ? 'Sign In' : 'Sign Up' } </a>

                    </Typography>

                </Paper>

            </section>
        )
    }
}