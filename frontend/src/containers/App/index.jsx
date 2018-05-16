import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, createGenerateClassName } from 'material-ui/styles';
import { Switch, Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Auth
import { userIsAuth, userIsNotAuth } from '../../auth';

// Containers
import Main from '../Main/index.jsx';
import Login from '../Login/index.jsx';

import setToken from "../../actions/users/setToken";


const styles = {
    root: {
        flexGrow: 1,
        maxWidth: 1000,
        padding: 40,
        marginTop:0,
        marginBottom:0,
        margin: 'auto',
        marginRight: 'auto'
    }
};

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
});

const mapDispatchToProps = dispatch => {
    return {
        setToken: bindActionCreators(setToken, dispatch)
    }
};

@withStyles(styles)
@connect(state => ({
    users: state.users
}), mapDispatchToProps)

class App extends Component {
    componentWillMount(){

        this.props.setToken();

    }

    render(){

        const { classes } = this.props;

        return (
            <JssProvider generateClassName={generateClassName}>

                <section className = { classes.root }  >

                    <Switch>
                        <Route exact path="/" component={userIsAuth(Main)} />
                        <Route path="/login" component={userIsNotAuth(Login)} />
                    </Switch>



                </section>

            </JssProvider>
        )
    }
}

export default App;