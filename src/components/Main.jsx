import React from 'react';
import { Switch, Route } from 'react-router-dom'
import JobsIndex from './Jobs/JobsIndex';
import Home from './Home';
import JobsNew from './Jobs/JobsNew';
import { Container } from 'semantic-ui-react'
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';

const Main = () => (
    <Container>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/jobs' component={JobsIndex} />
            <Route path='/jobs/new' component={JobsNew} />
            <Route path='/login' component={SignIn} />
            <Route path='/signup' component={SignUp} />
        </Switch>
    </Container>
)

export default Main;