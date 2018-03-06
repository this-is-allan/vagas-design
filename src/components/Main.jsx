import React from 'react';
import { Switch, Route } from 'react-router-dom'
import JobsIndex from './Jobs/JobsIndex';
import Home from './Home';
import JobsNew from './Jobs/JobsNew';
import { Container } from 'semantic-ui-react'

const Main = () => (
    <Container>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/jobs' component={JobsIndex} />
            <Route path='/jobs/new' component={JobsNew} />
        </Switch>
    </Container>
)

export default Main;