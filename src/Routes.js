import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react';

import Header from './components/Header';
import App from './components/App';
import JobsNew from './components/Jobs/JobsNew';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import createBrowserHistory from 'history/createBrowserHistory'

function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}


class Routes extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    render() {
        const isLoggedIn = this.props.profile.isEmpty;
        const customHistory = createBrowserHistory;
        
        return (
            <BrowserRouter>
                <Container>
                    <Header />
                    <Switch>
                        <PrivateRoute authed={!isLoggedIn} path='/jobs/new' component={JobsNew} />
                        <Route path='/login' component={SignIn} />
                        <Route path='/signup' component={SignUp} />
                        <Route path='/' component={App} />
                    </Switch>
                </Container>
            </BrowserRouter>
        )
    }
}

// export default withFirebase(Routes);

export default connect((state) => ({
    profile: state.firebase.profile
}))(Routes)